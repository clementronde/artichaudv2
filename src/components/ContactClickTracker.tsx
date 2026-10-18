'use client'

import { useEffect } from 'react'
import { trackEvent, trackMetaEvent } from '@/lib/tracking'
import { captureAttribution } from '@/lib/attribution'

// Suit les clics sur les liens email, téléphone et WhatsApp de tout le site, et garde les UTM de la visite
export default function ContactClickTracker() {
  useEffect(() => {
    captureAttribution()

    const onClick = (e: MouseEvent) => {
      const link = e.target instanceof Element ? e.target.closest('a[href^="mailto:"], a[href^="tel:"], a[href^="https://wa.me/"]') : null
      if (!link) return
      const href = link.getAttribute('href') ?? ''
      const method = href.startsWith('mailto:') ? 'email' : href.startsWith('tel:') ? 'phone' : 'whatsapp'

      trackEvent('contact_click', { method, page_path: window.location.pathname })
      trackMetaEvent('Contact', { content_category: method })
    }

    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [])

  return null
}
