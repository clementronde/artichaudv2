import { NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  const host = request.headers.get('host') || ''
  const url = request.nextUrl.clone()

  // 1. Redirect .com → .fr (301 permanent)
  if (host.includes('artichaud-studio.com')) {
    url.host = host.replace('artichaud-studio.com', 'artichaud-studio.fr').replace(/^www\./, '')
    return NextResponse.redirect(url, { status: 301 })
  }

  // 2. Redirect www → sans www — domaine canonique sans www (301 permanent)
  if (host.startsWith('www.')) {
    url.host = host.replace(/^www\./, '')
    return NextResponse.redirect(url, { status: 301 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico).*)'],
}
