import { NextRequest, NextResponse } from 'next/server'
import type { Locale } from '@/lib/i18n/translations'

const SUPPORTED_LOCALES: Locale[] = ['fr', 'en']
const COOKIE_NAME = 'NEXT_LOCALE'

/**
 * Detect locale in the following priority order:
 * 1. Existing NEXT_LOCALE cookie (user has explicitly chosen)
 * 2. Domain-based detection (.com → en, .fr → fr)
 * 3. Accept-Language header
 * 4. Default: fr
 */
function detectLocale(request: NextRequest): Locale {
  // 1. Check existing cookie preference
  const cookieLocale = request.cookies.get(COOKIE_NAME)?.value
  if (cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale as Locale)) {
    return cookieLocale as Locale
  }

  // 2. Domain-based detection
  const host = request.headers.get('host') || ''
  // artichaud-studio.fr or any .fr domain → French
  if (host.endsWith('.fr') || host.includes('.fr:')) {
    return 'fr'
  }

  // 3. Accept-Language header fallback
  const acceptLanguage = request.headers.get('accept-language') || ''
  const primaryLang = acceptLanguage.split(',')[0]?.split('-')[0]?.toLowerCase()
  if (primaryLang === 'en') return 'en'
  if (primaryLang === 'fr') return 'fr'

  // 4. Default to French
  return 'fr'
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip static files, API routes, and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // static files (images, fonts, etc.)
  ) {
    return NextResponse.next()
  }

  const locale = detectLocale(request)

  const response = NextResponse.next()

  // Set locale header so server components can read it
  response.headers.set('x-locale', locale)

  // Set cookie if not already set (or if set to an unsupported value)
  const existingCookie = request.cookies.get(COOKIE_NAME)?.value
  if (!existingCookie || !SUPPORTED_LOCALES.includes(existingCookie as Locale)) {
    response.cookies.set(COOKIE_NAME, locale, {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: '/',
      sameSite: 'lax',
      secure: true,
    })
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, sitemap.xml, robots.txt
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
