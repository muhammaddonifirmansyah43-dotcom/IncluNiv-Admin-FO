import type { ReactNode } from "react";

type StatCardProps = {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
};

export default function StatCard({
  title,
  value,
  description,
  icon,
}: StatCardProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm text-slate-500">{title}</p>

        {icon && (
          <div className="rounded-lg bg-[#E6F0FF] p-2 text-[#0F2D5B]">
            {icon}
          </div>
        )}
      </div>

      <p className="mt-3 text-2xl font-bold text-[#0F2D5B]">
        {value}
      </p>

      {description && (
        <p className="mt-2 text-xs text-slate-500">
          {description}
        </p>
      )}
    </section>
  );
}