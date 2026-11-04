"use client";

import { useEffect, useRef, useState } from "react";
import {
  Check,
  Copy,
  Eye,
  EyeOff,
  KeyRound,
  Mail,
  MailCheck,
  ShieldAlert,
  TriangleAlert,
} from "lucide-react";
import { generateTempPassword } from "@/lib/password";

type Method = "email" | "temporary";
type Step = "confirm" | "done";

type Props = {
  nama: string;
  nim: string;
  email: string;
  onClose: () => void;
};

const methods: { key: Method; title: string; desc: string; icon: typeof Mail }[] = [
  {
    key: "email",
    title: "Kirim tautan reset ke email",
    desc: "Pengguna membuat kata sandi baru sendiri lewat email. Disarankan.",
    icon: Mail,
  },
  {
    key: "temporary",
    title: "Buat kata sandi sementara",
    desc: "Sistem membuat kata sandi acak yang dapat Anda berikan langsung.",
    icon: KeyRound,
  },
];

export default function ResetPasswordDialog({ nama, nim, email, onClose }: Props) {
  const [method, setMethod] = useState<Method>("email");
  const [step, setStep] = useState<Step>("confirm");
  const [tempPassword, setTempPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);
  const firstFocus = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    firstFocus.current?.focus();

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  function handleReset() {
    // Simulasi. Nanti ganti dengan pemanggilan API.
    if (method === "temporary") setTempPassword(generateTempPassword());
    setStep("done");
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(tempPassword);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard tidak tersedia, pengguna bisa menyalin manual
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="reset-title"
        onClick={(event) => event.stopPropagation()}
        className="max-h-[90dvh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
      >
        {step === "confirm" ? (
          <>
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                <KeyRound size={22} aria-hidden="true" />
              </span>
              <div>
                <h2 id="reset-title" className="text-lg font-bold text-[#17345F]">
                  Reset Password
                </h2>
                <p className="mt-0.5 text-sm text-slate-500">
                  Kata sandi lama akan langsung tidak berlaku.
                </p>
              </div>
            </div>

            {/* Akun yang akan direset */}
            <div className="mt-5 rounded-xl border border-[#E2EBF8] bg-[#F8FAFF] p-4">
              <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
                Akun yang direset
              </p>
              <p className="mt-1.5 break-words text-sm font-bold text-[#17345F]">
                {nama}
              </p>
              <p className="mt-0.5 break-all text-xs text-slate-500">
                {nim} · {email}
              </p>
            </div>

            {/* Pilihan metode */}
            <fieldset className="mt-5">
              <legend className="mb-2 text-sm font-bold text-[#17345F]">
                Metode reset
              </legend>
              <div className="space-y-2">
                {methods.map(({ key, title, desc, icon: Icon }) => {
                  const active = method === key;
                  return (
                    <label
                      key={key}
                      className={`flex cursor-pointer items-start gap-3 rounded-xl border-2 p-3 transition ${
                        active
                          ? "border-[#3B82F6] bg-blue-50/60"
                          : "border-[#E2EBF8] bg-white hover:bg-slate-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="reset-method"
                        value={key}
                        checked={active}
                        onChange={() => setMethod(key)}
                        className="mt-1 h-4 w-4 accent-[#3B82F6]"
                      />
                      <span className="min-w-0">
                        <span className="flex items-center gap-2 text-sm font-semibold text-[#17345F]">
                          <Icon size={15} aria-hidden="true" />
                          {title}
                        </span>
                        <span className="mt-0.5 block text-xs leading-relaxed text-slate-500">
                          {desc}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <p className="mt-4 flex items-start gap-2 rounded-lg bg-orange-50 px-3 py-2 text-xs leading-relaxed text-orange-700">
              <TriangleAlert size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
              Pengguna akan keluar dari semua perangkat dan harus login ulang.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
              <button
                ref={firstFocus}
                type="button"
                onClick={onClose}
                className="h-11 flex-1 rounded-xl border border-[#D9E6F8] bg-white text-sm font-semibold text-[#17345F] transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="h-11 flex-1 rounded-xl bg-[#3B82F6] text-sm font-semibold text-white transition hover:bg-[#2F73E8] focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                Reset Password
              </button>
            </div>
          </>
        ) : (
          <div role="status">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#20C516] text-white">
              {method === "email" ? (
                <MailCheck size={32} aria-hidden="true" />
              ) : (
                <Check size={36} strokeWidth={3.5} aria-hidden="true" />
              )}
            </div>

            <h2
              id="reset-title"
              className="text-center text-lg font-bold text-[#17345F]"
            >
              {method === "email" ? "Tautan reset terkirim" : "Password berhasil direset"}
            </h2>

            {method === "email" ? (
              <p className="mt-2 break-words text-center text-sm leading-relaxed text-slate-500">
                Tautan untuk membuat kata sandi baru telah dikirim ke{" "}
                <span className="font-semibold text-[#17345F]">{email}</span>.
                Tautan berlaku 24 jam.
              </p>
            ) : (
              <>
                <p className="mt-2 text-center text-sm text-slate-500">
                  Kata sandi sementara untuk{" "}
                  <span className="font-semibold text-[#17345F]">{nama}</span>:
                </p>

                <div className="mt-4 flex items-center gap-2 rounded-xl border-2 border-[#A6C4FF] bg-[#F8FAFF] p-2 pl-4">
                  <code
                    aria-label="Kata sandi sementara"
                    className="min-w-0 flex-1 break-all font-mono text-lg font-bold tracking-wider text-[#17345F]"
                  >
                    {showPassword ? tempPassword : "•".repeat(tempPassword.length)}
                  </code>
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-blue-50 hover:text-[#17345F]"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  <button
                    type="button"
                    onClick={handleCopy}
                    aria-label="Salin password"
                    className="flex h-9 shrink-0 items-center gap-1.5 rounded-lg bg-[#3B82F6] px-3 text-xs font-semibold text-white transition hover:bg-[#2F73E8]"
                  >
                    {copied ? <Check size={15} /> : <Copy size={15} />}
                    {copied ? "Tersalin" : "Salin"}
                  </button>
                </div>

                <p className="mt-4 flex items-start gap-2 rounded-lg bg-orange-50 px-3 py-2 text-xs leading-relaxed text-orange-700">
                  <ShieldAlert size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
                  Kata sandi ini hanya tampil sekali. Berikan melalui jalur yang
                  aman. Pengguna wajib menggantinya saat login pertama.
                </p>
              </>
            )}

            <button
              type="button"
              onClick={onClose}
              className="mt-6 h-11 w-full rounded-xl bg-[#3B82F6] text-sm font-semibold text-white transition hover:bg-[#2F73E8] focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              Selesai
            </button>
          </div>
        )}
      </div>
    </div>
  );
}