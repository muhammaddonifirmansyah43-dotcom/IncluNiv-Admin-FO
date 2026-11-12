"use client";

import { useId } from "react";
import { Trash2 } from "lucide-react";

import Modal from "./Modal";

interface DeleteConfirmDialogProps {
  open: boolean;
  nama: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmDialog({
  open,
  nama,
  onCancel,
  onConfirm,
}: DeleteConfirmDialogProps) {
  const titleId = useId();
  const descriptionId = useId();

  return (
    <Modal
      open={open}
      onClose={onCancel}
      titleId={titleId}
      descriptionId={descriptionId}
    >
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#FEF2F2] text-[#EF4444]">
        <Trash2 size={26} />
      </div>

      <h2 id={titleId} className="text-lg font-bold text-[#0F2D5B]">
        Hapus Data Mahasiswa?
      </h2>

      <p
        id={descriptionId}
        className="mt-2 text-sm leading-relaxed text-gray-500"
      >
        Apakah Anda yakin ingin menghapus data{" "}
        <span className="font-semibold text-[#0F2D5B]">{nama}</span>? Data yang
        telah dihapus tidak dapat dikembalikan.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <button
          type="button"
          autoFocus
          onClick={onCancel}
          className="rounded-lg border border-[#DCE6F2] bg-white px-4 py-2.5 text-sm font-semibold text-[#0F2D5B] transition hover:bg-[#F4F7FC]"
        >
          Batal
        </button>

        <button
          type="button"
          onClick={onConfirm}
          className="rounded-lg bg-[#F97316] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#EA580C]"
        >
          Ya, Hapus
        </button>
      </div>
    </Modal>
  );
}