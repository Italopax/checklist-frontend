import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware (request: NextRequest) {
  const unproctedRoutes = ['/login', '/create-account', '/recovery-password'];
  const applicationCookies = (await cookies()).getAll();

  const accessToken = applicationCookies.find((cookie) => cookie.name === 'accessToken');
  const refreshToken = applicationCookies.find((cookie) => cookie.name === 'refreshToken');
  
  const hasAuthorizationToken: boolean = Boolean(accessToken?.value || refreshToken?.value);

  if (unproctedRoutes.includes(request.nextUrl.pathname)) {
    switch (true) {
      case !hasAuthorizationToken: 
        return NextResponse.next();
      case hasAuthorizationToken:
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }
  } else {
    switch (true) {
      case !hasAuthorizationToken:
        return NextResponse.redirect(new URL('/login', request.nextUrl));
      case hasAuthorizationToken:
        return NextResponse.next();
    }
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};