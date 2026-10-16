import { NextRequest, NextResponse } from 'next/server'

// Google tag gateway : GTM et ses tags sont servis depuis notre domaine sous ce chemin,
// puis relayés vers l'infrastructure Google (https://developers.google.com/tag-platform/tag-manager/gateway)
const MEASUREMENT_PATH = '/metrics'

function proxyGoogleTag(request: NextRequest, gtmId: string) {
  const target = new URL(`${request.nextUrl.pathname}${request.nextUrl.search}`, `https://${gtmId.toLowerCase()}.fps.goog`)

  // Google a besoin de la localisation approximative du visiteur, fournie par Vercel
  const headers = new Headers(request.headers)
  const country = request.headers.get('x-vercel-ip-country')
  const region = request.headers.get('x-vercel-ip-country-region')
  if (country) headers.set('X-Forwarded-Country', country)
  if (region) headers.set('X-Forwarded-Region', region)

  return NextResponse.rewrite(target, { request: { headers } })
}

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

  // 3. Google tag gateway
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID
  const { pathname } = request.nextUrl
  if (gtmId && (pathname === MEASUREMENT_PATH || pathname.startsWith(`${MEASUREMENT_PATH}/`))) {
    return proxyGoogleTag(request, gtmId)
  }

  // 4. Retrait du slash final (fait ici car skipTrailingSlashRedirect est activé pour /metrics/)
  if (pathname.length > 1 && pathname.endsWith('/')) {
    // URL brute : nextUrl conserverait le slash final à la sérialisation
    const target = new URL(request.url)
    target.pathname = pathname.replace(/\/+$/, '')
    return NextResponse.redirect(target, { status: 308 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico).*)'],
}
