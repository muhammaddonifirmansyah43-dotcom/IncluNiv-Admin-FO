import { IdCard } from "lucide-react";
import type { PendampingDetail } from "@/types/pendamping";
import InfoField from "./InfoField";
import ContactCard from "./ContactCard";

export default function AcademicInfoCard({ data }: { data: PendampingDetail }) {
  return (
    <section className="h-full rounded-2xl border border-[#DCE6F2] bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E6F0FF] text-[#3B82F6]">
          <IdCard size={20} aria-hidden="true" />
        </span>

        <div>
          <h2 className="text-base font-bold text-[#17345F]">
            Informasi Akademik
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-slate-500">
            Informasi identitas dan akademik pendamping.
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <InfoField label="Nama Lengkap">{data.nama}</InfoField>
          <InfoField label="Nomor Induk Mahasiswa">{data.nim}</InfoField>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <InfoField label="Program Studi">{data.prodi}</InfoField>
          <InfoField label="Fakultas">{data.fakultas}</InfoField>
        </div>

        <ContactCard email={data.email} whatsapp={data.whatsapp} />
      </div>
    </section>
  );
}
