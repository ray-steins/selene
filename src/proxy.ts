import { ROUTES } from "./configs/app.config";
import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const PUBLIC_ROUTES: string[] = [ROUTES.auth.signin, ROUTES.auth.signup];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log(request);
  const isAuth = getSessionCookie(request);
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  if (isAuth) return NextResponse.redirect(new URL("/", request.url));
  if (isPublicRoute) return NextResponse.next();

  return NextResponse.redirect(new URL(ROUTES.auth.signin, request.url));
}

export const config = {
  matcher: ["/auth/:path*"],
};