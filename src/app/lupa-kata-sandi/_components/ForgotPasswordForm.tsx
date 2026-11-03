"use client";

import { useState, type FormEvent } from "react";
import { UserRound } from "lucide-react";
import AuthField from "@/components/auth/AuthField";
import { isValidIdentifier } from "@/lib/auth";

type Props = {
  onSuccess: () => void;
};

export default function ForgotPasswordForm({ onSuccess }: Props) {
  const [identifier, setIdentifier] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!identifier.trim()) {
      setError("Masukkan username atau email terlebih dahulu.");
      return;
    }

    if (!isValidIdentifier(identifier)) {
      setError("Masukkan username atau alamat email yang valid.");
      return;
    }

    // Simulasi pengiriman. Belum mengirim email sungguhan.
    setError("");
    onSuccess();
  }

  const invalid = Boolean(error);

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <AuthField
        id="identifier"
        label="Username atau email"
        icon={UserRound}
        invalid={invalid}
      >
        <input
          id="identifier"
          name="identifier"
          type="text"
          autoComplete="username"
          placeholder="Masukkan username atau email"
          value={identifier}
          onChange={(event) => {
            setIdentifier(event.target.value);
            setError("");
          }}
          aria-invalid={invalid}
          aria-describedby={invalid ? "identifier-error" : undefined}
          className="h-full min-w-0 flex-1 bg-transparent text-[15px] text-[#17345F] outline-none placeholder:text-slate-400"
        />
      </AuthField>

      {error && (
        <p
          id="identifier-error"
          role="alert"
          className="text-[14px] font-medium text-red-600"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        className="flex h-[48px] w-full items-center justify-center rounded-[24px] bg-[#3B82F6] text-[18px] font-bold text-white transition hover:bg-[#2F73E8] focus:outline-none focus:ring-2 focus:ring-blue-200"
      >
        Lanjutkan
      </button>
    </form>
  );
}