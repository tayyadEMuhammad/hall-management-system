"use client";

import { useRef, useState } from "react";
import { Badge } from "@/components/Badge";
import SubscriptionPaymentForm from "@/components/forms/SubscriptionPaymentForm";
import Modal from "@/components/Modal";
import { EmptyState } from "@/components/ui";
import { PLANS } from "@/constants";
import { formatCurrency, formatDate } from "@/lib/format";
import type { HallManager } from "@/lib/types";
import { useStore } from "@/store/useStore";

const BTN =
  "inline-flex cursor-pointer items-center gap-2 rounded-lg px-[18px] py-[9px] font-sans text-sm font-medium leading-none transition-all";
const BTN_SM = "px-3! py-1.5! text-xs";
const BTN_PRIMARY =
  "bg-primary text-white hover:-translate-y-px hover:bg-primary-hover hover:shadow-[0_4px_12px_rgba(79,70,229,0.3)]";
const BTN_SECONDARY = "bg-gray-200 text-gray-700 hover:bg-gray-300";

const INPUT =
  "w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10";

const TD =
  "flex items-center justify-between gap-2 border-b border-gray-100 py-1.5 last:border-b-0 before:content-[attr(data-label)] before:text-xs before:font-semibold before:text-gray-600 sm:table-cell sm:border-b sm:border-gray-200 sm:px-4 sm:py-3 sm:before:content-none";
const TR =
  "mb-3 block rounded-lg border border-gray-200 bg-white p-3 sm:table-row sm:mb-0 sm:rounded-none sm:border-0 sm:p-0";

