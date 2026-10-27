
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  Users,
  UserRoundCheck,
  ClipboardList,
  CalendarDays,
  FileBarChart,
  Bell,
  LogOut,
  ChevronsLeft,
} from "lucide-react";

import Logo from "./Logo";

const menuItems = [
  { label: "Beranda", href: "/dashboard", icon: House },
  { label: "Data Mahasiswa", href: "/mahasiswa", icon: Users },
  { label: "Data Volunteer", href: "/pendamping", icon: UserRoundCheck },
  { label: "Pengajuan", href: "/pengajuan", icon: ClipboardList },
  { label: "Penjadwalan", href: "/jadwal", icon: CalendarDays },
  { label: "Rekap Volunteer", href: "/rekap", icon: FileBarChart },
  { label: "Notifikasi", href: "/notifikasi", icon: Bell },
];

type SidebarProps = {
  collapsed: boolean;
  onToggle: () => void;
};

export default function Sidebar({
  collapsed,
  onToggle,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`flex min-h-screen shrink-0 flex-col bg-[#0F2D5B] py-5 text-white transition-[width] duration-300 ${
        collapsed ? "w-[72px] px-2" : "w-72 px-3"
      }`}
    >
      {/* Logo, nama aplikasi, dan tombol collapse */}
      <div className="mb-8 flex h-[64px] items-center gap-2">
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
              <h1 className="whitespace-nowrap text-[25px] font-extrabold leading-tight tracking-wide">
                INCLUNIV
              </h1>
              <p className="whitespace-nowrap text-[15px] font-semibold uppercase tracking-wide text-blue-200">
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

      {/* Menu navigasi */}
      <nav className="flex flex-1 flex-col gap-1">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href ||
            pathname.startsWith(`${item.href}/`);

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
                collapsed
                  ? "justify-center px-0"
                  : "gap-3 px-3"
              } ${
                active
                  ? "bg-[#3B82F6] font-semibold text-white"
                  : "text-blue-100 hover:bg-white/10"
              }`}
            >
              <Icon size={18} strokeWidth={1.8} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Tombol keluar */}
      <button
        type="button"
        title={collapsed ? "Keluar" : undefined}
        className={`mt-6 flex items-center rounded-lg py-3 text-sm text-orange-300 transition-colors hover:bg-white/10 ${
          collapsed ? "justify-center px-0" : "gap-3 px-3"
        }`}
      >
        <LogOut size={18} />
        {!collapsed && <span>Keluar</span>}
      </button>
    </aside>
  );
}
