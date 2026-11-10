import type { volunteerData } from "./RekapData";
import DetailStatusBadge from "./DetailStatusBadge";

type Riwayat = (typeof volunteerData)[number]["riwayat"][number];

const td = "px-4 py-3.5";

export default function DetailRiwayatRow({ no, item }: { no: number; item: Riwayat }) {
  return (
    <tr className="transition hover:bg-[#F8FAFD]">
      <td className={`${td} text-xs text-[#718198]`}>{String(no).padStart(2, "0")}</td>
      <td className={td}>
        <p className="whitespace-nowrap text-xs font-semibold text-[#263B55]">{item.tanggal}</p>
        <p className="mt-0.5 text-[10px] text-[#94A3B8]">{item.waktu}</p>
      </td>
      <td className={`${td} text-xs font-medium text-[#263B55]`}>{item.mahasiswa}</td>
      <td className={td}>
        <p className="text-xs font-semibold text-[#263B55]">{item.kegiatan}</p>
        <p className="mt-0.5 text-[10px] text-[#94A3B8]">Pendampingan perkuliahan</p>
      </td>
      <td className={td}>
        <p className="text-xs font-medium text-[#263B55]">{item.lokasi}</p>
        <p className="mt-0.5 text-[10px] text-[#94A3B8]">{item.ruang}</p>
      </td>
      <td className={`${td} whitespace-nowrap text-xs text-[#263B55]`}>{item.durasi}</td>
      <td className={td}><DetailStatusBadge status={item.status} /></td>
    </tr>
  );
}