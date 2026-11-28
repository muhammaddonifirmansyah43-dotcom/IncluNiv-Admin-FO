
import Link from "next/link";
import { MailCheck } from "lucide-react";

export default function ForgotPasswordSuccess() {
  return (
    <div className="text-center" role="status">
      <div className="mx-auto mb-5 flex h-[76px] w-[76px] items-center justify-center rounded-full bg-blue-100 text-[#3B82F6]">
        <MailCheck size={42} strokeWidth={2.2} />
      </div>

      <h1 className="text-[28px] font-extrabold leading-tight tracking-tight text-[#171717]">
        Periksa Email Anda
      </h1>

      <p className="mx-auto mt-3 max-w-[360px] text-[14px] leading-relaxed text-[#31435D]">
        Jika alamat email terdaftar, kami akan mengirimkan tautan untuk
        mengatur ulang kata sandi Anda. Silakan periksa kotak masuk
        atau folder spam.
      </p>

      <Link
        href="/login"
        className="mt-7 flex h-[48px] w-full items-center justify-center rounded-[24px] bg-[#3B82F6] px-4 text-[17px] font-bold text-white transition hover:bg-[#2F73E8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 focus-visible:ring-offset-2"
      >
        Kembali ke halaman login
      </Link>
    </div>
  );
}
