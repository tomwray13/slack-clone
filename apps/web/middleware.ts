import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getMainChannel, magicVerify } from "./data";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  let cookie = request.cookies.get("accessToken");
  console.log(`cookie from middleware`, cookie); // => { name: 'nextjs', value: 'fast', Path: '/' }
  if (request.nextUrl.pathname === "/") {
    const { id } = await getMainChannel();
    return NextResponse.redirect(new URL(`/channel/${id}`, request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
