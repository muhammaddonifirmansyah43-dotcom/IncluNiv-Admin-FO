
"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#E6F0FF]">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() =>
          setSidebarCollapsed((prev) => !prev)
        }
      />

      <div className="min-w-0 flex-1">
        <Header />

        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
