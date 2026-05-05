'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { type Locale, translations } from '@/lib/i18n/translations'

interface LocaleContextValue {
  locale: Locale
  t: typeof translations.fr
  switchLocale: (newLocale: Locale) => void
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({
  locale: initialLocale,
  children,
}: {
  locale: Locale
  children: ReactNode
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale)
  const t = translations[locale]

  const switchLocale = (newLocale: Locale) => {
    const secure = location.protocol === 'https:' ? '; Secure' : ''
    document.cookie = `NEXT_LOCALE=${newLocale}; max-age=31536000; path=/; SameSite=Lax${secure}`
    setLocale(newLocale)
  }

  return (
    <LocaleContext.Provider value={{ locale, t, switchLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext)
  if (!ctx) {
    // Fallback to French if used outside provider (e.g. during SSR edge cases)
    return {
      locale: 'fr',
      t: translations.fr,
      switchLocale: () => {},
    }
  }
  return ctx
}
