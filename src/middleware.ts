import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { routing } from './i18n/routing';

export default function middleware(request: NextRequest) {
  const publicPatterns = ['/manifest.json', '/favicon.ico'];
  const isPublicFile = publicPatterns.some(
    (pattern) => request.nextUrl.pathname.startsWith(pattern)
  );

  // Skip middleware for public files
  if (isPublicFile) {
    return;
  }

  const handleI18nRouting = createMiddleware(routing);
  return handleI18nRouting(request);
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)']
};