const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

// Sementara dummy. Nanti ganti dengan pemanggilan API.
export function validateAdminLogin(username: string, password: string) {
  return (
    username.trim().toLowerCase() === ADMIN_USERNAME &&
    password === ADMIN_PASSWORD
  );
}

// Menerima alamat email atau username (huruf, angka, titik, garis bawah, strip).
export function isValidIdentifier(value: string) {
  const v = value.trim();
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const isUsername = /^[a-zA-Z0-9._-]+$/.test(v);
  return isEmail || isUsername;
}