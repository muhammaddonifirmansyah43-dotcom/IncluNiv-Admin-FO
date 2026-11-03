import type { Period } from "@/types/dashboard";
import { periods } from "@/lib/dashboard-data";

type Props = {
  value: Period;
  onChange: (period: Period) => void;
};

export default function PeriodTabs({ value, onChange }: Props) {
  return (
    <div className="flex rounded-lg bg-slate-100 p-1">
      {periods.map((item) => (
        <button
          key={item}
          type="button"
          aria-pressed={value === item}
          onClick={() => onChange(item)}
          className={`rounded-md px-3 py-2 text-xs transition ${
            value === item
              ? "bg-white font-bold text-[#17345F] shadow-sm"
              : "text-slate-500 hover:text-[#17345F]"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}