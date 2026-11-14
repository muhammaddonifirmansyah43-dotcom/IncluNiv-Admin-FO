
import type { Volunteer } from "./types";

import DetailRiwayatRow from "./DetailRiwayatRow";
import DetailRiwayatEmpty from "./DetailRiwayatEmpty";

type Props = {
  volunteer: Volunteer;
};

const kolom = [
  "No.",
  "Tanggal / Waktu",
  "Mahasiswa Didampingi",
  "Mata Kuliah",
  "Lokasi",
  "Durasi",
  "Status",
];

export default function DetailRiwayatTable({ volunteer }: Props) {
  return (
    <section className="w-full overflow-hidden rounded-xl border border-[#DCE6F2] bg-white shadow-sm">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[720px] table-fixed text-left">
          <colgroup>
            <col className="w-[6%]" />
            <col className="w-[14%]" />
            <col className="w-[17%]" />
            <col className="w-[21%]" />
            <col className="w-[17%]" />
            <col className="w-[11%]" />
            <col className="w-[14%]" />
          </colgroup>

          <thead className="bg-[#E6F0FF]">
            <tr className="text-[9px] font-bold uppercase tracking-wide text-[#526985]">
              {kolom.map((item) => (
                <th
                  key={item}
                  scope="col"
                  className="whitespace-nowrap px-2 py-3"
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-[#E8EEF6]">
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

      <div className="border-t border-[#E8EEF6] px-3 py-2">
        <p className="text-[9px] text-[#8191A8]">
          {volunteer.riwayat.length > 0
            ? "Seluruh riwayat pendampingan ditampilkan"
            : "Belum ada riwayat pendampingan yang ditampilkan"}
        </p>
      </div>
    </section>
  );
}
