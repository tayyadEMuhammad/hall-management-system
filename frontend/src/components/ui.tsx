export function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: string;
  label: string;
  value: React.ReactNode;
  color?: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-[18px_20px] shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]">
      <span className="float-right text-[28px] text-gray-300 opacity-70">
        <i className={`fas ${icon}`}></i>
      </span>
      <div className="text-[13px] font-medium text-gray-500">{label}</div>
      <div
        className="mt-0.5 text-[26px] font-bold tracking-[-0.5px] text-gray-900"
        style={color ? { color } : undefined}
      >
        {value}
      </div>
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="p-[48px_20px] text-center">
      <i className={`fas ${icon} mb-4 text-[48px] text-gray-300`}></i>
      <h3 className="mb-1 text-lg text-gray-700">{title}</h3>
      <p className="text-sm text-gray-500">{text}</p>
    </div>
  );
}
