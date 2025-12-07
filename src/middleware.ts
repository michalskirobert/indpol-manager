import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { canAccessRoute } from "@/lib/check-permissions";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const publicPaths = ["/api/auth", "/sign-in", "/not-authorized"];

  const isPublicPath = publicPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path),
  );

  if (isPublicPath) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith("/not-authorized")) return NextResponse.next();

  const allowed = canAccessRoute(token, pathname);

  if (!allowed) {
    return NextResponse.redirect(new URL("/not-authorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|static|.*\\..*).*)"],
};
