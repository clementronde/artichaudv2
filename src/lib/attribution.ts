// Attribution des leads : paramètres UTM de la visite, conservés pour la session (le visiteur peut naviguer avant d'écrire)

export const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const
// Identifiants de clic Google Ads (auto-tagging) : affichés dans l'email de lead pour l'import des conversions hors ligne
export const CLICK_ID_KEYS = ['gclid', 'gbraid', 'wbraid'] as const
// Identifiant de clic des publicités ChatGPT (OpenAI Ads)
export const OPENAI_CLICK_ID_KEY = 'oppref'
const ATTRIBUTION_KEYS = [...UTM_KEYS, ...CLICK_ID_KEYS, OPENAI_CLICK_ID_KEY] as const

export type Attribution = Partial<Record<(typeof ATTRIBUTION_KEYS)[number], string>>

const STORAGE_KEY = 'arti-utm'
const MAX_LENGTH = 200

// Valeurs bornées : seules les clés connues sont gardées, tronquées
export function sanitizeAttribution(input: unknown): Attribution {
  const result: Attribution = {}
  if (!input || typeof input !== 'object') return result
  for (const key of ATTRIBUTION_KEYS) {
    const value = (input as Record<string, unknown>)[key]
    if (typeof value === 'string' && value.trim()) result[key] = value.trim().slice(0, MAX_LENGTH)
  }
  return result
}

// À l'arrivée : une nouvelle campagne dans l'URL remplace la précédente
export function captureAttribution() {
  const params = new URLSearchParams(window.location.search)
  const fromUrl = sanitizeAttribution(Object.fromEntries(ATTRIBUTION_KEYS.map(key => [key, params.get(key) ?? ''])))
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

// Régie publicitaire de la visite : la source UTM, sinon la régie déduite de l'identifiant de clic présent
export function adSource(attribution: Attribution): string | undefined {
  if (attribution.utm_source) return attribution.utm_source
  if (attribution[OPENAI_CLICK_ID_KEY]) return 'chatgpt ads'
  return CLICK_ID_KEYS.some((key) => attribution[key]) ? 'google ads' : undefined
}
