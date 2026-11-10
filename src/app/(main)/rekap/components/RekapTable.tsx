
"use client";

import { useState } from "react";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

import type { RekapItem } from "./types";

interface RekapTableProps {
  data: RekapItem[];
}

export default function RekapTable({ data }: RekapTableProps) {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const totalPages = Math.max(1, Math.ceil(data.length / limit));

  const startIndex = (currentPage - 1) * limit;

  const currentData = data.slice(
    startIndex,
    startIndex + limit
  );

  const handleDetail = (id: number) => {
    router.push(`/rekap/detail/${id}`);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-[#E3EAF5] bg-white shadow-sm">
      {/* Tabel */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[750px] text-left">
          <thead className="bg-[#EDF3FF]">
            <tr className="text-[10px] font-bold uppercase tracking-wide text-[#526985]">
              <th className="w-14 px-5 py-4">No</th>
              <th className="px-5 py-4">Nama Relawan</th>
              <th className="px-5 py-4">NIM</th>
              <th className="px-5 py-4">Fakultas</th>
              <th className="px-5 py-4">Jumlah Pendampingan</th>
              <th className="w-20 px-5 py-4 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#EDF1F7]">
            {currentData.length > 0 ? (
              currentData.map((item, index) => (
                <tr
                  key={item.id}
                  className="transition-colors hover:bg-[#F8FAFF]"
                >
                  <td className="px-5 py-5 text-xs text-[#718198]">
                    {startIndex + index + 1}
                  </td>

                  <td className="px-5 py-5">
                    <span className="text-xs font-semibold text-[#203B60]">
                      {item.nama}
                    </span>
                  </td>

                  <td className="px-5 py-5 text-[11px] text-[#718198]">
                    {item.nim}
                  </td>

                  <td className="px-5 py-5">
                    <span className="inline-block max-w-[180px] rounded-md bg-[#F0F4FC] px-2 py-1 text-[10px] font-medium text-[#49648A]">
                      {item.fakultas}
                    </span>
                  </td>

                  <td className="px-5 py-5">
                    <span className="whitespace-nowrap rounded-full bg-[#E7EFFF] px-3 py-1.5 text-[10px] font-bold text-[#2858A6]">
                      {item.jumlah} Sesi
                    </span>
                  </td>

                  <td className="px-5 py-5 text-center">
                    <button
                      type="button"
                      onClick={() => handleDetail(item.id)}
                      title={`Detail ${item.nama}`}
                      aria-label={`Lihat detail ${item.nama}`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[#4285ED] transition hover:bg-[#EAF2FF]"
                    >
                      <Eye size={17} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-16 text-center"
                >
                  <div className="text-sm font-semibold text-[#526985]">
                    Data pendamping tidak ditemukan
                  </div>

                  <p className="mt-1 text-xs text-[#94A3B8]">
                    Coba ubah kata pencarian atau filter.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Pagination */}
      <div className="flex flex-col gap-3 border-t border-[#EDF1F7] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-[11px] text-[#718198]">
          <span>Menampilkan</span>

          <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="rounded-md border border-[#DFE8F5] bg-[#F8FAFF] px-2 py-1 outline-none"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>

          <span>dari {data.length} relawan</span>
        </div>

        <div className="flex items-center justify-between gap-3 sm:justify-end">
          <span className="text-[11px] text-[#718198]">
            Halaman {currentPage} dari {totalPages}
          </span>

          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((prev) => Math.max(1, prev - 1))
              }
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#DFE8F5] text-[#526985] transition hover:bg-[#F0F4FC] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={16} />
            </button>

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(totalPages, prev + 1)
                )
              }
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#DFE8F5] text-[#526985] transition hover:bg-[#F0F4FC] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
