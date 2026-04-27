import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const isAuthenticated = request.cookies.has('auth-token') || request.cookies.has('token');
  const path = request.nextUrl.pathname;

  const isAuthRoute = path === '/login' || path === '/signup';
  const isProtectedRoute = path.startsWith('/dashboard');

  // If user is trying to access a protected route but isn't authenticated
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If user is authenticated and trying to access login or signup pages
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/dashboard/:path*', '/login', '/signup'],
}
