import { Check } from "lucide-react";

const styles: Record<string, string> = {
  Selesai: "bg-[#E5F9EF] text-[#15945C]",
  Berlangsung: "bg-[#EAF2FF] text-[#2563C9]",
};

export default function DetailStatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-semibold ${
        styles[status] ?? "bg-[#FFF2DF] text-[#D97706]"
      }`}
    >
      <Check size={11} />
      {status}
    </span>
  );
}