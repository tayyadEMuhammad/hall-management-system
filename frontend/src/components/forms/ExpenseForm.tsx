"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { type Resolver, type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { id } from "@/lib/seed";
import type { Expense } from "@/lib/types";
import { EXPENSE_CATEGORIES } from "@/lib/types";
import { useStore } from "@/store/useStore";

const schema = z.object({
  title: z.string().min(1, "Expense title is required"),
  amount: z.coerce.number().min(1, "Amount is required"),
  category: z.string().min(1, "Category is required"),
  notes: z.string().optional().default(""),
});

type Values = z.infer<typeof schema>;

interface Props {
  formRef: React.RefObject<HTMLFormElement | null>;
  onDone: () => void;
}

export default function ExpenseForm({ formRef, onDone }: Props) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema) as Resolver<Values>,
    defaultValues: { category: "Utilities" },
  });

  const onValid: SubmitHandler<Values> = (data) => {
    const expense: Expense = {
      id: id(),
      title: data.title.trim(),
      amount: data.amount,
      date: new Date().toISOString().split("T")[0],
      category: data.category,
      notes: (data.notes ?? "").trim(),
    };
    useStore.setState((s) => ({ expenses: [...s.expenses, expense] }));
    useStore.getState().toast("Expense added successfully!");
    router.push("/dashboard/settings");
    onDone();
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(onValid)}>
      <div className="mb-4">
        <label className="mb-1 block text-[13px] font-medium text-gray-700">
          Expense Title <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10"
          placeholder="e.g., Electricity Bill"
          {...register("title")}
        />
        {errors.title && <Err msg={errors.title.message} />}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="mb-4">
          <label className="mb-1 block text-[13px] font-medium text-gray-700">
            Amount <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10"
            placeholder="0"
            {...register("amount")}
          />
          {errors.amount && <Err msg={errors.amount.message} />}
        </div>
        <div className="mb-4">
          <label className="mb-1 block text-[13px] font-medium text-gray-700">
            Category <span className="text-danger">*</span>
          </label>
          <select
            className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10 select-arrow pr-9"
            {...register("category")}
          >
            {EXPENSE_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mb-4">
        <label className="mb-1 block text-[13px] font-medium text-gray-700">
          Notes
        </label>
        <input
          type="text"
          className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10"
          placeholder="Additional notes"
          {...register("notes")}
        />
      </div>
    </form>
  );
}

function Err({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <div className="text-xs text-danger mt-1">{msg}</div>;
}
