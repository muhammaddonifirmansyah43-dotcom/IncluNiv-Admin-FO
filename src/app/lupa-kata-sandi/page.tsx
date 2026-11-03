import AuthBackground from "@/components/auth/AuthBackground";
import ForgotPasswordContent from "./_components/ForgotPasswordContent";

export default function ForgotPasswordPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#DCEAFF] px-4 py-6">
      <AuthBackground />
      <ForgotPasswordContent />
    </main>
  );
}