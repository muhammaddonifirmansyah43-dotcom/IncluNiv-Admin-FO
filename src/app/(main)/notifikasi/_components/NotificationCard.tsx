import Link from "next/link";
import {
  ArrowRight,
  Accessibility,
  CalendarCheck,
  CalendarDays,
  CircleCheck,
  Database,
  Eye,
  FileText,
  Mail,
  MailOpen,
  Route,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import type {
  ActionIconKey,
  ActionVariant,
  NotificationIconKey,
  NotificationItem,
  Tone,
} from "@/types/notification";
import NotificationBadge from "./NotificationBadge";
import NotificationMeta from "./NotificationMeta";

const icons: Record<NotificationIconKey, LucideIcon> = {
  volunteer: UserRound,
  calendar: CalendarCheck,
  accessibility: Accessibility,
  check: CircleCheck,
  database: Database,
};

const actionIcons: Record<ActionIconKey, LucideIcon> = {
  arrowRight: ArrowRight,
  calendar: CalendarDays,
  route: Route,
  eye: Eye,
  file: FileText,
};

const accentBorder: Record<Tone, string> = {
  orange: "border-l-4 border-l-orange-500",
  blue: "border-l-4 border-l-[#3B82F6]",
  red: "border-l-4 border-l-red-500",
  green: "border-l-4 border-l-emerald-500",
};

const iconBox: Record<Tone, string> = {
  orange: "bg-orange-50 text-orange-500",
  blue: "bg-blue-50 text-[#3B82F6]",
  red: "bg-red-50 text-red-500",
  green: "bg-emerald-50 text-emerald-600",
};

const dotColor: Record<Tone, string> = {
  orange: "bg-orange-500",
  blue: "bg-[#3B82F6]",
  red: "bg-red-500",
  green: "bg-emerald-500",
};

const buttonVariant: Record<ActionVariant, string> = {
  primary: "bg-[#3B82F6] text-white hover:bg-[#2F73E8]",
  soft: "bg-[#EAF2FF] text-[#17345F] hover:bg-[#DCEAFF]",
  outline: "border border-[#D9E6F8] bg-white text-[#17345F] hover:bg-slate-50",
};

type Props = {
  item: NotificationItem;
  onToggleRead: (id: string) => void;
};

export default function NotificationCard({ item, onToggleRead }: Props) {
  const Icon = icons[item.icon];
  const ActionIcon = actionIcons[item.action.icon];
  const unread = !item.read;

  return (
    <li
      className={`flex flex-col gap-4 rounded-xl border border-[#E2EBF8] bg-white p-4 shadow-[0_4px_14px_rgba(31,71,130,0.07)] md:flex-row md:items-center ${
        unread ? accentBorder[item.tone] : ""
      }`}
    >
      <div className="flex min-w-0 flex-1 gap-3">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
            unread ? iconBox[item.tone] : "bg-slate-100 text-slate-500"
          }`}
        >
          <Icon size={22} aria-hidden="true" />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-[15px] font-bold leading-snug text-[#17345F]">
              {item.title}
            </h3>
            <NotificationBadge label={item.badge.label} tone={item.badge.tone} />
            {unread && (
              <span
                className={`h-2 w-2 rounded-full ${dotColor[item.tone]}`}
                role="img"
                aria-label="Belum dibaca"
              />
            )}
          </div>

          <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
            {item.description}
          </p>

          <NotificationMeta
            time={item.time}
            category={item.category}
            extra={item.extra}
            tone={item.tone}
            read={item.read}
          />
        </div>
      </div>

      <div className="flex shrink-0 items-center justify-between gap-3 md:justify-end">
        <Link
          href={item.action.href}
          className={`inline-flex h-9 items-center gap-2 whitespace-nowrap rounded-lg px-4 text-xs font-semibold transition ${
            buttonVariant[item.action.variant]
          }`}
        >
          {item.action.label}
          <ActionIcon size={14} aria-hidden="true" />
        </Link>

        <button
          type="button"
          onClick={() => onToggleRead(item.id)}
          aria-label={unread ? "Tandai sudah dibaca" : "Tandai belum dibaca"}
          title={unread ? "Tandai sudah dibaca" : "Tandai belum dibaca"}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-blue-50 hover:text-[#3B82F6]"
        >
          {unread ? <Mail size={18} /> : <MailOpen size={18} />}
        </button>
      </div>
    </li>
  );
}