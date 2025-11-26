import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAuth = !!token;

  const publicPaths = ["/api/auth"];

  const isPublicPath = publicPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path),
  );

  if (isPublicPath) {
    return NextResponse.next();
  }

  if (!isAuth) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/(protected)/:path*"],
};
