
import { Suspense } from "react";
import AuthBackground from "@/components/auth/AuthBackground";
import ResetPasswordContent from "./_components/ResetPasswordContent";

export default function ResetPasswordPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#DCEAFF] px-4 py-6">
      <AuthBackground />

      <Suspense
        fallback={
          <div className="relative z-10 text-sm text-[#17345F]">
            Memuat halaman...
          </div>
        }
      >
        <ResetPasswordContent />
      </Suspense>
    </main>
  );
}
