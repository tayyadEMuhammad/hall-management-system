"use client";

import { useRef, useState } from "react";
import { Badge } from "@/components/Badge";
import VenueForm from "@/components/forms/VenueForm";
import Modal from "@/components/Modal";
import { formatCurrency, toLocalDateStr } from "@/lib/format";
import type { Venue } from "@/lib/types";
import { useStore } from "@/store/useStore";

const BTN =
  "inline-flex cursor-pointer items-center gap-2 rounded-lg px-[18px] py-[9px] font-sans text-sm font-medium leading-none transition-all";
const BTN_SM = "px-3! py-1.5! text-xs";
const BTN_PRIMARY =
  "bg-primary text-white hover:-translate-y-px hover:bg-primary-hover hover:shadow-[0_4px_12px_rgba(79,70,229,0.3)]";
const BTN_SECONDARY = "bg-gray-200 text-gray-700 hover:bg-gray-300";
const BTN_DANGER = "bg-danger text-white hover:bg-red-600";

export default function BranchesPage() {
  const venues = useStore((s) => s.venues);
  const bookings = useStore((s) => s.bookings);
  const toast = useStore((s) => s.toast);
  const [modal, setModal] = useState<{
    mode: "add" | "edit";
    venue?: Venue;
  } | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const today = toLocalDateStr(new Date());

  const remove = (v: Venue) => {
    if (!confirm("Delete this venue?")) return;
    if (bookings.some((b) => b.venueId === v.id)) {
      toast("Cannot delete venue with existing bookings", "error");
      return;
    }
    useStore.setState((s) => ({
      venues: s.venues.filter((x) => x.id !== v.id),
    }));
    toast("Venue deleted");
  };

  return (
    <>
      <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-bold tracking-[-0.5px] text-gray-900 md:text-xl">
            Branches & Venues
          </h1>
          <p className="mt-0.5 text-sm text-gray-500">
            Manage your venues and their availability
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <button
            className={`${BTN} ${BTN_PRIMARY}`}
            onClick={() => setModal({ mode: "add" })}
          >
            <i className="fas fa-plus"></i> Add Venue
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
        {venues.map((v) => {
          const venueBookings = bookings.filter((b) => b.venueId === v.id);
          const upcoming = venueBookings.filter(
            (b) =>
              b.eventDate >= today &&
              b.status !== "completed" &&
              b.status !== "cancelled",
          );
          return (
            <div
              key={v.id}
              className="rounded-xl border border-gray-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.08),0_4px_6px_-2px_rgba(0,0,0,0.03)]"
            >
              <div className="flex items-center justify-between border-b border-gray-100 px-[22px] py-[18px]">
                <h3 className="text-[15px] font-semibold text-gray-800">
                  {v.name}
                </h3>
                <Badge tone="primary">{v.type}</Badge>
              </div>
              <div className="p-[22px]">
                <div>
                  <strong>Branch:</strong> {v.branch}
                </div>
                <div>
                  <strong>Capacity:</strong> {v.capacity} guests
                </div>
                <div>
                  <strong>Price:</strong> {formatCurrency(v.price)}
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge tone="info">
                    {venueBookings.length} total bookings
                  </Badge>
                  <Badge tone={upcoming.length > 0 ? "warning" : "success"}>
                    {upcoming.length} upcoming
                  </Badge>
                </div>
                <div className="mt-3 flex gap-1.5">
                  <button
                    className={`${BTN} ${BTN_SM} ${BTN_SECONDARY}`}
                    onClick={() => setModal({ mode: "edit", venue: v })}
                  >
                    <i className="fas fa-edit"></i> Edit
                  </button>
                  <button
                    className={`${BTN} ${BTN_SM} ${BTN_DANGER}`}
                    onClick={() => remove(v)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {(modal?.mode === "add" || modal?.mode === "edit") && (
        <Modal
          title={modal.mode === "edit" ? "Edit Venue" : "Add Venue"}
          confirmText={modal.mode === "edit" ? "Update" : "Add Venue"}
          onConfirm={() => formRef.current?.requestSubmit()}
          onClose={() => setModal(null)}
        >
          <VenueForm
            formRef={formRef}
            initial={modal.mode === "edit" ? modal.venue : null}
            onDone={() => setModal(null)}
          />
        </Modal>
      )}
    </>
  );
}
