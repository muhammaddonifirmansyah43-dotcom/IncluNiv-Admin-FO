
import type { RecapVolunteerDetail } from "./types";

import DetailRiwayatRow from "./DetailRiwayatRow";
import DetailRiwayatEmpty from "./DetailRiwayatEmpty";

type Props = {
  volunteer: RecapVolunteerDetail;
};

const kolom = [
  "No.",
  "Tanggal",
  "Mahasiswa Didampingi",
  "Lokasi",
  "Durasi",
  "Status",
];

export default function DetailRiwayatTable({ volunteer }: Props) {
  const activities = volunteer.activities;

  return (
    <section className="w-full overflow-hidden rounded-2xl border border-[#e0e7f0] bg-white shadow-sm">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[800px] table-fixed border-collapse text-left">
          <colgroup>
            <col className="w-[6%]" />
            <col className="w-[17%]" />
            <col className="w-[23%]" />
            <col className="w-[20%]" />
            <col className="w-[16%]" />
            <col className="w-[18%]" />
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
            {activities.length > 0 ? (
              activities.map((item, index) => (
                <DetailRiwayatRow
                  key={item.assignmentId}
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
          {activities.length > 0
            ? `Menampilkan ${activities.length} riwayat pendampingan`
            : "Belum ada riwayat pendampingan"}
        </p>
      </div>
    </section>
  );
}
