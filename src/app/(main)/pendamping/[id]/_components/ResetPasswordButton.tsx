"use client";

import { useState } from "react";
import { KeyRound } from "lucide-react";
import ResetPasswordDialog from "./ResetPasswordDialog";

type Props = {
  nama: string;
  nim: string;
  email: string;
};

export default function ResetPasswordButton({ nama, nim, email }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label={`Reset password ${nama}`}
        className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#D9E6F8] bg-white px-4 text-xs font-semibold text-[#17345F] shadow-sm transition hover:bg-blue-50"
      >
        <KeyRound size={15} aria-hidden="true" />
        Reset Password
      </button>

      {open && (
        <ResetPasswordDialog
          nama={nama}
          nim={nim}
          email={email}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}