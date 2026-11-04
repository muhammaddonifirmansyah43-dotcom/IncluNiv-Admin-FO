// Tanpa karakter mirip (0/O, 1/l/I) supaya mudah dibaca dan diketik.
const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";

export function generateTempPassword(length = 10) {
  const values = new Uint32Array(length);
  crypto.getRandomValues(values);
  return Array.from(values, (value) => CHARS[value % CHARS.length]).join("");
}