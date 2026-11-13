import { Clock, MapPin, BookOpen } from "lucide-react";
import type { ScheduleDay as ScheduleDayType } from "@/types/pendamping";

export default function ScheduleDay({ hari, courses }: ScheduleDayType) {
  return (
    <section>
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#3B82F6]" />
          <h3 className="text-sm font-bold text-[#17345F]">{hari}</h3>
        </div>

        <span className="rounded-full bg-[#F1F5FB] px-2.5 py-1 text-[10px] font-medium text-slate-500">
          {courses.length} Mata Kuliah
        </span>
      </div>

      {courses.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#DCE6F2] bg-[#FAFBFD] px-4 py-8 text-center">
          <BookOpen
            size={26}
            aria-hidden="true"
            className="mx-auto mb-2 text-slate-300"
          />
          <p className="text-sm font-semibold text-[#17345F]">
            Tidak ada jadwal perkuliahan
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Tidak terdapat mata kuliah pada hari {hari}.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {courses.map((course) => (
            <article
              key={`${course.jam}-${course.nama}`}
              className="group rounded-xl border border-[#E2EAF5] bg-[#FAFCFF] p-4 transition hover:border-[#B8D1F5] hover:bg-white hover:shadow-sm"
            >
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#E6F0FF] px-2.5 py-1.5 text-[11px] font-bold text-[#2563EB]">
                  <BookOpen size={13} aria-hidden="true" />
                  {course.sks} SKS
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-semibold text-[#2563EB]">
                  <Clock size={14} aria-hidden="true" />
                  {course.jam}
                </span>
              </div>

              <h4 className="min-h-10 break-words text-sm font-bold leading-relaxed text-[#17345F]">
                {course.nama}
              </h4>

              <div className="mt-3 space-y-2 border-t border-[#E8EEF6] pt-3">
                <div className="flex items-start gap-2 text-xs text-slate-600">
                  <MapPin
                    size={14}
                    className="mt-0.5 shrink-0 text-[#3B82F6]"
                    aria-hidden="true"
                  />
                  <span>{course.ruang}</span>
                </div>

                <p className="pl-[22px] text-[11px] text-slate-400">
                  Dosen: {course.dosen}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
