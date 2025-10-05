import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('accessToken')?.value;
    const role = request.cookies.get('role')?.value;
    const { pathname } = request.nextUrl;

    if (pathname.startsWith('/admin')) {
        if (!token || role !== 'ADMIN') {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    if (pathname.startsWith('/book-appointment')) {
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    if (pathname.startsWith('/profile')) {
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/book-appointment', '/admin/:path*', '/profile/:path*'],
};
