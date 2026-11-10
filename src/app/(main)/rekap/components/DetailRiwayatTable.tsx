import { CheckCircle2 } from "lucide-react";
import type { volunteerData } from "./RekapData";
import DetailRiwayatRow from "./DetailRiwayatRow";
import DetailRiwayatEmpty from "./DetailRiwayatEmpty";

type Volunteer = (typeof volunteerData)[number];

const th = "px-4 py-3";
const kolom = ["No.", "Tanggal / Waktu", "Mahasiswa Didampingi", "Kegiatan / Mata Kuliah", "Lokasi", "Durasi", "Status"];

export default function DetailRiwayatTable({ volunteer }: { volunteer: Volunteer }) {
  const selesai = volunteer.riwayat.filter((r) => r.status === "Selesai").length;

  return (
    <div className="overflow-hidden rounded-xl border border-[#E1EAF6] bg-white shadow-sm">
      <div className="flex flex-wrap items-center gap-2 border-b border-[#E1EAF6] px-5 py-3.5">
        <CheckCircle2 size={16} className="text-emerald-500" />
        <span className="text-sm font-bold text-[#263B55]">{selesai} sesi selesai</span>
        <span className="text-xs text-[#8191A8]">• Riwayat pendampingan</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left">
          <thead className="bg-[#EDF3FF]">
            <tr className="text-[10px] font-bold uppercase text-[#526985]">
              {kolom.map((k) => (
                <th key={k} className={th}>{k}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EDF1F7]">
            {volunteer.riwayat.length > 0 ? (
              volunteer.riwayat.map((item, i) => (
                <DetailRiwayatRow key={item.id} no={i + 1} item={item} />
              ))
            ) : (
              <DetailRiwayatEmpty />
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#EDF1F7] px-5 py-3.5">
        <p className="text-xs font-medium text-[#526985]">{volunteer.riwayat.length} riwayat ditampilkan</p>
        <p className="text-xs text-[#94A3B8]">Total {volunteer.totalSesi} sesi pendampingan</p>
      </div>
    </div>
  );
}