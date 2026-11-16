import { NextResponse } from 'next/server'

export const config = {
  matcher: ['/:path*'],
}

export default function proxy(request) {
  const path = request.nextUrl.pathname

  if (
    path === '/' ||
    path === '/login' ||
    path.startsWith('/login/')
  ) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL('/login', request.url))
}