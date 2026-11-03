"use client";

import { useState, type ReactNode } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function MainLayout({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#E6F0FF]">
      {/* Sidebar: diam di kiri */}
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((prev) => !prev)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header: diam di atas */}
        <div className="shrink-0">
          <Header />
        </div>

        {/* Hanya area ini yang bisa di-scroll */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}