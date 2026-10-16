'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/lib/tracking'

// Suit les clics sur les liens email et téléphone de tout le site
export default function ContactClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = e.target instanceof Element ? e.target.closest('a[href^="mailto:"], a[href^="tel:"]') : null
      if (!link) return
      const method = link.getAttribute('href')?.startsWith('mailto:') ? 'email' : 'phone'

      trackEvent('contact_click', { method, page_path: window.location.pathname })
    }

    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [])

  return null
}
