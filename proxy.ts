import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // Mock role-based routing for Phase 1
  const path = request.nextUrl.pathname;

  // Basic mock auth checks based on paths
  // In Phase 3, this will be replaced with Supabase Auth
  
  // If hitting the root, redirect to login
  if (path === '/') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
