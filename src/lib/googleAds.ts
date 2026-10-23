// Conversions Google Ads des landings métier, envoyées par la balise Google (gtag) chargée dans ConsentScripts.
// Le Consent Mode v2 (consentDefaultsScript) s'applique : sans accord marketing, Google ne reçoit qu'un signal sans cookie.

export const GOOGLE_ADS_ID = "AW-18529000864"
const LEAD_LABEL = "bbmZCL6_j6cdEKC7qINF" // conversion « Formulaire landing »
const WHATSAPP_LABEL = "GrmPCLnAj6cdEKC7qINF" // conversion « Clic WhatsApp »

// Conversions améliorées (méthode « extrait de code » de Google) : e-mail et téléphone du lead, non hachés,
// normalisés (minuscules, E.164) ; Google les hache avant envoi. Conditions acceptées dans Google Ads, méthode « Balise Google »
export const ENHANCED_CONVERSIONS = true

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
