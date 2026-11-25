
import { getAuthToken } from "./auth";
import type {
  RecapDetailResponse,
  RecapListResponse,
} from "@/app/(main)/rekap/components/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export class RecapApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "RecapApiError";
    this.status = status;
  }
}

export type RecapSemester = "ODD" | "EVEN";

// 0 = Semua Minggu, 1–4 = Minggu tertentu.
export type RecapWeek = 0 | 1 | 2 | 3 | 4;

export interface RecapFilterParams {
  semester: RecapSemester;
  month: number;
  week: RecapWeek;
}

async function recapRequest<T>(endpoint: string): Promise<T> {
  if (!API_URL) {
    throw new Error("Konfigurasi alamat backend belum tersedia.");
  }

  const token = getAuthToken();

  if (!token) {
    throw new Error("Sesi login tidak ditemukan. Silakan login kembali.");
  }

  const response = await fetch(`${API_URL}/api/recaps${endpoint}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new RecapApiError(
      result.message || "Gagal mengambil data rekap.",
      response.status
    );
  }

  return result as T;
}

export function getRecapList(params: RecapFilterParams) {
  const query = new URLSearchParams({
    semester: params.semester,
    month: String(params.month),
    week: String(params.week),
  });

  return recapRequest<RecapListResponse>(`?${query.toString()}`);
}

export function getRecapDetail(mentorId: number) {
  return recapRequest<RecapDetailResponse>(`/${mentorId}`);
}
