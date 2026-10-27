type StatusBadgeProps = {
  status: string;
};

const statusStyles: Record<string, string> = {
  Selesai: "bg-emerald-50 text-emerald-700",
  Disetujui: "bg-emerald-50 text-emerald-700",
  Menunggu: "bg-amber-50 text-amber-700",
  Diproses: "bg-blue-50 text-blue-700",
  Ditolak: "bg-red-50 text-red-700",
  Aktif: "bg-emerald-50 text-emerald-700",
  Nonaktif: "bg-slate-100 text-slate-600",
};

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  const style =
    statusStyles[status] ?? "bg-slate-100 text-slate-600";

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${style}`}
    >
      {status}
    </span>
  );
}