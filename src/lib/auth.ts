export type AuthUser = {
  id: number;
  fullName: string;
  email: string;
  role: "STUDENT" | "MENTOR" | "ADMIN";
};

type LoginResponse = {
  success: boolean;
  message: string;
  data?: {
    user: AuthUser;
    token: string;
  };
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function loginAdmin(email: string, password: string) {
  if (!API_URL) {
    throw new Error("Konfigurasi alamat backend belum tersedia.");
  }

  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.trim(),
      password,
    }),
  });

  const result = (await response.json()) as LoginResponse;

  if (!response.ok || !result.success || !result.data) {
    throw new Error(result.message || "Login gagal.");
  }

  if (result.data.user.role !== "ADMIN") {
    throw new Error("Akun ini tidak memiliki akses Admin.");
  }

  localStorage.setItem("incluniv_token", result.data.token);
  localStorage.setItem(
    "incluniv_user",
    JSON.stringify(result.data.user)
  );

  return result.data.user;
}

export function getAuthToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("incluniv_token");
}

export function clearAuthSession() {
  localStorage.removeItem("incluniv_token");
  localStorage.removeItem("incluniv_user");
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}


// Menerima alamat email atau username.
export function isValidIdentifier(value: string) {
  const v = value.trim();
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const isUsername = /^[a-zA-Z0-9._-]+$/.test(v);
  return isEmail || isUsername;
}
