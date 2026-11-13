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
    <tr className="border-b border-[#e9eef5] last:border-b-0">
      <td className="px-5 py-4 text-center text-sm text-[#667994]">{no}</td>
      <td className="px-5 py-4 text-sm font-semibold text-[#17365f]">{item.nama}</td>
      <td className="px-5 py-4 text-sm text-[#526681]">{item.nim}</td>
      <td className="px-5 py-4 text-sm text-[#526681]">{item.fakultas}</td>
      <td className="px-5 py-3">
        <div className="flex items-center justify-center gap-2">
          <Link
            href={`/pendamping/${item.id}`}
            title="Lihat detail"
            aria-label={`Lihat detail ${item.nama}`}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#eaf2ff] text-[#4385f5] transition hover:bg-[#dceaff]"
          >
            <Eye size={16} strokeWidth={2} aria-hidden="true" />
          </Link>

          <button
            type="button"
            title="Hapus"
            aria-label={`Hapus ${item.nama}`}
            onClick={() => onRequestDelete(item)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#8293ad] transition hover:bg-[#fff1f1] hover:text-[#e05252]"
          >
            <Trash2 size={16} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </div>
      </td>
    </tr>
  );
}