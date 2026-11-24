
import { Check } from "lucide-react";

const styles: Record<string, string> = {
  COMPLETED: "bg-[#E5F9EF] text-[#15945C]",
  Selesai: "bg-[#E5F9EF] text-[#15945C]",
  ONGOING: "bg-[#EAF2FF] text-[#2563C9]",
  Berlangsung: "bg-[#EAF2FF] text-[#2563C9]",
};

const labels: Record<string, string> = {
  COMPLETED: "Selesai",
  ONGOING: "Berlangsung",
};

export default function DetailStatusBadge({
  status,
}: {
  status: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${
        styles[status] ?? "bg-[#FFF2DF] text-[#D97706]"
      }`}
    >
      <Check size={12} strokeWidth={2} />
      {labels[status] ?? status}
    </span>
  );
}
