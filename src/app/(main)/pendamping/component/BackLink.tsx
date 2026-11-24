import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BackLink() {
  return (
    <Link
      href="/pendamping"
      className="inline-flex items-center gap-2 text-sm font-medium text-[#3B82F6] transition hover:text-[#17345F] hover:underline outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 rounded-md"
    >
      <ArrowLeft size={16} aria-hidden="true" />
      Kembali ke Data Pendamping
    </Link>
  );
}