function Detail({ label, value }: { label: string; value?: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-gray-50 p-3.5">
      <div className="text-[13px] font-medium text-gray-500">{label}</div>
      <div className="mt-0.5 font-semibold break-all text-gray-900">
        {value ?? "-"}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const managers = useStore((s) => s.hallManagers);
  const payments = useStore((s) => s.subscriptionPayments);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<{
    mode: "view" | "mark";
    manager: HallManager;
  } | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const filtered = managers.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()),
  );

  const latestPayment = (managerId: string) =>
    payments
      .filter((p) => p.managerId === managerId)
      .sort((a, b) => b.date.localeCompare(a.date))[0];

  const planPrice = (plan: string) =>
    Number(
      (PLANS.find((p) => p.name === plan)?.price ?? "0").replace(/,/g, ""),
    );

  const waLink = (m: HallManager) => {
    const digits = m.phone.replace(/\D/g, "");
    const num = digits.startsWith("0") ? `92${digits.slice(1)}` : digits;
    const msg = `Assalam-o-Alaikum ${m.name}, your ${m.plan} subscription fee (Rs. ${planPrice(m.plan).toLocaleString()}/month) is pending. Kindly share the payment receipt. Thank you!`;
    return `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
  };

  const viewPayment =
    modal?.mode === "view" ? latestPayment(modal.manager.id) : undefined;

  return (
    <>
      <div className="mb-5 flex flex-col gap-4 sm:mb-7 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-[26px] font-bold tracking-[-0.5px] text-gray-900 md:text-xl">
            Hall Managers
          </h1>
          <p className="mt-0.5 text-sm text-gray-500">
            Manage contacts, plans and subscription payments
          </p>
        </div>
        <div className="relative w-full sm:w-[280px]">
          <i className="fas fa-search absolute top-1/2 left-3 -translate-y-1/2 text-sm text-gray-400"></i>
          <input
            type="text"
            className={`${INPUT} pl-9`}
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 hidden sm:table-header-group">
              <tr>
                {[
                  "Name",
                  "Phone Number",
                  "Email",
                  "Plan",
                  "Status",
                  "Due Date",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="border-b border-gray-200 px-4 py-3 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr className={TR}>
                  <td colSpan={7} className={TD}>
                    <EmptyState
                      icon="fa-users"
                      title="No hall managers found"
                      text="Try a different name in the search bar"
                    />
                  </td>
                </tr>
              ) : (
                filtered.map((m) => {
                  const payment = latestPayment(m.id);
                  const paid = m.status === "PAID";
                  return (
                    <tr key={m.email} className={TR}>
                      <td
                        data-label="Name"
                        className={`${TD} font-semibold text-gray-900`}
                      >
                        {m.name}
                      </td>
                      <td data-label="Phone Number" className={TD}>
                        <a
                          href={`tel:${m.phone}`}
                          className="text-gray-600 hover:text-primary"
                        >
                          {m.phone}
                        </a>
                      </td>
                      <td data-label="Email" className={TD}>
                        <a
                          href={`mailto:${m.email}`}
                          className="break-all text-gray-600 hover:text-primary sm:max-w-[180px] sm:truncate"
                        >
                          {m.email}
                        </a>
                      </td>
                      <td data-label="Plan" className={TD}>
                        <span className="font-medium text-gray-800">
                          {m.plan}
                        </span>
                      </td>
                      <td data-label="Status" className={TD}>
                        <Badge tone={paid ? "success" : "warning"}>
                          {m.status}
                        </Badge>
                      </td>
                      <td data-label="Due Date" className={TD}>
                        <span className="text-gray-600">
                          {payment?.activeTill
                            ? formatDate(payment.activeTill)
                            : "-"}
                        </span>
                      </td>
                      <td data-label="Actions" className={TD}>
                        <span className="flex flex-wrap items-center gap-2 sm:justify-end">
                          {paid ? (
                            <button
                              type="button"
                              className={`${BTN} ${BTN_SM} ${BTN_SECONDARY}`}
                              onClick={() =>
                                setModal({ mode: "view", manager: m })
                              }
                            >
                              <i className="fas fa-eye"></i> View Payment
                            </button>
                          ) : (
                            <>
                              <a
                                href={waLink(m)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${BTN} ${BTN_SM} ${BTN_SECONDARY}`}
                                title="Send invoice via WhatsApp"
                              >
                                <i className="fab fa-whatsapp text-[#25D366]"></i>
                                Invoice
                              </a>
                              <button
                                type="button"
                                className={`${BTN} ${BTN_SM} ${BTN_PRIMARY}`}
                                onClick={() =>
                                  setModal({ mode: "mark", manager: m })
                                }
                              >
                                Mark Paid
                              </button>
                            </>
                          )}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modal?.mode === "view" && (
        <Modal
          title="Payment Details"
          showConfirm={false}
          onConfirm={() => {}}
          onClose={() => setModal(null)}
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-light text-base font-semibold text-primary">
              {modal.manager.name.charAt(0)}
            </span>
            <div className="min-w-0">
              <div className="text-base font-semibold text-gray-900">
                {modal.manager.name}
              </div>
              <div className="text-sm break-all text-gray-500">
                {modal.manager.email}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Detail label="Provider Name" value={modal.manager.name} />
            <Detail label="Phone Number" value={modal.manager.phone} />
            <Detail label="Email" value={modal.manager.email} />
            <Detail
              label="Plan"
              value={`${modal.manager.plan} — Rs. ${planPrice(modal.manager.plan).toLocaleString()}/month`}
            />
            <Detail
              label="Payment Date"
              value={viewPayment ? formatDate(viewPayment.date) : undefined}
            />
            <Detail
              label="Transaction ID"
              value={
                viewPayment ? (
                  <span className="font-mono text-sm">
                    {viewPayment.transactionId}
                  </span>
                ) : undefined
              }
            />
            <Detail
              label="Price"
              value={
                viewPayment ? formatCurrency(viewPayment.amount) : undefined
              }
            />
            <Detail label="Bank Name" value={viewPayment?.bankName} />
            <Detail
              label="Subscription Active Till"
              value={
                viewPayment ? formatDate(viewPayment.activeTill) : undefined
              }
            />
          </div>
        </Modal>
      )}

      {modal?.mode === "mark" && (
        <Modal
          title="Mark as Paid"
          confirmText="Save"
          onConfirm={() => formRef.current?.requestSubmit()}
          onClose={() => setModal(null)}
        >
          <SubscriptionPaymentForm
            formRef={formRef}
            manager={modal.manager}
            onDone={() => setModal(null)}
          />
        </Modal>
      )}
    </>
  );
}
