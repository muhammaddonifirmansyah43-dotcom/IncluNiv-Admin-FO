import type { PermissionRequest, RequestTone } from "@/types/dashboard";

const statusStyles: Record<RequestTone, string> = {
  green: "border-emerald-200 bg-emerald-50 text-emerald-700",
  orange: "border-orange-200 bg-orange-50 text-orange-700",
  red: "border-red-200 bg-red-50 text-red-700",
};

export default function RequestItem({ name, detail, status, tone }: PermissionRequest) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-lg border border-[#E2EBF8] bg-[#F8FAFF] p-2.5">
      <div className="min-w-0">
        <p className="truncate text-xs font-bold">{name}</p>
        <p className="mt-1 truncate text-[10px] text-slate-400">{detail}</p>
      </div>
      <span
        className={`shrink-0 rounded border px-2 py-1 text-[10px] font-semibold ${statusStyles[tone]}`}
      >
        {status}
      </span>
    </div>
  );
}