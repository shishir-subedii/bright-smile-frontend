import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getCookie } from './lib/utils/cookieHelper';

export async function middleware(request: NextRequest) {
    const token = await getCookie('accessToken')
    const role = await getCookie('role')
    const { pathname } = request.nextUrl;

    if (pathname.startsWith('/employer')) {
        if (!token || role !== 'employer') {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    if (pathname.startsWith('/seeker')) {
        if (!token || role !== 'seeker') {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    if (pathname.startsWith('/book-appointment')) {
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/employer/:path*', '/seeker/:path*', '/book-appointment/:path*'],
};
