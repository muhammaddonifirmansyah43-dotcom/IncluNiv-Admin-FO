import { Clock, MapPin } from "lucide-react";

import type { Matkul } from "./types";

export default function MatkulCard({ item }: { item: Matkul }) {
  return (
    <div className="rounded-lg border border-gray-100 bg-[#FAFBFD] p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="rounded bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700">
          {item.sks}
        </span>

        <span className="flex items-center gap-1.5 text-sm font-medium text-blue-600">
          <Clock size={14} />
          {item.jam}
        </span>
      </div>

      <h4 className="mb-3 text-sm font-bold text-[#0F2D5B]">{item.nama}</h4>

      <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-gray-600">
        <MapPin size={13} className="shrink-0" />
        {item.lokasi}
        <span className="text-gray-300">•</span>
        {item.gedung}
      </div>
    </div>
  );
}