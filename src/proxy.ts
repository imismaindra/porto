import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || 'super-secret-key-12345');

export async function proxy(request: NextRequest) {
    const token = request.cookies.get('auth_token')?.value;

    // Define protected routes
    const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
    
    // Redirect logic for UI routes
    if (isAdminRoute) {
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        try {
            await jwtVerify(token, SECRET_KEY);
            return NextResponse.next();
        } catch (error) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
