
import { GraduationCap, Building2 } from "lucide-react";
import type { Volunteer } from "./types";

type Props = {
  volunteer: Volunteer;
};

const chip =
  "inline-flex items-center gap-1.5 rounded-lg bg-[#F1F5FB] px-3 py-2 text-xs font-medium text-[#526985]";

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export default function DetailProfileCard({ volunteer }: Props) {
  return (
    <section className="flex w-full flex-col gap-4 rounded-2xl border border-[#DCE6F2] bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div className="flex min-w-0 items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-[#BFDBFE] bg-[#E6F0FF] text-xl font-bold text-[#17345F] sm:h-[76px] sm:w-[76px] sm:text-2xl">
          {getInitials(volunteer.nama)}
        </div>

        <div className="min-w-0">
          <h2 className="break-words text-lg font-bold text-[#17345F] sm:text-xl">
            {volunteer.nama}
          </h2>

          <div className="mt-3 flex flex-wrap gap-2">
            <span className={chip}>
              <GraduationCap size={14} />
              {volunteer.nim}
            </span>

            <span className={chip}>
              <GraduationCap size={14} />
              {volunteer.prodi}
            </span>

            <span className={chip}>
              <Building2 size={14} />
              {volunteer.fakultas}
            </span>
          </div>
        </div>
      </div>

      <div className="flex shrink-0 flex-col justify-center rounded-xl bg-[#E6F0FF] px-5 py-3 sm:min-w-[190px]">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold leading-none text-[#17345F]">
            {volunteer.totalSesi}
          </span>
          <span className="text-sm font-semibold text-[#526985]">
            Sesi
          </span>
        </div>

        <p className="mt-2 text-xs leading-relaxed text-[#71829B]">
          Pendampingan terbanyak semester ini
        </p>
      </div>
    </section>
  );
}
