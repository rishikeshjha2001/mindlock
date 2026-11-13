import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "mindlock_admin_auth";
export const ADMIN_USERNAME = "admin@bookify";
export const ADMIN_PASSWORD = "Rishi@2003";

const SECRET_SALT = "mindlock_auth_secret_token_991823719";

export function generateSessionToken(username: string): string {
  const timestamp = Date.now();
  const raw = `${username}:${timestamp}:${SECRET_SALT}`;
  return Buffer.from(raw).toString("base64");
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const [username, timestampStr, salt] = decoded.split(":");
    if (salt !== SECRET_SALT) return false;
    if (username !== ADMIN_USERNAME) return false;

    // Token valid for 30 days
    const timestamp = parseInt(timestampStr, 10);
    const maxAgeMs = 30 * 24 * 60 * 60 * 1000;
    if (Date.now() - timestamp > maxAgeMs) return false;

    return true;
  } catch {
    return false;
  }
}

export async function isUserAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}
