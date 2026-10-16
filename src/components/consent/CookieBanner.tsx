'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocale } from '@/context/LocaleContext'
import { useConsent, type ConsentChoices } from './ConsentProvider'

const EXPO = [0.19, 1, 0.22, 1] as const

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (value: boolean) => void
  label: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-7 w-12 shrink-0 rounded-full border transition-colors duration-300 ${
        checked ? 'border-[#F70046] bg-[#F70046]' : 'border-white/30 bg-transparent'
      }`}
    >
      <span
        className={`absolute top-1/2 left-1 h-5 w-5 -translate-y-1/2 rounded-full bg-white transition-transform duration-500 ease-expo ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  )
}

export default function CookieBanner() {
  const { isPanelOpen } = useConsent()

  return <AnimatePresence>{isPanelOpen && <CookiePanel key="cookie-panel" />}</AnimatePresence>
}

// Monté à chaque ouverture : repart du choix enregistré, détail déplié si un choix existe déjà
function CookiePanel() {
  const { t } = useLocale()
  const { consent, save } = useConsent()
  const [showDetails, setShowDetails] = useState(consent !== null)
  const [choices, setChoices] = useState<ConsentChoices>(consent ?? { analytics: false, marketing: false })

  const c = t.consent
  const categories: { key: keyof ConsentChoices; title: string; desc: string }[] = [
    { key: 'analytics', title: c.analyticsTitle, desc: c.analyticsDesc },
    { key: 'marketing', title: c.marketingTitle, desc: c.marketingDesc },
  ]

  return (
        <motion.div
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-banner-title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: EXPO }}
          data-lenis-prevent
          className="fixed bottom-4 left-4 right-4 z-[5500] max-h-[calc(100svh-2rem)] overflow-y-auto rounded-[24px] bg-[#30041B] p-5 text-white shadow-[0_24px_80px_rgba(48,4,27,0.35)] md:bottom-6 md:left-6 md:right-auto md:w-[440px] md:p-6"
        >
          <h2 id="cookie-banner-title" className="mb-2 text-2xl font-normal leading-[1.05] tracking-tight">
            {c.title}
          </h2>
          <p className="text-[13px] leading-snug text-white/60">
            {c.description}{' '}
            <Link href="/mentions-legales#cookies" className="text-white underline underline-offset-4 hover:text-[#F70046]">
              {c.learnMore}
            </Link>
          </p>

          <AnimatePresence initial={false}>
            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.6, ease: EXPO }}
                className="overflow-hidden"
              >
                <div className="mt-4 divide-y divide-white/10 border-y border-white/10">
                  <div className="flex items-start justify-between gap-6 py-3">
                    <div>
                      <p className="text-sm font-medium">{c.necessaryTitle}</p>
                      <p className="mt-1 text-xs leading-relaxed text-white/50">{c.necessaryDesc}</p>
                    </div>
                    <span className="shrink-0 pt-1 text-xs uppercase tracking-wider text-white/40">{c.alwaysOn}</span>
                  </div>
                  {categories.map((category) => (
                    <div key={category.key} className="flex items-start justify-between gap-6 py-3">
                      <div>
                        <p className="text-sm font-medium">{category.title}</p>
                        <p className="mt-1 text-xs leading-relaxed text-white/50">{category.desc}</p>
                      </div>
                      <Toggle
                        label={category.title}
                        checked={choices[category.key]}
                        onChange={(value) => setChoices((prev) => ({ ...prev, [category.key]: value }))}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Refuser et accepter ont le même poids visuel (exigence CNIL) */}
          <div className="mt-4 flex items-center gap-2">
            <button
              type="button"
              onClick={() => (showDetails ? save(choices) : setShowDetails(true))}
              className="mr-auto text-left text-[13px] text-white/60 underline underline-offset-4 transition-colors hover:text-[#F70046]"
            >
              {showDetails ? c.saveChoices : c.customize}
            </button>
            <motion.button
              type="button"
              onClick={() => save({ analytics: false, marketing: false })}
              className="rounded-full border-2 border-white/30 px-4 py-2 text-sm font-medium text-white"
              whileHover={{ scale: 1.03, borderColor: 'rgba(255,255,255,0.8)' }}
              whileTap={{ scale: 0.97 }}
            >
              {c.reject}
            </motion.button>
            <motion.button
              type="button"
              onClick={() => save({ analytics: true, marketing: true })}
              className="rounded-full border-2 border-[#F70046] bg-[#F70046] px-4 py-2 text-sm font-medium text-white"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {c.accept}
            </motion.button>
          </div>
        </motion.div>
  )
}
