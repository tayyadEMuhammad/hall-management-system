"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/store/useStore";

interface NavItem {
  href: string;
  label: string;
  icon: string;
  badge?: boolean;
}

const NAV: { label: string; items: NavItem[] }[] = [
  {
    label: "Main",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: "fa-th-large" },
      {
        href: "/dashboard/bookings",
        label: "Bookings",
        icon: "fa-calendar-check",
        badge: true,
      },
      {
        href: "/dashboard/calendar",
        label: "Calendar",
        icon: "fa-calendar-alt",
      },
      { href: "/dashboard/customers", label: "Customers", icon: "fa-users" },
    ],
  },
  {
    label: "Management",
    items: [
      {
        href: "/dashboard/food",
        label: "Food & Catering",
        icon: "fa-utensils",
      },
      {
        href: "/dashboard/payments",
        label: "Payments",
        icon: "fa-credit-card",
      },
      {
        href: "/dashboard/quotations",
        label: "Quotations",
        icon: "fa-file-invoice",
      },
      { href: "/dashboard/reports", label: "Reports", icon: "fa-chart-bar" },
    ],
  },
  {
    label: "Settings",
    items: [
      { href: "/dashboard/users", label: "Users", icon: "fa-user-cog" },
      {
        href: "/dashboard/branches",
        label: "Branches & Venues",
        icon: "fa-building",
      },
      { href: "/dashboard/settings", label: "Settings", icon: "fa-cog" },
    ],
  },
];

export default function Sidebar({
  open,
  onNavigate,
}: {
  open: boolean;
  onNavigate: () => void;
}) {
  const pathname = usePathname();
  const bookingCount = useStore((s) => s.bookings.length);

  return (
    <>
      <div
        className={`fixed inset-0 z-[999] bg-black/40 md:hidden ${
          open ? "block" : "hidden"
        }`}
        onClick={onNavigate}
      />
      <aside
        className={`fixed bottom-0 left-0 top-0 z-[1000] w-[280px] overflow-y-auto border-r border-gray-200 bg-white transition-transform duration-300 md:w-[240px] md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center gap-2.5 border-b border-gray-200 p-[18px_20px]">
          <i className="fas fa-ring text-2xl text-primary"></i>
          <h1 className="text-xl font-extrabold tracking-[-0.5px] text-gray-900">
            Marriage<span className="text-primary">Lawn</span>
          </h1>
        </div>
        <nav className="p-3">
          {NAV.map((group) => (
            <div key={group.label}>
              <div
                className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-[0.5px] text-gray-400"
                style={group.label === "Main" ? undefined : { marginTop: 12 }}
              >
                {group.label}
              </div>
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative flex cursor-pointer items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium text-gray-600 no-underline transition-all hover:bg-gray-100 hover:text-gray-900 ${
                    pathname === item.href
                      ? "bg-primary-light text-primary hover:bg-primary-light hover:text-primary"
                      : ""
                  }`}
                  onClick={onNavigate}
                >
                  <i
                    className={`fas ${item.icon} w-5 text-center text-base`}
                  ></i>
                  {item.label}
                  {item.badge && (
                    <span className="ml-auto rounded-full bg-danger px-2 py-0.5 text-[10px] font-semibold text-white">
                      {bookingCount}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
