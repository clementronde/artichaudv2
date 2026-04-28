import { NextRequest, NextResponse } from 'next/server'
import type { Locale } from '@/lib/i18n/translations'

const SUPPORTED_LOCALES: Locale[] = ['fr', 'en']
const COOKIE_NAME = 'NEXT_LOCALE'

/**
 * Detect locale in the following priority order:
 * 1. Existing NEXT_LOCALE cookie (user has explicitly chosen)
 * 2. Domain-based detection (.com -> en, .fr -> fr)
 * 3. Accept-Language header
 * 4. Default: fr
 */
function detectLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get(COOKIE_NAME)?.value
  if (cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale as Locale)) {
    return cookieLocale as Locale
  }

  const host = request.headers.get('host') || ''
  if (host.endsWith('.fr') || host.includes('.fr:')) {
    return 'fr'
  }

  const acceptLanguage = request.headers.get('accept-language') || ''
  const primaryLang = acceptLanguage.split(',')[0]?.split('-')[0]?.toLowerCase()
  if (primaryLang === 'en') return 'en'
  if (primaryLang === 'fr') return 'fr'

  return 'fr'
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  const locale = detectLocale(request)
  const response = NextResponse.next()

  response.headers.set('x-locale', locale)

  const existingCookie = request.cookies.get(COOKIE_NAME)?.value
  if (!existingCookie || !SUPPORTED_LOCALES.includes(existingCookie as Locale)) {
    response.cookies.set(COOKIE_NAME, locale, {
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
      sameSite: 'lax',
      secure: true,
    })
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|llms.txt).*)',
  ],
}
