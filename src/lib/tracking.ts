type EventParams = Record<string, string | number | undefined>

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

// Événement poussé dans le dataLayer : GTM le relaie à GA4 et au pixel Meta (soumis au consentement)
export function trackEvent(event: string, params: EventParams = {}) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...params })
}

// Événement standard du pixel Meta. fbq n'existe que si GTM a chargé le pixel, donc avec le consentement marketing.
// eventId permet à Meta de dédupliquer avec l'événement envoyé par l'API Conversions.
export function trackMetaEvent(event: 'Lead' | 'Contact', params: EventParams = {}, eventId?: string) {
  window.fbq?.('track', event, params, eventId ? { eventID: eventId } : undefined)
}

// Cookies du pixel, transmis à l'API Conversions pour rattacher le lead au clic sur la pub
export function getMetaCookies() {
  const read = (name: string) => document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))?.[1]
  return { fbp: read('_fbp'), fbc: read('_fbc') }
}
