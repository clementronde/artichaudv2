// Conversions Google Ads des landings métier, envoyées par la balise Google (gtag) chargée dans ConsentScripts.
// Le Consent Mode v2 (consentDefaultsScript) s'applique : sans accord marketing, Google ne reçoit qu'un signal sans cookie.

export const GOOGLE_ADS_ID = "AW-18529000864"
const LEAD_LABEL = "bbmZCL6_j6cdEKC7qINF" // conversion « Formulaire landing »
const WHATSAPP_LABEL = "GrmPCLnAj6cdEKC7qINF" // conversion « Clic WhatsApp »

// Conversions améliorées (e-mail et téléphone du lead) : à passer à true seulement après avoir accepté,
// dans Google Ads, les conditions sur les données client
export const ENHANCED_CONVERSIONS = false

export type AdsUserData = { email: string; phone_number?: string }

function sendConversion(label: string) {
  window.gtag?.('event', 'conversion', { send_to: `${GOOGLE_ADS_ID}/${label}`, value: 1.0, currency: 'EUR' })
}

// Formulaire envoyé avec succès (jamais au simple clic) ; coordonnées transmises si le visiteur l'a accepté
export function trackAdsLead(userData?: AdsUserData) {
  if (ENHANCED_CONVERSIONS && userData) window.gtag?.('set', 'user_data', userData)
  sendConversion(LEAD_LABEL)
}

export function trackAdsWhatsApp() {
  sendConversion(WHATSAPP_LABEL)
}
