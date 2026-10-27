
"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserRound, LockKeyhole, Eye, EyeOff, CircleAlert } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!username.trim() || !password) {
      setError("Username dan password wajib diisi.");
      return;
    }

    if (username.trim().toLowerCase() === "admin" && password === "admin123") {
      setLoading(true);
      router.push("/dashboard");
      return;
    }

    setError("Username atau password salah.");
  }

  const invalid = Boolean(error);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#DCEAFF] px-5 py-8">
      <Image
        src="/images/login-bg.jpeg"
        alt="Ilustrasi mahasiswa Incluniv di perpustakaan"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-black/[0.04]" />

      <section className="relative z-10 w-full max-w-[510px] rounded-[20px] border border-white/90 bg-white/[0.87] px-9 py-8 shadow-[0_12px_40px_rgba(15,45,91,0.20)] backdrop-blur-[3px] sm:px-11 sm:py-9">
        <div className="mb-2 flex justify-center">
          <Image
            src="/images/incluniv-logo.png"
            alt="Logo Incluniv"
            width={150}
            height={150}
            priority
            className="h-[150px] w-[150px] object-contain"
          />
        </div>

        <div className="mb-7 text-center">
          <h1 className="text-[32px] font-extrabold leading-tight tracking-tight text-[#171717] sm:text-[35px]">
            Selamat datang
          </h1>
          <p className="mt-2 text-[14px] leading-relaxed text-[#31435D]">
            Masuk untuk mengakses halaman admin IncluNiv
          </p>
        </div>

        <form onSubmit={handleLogin} noValidate className="space-y-5">
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-[16px] font-bold text-[#17345F]"
            >
              Username
            </label>

            <div
              className={`flex h-[54px] items-center gap-3 rounded-[12px] border-2 bg-white px-4 transition ${
                invalid
                  ? "border-red-400 bg-red-50/70"
                  : "border-[#A6C4FF] focus-within:border-[#3B82F6] focus-within:ring-2 focus-within:ring-blue-100"
              }`}
            >
              <UserRound
                size={21}
                strokeWidth={2.5}
                className={`shrink-0 ${
                  invalid ? "text-red-500" : "fill-[#17345F] text-[#17345F]"
                }`}
              />
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                placeholder="Masukkan username atau email"
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                  setError("");
                }}
                aria-invalid={invalid}
                className="h-full min-w-0 flex-1 bg-transparent text-[15px] text-[#17345F] outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-[16px] font-bold text-[#17345F]"
            >
              Password
            </label>

            <div
              className={`flex h-[54px] items-center gap-3 rounded-[12px] border-2 bg-white px-4 transition ${
                invalid
                  ? "border-red-400 bg-red-50/70"
                  : "border-[#A6C4FF] focus-within:border-[#3B82F6] focus-within:ring-2 focus-within:ring-blue-100"
              }`}
            >
              <LockKeyhole
                size={21}
                strokeWidth={2.5}
                className={`shrink-0 ${invalid ? "text-red-500" : "text-[#17345F]"}`}
              />

              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Masukkan password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError("");
                }}
                aria-invalid={invalid}
                className="h-full min-w-0 flex-1 bg-transparent text-[24px] text-[#17345F] outline-none placeholder:text-slate-400"
              />

              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                className={`shrink-0 ${invalid ? "text-red-500" : "text-slate-500"} hover:text-[#17345F]`}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex min-h-[2px] items-center justify-between gap-3">
            <div aria-live="polite" className="min-w-0 flex-1">
              {error && (
                <p className="flex items-start gap-1.5 text-[14px] font-medium leading-relaxed text-red-600">
                  <CircleAlert size={15} className="mt-0.5 shrink-0" />
                  {error}
                </p>
              )}
            </div>

            <Link
              href="/lupa-kata-sandi"
              className="shrink-0 text-[14px] font-semibold text-[#3B82F6] hover:underline"
            >
              Lupa kata sandi?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex h-[54px] w-full items-center justify-center rounded-[24px] bg-[#3B82F6] text-[24px] font-bold text-white shadow-sm transition hover:bg-[#2F73E8] focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:opacity-70"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>
      </section>
    </main>
  );
}
