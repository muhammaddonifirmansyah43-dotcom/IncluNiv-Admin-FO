
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BackToLoginLink() {
  return (
    <Link
      href="/login"
      className="mb-6 -ml-2 inline-flex items-center gap-1 rounded-sm text-[14px] font-medium text-[#3B82F6] transition hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2"
    >
      <ArrowLeft size={16} strokeWidth={2} />
      Kembali ke halaman login
    </Link>
  );
}
