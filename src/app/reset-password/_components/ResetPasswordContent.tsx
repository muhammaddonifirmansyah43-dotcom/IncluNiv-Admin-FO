
"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  LockKeyhole,
  Eye,
  EyeOff,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import AuthCard from "@/components/auth/AuthCard";
import AuthField from "@/components/auth/AuthField";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!token) {
      setError("Token reset tidak ditemukan. Silakan minta tautan reset baru.");
      return;
    }

    if (!newPassword || !confirmPassword) {
      setError("Semua kolom kata sandi wajib diisi.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Kata sandi minimal 8 karakter.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Konfirmasi kata sandi tidak cocok.");
      return;
    }

    if (!API_URL) {
      setError("Konfigurasi alamat backend belum tersedia.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          newPassword,
          confirmPassword,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Gagal memperbarui kata sandi.");
      }

      setSuccess(true);
      setNewPassword("");
      setConfirmPassword("");
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

  return (
    <AuthCard className="max-w-[510px]">
      {success ? (
        <div className="text-center" role="status">
          <div className="mx-auto mb-5 flex h-[76px] w-[76px] items-center justify-center rounded-full bg-blue-100 text-[#3B82F6]">
            <CheckCircle2 size={42} strokeWidth={2.2} />
          </div>

          <h1 className="text-[28px] font-extrabold leading-tight tracking-tight text-[#171717]">
            Kata Sandi Berhasil Diperbarui
          </h1>

          <p className="mx-auto mt-3 max-w-[360px] text-[14px] leading-relaxed text-[#31435D]">
            Kata sandi akun IncluNiv kamu sudah berhasil diubah.
            Silakan masuk menggunakan kata sandi yang baru.
          </p>

          <Link
            href="/login"
            className="mt-7 flex h-[48px] w-full items-center justify-center rounded-[24px] bg-[#3B82F6] px-4 text-[17px] font-bold text-white transition hover:bg-[#2F73E8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 focus-visible:ring-offset-2"
          >
            Kembali ke halaman login
          </Link>
        </div>
      ) : (
        <>
          <Link
            href="/login"
            className="mb-8 inline-flex items-center gap-1 rounded-sm text-[14px] font-medium text-[#3B82F6] transition hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2"
          >
            <ArrowLeft size={16} strokeWidth={2} />
            Kembali ke halaman login
          </Link>

          <div className="mb-7 text-center">
            <h1 className="text-[32px] font-extrabold leading-tight tracking-tight text-[#171717]">
              Buat Kata Sandi Baru
            </h1>

            <p className="mx-auto mt-2 max-w-[360px] text-[14px] leading-relaxed text-[#31435D]">
              Masukkan kata sandi baru untuk akun IncluNiv kamu.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <AuthField
              id="newPassword"
              label="Kata Sandi Baru"
              icon={LockKeyhole}
              invalid={Boolean(error)}
              trailing={
                <button
                  type="button"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  aria-label={
                    showNewPassword
                      ? "Sembunyikan kata sandi"
                      : "Tampilkan kata sandi"
                  }
                  className="shrink-0 text-slate-500 transition hover:text-[#17345F]"
                >
                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              }
            >
              <input
                id="newPassword"
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Masukkan kata sandi baru"
                value={newPassword}
                onChange={(event) => {
                  setNewPassword(event.target.value);
                  setError("");
                }}
                aria-invalid={Boolean(error)}
                className="h-full min-w-0 flex-1 bg-transparent text-[15px] text-[#17345F] outline-none placeholder:text-slate-400"
              />
            </AuthField>

            <AuthField
              id="confirmPassword"
              label="Konfirmasi Kata Sandi"
              icon={LockKeyhole}
              invalid={Boolean(error)}
              trailing={
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  aria-label={
                    showConfirmPassword
                      ? "Sembunyikan konfirmasi kata sandi"
                      : "Tampilkan konfirmasi kata sandi"
                  }
                  className="shrink-0 text-slate-500 transition hover:text-[#17345F]"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              }
            >
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Ulangi kata sandi baru"
                value={confirmPassword}
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                  setError("");
                }}
                aria-invalid={Boolean(error)}
                className="h-full min-w-0 flex-1 bg-transparent text-[15px] text-[#17345F] outline-none placeholder:text-slate-400"
              />
            </AuthField>

            <p className="text-[12px] text-slate-500">
              Kata sandi harus memiliki minimal 8 karakter.
            </p>

            {error && (
              <p role="alert" className="text-[14px] font-medium text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex h-[48px] w-full items-center justify-center rounded-[24px] bg-[#3B82F6] text-[17px] font-bold text-white transition hover:bg-[#2F73E8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Menyimpan..." : "Simpan Kata Sandi Baru"}
            </button>
          </form>
        </>
      )}
    </AuthCard>
  );
}
