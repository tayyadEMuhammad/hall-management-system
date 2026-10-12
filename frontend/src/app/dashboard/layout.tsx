"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Toasts from "@/components/Toasts";
import { bookingModalBus } from "@/lib/events";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        e.ctrlKey &&
        e.key.toLowerCase() === "n" &&
        (pathname === "/dashboard/bookings" || pathname === "/dashboard")
      ) {
        e.preventDefault();
        bookingModalBus.dispatchEvent(new Event("open-booking"));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pathname]);

  return (
    <>
      <Sidebar open={sidebarOpen} onNavigate={() => setSidebarOpen(false)} />
      <div className="min-h-screen md:ml-[240px]">
        <Header onMenuToggle={() => setSidebarOpen((v) => !v)} />
        <div className="p-4 md:p-[28px_32px]">{children}</div>
      </div>
      <Toasts />
    </>
  );
}
