"use client";

import { StatusBadge } from "@/components/Badge";
import { formatCurrency, formatDate, formatTime } from "@/lib/format";
import { getTotalPaid } from "@/lib/selectors";
import type { Booking } from "@/lib/types";
import { useStore } from "@/store/useStore";

export default function BookingDetails({
  booking,
  onAddPayment,
}: {
  booking: Booking;
  onAddPayment: () => void;
}) {
  const payments = useStore((s) => s.payments);
  const ownPayments = payments.filter((p) => p.bookingId === booking.id);
  const totalPaid = getTotalPaid(payments, booking.id);
  const remaining = booking.totalAmount - totalPaid;

  return (
    <>
      <div className="mb-5">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <strong>Booking ID:</strong> {booking.bookingId}
          </div>
          <div>
            <strong>Status:</strong> <StatusBadge status={booking.status} />
          </div>
          <div>
            <strong>Customer:</strong> {booking.customerName}
          </div>
          <div>
            <strong>Event:</strong> {booking.eventType}
          </div>
          <div>
            <strong>Date:</strong> {formatDate(booking.eventDate)}
          </div>
          <div>
            <strong>Time:</strong> {formatTime(booking.startTime)} -{" "}
            {formatTime(booking.endTime)}
          </div>
          <div>
            <strong>Venue:</strong> {booking.venueName} ({booking.branch || ""})
          </div>
          <div>
            <strong>Guests:</strong> {booking.guests}
          </div>
        </div>
      </div>

      <div className="my-4 p-4 bg-gray-50 rounded-lg">
        <h4 className="mb-2">Payment Summary</h4>
        <div className="flex justify-between">
          <span>Total Amount:</span>
          <strong>{formatCurrency(booking.totalAmount)}</strong>
        </div>
        <div className="flex justify-between text-success">
          <span>Total Paid:</span>
          <strong>{formatCurrency(totalPaid)}</strong>
        </div>
        <div className="flex justify-between text-danger text-base">
          <span>Remaining:</span>
          <strong>{formatCurrency(remaining)}</strong>
        </div>
      </div>

      {booking.foodPackageName && (
        <div className="my-3">
          <strong>Food:</strong> {booking.foodPackageName} •{" "}
          {formatCurrency(booking.foodTotal)} ({booking.guests} ×{" "}
          {formatCurrency(booking.foodPricePerPerson)})
        </div>
      )}

      {booking.additionalServices.length > 0 && (
        <div className="my-3">
          <strong>Additional Services:</strong>
          <ul className="list-none p-0 mt-1">
            {booking.additionalServices.map((s, i) => (
              <li
                key={i}
                className="flex justify-between py-1 border-b border-gray-100"
              >
                {s.name} <span>{formatCurrency(s.price)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {booking.specialInstructions && (
        <div className="my-3 px-3 py-2 bg-warning-bg rounded-md">
          <strong>Special Instructions:</strong> {booking.specialInstructions}
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-gray-200">
        <h4 className="mb-2">Payment History</h4>
        {ownPayments.length === 0 ? (
          <p className="text-sm text-gray-500">No payments recorded</p>
        ) : (
          ownPayments.map((p) => (
            <div
              key={p.id}
              className="flex justify-between py-2 border-b border-gray-100"
            >
              <div>
                <div className="font-medium">{formatCurrency(p.amount)}</div>
                <div className="text-xs text-gray-500">
                  {p.method} • {formatDate(p.date)}
                </div>
              </div>
              <div className="text-xs text-gray-500">{p.reference || ""}</div>
            </div>
          ))
        )}
        <button
          className="inline-flex cursor-pointer items-center gap-2 rounded-lg px-[12px] py-[6px] font-sans text-xs font-medium leading-none text-white transition-all bg-primary hover:-translate-y-px hover:bg-primary-hover hover:shadow-[0_4px_12px_rgba(79,70,229,0.3)] mt-2"
          onClick={onAddPayment}
        >
          <i className="fas fa-plus"></i> Add Payment
        </button>
      </div>
    </>
  );
}
