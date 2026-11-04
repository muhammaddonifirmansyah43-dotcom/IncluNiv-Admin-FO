import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  badge?: ReactNode;
  children: ReactNode;
};

export default function DetailCard({ icon: Icon, title, subtitle, badge, children }: Props) {
  return (
    <section className="rounded-xl border border-[#E2EBF8] bg-white p-5 shadow-[0_4px_14px_rgba(31,71,130,0.07)]">
      <header className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EAF2FF] text-[#3B82F6]">
            <Icon size={20} aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-sm font-bold text-[#17345F]">{title}</h2>
            <p className="text-xs text-slate-500">{subtitle}</p>
          </div>
        </div>
        {badge}
      </header>
      {children}
    </section>
  );
}