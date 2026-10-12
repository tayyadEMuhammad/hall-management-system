"use client";

import { useRef, useState } from "react";
import { Badge } from "@/components/Badge";
import QuotationForm from "@/components/forms/QuotationForm";
import Modal from "@/components/Modal";
import { EmptyState } from "@/components/ui";
import { formatCurrency, formatDate } from "@/lib/format";
import type { Quotation } from "@/lib/types";
import { useStore } from "@/store/useStore";

const BTN =
  "inline-flex cursor-pointer items-center gap-2 rounded-lg px-[18px] py-[9px] font-sans text-sm font-medium leading-none transition-all";
const BTN_SM = "px-3! py-1.5! text-xs";
const BTN_PRIMARY =
  "bg-primary text-white hover:-translate-y-px hover:bg-primary-hover hover:shadow-[0_4px_12px_rgba(79,70,229,0.3)]";
const BTN_SECONDARY = "bg-gray-200 text-gray-700 hover:bg-gray-300";
const BTN_DANGER = "bg-danger text-white hover:bg-red-600";

const TD =
  "flex items-center justify-between gap-2 border-b border-gray-100 py-1.5 last:border-b-0 before:content-[attr(data-label)] before:text-xs before:font-semibold before:text-gray-600 sm:table-cell sm:border-b sm:border-gray-200 sm:px-4 sm:py-3 sm:before:content-none";
const TR =
  "mb-3 block rounded-lg border border-gray-200 bg-white p-3 sm:table-row sm:mb-0 sm:rounded-none sm:border-0 sm:p-0";

export default function QuotationsPage() {
  const quotations = useStore((s) => s.quotations);
  const toast = useStore((s) => s.toast);
  const [createOpen, setCreateOpen] = useState(false);
  const [viewing, setViewing] = useState<Quotation | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const remove = (q: Quotation) => {
    if (!confirm("Delete this quotation?")) return;
    useStore.setState((s) => ({
      quotations: s.quotations.filter((x) => x.id !== q.id),
    }));
    toast("Quotation deleted");
  };

  const print = (q: Quotation) => {
    const content = `
QUOTATION: ${q.quotationId}
Customer: ${q.customerName}
Event: ${q.eventType}
Date: ${formatDate(q.eventDate)}
Venue: ${q.venueName}
Guests: ${q.guests}
Total: ${formatCurrency(q.totalAmount)}
Terms: ${q.terms || "N/A"}`;
    alert(`${content}\n\n(Print functionality would open a print dialog)`);
    toast("Printing quotation... (demo)", "info");
  };

  return (
    <>
      <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-bold tracking-[-0.5px] text-gray-900 md:text-xl">
            Quotations
          </h1>
          <p className="mt-0.5 text-sm text-gray-500">
            Create and manage quotations for your clients
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <button
            className={`${BTN} ${BTN_PRIMARY}`}
            onClick={() => setCreateOpen(true)}
          >
            <i className="fas fa-plus"></i> New Quotation
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.08),0_4px_6px_-2px_rgba(0,0,0,0.03)]">
        <div className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 hidden sm:table-header-group">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 border-b border-gray-200 whitespace-nowrap">
                    Quotation ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 border-b border-gray-200 whitespace-nowrap">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 border-b border-gray-200 whitespace-nowrap">
                    Event
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 border-b border-gray-200 whitespace-nowrap">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 border-b border-gray-200 whitespace-nowrap">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 border-b border-gray-200 whitespace-nowrap">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 border-b border-gray-200 whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {quotations.length === 0 ? (
                  <tr className={TR}>
                    <td colSpan={7} className={TD}>
                      <EmptyState
                        icon="fa-file-invoice"
                        title="No quotations yet"
                        text="Create your first quotation for a booking"
                      />
                    </td>
                  </tr>
                ) : (
                  quotations.map((q) => (
                    <tr key={q.id} className={TR}>
                      <td data-label="Quotation ID" className={TD}>
                        <strong>{q.quotationId}</strong>
                      </td>
                      <td data-label="Customer" className={TD}>
                        {q.customerName}
                      </td>
                      <td data-label="Event" className={TD}>
                        {q.eventType}
                      </td>
                      <td data-label="Date" className={TD}>
                        {formatDate(q.eventDate)}
                      </td>
                      <td data-label="Amount" className={TD}>
                        {formatCurrency(q.totalAmount)}
                      </td>
                      <td data-label="Status" className={TD}>
                        <Badge
                          tone={
                            q.status === "accepted"
                              ? "success"
                              : q.status === "sent"
                                ? "info"
                                : "secondary"
                          }
                        >
                          {q.status || "draft"}
                        </Badge>
                      </td>
                      <td data-label="Actions" className={TD}>
                        <div className="flex gap-1.5 flex-wrap">
                          <button
                            className={`${BTN} ${BTN_SM} ${BTN_SECONDARY}`}
                            onClick={() => setViewing(q)}
                          >
                            <i className="fas fa-eye"></i>
                          </button>
                          <button
                            className={`${BTN} ${BTN_SM} ${BTN_SECONDARY}`}
                            onClick={() => print(q)}
                          >
                            <i className="fas fa-print"></i>
                          </button>
                          <button
                            className={`${BTN} ${BTN_SM} ${BTN_DANGER}`}
                            onClick={() => remove(q)}
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

      {createOpen && (
        <Modal
          title="New Quotation"
          confirmText="Create Quotation"
          onConfirm={() => formRef.current?.requestSubmit()}
          onClose={() => setCreateOpen(false)}
        >
          <QuotationForm
            formRef={formRef}
            onDone={() => setCreateOpen(false)}
          />
        </Modal>
      )}

      {viewing && (
        <Modal
          title={`Quotation: ${viewing.quotationId}`}
          confirmText="Close"
          showConfirm={false}
          onConfirm={() => setViewing(null)}
          onClose={() => setViewing(null)}
        >
          <div className="font-mono">
            <div className="text-center border-b-2 border-gray-200 pb-4 mb-4">
              <h2 className="text-2xl">QUOTATION</h2>
              <p className="text-gray-500">{viewing.quotationId}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div>
                <strong>Customer:</strong> {viewing.customerName}
              </div>
              <div>
                <strong>Event:</strong> {viewing.eventType}
              </div>
              <div>
                <strong>Date:</strong> {formatDate(viewing.eventDate)}
              </div>
              <div>
                <strong>Venue:</strong> {viewing.venueName}
              </div>
              <div>
                <strong>Guests:</strong> {viewing.guests}
              </div>
              <div>
                <strong>Status:</strong>{" "}
                <Badge
                  tone={viewing.status === "accepted" ? "success" : "secondary"}
                >
                  {viewing.status || "draft"}
                </Badge>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg my-3">
              <div className="flex justify-between text-lg font-bold">
                <span>Total Amount</span>
                <span>{formatCurrency(viewing.totalAmount)}</span>
              </div>
            </div>
            {viewing.terms && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg text-[13px]">
                <strong>Terms:</strong> {viewing.terms}
              </div>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}
