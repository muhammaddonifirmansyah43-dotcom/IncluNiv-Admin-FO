import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function AuthCard({
  children,
  className = "max-w-[510px]",
}: Props) {
  return (
    <section
      className={`relative z-10 w-full rounded-[20px] border border-white/90 bg-white/[0.87] px-6 py-7 shadow-[0_12px_40px_rgba(15,45,91,0.20)] backdrop-blur-[3px] sm:px-10 sm:py-9 ${className}`}
    >
      {children}
    </section>
  );
}