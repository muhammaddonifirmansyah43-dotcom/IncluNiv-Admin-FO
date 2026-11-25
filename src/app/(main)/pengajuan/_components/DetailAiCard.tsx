
import { Sparkles, Clock3 } from "lucide-react";
import type { Pengajuan } from "@/types/pengajuan";
import DetailCard from "./DetailCard";

function Menunggu() {
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-md bg-amber-500 px-2.5 py-1 text-xs font-bold text-white">
          <Clock3 size={12} aria-hidden="true" />
          Menunggu Pemrosesan AI
        </span>
        <span className="text-xs font-bold text-amber-700">
          Belum Tersedia
        </span>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-slate-600">
        Pengajuan izin telah diterima dan tercatat dalam sistem.
        Fitur pemrosesan serta pencocokan relawan menggunakan AI
        belum tersedia pada tahap pengembangan saat ini.
      </p>

      <ul className="mt-3 space-y-3 rounded-lg border border-amber-100 bg-white p-3 text-xs">
        <li className="flex items-center justify-between gap-2">
          <span className="text-slate-600">
            Penerimaan Pengajuan Izin
          </span>
          <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-xs font-bold text-emerald-700">
            Tercatat
          </span>
        </li>
        <li className="flex items-center justify-between gap-2">
          <span className="text-slate-600">
            Pemrosesan dan Pencocokan AI
          </span>
          <span className="whitespace-nowrap rounded bg-amber-100 px-1.5 py-0.5 text-xs font-bold text-amber-700">
            Belum Tersedia
          </span>
        </li>
      </ul>
    </div>
  );
}

function HasilKeputusan({ status }: { status: Pengajuan["status"] }) {
  const disetujui = status === "telah_disetujui";

  return (
    <div
      className={
        disetujui
          ? "rounded-lg border border-emerald-200 bg-emerald-50 p-3"
          : "rounded-lg border border-red-200 bg-red-50 p-3"
      }
    >
      <p
        className={
          disetujui
            ? "text-sm font-bold text-emerald-700"
            : "text-sm font-bold text-red-600"
        }
      >
        {disetujui ? "Pengajuan Disetujui" : "Pengajuan Tidak Dipenuhi"}
      </p>

      <p className="mt-2 text-xs leading-relaxed text-slate-600">
        {disetujui
          ? "Pengajuan telah memiliki status disetujui pada sistem. Informasi mengenai proses AI belum tersedia."
          : "Pengajuan telah memiliki status tidak dipenuhi pada sistem. Alasan keputusan otomatis belum tersedia."}
      </p>
    </div>
  );
}

export default function DetailAiCard({ item }: { item: Pengajuan }) {
  const subtitle =
    item.status === "dalam_proses"
      ? "Informasi status pemrosesan pengajuan"
      : "Informasi hasil keputusan pengajuan";

  return (
    <DetailCard icon={Sparkles} title="Hasil Pemrosesan AI" subtitle={subtitle}>
      {item.status === "dalam_proses" && <Menunggu />}
      {item.status !== "dalam_proses" && (
        <HasilKeputusan status={item.status} />
      )}
    </DetailCard>
  );
}
