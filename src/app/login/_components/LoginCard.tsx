import type { ReactNode } from "react";

export default function LoginCard({ children }: { children: ReactNode }) {
  return (
    <section className="relative z-10 w-full max-w-[510px] rounded-[20px] border border-white/90 bg-white/[0.87] px-9 py-8 shadow-[0_12px_40px_rgba(15,45,91,0.20)] backdrop-blur-[3px] sm:px-11 sm:py-9">
      {children}
    </section>
  );
}