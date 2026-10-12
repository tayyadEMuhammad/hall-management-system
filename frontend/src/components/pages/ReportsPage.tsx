"use client";

import { useRouter } from "next/navigation";
import { StatCard } from "@/components/ui";
import { formatCurrency } from "@/lib/format";
import { getBookingStats } from "@/lib/selectors";
import { useStore } from "@/store/useStore";

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const BTN =
  "inline-flex cursor-pointer items-center gap-2 rounded-lg px-[18px] py-[9px] font-sans text-sm font-medium leading-none transition-all";
const BTN_SM = "px-3! py-1.5! text-xs";
const BTN_SECONDARY = "bg-gray-200 text-gray-700 hover:bg-gray-300";

export default function ReportsPage() {
  const router = useRouter();
  const bookings = useStore((s) => s.bookings);
  const payments = useStore((s) => s.payments);
  const expenses = useStore((s) => s.expenses);
  const stats = getBookingStats({ bookings, payments });

  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  const profit = stats.totalPaid - totalExpenses;
  const year = new Date().getFullYear();

  const monthlyData = MONTH_NAMES.map((m, i) => {
    const month = String(i + 1).padStart(2, "0");
    const monthBookings = bookings.filter((b) =>
      b.eventDate?.startsWith(`${year}-${month}`),
    );
    const revenue = monthBookings.reduce((s, b) => s + (b.paidAmount || 0), 0);
    return { month: m, revenue };
  });
  const max = Math.max(...monthlyData.map((m) => m.revenue), 1);

  return (
    <>
      <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-bold tracking-[-0.5px] text-gray-900 md:text-xl">
            Reports
          </h1>
          <p className="mt-0.5 text-sm text-gray-500">
            Business performance and financial insights
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6 sm:grid-cols-2">
        <StatCard
          icon=""
          label="Total Revenue"
          value={formatCurrency(stats.totalPaid)}
          color="var(--color-success)"
        />
        <StatCard
          icon=""
          label="Total Expenses"
          value={formatCurrency(totalExpenses)}
          color="var(--color-danger)"
        />
        <StatCard
          icon=""
          label="Net Profit"
          value={formatCurrency(profit)}
          color={profit >= 0 ? "var(--color-success)" : "var(--color-danger)"}
        />
        <StatCard
          icon=""
          label="Pending Amount"
          value={formatCurrency(stats.pending)}
          color="var(--color-warning)"
        />
      </div>

      <div className="grid grid-cols-[2fr_1fr] gap-5 md:grid-cols-1">
        <div className="rounded-xl border border-gray-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.08),0_4px_6px_-2px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between border-b border-gray-100 px-[22px] py-[18px]">
            <h3 className="text-[15px] font-semibold text-gray-800">
              Monthly Revenue
            </h3>
            <span className="text-xs text-gray-400">{year}</span>
          </div>
          <div className="p-[22px]">
            <div className="flex h-[200px] items-end gap-2 pt-5">
              {monthlyData.map((d) => {
                const height = (d.revenue / max) * 160;
                return (
                  <div
                    key={d.month}
                    className="flex-1 flex flex-col items-center"
                  >
                    <div className="text-[11px] text-gray-500 mb-1">
                      {formatCurrency(d.revenue)}
                    </div>
                    <div
                      className="w-full bg-primary rounded-t-[4px]"
                      style={{
                        height: `${Math.max(height, 4)}px`,
                        minHeight: 4,
                        transition: "height 0.3s",
                      }}
                    />
                    <div className="text-[11px] text-gray-500 mt-1">
                      {d.month}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div>
          <div className="rounded-xl border border-gray-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.08),0_4px_6px_-2px_rgba(0,0,0,0.03)] mb-4">
            <div className="flex items-center justify-between border-b border-gray-100 px-[22px] py-[18px]">
              <h3 className="text-[15px] font-semibold text-gray-800">
                Recent Expenses
              </h3>
            </div>
            <div className="p-3">
              {expenses.length === 0 ? (
                <p className="text-gray-500 text-sm">No expenses recorded</p>
              ) : (
                expenses
                  .slice(-5)
                  .reverse()
                  .map((e) => (
                    <div
                      key={e.id}
                      className="flex justify-between py-1.5 border-b border-gray-100 text-[13px]"
                    >
                      <span>{e.title}</span>
                      <span className="text-danger">
                        {formatCurrency(e.amount)}
                      </span>
                    </div>
                  ))
              )}
              <button
                className={`${BTN} ${BTN_SECONDARY} ${BTN_SM} mt-2 w-full`}
                onClick={() => router.push("/dashboard/settings")}
              >
                <i className="fas fa-plus"></i> Add Expense
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.08),0_4px_6px_-2px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between border-b border-gray-100 px-[22px] py-[18px]">
              <h3 className="text-[15px] font-semibold text-gray-800">
                Quick Stats
              </h3>
            </div>
            <div className="p-3">
              <div className="flex justify-between py-1">
                <span>Total Bookings</span>
                <strong>{stats.total}</strong>
              </div>
              <div className="flex justify-between py-1">
                <span>Confirmed</span>
                <span className="text-success">{stats.confirmed}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Tentative</span>
                <span className="text-warning">{stats.tentative}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Cancelled</span>
                <span className="text-danger">{stats.cancelled}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
