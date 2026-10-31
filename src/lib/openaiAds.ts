// Pixel de mesure des publicités ChatGPT (https://developers.openai.com/ads/measurement-pixel), chargé dans ConsentScripts
// uniquement avec le consentement marketing. Le pixel lit seul le paramètre oppref de l'URL d'arrivée (clic sur la pub).

export const OPENAI_PIXEL_ID = "1gmzHzwKTEhnhHUPW86Nyj"

declare global {
  interface Window {
    oaiq?: (...args: unknown[]) => void
  }
}

// Extrait d'installation fourni par OpenAI, suivi de l'initialisation
export const openaiPixelScript = `(function (w, d, s, u) {
  if (w.oaiq) return;
  var q = function () { q.q.push(arguments); };
  q.q = [];
  w.oaiq = q;
  var js = d.createElement(s);
  js.async = true;
  js.src = u;
  var f = d.getElementsByTagName(s)[0];
  f.parentNode.insertBefore(js, f);
})(window, document, "script", "https://bzrcdn.openai.com/sdk/oaiq.min.js");
oaiq("init", { pixelId: "${OPENAI_PIXEL_ID}" });
oaiq("measure", "page_viewed", { type: "contents", contents: [{ id: location.pathname, name: location.pathname, content_type: "page" }] });`

// oaiq n'existe qu'une fois le pixel chargé, donc avec le consentement marketing
export function trackOpenAIPageView(path: string) {
  window.oaiq?.("measure", "page_viewed", { type: "contents", contents: [{ id: path, name: path, content_type: "page" }] })
}

export type OpenAILeadUser = { email: string; phone?: string; name?: string }

async function sha256(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value))
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("")
}

// Téléphone normalisé selon OpenAI : chiffres seuls avec indicatif, sans + ni zéros de tête (06… → 336…)
function normalizePhone(value: string) {
  const digits = value.replace(/[^\d+]/g, "")
  const international = digits.startsWith("+") || digits.startsWith("00")
  const withCountry = international ? digits.replace(/^\+|^00/, "") : digits.replace(/^0/, "33")
  const normalized = withCountry.replace(/^0+/, "")
  return /^\d{8,15}$/.test(normalized) ? normalized : undefined
}

// Nom en minuscules, sans espaces ni ponctuation ASCII ; les accents sont conservés
const normalizeName = (value: string) => value.toLowerCase().replace(/[\s!-/:-@[-`{-~]/g, "")

// Coordonnées hachées (SHA-256) passées au pixel par un nouvel init, pour rapprocher le lead d'un clic sur la pub
async function identifyOpenAIUser({ email, phone, name }: OpenAILeadUser) {
  const phoneNumber = phone ? normalizePhone(phone) : undefined
  // Champ nom unique : premier mot = prénom, le reste = nom de famille
  const [firstName, ...lastName] = (name ?? "").trim().split(/\s+/)
  const first = firstName ? normalizeName(firstName) : ""
  const last = normalizeName(lastName.join(""))
  const [email_sha256, phone_number_sha256, first_name_sha256, last_name_sha256] = await Promise.all([
    sha256(email.trim().toLowerCase()),
    phoneNumber ? sha256(phoneNumber) : undefined,
    first && last ? sha256(first) : undefined,
    first && last ? sha256(last) : undefined,
  ])
  window.oaiq?.("init", {
    pixelId: OPENAI_PIXEL_ID,
    user: { email_sha256, phone_number_sha256, first_name_sha256, last_name_sha256 },
  })
}

// Montant en centimes (entier), comme dans les exemples d'OpenAI ; eventId commun avec GA4 et Meta
export async function trackOpenAILead(eventId: string, valueEur?: number, user?: OpenAILeadUser) {
  if (!window.oaiq) return
  if (user) await identifyOpenAIUser(user).catch(() => {})
  const amount = valueEur ? { amount: Math.round(valueEur * 100), currency: "EUR" } : {}
  window.oaiq?.("measure", "lead_created", { type: "customer_action", ...amount }, { event_id: eventId })
}

export function trackOpenAIContact(method: string) {
  window.oaiq?.("measure", "custom", { type: "custom" }, { custom_event_name: `contact_click_${method}` })
}
