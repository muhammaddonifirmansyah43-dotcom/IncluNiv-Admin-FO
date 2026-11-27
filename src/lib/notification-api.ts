import { getAuthToken } from "@/lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type ApiNotification = {
  id: number;
  title: string;
  body: string;
  type?: string | null;
  referenceId?: number | null;
  readAt: string | null;
  createdAt: string;
};

export type NotificationListResponse = {
  items: ApiNotification[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

async function notificationRequest<T>(
  endpoint: string,
  method: "GET" | "PATCH" = "GET"
): Promise<T> {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL belum dikonfigurasi");
  }

  const token = getAuthToken();

  if (!token) {
    throw new Error("Token login tidak ditemukan");
  }

  const url = API_URL + "/api/notifications" + endpoint;

  const response = await fetch(url, {
    method,
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
    cache: "no-store",
  });

  const result = (await response.json()) as ApiResponse<T>;

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || "Gagal mengakses API notifikasi"
    );
  }

  return result.data;
}

export async function getAdminNotifications(
  page = 1,
  limit = 20
): Promise<NotificationListResponse> {
  return notificationRequest<NotificationListResponse>(
    "/?page=" + page + "&limit=" + limit
  );
}

export async function markNotificationRead(
  id: number
): Promise<ApiNotification> {
  return notificationRequest<ApiNotification>(
    "/" + id + "/read",
    "PATCH"
  );
}

export async function markNotificationUnread(
  id: number
): Promise<ApiNotification> {
  return notificationRequest<ApiNotification>(
    "/" + id + "/unread",
    "PATCH"
  );
}