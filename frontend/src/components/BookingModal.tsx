"use client";

import { useEffect, useRef, useState } from "react";
import { bookingModalBus } from "@/lib/events";
import BookingForm from "@/components/forms/BookingForm";
import Modal from "@/components/Modal";
import type { Booking } from "@/lib/types";

interface Props {
  initial?: Booking | null;
  label?: string;
  icon?: string;
  className?: string;
}

export default function BookingModal({
  initial,
  label,
  icon,
  className,
}: Props) {
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const isEdit = Boolean(initial);

  useEffect(() => {
    if (initial) return;
    const handler = () => setOpen(true);
    bookingModalBus.addEventListener("open-booking", handler);
    return () => bookingModalBus.removeEventListener("open-booking", handler);
  }, [initial]);

  return (
    <>
      <button
        className={
          className ??
          "inline-flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-[18px] py-[9px] font-sans text-sm font-medium leading-none text-white transition-all hover:-translate-y-px hover:bg-primary-hover hover:shadow-[0_4px_12px_rgba(79,70,229,0.3)]"
        }
        onClick={() => setOpen(true)}
        type="button"
      >
        <i className={`fas ${icon ?? "fa-plus"}`}></i>{" "}
        {label ?? (isEdit ? "Edit Booking" : "New Booking")}
      </button>
      {open && (
        <Modal
          title={isEdit ? "Edit Booking" : "New Booking"}
          confirmText={isEdit ? "Update Booking" : "Create Booking"}
          onConfirm={() => formRef.current?.requestSubmit()}
          onClose={() => setOpen(false)}
        >
          <BookingForm formRef={formRef} initial={initial} />
        </Modal>
      )}
    </>
  );
}
