'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { GoogleAnalytics } from '@next/third-parties/google'
import { toGoogleConsent } from '@/lib/consent'
import { trackEvent } from '@/lib/tracking'
import { useConsent } from './ConsentProvider'

// GA et GTM se chargent toujours en Consent Mode v2 (refusé par défaut, voir consentDefaultsScript).
// Le pixel Meta est géré dans GTM et n'y est déclenché qu'avec le consentement ad_storage.
export default function ConsentScripts() {
  const { consent, ready } = useConsent()
  const pathname = usePathname()
  const isFirstPath = useRef(true)
  const hadMarketing = useRef<boolean | null>(null)

  useEffect(() => {
    if (!ready) return
    if (consent) window.gtag?.('consent', 'update', toGoogleConsent(consent))

    const marketing = Boolean(consent?.marketing)
    // Accord donné en cours de visite : la page vue n'a pas pu être envoyée au chargement
    if (hadMarketing.current === false && marketing) trackEvent('page_view')
    hadMarketing.current = marketing
  }, [consent, ready])

  // Navigation côté client : GTM ne voit que le premier chargement (DOM prêt)
  useEffect(() => {
    if (isFirstPath.current) {
      isFirstPath.current = false
      return
    }
    trackEvent('page_view')
  }, [pathname])

  return (
    <>
      {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
      {process.env.NEXT_PUBLIC_GTM_ID && (
        // GTM chargé via le Google tag gateway (/metrics, relayé par src/proxy.ts)
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'/metrics/?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');`}
        </Script>
      )}
    </>
  )
}
