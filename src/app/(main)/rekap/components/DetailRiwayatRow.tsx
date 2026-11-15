
import type { Volunteer } from "./types";
import DetailStatusBadge from "./DetailStatusBadge";

type Riwayat = Volunteer["riwayat"][number];

type Props = {
  no: number;
  item: Riwayat;
};

const td =
  "px-5 py-4 align-middle text-sm text-[#526681]";

export default function DetailRiwayatRow({ no, item }: Props) {
  return (
    <tr className="border-b border-[#e8edf4] transition hover:bg-[#F8FAFD]">
      <td className={`${td} whitespace-nowrap text-[#657892]`}>
        {no}
      </td>

      <td className={`${td} whitespace-nowrap font-semibold text-[#17365f]`}>
        {item.tanggal}
      </td>

      <td className={`${td} font-medium leading-relaxed`}>
        {item.mahasiswa}
      </td>

      <td className={`${td} leading-relaxed`}>
        {item.kegiatan}
      </td>

      <td className={td}>
        <p className="font-medium text-[#17365f]">{item.lokasi}</p>
        <p className="mt-1 text-xs text-[#657892]">
          {item.ruang}
        </p>
      </td>

      <td className={`${td} whitespace-nowrap font-medium`}>
        {item.durasi}
      </td>

      <td className={td}>
        <DetailStatusBadge status={item.status} />
      </td>
    </tr>
  );
}
