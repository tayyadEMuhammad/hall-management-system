"use client";

import { useRef, useState } from "react";
import { StatusBadge } from "@/components/Badge";
import BookingModal from "@/components/BookingModal";
import PaymentForm from "@/components/forms/PaymentForm";
import Modal from "@/components/Modal";
import BookingDetails from "@/components/modals/BookingDetails";
import { EmptyState } from "@/components/ui";
import { formatCurrency, formatDate } from "@/lib/format";
import type { Booking } from "@/lib/types";
import { useStore } from "@/store/useStore";

type ModalMode =
  | { kind: "view"; booking: Booking }
  | { kind: "pay"; booking: Booking }
  | null;

const BTN =
  "inline-flex cursor-pointer items-center gap-2 rounded-lg px-[18px] py-[9px] font-sans text-sm font-medium leading-none transition-all";
const BTN_SM = "px-3! py-1.5! text-xs";
const BTN_SECONDARY = "bg-gray-200 text-gray-700 hover:bg-gray-300";
const BTN_DANGER = "bg-danger text-white hover:bg-red-600";

export default function BookingsPage() {
  const bookings = useStore((s) => s.bookings);
  const venues = useStore((s) => s.venues);
  const toast = useStore((s) => s.toast);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [venue, setVenue] = useState("");
  const [modal, setModal] = useState<ModalMode>(null);
  const payFormRef = useRef<HTMLFormElement | null>(null);

  const filtered = bookings.filter((b) => {
    const q = search.toLowerCase();
    if (
      q &&
      !b.bookingId.toLowerCase().includes(q) &&
      !b.customerName.toLowerCase().includes(q) &&
      !b.eventType.toLowerCase().includes(q)
    ) {
      return false;
    }
    if (status && b.status !== status) return false;
    if (venue && b.venueId !== venue) return false;
    return true;
  });

  const deleteBooking = (b: Booking) => {
    if (!confirm(`Delete booking ${b.bookingId}?`)) return;
    useStore.setState((s) => ({
      bookings: s.bookings.filter((x) => x.id !== b.id),
    }));
    toast("Booking deleted successfully");
  };

  return (
    <>
      <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-bold tracking-[-0.5px] text-gray-900 md:text-xl">
            Bookings
          </h1>
          <p className="mt-0.5 text-sm text-gray-500">
            Manage all your event bookings
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <BookingModal />
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-5">
        <input
          type="text"
          className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10 w-[250px]!"
          placeholder="Search by ID, customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10 w-[150px]! select-arrow pr-9"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All Status</option>
          {["inquiry", "tentative", "confirmed", "completed", "cancelled"].map(
            (s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ),
          )}
        </select>
        <select
          className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10 w-[150px]! select-arrow pr-9"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
        >
          <option value="">All Venues</option>
          {venues.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name}
            </option>
          ))}
        </select>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.08),0_4px_6px_-2px_rgba(0,0,0,0.03)]">
        <div className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 hidden sm:table-header-group">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 border-b border-gray-200 whitespace-nowrap">
                    Booking ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 border-b border-gray-200 whitespace-nowrap">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 border-b border-gray-200 whitespace-nowrap">
                    Event
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 border-b border-gray-200 whitespace-nowrap">
                    Venue
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 border-b border-gray-200 whitespace-nowrap">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 border-b border-gray-200 whitespace-nowrap">
                    Guests
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 border-b border-gray-200 whitespace-nowrap">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 border-b border-gray-200 whitespace-nowrap">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 border-b border-gray-200 whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr className="mb-3 block rounded-lg border border-gray-200 bg-white p-3 sm:table-row sm:mb-0 sm:rounded-none sm:border-0 sm:p-0">
                    <td
                      colSpan={9}
                      className="flex items-center justify-between gap-2 border-b border-gray-100 py-1.5 last:border-b-0 before:content-[attr(data-label)] before:text-xs before:font-semibold before:text-gray-600 sm:table-cell sm:border-b sm:border-gray-200 sm:px-4 sm:py-3 sm:before:content-none"
                    >
                      <EmptyState
                        icon="fa-calendar-plus"
                        title="No bookings yet"
                        text="Start by creating your first booking"
                      />
                    </td>
                  </tr>
                ) : (
                  filtered.map((b) => (
                    <tr
                      key={b.id}
                      className="mb-3 block rounded-lg border border-gray-200 bg-white p-3 sm:table-row sm:mb-0 sm:rounded-none sm:border-0 sm:p-0"
                    >
                      <td
                        data-label="Booking ID"
                        className="flex items-center justify-between gap-2 border-b border-gray-100 py-1.5 last:border-b-0 before:content-[attr(data-label)] before:text-xs before:font-semibold before:text-gray-600 sm:table-cell sm:border-b sm:border-gray-200 sm:px-4 sm:py-3 sm:before:content-none"
                      >
                        <strong>{b.bookingId}</strong>
                      </td>
                      <td
                        data-label="Customer"
                        className="flex items-center justify-between gap-2 border-b border-gray-100 py-1.5 last:border-b-0 before:content-[attr(data-label)] before:text-xs before:font-semibold before:text-gray-600 sm:table-cell sm:border-b sm:border-gray-200 sm:px-4 sm:py-3 sm:before:content-none"
                      >
                        {b.customerName}
                      </td>
                      <td
                        data-label="Event"
                        className="flex items-center justify-between gap-2 border-b border-gray-100 py-1.5 last:border-b-0 before:content-[attr(data-label)] before:text-xs before:font-semibold before:text-gray-600 sm:table-cell sm:border-b sm:border-gray-200 sm:px-4 sm:py-3 sm:before:content-none"
                      >
                        {b.eventType}
                      </td>
                      <td
                        data-label="Venue"
                        className="flex items-center justify-between gap-2 border-b border-gray-100 py-1.5 last:border-b-0 before:content-[attr(data-label)] before:text-xs before:font-semibold before:text-gray-600 sm:table-cell sm:border-b sm:border-gray-200 sm:px-4 sm:py-3 sm:before:content-none"
                      >
                        {b.venueName}
                      </td>
                      <td
                        data-label="Date"
                        className="flex items-center justify-between gap-2 border-b border-gray-100 py-1.5 last:border-b-0 before:content-[attr(data-label)] before:text-xs before:font-semibold before:text-gray-600 sm:table-cell sm:border-b sm:border-gray-200 sm:px-4 sm:py-3 sm:before:content-none"
                      >
                        {formatDate(b.eventDate)}
                      </td>
                      <td
                        data-label="Guests"
                        className="flex items-center justify-between gap-2 border-b border-gray-100 py-1.5 last:border-b-0 before:content-[attr(data-label)] before:text-xs before:font-semibold before:text-gray-600 sm:table-cell sm:border-b sm:border-gray-200 sm:px-4 sm:py-3 sm:before:content-none"
                      >
                        {b.guests}
                      </td>
                      <td
                        data-label="Status"
                        className="flex items-center justify-between gap-2 border-b border-gray-100 py-1.5 last:border-b-0 before:content-[attr(data-label)] before:text-xs before:font-semibold before:text-gray-600 sm:table-cell sm:border-b sm:border-gray-200 sm:px-4 sm:py-3 sm:before:content-none"
                      >
                        <StatusBadge status={b.status} />
                      </td>
                      <td
                        data-label="Amount"
                        className="flex items-center justify-between gap-2 border-b border-gray-100 py-1.5 last:border-b-0 before:content-[attr(data-label)] before:text-xs before:font-semibold before:text-gray-600 sm:table-cell sm:border-b sm:border-gray-200 sm:px-4 sm:py-3 sm:before:content-none"
                      >
                        {formatCurrency(b.totalAmount)}
                      </td>
                      <td
                        data-label="Actions"
                        className="flex items-center justify-between gap-2 border-b border-gray-100 py-1.5 last:border-b-0 before:content-[attr(data-label)] before:text-xs before:font-semibold before:text-gray-600 sm:table-cell sm:border-b sm:border-gray-200 sm:px-4 sm:py-3 sm:before:content-none"
                      >
                        <div className="flex gap-1.5 flex-wrap">
                          <button
                            className={`${BTN} ${BTN_SM} ${BTN_SECONDARY}`}
                            title="View"
                            onClick={() =>
                              setModal({ kind: "view", booking: b })
                            }
                          >
                            <i className="fas fa-eye"></i>
                          </button>
                          <BookingModal
                            initial={b}
                            label=""
                            icon="fa-edit"
                            className={`${BTN} ${BTN_SM} ${BTN_SECONDARY}`}
                          />
                          <button
                            className={`${BTN} ${BTN_SM} ${BTN_DANGER}`}
                            title="Delete"
                            onClick={() => deleteBooking(b)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {modal?.kind === "view" && (
        <Modal
          title={`Booking Details: ${modal.booking.bookingId}`}
          confirmText="Close"
          showConfirm={false}
          onConfirm={() => setModal(null)}
          onClose={() => setModal(null)}
        >
          <BookingDetails
            booking={modal.booking}
            onAddPayment={() =>
              setModal({ kind: "pay", booking: modal.booking })
            }
          />
        </Modal>
      )}

      {modal?.kind === "pay" && (
        <Modal
          title="Add Payment"
          confirmText="Record Payment"
          onConfirm={() => payFormRef.current?.requestSubmit()}
          onClose={() => setModal({ kind: "view", booking: modal.booking })}
        >
          <PaymentForm
            formRef={payFormRef}
            booking={modal.booking}
            onDone={() => setModal({ kind: "view", booking: modal.booking })}
          />
        </Modal>
      )}
    </>
  );
}
