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

// Montant en centimes (entier), comme dans les exemples d'OpenAI ; eventId commun avec GA4 et Meta
export function trackOpenAILead(eventId: string, valueEur?: number) {
  const amount = valueEur ? { amount: Math.round(valueEur * 100), currency: "EUR" } : {}
  window.oaiq?.("measure", "lead_created", { type: "customer_action", ...amount }, { event_id: eventId })
}

export function trackOpenAIContact(method: string) {
  window.oaiq?.("measure", "custom", { type: "custom" }, { custom_event_name: `contact_click_${method}` })
}
