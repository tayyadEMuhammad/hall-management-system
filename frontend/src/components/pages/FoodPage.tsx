"use client";

import { useRef, useState } from "react";
import { Badge } from "@/components/Badge";
import DishForm from "@/components/forms/DishForm";
import PackageForm from "@/components/forms/PackageForm";
import Modal from "@/components/Modal";
import { formatCurrency } from "@/lib/format";
import type { Dish, FoodPackage } from "@/lib/types";
import { useStore } from "@/store/useStore";

type Tab = "dishes" | "packages" | "categories";

const BTN =
  "inline-flex cursor-pointer items-center gap-2 rounded-lg px-[18px] py-[9px] font-sans text-sm font-medium leading-none transition-all";
const BTN_SM = "px-3! py-1.5! text-xs";
const BTN_PRIMARY =
  "bg-primary text-white hover:-translate-y-px hover:bg-primary-hover hover:shadow-[0_4px_12px_rgba(79,70,229,0.3)]";
const BTN_SECONDARY = "bg-gray-200 text-gray-700 hover:bg-gray-300";
const BTN_DANGER = "bg-danger text-white hover:bg-red-600";

const FOOD_GRID = "grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4";
const FOOD_ITEM =
  "cursor-pointer rounded-xl border border-gray-200 p-4 text-center transition-all hover:border-primary hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.08),0_4px_6px_-2px_rgba(0,0,0,0.03)]";
const FOOD_NAME = "text-sm font-semibold";
const FOOD_PRICE = "mt-0.5 text-[13px] text-gray-500";

const DISH_ICON: Record<string, string> = {
  Rice: "fa-bowl-rice",
  BBQ: "fa-fire",
  Drinks: "fa-glass",
  Dessert: "fa-cake",
};

function dishIcon(cat: string) {
  return DISH_ICON[cat] ?? "fa-utensils";
}

