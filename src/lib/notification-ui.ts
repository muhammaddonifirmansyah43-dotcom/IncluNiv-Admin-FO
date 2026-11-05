import {
  Accessibility,
  CalendarCheck,
  CircleCheck,
  Database,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import type { NotificationIconKey, Tone } from "@/types/notification";

export const notificationIcons: Record<NotificationIconKey, LucideIcon> = {
  volunteer: UserRound,
  calendar: CalendarCheck,
  accessibility: Accessibility,
  check: CircleCheck,
  database: Database,
};

export const toneIconBox: Record<Tone, string> = {
  orange: "bg-orange-50 text-orange-500",
  blue: "bg-blue-50 text-[#3B82F6]",
  red: "bg-red-50 text-red-500",
  green: "bg-emerald-50 text-emerald-600",
};

export const toneDot: Record<Tone, string> = {
  orange: "bg-orange-500",
  blue: "bg-[#3B82F6]",
  red: "bg-red-500",
  green: "bg-emerald-500",
};

export const toneText: Record<Tone, string> = {
  orange: "text-orange-500",
  blue: "text-[#3B82F6]",
  red: "text-red-500",
  green: "text-emerald-600",
};

export const toneAccentBorder: Record<Tone, string> = {
  orange: "border-l-4 border-l-orange-500",
  blue: "border-l-4 border-l-[#3B82F6]",
  red: "border-l-4 border-l-red-500",
  green: "border-l-4 border-l-emerald-500",
};