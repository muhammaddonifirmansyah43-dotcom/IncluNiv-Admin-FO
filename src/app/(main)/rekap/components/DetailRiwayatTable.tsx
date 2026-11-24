
import type { Volunteer } from "./types";

import DetailRiwayatRow from "./DetailRiwayatRow";
import DetailRiwayatEmpty from "./DetailRiwayatEmpty";

type Props = {
  volunteer: Volunteer;
};

const kolom = [
  "No.",
  "Tanggal",
  "Mahasiswa Didampingi",
  "Mata Kuliah",
  "Lokasi",
  "Durasi",
  "Status",
];

export default function DetailRiwayatTable({ volunteer }: Props) {
  return (
    <section className="w-full overflow-hidden rounded-2xl border border-[#e0e7f0] bg-white shadow-sm">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[900px] table-fixed border-collapse text-left">
          <colgroup>
            <col className="w-[6%]" />
            <col className="w-[14%]" />
            <col className="w-[17%]" />
            <col className="w-[21%]" />
            <col className="w-[17%]" />
            <col className="w-[11%]" />
            <col className="w-[14%]" />
          </colgroup>

          <thead>
            <tr className="border-b border-[#dfe6ef] bg-[#f8faff]">
              {kolom.map((item) => (
                <th
                  key={item}
                  scope="col"
                  className="px-5 py-4 text-sm font-semibold text-[#17365f]"
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {volunteer.riwayat.length > 0 ? (
              volunteer.riwayat.map((item, index) => (
                <DetailRiwayatRow
                  key={item.id}
                  no={index + 1}
                  item={item}
                />
              ))
            ) : (
              <DetailRiwayatEmpty />
            )}
          </tbody>
        </table>
      </div>

      <div className="border-t border-[#e0e7ef] bg-[#f8fafc] px-5 py-4">
        <p className="text-sm text-[#71829b]">
          {volunteer.riwayat.length > 0
            ? "Seluruh riwayat pendampingan ditampilkan"
            : "Belum ada riwayat pendampingan yang ditampilkan"}
        </p>
      </div>
    </section>
  );
}
