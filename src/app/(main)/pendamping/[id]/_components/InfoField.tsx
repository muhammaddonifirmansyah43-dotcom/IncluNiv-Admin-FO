import type { ReactNode } from "react";

type Props = {
  label: string;
  children: ReactNode;
  className?: string;
};

export default function InfoField({ label, children, className = "" }: Props) {
  return (
    <div className={`rounded-xl border border-[#E2EBF8] bg-[#F8FAFF] p-4 ${className}`}>
      <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <div className="mt-1.5 break-words text-sm font-bold text-[#17345F]">
        {children}
      </div>
    </div>
  );
}