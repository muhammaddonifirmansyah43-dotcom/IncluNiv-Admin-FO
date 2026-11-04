export type Tone = "orange" | "blue" | "red" | "green";

export type NotificationIconKey =
  | "volunteer"
  | "calendar"
  | "accessibility"
  | "check"
  | "database";

export type ActionIconKey = "arrowRight" | "calendar" | "route" | "eye" | "file";

export type ActionVariant = "primary" | "soft" | "outline";

export type NotificationItem = {
  id: string;
  title: string;
  description: string;
  icon: NotificationIconKey;
  tone: Tone;
  badge: { label: string; tone: Tone };
  time: string;
  category: string;
  extra: string;
  read: boolean;
  action: {
    label: string;
    href: string;
    variant: ActionVariant;
    icon: ActionIconKey;
  };
};

export type NotificationFilter = "all" | "unread";