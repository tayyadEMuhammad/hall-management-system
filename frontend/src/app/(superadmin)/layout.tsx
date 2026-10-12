"use client";

import Link from "next/link";
import Toasts from "@/components/Toasts";

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="sticky top-0 z-[100] flex h-16 items-center justify-between gap-3 border-b border-gray-200 bg-white/90 px-4 backdrop-blur md:px-8">
        <Link href="/admin" className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
            <i className="fas fa-ring"></i>
          </span>
          <span className="hidden truncate text-lg font-extrabold tracking-tight text-gray-900 sm:inline">
            Marriage<span className="text-primary">Lawn</span>
          </span>
          <span className="rounded-full bg-primary-light px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-primary uppercase">
            Super Admin
          </span>
        </Link>
        <Link
          href="/"
          className="shrink-0 text-sm font-medium text-gray-500 transition hover:text-gray-900"
        >
          View Site
        </Link>
      </header>
      <main className="p-3 sm:p-4 md:p-[28px_32px]">{children}</main>
      <Toasts />
    </>
  );
}
