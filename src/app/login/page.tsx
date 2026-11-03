import AuthBackground from "@/components/auth/AuthBackground";
import AuthCard from "@/components/auth/AuthCard";
import LoginHeader from "./_components/LoginHeader";
import LoginForm from "./_components/LoginForm";

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#DCEAFF] px-5 py-8">
      <AuthBackground />
      <AuthCard>
        <LoginHeader />
        <LoginForm />
      </AuthCard>
    </main>
  );
}