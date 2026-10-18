// Attribution des leads : paramètres UTM de la visite, conservés pour la session (le visiteur peut naviguer avant d'écrire)

export const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const

export type Attribution = Partial<Record<(typeof UTM_KEYS)[number], string>>

const STORAGE_KEY = 'arti-utm'
const MAX_LENGTH = 120

// Valeurs bornées : seules les clés connues sont gardées, tronquées
export function sanitizeAttribution(input: unknown): Attribution {
  const result: Attribution = {}
  if (!input || typeof input !== 'object') return result
  for (const key of UTM_KEYS) {
    const value = (input as Record<string, unknown>)[key]
    if (typeof value === 'string' && value.trim()) result[key] = value.trim().slice(0, MAX_LENGTH)
  }
  return result
}

// À l'arrivée : une nouvelle campagne dans l'URL remplace la précédente
export function captureAttribution() {
  const params = new URLSearchParams(window.location.search)
  const fromUrl = sanitizeAttribution(Object.fromEntries(UTM_KEYS.map(key => [key, params.get(key) ?? ''])))
  if (Object.keys(fromUrl).length === 0) return
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl))
  } catch {}
}

export function getAttribution(): Attribution {
  try {
    return sanitizeAttribution(JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? 'null'))
  } catch {
    return {}
  }
}
