"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type Resolver, type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { formatCurrency } from "@/lib/format";
import { id } from "@/lib/seed";
import { getTotalPaid } from "@/lib/selectors";
import type { Booking } from "@/lib/types";
import { PAYMENT_METHODS } from "@/lib/types";
import { useStore } from "@/store/useStore";

const schema = z.object({
  amount: z.coerce.number().min(1, "Enter a valid amount"),
  method: z.string().min(1, "Select a payment method"),
  reference: z.string().optional().default(""),
});

type Values = z.infer<typeof schema>;

interface Props {
  formRef: React.RefObject<HTMLFormElement | null>;
  booking: Booking;
  onDone: () => void;
}

export default function PaymentForm({ formRef, booking, onDone }: Props) {
  const remaining =
    booking.totalAmount -
    getTotalPaid(useStore.getState().payments, booking.id);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema) as Resolver<Values>,
    defaultValues: { method: "cash" },
  });

  const onValid: SubmitHandler<Values> = (data) => {
    if (data.amount > remaining) {
      useStore
        .getState()
        .toast("Amount cannot exceed remaining balance", "error");
      return;
    }
    const payment = {
      id: id(),
      bookingId: booking.id,
      amount: data.amount,
      method: data.method,
      date: new Date().toISOString().split("T")[0],
      reference: data.reference ?? "",
      notes: "",
    };
    useStore.setState((s) => {
      const totalPaid = getTotalPaid([...s.payments, payment], booking.id);
      return {
        payments: [...s.payments, payment],
        bookings: s.bookings.map((b) =>
          b.id === booking.id
            ? {
                ...b,
                paidAmount: totalPaid,
                remainingAmount: b.totalAmount - totalPaid,
              }
            : b,
        ),
      };
    });
    useStore
      .getState()
      .toast(
        `Payment of ${formatCurrency(data.amount)} recorded successfully!`,
      );
    onDone();
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(onValid)}>
      <div className="mb-4">
        <label className="mb-1 block text-[13px] font-medium text-gray-700">
          Booking
        </label>
        <div className="px-[14px] py-[9px] bg-gray-50 rounded-lg font-medium">
          {booking.bookingId} - {booking.customerName}
        </div>
      </div>
      <div className="mb-4">
        <label className="mb-1 block text-[13px] font-medium text-gray-700">
          Remaining Balance
        </label>
        <div className="px-[14px] py-[9px] bg-gray-50 rounded-lg font-semibold text-lg">
          {formatCurrency(remaining)}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="mb-4">
          <label className="mb-1 block text-[13px] font-medium text-gray-700">
            Amount <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10"
            min="1"
            max={remaining}
            placeholder="Enter amount"
            {...register("amount")}
          />
          {errors.amount && (
            <div className="text-xs text-danger mt-1">
              {errors.amount.message}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label className="mb-1 block text-[13px] font-medium text-gray-700">
            Payment Method <span className="text-danger">*</span>
          </label>
          <select
            className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10 select-arrow pr-9"
            {...register("method")}
          >
            {PAYMENT_METHODS.map((m) => (
              <option key={m} value={m}>
                {m.charAt(0).toUpperCase() + m.slice(1).replace("_", " ")}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mb-4">
        <label className="mb-1 block text-[13px] font-medium text-gray-700">
          Reference / Notes
        </label>
        <input
          type="text"
          className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10"
          placeholder="Transaction ID, notes..."
          {...register("reference")}
        />
      </div>
    </form>
  );
}
