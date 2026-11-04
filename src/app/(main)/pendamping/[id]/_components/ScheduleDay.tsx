import { Clock, MapPin } from "lucide-react";
import type { ScheduleDay as ScheduleDayType } from "@/types/pendamping";

export default function ScheduleDay({ hari, courses }: ScheduleDayType) {
  const totalSks = courses.reduce((sum, course) => sum + course.sks, 0);

  return (
    <section className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-md bg-[#3B82F6] px-2.5 py-1 text-[11px] font-bold uppercase text-white">
          {hari}
        </span>
        <span className="text-xs text-slate-500">
          {courses.length} Mata Kuliah · {totalSks} SKS
        </span>
      </div>

      {courses.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#D9E6F8] bg-[#F8FAFF] p-4">
          <p className="text-sm font-bold text-[#17345F]">
            Tidak Ada Jadwal Perkuliahan
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Hari ini relawan bebas kuliah, sehingga tersedia untuk penugasan
            pendampingan.
          </p>
        </div>
      ) : (
        <ul className="grid gap-3 md:grid-cols-2">
          {courses.map((course) => (
            <li
              key={`${hari}-${course.nama}`}
              className="rounded-xl border border-[#E2EBF8] bg-white p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                  {course.sks} SKS
                </span>
                <span className="inline-flex items-center gap-1.5 rounded bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-[#3B82F6]">
                  <Clock size={12} aria-hidden="true" />
                  {course.jam}
                </span>
              </div>

              <h3 className="mt-3 break-words text-sm font-bold text-[#17345F]">
                {course.nama}
              </h3>

              <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                <MapPin size={13} className="shrink-0" aria-hidden="true" />
                <span className="font-semibold text-slate-600">{course.ruang}</span>
                <span aria-hidden="true">•</span>
                <span className="truncate">{course.dosen}</span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}