export default function FoodPage() {
  const dishes = useStore((s) => s.dishes);
  const packages = useStore((s) => s.foodPackages);
  const categories = useStore((s) => s.foodCategories);
  const toast = useStore((s) => s.toast);

  const [tab, setTab] = useState<Tab>("dishes");
  const [dishModal, setDishModal] = useState<{
    mode: "add" | "edit";
    dish?: Dish;
  } | null>(null);
  const [pkgModal, setPkgModal] = useState<{
    mode: "add" | "edit";
    pkg?: FoodPackage;
  } | null>(null);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [catFilter, setCatFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const dishFormRef = useRef<HTMLFormElement | null>(null);
  const pkgFormRef = useRef<HTMLFormElement | null>(null);

  const filteredDishes = dishes.filter(
    (d) =>
      (!catFilter || d.category === catFilter) &&
      (!statusFilter || d.status === statusFilter),
  );

  const removeDish = (d: Dish) => {
    if (!confirm("Delete this dish?")) return;
    useStore.setState((s) => ({
      dishes: s.dishes.filter((x) => x.id !== d.id),
    }));
    toast("Dish deleted");
  };

  const removePkg = (p: FoodPackage) => {
    if (!confirm("Delete this package?")) return;
    useStore.setState((s) => ({
      foodPackages: s.foodPackages.filter((x) => x.id !== p.id),
    }));
    toast("Package deleted");
  };

  const removeCategory = (c: string) => {
    if (!confirm(`Delete category "${c}"?`)) return;
    useStore.setState((s) => ({
      foodCategories: s.foodCategories.filter((x) => x !== c),
    }));
    toast("Category deleted");
  };

  const addCategory = () => {
    const name = newCategory.trim();
    if (!name) {
      toast("Please enter a category name", "error");
      return;
    }
    if (categories.includes(name)) {
      toast("Category already exists", "error");
      return;
    }
    useStore.setState((s) => ({ foodCategories: [...s.foodCategories, name] }));
    toast("Category added successfully!");
    setCategoryOpen(false);
    setNewCategory("");
  };

  return (
    <>
      <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-bold tracking-[-0.5px] text-gray-900 md:text-xl">
            Food & Catering
          </h1>
          <p className="mt-0.5 text-sm text-gray-500">
            Manage your food categories, dishes, and packages
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <button
            className={`${BTN} ${BTN_PRIMARY}`}
            onClick={() => setDishModal({ mode: "add" })}
          >
            <i className="fas fa-plus"></i> Add Dish
          </button>
          <button
            className={`${BTN} ${BTN_SECONDARY}`}
            onClick={() => setPkgModal({ mode: "add" })}
          >
            <i className="fas fa-box"></i> Add Package
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        {(["dishes", "packages", "categories"] as Tab[]).map((t) => (
          <button
            key={t}
            className={`${BTN} ${tab === t ? BTN_PRIMARY : BTN_SECONDARY}`}
            onClick={() => setTab(t)}
          >
            <i
              className={`fas ${t === "dishes" ? "fa-utensils" : t === "packages" ? "fa-box" : "fa-tags"}`}
            ></i>{" "}
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tab === "dishes" && (
        <>
          <div className="flex flex-wrap gap-3 mb-4">
            <select
              className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10 w-[180px]! select-arrow pr-9"
              value={catFilter}
              onChange={(e) => setCatFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select
              className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10 w-[150px]! select-arrow pr-9"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className={`${FOOD_GRID} cursor-auto`}>
            {filteredDishes.length === 0 ? (
              <div className="col-span-full text-center p-10">
                <i className="fas fa-utensils text-[40px] text-gray-300"></i>
                <h3 className="mt-3">No dishes added yet</h3>
                <button
                  className={`${BTN} ${BTN_PRIMARY} mt-2`}
                  onClick={() => setDishModal({ mode: "add" })}
                >
                  Add Dish
                </button>
              </div>
            ) : (
              filteredDishes.map((d) => (
                <div key={d.id} className={FOOD_ITEM}>
                  <div className="mb-2 text-[32px] text-primary">
                    <i className={`fas ${dishIcon(d.category)}`}></i>
                  </div>
                  <div className={FOOD_NAME}>{d.name}</div>
                  <div className={FOOD_PRICE}>{formatCurrency(d.price)}</div>
                  <div className="text-[11px] text-gray-400 mt-1">
                    {d.category}
                  </div>
                  <Badge
                    tone={d.status === "active" ? "success" : "secondary"}
                    className="mt-1"
                  >
                    {d.status}
                  </Badge>
                  <div className="mt-2 flex gap-1.5 justify-center">
                    <button
                      className={`${BTN} ${BTN_SM} ${BTN_SECONDARY}`}
                      onClick={() => setDishModal({ mode: "edit", dish: d })}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      className={`${BTN} ${BTN_SM} ${BTN_DANGER}`}
                      onClick={() => removeDish(d)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {tab === "packages" && (
        <div className={`${FOOD_GRID} cursor-auto`}>
          {packages.length === 0 ? (
            <div className="col-span-full text-center p-10">
              <i className="fas fa-box text-[40px] text-gray-300"></i>
              <h3 className="mt-3">No packages created</h3>
              <button
                className={`${BTN} ${BTN_PRIMARY} mt-2`}
                onClick={() => setPkgModal({ mode: "add" })}
              >
                Create Package
              </button>
            </div>
          ) : (
            packages.map((p) => (
              <div key={p.id} className={`${FOOD_ITEM} text-left`}>
                <div className="flex items-start justify-between">
                  <div>
                    <div className={`${FOOD_NAME} text-base!`}>{p.name}</div>
                    <div className={FOOD_PRICE}>
                      {formatCurrency(p.pricePerPerson)} / person
                    </div>
                  </div>
                  <Badge tone={p.status === "active" ? "success" : "secondary"}>
                    {p.status}
                  </Badge>
                </div>
                <div className="text-xs text-gray-500 my-2">
                  {p.description || ""}
                </div>
                <div className="text-xs text-gray-400">
                  <strong>Includes:</strong>{" "}
                  {p.dishes.length ? p.dishes.join(", ") : "-"}
                </div>
                <div className="mt-2.5 flex gap-1.5">
                  <button
                    className={`${BTN} ${BTN_SM} ${BTN_SECONDARY}`}
                    onClick={() => setPkgModal({ mode: "edit", pkg: p })}
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    className={`${BTN} ${BTN_SM} ${BTN_DANGER}`}
                    onClick={() => removePkg(p)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {tab === "categories" && (
        <>
          <div className="flex flex-wrap gap-3 mb-4">
            <button
              className={`${BTN} ${BTN_PRIMARY} ${BTN_SM}`}
              onClick={() => setCategoryOpen(true)}
            >
              <i className="fas fa-plus"></i> Add Category
            </button>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((c) => (
              <div
                key={c}
                className="bg-white border border-gray-200 rounded-lg px-5 py-3 flex items-center gap-3"
              >
                <span className="font-medium">{c}</span>
                <button
                  className={`${BTN} ${BTN_SM} ${BTN_DANGER} px-[8px]! py-[2px]!`}
                  onClick={() => removeCategory(c)}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {(dishModal?.mode === "add" || dishModal?.mode === "edit") && (
        <Modal
          title={dishModal?.mode === "edit" ? "Edit Dish" : "Add Dish"}
          confirmText={dishModal?.mode === "edit" ? "Update" : "Add Dish"}
          onConfirm={() => dishFormRef.current?.requestSubmit()}
          onClose={() => setDishModal(null)}
        >
          <DishForm
            formRef={dishFormRef}
            initial={dishModal?.mode === "edit" ? dishModal.dish : null}
            onDone={() => setDishModal(null)}
          />
        </Modal>
      )}

      {(pkgModal?.mode === "add" || pkgModal?.mode === "edit") && (
        <Modal
          title={pkgModal?.mode === "edit" ? "Edit Package" : "Add Package"}
          confirmText={pkgModal?.mode === "edit" ? "Update" : "Add Package"}
          onConfirm={() => pkgFormRef.current?.requestSubmit()}
          onClose={() => setPkgModal(null)}
        >
          <PackageForm
            formRef={pkgFormRef}
            initial={pkgModal?.mode === "edit" ? pkgModal.pkg : null}
            onDone={() => setPkgModal(null)}
          />
        </Modal>
      )}

      {categoryOpen && (
        <Modal
          title="Add Food Category"
          confirmText="Add Category"
          onConfirm={addCategory}
          onClose={() => setCategoryOpen(false)}
        >
          <div className="mb-4">
            <label className="mb-1 block text-[13px] font-medium text-gray-700">
              Category Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10"
              placeholder="e.g., BBQ, Drinks"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addCategory()}
            />
          </div>
        </Modal>
      )}
    </>
  );
}
