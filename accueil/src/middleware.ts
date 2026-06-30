import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const getSecret = () =>
  new TextEncoder().encode(process.env.JWT_SECRET ?? 'change-this-secret-in-production');

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith('/admin/dashboard') ||
    pathname.startsWith('/api/admin/data')
  ) {
    const token = req.cookies.get('admin_session')?.value;
    if (!token) return NextResponse.redirect(new URL('/admin', req.url));
    try {
      await jwtVerify(token, getSecret());
    } catch {
      return NextResponse.redirect(new URL('/admin', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/dashboard/:path*', '/api/admin/data/:path*'],
};
