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

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full min-h-screen w-64 shrink-0 flex-col bg-[#0F2D5B] px-3 py-5 text-white">
      <div className="mb-8 px-2">
        <Logo />
      </div>

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
              className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-colors ${
                active
                  ? "bg-[#3B82F6] font-semibold text-white"
                  : "text-blue-100 hover:bg-white/10"
              }`}
            >
              <Icon size={18} strokeWidth={1.8} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        className="mt-6 flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-orange-300 hover:bg-white/10"
      >
        <LogOut size={18} />
        Keluar
      </button>
    </aside>
  );
}