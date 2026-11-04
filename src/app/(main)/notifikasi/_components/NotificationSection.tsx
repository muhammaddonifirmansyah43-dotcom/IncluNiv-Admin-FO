import type { NotificationItem } from "@/types/notification";
import NotificationCard from "./NotificationCard";

type Props = {
  id: string;
  title: string;
  countLabel: string;
  dotClass: string;
  items: NotificationItem[];
  onToggleRead: (id: string) => void;
};

export default function NotificationSection({
  id,
  title,
  countLabel,
  dotClass,
  items,
  onToggleRead,
}: Props) {
  return (
    <section aria-labelledby={id}>
      <h2
        id={id}
        className="mb-3 flex items-center gap-2 text-base font-bold text-[#17345F]"
      >
        <span className={`h-2.5 w-2.5 rounded-full ${dotClass}`} aria-hidden="true" />
        {title}
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-500">
          {countLabel}
        </span>
      </h2>

      <ul className="space-y-3">
        {items.map((item) => (
          <NotificationCard key={item.id} item={item} onToggleRead={onToggleRead} />
        ))}
      </ul>
    </section>
  );
}