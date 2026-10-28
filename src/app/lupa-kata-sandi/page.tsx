
"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  UserRound,
  Check,
} from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Masukkan username atau email terlebih dahulu.");
      return;
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) &&
      !/^[a-zA-Z0-9._-]+$/.test(email.trim())
    ) {
      setError("Masukkan username atau alamat email yang valid.");
      return;
    }

    // Simulasi pengiriman. Belum mengirim email sungguhan.
    setSubmitted(true);
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#DCEAFF] px-4 py-6">
      <Image
        src="/images/login-bg.jpeg"
        alt="Mahasiswa Incluniv di perpustakaan"
        fill
        
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-white/[0.02]" />

      {!submitted ? (
        <section className="relative z-10 w-full max-w-[510px] rounded-[20px] border border-white/80 bg-white/[0.86] px-6 py-6 shadow-[0_8px_30px_rgba(15,45,91,0.20)] backdrop-blur-[2px] sm:px-8 sm:py-7">
          <Link
            href="/login"
            className="mb-4 inline-flex items-center gap-1 text-[14px] font-medium text-[#3B82F6] hover:underline"
          >
            <ArrowLeft size={14} />
            Kembali ke halaman login
          </Link>

          <div className="mb-1 flex justify-center">
            <Image
              src="/images/incluniv-logo.png"
              alt="Logo Incluniv"
              width={150}
              height={150}
              priority
              className="h-[150px] w-[150px] object-contain"
            />
          </div>

          <div className="mb-5 text-center">
            <h1 className="text-[32px] font-extrabold leading-tight text-[#171717]">
              Lupa kata sandi?
            </h1>
            <p className="mx-auto mt-2 max-w-[260px] text-[14px] leading-relaxed text-[#31435D]">
              Masukkan username atau email yang terdaftar pada akun Anda.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <label
              htmlFor="email"
              className="mb-1.5 block text-[16px] font-bold text-[#17345F]"
            >
              Username
            </label>

            <div
              className={`flex h-[54px] items-center gap-3 rounded-[10px] border bg-white px-3 ${
                error
                  ? "border-red-400 bg-red-50/70"
                  : "border-[#A6C4FF] focus-within:border-[#3B82F6] focus-within:ring-2 focus-within:ring-blue-100"
              }`}
            >
              <UserRound
                size={17}
                className={`shrink-0 ${error ? "text-red-500" : "fill-[#17345F] text-[#17345F]"}`}
              />
              <input
                id="email"
                name="email"
                type="text"
                autoComplete="username"
                placeholder="Masukkan username atau email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError("");
                }}
                aria-invalid={Boolean(error)}
                className="h-full min-w-0 flex-1 bg-transparent text-[12px] text-[#17345F] outline-none placeholder:text-slate-400"
              />
            </div>

            {error && (
              <p role="alert" className="mt-2 text-[11px] text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="mt-3 flex h-[42px] w-full items-center justify-center rounded-[20px] bg-[#3B82F6] text-[16px] font-bold text-white transition hover:bg-[#2F73E8] focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              Lanjutkan
            </button>
          </form>
        </section>
      ) : (
        <section className="relative z-10 w-full max-w-[380px] rounded-[15px] border border-white/80 bg-white/[0.88] px-6 py-7 text-center shadow-[0_8px_30px_rgba(15,45,91,0.20)] backdrop-blur-[2px] sm:px-8">
          <div className="mx-auto mb-3 flex h-[76px] w-[76px] items-center justify-center rounded-full bg-[#20C516] text-white">
            <Check size={48} strokeWidth={3.5} />
          </div>

          <h1 className="text-[24px] font-extrabold text-[#171717]">
            Tautan reset terkirim
          </h1>

          <p className="mx-auto mt-2 max-w-[285px] text-[14px] leading-relaxed text-[#31435D]">
            Jika akun Anda terdaftar, instruksi reset kata sandi akan dikirim
            melalui email. Silakan periksa kotak masuk Anda.
          </p>

          <Link
            href="/login"
            className="mt-6 flex min-h-[42px] w-full items-center justify-center rounded-[10px] bg-[#3B82F6] px-4 text-[16px] font-bold text-white transition hover:bg-[#2F73E8]"
          >
            Kembali ke halaman login
          </Link>
        </section>
      )}
    </main>
  );
}
