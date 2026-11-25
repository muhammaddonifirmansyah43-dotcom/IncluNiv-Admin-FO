
"use client";

import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";

import type { RecapVolunteer } from "./types";

interface RekapTableProps {
  data: RecapVolunteer[];
  totalVolunteers: number;
  emptyMessage: string;
}

const th = "px-5 py-4 text-sm font-semibold text-[#17365f]";

export default function RekapTable({
  data,
  totalVolunteers,
  emptyMessage,
}: RekapTableProps) {
  const router = useRouter();

  const maxJumlah = Math.max(
    0,
    ...data.map((item) => item.totalActivities)
  );

  const handleDetail = (mentorId: number) => {
    router.push(`/rekap/detail/${mentorId}`);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-[#e0e7f0] bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[750px] border-collapse text-left">
          <thead>
            <tr className="border-b border-[#dfe6ef] bg-[#f8faff]">
              <th className={`${th} w-14`}>No</th>
              <th className={th}>Nama Relawan</th>
              <th className={th}>NIM</th>
              <th className={th}>Departemen</th>
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
                    {index + 1}
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
                  <div className="font-semibold">
                    {emptyMessage}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="border-t border-[#e0e7ef] bg-[#f8fafc] px-5 py-4">
        <p className="text-sm text-[#71829b]">
          Menampilkan{" "}
          <span className="font-semibold text-[#17365f]">
            {data.length}
          </span>{" "}
          dari{" "}
          <span className="font-semibold text-[#17365f]">
            {totalVolunteers}
          </span>{" "}
          volunteer.
        </p>
      </div>
    </div>
  );
}
