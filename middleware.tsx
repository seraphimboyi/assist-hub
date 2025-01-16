import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { serialize } from "cookie";
import { NODE_ENV } from "./constants/environment";
import { get_auth_check } from "./constants/apiPath";

/** TBD: 後續邏輯
 *    - 驗證 Token 的有效性：Middleware 中使用 JWT 驗證來確認 token 是否有效 (jose)
 */

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token");

  if (pathname.startsWith("/user")) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }

    const authResponse = await fetch(
      `${request.nextUrl.origin}/api/auth/check`,
      {
        method: "POST",
        headers: {
          Cookie: `token=${token.value}`,
        },
      },
    );

    console.log("Auth check response:", {
      status: authResponse.status,
      ok: authResponse.ok,
    });

    switch (authResponse.status) {
      case 200:
        return NextResponse.next();
      case 401:
        return NextResponse.redirect(new URL("/auth/signin", request.url));
      default:
        return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
  }

  // if (pathname.startsWith("/inquiry")) {

  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*"],
};
