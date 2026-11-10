import type { PengajuanStatus } from "@/types/pengajuan";
import { statusConfig } from "@/lib/pengajuan-status";

export default function StatusBadge({ status }: { status: PengajuanStatus }) {
  const config = statusConfig[status];
  return (
    <span
      className={
        "inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold " +
        config.badge
      }
    >
      {config.label}
    </span>
  );
}