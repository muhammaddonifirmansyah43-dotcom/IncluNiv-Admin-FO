import type { ReactNode } from "react";

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#E6F0FF] md:flex">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div className="min-w-0 flex-1">
        <Header />

        <main className="min-w-0 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}