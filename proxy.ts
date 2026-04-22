import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  authCookieName,
  authCookieOptions,
  verifyAuthToken,
} from "@/src/lib/auth/jwt";

const protectedRoutes = ["/dashboard", "/api/process"];
const guestOnlyRoutes = ["/auth/login", "/auth/register"];

// The proxy performs an optimistic auth check before protected pages or APIs are reached.
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(authCookieName)?.value;
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isGuestOnlyRoute = guestOnlyRoutes.some((route) =>
    pathname.startsWith(route)
  );

  let hasValidToken = false;

  if (token) {
    try {
      await verifyAuthToken(token);
      hasValidToken = true;
    } catch {
      hasValidToken = false;
    }
  }

  if (isProtectedRoute && !hasValidToken) {
    const response = NextResponse.redirect(new URL("/auth/login", request.url));
    response.cookies.set(authCookieName, "", { ...authCookieOptions, maxAge: 0 });
    return response;
  }

  if (isGuestOnlyRoute && hasValidToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/login", "/auth/register", "/api/process"],
};
