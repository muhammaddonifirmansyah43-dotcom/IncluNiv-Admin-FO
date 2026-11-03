import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BackToLoginLink() {
  return (
    <Link
      href="/login"
      className="mb-4 inline-flex items-center gap-1 text-[14px] font-medium text-[#3B82F6] hover:underline"
    >
      <ArrowLeft size={14} />
      Kembali ke halaman login
    </Link>
  );
}