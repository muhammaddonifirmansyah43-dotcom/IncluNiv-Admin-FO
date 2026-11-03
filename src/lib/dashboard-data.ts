import type { ChartSeries, Period, PermissionRequest } from "@/types/dashboard";

export const periods: Period[] = ["Mingguan", "Bulanan", "Semester"];

export const chartData: Record<Period, ChartSeries> = {
  Mingguan: {
    labels: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
    values: [320, 470, 390, 720, 560, 810, 640],
  },
  Bulanan: {
    labels: ["1–4", "5–8", "9–12", "13–16", "17–20", "21–24", "25–28", "29–31"],
    values: [420, 530, 380, 710, 620, 850, 690, 780],
  },
  Semester: {
    labels: ["Jul", "Agu", "Sep", "Okt", "Nov", "Des", "Jan", "Feb", "Mar", "Apr", "Mei", "Jun"],
    values: [420, 380, 1048, 640, 410, 680, 310, 570, 720, 810, 480, 620],
  },
};

export const permissionRequests: PermissionRequest[] = [
  { name: "Agus Salim", detail: "Pendamping • Hari ini, 08:00", status: "Disetujui", tone: "green" },
  { name: "Putra Adi", detail: "Pendamping • Besok, 10:00", status: "Sedang Diproses", tone: "orange" },
  { name: "Anjani Tri P.", detail: "Pendamping • 12 Okt 2026", status: "Tidak dapat dipenuhi", tone: "red" },
];

export const studentStats = [
  { label: "Tuna Rungu", value: "24 Mhs" },
  { label: "Tuna Netra", value: "18 Mhs" },
  { label: "Tuna Daksa", value: "22 Mhs" },
];

export const volunteerStats = [
  { label: "Jadwal Hari Ini", value: "7", detail: "Terjadwal" },
  { label: "Tanpa Jadwal", value: "13", detail: "Volunteer" },
];