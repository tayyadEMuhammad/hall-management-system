import type { Booking, Payment, Venue } from "@/lib/types";
import type { Data } from "@/store/useStore";

export function getTotalPaid(payments: Payment[], bookingId: string): number {
  return payments
    .filter((p) => p.bookingId === bookingId)
    .reduce((sum, p) => sum + p.amount, 0);
}

export function getPaymentForBooking(
  payments: Payment[],
  bookingId: string,
): number {
  return getTotalPaid(payments, bookingId);
}

export function calculateRemaining(
  payments: Payment[],
  booking: Booking,
): number {
  return booking.totalAmount - getTotalPaid(payments, booking.id);
}

export function getBookingStats(data: Pick<Data, "bookings" | "payments">) {
  const total = data.bookings.length;
  const confirmed = data.bookings.filter(
    (b) => b.status === "confirmed",
  ).length;
  const tentative = data.bookings.filter(
    (b) => b.status === "tentative",
  ).length;
  const completed = data.bookings.filter(
    (b) => b.status === "completed",
  ).length;
  const cancelled = data.bookings.filter(
    (b) => b.status === "cancelled",
  ).length;
  const totalRevenue = data.bookings.reduce((sum, b) => sum + b.totalAmount, 0);
  const totalPaid = data.payments.reduce((sum, p) => sum + p.amount, 0);
  const pending = totalRevenue - totalPaid;
  return {
    total,
    confirmed,
    tentative,
    completed,
    cancelled,
    totalRevenue,
    totalPaid,
    pending,
  };
}

export function venueConflict(
  bookings: Booking[],
  venueId: string,
  date: string,
  start: string,
  end: string,
  excludeId?: string,
): Booking | undefined {
  return bookings.find(
    (b) =>
      b.venueId === venueId &&
      b.eventDate === date &&
      b.id !== excludeId &&
      b.status !== "cancelled" &&
      b.status !== "completed" &&
      ((start >= b.startTime && start < b.endTime) ||
        (end > b.startTime && end <= b.endTime) ||
        (start <= b.startTime && end >= b.endTime)),
  );
}

export function getVenue(venues: Venue[], id: string): Venue | undefined {
  return venues.find((v) => v.id === id);
}

export function statusBadgeClass(status: string): string {
  const map: Record<string, string> = {
    inquiry: "bg-gray-200 text-gray-600",
    tentative: "bg-warning-bg text-yellow-600",
    confirmed: "bg-success-bg text-green-600",
    completed: "bg-info-bg text-blue-600",
    cancelled: "bg-danger-bg text-red-600",
  };
  return map[status] || "bg-gray-200 text-gray-600";
}
