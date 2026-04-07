import { NextRequest, NextResponse } from "next/server";
import { createSessionCookie, isAuthenticated } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const password = body.password?.trim();
  const expected = process.env.ADMIN_PASSWORD ?? "admin";

  if (password !== expected) {
    return NextResponse.json({ error: "Špatné heslo." }, { status: 401 });
  }

  const cookie = createSessionCookie();
  const res = NextResponse.json({ success: true });
  res.cookies.set(cookie.name, cookie.value, cookie.options as Parameters<typeof res.cookies.set>[2]);
  return res;
}

export async function GET() {
  const authed = await isAuthenticated();
  return NextResponse.json({ authenticated: authed });
}
