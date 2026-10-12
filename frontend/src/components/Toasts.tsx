"use client";

import { useStore } from "@/store/useStore";

const ICONS: Record<string, string> = {
  success: "fa-check-circle",
  error: "fa-exclamation-circle",
  warning: "fa-exclamation-triangle",
  info: "fa-info-circle",
};

const TONE: Record<string, string> = {
  success: "bg-success text-white",
  error: "bg-danger text-white",
  warning: "bg-warning text-gray-800",
  info: "bg-info text-white",
};

export default function Toasts() {
  const toasts = useStore((s) => s.toasts);
  if (toasts.length === 0) return null;
  return (
    <div className="fixed right-5 top-5 z-[3000] flex max-w-[400px] flex-col gap-2.5">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex animate-slide-in-right items-center gap-3 rounded-[10px] p-[14px_20px] text-sm font-medium shadow-[0_10px_30px_rgba(0,0,0,0.15)] ${TONE[t.type] ?? TONE.info}`}
        >
          <i className={`fas ${ICONS[t.type] || ICONS.info} text-lg`}></i>{" "}
          {t.message}
        </div>
      ))}
    </div>
  );
}
