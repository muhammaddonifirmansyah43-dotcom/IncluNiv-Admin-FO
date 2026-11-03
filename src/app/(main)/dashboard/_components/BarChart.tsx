import type { ChartSeries } from "@/types/dashboard";

const MAX_VALUE = 1200;
const yLabels = ["1.200", "900", "600", "300", "0 jam"];

type Props = ChartSeries & {
  highlightIndex?: number;
};

function growthLabel(values: number[], index: number) {
  if (index === 0) return "Tertinggi";
  const prev = values[index - 1];
  const growth = Math.round(((values[index] - prev) / prev) * 100);
  return `↑ ${growth}%`;
}

export default function BarChart({ labels, values, highlightIndex }: Props) {
  return (
    <div className="mt-5 flex min-h-[205px] flex-1">
      <div className="flex w-14 shrink-0 flex-col justify-between pb-7 pr-2 text-right text-[10px] text-slate-400">
        {yLabels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>

      <div className="relative min-w-0 flex-1">
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between pb-7">
          {yLabels.map((label) => (
            <div key={label} className="border-t border-dashed border-slate-100" />
          ))}
        </div>

        <div
          className="relative z-10 grid h-full items-end gap-2 pb-7 sm:gap-3"
          style={{ gridTemplateColumns: `repeat(${values.length}, minmax(0, 1fr))` }}
        >
          {values.map((value, index) => {
            const active = index === highlightIndex;

            return (
              <div
                key={labels[index]}
                className="flex h-full min-w-0 flex-col items-center justify-end"
              >
                <span className="mb-2 text-[10px] text-slate-500">{value}</span>
                <div className="flex h-[145px] w-full items-end justify-center">
                  <div
                    title={`${labels[index]}: ${value} jam`}
                    className={`relative w-full max-w-8 rounded-t-md transition-all ${
                      active ? "bg-[#3B82F6]" : "bg-[#B9D5F7]"
                    }`}
                    style={{ height: `${Math.max(5, (value / MAX_VALUE) * 100)}%` }}
                  >
                    {active && (
                      <span className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-orange-500 px-2 py-1 text-[10px] font-bold text-white">
                        {growthLabel(values, index)}
                      </span>
                    )}
                  </div>
                </div>
                <span
                  className={`mt-2 text-[10px] ${
                    active ? "font-bold text-[#3B82F6]" : "text-slate-500"
                  }`}
                >
                  {labels[index]}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}