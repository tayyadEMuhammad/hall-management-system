"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { StatusBadge } from "@/components/Badge";
import PaymentForm from "@/components/forms/PaymentForm";
import Modal from "@/components/Modal";
import BookingDetails from "@/components/modals/BookingDetails";
import { formatDate, formatTime } from "@/lib/format";
import type { Booking } from "@/lib/types";
import { useStore } from "@/store/useStore";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const BTN =
  "inline-flex cursor-pointer items-center gap-2 rounded-lg px-[18px] py-[9px] font-sans text-sm font-medium leading-none transition-all";
const BTN_SM = "px-3! py-1.5! text-xs";
const BTN_SECONDARY = "bg-gray-200 text-gray-700 hover:bg-gray-300";

const DAY_EVENT =
  "mt-0.5 overflow-hidden rounded px-1.5 py-0.5 text-[10px] whitespace-nowrap text-ellipsis";

export default function CalendarPage() {
  const router = useRouter();
  const bookings = useStore((s) => s.bookings);
  const venues = useStore((s) => s.venues);
  const toast = useStore((s) => s.toast);
  const [venueFilter, setVenueFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dayBookings, setDayBookings] = useState<Booking[] | null>(null);
  const [viewing, setViewing] = useState<Booking | null>(null);
  const [paying, setPaying] = useState<Booking | null>(null);
  const payFormRef = useRef<HTMLFormElement | null>(null);

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const filtered = bookings.filter((b) => {
    if (venueFilter && b.venueId !== venueFilter) return false;
    if (statusFilter && b.status !== statusFilter) return false;
    return true;
  });

  const monthBookings = filtered.filter((b) => {
    const d = new Date(b.eventDate);
    return d.getMonth() === month && d.getFullYear() === year;
  });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dateStr = (day: number) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const cells = [];
  for (let i = 0; i < firstDay; i++) {
    const prevDay = new Date(year, month, -firstDay + i + 1).getDate();
    cells.push(
      <div
        key={`p${i}`}
        className="min-h-[80px] cursor-pointer bg-white p-2 transition-all hover:bg-gray-50 other-month"
      >
        <div className="mb-1 text-sm font-medium text-gray-300">{prevDay}</div>
      </div>,
    );
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const ds = dateStr(day);
    const dayList = monthBookings.filter((b) => b.eventDate === ds);
    const isToday = day === now.getDate();
    cells.push(
      <div
        key={day}
        className={`min-h-[80px] cursor-pointer p-2 transition-all hover:bg-gray-50 ${
          isToday ? "border-2 border-primary bg-primary-light" : "bg-white"
        }`}
        onClick={() => {
          if (dayList.length === 0) {
            toast("No bookings on this day", "info");
            return;
          }
          setDayBookings(dayList);
        }}
      >
        <div className="mb-1 text-sm font-medium text-gray-700">{day}</div>
        {dayList.slice(0, 2).map((b) => (
          <div
            key={b.id}
            className={`${DAY_EVENT} bg-primary-light text-primary`}
            title={`${b.customerName} - ${b.eventType}`}
          >
            {b.customerName}
          </div>
        ))}
        {dayList.length > 2 && (
          <div className={`${DAY_EVENT} bg-gray-200 text-gray-600`}>
            +{dayList.length - 2} more
          </div>
        )}
      </div>,
    );
  }

  return (
    <>
      <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-bold tracking-[-0.5px] text-gray-900 md:text-xl">
            Calendar
          </h1>
          <p className="mt-0.5 text-sm text-gray-500">
            {MONTH_NAMES[month]} {year}
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <button
            className={`${BTN} ${BTN_SECONDARY}`}
            onClick={() => router.push("/dashboard/bookings")}
          >
            <i className="fas fa-list"></i> View All Bookings
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-5">
        <select
          className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10 w-[150px]! select-arrow pr-9"
          value={venueFilter}
          onChange={(e) => setVenueFilter(e.target.value)}
        >
          <option value="">All Venues</option>
          {venues.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name}
            </option>
          ))}
        </select>
        <select
          className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10 w-[150px]! select-arrow pr-9"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          {["confirmed", "tentative", "completed", "cancelled"].map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.08),0_4px_6px_-2px_rgba(0,0,0,0.03)]">
        <div className="p-4">
          <div className="grid grid-cols-7 gap-px overflow-hidden rounded-lg bg-gray-200 border border-gray-200">
            {WEEKDAYS.map((d) => (
              <div
                key={d}
                className="bg-gray-50 p-2.5 text-center text-xs font-semibold uppercase text-gray-500"
              >
                {d}
              </div>
            ))}
            {cells}
          </div>
        </div>
      </div>

      {dayBookings && (
        <Modal
          title={`Bookings for ${formatDate(dayBookings[0].eventDate)}`}
          confirmText="Close"
          showConfirm={false}
          onConfirm={() => setDayBookings(null)}
          onClose={() => setDayBookings(null)}
        >
          {dayBookings.map((b) => (
            <div key={b.id} className="py-2.5 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{b.customerName}</div>
                  <div className="text-[13px] text-gray-500">
                    {b.eventType} • {b.venueName} • {formatTime(b.startTime)} -{" "}
                    {formatTime(b.endTime)}
                  </div>
                  <div className="text-xs text-gray-400">{b.guests} guests</div>
                </div>
                <StatusBadge status={b.status} />
              </div>
              <button
                className={`${BTN} ${BTN_SM} ${BTN_SECONDARY} mt-1`}
                onClick={() => setViewing(b)}
              >
                <i className="fas fa-eye"></i> View Details
              </button>
            </div>
          ))}
        </Modal>
      )}

      {viewing && (
        <Modal
          title={`Booking Details: ${viewing.bookingId}`}
          confirmText="Close"
          showConfirm={false}
          onConfirm={() => setViewing(null)}
          onClose={() => setViewing(null)}
        >
          <BookingDetails
            booking={viewing}
            onAddPayment={() => setPaying(viewing)}
          />
        </Modal>
      )}

      {paying && (
        <Modal
          title="Add Payment"
          confirmText="Record Payment"
          onConfirm={() => payFormRef.current?.requestSubmit()}
          onClose={() => setPaying(null)}
        >
          <PaymentForm
            formRef={payFormRef}
            booking={paying}
            onDone={() => {
              setPaying(null);
              setViewing(null);
            }}
          />
        </Modal>
      )}
    </>
  );
}
