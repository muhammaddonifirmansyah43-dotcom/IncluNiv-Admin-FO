
import Link from "next/link";
import { Eye, Trash2 } from "lucide-react";
import type { Pendamping } from "@/types/pendamping";

type Props = {
  no: number;
  item: Pendamping;
  onRequestDelete: (item: Pendamping) => void;
};

export default function PendampingRow({ no, item, onRequestDelete }: Props) {
  return (
    <tr className="border-b border-[#e8edf4] transition hover:bg-[#F8FAFD]">
      <td className="px-5 py-4 text-center text-sm text-[#657892]">
        {no}
      </td>

      <td className="px-5 py-4 text-sm font-semibold text-[#17365f]">
        {item.nama}
      </td>

      <td className="px-5 py-4 text-sm text-[#526681]">
        {item.nim}
      </td>

      <td className="px-5 py-4 text-sm text-[#526681]">
        {item.fakultas}
      </td>

      <td className="px-5 py-4">
        <div className="flex items-center justify-center gap-2">
          <Link
            href={`/pendamping/${item.id}`}
            title="Lihat detail"
            aria-label={`Lihat detail ${item.nama}`}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e8f1ff] text-[#4385f5] transition hover:bg-[#dbe9ff] outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2"
          >
            <Eye size={16} strokeWidth={2} aria-hidden="true" />
          </Link>

          <button
            type="button"
            title="Hapus"
            aria-label={`Hapus ${item.nama}`}
            onClick={() => onRequestDelete(item)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#8495ac] transition hover:bg-[#fff0f0] hover:text-[#e05252] outline-none focus-visible:ring-2 focus-visible:ring-red-300 focus-visible:ring-offset-2"
          >
            <Trash2 size={16} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </td>
    </tr>
  );
}
