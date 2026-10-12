"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { type Resolver, type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { formatCurrency } from "@/lib/format";
import { id } from "@/lib/seed";
import type { FoodPackage } from "@/lib/types";
import { useStore } from "@/store/useStore";

const schema = z.object({
  name: z.string().min(1, "Package name is required"),
  pricePerPerson: z.coerce.number().min(1, "Price is required"),
  status: z.string().default("active"),
  description: z.string().optional().default(""),
  dishes: z.array(z.string()).optional().default([]),
});

type Values = z.infer<typeof schema>;

interface Props {
  formRef: React.RefObject<HTMLFormElement | null>;
  initial?: FoodPackage | null;
  onDone: () => void;
}

export default function PackageForm({ formRef, initial, onDone }: Props) {
  const router = useRouter();
  const dishes = useStore((s) => s.dishes);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema) as Resolver<Values>,
    defaultValues: initial
      ? {
          name: initial.name,
          pricePerPerson: initial.pricePerPerson,
          status: initial.status,
          description: initial.description,
          dishes: initial.dishes,
        }
      : { status: "active" },
  });

  const onValid: SubmitHandler<Values> = (data) => {
    const pkg: FoodPackage = {
      id: initial?.id ?? id(),
      name: data.name.trim(),
      pricePerPerson: data.pricePerPerson,
      description: (data.description ?? "").trim(),
      dishes: data.dishes ?? [],
      status: data.status,
    };
    useStore.setState((s) => ({
      foodPackages: initial
        ? s.foodPackages.map((p) => (p.id === initial.id ? pkg : p))
        : [...s.foodPackages, pkg],
    }));
    useStore
      .getState()
      .toast(
        initial
          ? "Package updated successfully!"
          : "Package added successfully!",
      );
    router.push("/dashboard/food");
    onDone();
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(onValid)}>
      <div className="mb-4">
        <label className="mb-1 block text-[13px] font-medium text-gray-700">
          Package Name <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10"
          placeholder="e.g., Premium Package"
          {...register("name")}
        />
        {errors.name && <Err msg={errors.name.message} />}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="mb-4">
          <label className="mb-1 block text-[13px] font-medium text-gray-700">
            Price Per Person <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10"
            placeholder="0"
            {...register("pricePerPerson")}
          />
          {errors.pricePerPerson && <Err msg={errors.pricePerPerson.message} />}
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
      </div>
      <div className="mb-4">
        <label className="mb-1 block text-[13px] font-medium text-gray-700">
          Description
        </label>
        <input
          type="text"
          className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10"
          placeholder="Package description"
          {...register("description")}
        />
      </div>
      <div className="mb-4">
        <label className="mb-1 block text-[13px] font-medium text-gray-700">
          Included Dishes
        </label>
        <select
          className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10 select-arrow pr-9"
          multiple
          style={{ height: 120 }}
          {...register("dishes")}
        >
          {dishes
            .filter((d) => d.status === "active")
            .map((d) => (
              <option key={d.id} value={d.name}>
                {d.name} ({formatCurrency(d.price)})
              </option>
            ))}
        </select>
        <div className="text-[11px] text-gray-400 mt-1">
          Hold Ctrl/Cmd to select multiple
        </div>
      </div>
    </form>
  );
}

function Err({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <div className="text-xs text-danger mt-1">{msg}</div>;
}
