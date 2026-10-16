type EventParams = Record<string, string | number | undefined>

// Événement poussé dans le dataLayer, repris par les déclencheurs GTM (comme generate_lead)
export function trackEvent(event: string, params: EventParams = {}) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...params })
}

// Événement Meta : n'est envoyé que si le pixel est chargé, donc après consentement marketing
export function trackMetaEvent(event: string, params: EventParams = {}, custom = false) {
  window.fbq?.(custom ? 'trackCustom' : 'track', event, params)
}
