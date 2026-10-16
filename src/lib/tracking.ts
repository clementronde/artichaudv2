type EventParams = Record<string, string | number | undefined>

// Événement poussé dans le dataLayer : GTM le relaie à GA4 et au pixel Meta (soumis au consentement)
export function trackEvent(event: string, params: EventParams = {}) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...params })
}
