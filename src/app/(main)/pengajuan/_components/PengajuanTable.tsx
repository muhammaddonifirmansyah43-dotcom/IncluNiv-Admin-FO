
import Link from "next/link";
import { Eye } from "lucide-react";
import type { Pengajuan } from "@/types/pengajuan";
import StatusBadge from "./StatusBadge";

type Props = {
  items: Pengajuan[];
  startIndex: number;
};

const th =
  "px-5 py-4 text-sm font-semibold text-[#17365f]";

export default function PengajuanTable({
  items,
  startIndex,
}: Props) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-[#dfe6ef] bg-[#f8faff]">
            <th className={`${th} w-14 text-center`}>No</th>
            <th className={th}>Nama</th>
            <th className={th}>NIM</th>
            <th className={th}>Tanggal Pengajuan</th>
            <th className={`${th} text-center`}>Status</th>
            <th className={`${th} text-center`}>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item, index) => (
            <tr
              key={item.id}
              className="border-b border-[#e8edf4] transition hover:bg-[#F8FAFD]"
            >
              <td className="px-5 py-4 text-center text-sm text-[#657892]">
                {startIndex + index + 1}
              </td>

              <td className="px-5 py-4 text-sm font-semibold text-[#17365f]">
                {item.nama}
              </td>

              <td className="px-5 py-4 font-mono text-sm text-[#526681]">
                {item.nim}
              </td>

              <td className="px-5 py-4 text-sm text-[#526681]">
                {item.tanggalSingkat}
              </td>

              <td className="px-5 py-4 text-center">
                <StatusBadge status={item.status} />
              </td>

              <td className="px-5 py-4">
                <div className="flex justify-center">
                  <Link
                    href={"/pengajuan/" + item.id}
                    aria-label={"Lihat detail pengajuan " + item.nama}
                    title="Lihat detail"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e8f1ff] text-[#4385f5] transition hover:bg-[#dbe9ff] outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2"
                  >
                    <Eye size={16} strokeWidth={2} aria-hidden="true" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}

          {items.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="px-5 py-16 text-center text-sm text-[#8495ac]"
              >
                Tidak ada pengajuan yang cocok.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
