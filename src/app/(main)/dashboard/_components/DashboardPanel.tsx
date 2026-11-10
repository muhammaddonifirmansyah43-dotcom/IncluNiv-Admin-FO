import type { ReactNode } from "react";
<<<<<<< HEAD
import Link from "next/link";
=======
>>>>>>> main
import { ArrowRight } from "lucide-react";

export function DashboardPanel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <article
      className={`flex min-w-0 flex-col rounded-xl border border-[#D7E5F8] bg-white shadow-[0_4px_14px_rgba(31,71,130,0.07)] ${className}`}
    >
      {children}
    </article>
  );
}

export function PanelHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-sm font-bold uppercase tracking-wide text-slate-600">
      {children}
    </h2>
  );
}

type FooterProps = {
  actionLabel: string;
<<<<<<< HEAD
  href: string;
  note?: string;
};

export function PanelFooter({ actionLabel, href, note }: FooterProps) {
  return (
    <div className="mt-auto pt-4">
      <div className="flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
        <Link
          href={href}
          className="inline-flex items-center gap-1 text-xs font-bold transition hover:text-[#3B82F6] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
        >
          {actionLabel}
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
=======
  note?: string;
};

export function PanelFooter({ actionLabel, note }: FooterProps) {
  return (
    <div className="mt-auto pt-4">
      <div className="flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
        <button
          type="button"
          className="inline-flex items-center gap-1 text-xs font-bold hover:text-[#3B82F6]"
        >
          {actionLabel}
          <ArrowRight size={14} aria-hidden="true" />
        </button>
>>>>>>> main
        {note && <span className="text-xs text-slate-400">{note}</span>}
      </div>
    </div>
  );
}