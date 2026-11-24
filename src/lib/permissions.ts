
import type { Pengajuan, PengajuanStatus } from "@/types/pengajuan";
import { getAuthToken } from "./auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export class PermissionApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "PermissionApiError";
    this.status = status;
  }
}

export interface PermissionMonitoringItem {
  id: number;
  mentorId: number;
  assignmentId: number | null;
  reason: string;
  startAt: string;
  endAt: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  mentor: {
    id: number;
    userId: number;
    studentCode: string | null;
    department: string | null;
    user: {
      id: number;
      fullName: string;
      email: string;
      createdAt: string;
    };
  };
  assignment: {
    id: number;
    startAt: string;
    endAt: string;
    location: string | null;
    student: {
      id: number;
      studentCode: string | null;
      department: string | null;
      user: {
        id: number;
        fullName: string;
        classSchedules: {
          id: number;
          courseName: string;
          dayOfWeek: number;
          startTime: string;
          endTime: string;
          location: string | null;
        }[];
      };
    };
  } | null;
}

export interface PermissionMonitoringResponse {
  success: boolean;
  message: string;
  data: PermissionMonitoringItem[];
}

export async function getPendingPermissions(): Promise<PermissionMonitoringResponse> {
  if (!API_URL) {
    throw new Error("Konfigurasi alamat backend belum tersedia.");
  }

  const token = getAuthToken();

  if (!token) {
    throw new Error("Sesi login tidak ditemukan. Silakan login kembali.");
  }

  const response = await fetch(
    `${API_URL}/api/permissions/monitoring`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new PermissionApiError(
      result.message || "Gagal mengambil data pengajuan izin.",
      response.status
    );
  }

  return result as PermissionMonitoringResponse;
}

function formatDateShort(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  const parts = new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Jakarta",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date);

  const day = parts.find((part) => part.type === "day")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const year = parts.find((part) => part.type === "year")?.value;

  return `${day}-${month}-${year}`;
}

function formatDateLong(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  const tanggal = new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Jakarta",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);

  const waktu = new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Jakarta",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  })
    .format(date)
    .replace(".", ":");

  return `${tanggal}, ${waktu} WIB`;
}

function formatTime(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return (
    new Intl.DateTimeFormat("id-ID", {
      timeZone: "Asia/Jakarta",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    })
      .format(date)
      .replace(".", ":") + " WIB"
  );
}

function mapStatus(status: PermissionMonitoringItem["status"]): PengajuanStatus {
  switch (status) {
    case "APPROVED":
      return "telah_disetujui";
    case "REJECTED":
      return "tidak_dipenuhi";
    default:
      return "dalam_proses";
  }
}

export function mapPermissionToPengajuan(
  item: PermissionMonitoringItem
): Pengajuan {
  const start = new Date(item.startAt);
  const end = new Date(item.endAt);

  const hari =
    Number.isNaN(start.getTime())
      ? "—"
      : new Intl.DateTimeFormat("id-ID", {
          timeZone: "Asia/Jakarta",
          weekday: "long",
          day: "2-digit",
          month: "long",
          year: "numeric",
        }).format(start);

  const jam =
    Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())
      ? "—"
      : `${formatTime(item.startAt)} - ${formatTime(item.endAt)}`;

  return {
    id: String(item.id),
    nama: item.mentor.user.fullName,
    nim: item.mentor.studentCode ?? "—",
    tanggalSingkat: formatDateShort(item.createdAt),
    tanggalLengkap: formatDateLong(item.createdAt),
    status: mapStatus(item.status),
    jabatan: "Volunteer",
    terdaftar: `Terdaftar sejak ${formatDateShort(item.mentor.user.createdAt)}`,
    prodi: item.mentor.department ?? "—",
    fakultas: "—",
    alasan: item.reason,
    jadwal: {
      hari,
      jam,
      matkul: "—",
      mahasiswa: item.assignment?.student.user.fullName ?? "—",
    },
    efektif: `${formatDateLong(item.startAt)} - ${formatDateLong(item.endAt)}`,
  };
}

export function mapPermissionsToPengajuan(
  items: PermissionMonitoringItem[]
): Pengajuan[] {
  return items.map(mapPermissionToPengajuan);
}
