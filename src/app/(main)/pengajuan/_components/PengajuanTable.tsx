import Link from "next/link";
import { Eye, Trash2 } from "lucide-react";
import type { Pengajuan } from "@/types/pengajuan";
import StatusBadge from "./StatusBadge";

type Props = {
  items: Pengajuan[];
  onDelete: (id: string) => void;
};

const th = "px-4 py-3 text-[11px] font-bold uppercase tracking-wide text-slate-500";

export default function PengajuanTable({ items, onDelete }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="bg-[#F8FAFD]">
          <tr>
            <th className={th + " w-14 text-center"}>No</th>
            <th className={th}>Nama</th>
            <th className={th}>NIM</th>
            <th className={th}>Tanggal Pengajuan</th>
            <th className={th + " text-center"}>Status</th>
            <th className={th + " text-center"}>Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#EEF3FB]">
          {items.map((item, index) => (
            <tr key={item.id} className="transition hover:bg-[#F8FAFD]">
              <td className="px-4 py-4 text-center text-slate-500">{index + 1}</td>
              <td className="px-4 py-4 font-bold text-[#17345F]">{item.nama}</td>
              <td className="px-4 py-4 font-mono text-xs text-slate-600">{item.nim}</td>
              <td className="px-4 py-4 text-slate-600">{item.tanggalSingkat}</td>
              <td className="px-4 py-4 text-center">
                <StatusBadge status={item.status} />
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center justify-center gap-2">
                  <Link
                    href={"/pengajuan/" + item.id}
                    aria-label={"Lihat detail pengajuan " + item.nama}
                    className="flex h-8 w-8 items-center justify-center rounded-md text-[#3B82F6] transition hover:bg-blue-50"
                  >
                    <Eye size={17} aria-hidden="true" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => onDelete(item.id)}
                    aria-label={"Hapus pengajuan " + item.nama}
                    className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 size={17} aria-hidden="true" />
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {items.length === 0 && (
            <tr>
              <td colSpan={6} className="px-4 py-12 text-center text-sm text-slate-400">
                Tidak ada pengajuan yang cocok.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}