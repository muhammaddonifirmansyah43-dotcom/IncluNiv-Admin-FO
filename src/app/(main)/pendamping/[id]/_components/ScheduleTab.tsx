import { CalendarDays } from "lucide-react";
import type { ScheduleDay as ScheduleDayType } from "@/types/pendamping";
import ScheduleDay from "./ScheduleDay";

export default function ScheduleTab({ jadwal }: { jadwal: ScheduleDayType[] }) {
  return (
    <div className="space-y-4">
      <section className="flex flex-col gap-3 rounded-2xl border border-[#E2EBF8] bg-white p-4 shadow-[0_4px_14px_rgba(31,71,130,0.07)] sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#3B82F6]">
            <CalendarDays size={20} aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-base font-bold text-[#17345F]">
              Jadwal Perkuliahan Semester Ini
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Jadwal kuliah menjadi dasar pencocokan penugasan pendampingan.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          Periode:
          <span className="rounded-lg border border-[#D9E6F8] bg-[#F8FAFF] px-3 py-2 font-semibold text-[#17345F]">
            Semester Ganjil 2026/2027
          </span>
        </div>
      </section>

      <div className="space-y-5 rounded-2xl border border-[#E2EBF8] bg-white p-4 shadow-[0_4px_14px_rgba(31,71,130,0.07)] sm:p-5">
        {jadwal.map((day) => (
          <ScheduleDay key={day.hari} {...day} />
        ))}
      </div>
    </div>
  );
}