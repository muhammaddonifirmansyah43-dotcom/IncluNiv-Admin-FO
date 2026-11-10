"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { LogOut } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function LogoutModal({ open, onClose, onConfirm }: Props) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    cancelRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#17345F]/40 p-4 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-title"
        aria-describedby="logout-desc"
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-md rounded-2xl bg-white px-6 py-8 text-center shadow-[0_20px_50px_rgba(23,52,95,0.25)] sm:px-8"
      >
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-50">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-orange-200 bg-white text-orange-500">
            <LogOut size={22} aria-hidden="true" />
          </span>
        </span>

        <h2 id="logout-title" className="mt-5 text-lg font-extrabold text-[#17345F]">
          Yakin ingin keluar ?
        </h2>
        <p id="logout-desc" className="mt-2 text-sm leading-relaxed text-slate-500">
          Anda akan mengakhiri sesi dari dashboard IncluNiv Admin. Login kembali
          diperlukan untuk mengakses halaman monitoring dan pengelolaan layanan.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            ref={cancelRef}
            type="button"
            onClick={onClose}
            className="h-11 rounded-xl border border-[#E2EBF8] bg-white text-sm font-semibold text-[#17345F] transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
          >
            Kembali
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="h-11 rounded-xl bg-orange-500 text-sm font-semibold text-white transition hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
          >
            Ya, Keluar
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}