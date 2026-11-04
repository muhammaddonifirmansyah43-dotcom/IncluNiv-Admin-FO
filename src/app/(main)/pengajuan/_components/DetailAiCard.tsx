import Link from "next/link";
import { ArrowRight, CalendarCheck, Check, RefreshCw, X, Zap, Sparkles } from "lucide-react";
import type { Pengajuan } from "@/types/pengajuan";
import DetailCard from "./DetailCard";

function Diproses() {
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-md bg-amber-500 px-2.5 py-1 text-[11px] font-bold text-white">
          <Zap size={12} aria-hidden="true" />
          Sedang Diproses AI
        </span>
        <span className="text-[11px] font-bold text-amber-700">Mencari Kecocokan...</span>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-slate-600">
        Sistem AI sedang mencocokkan kualifikasi pendampingan{" "}
        <strong className="text-[#17345F]">Sensorik Netra</strong> dan jadwal kuliah dengan
        database <strong className="text-[#17345F]">20 relawan aktif</strong> yang berstatus
        luang.
      </p>

      <ul className="mt-3 space-y-3 rounded-lg border border-amber-100 bg-white p-3 text-xs">
        <li className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-2 text-slate-600">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-white">
              <Check size={10} aria-hidden="true" />
            </span>
            Analisis Jadwal Mahasiswa Dampingan
          </span>
          <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700">
            Selesai
          </span>
        </li>
        <li>
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2 text-slate-600">
              <RefreshCw size={14} className="text-amber-500" aria-hidden="true" />
              Penyaringan Relawan Berdasarkan Kompetensi
            </span>
            <span className="whitespace-nowrap rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-700">
              Sedang Berjalan (70%)
            </span>
          </div>
          <div
            className="mt-2 h-1.5 rounded-full bg-amber-100"
            role="progressbar"
            aria-valuenow={70}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div className="h-full w-[70%] rounded-full bg-amber-500" />
          </div>
        </li>
      </ul>
    </div>
  );
}

function Disetujui() {
  return (
    <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500 px-2.5 py-1 text-[11px] font-bold text-white">
          <Check size={12} aria-hidden="true" />
          Disetujui AI
        </span>
        <span className="text-[11px] font-semibold text-emerald-700">
          Tingkat Kecocokan: 98.4%
        </span>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-slate-600">
        AI berhasil memproses pengajuan izin dan telah menemukan volunteer pengganti yang sesuai
        kualifikasi.
      </p>

      <Link
        href="/jadwal"
        className="mt-3 flex items-center justify-between gap-2 rounded-lg border border-emerald-200 bg-white px-3 py-2.5 text-xs font-semibold text-[#17345F] transition hover:bg-emerald-50"
      >
        <span className="flex items-center gap-2">
          <CalendarCheck size={15} className="text-[#3B82F6]" aria-hidden="true" />
          Lihat pendamping pengganti pada jadwal
        </span>
        <ArrowRight size={15} className="text-[#3B82F6]" aria-hidden="true" />
      </Link>
    </div>
  );
}

function TidakDipenuhi({ item }: { item: Pengajuan }) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-3">
      <p className="flex items-center gap-2 text-sm font-bold text-red-600">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white">
          <X size={12} aria-hidden="true" />
        </span>
        Tidak dapat dipenuhi
      </p>
      <p className="mt-1.5 border-b border-red-200 pb-3 text-xs text-slate-600">
        AI tidak dapat menemukan pendamping yang tersedia
      </p>

      <p className="mt-3 text-[11px] font-bold text-red-600">PENYEBAB / ALASAN:</p>
      <ul className="mt-2 list-disc space-y-1.5 pl-4 text-xs leading-relaxed text-slate-600">
        <li>
          Tidak ada pendamping yang tersedia pada waktu yang dibutuhkan (
          <strong className="text-[#17345F]">
            {item.jadwal.hari.split(",")[0]}, {item.jadwal.jam}
          </strong>
          )
        </li>
        <li>
          Tidak ditemukan pendamping dengan keahlian yang sesuai (
          <strong className="text-[#17345F]">{item.jabatan}</strong>)
        </li>
      </ul>
    </div>
  );
}

export default function DetailAiCard({ item }: { item: Pengajuan }) {
  const subtitle =
    item.status === "diproses" ? "Pencocokan relawan pengganti otomatis" : "";

  return (
    <DetailCard icon={Sparkles} title="Hasil Pemrosesan AI" subtitle={subtitle}>
      {item.status === "diproses" && <Diproses />}
      {item.status === "disetujui" && <Disetujui />}
      {item.status === "tidak_dipenuhi" && <TidakDipenuhi item={item} />}
    </DetailCard>
  );
}