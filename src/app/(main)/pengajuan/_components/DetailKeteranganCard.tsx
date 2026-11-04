import { CalendarDays, FileText } from "lucide-react";
import type { Pengajuan } from "@/types/pengajuan";
import DetailCard from "./DetailCard";

export default function DetailKeteranganCard({ item }: { item: Pengajuan }) {
  return (
    <DetailCard
      icon={FileText}
      title="Keterangan Pengajuan"
      subtitle="Alasan serta jadwal sesi yang terdampak"
      badge={
        <span className="whitespace-nowrap rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600">
          1 Sesi Terdampak
        </span>
      }
    >
      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
        Alasan izin mahasiswa
      </p>
      <blockquote className="mt-2 rounded-lg border-l-4 border-l-[#3B82F6] bg-[#F1F5FB] p-3 text-xs italic leading-relaxed text-[#17345F]">
        “{item.alasan}”
      </blockquote>

      <p className="mt-4 text-[10px] font-bold uppercase tracking-wide text-slate-500">
        Jadwal seharusnya mendampingi
      </p>
      <div className="mt-2 rounded-lg border border-[#E2EBF8] bg-[#F8FAFD] p-3">
        <div className="flex items-center justify-between gap-3">
          <p className="flex items-center gap-2 text-xs font-bold text-[#17345F]">
            <CalendarDays size={15} className="text-[#3B82F6]" aria-hidden="true" />
            {item.jadwal.hari}
          </p>
          <span className="whitespace-nowrap rounded-md border border-[#E2EBF8] bg-white px-2 py-1 text-[11px] font-bold text-[#17345F]">
            {item.jadwal.jam}
          </span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 text-[11px]">
          <div>
            <p className="text-slate-500">Mata Kuliah:</p>
            <p className="mt-0.5 font-bold text-[#17345F]">{item.jadwal.matkul}</p>
          </div>
          <div>
            <p className="text-slate-500">Mahasiswa Dampingan:</p>
            <p className="mt-0.5 font-bold text-[#3B82F6]">{item.jadwal.mahasiswa}</p>
          </div>
        </div>
      </div>

      <p className="mt-3 flex flex-wrap justify-between gap-2 rounded-lg px-1 text-[11px] text-slate-500">
        Tanggal Efektif Perizinan:
        <span className="font-bold text-[#17345F]">{item.efektif}</span>
      </p>
    </DetailCard>
  );
}