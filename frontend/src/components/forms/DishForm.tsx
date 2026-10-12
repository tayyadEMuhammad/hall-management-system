"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { type Resolver, type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { id } from "@/lib/seed";
import type { Dish } from "@/lib/types";
import { useStore } from "@/store/useStore";

const schema = z.object({
  name: z.string().min(1, "Dish name is required"),
  category: z.string().min(1, "Select a category"),
  price: z.coerce.number().min(1, "Price is required"),
  description: z.string().optional().default(""),
  status: z.string().default("active"),
});

type Values = z.infer<typeof schema>;

interface Props {
  formRef: React.RefObject<HTMLFormElement | null>;
  initial?: Dish | null;
  onDone: () => void;
}

export default function DishForm({ formRef, initial, onDone }: Props) {
  const router = useRouter();
  const categories = useStore((s) => s.foodCategories);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema) as Resolver<Values>,
    defaultValues: initial
      ? {
          name: initial.name,
          category: initial.category,
          price: initial.price,
          description: initial.description,
          status: initial.status,
        }
      : { status: "active" },
  });

  const onValid: SubmitHandler<Values> = (data) => {
    const dish: Dish = {
      id: initial?.id ?? id(),
      name: data.name.trim(),
      category: data.category,
      price: data.price,
      description: (data.description ?? "").trim(),
      status: data.status,
    };
    useStore.setState((s) => ({
      dishes: initial
        ? s.dishes.map((d) => (d.id === initial.id ? dish : d))
        : [...s.dishes, dish],
    }));
    useStore
      .getState()
      .toast(
        initial ? "Dish updated successfully!" : "Dish added successfully!",
      );
    router.push("/dashboard/food");
    onDone();
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(onValid)}>
      <div className="mb-4">
        <label className="mb-1 block text-[13px] font-medium text-gray-700">
          Dish Name <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10"
          placeholder="Enter dish name"
          {...register("name")}
        />
        {errors.name && <Err msg={errors.name.message} />}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="mb-4">
          <label className="mb-1 block text-[13px] font-medium text-gray-700">
            Category <span className="text-danger">*</span>
          </label>
          <select
            className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10 select-arrow pr-9"
            {...register("category")}
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.category && <Err msg={errors.category.message} />}
        </div>
        <div className="mb-4">
          <label className="mb-1 block text-[13px] font-medium text-gray-700">
            Price <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10"
            placeholder="0"
            {...register("price")}
          />
          {errors.price && <Err msg={errors.price.message} />}
        </div>
      </div>
      <div className="mb-4">
        <label className="mb-1 block text-[13px] font-medium text-gray-700">
          Description
        </label>
        <input
          type="text"
          className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10"
          placeholder="Brief description"
          {...register("description")}
        />
      </div>
      <div className="mb-4">
        <label className="mb-1 block text-[13px] font-medium text-gray-700">
          Status
        </label>
        <select
          className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10 select-arrow pr-9"
          {...register("status")}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
    </form>
  );
}

function Err({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <div className="text-xs text-danger mt-1">{msg}</div>;
}
