import { Clock } from "lucide-react";
import type { Tone } from "@/types/notification";
import { toneText } from "@/lib/notification-ui";

type Props = {
  time: string;
  tone: Tone;
  read: boolean;
};

export default function NotificationMeta({ time, tone, read }: Props) {
  return (
    <p
      className={
        "mt-2 inline-flex items-center gap-1.5 text-xs font-semibold " +
        (read ? "text-slate-500" : toneText[tone])
      }
    >
      <Clock size={13} aria-hidden="true" />
      {time}
    </p>
  );
}