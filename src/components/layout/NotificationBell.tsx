"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Bell, CheckCheck, Clock } from "lucide-react";
import { notificationStore, useNotifications } from "@/lib/notification-store";
import {
  notificationIcons,
  toneDot,
  toneIconBox,
} from "@/lib/notification-ui";

export default function NotificationBell() {
  const items = useNotifications();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const unread = items.filter((item) => !item.read);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={
          unread.length > 0
            ? "Notifikasi, " + unread.length + " belum dibaca"
            : "Notifikasi"
        }
        className="relative flex h-9 w-9 items-center justify-center rounded-full text-white transition hover:bg-white/10"
      >
        <Bell size={20} aria-hidden="true" />
        {unread.length > 0 && (
          <span
            className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-orange-500 ring-2 ring-[#0F2D5B]"
            aria-hidden="true"
          />
        )}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Notifikasi terbaru"
          className="absolute right-0 top-full z-50 mt-3 w-[360px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-[#E2EBF8] bg-white text-[#17345F] shadow-[0_12px_32px_rgba(23,52,95,0.2)]"
        >
          <div className="flex items-center justify-between gap-3 border-b border-[#EEF3FB] px-4 py-3">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold">Notifikasi</h2>
              <span className="rounded-full bg-orange-50 px-2 py-0.5 text-[11px] font-semibold text-orange-600">
                {unread.length} Baru
              </span>
            </div>
            <button
              type="button"
              onClick={notificationStore.markAllRead}
              disabled={unread.length === 0}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#3B82F6] hover:underline disabled:cursor-not-allowed disabled:text-slate-400 disabled:no-underline"
            >
              <CheckCheck size={13} aria-hidden="true" />
              Tandai semua dibaca
            </button>
          </div>

          <ul className="max-h-80 divide-y divide-[#EEF3FB] overflow-y-auto">
            {unread.length === 0 && (
              <li className="px-4 py-8 text-center text-xs text-slate-400">
                Tidak ada notifikasi baru.
              </li>
            )}

            {unread.map((item) => {
              const Icon = notificationIcons[item.icon];
              const preview = item.preview;

              return (
                <li key={item.id}>
                  <Link
                    href="/notifikasi"
                    onClick={() => setOpen(false)}
                    className="flex gap-3 px-4 py-3 transition hover:bg-[#F8FAFD]"
                  >
                    <span
                      className={
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg " +
                        toneIconBox[item.tone]
                      }
                    >
                      <Icon size={18} aria-hidden="true" />
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold">
                        {preview ? preview.title : item.title}
                      </p>
                      <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-slate-500">
                        {preview ? (
                          <>
                            <strong className="font-semibold text-[#17345F]">
                              {preview.name}
                            </strong>
                            {preview.text}
                          </>
                        ) : (
                          item.description
                        )}
                      </p>
                      <p className="mt-1 inline-flex items-center gap-1 text-[10px] text-slate-400">
                        <Clock size={11} aria-hidden="true" />
                        {preview ? preview.time : item.time}
                      </p>
                    </div>

                    <span
                      className={
                        "mt-1 h-2 w-2 shrink-0 rounded-full " + toneDot[item.tone]
                      }
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href="/notifikasi"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-1.5 border-t border-[#EEF3FB] px-4 py-3 text-xs font-semibold text-[#3B82F6] transition hover:bg-blue-50"
          >
            Lihat Semua di Pusat Notifikasi
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      )}
    </div>
  );
}