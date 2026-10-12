export function formatCurrency(amount: number | undefined | null): string {
  return `Rs. ${Number(amount ?? 0).toLocaleString()}`;
}

export function formatDate(dateStr: string | undefined | null): string {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatTime(timeStr: string | undefined | null): string {
  if (!timeStr) return "-";
  const [h, m] = timeStr.split(":");
  const hour = parseInt(h, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 || 12;
  return `${h12}:${m} ${ampm}`;
}

export function toLocalDateStr(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function formatFullDate(date: Date): string {
  return date.toLocaleDateString("en-PK", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
