
"use client";

import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

import type { RecapVolunteer } from "./types";

interface RekapTableProps {
  data: RecapVolunteer[];
  totalVolunteers: number;
  emptyMessage: string;
  currentPage: number;
  pageCount: number;
  startItem: number;
  endItem: number;
  totalFiltered: number;
  onPageChange: (page: number) => void;
}

const th = "px-5 py-4 text-sm font-semibold text-[#17365f]";

export default function RekapTable({
  data,
  totalVolunteers,
  emptyMessage,
  currentPage,
  pageCount,
  startItem,
  endItem,
  totalFiltered,
  onPageChange,
}: RekapTableProps) {
  const router = useRouter();

  const maxJumlah = Math.max(
    0,
    ...data.map((item) => item.totalActivities)
  );

  const handleDetail = (mentorId: number) => {
    router.push(`/rekap/detail/${mentorId}`);
  };

  const pageNumbers = Array.from(
    { length: pageCount },
    (_, index) => index + 1
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-[#e0e7f0] bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[750px] border-collapse text-left">
          <thead>
            <tr className="border-b border-[#dfe6ef] bg-[#f8faff]">
              <th className={`${th} w-14`}>No</th>
              <th className={th}>Nama Relawan</th>
              <th className={th}>NIM</th>
              <th className={th}>Prodi</th>
              <th className={th}>Jumlah Kegiatan</th>
              <th className={`${th} w-20 text-center`}>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr
                  key={item.mentorId}
                  className="border-b border-[#e8edf4] transition hover:bg-[#F8FAFD]"
                >
                  <td className="px-5 py-4 text-sm text-[#657892]">
                    {(currentPage - 1) * 10 + index + 1}
                  </td>

                  <td className="px-5 py-4">
                    <span className="text-sm font-semibold text-[#17365f]">
                      {item.fullName}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm text-[#526681]">
                    {item.nim ?? "-"}
                  </td>

                  <td className="px-5 py-4 text-sm text-[#526681]">
                    {item.department ?? "-"}
                  </td>

                  <td className="px-5 py-4">
                    {item.totalActivities === maxJumlah ? (
                      <span className="whitespace-nowrap rounded-full bg-[#FFF0E5] px-3 py-1.5 text-sm font-bold text-[#F97316]">
                        {item.totalActivities} Kegiatan
                      </span>
                    ) : (
                      <span className="whitespace-nowrap text-sm text-[#526681]">
                        {item.totalActivities} Kegiatan
                      </span>
                    )}
                  </td>

                  <td className="px-5 py-4 text-center">
                    <button
                      type="button"
                      onClick={() => handleDetail(item.mentorId)}
                      title={`Detail ${item.fullName}`}
                      aria-label={`Lihat detail ${item.fullName}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#e8f1ff] text-[#4385f5] transition hover:bg-[#dbe9ff]"
                    >
                      <Eye size={16} strokeWidth={2} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-16 text-center text-sm text-[#8495ac]"
                >
                  <div className="font-semibold">{emptyMessage}</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-4 border-t border-[#e0e7ef] bg-[#f8fafc] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[#71829b]">
          Menampilkan{" "}
          <span className="font-semibold text-[#17365f]">
            {startItem}-{endItem}
          </span>{" "}
          dari{" "}
          <span className="font-semibold text-[#17365f]">
            {totalFiltered}
          </span>{" "}
          data hasil pencarian.
        </p>

        {pageCount > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#dce5ef] bg-white text-[#526681] transition hover:bg-[#eaf2ff] disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Halaman sebelumnya"
            >
              <ChevronLeft size={17} />
            </button>

            {pageNumbers.map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => onPageChange(page)}
                className={`h-9 min-w-9 rounded-lg px-2 text-sm font-medium transition ${
                  currentPage === page
                    ? "bg-[#3b82f6] text-white"
                    : "border border-[#dce5ef] bg-white text-[#526681] hover:bg-[#eaf2ff]"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              disabled={currentPage === pageCount}
              onClick={() => onPageChange(currentPage + 1)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#dce5ef] bg-white text-[#526681] transition hover:bg-[#eaf2ff] disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Halaman berikutnya"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
