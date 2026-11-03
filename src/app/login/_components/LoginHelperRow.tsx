import Link from "next/link";
import { CircleAlert } from "lucide-react";

export default function LoginHelperRow({ error }: { error?: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
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
  );
}