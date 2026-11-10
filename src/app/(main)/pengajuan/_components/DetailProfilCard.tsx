import { UserRound } from "lucide-react";
import type { Pengajuan } from "@/types/pengajuan";
import DetailCard from "./DetailCard";

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[#E2EBF8] bg-[#F8FAFD] p-3">
      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-bold text-[#17345F]">{value}</p>
    </div>
  );
}

export default function DetailProfilCard({ item }: { item: Pengajuan }) {
  const initials = item.nama
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("");

  return (
    <DetailCard
      icon={UserRound}
      title="Profil Pengaju"
      subtitle="Identitas mahasiswa pengaju perizinan"
      badge={
        <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold text-[#3B82F6]">
          Volunteer
        </span>
      }
    >
      <div className="flex items-center gap-4 rounded-lg border border-[#E2EBF8] bg-[#F8FAFD] p-3">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-[#17345F] text-xl font-bold text-white">
          {initials}
        </span>
        <div className="min-w-0">
          <p className="truncate text-base font-bold text-[#17345F]">{item.nama}</p>
          <p className="text-xs font-semibold text-[#3B82F6]">{item.jabatan}</p>
          <p className="mt-0.5 text-[11px] text-slate-400">{item.terdaftar}</p>
        </div>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <Field label="NIM / ID Volunteer" value={item.nim} />
        <Field label="Program Studi" value={item.prodi} />
        <Field label="Fakultas" value={item.fakultas} />
      </div>
    </DetailCard>
  );
}