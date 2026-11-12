import MatkulCard from "./MatkulCard";
import type { JadwalHari } from "./types";

export default function ScheduleDay({ jadwal }: { jadwal: JadwalHari }) {
  return (
    <section>
      <div className="mb-3 flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-700">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
          {jadwal.hari}
        </span>

        <span className="text-xs text-gray-500">
          {jadwal.matkul.length} mata kuliah
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {jadwal.matkul.map((item) => (
          <MatkulCard key={`${item.jam}-${item.nama}`} item={item} />
        ))}
      </div>
    </section>
  );
}