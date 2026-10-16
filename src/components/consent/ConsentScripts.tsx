'use client'

import { useEffect } from 'react'
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import MetaPixel from '@/components/MetaPixel'
import { toGoogleConsent } from '@/lib/consent'
import { useConsent } from './ConsentProvider'

// Les tags Google se chargent toujours en Consent Mode v2 (refusé par défaut, voir ConsentDefaults) ;
// le pixel Meta, lui, n'est chargé qu'après un consentement marketing explicite
export default function ConsentScripts() {
  const { consent } = useConsent()

  useEffect(() => {
    if (consent) window.gtag?.('consent', 'update', toGoogleConsent(consent))
  }, [consent])

  return (
    <>
      {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
      {process.env.NEXT_PUBLIC_GTM_ID && <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />}
      {consent?.marketing && <MetaPixel />}
    </>
  )
}
