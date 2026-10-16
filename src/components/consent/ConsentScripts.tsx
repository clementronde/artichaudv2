'use client'

import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import MetaPixel from '@/components/MetaPixel'
import { useConsent } from './ConsentProvider'

// Les traceurs ne sont chargés qu'après un consentement explicite
export default function ConsentScripts() {
  const { consent } = useConsent()

  return (
    <>
      {consent?.analytics && process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
      {consent?.analytics && process.env.NEXT_PUBLIC_GTM_ID && (
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
      )}
      {consent?.marketing && <MetaPixel />}
    </>
  )
}
