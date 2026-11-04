"use client";

import { useEffect, useRef } from "react";
import { TriangleAlert } from "lucide-react";

type Props = {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Hapus",
  cancelLabel = "Batal",
  onConfirm,
  onCancel,
}: Props) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    // Fokus awal ke tombol Batal (aman jika tidak sengaja menekan Enter)
    cancelRef.current?.focus();

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") onCancel();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onCancel}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-desc"
        onClick={(event) => event.stopPropagation()}
        className="max-h-[90dvh] w-full max-w-sm overflow-y-auto rounded-2xl bg-white p-6 text-center shadow-xl"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
          <TriangleAlert size={28} aria-hidden="true" />
        </div>

        <h2 id="confirm-title" className="text-lg font-bold text-[#17345F]">
          {title}
        </h2>
        <p id="confirm-desc" className="mt-2 break-words text-sm leading-relaxed text-slate-500">
          {description}
        </p>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
          <button
            ref={cancelRef}
            type="button"
            onClick={onCancel}
            className="h-11 flex-1 rounded-xl border border-[#D9E6F8] bg-white text-sm font-semibold text-[#17345F] transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="h-11 flex-1 rounded-xl bg-red-500 text-sm font-semibold text-white transition hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-200"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}