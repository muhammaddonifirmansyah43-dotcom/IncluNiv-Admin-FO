import { CalendarDays, FileText, Info, RefreshCw } from "lucide-react";
import type { Pengajuan, PengajuanStatus } from "@/types/pengajuan";
import { statusConfig } from "@/lib/pengajuan-status";
import DetailCard from "./DetailCard";

const alertContent: Record<
  PengajuanStatus,
  { title: string; text: string; box: string; titleColor: string }
> = {
  diproses: {
    title: "JADWAL YANG TERDAMPAK",
    text: "Pengajuan izin sedang dianalisis oleh sistem pencocokan AI untuk mengidentifikasi relawan pengganti yang sesuai jadwal dan kualifikasi akademik pendampingan.",
    box: "border-amber-200 bg-amber-50 text-amber-800",
    titleColor: "text-amber-700",
  },
  disetujui: {
    title: "JADWAL YANG TERDAMPAK",
    text: "Pengajuan izin otomatis terintegrasi dengan jadwal akademik & modul alokasi cadangan volunteer tanpa memerlukan verifikasi manual tambahan.",
    box: "border-blue-200 bg-blue-50 text-slate-600",
    titleColor: "text-[#17345F]",
  },
  tidak_dipenuhi: {
    title: "PENGAJUAN TIDAK DAPAT DIPENUHI",
    text: "Pengajuan izin tidak dapat dipenuhi secara otomatis karena sistem AI tidak menemukan relawan pengganti yang tersedia dan sesuai kualifikasi pada jadwal tersebut.",
    box: "border-red-200 bg-red-50 text-red-700",
    titleColor: "text-red-600",
  },
};

export default function DetailInfoCard({ item }: { item: Pengajuan }) {
  const status = statusConfig[item.status];
  const alert = alertContent[item.status];

  return (
    <DetailCard
      icon={FileText}
      title="Detail Pengajuan"
      subtitle="Informasi teknis dan riwayat pengiriman"
    >
      <dl className="space-y-3 rounded-lg border border-[#E2EBF8] bg-[#F8FAFD] p-3 text-xs">
        <div className="flex items-center justify-between gap-3">
          <dt className="flex items-center gap-2 text-slate-500">
            <CalendarDays size={14} aria-hidden="true" />
            Tanggal Pengajuan:
          </dt>
          <dd className="text-right font-bold text-[#17345F]">{item.tanggalLengkap}</dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="flex items-center gap-2 text-slate-500">
            <RefreshCw size={14} aria-hidden="true" />
            Status Pemrosesan:
          </dt>
          <dd>
            <span
              className={inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${status.pill}}
            >
              <span className={h-1.5 w-1.5 rounded-full ${status.dot}} aria-hidden="true" />
              {status.pillLabel}
            </span>
          </dd>
        </div>
      </dl>

      <div className={mt-3 rounded-lg border p-3 ${alert.box}}>
        <p className={flex items-center gap-2 text-[11px] font-bold ${alert.titleColor}}>
          <Info size={14} aria-hidden="true" />
          {alert.title}
        </p>
        <p className="mt-1.5 text-xs leading-relaxed">{alert.text}</p>
      </div>
    </DetailCard>
  );
}