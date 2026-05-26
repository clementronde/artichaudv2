import { NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  const host = request.headers.get('host') || ''

  // Redirect .com to .fr — canonical domain consolidation (301 permanent)
  if (host.includes('artichaud-studio.com')) {
    const url = request.nextUrl.clone()
    url.host = host.replace('artichaud-studio.com', 'artichaud-studio.fr')
    return NextResponse.redirect(url, { status: 301 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico).*)'],
}
