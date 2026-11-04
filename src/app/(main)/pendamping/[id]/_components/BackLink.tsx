import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BackLink() {
  return (
    <Link
      href="/pendamping"
      className="inline-flex items-center gap-2 text-sm font-medium text-[#3B82F6] hover:underline"
    >
      <ArrowLeft size={16} aria-hidden="true" />
      Kembali ke Data Pendamping
    </Link>
  );
}