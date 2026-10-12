"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { type Resolver, type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { id } from "@/lib/seed";
import type { Customer } from "@/lib/types";
import { useStore } from "@/store/useStore";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone is required"),
  whatsapp: z.string().optional().default(""),
  address: z.string().optional().default(""),
});

type Values = z.infer<typeof schema>;

interface Props {
  formRef: React.RefObject<HTMLFormElement | null>;
  initial?: Customer | null;
  onDone: () => void;
}

export default function CustomerForm({ formRef, initial, onDone }: Props) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema) as Resolver<Values>,
    defaultValues: initial
      ? {
          name: initial.name,
          phone: initial.phone,
          whatsapp: initial.whatsapp,
          address: initial.address,
        }
      : undefined,
  });

  const onValid: SubmitHandler<Values> = (data) => {
    const customer: Customer = {
      id: initial?.id ?? id(),
      name: data.name.trim(),
      phone: data.phone.trim(),
      whatsapp: (data.whatsapp ?? "").trim(),
      address: (data.address ?? "").trim(),
    };
    useStore.setState((s) => ({
      customers: initial
        ? s.customers.map((c) => (c.id === initial.id ? customer : c))
        : [...s.customers, customer],
    }));
    useStore
      .getState()
      .toast(
        initial
          ? "Customer updated successfully!"
          : "Customer added successfully!",
      );
    router.push("/dashboard/customers");
    onDone();
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(onValid)}>
      <div className="mb-4">
        <label className="mb-1 block text-[13px] font-medium text-gray-700">
          Name <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10"
          placeholder="Enter full name"
          {...register("name")}
        />
        {errors.name && <Err msg={errors.name.message} />}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="mb-4">
          <label className="mb-1 block text-[13px] font-medium text-gray-700">
            Phone <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10"
            placeholder="0300-1234567"
            {...register("phone")}
          />
          {errors.phone && <Err msg={errors.phone.message} />}
        </div>
        <div className="mb-4">
          <label className="mb-1 block text-[13px] font-medium text-gray-700">
            WhatsApp
          </label>
          <input
            type="text"
            className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10"
            placeholder="0300-1234567"
            {...register("whatsapp")}
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="mb-1 block text-[13px] font-medium text-gray-700">
          Address
        </label>
        <input
          type="text"
          className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10"
          placeholder="Enter address"
          {...register("address")}
        />
      </div>
    </form>
  );
}

function Err({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <div className="text-xs text-danger mt-1">{msg}</div>;
}
