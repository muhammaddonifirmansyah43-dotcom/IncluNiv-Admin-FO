import { Eye, Trash2 } from "lucide-react";

import type { Mahasiswa } from "./types";

interface MahasiswaRowProps {
  item: Mahasiswa;
  index: number;
  onView: (id: string) => void;
  onDelete: (item: Mahasiswa) => void;
}

export default function MahasiswaRow({
  item,
  index,
  onView,
  onDelete,
}: MahasiswaRowProps) {
  return (
    <tr className="border-b border-[#e8edf4] transition hover:bg-[#F8FAFD]">
      <td className="px-5 py-4 text-center text-sm text-[#657892]">
        {index + 1}
      </td>

      <td className="px-5 py-4 text-sm font-semibold text-[#17365f]">
        {item.nama}
      </td>

      <td className="px-5 py-4 text-sm text-[#526681]">{item.nim}</td>

      <td className="px-5 py-4 text-sm text-[#526681]">{item.fakultas}</td>

      <td className="px-5 py-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e8f1ff] px-3 py-1.5 text-xs font-semibold text-[#2563C9]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2563C9]" />
          {item.disability}
        </span>
      </td>

      <td className="px-5 py-4">
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => onView(item.id)}
            title="Lihat detail"
            aria-label={`Lihat detail ${item.nama}`}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e8f1ff] text-[#4385f5] transition hover:bg-[#dbe9ff]"
          >
            <Eye size={17} />
          </button>

          <button
            type="button"
            onClick={() => onDelete(item)}
            title="Hapus"
            aria-label={`Hapus ${item.nama}`}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#8495ac] transition hover:bg-[#fff0f0] hover:text-[#e05252]"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}