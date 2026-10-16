export type ConsentChoices = {
  analytics: boolean
  marketing: boolean
}

export type StoredConsent = ConsentChoices & {
  version: number
  date: number
}

export const CONSENT_STORAGE_KEY = 'arti-consent'
export const CONSENT_VERSION = 1
// La CNIL recommande de redemander le consentement au bout de 6 mois
export const CONSENT_MAX_AGE = 1000 * 60 * 60 * 24 * 182

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

// Correspondance entre nos catégories et les signaux Google Consent Mode v2
export function toGoogleConsent(choices: ConsentChoices) {
  const ads = choices.marketing ? 'granted' : 'denied'
  return {
    analytics_storage: choices.analytics ? 'granted' : 'denied',
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
  }
}

// Exécuté avant tout tag Google : tout refusé par défaut, puis choix enregistré réappliqué
export const consentDefaultsScript = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500
});
gtag('set', 'ads_data_redaction', true);
try {
  var c = JSON.parse(localStorage.getItem('${CONSENT_STORAGE_KEY}'));
  if (c && c.version === ${CONSENT_VERSION} && Date.now() - c.date <= ${CONSENT_MAX_AGE}) {
    var ads = c.marketing ? 'granted' : 'denied';
    gtag('consent', 'update', {
      analytics_storage: c.analytics ? 'granted' : 'denied',
      ad_storage: ads,
      ad_user_data: ads,
      ad_personalization: ads
    });
  }
} catch (e) {}
`
