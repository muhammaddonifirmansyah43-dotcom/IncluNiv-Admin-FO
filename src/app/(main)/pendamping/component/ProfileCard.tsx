import { GraduationCap, Hash, Building2 } from "lucide-react";
import type { PendampingDetail } from "@/types/pendamping";

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

const chip =
  "inline-flex items-center gap-1.5 rounded-lg bg-[#F1F5FB] px-3 py-1.5 text-xs font-medium text-slate-600";

export default function ProfileCard({ data }: { data: PendampingDetail }) {
  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-[#DCE6F2] bg-white p-5 shadow-sm sm:flex-row sm:items-center">
      <div
        aria-hidden="true"
        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-[#BFDBFE] bg-[#E6F0FF] text-xl font-bold text-[#17345F]"
      >
        {initials(data.nama)}
      </div>

      <div className="min-w-0 flex-1">
        <h1 className="break-words text-lg font-bold text-[#17345F]">
          {data.nama}
        </h1>

        <div className="mt-3 flex flex-wrap gap-2">
          <span className={`${chip} font-bold text-[#17345F]`}>
            <Hash size={13} aria-hidden="true" />
            {data.nim}
          </span>

          <span className={chip}>
            <GraduationCap size={14} aria-hidden="true" />
            {data.prodi}
          </span>

          <span className={chip}>
            <Building2 size={14} aria-hidden="true" />
            {data.fakultas}
          </span>
        </div>
      </div>
    </section>
  );
}
