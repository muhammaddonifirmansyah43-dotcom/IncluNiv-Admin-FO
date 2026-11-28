
"use client";

import { useState, type FormEvent } from "react";
import { Mail } from "lucide-react";
import AuthField from "@/components/auth/AuthField";
import { isValidEmail } from "@/lib/auth";

type Props = {
  onSuccess: () => void;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ForgotPasswordForm({ onSuccess }: Props) {
  const [identifier, setIdentifier] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const email = identifier.trim();

    if (!email) {
      setError("Masukkan email terlebih dahulu.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Masukkan alamat email yang valid.");
      return;
    }

    if (!API_URL) {
      setError("Konfigurasi alamat backend belum tersedia.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Gagal memproses permintaan reset kata sandi."
        );
      }

      onSuccess();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan. Silakan coba lagi."
      );
    } finally {
      setLoading(false);
    }
  }

  const invalid = Boolean(error);

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <AuthField
        id="identifier"
        label="Email"
        icon={Mail}
        invalid={invalid}
      >
        <input
          id="identifier"
          name="identifier"
          type="email"
          autoComplete="email"
          placeholder="Masukkan email"
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
        disabled={loading}
        className="flex h-[48px] w-full items-center justify-center rounded-[24px] bg-[#3B82F6] text-[17px] font-bold text-white transition hover:bg-[#2F73E8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Memproses..." : "Lanjutkan"}
      </button>
    </form>
  );
}
