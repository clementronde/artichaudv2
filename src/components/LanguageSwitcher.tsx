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
    <div className="flex items-center gap-1 text-[13px] font-medium">
      <button
        onClick={() => handleSwitch('fr')}
        className={`px-2 py-1 rounded transition-colors duration-200 ${
          locale === 'fr'
            ? 'text-white'
            : 'text-white/40 hover:text-white/70'
        }`}
        aria-label="Français"
      >
        FR
      </button>
      <span className="text-white/20">|</span>
      <button
        onClick={() => handleSwitch('en')}
        className={`px-2 py-1 rounded transition-colors duration-200 ${
          locale === 'en'
            ? 'text-white'
            : 'text-white/40 hover:text-white/70'
        }`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  )
}
