import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getMainChannel, magicVerify } from "./data";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    const { id } = await getMainChannel();
    return NextResponse.redirect(new URL(`/channel/${id}`, request.url));
  }
  if (request.nextUrl.pathname.startsWith(`/auth/magic/`)) {
    const { pathname } = request.nextUrl;
    const splitUrl = pathname.split(`/auth/magic/`);
    const uuid = splitUrl[1];
    try {
      await magicVerify({ uuid });
      return NextResponse.redirect(new URL(`/`, request.url));
    } catch (error) {}
  }
}
