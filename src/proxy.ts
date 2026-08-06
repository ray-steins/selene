import { ROUTES } from "./configs/app.config";
import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const PUBLIC_ROUTES: string[] = [ROUTES.auth.signin, ROUTES.auth.signup];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuth = getSessionCookie(request);
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  if (isAuth) {
    if (isPublicRoute || pathname === '/') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  if (isPublicRoute) return NextResponse.next();

  return NextResponse.redirect(new URL(ROUTES.auth.signin, request.url));
}

export const config = {
  matcher: ["/", "/auth/:path*"],
};