import { updateSession } from "@/utils/supabase/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { protectedPaths } from "./lib";

export async function middleware(request: NextRequest) {
    const url = new URL(request.url);
    const origin = url.origin;
    const pathname = url.pathname;
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-url", request.url);
    requestHeaders.set("x-origin", origin);
    requestHeaders.set("x-pathname", pathname);
    const response = await updateSession(request);
    requestHeaders.set("x-response", JSON.stringify("response"));

    if (response === null && protectedPaths.includes(pathname)) {
        return NextResponse.redirect(new URL("/", request.url));
    }
    const nextResponse = NextResponse.next();
    // NextResponse.next({ request: { headers: requestHeaders } });
    nextResponse.headers.set("x-url", request.url);
    nextResponse.headers.set("x-origin", origin);
    nextResponse.headers.set("x-pathname", pathname);
    nextResponse.headers.set("x-is-logged-in", response ? "true" : "false");
    // nextResponse.headers.set(
    //     "x-response",
    //     JSON.stringify(
    //         response?.headers.get("x-middleware-request-cookie") || "default"
    //     )
    // );
    return nextResponse;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"
    ]
};
