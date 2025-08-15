import { NextRequest, NextResponse } from 'next/server';
import { PagesRoutes } from './models';

export async function middleware (request: NextRequest) {
  const unproctedRoutes = ['/login', '/create-account', '/recovery-password', '/new-password'];

  const accessToken = request.cookies.get('accessToken');
  const refreshToken = request.cookies.get('refreshToken');
  
  const hasAuthorizationToken: boolean = Boolean(accessToken?.value || refreshToken?.value);

  if (unproctedRoutes.includes(request.nextUrl.pathname)) {
    switch (true) {
      case !hasAuthorizationToken: 
        return NextResponse.next();
      case hasAuthorizationToken:
        return NextResponse.redirect(new URL(PagesRoutes.ITEMS_GROUPS, request.nextUrl));
    }
  } else {
    switch (true) {
      case !hasAuthorizationToken:
        return NextResponse.redirect(new URL(PagesRoutes.LOGIN, request.nextUrl));
      case hasAuthorizationToken:
        return NextResponse.next();
    }
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};