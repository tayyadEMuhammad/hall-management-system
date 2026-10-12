"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { type Resolver, type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { id } from "@/lib/seed";
import type { Venue } from "@/lib/types";
import { VENUE_TYPES } from "@/lib/types";
import { useStore } from "@/store/useStore";

const schema = z.object({
  name: z.string().min(1, "Venue name is required"),
  type: z.string().min(1, "Type is required"),
  branch: z.string().min(1, "Branch is required"),
  capacity: z.coerce.number().min(0).default(0),
  price: z.coerce.number().min(1, "Price is required"),
});

type Values = z.infer<typeof schema>;

interface Props {
  formRef: React.RefObject<HTMLFormElement | null>;
  initial?: Venue | null;
  onDone: () => void;
}

export default function VenueForm({ formRef, initial, onDone }: Props) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema) as Resolver<Values>,
    defaultValues: initial
      ? { ...initial }
      : { type: "Lawn", branch: "Branch 1" },
  });

  const onValid: SubmitHandler<Values> = (data) => {
    const venue: Venue = {
      id: initial?.id ?? id(),
      name: data.name.trim(),
      type: data.type,
      branch: data.branch,
      capacity: data.capacity,
      price: data.price,
    };
    useStore.setState((s) => ({
      venues: initial
        ? s.venues.map((v) => (v.id === initial.id ? venue : v))
        : [...s.venues, venue],
    }));
    useStore
      .getState()
      .toast(
        initial ? "Venue updated successfully!" : "Venue added successfully!",
      );
    router.push("/dashboard/branches");
    onDone();
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(onValid)}>
      <div className="mb-4">
        <label className="mb-1 block text-[13px] font-medium text-gray-700">
          Venue Name <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10"
          placeholder="e.g., Main Lawn"
          {...register("name")}
        />
        {errors.name && <Err msg={errors.name.message} />}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="mb-4">
          <label className="mb-1 block text-[13px] font-medium text-gray-700">
            Type <span className="text-danger">*</span>
          </label>
          <select
            className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10 select-arrow pr-9"
            {...register("type")}
          >
            {VENUE_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="mb-1 block text-[13px] font-medium text-gray-700">
            Branch <span className="text-danger">*</span>
          </label>
          <select
            className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10 select-arrow pr-9"
            {...register("branch")}
          >
            <option value="Branch 1">Branch 1</option>
            <option value="Branch 2">Branch 2</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="mb-4">
          <label className="mb-1 block text-[13px] font-medium text-gray-700">
            Capacity
          </label>
          <input
            type="number"
            className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10"
            placeholder="0"
            {...register("capacity")}
          />
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
    </form>
  );
}

function Err({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <div className="text-xs text-danger mt-1">{msg}</div>;
}
