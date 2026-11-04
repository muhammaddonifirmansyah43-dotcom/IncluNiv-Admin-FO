import { GraduationCap, Hash, Building2 } from "lucide-react";
import type { PendampingDetail } from "@/types/pendamping";
import ResetPasswordButton from "./ResetPasswordButton";

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

const chip =
  "inline-flex items-center gap-1.5 rounded-md bg-[#F1F5FB] px-2.5 py-1 text-[11px] font-medium text-slate-600";

export default function ProfileCard({ data }: { data: PendampingDetail }) {
  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-[#E2EBF8] bg-white p-5 shadow-[0_4px_14px_rgba(31,71,130,0.07)] sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-4">
        <div
          aria-hidden="true"
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#DCEAFF] text-xl font-extrabold text-[#3B82F6]"
        >
          {initials(data.nama)}
        </div>

        <div className="min-w-0">
          <h1 className="break-words text-xl font-extrabold text-[#17345F] sm:text-2xl">
            {data.nama}
          </h1>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className={`${chip} font-bold text-[#17345F]`}>
              <Hash size={12} aria-hidden="true" />
              {data.nim}
            </span>
            <span className={chip}>
              <GraduationCap size={12} aria-hidden="true" />
              {data.prodi}
            </span>
            <span className={chip}>
              <Building2 size={12} aria-hidden="true" />
              {data.fakultas}
            </span>
          </div>
        </div>
      </div>

      <ResetPasswordButton nama={data.nama} nim={data.nim} email={data.email} />
    </section>
  );
}