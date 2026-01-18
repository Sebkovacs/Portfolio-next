import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const auth = request.headers.get('authorization')
    const BASIC = 'Basic '
    const user = process.env.ADMIN_USER || 'sebkovacs@gmail.com'
    const pass = process.env.ADMIN_PASS || 'Pop.the.dog123'
    if (!auth?.startsWith(BASIC)) {
      return new NextResponse('Unauthorized', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Admin"' },
      })
    }
    const [, b64] = auth.split(' ')
    const [u, p] = Buffer.from(b64, 'base64').toString().split(':')
    if (u !== user || p !== pass) {
      return new NextResponse('Unauthorized', { status: 401 })
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
