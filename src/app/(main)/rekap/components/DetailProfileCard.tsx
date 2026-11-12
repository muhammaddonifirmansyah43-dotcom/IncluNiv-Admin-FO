import { GraduationCap, Building2 } from "lucide-react";
import type { volunteerData } from "./RekapData";

type Volunteer = (typeof volunteerData)[number];

const chip = "flex items-center gap-1 rounded-md px-2 py-1 text-[10px]";

export default function DetailProfileCard({ volunteer }: { volunteer: Volunteer }) {
  return (
    <div className="flex flex-col justify-between gap-4 rounded-xl border border-[#E1EAF6] bg-white p-4 shadow-sm sm:flex-row sm:items-center">
      <div className="flex min-w-0 items-center gap-4">
        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-blue-300 bg-blue-50">
          <span className="absolute text-lg font-bold text-blue-600">
            {volunteer.nama.charAt(0)}
          </span>
          <img
            src={volunteer.foto}
            alt={volunteer.nama}
            className="relative h-full w-full object-cover"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        </div>

        <div className="min-w-0">
          <h2 className="text-base font-bold text-[#153D70]">{volunteer.nama}</h2>
          <div className="mt-1.5 flex flex-wrap gap-2">
            <span className={`${chip} bg-[#EAF2FF] text-[#2858A6]`}>
              <GraduationCap size={12} /> {volunteer.nim}
            </span>
            <span className={`${chip} bg-[#F1F5F9] text-[#526985]`}>
              <GraduationCap size={12} /> {volunteer.prodi}
            </span>
            <span className={`${chip} bg-[#F1F5F9] text-[#526985]`}>
              <Building2 size={12} /> {volunteer.fakultas}
            </span>
          </div>
        </div>
      </div>

      <div className="w-full rounded-xl bg-[#EEF3FF] px-4 py-3 sm:w-44">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-[#153D70]">{volunteer.totalSesi}</span>
          <span className="text-sm font-semibold text-[#526985]">Sesi</span>
        </div>
        <p className="mt-1 text-[11px] text-[#8191A8]">Total pendampingan semester ini</p>
      </div>
    </div>
  );
}