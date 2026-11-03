import Link from "next/link";
import { Check } from "lucide-react";

export default function ForgotPasswordSuccess() {
  return (
    <div className="text-center" role="status">
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
        className="mt-6 flex min-h-[48px] w-full items-center justify-center rounded-[24px] bg-[#3B82F6] px-4 text-[18px] font-bold text-white transition hover:bg-[#2F73E8]"
      >
        Kembali ke halaman login
      </Link>
    </div>
  );
}