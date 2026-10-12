"use client";

import { StatusBadge } from "@/components/Badge";
import BookingModal from "@/components/BookingModal";
import { EmptyState, StatCard } from "@/components/ui";
import {
  formatCurrency,
  formatDate,
  formatTime,
  toLocalDateStr,
} from "@/lib/format";
import { getBookingStats } from "@/lib/selectors";
import type { Booking } from "@/lib/types";
import { useStore } from "@/store/useStore";

function todayRow(b: Booking) {
  return (
    <div
      key={b.id}
      className="flex items-center justify-between py-2.5 border-b border-gray-100"
    >
      <div>
        <div className="font-semibold">{b.customerName}</div>
        <div className="text-[13px] text-gray-500">
          {b.eventType} • {b.venueName} • {b.guests} guests
        </div>
        <div className="text-xs text-gray-400">
          {formatTime(b.startTime)} - {formatTime(b.endTime)}
        </div>
      </div>
      <StatusBadge status={b.status} />
    </div>
  );
}

function upcomingRow(b: Booking) {
  return (
    <div
      key={b.id}
      className="flex items-center justify-between py-2.5 border-b border-gray-100"
    >
      <div>
        <div className="font-semibold">{b.customerName}</div>
        <div className="text-[13px] text-gray-500">
          {b.eventType} • {formatDate(b.eventDate)}
        </div>
      </div>
      <StatusBadge status={b.status} />
    </div>
  );
}

export default function DashboardPage() {
  const bookings = useStore((s) => s.bookings);
  const payments = useStore((s) => s.payments);
  const stats = getBookingStats({ bookings, payments });
  const today = toLocalDateStr(new Date());
  const todayBookings = bookings.filter((b) => b.eventDate === today);
  const upcoming = bookings
    .filter(
      (b) =>
        b.eventDate >= today &&
        b.status !== "completed" &&
        b.status !== "cancelled",
    )
    .sort((a, b) => a.eventDate.localeCompare(b.eventDate))
    .slice(0, 5);
  const todaysCollection = payments
    .filter((p) => p.date === today)
    .reduce((s, p) => s + p.amount, 0);
  const upcomingCount = bookings.filter(
    (b) =>
      b.eventDate >= today &&
      b.status !== "completed" &&
      b.status !== "cancelled",
  ).length;

  return (
    <>
      <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-bold tracking-[-0.5px] text-gray-900 md:text-xl">
            Dashboard
          </h1>
          <p className="mt-0.5 text-sm text-gray-500">
            Welcome back! Here's what's happening today.
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <BookingModal />
        </div>
      </div>

      <div className="mb-7 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-3 lg:grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
        <StatCard
          icon="fa-calendar-day"
          label="Today's Events"
          value={todayBookings.length}
        />
        <StatCard
          icon="fa-clock"
          label="Upcoming Bookings"
          value={upcomingCount}
        />
        <StatCard
          icon="fa-calendar-check"
          label="Total Bookings"
          value={stats.total}
        />
        <StatCard
          icon="fa-money-bill-wave"
          label="Today's Collection"
          value={formatCurrency(todaysCollection)}
        />
        <StatCard
          icon="fa-exclamation-triangle"
          label="Pending Payments"
          value={formatCurrency(stats.pending)}
          color="var(--color-danger)"
        />
        <StatCard
          icon="fa-chart-line"
          label="Monthly Revenue"
          value={formatCurrency(stats.totalPaid)}
          color="var(--color-success)"
        />
      </div>

      <div className="grid grid-cols-2 gap-5 mt-5 md:grid-cols-1">
        <div className="rounded-xl border border-gray-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.08),0_4px_6px_-2px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between border-b border-gray-100 px-[22px] py-[18px]">
            <h3 className="text-[15px] font-semibold text-gray-800">
              <i className="fas fa-calendar-day mr-2 text-primary"></i>
              Today's Events
            </h3>
          </div>
          <div className="p-[22px]">
            {todayBookings.length === 0 ? (
              <EmptyState
                icon="fa-calendar-day"
                title="No events today"
                text="All clear for today!"
              />
            ) : (
              todayBookings.map(todayRow)
            )}
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.08),0_4px_6px_-2px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between border-b border-gray-100 px-[22px] py-[18px]">
            <h3 className="text-[15px] font-semibold text-gray-800">
              <i className="fas fa-clock mr-2 text-primary"></i>
              Upcoming Bookings
            </h3>
          </div>
          <div className="p-[22px]">
            {upcoming.length === 0 ? (
              <EmptyState
                icon="fa-clock"
                title="No upcoming bookings"
                text="You're all set!"
              />
            ) : (
              upcoming.map(upcomingRow)
            )}
          </div>
        </div>
      </div>
    </>
  );
}
