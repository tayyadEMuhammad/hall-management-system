"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { formatFullDate } from "@/lib/format";

const TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/bookings": "Bookings",
  "/dashboard/calendar": "Calendar",
  "/dashboard/customers": "Customers",
  "/dashboard/food": "Food & Catering",
  "/dashboard/payments": "Payments",
  "/dashboard/quotations": "Quotations",
  "/dashboard/reports": "Reports",
  "/dashboard/users": "Users",
  "/dashboard/branches": "Branches & Venues",
  "/dashboard/settings": "Settings",
};

export default function Header({ onMenuToggle }: { onMenuToggle: () => void }) {
  const pathname = usePathname();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);

  const title = TITLES[pathname] ?? "Dashboard";

  return (
    <header className="sticky top-0 z-[100] flex h-16 items-center justify-between border-b border-gray-200 bg-white/90 px-8 backdrop-blur md:px-4">
      <div className="flex items-center gap-4">
        <button
          className="cursor-pointer rounded-md border-none p-1 text-xl text-gray-600 transition-all hover:bg-gray-100 md:hidden"
          onClick={onMenuToggle}
        >
          <i className="fas fa-bars"></i>
        </button>
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      </div>
      <div className="flex items-center gap-4">
        <span className="hidden text-[13px] text-gray-500 md:inline">
          {formatFullDate(now)}
        </span>
        <div className="flex cursor-pointer items-center gap-2.5 rounded-full bg-gray-100 py-1.5 pl-1.5 pr-3 transition-all hover:bg-gray-200">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
            A
          </div>
          <span className="text-[13px] font-medium text-gray-700 max-[480px]:hidden">
            Admin
          </span>
        </div>
      </div>
    </header>
  );
}
