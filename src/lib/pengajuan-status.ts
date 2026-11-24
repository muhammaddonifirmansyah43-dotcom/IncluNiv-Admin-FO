import type { PengajuanStatus } from "@/types/pengajuan";

export const statusConfig: Record<
  PengajuanStatus,
  {
    label: string;
    badge: string;
    pillLabel: string;
    pill: string;
    dot: string;
  }
> = {
  dalam_proses: {
    label: "Dalam proses",
    badge: "bg-amber-100 text-amber-700",
    pillLabel: "Dalam proses",
    pill: "border-amber-200 bg-amber-50 text-amber-700",
    dot: "bg-amber-500",
  },
  telah_disetujui: {
    label: "Telah disetujui",
    badge: "bg-emerald-100 text-emerald-700",
    pillLabel: "Telah disetujui",
    pill: "border-emerald-200 bg-emerald-50 text-emerald-700",
    dot: "bg-emerald-500",
  },
  tidak_dipenuhi: {
    label: "Tidak dipenuhi",
    badge: "bg-red-100 text-red-600",
    pillLabel: "Tidak dipenuhi",
    pill: "border-red-200 bg-red-50 text-red-600",
    dot: "bg-red-500",
  },
};

export const statusOptions: {
  value: "semua" | PengajuanStatus;
  label: string;
}[] = [
  { value: "semua", label: "Semua" },
  { value: "dalam_proses", label: "Dalam proses" },
  { value: "telah_disetujui", label: "Telah disetujui" },
  { value: "tidak_dipenuhi", label: "Tidak dipenuhi" },
];