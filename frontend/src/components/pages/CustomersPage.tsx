"use client";

import { useRef, useState } from "react";
import { StatusBadge } from "@/components/Badge";
import CustomerForm from "@/components/forms/CustomerForm";
import Modal from "@/components/Modal";
import { EmptyState } from "@/components/ui";
import { formatCurrency, formatDate } from "@/lib/format";
import type { Customer } from "@/lib/types";
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

export default function CustomersPage() {
  const customers = useStore((s) => s.customers);
  const bookings = useStore((s) => s.bookings);
  const toast = useStore((s) => s.toast);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<{
    mode: "add" | "edit" | "view";
    customer?: Customer;
  } | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const filtered = customers.filter((c) =>
    (c.name + c.phone + c.whatsapp)
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const remove = (c: Customer) => {
    if (!confirm("Are you sure you want to delete this customer?")) return;
    useStore.setState((s) => ({
      customers: s.customers.filter((x) => x.id !== c.id),
    }));
    toast("Customer deleted");
  };

  const bookingCount = (id: string) =>
    bookings.filter((b) => b.customerId === id).length;

  return (
    <>
      <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-bold tracking-[-0.5px] text-gray-900 md:text-xl">
            Customers
          </h1>
          <p className="mt-0.5 text-sm text-gray-500">
            Manage your customer relationships
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <button
            className={`${BTN} ${BTN_PRIMARY}`}
            onClick={() => setModal({ mode: "add" })}
          >
            <i className="fas fa-user-plus"></i> Add Customer
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-5">
        <input
          type="text"
          className="w-full rounded-lg border border-gray-300 bg-white px-[14px] py-[9px] text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10 w-[250px]!"
          placeholder="Search by name, phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.08),0_4px_6px_-2px_rgba(0,0,0,0.03)]">
        <div className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 hidden sm:table-header-group">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 border-b border-gray-200 whitespace-nowrap">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 border-b border-gray-200 whitespace-nowrap">
                    Phone
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 border-b border-gray-200 whitespace-nowrap">
                    WhatsApp
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 border-b border-gray-200 whitespace-nowrap">
                    Address
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 border-b border-gray-200 whitespace-nowrap">
                    Total Bookings
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 border-b border-gray-200 whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr className={TR}>
                    <td colSpan={6} className={TD}>
                      <EmptyState
                        icon="fa-users"
                        title="No customers yet"
                        text="Add your first customer to get started"
                      />
                    </td>
                  </tr>
                ) : (
                  filtered.map((c) => (
                    <tr key={c.id} className={TR}>
                      <td data-label="Name" className={TD}>
                        <strong>{c.name}</strong>
                      </td>
                      <td data-label="Phone" className={TD}>
                        {c.phone}
                      </td>
                      <td data-label="WhatsApp" className={TD}>
                        {c.whatsapp || "-"}
                      </td>
                      <td data-label="Address" className={TD}>
                        {c.address || "-"}
                      </td>
                      <td data-label="Bookings" className={TD}>
                        {bookingCount(c.id)}
                      </td>
                      <td data-label="Actions" className={TD}>
                        <div className="flex gap-1.5 flex-wrap">
                          <button
                            className={`${BTN} ${BTN_SM} ${BTN_SECONDARY}`}
                            onClick={() =>
                              setModal({ mode: "view", customer: c })
                            }
                          >
                            <i className="fas fa-eye"></i>
                          </button>
                          <button
                            className={`${BTN} ${BTN_SM} ${BTN_SECONDARY}`}
                            onClick={() =>
                              setModal({ mode: "edit", customer: c })
                            }
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            className={`${BTN} ${BTN_SM} ${BTN_DANGER}`}
                            onClick={() => remove(c)}
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

      {(modal?.mode === "add" || modal?.mode === "edit") && (
        <Modal
          title={modal.mode === "edit" ? "Edit Customer" : "Add Customer"}
          confirmText={modal.mode === "edit" ? "Update" : "Add Customer"}
          onConfirm={() => formRef.current?.requestSubmit()}
          onClose={() => setModal(null)}
        >
          <CustomerForm
            formRef={formRef}
            initial={modal.mode === "edit" ? modal.customer : null}
            onDone={() => setModal(null)}
          />
        </Modal>
      )}

      {modal?.mode === "view" && modal.customer && (
        <ViewCustomer
          customer={modal.customer}
          onClose={() => setModal(null)}
        />
      )}
    </>
  );
}

function ViewCustomer({
  customer,
  onClose,
}: {
  customer: Customer;
  onClose: () => void;
}) {
  const bookings = useStore((s) => s.bookings);
  const list = bookings.filter((b) => b.customerId === customer.id);
  const totalAmount = list.reduce((s, b) => s + b.totalAmount, 0);
  const totalPaid = list.reduce((s, b) => s + (b.paidAmount || 0), 0);
  const remaining = totalAmount - totalPaid;

  return (
    <Modal
      title="Customer Details"
      confirmText="Close"
      showConfirm={false}
      onConfirm={onClose}
      onClose={onClose}
    >
      <div className="mb-4">
        <h3 className="text-lg">{customer.name}</h3>
        <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
          <div>
            <strong>Phone:</strong> {customer.phone}
          </div>
          <div>
            <strong>WhatsApp:</strong> {customer.whatsapp || "-"}
          </div>
          <div className="col-span-full">
            <strong>Address:</strong> {customer.address || "-"}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 my-4 p-4 bg-gray-50 rounded-lg md:grid-cols-3">
        <div>
          <div className="text-xs text-gray-500">Total Bookings</div>
          <div className="font-semibold text-lg">{list.length}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Total Amount</div>
          <div className="font-semibold text-lg">
            {formatCurrency(totalAmount)}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Remaining</div>
          <div
            className="font-semibold text-lg"
            style={{
              color:
                remaining > 0 ? "var(--color-danger)" : "var(--color-success)",
            }}
          >
            {formatCurrency(remaining)}
          </div>
        </div>
      </div>

      <h4 className="mb-3">Booking History</h4>
      {list.length === 0 ? (
        <p className="text-gray-500">No bookings found</p>
      ) : (
        list.map((b) => (
          <div
            key={b.id}
            className="flex items-center justify-between py-2 border-b border-gray-100"
          >
            <div>
              <div className="font-medium">
                {b.bookingId} - {b.eventType}
              </div>
              <div className="text-xs text-gray-500">
                {formatDate(b.eventDate)} • {b.venueName}
              </div>
            </div>
            <div className="text-right">
              <div>{formatCurrency(b.totalAmount)}</div>
              <StatusBadge status={b.status} />
            </div>
          </div>
        ))
      )}
    </Modal>
  );
}
