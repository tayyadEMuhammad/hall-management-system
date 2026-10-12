"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  type Resolver,
  type SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { z } from "zod";
import { formatCurrency } from "@/lib/format";
import { bookingId, id } from "@/lib/seed";
import { venueConflict } from "@/lib/selectors";
import type { Booking } from "@/lib/types";
import { BOOKING_STATUSES, EVENT_TYPES } from "@/lib/types";
import { useStore } from "@/store/useStore";

const schema = z.object({
  customerId: z.string().min(1, "Select a customer"),
  eventType: z.string().min(1, "Event type is required"),
  eventDate: z.string().min(1, "Event date is required"),
  venueId: z.string().min(1, "Select a venue"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  guests: z.coerce.number().min(1, "At least 1 guest"),
  status: z.string().default("tentative"),
  foodPackageId: z.string().optional().nullable(),
  specialInstructions: z.string().optional().default(""),
  services: z
    .array(
      z.object({
        name: z.string(),
        price: z.coerce.number().default(0),
      }),
    )
    .default([]),
});

export type BookingFormValues = z.infer<typeof schema>;
const resolver = zodResolver(schema) as Resolver<BookingFormValues>;

interface Props {
  formRef: React.RefObject<HTMLFormElement | null>;
  initial?: Booking | null;
}

export default function BookingForm({ formRef, initial }: Props) {
  const router = useRouter();
  const { customers, venues, foodPackages, bookings, toast } = useStore();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver,
    defaultValues: initial
      ? {
          customerId: initial.customerId,
          eventType: initial.eventType,
          eventDate: initial.eventDate,
          venueId: initial.venueId,
          startTime: initial.startTime,
          endTime: initial.endTime,
          guests: initial.guests,
          status: initial.status,
          foodPackageId: initial.foodPackageId ?? "",
          specialInstructions: initial.specialInstructions,
          services: initial.additionalServices,
        }
      : {
          eventType: "Wedding",
          startTime: "18:00",
          endTime: "22:00",
          guests: 100,
          status: "tentative",
          services: [{ name: "Decoration", price: 50000 }],
        },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "services",
  });

  const [_customerId, venueId, guests, foodPackageId, services] = watch([
    "customerId",
    "venueId",
    "guests",
    "foodPackageId",
    "services",
  ]);

  const venue = venues.find((v) => v.id === venueId);
  const pkg = foodPackages.find((p) => p.id === foodPackageId);
  const venuePrice = venue?.price ?? 0;
  const g = Number(guests) || 0;
  const foodTotal = pkg ? g * pkg.pricePerPerson : 0;
  const serviceTotal = (services ?? []).reduce(
    (s, i) => s + (Number(i.price) || 0),
    0,
  );
  const grandTotal = venuePrice + foodTotal + serviceTotal;

  const onValid: SubmitHandler<BookingFormValues> = (data) => {
    const conflict = venueConflict(
      bookings,
      data.venueId,
      data.eventDate,
      data.startTime,
      data.endTime,
      initial?.id,
    );
    if (conflict) {
      toast("This venue is already booked for the selected time!", "error");
      return;
    }

    const customer = customers.find((c) => c.id === data.customerId);
    const selectedVenue = venues.find((v) => v.id === data.venueId);
    const selectedPkg = foodPackages.find((p) => p.id === data.foodPackageId);
    const svcTotal = data.services.reduce(
      (s, i) => s + (Number(i.price) || 0),
      0,
    );
    const pkgPrice =
      data.foodPackageId && selectedPkg ? selectedPkg.pricePerPerson : 0;
    const food = selectedPkg ? g * selectedPkg.pricePerPerson : 0;
    const total = venuePrice + food + svcTotal;
    const paid = initial?.paidAmount ?? 0;

    const booking: Booking = {
      id: initial?.id ?? id(),
      bookingId: initial?.bookingId ?? bookingId(bookings.length + 1),
      customerId: data.customerId,
      customerName: customer?.name ?? "Unknown",
      eventType: data.eventType,
      eventDate: data.eventDate,
      startTime: data.startTime,
      endTime: data.endTime,
      guests: data.guests,
      venueId: data.venueId,
      venueName: selectedVenue?.name ?? "Unknown",
      branch: selectedVenue?.branch ?? "",
      venuePrice,
      status: data.status as Booking["status"],
      totalAmount: total,
      paidAmount: paid,
      remainingAmount: total - paid,
      foodPackageId: data.foodPackageId || null,
      foodPackageName: selectedPkg?.name ?? "",
      foodPricePerPerson: pkgPrice,
      foodTotal: food,
      additionalServices: data.services.filter((s) => s.name.trim()),
      specialInstructions: data.specialInstructions ?? "",
      createdAt: initial?.createdAt ?? new Date().toISOString(),
    };

    useStore.setState((s) => ({
      bookings: initial
        ? s.bookings.map((b) => (b.id === initial.id ? booking : b))
        : [...s.bookings, booking],
    }));

    toast(
      initial
        ? "Booking updated successfully!"
        : "Booking created successfully!",
    );
    router.push("/dashboard/bookings");
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(onValid)}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="mb-4">
          <label className="mb-1 block text-[13px] font-medium text-gray-700">
            Customer Name <span className="text-danger">*</span>
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
          {errors.customerId && <FieldError msg={errors.customerId.message} />}
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
          {errors.eventDate && <FieldError msg={errors.eventDate.message} />}
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
                {v.name} ({v.branch}) - {formatCurrency(v.price)}
              </option>
            ))}
          </select>
          {errors.venueId && <FieldError msg={errors.venueId.message} />}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="mb-4">
          <label className="mb-1 block text-[13px] font-medium text-gray-700">
            Start Time <span className="text-danger">*</span>
          </label>
          <input
            type="time"
            className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10"
            {...register("startTime")}
          />
        </div>
        <div className="mb-4">
          <label className="mb-1 block text-[13px] font-medium text-gray-700">
            End Time <span className="text-danger">*</span>
          </label>
          <input
            type="time"
            className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10"
            {...register("endTime")}
          />
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
          {errors.guests && <FieldError msg={errors.guests.message} />}
        </div>
        <div className="mb-4">
          <label className="mb-1 block text-[13px] font-medium text-gray-700">
            Status
          </label>
          <select
            className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10 select-arrow pr-9"
            {...register("status")}
          >
            {BOOKING_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <h4 className="mb-3">
          <i className="fas fa-utensils text-primary" /> Food & Catering
        </h4>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="mb-4">
            <label className="mb-1 block text-[13px] font-medium text-gray-700">
              Food Package
            </label>
            <select
              className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10 select-arrow pr-9"
              {...register("foodPackageId")}
            >
              <option value="">Custom Menu</option>
              {foodPackages.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} - {formatCurrency(p.pricePerPerson)}/person
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="mb-1 block text-[13px] font-medium text-gray-700">
              Food Total
            </label>
            <div className="px-[14px] py-[9px] bg-gray-50 rounded-lg font-semibold text-base">
              {formatCurrency(foodTotal)}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label className="mb-1 block text-[13px] font-medium text-gray-700">
            Special Instructions
          </label>
          <input
            type="text"
            className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10"
            placeholder="Less spicy, extra BBQ, etc."
            {...register("specialInstructions")}
          />
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <h4 className="mb-3">
          <i className="fas fa-concierge-bell text-primary" /> Additional
          Services
        </h4>
        {fields.map((field, i) => (
          <div
            key={field.id}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-2"
          >
            <div className="mb-0">
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10"
                placeholder="Service name"
                {...register(`services.${i}.name`)}
              />
            </div>
            <div className="mb-0 flex gap-2">
              <input
                type="number"
                className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10"
                placeholder="Price"
                {...register(`services.${i}.price`)}
              />
              <button
                type="button"
                className="inline-flex cursor-pointer items-center gap-2 rounded-lg px-[12px] py-[6px] font-sans text-xs font-medium leading-none text-white transition-all bg-danger hover:bg-[#dc2626]"
                onClick={() => remove(i)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-gray-200 px-[12px] py-[6px] font-sans text-xs font-medium leading-none text-gray-700 transition-all hover:bg-gray-300"
          onClick={() => append({ name: "", price: 0 })}
        >
          <i className="fas fa-plus"></i> Add Service
        </button>
      </div>

      <div className="mt-5 p-4 bg-gray-50 rounded-lg">
        <h4 className="mb-2">Total Summary</h4>
        <SummaryRow label="Venue Charges" value={formatCurrency(venuePrice)} />
        <SummaryRow label="Food Charges" value={formatCurrency(foodTotal)} />
        <SummaryRow
          label="Additional Services"
          value={formatCurrency(serviceTotal)}
        />
        <div className="flex justify-between text-lg font-bold mt-2 pt-2 border-t-2 border-gray-200">
          <span>Grand Total</span>
          <span>{formatCurrency(grandTotal)}</span>
        </div>
      </div>
    </form>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm mt-1">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <div className="text-xs text-danger mt-1">
      <i className="fas fa-exclamation-circle"></i> {msg}
    </div>
  );
}
