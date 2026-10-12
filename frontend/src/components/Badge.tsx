import { statusBadgeClass } from "@/lib/selectors";

const TONE_CLASS: Record<string, string> = {
  success: "bg-success-bg text-green-600",
  danger: "bg-danger-bg text-red-600",
  warning: "bg-warning-bg text-yellow-600",
  info: "bg-info-bg text-blue-600",
  primary: "bg-primary-light text-primary",
  secondary: "bg-gray-200 text-gray-600",
};

const BADGE_BASE =
  "inline-flex items-center rounded-[20px] px-2.5 py-[3px] text-[11px] font-semibold tracking-[0.2px] capitalize";

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`${BADGE_BASE} ${statusBadgeClass(status)}`}>
      {status}
    </span>
  );
}

export function Badge({
  children,
  tone,
  className = "",
}: {
  children: React.ReactNode;
  tone?: string;
  className?: string;
}) {
  return (
    <span
      className={`${BADGE_BASE} ${TONE_CLASS[tone ?? "secondary"]} ${className}`}
    >
      {children}
    </span>
  );
}
