"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type Resolver, type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { PLANS } from "@/constants";
import { id } from "@/lib/seed";
import type { HallManager } from "@/lib/types";
import { useStore } from "@/store/useStore";

const today = new Date().toISOString().split("T")[0];

const schema = z.object({
  amount: z.coerce.number().min(1, "Enter a valid amount"),
  transactionId: z.string().min(1, "Transaction ID is required"),
  bankName: z.string().min(1, "Bank name is required"),
  activeTill: z
    .string()
    .min(1, "Active till date is required")
    .refine((v) => v >= today, "Date must be today or in the future"),
});

type Values = z.infer<typeof schema>;

const planPrice = (plan: string) =>
  Number((PLANS.find((p) => p.name === plan)?.price ?? "0").replace(/,/g, ""));

interface Props {
  formRef: React.RefObject<HTMLFormElement | null>;
  manager: HallManager;
  onDone: () => void;
}

export default function SubscriptionPaymentForm({
  formRef,
  manager,
  onDone,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema) as Resolver<Values>,
    defaultValues: {
      amount: planPrice(manager.plan),
      transactionId: "",
      bankName: "",
      activeTill: "",
    },
  });

  const onValid: SubmitHandler<Values> = (data) => {
    const payment = {
      id: id(),
      managerId: manager.id,
      name: manager.name,
      transactionId: data.transactionId,
      amount: data.amount,
      date: today,
      bankName: data.bankName,
      activeTill: data.activeTill,
    };
    useStore.setState((s) => ({
      subscriptionPayments: [...s.subscriptionPayments, payment],
      hallManagers: s.hallManagers.map((x) =>
        x.id === manager.id ? { ...x, status: "PAID" as const } : x,
      ),
    }));
    useStore.getState().toast(`${manager.name} marked as PAID successfully!`);
    onDone();
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(onValid)}>
      <div className="mb-4 rounded-lg bg-gray-50 px-[14px] py-[9px] text-sm">
        <span className="font-medium text-gray-800">{manager.name}</span>
        <span className="text-gray-500"> · {manager.plan} plan</span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="mb-4">
          <label className="mb-1 block text-[13px] font-medium text-gray-700">
            Price (Rs.) <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            min="1"
            className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10"
            placeholder="Enter amount"
            {...register("amount")}
          />
          {errors.amount && <Err msg={errors.amount.message} />}
        </div>
        <div className="mb-4">
          <label className="mb-1 block text-[13px] font-medium text-gray-700">
            Transaction ID <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10"
            placeholder="TRX-000000"
            {...register("transactionId")}
          />
          {errors.transactionId && <Err msg={errors.transactionId.message} />}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="mb-4">
          <label className="mb-1 block text-[13px] font-medium text-gray-700">
            Bank Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10"
            placeholder="e.g. HBL, UBL, Meezan Bank"
            {...register("bankName")}
          />
          {errors.bankName && <Err msg={errors.bankName.message} />}
        </div>
        <div className="mb-4">
          <label className="mb-1 block text-[13px] font-medium text-gray-700">
            Subscription Active Till <span className="text-danger">*</span>
          </label>
          <input
            type="date"
            min={today}
            className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10"
            {...register("activeTill")}
          />
          {errors.activeTill && <Err msg={errors.activeTill.message} />}
        </div>
      </div>
    </form>
  );
}

function Err({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <div className="mt-1 text-xs text-danger">{msg}</div>;
}
