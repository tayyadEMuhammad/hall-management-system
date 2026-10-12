"use client";

import { useEffect } from "react";

interface ModalProps {
  title: string;
  confirmText?: string;
  showConfirm?: boolean;
  onConfirm: () => void;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({
  title,
  confirmText = "Confirm",
  showConfirm = true,
  onConfirm,
  onClose,
  children,
}: ModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[2000] flex animate-fade-in items-center justify-center bg-black/50 p-5 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="m-2.5 w-full max-h-[95vh] max-w-full animate-slide-up overflow-y-auto rounded-xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.2)] md:m-0 md:max-h-[90vh] md:max-w-[720px]">
        <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-xl border-b border-gray-200 bg-white px-6 py-5">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            className="cursor-pointer rounded-md border-none p-1 text-2xl text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-700"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="p-6">{children}</div>
        <div className="flex justify-end gap-2.5 rounded-b-xl border-t border-gray-200 bg-gray-50 px-6 py-4">
          <button
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-gray-200 px-[18px] py-[9px] font-sans text-sm font-medium leading-none text-gray-700 transition-all hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          {showConfirm && (
            <button
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-[18px] py-[9px] font-sans text-sm font-medium leading-none text-white transition-all hover:-translate-y-px hover:bg-primary-hover hover:shadow-[0_4px_12px_rgba(79,70,229,0.3)]"
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
