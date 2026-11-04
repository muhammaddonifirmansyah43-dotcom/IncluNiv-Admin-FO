import type { Tone } from "@/types/notification";

const styles: Record<Tone, string> = {
  orange: "border-orange-200 bg-orange-50 text-orange-700",
  blue: "border-blue-200 bg-blue-50 text-blue-700",
  red: "border-red-200 bg-red-50 text-red-600",
  green: "border-emerald-200 bg-emerald-50 text-emerald-700",
};

type Props = {
  label: string;
  tone: Tone;
};

export default function NotificationBadge({ label, tone }: Props) {
  return (
    <span
      className={`whitespace-nowrap rounded border px-2 py-0.5 text-[11px] font-semibold ${styles[tone]}`}
    >
      {label}
    </span>
  );
}