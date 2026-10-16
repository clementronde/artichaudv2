'use client'

import { createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore, ReactNode } from 'react'
import {
  CONSENT_MAX_AGE,
  CONSENT_STORAGE_KEY as STORAGE_KEY,
  CONSENT_VERSION,
  type ConsentChoices,
  type StoredConsent,
} from '@/lib/consent'

export type { ConsentChoices }


interface ConsentContextValue {
  // null tant que le visiteur n'a pas fait de choix (ou avant hydratation)
  consent: ConsentChoices | null
  ready: boolean
  isPanelOpen: boolean
  save: (choices: ConsentChoices) => void
  openPreferences: () => void
}

const ConsentContext = createContext<ConsentContextValue | null>(null)

// Petit store autour du localStorage, avec repli mémoire si le stockage est bloqué
const listeners = new Set<() => void>()
let memoryValue: string | null = null

function readRaw(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? memoryValue
  } catch {
    return memoryValue
  }
}

function writeRaw(value: string) {
  memoryValue = value
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    // Stockage indisponible (navigation privée) : le choix vaut pour la session en cours
  }
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  window.addEventListener('storage', listener)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('storage', listener)
  }
}

function parseConsent(raw: string | null): ConsentChoices | null {
  if (!raw) return null
  try {
    const stored = JSON.parse(raw) as StoredConsent
    if (stored.version !== CONSENT_VERSION || Date.now() - stored.date > CONSENT_MAX_AGE) return null
    return { analytics: Boolean(stored.analytics), marketing: Boolean(stored.marketing) }
  } catch {
    return null
  }
}

// Supprime les cookies déposés par les traceurs lors d'un retrait de consentement
function clearCookies(prefixes: string[]) {
  const host = location.hostname
  const domains = ['', host, `.${host}`, `.${host.split('.').slice(-2).join('.')}`]
  document.cookie.split(';').forEach((cookie) => {
    const name = cookie.split('=')[0].trim()
    if (!prefixes.some((prefix) => name.startsWith(prefix))) return
    domains.forEach((domain) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain ? `; domain=${domain}` : ''}`
    })
  })
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  // undefined côté serveur et pendant l'hydratation : on n'affiche rien avant de connaître le choix
  const raw = useSyncExternalStore(subscribe, readRaw, () => undefined)
  const ready = raw !== undefined
  const consent = useMemo(() => (raw === undefined ? null : parseConsent(raw)), [raw])
  const [manualOpen, setManualOpen] = useState(false)
  const isPanelOpen = ready && (consent === null || manualOpen)

  const save = useCallback((choices: ConsentChoices) => {
    const previous = consent
    writeRaw(JSON.stringify({ ...choices, version: CONSENT_VERSION, date: Date.now() } satisfies StoredConsent))
    setManualOpen(false)

    // Un script déjà chargé ne peut pas être déchargé : on nettoie et on recharge la page
    const revokedAnalytics = previous?.analytics && !choices.analytics
    const revokedMarketing = previous?.marketing && !choices.marketing
    if (revokedAnalytics || revokedMarketing) {
      if (revokedAnalytics) clearCookies(['_ga', '_gid', '_gat'])
      if (revokedMarketing) clearCookies(['_fbp', '_fbc'])
      window.location.reload()
    }
  }, [consent])

  const openPreferences = useCallback(() => setManualOpen(true), [])

  return (
    <ConsentContext.Provider value={{ consent, ready, isPanelOpen, save, openPreferences }}>
      {children}
    </ConsentContext.Provider>
  )
}

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext)
  if (!ctx) throw new Error('useConsent doit être utilisé dans un ConsentProvider')
  return ctx
}
