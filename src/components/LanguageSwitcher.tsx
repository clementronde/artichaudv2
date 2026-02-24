'use client'

import { useLocale } from '@/context/LocaleContext'
import type { Locale } from '@/lib/i18n/translations'

export default function LanguageSwitcher() {
  const { locale, switchLocale } = useLocale()

  const handleSwitch = (newLocale: Locale) => {
    if (newLocale !== locale) {
      switchLocale(newLocale)
    }
  }

  return (
    <div className="fixed bottom-6 left-6 z-[9000] flex items-center gap-0 text-[12px] font-medium bg-black/80 backdrop-blur-md border border-white/10 rounded-full px-1 py-1 shadow-lg">
      <button
        onClick={() => handleSwitch('fr')}
        className={`px-3 py-1.5 rounded-full transition-all duration-200 ${
          locale === 'fr'
            ? 'bg-white text-black'
            : 'text-white/50 hover:text-white'
        }`}
        aria-label="Français"
      >
        FR
      </button>
      <button
        onClick={() => handleSwitch('en')}
        className={`px-3 py-1.5 rounded-full transition-all duration-200 ${
          locale === 'en'
            ? 'bg-white text-black'
            : 'text-white/50 hover:text-white'
        }`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  )
}
