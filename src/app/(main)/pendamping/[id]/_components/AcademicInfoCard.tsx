import { IdCard } from "lucide-react";
import type { PendampingDetail } from "@/types/pendamping";
import InfoField from "./InfoField";
import ContactCard from "./ContactCard";

export default function AcademicInfoCard({ data }: { data: PendampingDetail }) {
  return (
    <section className="rounded-2xl border border-[#E2EBF8] bg-white p-5 shadow-[0_4px_14px_rgba(31,71,130,0.07)]">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#3B82F6]">
          <IdCard size={20} aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-base font-bold text-[#17345F]">
            Informasi Profil Akademik
          </h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Data induk resmi terdaftar pada Pangkalan Data INCLUNIV.
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