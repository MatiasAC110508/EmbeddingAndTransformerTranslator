import { NextResponse } from "next/server";
import { authCookieName } from "@/src/lib/auth/jwt";

// Logout clears the session cookie so future protected requests are rejected.
export async function POST() {
  const response = NextResponse.json({ ok: true });

  response.cookies.delete(authCookieName);

  return response;
}
