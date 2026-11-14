
import type { Volunteer } from "./types";
import DetailStatusBadge from "./DetailStatusBadge";

type Riwayat = Volunteer["riwayat"][number];

type Props = {
  no: number;
  item: Riwayat;
};

const td =
  "px-4 py-4 align-middle text-sm text-[#263B55]";

export default function DetailRiwayatRow({ no, item }: Props) {
  return (
    <tr className="transition-colors duration-150 hover:bg-[#F5F8FD]">
      <td className={`${td} whitespace-nowrap font-medium text-[#8191A8]`}>
        {String(no).padStart(2, "0")}
      </td>

      <td className={td}>
        <p className="whitespace-nowrap font-semibold text-[#17345F]">
          {item.tanggal}
        </p>
        <p className="mt-1 whitespace-nowrap text-xs text-[#8191A8]">
          {item.waktu}
        </p>
      </td>

      <td className={`${td} font-medium leading-relaxed`}>
        {item.mahasiswa}
      </td>

      <td className={`${td} leading-relaxed`}>
        {item.kegiatan}
      </td>

      <td className={td}>
        <p className="font-medium">{item.lokasi}</p>
        <p className="mt-1 text-xs text-[#8191A8]">
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
