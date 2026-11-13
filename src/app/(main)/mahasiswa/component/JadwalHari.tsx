
import { BookOpen } from "lucide-react";
import MatkulCard from "./MatkulCard";
import type { JadwalHari as JadwalHariType } from "./types";

export default function JadwalHari({
  jadwal,
}: {
  jadwal: JadwalHariType;
}) {
  return (
    <section>
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#3B82F6]" />
          <h4 className="text-sm font-bold text-[#17345F]">
            {jadwal.hari}
          </h4>
        </div>

        <span className="rounded-full bg-[#F1F5FB] px-2.5 py-1 text-[10px] font-medium text-slate-500">
          {jadwal.matkul.length} Mata Kuliah
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {jadwal.matkul.map((item) => (
          <MatkulCard
            key={`${item.jam}-${item.nama}`}
            item={item}
          />
        ))}
      </div>
    </section>
  );
}
