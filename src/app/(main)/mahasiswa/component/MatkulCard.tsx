
import { Clock, MapPin, BookOpen } from "lucide-react";
import type { Matkul } from "./types";

export default function MatkulCard({ item }: { item: Matkul }) {
  return (
    <article className="group rounded-xl border border-[#E2EAF5] bg-[#FAFCFF] p-4 transition hover:border-[#B8D1F5] hover:bg-white hover:shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#E6F0FF] px-2.5 py-1.5 text-[11px] font-bold text-[#2563EB]">
          <BookOpen size={13} />
          {item.sks}
        </span>

        <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-semibold text-[#2563EB]">
          <Clock size={14} />
          {item.jam}
        </span>
      </div>

      <h5 className="min-h-10 text-sm font-bold leading-relaxed text-[#17345F]">
        {item.nama}
      </h5>

      <div className="mt-3 space-y-2 border-t border-[#E8EEF6] pt-3">
        <div className="flex items-start gap-2 text-xs text-slate-600">
          <MapPin size={14} className="mt-0.5 shrink-0 text-[#3B82F6]" />
          <span>{item.lokasi}</span>
        </div>

        <p className="pl-[22px] text-[11px] text-slate-400">
          {item.gedung}
        </p>
      </div>
    </article>
  );
}
