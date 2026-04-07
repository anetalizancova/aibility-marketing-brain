import { cookies } from "next/headers";

const COOKIE_NAME = "laba-admin-session";
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24h

function getSecret(): string {
  return process.env.ADMIN_PASSWORD ?? "admin";
}

export function generateToken(): string {
  const payload = `${Date.now() + SESSION_DURATION}`;
  return Buffer.from(`${payload}:${getSecret()}`).toString("base64");
}

export async function isAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  if (!token) return false;
  try {
    const decoded = Buffer.from(token, "base64").toString();
    const [expiry, secret] = decoded.split(":");
    if (secret !== getSecret()) return false;
    if (Date.now() > Number(expiry)) return false;
    return true;
  } catch {
    return false;
  }
}

export function createSessionCookie(): {
  name: string;
  value: string;
  options: Record<string, unknown>;
} {
  return {
    name: COOKIE_NAME,
    value: generateToken(),
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_DURATION / 1000,
      path: "/",
    },
  };
}
