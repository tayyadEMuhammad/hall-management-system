"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { type Resolver, type SubmitHandler, useForm } from "react-hook-form";
import { PLANS } from "@/constants";
import { type SignupValues, signupSchema } from "@/lib/auth-validation";

const inputClass =
  "w-full rounded-lg border px-[14px] py-[9px] text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:outline-none focus:ring-[3px]";

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema) as Resolver<SignupValues>,
    mode: "onChange",
  });

  const onValid: SubmitHandler<SignupValues> = (data) => {
    console.log("signup", data);
  };

  const border = (bad?: unknown) =>
    bad
      ? "border-danger focus:border-danger focus:ring-danger/10"
      : "border-gray-300 focus:border-primary focus:ring-primary/10";

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <Link
          href="/"
          className="mb-6 flex items-center justify-center gap-2.5"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white">
            <i className="fas fa-ring"></i>
          </span>
          <span className="text-lg font-extrabold tracking-tight text-gray-900">
            Marriage<span className="text-primary">Lawn</span>
          </span>
        </Link>

        <h1 className="text-center text-2xl font-bold tracking-tight text-gray-900">
          Create your account
        </h1>
        <p className="mt-1 text-center text-sm text-gray-500">
          Onboard your hall and pick a plan
        </p>

        <form
          noValidate
          onSubmit={handleSubmit(onValid)}
          className="mt-6 space-y-4"
        >
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-[13px] font-medium text-gray-700"
            >
              Name <span className="text-danger">*</span>
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              placeholder="Enter full name"
              className={`${inputClass} ${border(errors.name)}`}
              {...register("name")}
            />
            {errors.name && <Err msg={errors.name.message} />}
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-[13px] font-medium text-gray-700"
            >
              Email <span className="text-danger">*</span>
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className={`${inputClass} ${border(errors.email)}`}
              {...register("email")}
            />
            {errors.email && <Err msg={errors.email.message} />}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="mb-1 block text-[13px] font-medium text-gray-700"
            >
              Phone Number <span className="text-danger">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder="0300-1234567"
              className={`${inputClass} ${border(errors.phone)}`}
              {...register("phone")}
            />
            {errors.phone && <Err msg={errors.phone.message} />}
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-[13px] font-medium text-gray-700"
            >
              Password <span className="text-danger">*</span>
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="Minimum 8 characters"
              className={`${inputClass} ${border(errors.password)}`}
              {...register("password")}
            />
            {errors.password && <Err msg={errors.password.message} />}
          </div>

          <div>
            <label
              htmlFor="plan"
              className="mb-1 block text-[13px] font-medium text-gray-700"
            >
              Subscription Plan <span className="text-danger">*</span>
            </label>
            <select
              id="plan"
              className={`select-arrow ${inputClass} ${border(errors.plan)}`}
              {...register("plan")}
            >
              <option value="">Select a plan</option>
              {PLANS.map((p) => (
                <option key={p.name} value={p.name}>
                  {p.name} — Rs. {p.price}/month
                </option>
              ))}
            </select>
            {errors.plan && <Err msg={errors.plan.message} />}
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-primary px-5 py-[11px] text-sm font-semibold text-white transition hover:bg-primary-hover"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-primary hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}

function Err({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <div className="mt-1 text-xs text-danger">{msg}</div>;
}
