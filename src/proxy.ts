import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

// Protected path segments (after the locale prefix)
const PROTECTED_SEGMENTS = ["/mybooks", "/support"];

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if this path is protected
  // pathname looks like /en/mybooks or /ar/support
  const isProtected = PROTECTED_SEGMENTS.some((seg) => {
    const regex = new RegExp(`^/[a-z]{2}${seg}(/|$)`);
    return regex.test(pathname);
  });

  if (isProtected) {
    const token = request.cookies.get("taleora_auth_token")?.value;

    if (!token) {
      // Extract locale from pathname (first segment)
      const locale = pathname.split("/")[1] || routing.defaultLocale;
      const loginUrl = new URL(`/${locale}/login`, request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Delegate to next-intl middleware for locale handling
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};