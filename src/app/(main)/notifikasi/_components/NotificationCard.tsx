import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Eye,
  FileText,
  Mail,
  Route,
  type LucideIcon,
} from "lucide-react";
import type {
  ActionIconKey,
  ActionVariant,
  NotificationItem,
} from "@/types/notification";
import {
  notificationIcons,
  toneAccentBorder,
  toneDot,
  toneIconBox,
} from "@/lib/notification-ui";
import NotificationBadge from "./NotificationBadge";
import NotificationMeta from "./NotificationMeta";

const actionIcons: Record<ActionIconKey, LucideIcon> = {
  arrowRight: ArrowRight,
  calendar: CalendarDays,
  route: Route,
  eye: Eye,
  file: FileText,
};

const buttonVariant: Record<ActionVariant, string> = {
  primary: "bg-[#3B82F6] text-white hover:bg-[#2F73E8]",
  soft: "bg-[#EAF2FF] text-[#17345F] hover:bg-[#DCEAFF]",
  outline: "border border-[#D9E6F8] bg-white text-[#17345F] hover:bg-slate-50",
};

const cardBase =
  "flex flex-col gap-4 rounded-xl border border-[#E2EBF8] bg-white p-4 shadow-[0_4px_14px_rgba(31,71,130,0.07)] md:flex-row md:items-center";

const buttonBase =
  "inline-flex h-9 items-center gap-2 whitespace-nowrap rounded-lg px-4 text-xs font-semibold transition";

type Props = {
  item: NotificationItem;
  onToggleRead: (id: string) => void;
};

export default function NotificationCard({ item, onToggleRead }: Props) {
  const Icon = notificationIcons[item.icon];
  const ActionIcon = actionIcons[item.action.icon];
  const unread = !item.read;

  return (
    <li className={cardBase + (unread ? " " + toneAccentBorder[item.tone] : "")}>
      <div className="flex min-w-0 flex-1 gap-3">
        <span
          className={
            "flex h-11 w-11 shrink-0 items-center justify-center " +
            (unread
              ? "rounded-xl " + toneIconBox[item.tone]
              : "rounded-full border border-slate-200 bg-white text-slate-500")
          }
        >
          <Icon size={22} aria-hidden="true" />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-[15px] font-bold leading-snug text-[#17345F]">
              {item.title}
            </h3>
            {unread ? (
              <span
                className={"h-2 w-2 rounded-full " + toneDot[item.tone]}
                role="img"
                aria-label="Belum dibaca"
              />
            ) : (
              <NotificationBadge label={item.badge.label} tone={item.badge.tone} />
            )}
          </div>

          <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
            {item.description}
          </p>

          <NotificationMeta time={item.time} tone={item.tone} read={item.read} />
        </div>
      </div>

      <div className="flex shrink-0 items-center justify-between gap-3 md:justify-end">
        <Link
          href={item.action.href}
          className={buttonBase + " " + buttonVariant[item.action.variant]}
        >
          {item.action.label}
          <ActionIcon size={14} aria-hidden="true" />
        </Link>

        {unread && (
          <button
            type="button"
            onClick={() => onToggleRead(item.id)}
            aria-label="Tandai sudah dibaca"
            title="Tandai sudah dibaca"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-blue-50 hover:text-[#3B82F6]"
          >
            <Mail size={18} aria-hidden="true" />
          </button>
        )}
      </div>
    </li>
  );
}