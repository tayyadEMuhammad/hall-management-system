"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import ExpenseForm from "@/components/forms/ExpenseForm";
import Modal from "@/components/Modal";
import { formatCurrency } from "@/lib/format";
import type { Data } from "@/store/useStore";
import { useStore } from "@/store/useStore";

const BTN =
  "inline-flex cursor-pointer items-center gap-2 rounded-lg px-[18px] py-[9px] font-sans text-sm font-medium leading-none transition-all";
const BTN_SM = "px-3! py-1.5! text-xs";
const BTN_PRIMARY =
  "bg-primary text-white hover:-translate-y-px hover:bg-primary-hover hover:shadow-[0_4px_12px_rgba(79,70,229,0.3)]";
const BTN_SECONDARY = "bg-gray-200 text-gray-700 hover:bg-gray-300";
const BTN_DANGER = "bg-danger text-white hover:bg-red-600";

const bizSchema = z.object({
  name: z.string(),
  phone: z.string(),
  whatsapp: z.string(),
  address: z.string(),
  currency: z.string(),
});

type BizValues = z.infer<typeof bizSchema>;

export default function SettingsPage() {
  const toast = useStore((s) => s.toast);
  const expenses = useStore((s) => s.expenses);
  const [expenseOpen, setExpenseOpen] = useState(false);
  const expenseFormRef = useRef<HTMLFormElement | null>(null);

  const bizForm = useForm<BizValues>({
    resolver: zodResolver(bizSchema),
    defaultValues: {
      name: "Marriage Lawn Management",
      phone: "0300-1234567",
      whatsapp: "0300-1234567",
      address: "Lahore, Pakistan",
      currency: "PKR (Rs.)",
    },
  });

  const exportData = () => {
    const s = useStore.getState();
    const data = {
      bookings: s.bookings,
      customers: s.customers,
      venues: s.venues,
      payments: s.payments,
      dishes: s.dishes,
      foodPackages: s.foodPackages,
      foodCategories: s.foodCategories,
      expenses: s.expenses,
      quotations: s.quotations,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `marriagelawn-data-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast("Data exported successfully!");
  };

  const importData = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(String(ev.target?.result)) as Partial<Data>;
          useStore.setState((s) => ({
            bookings: data.bookings ?? s.bookings,
            customers: data.customers ?? s.customers,
            venues: data.venues ?? s.venues,
            payments: data.payments ?? s.payments,
            dishes: data.dishes ?? s.dishes,
            foodPackages: data.foodPackages ?? s.foodPackages,
            foodCategories: data.foodCategories ?? s.foodCategories,
            expenses: data.expenses ?? s.expenses,
            quotations: data.quotations ?? s.quotations,
          }));
          toast("Data imported successfully!");
        } catch {
          toast("Invalid file format", "error");
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const resetAll = () => {
    if (!confirm("This will delete ALL data. Are you sure?")) return;
    if (!confirm("Final confirmation: This action cannot be undone!")) return;
    useStore.persist.clearStorage();
    window.location.reload();
  };

  const onBizSubmit: SubmitHandler<BizValues> = () => {
    toast("Settings saved successfully!");
  };

  return (
    <>
      <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-bold tracking-[-0.5px] text-gray-900 md:text-xl">
            Settings
          </h1>
          <p className="mt-0.5 text-sm text-gray-500">
            Configure your business settings
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 md:grid-cols-1">
        <div className="rounded-xl border border-gray-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.08),0_4px_6px_-2px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between border-b border-gray-100 px-[22px] py-[18px]">
            <h3 className="text-[15px] font-semibold text-gray-800">
              Business Information
            </h3>
          </div>
          <div className="p-[22px]">
            <form onSubmit={bizForm.handleSubmit(onBizSubmit)}>
              <div className="mb-4">
                <label className="mb-1 block text-[13px] font-medium text-gray-700">
                  Business Name
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10"
                  placeholder="Business name"
                  {...bizForm.register("name")}
                />
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-[13px] font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10"
                  placeholder="Phone number"
                  {...bizForm.register("phone")}
                />
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-[13px] font-medium text-gray-700">
                  WhatsApp
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10"
                  placeholder="WhatsApp number"
                  {...bizForm.register("whatsapp")}
                />
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-[13px] font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10"
                  placeholder="Business address"
                  {...bizForm.register("address")}
                />
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-[13px] font-medium text-gray-700">
                  Currency
                </label>
                <select
                  className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10 select-arrow pr-9"
                  {...bizForm.register("currency")}
                >
                  <option>PKR (Rs.)</option>
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                </select>
              </div>
              <button type="submit" className={`${BTN} ${BTN_PRIMARY}`}>
                Save Settings
              </button>
            </form>
          </div>
        </div>

        <div>
          <div className="rounded-xl border border-gray-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.08),0_4px_6px_-2px_rgba(0,0,0,0.03)] mb-4">
            <div className="flex items-center justify-between border-b border-gray-100 px-[22px] py-[18px]">
              <h3 className="text-[15px] font-semibold text-gray-800">
                Expenses
              </h3>
              <button
                className={`${BTN} ${BTN_PRIMARY} ${BTN_SM}`}
                onClick={() => setExpenseOpen(true)}
              >
                <i className="fas fa-plus"></i> Add
              </button>
            </div>
            <div className="p-3">
              {expenses.length === 0 ? (
                <p className="text-gray-500 text-sm">No expenses recorded</p>
              ) : (
                expenses
                  .slice(-5)
                  .reverse()
                  .map((e) => (
                    <div
                      key={e.id}
                      className="flex justify-between py-1.5 border-b border-gray-100 text-[13px]"
                    >
                      <span>
                        {e.title}{" "}
                        <span className="text-gray-400 text-[11px]">
                          {e.category}
                        </span>
                      </span>
                      <span className="text-danger">
                        {formatCurrency(e.amount)}
                      </span>
                    </div>
                  ))
              )}
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.08),0_4px_6px_-2px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between border-b border-gray-100 px-[22px] py-[18px]">
              <h3 className="text-[15px] font-semibold text-gray-800">
                Quick Actions
              </h3>
            </div>
            <div className="p-[22px] flex flex-col gap-2">
              <button
                className={`${BTN} ${BTN_SECONDARY}`}
                onClick={exportData}
              >
                <i className="fas fa-download"></i> Export Data (JSON)
              </button>
              <button
                className={`${BTN} ${BTN_SECONDARY}`}
                onClick={importData}
              >
                <i className="fas fa-upload"></i> Import Data (JSON)
              </button>
              <button className={`${BTN} ${BTN_DANGER}`} onClick={resetAll}>
                <i className="fas fa-trash"></i> Reset All Data
              </button>
            </div>
          </div>
        </div>
      </div>

      {expenseOpen && (
        <Modal
          title="Add Expense"
          confirmText="Add Expense"
          onConfirm={() => expenseFormRef.current?.requestSubmit()}
          onClose={() => setExpenseOpen(false)}
        >
          <ExpenseForm
            formRef={expenseFormRef}
            onDone={() => setExpenseOpen(false)}
          />
        </Modal>
      )}
    </>
  );
}
