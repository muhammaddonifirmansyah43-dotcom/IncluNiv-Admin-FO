import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

type Props = {
  id: string;
  label: string;
  icon: LucideIcon;
  invalid: boolean;
  trailing?: ReactNode;
  children: ReactNode;
};

export default function AuthField({
  id,
  label,
  icon: Icon,
  invalid,
  trailing,
  children,
}: Props) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[16px] font-bold text-[#17345F]"
      >
        {label}
      </label>

      <div
        className={`flex h-[54px] items-center gap-3 rounded-[12px] border-2 bg-white px-4 transition ${
          invalid
            ? "border-red-400 bg-red-50/70"
            : "border-[#A6C4FF] focus-within:border-[#3B82F6] focus-within:ring-2 focus-within:ring-blue-100"
        }`}
      >
        <Icon
          size={21}
          strokeWidth={2.5}
          className={`shrink-0 ${invalid ? "text-red-500" : "text-[#17345F]"}`}
        />
        {children}
        {trailing}
      </div>
    </div>
  );
}