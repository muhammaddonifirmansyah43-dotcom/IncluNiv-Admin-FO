
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  House,
  GraduationCap,
  HandHeart,
  ClipboardList,
  CalendarDays,
  FileBarChart,
  Bell,
  LogOut,
  ChevronsLeft,
} from "lucide-react";

import Logo from "./Logo";
import LogoutModal from "@/components/ui/LogoutModal";
import { clearAuthSession } from "@/lib/auth";

const menuItems = [
  { label: "Beranda", href: "/dashboard", icon: House },
  { label: "Data Mahasiswa", href: "/mahasiswa", icon: GraduationCap },
  { label: "Data pendamping", href: "/pendamping", icon: HandHeart },
  { label: "Pengajuan", href: "/pengajuan", icon: ClipboardList },
  { label: "Penjadwalan", href: "/jadwal", icon: CalendarDays },
  { label: "Rekap Pendamping", href: "/rekap", icon: FileBarChart },
  { label: "Notifikasi", href: "/notifikasi", icon: Bell },
];

type SidebarProps = {
  collapsed: boolean;
  onToggle: () => void;
};

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [showLogout, setShowLogout] = useState(false);

  function handleLogout() {
    clearAuthSession();
    setShowLogout(false);
    router.replace("/login");
  }

  return (
    <>
      <aside
        className={`flex h-full shrink-0 flex-col overflow-y-auto bg-[#0F2D5B] pt-0 pb-5 text-white transition-[width] duration-300 ${
          collapsed ? "w-[72px] px-2" : "w-72 px-3"
        }`}
      >
        <div className="mb-8 flex h-[64px] shrink-0 items-center gap-2">
          <div
            className={`flex shrink-0 items-center ${
              collapsed ? "w-full justify-center" : "justify-start"
            }`}
          >
            <div
              className={`flex shrink-0 items-center justify-center ${
                collapsed ? "h-12 w-12" : "h-14 w-14"
              }`}
            >
              <Logo />
            </div>
          </div>

          {!collapsed && (
            <>
              <div className="min-w-0 flex-1">
                <h1 className="whitespace-nowrap text-[22px] font-extrabold leading-tight tracking-wide">
                  INCLUNIV
                </h1>
                <p className="whitespace-nowrap text-[12px] font-semibold uppercase tracking-wide text-blue-200">
                  LAYANAN DISABILITAS
                </p>
              </div>

              <button
                type="button"
                onClick={onToggle}
                aria-label="Perkecil sidebar"
                title="Perkecil sidebar"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-blue-200 transition hover:bg-white/10 hover:text-white"
              >
                <ChevronsLeft size={22} strokeWidth={2.5} />
              </button>
            </>
          )}
        </div>

        <nav className="flex flex-1 flex-col gap-1">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                title={collapsed ? item.label : undefined}
                onClick={() => {
                  if (collapsed) onToggle();
                }}
                className={`flex items-center rounded-lg py-3 text-sm transition-colors ${
                  collapsed ? "justify-center px-0" : "gap-3 px-3"
                } ${
                  active
                    ? "bg-[#3B82F6] font-semibold text-white"
                    : "text-blue-100 hover:bg-white/10"
                }`}
              >
                <Icon
                  size={20}
                  strokeWidth={2}
                  className="h-5 w-5 shrink-0"
                />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setShowLogout(true)}
          title={collapsed ? "Keluar" : undefined}
          aria-label="Keluar"
          className={`mt-6 flex shrink-0 items-center rounded-lg py-3 text-sm text-orange-300 transition-colors hover:bg-white/10 ${
            collapsed ? "justify-center px-0" : "gap-3 px-3"
          }`}
        >
          <LogOut size={20} strokeWidth={2} className="h-5 w-5 shrink-0" />
          {!collapsed && <span>Keluar</span>}
        </button>
      </aside>

      <LogoutModal
        open={showLogout}
        onClose={() => setShowLogout(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}

