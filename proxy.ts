import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes, but allow /admin/login
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const allCookies = request.cookies.getAll();
    const hasSessionCookie = allCookies.some((c) => {
      const name = c.name.toLowerCase();
      return (
        name.includes("session_token") ||
        name.includes("session_data") ||
        name.includes("neon-auth") ||
        name.includes("better-auth")
      );
    });

    if (!hasSessionCookie) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
