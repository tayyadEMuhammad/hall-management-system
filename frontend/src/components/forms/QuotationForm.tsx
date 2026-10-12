"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { type Resolver, type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { formatCurrency } from "@/lib/format";
import { id, quotationId } from "@/lib/seed";
import type { Quotation } from "@/lib/types";
import { EVENT_TYPES } from "@/lib/types";
import { useStore } from "@/store/useStore";

const schema = z.object({
  customerId: z.string().min(1, "Select a customer"),
  eventType: z.string().min(1, "Event type is required"),
  eventDate: z.string().min(1, "Event date is required"),
  venueId: z.string().min(1, "Select a venue"),
  guests: z.coerce.number().min(1, "At least 1 guest"),
  packageId: z.string().optional().default(""),
  terms: z.string().optional().default(""),
});

type Values = z.infer<typeof schema>;

interface Props {
  formRef: React.RefObject<HTMLFormElement | null>;
  onDone: () => void;
}

export default function QuotationForm({ formRef, onDone }: Props) {
  const router = useRouter();
  const customers = useStore((s) => s.customers);
  const venues = useStore((s) => s.venues);
  const foodPackages = useStore((s) => s.foodPackages);
  const quotations = useStore((s) => s.quotations);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema) as Resolver<Values>,
    defaultValues: {
      eventType: "Wedding",
      guests: 100,
      terms: "50% advance payment required. Balance due 7 days before event.",
    },
  });

  const [venueId, guests, packageId] = watch([
    "venueId",
    "guests",
    "packageId",
  ]);
  const venue = venues.find((v) => v.id === venueId);
  const pkg = foodPackages.find((p) => p.id === packageId);
  const g = Number(guests) || 0;
  const venuePrice = venue?.price ?? 0;
  const foodTotal = pkg ? g * pkg.pricePerPerson : 0;
  const total = venuePrice + foodTotal;

  const onValid: SubmitHandler<Values> = (data) => {
    const customer = customers.find((c) => c.id === data.customerId);
    const selectedVenue = venues.find((v) => v.id === data.venueId);
    const selectedPkg = foodPackages.find((p) => p.id === data.packageId);
    const g2 = Number(data.guests) || 0;
    const food = selectedPkg ? g2 * selectedPkg.pricePerPerson : 0;
    const venuePrice2 = selectedVenue?.price ?? 0;

    const quote: Quotation = {
      id: id(),
      quotationId: quotationId(quotations.length + 1),
      customerId: data.customerId,
      customerName: customer?.name ?? "Unknown",
      eventType: data.eventType,
      eventDate: data.eventDate,
      venueId: data.venueId,
      venueName: selectedVenue?.name ?? "Unknown",
      guests: data.guests,
      totalAmount: venuePrice2 + food,
      status: "draft",
      terms: data.terms ?? "",
      createdAt: new Date().toISOString(),
    };
    useStore.setState((s) => ({ quotations: [...s.quotations, quote] }));
    useStore.getState().toast("Quotation created successfully!");
    router.push("/dashboard/quotations");
    onDone();
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(onValid)}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="mb-4">
          <label className="mb-1 block text-[13px] font-medium text-gray-700">
            Customer <span className="text-danger">*</span>
          </label>
          <select
            className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10 select-arrow pr-9"
            {...register("customerId")}
          >
            <option value="">Select Customer</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.phone})
              </option>
            ))}
          </select>
          {errors.customerId && <Err msg={errors.customerId.message} />}
        </div>
        <div className="mb-4">
          <label className="mb-1 block text-[13px] font-medium text-gray-700">
            Event Type <span className="text-danger">*</span>
          </label>
          <select
            className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10 select-arrow pr-9"
            {...register("eventType")}
          >
            {EVENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="mb-4">
          <label className="mb-1 block text-[13px] font-medium text-gray-700">
            Event Date <span className="text-danger">*</span>
          </label>
          <input
            type="date"
            className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10"
            {...register("eventDate")}
          />
          {errors.eventDate && <Err msg={errors.eventDate.message} />}
        </div>
        <div className="mb-4">
          <label className="mb-1 block text-[13px] font-medium text-gray-700">
            Venue <span className="text-danger">*</span>
          </label>
          <select
            className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10 select-arrow pr-9"
            {...register("venueId")}
          >
            <option value="">Select Venue</option>
            {venues.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name} - {formatCurrency(v.price)}
              </option>
            ))}
          </select>
          {errors.venueId && <Err msg={errors.venueId.message} />}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="mb-4">
          <label className="mb-1 block text-[13px] font-medium text-gray-700">
            Guests <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10"
            min="1"
            {...register("guests")}
          />
        </div>
        <div className="mb-4">
          <label className="mb-1 block text-[13px] font-medium text-gray-700">
            Food Package
          </label>
          <select
            className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10 select-arrow pr-9"
            {...register("packageId")}
          >
            <option value="">Custom Menu</option>
            {foodPackages
              .filter((p) => p.status === "active")
              .map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} - {formatCurrency(p.pricePerPerson)}/person
                </option>
              ))}
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="mb-1 block text-[13px] font-medium text-gray-700">
          Terms & Conditions
        </label>
        <textarea
          className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10"
          rows={3}
          {...register("terms")}
        />
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h4 className="mb-2">Quotation Summary</h4>
        <div className="flex justify-between text-sm">
          <span>Venue Charges</span>
          <span>{formatCurrency(venuePrice)}</span>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <span>Food Charges</span>
          <span>{formatCurrency(foodTotal)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold mt-2 pt-2 border-t-2 border-gray-200">
          <span>Total Amount</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>
    </form>
  );
}

function Err({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <div className="text-xs text-danger mt-1">{msg}</div>;
}
