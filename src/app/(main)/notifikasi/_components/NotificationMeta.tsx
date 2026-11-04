import { Clock, Tag } from "lucide-react";
import type { Tone } from "@/types/notification";

const timeColor: Record<Tone, string> = {
  orange: "text-orange-500",
  blue: "text-[#3B82F6]",
  red: "text-red-500",
  green: "text-emerald-600",
};

type Props = {
  time: string;
  category: string;
  extra: string;
  tone: Tone;
  read: boolean;
};

export default function NotificationMeta({
  time,
  category,
  extra,
  tone,
  read,
}: Props) {
  return (
    <ul className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500">
      <li
        className={`inline-flex items-center gap-1.5 font-semibold ${
          read ? "text-slate-500" : timeColor[tone]
        }`}
      >
        <Clock size={13} aria-hidden="true" />
        {time}
      </li>
      <li className="inline-flex items-center gap-1.5">
        <Tag size={13} aria-hidden="true" />
        <span>
          Kategori: <span className="font-semibold text-slate-600">{category}</span>
        </span>
      </li>
      <li className="font-medium text-slate-500">{extra}</li>
    </ul>
  );
}