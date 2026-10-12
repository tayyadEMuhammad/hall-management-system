"use client";

import { useState } from "react";
import { Badge } from "@/components/Badge";
import { EmptyState } from "@/components/ui";
import { formatCurrency, formatDate } from "@/lib/format";
import { useStore } from "@/store/useStore";

const TD =
  "flex items-center justify-between gap-2 border-b border-gray-100 py-1.5 last:border-b-0 before:content-[attr(data-label)] before:text-xs before:font-semibold before:text-gray-600 sm:table-cell sm:border-b sm:border-gray-200 sm:px-4 sm:py-3 sm:before:content-none";
const TR =
  "mb-3 block rounded-lg border border-gray-200 bg-white p-3 sm:table-row sm:mb-0 sm:rounded-none sm:border-0 sm:p-0";

export default function PaymentsPage() {
  const payments = useStore((s) => s.payments);
  const bookings = useStore((s) => s.bookings);
  const [search, setSearch] = useState("");
  const [method, setMethod] = useState("");

  const total = payments.reduce((s, p) => s + p.amount, 0);
  const filtered = payments.filter((p) => {
    const booking = bookings.find((b) => b.id === p.bookingId);
    const text =
      `${booking?.bookingId ?? ""} ${booking?.customerName ?? ""}`.toLowerCase();
    if (search && !text.includes(search.toLowerCase())) return false;
    if (method && p.method !== method) return false;
    return true;
  });

  return (
    <>
      <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-bold tracking-[-0.5px] text-gray-900 md:text-xl">
            Payments
          </h1>
          <p className="mt-0.5 text-sm text-gray-500">
            Track all payments and receipts
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <span className="text-lg font-semibold text-success">
            Total: {formatCurrency(total)}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-5">
        <input
          type="text"
          className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10 w-[200px]!"
          placeholder="Search booking..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10 w-[150px]! select-arrow pr-9"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          <option value="">All Methods</option>
          {["cash", "bank_transfer", "online", "card", "other"].map((m) => (
            <option key={m} value={m}>
              {m.charAt(0).toUpperCase() + m.slice(1).replace("_", " ")}
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
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 border-b border-gray-200 whitespace-nowrap">
                    Method
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 border-b border-gray-200 whitespace-nowrap">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 border-b border-gray-200 whitespace-nowrap">
                    Reference
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr className={TR}>
                    <td colSpan={6} className={TD}>
                      <EmptyState
                        icon="fa-credit-card"
                        title="No payments recorded"
                        text="Payments will appear here when you add them to bookings"
                      />
                    </td>
                  </tr>
                ) : (
                  filtered.map((p) => {
                    const booking = bookings.find((b) => b.id === p.bookingId);
                    return (
                      <tr key={p.id} className={TR}>
                        <td data-label="Booking ID" className={TD}>
                          {booking ? booking.bookingId : "N/A"}
                        </td>
                        <td data-label="Customer" className={TD}>
                          {booking ? booking.customerName : "Unknown"}
                        </td>
                        <td
                          data-label="Amount"
                          className={`${TD} font-semibold`}
                        >
                          {formatCurrency(p.amount)}
                        </td>
                        <td data-label="Method" className={TD}>
                          <Badge tone="info">{p.method}</Badge>
                        </td>
                        <td data-label="Date" className={TD}>
                          {formatDate(p.date)}
                        </td>
                        <td data-label="Reference" className={TD}>
                          {p.reference || "-"}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
