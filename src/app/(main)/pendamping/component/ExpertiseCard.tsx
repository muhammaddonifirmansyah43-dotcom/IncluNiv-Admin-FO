import { ShieldCheck } from "lucide-react";

export default function ExpertiseCard({ keahlian }: { keahlian: string }) {
  return (
    <section className="h-full rounded-2xl border border-[#DCE6F2] bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF3E8] text-[#F97316]">
          <ShieldCheck size={20} aria-hidden="true" />
        </span>

        <div>
          <h2 className="text-base font-bold text-[#17345F]">
            Keahlian & Kompetensi
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-slate-500">
            Informasi kemampuan dan keahlian pendamping.
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-[#E2EAF5] bg-[#F8FAFF] p-4">
        <p className="text-xs font-bold text-[#17345F]">
          Keahlian Pendamping
        </p>
        <p className="mt-2 break-words text-sm leading-relaxed text-slate-600">
          {keahlian || "Belum ada informasi keahlian."}
        </p>
      </div>
    </section>
  );
}
