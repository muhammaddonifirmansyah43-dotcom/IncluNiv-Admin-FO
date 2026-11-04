import { ShieldCheck } from "lucide-react";

export default function ExpertiseCard({ keahlian }: { keahlian: string }) {
  return (
    <section className="rounded-2xl border border-[#E2EBF8] bg-white p-5 shadow-[0_4px_14px_rgba(31,71,130,0.07)]">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
          <ShieldCheck size={20} aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-base font-bold text-[#17345F]">
            Keahlian & Kompetensi
          </h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Sertifikasi dan kapabilitas terverifikasi koordinator PLD.
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-[#E2EBF8] bg-[#F8FAFF] p-4">
        <p className="text-xs font-bold text-[#17345F]">
          Spesifikasi Keahlian Relawan
        </p>
        <p className="mt-2 text-xs leading-relaxed text-slate-600">{keahlian}</p>
      </div>
    </section>
  );
}