"use client";

import { useId } from "react";
import { CheckCircle2 } from "lucide-react";

import Modal from "./Modal";

interface ResetPasswordDialogProps {
  open: boolean;
  nama: string;
  onClose: () => void;
}

export default function ResetPasswordDialog({
  open,
  nama,
  onClose,
}: ResetPasswordDialogProps) {
  const titleId = useId();
  const descriptionId = useId();

  return (
    <Modal
      open={open}
      onClose={onClose}
      titleId={titleId}
      descriptionId={descriptionId}
    >
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-[#3B82F6]">
        <CheckCircle2 size={26} />
      </div>

      <h2 id={titleId} className="text-lg font-bold text-[#0F2D5B]">
        Reset Password Berhasil
      </h2>

      <p
        id={descriptionId}
        className="mt-2 text-sm leading-relaxed text-gray-500"
      >
        Password akun mahasiswa{" "}
        <span className="font-semibold text-[#0F2D5B]">{nama}</span> berhasil
        direset.
      </p>

      <button
        type="button"
        autoFocus
        onClick={onClose}
        className="mt-6 w-full rounded-lg bg-[#3B82F6] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2563EB]"
      >
        Selesai
      </button>
    </Modal>
  );
}