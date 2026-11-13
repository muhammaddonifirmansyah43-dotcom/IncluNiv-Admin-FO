import type { ReactNode } from "react";

type Props = {
  label: string;
  children: ReactNode;
  className?: string;
};

export default function InfoField({
  label,
  children,
  className = "",
}: Props) {
  return (
    <div
      className={`min-w-0 rounded-xl border border-[#E2EAF5] bg-[#F8FAFF] p-4 ${className}`}
    >
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <div className="mt-2 break-words text-sm font-semibold leading-relaxed text-[#17345F]">
        {children}
      </div>
    </div>
  );
}
