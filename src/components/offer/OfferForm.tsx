'use client'

import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'
import { sendGTMEvent } from '@next/third-parties/google'
import { offers } from '@/data/offers'
import { OFFER_PHONE, type OfferPage } from '@/data/offerPages'
import { trackMetaEvent, getMetaCookies } from '@/lib/tracking'
import { trackOpenAILead } from '@/lib/openaiAds'
import { adSource, captureAttribution, getAttribution, type Attribution } from '@/lib/attribution'
import { useConsent } from '@/components/consent/ConsentProvider'
import type { AdsUserData } from '@/lib/googleAds'

// Champs encadrés et libellés foncés : le formulaire doit se lire sans effort, y compris sur mobile
const fieldClass = `w-full rounded-[10px] border border-black/15 bg-white px-4 py-3.5 text-base text-arti-black placeholder:text-black/35
  transition-colors focus:border-[#411120] focus:outline-none focus:ring-1 focus:ring-[#411120]`
const labelClass = 'text-sm font-medium text-arti-black'

// Téléphone au format international attendu par les conversions améliorées Google Ads (06… → +336…)
function toE164(phone: string) {
  const digits = phone.replace(/[^\d+]/g, '')
  if (digits.startsWith('+')) return digits
  if (digits.startsWith('00')) return `+${digits.slice(2)}`
  if (digits.startsWith('0') && digits.length === 10) return `+33${digits.slice(1)}`
  return undefined
}

// Formulaire court des pages offre : une seule étape, l'offre est déjà connue.
// Même API, même anti-spam et même suivi (Lead pixel + API Conversions) que la page contact.
// Seuls l'offre, le slug et le deuxième champ servent : réutilisable hors des pages /offre (landing restaurant)
type OfferFormPage = Pick<OfferPage, 'slug' | 'offerId'> & { form: Pick<OfferPage['form'], 'secondField'> }

// messageOptional : le message n'est plus exigé (landings métier) ; l'API en reçoit un par défaut.
// onLead : appelé une fois la demande bien reçue (conversion Google Ads des landings), avec les coordonnées si le consentement marketing est donné
type OfferFormProps = { page: OfferFormPage; messageOptional?: boolean; onLead?: (userData?: AdsUserData) => void }

export default function OfferForm({ page, messageOptional = false, onLead }: OfferFormProps) {
  const offer = offers[page.offerId]
  const { consent } = useConsent()
  const { secondField } = page.form

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [second, setSecond] = useState('')
  // Champ vide : l'exemple est en placeholder pour inviter à écrire son propre message
  const [message, setMessage] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [attribution, setAttribution] = useState<Attribution>({})

  const [turnstileReady, setTurnstileReady] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState('')
  const [turnstileError, setTurnstileError] = useState(false)
  const turnstileContainerRef = useRef<HTMLDivElement>(null)
  const turnstileWidgetId = useRef<string | null>(null)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  useEffect(() => {
    // Capture ici aussi : l'effet du tracker global s'exécute après celui de la page
    captureAttribution()
    setAttribution(getAttribution())
  }, [])

  useEffect(() => {
    if (isSubmitted || !turnstileReady || turnstileWidgetId.current) return
    const sitekey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
    if (!sitekey || !turnstileContainerRef.current || !window.turnstile) return

    turnstileWidgetId.current = window.turnstile.render(turnstileContainerRef.current, {
      sitekey,
      callback: (token: string) => {
        setTurnstileToken(token)
        setTurnstileError(false)
      },
      'expired-callback': () => setTurnstileToken(''),
    })
  }, [isSubmitted, turnstileReady])

  // Navigateurs intégrés (Instagram, Facebook) : si l'anti-spam ne répond pas, on le dit et on propose l'appel
  useEffect(() => {
    if (turnstileToken || isSubmitted) return
    const timer = setTimeout(() => setTurnstileError(true), 15000)
    return () => clearTimeout(timer)
  }, [turnstileToken, isSubmitted])

  const emailValid =/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const missing = [
    !name.trim() && 'votre nom',
    !emailValid && 'un email valide',
    !messageOptional && !message.trim() && 'un message',
  ].filter(Boolean) as string[]
  const canSubmit = missing.length === 0 && Boolean(turnstileToken) && !isSubmitting

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (missing.length > 0) return
    if (!turnstileToken) {
      setTurnstileError(true)
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    // Identifiant commun au pixel et à l'API Conversions, pour que Meta ne compte le lead qu'une fois
    const eventId = crypto.randomUUID()
    const marketingConsent = Boolean(consent?.marketing)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          services: offer.services,
          budget: offer.budget ?? '',
          timeline: '',
          name,
          email,
          phone,
          company: secondField.key === 'company' ? second : '',
          website: secondField.key === 'website' ? second : '',
          message: message.trim() || 'Pas de message laissé.',
          howFound: adSource(attribution) ? `Publicité (${adSource(attribution)})` : `Page offre ${page.slug}`,
          offer: page.offerId,
          attribution,
          hp: honeypot,
          turnstileToken,
          meta: marketingConsent
            ? { eventId, sourceUrl: window.location.href, ...getMetaCookies() }
            : undefined,
        }),
      })

      const data = await response.json().catch(() => null) as { error?: string } | null
      if (!response.ok) throw new Error(data?.error || "Erreur lors de l'envoi")

      setIsSubmitted(true)
      // Valeur = prix de l'offre, pour que Google Ads optimise sur la valeur des leads ;
      // coordonnées pour les conversions améliorées, transmises seulement avec le consentement marketing
      const value = offer.value ? { value: offer.value, currency: 'EUR' } : {}
      const phoneNumber = toE164(phone)
      const userData: AdsUserData | undefined = marketingConsent
        ? { email: email.trim().toLowerCase(), ...(phoneNumber && { phone_number: phoneNumber }) }
        : undefined
      sendGTMEvent({
        event: 'generate_lead',
        event_category: 'offer_form',
        event_label: offer.services.join(', '),
        budget: offer.budget,
        offer: page.offerId,
        event_id: eventId,
        ...value,
        ...(userData && { user_data: userData }),
      })
      onLead?.(userData)
      trackMetaEvent('Lead', { content_name: page.offerId, content_category: offer.services.join(', '), ...value }, eventId)
      trackOpenAILead(eventId, offer.value)
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? `${error.message} Vous pouvez aussi nous appeler au ${OFFER_PHONE.label}.`
          : `Une erreur est survenue. Vous pouvez aussi nous appeler au ${OFFER_PHONE.label}.`
      )
      if (turnstileWidgetId.current && window.turnstile) window.turnstile.reset(turnstileWidgetId.current)
      setTurnstileToken('')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col gap-4" role="status">
        <span className="text-sm text-[#767676]">Demande envoyée</span>
        <p className="text-[28px] md:text-[34px] leading-[1.3] text-arti-black">
          Merci {name.split(' ')[0]}, on a bien reçu votre demande.
        </p>
        <p className="text-base leading-[1.4] text-[#767676]">
          On revient vers vous rapidement. Si c’est urgent, appelez-nous au{' '}
          <a href={OFFER_PHONE.href} className="text-arti-black underline underline-offset-4">{OFFER_PHONE.label}</a>.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
        onReady={() => setTurnstileReady(true)}
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-5">
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Nom et prénom *</span>
          <input className={fieldClass} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="Camille Martin" required />
        </label>
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Email *</span>
          <input className={fieldClass} type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" placeholder="camille@exemple.fr" required />
        </label>
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Téléphone, pour qu’on vous rappelle</span>
          <input className={fieldClass} type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" placeholder="06 12 34 56 78" />
        </label>
        <label className="flex flex-col gap-2">
          <span className={labelClass}>{secondField.label}</span>
          <input
            className={fieldClass}
            type={secondField.key === 'website' ? 'url' : 'text'}
            value={second}
            onChange={(e) => setSecond(e.target.value)}
            autoComplete={secondField.key === 'website' ? 'url' : 'organization'}
            placeholder={secondField.placeholder}
          />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className={labelClass}>{messageOptional ? 'Votre message (facultatif)' : 'Votre message *'}</span>
        <textarea
          className={`${fieldClass} min-h-[110px] resize-none`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={offer.message?.fr}
          required={!messageOptional}
        />
      </label>

      {/* Honeypot anti-bot : invisible et ignoré par les humains */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 0, height: 0, overflow: 'hidden' }}>
        <label htmlFor={`hp-${page.slug}`}>Ne pas remplir ce champ</label>
        <input id={`hp-${page.slug}`} type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>

      <div ref={turnstileContainerRef} />

      <div className="flex flex-col gap-3">
        <button
          type="submit"
          disabled={!canSubmit}
          className={`inline-flex min-h-14 items-center justify-center gap-2 self-start rounded-full px-8 text-base font-bold transition-colors duration-300
            ${canSubmit ? 'bg-[#F70046] text-white hover:bg-[#411120]' : 'cursor-not-allowed bg-black/10 text-black/40'}`}
        >
          <span aria-hidden="true">→</span>
          {isSubmitting ? 'Envoi…' : 'Recevoir mon devis gratuit'}
        </button>

        {/* Le bouton grisé dit ce qui manque, au lieu de laisser deviner */}
        {missing.length > 0 && (
          <p className="text-sm text-[#767676]">Il manque {missing.join(', ')}.</p>
        )}
        {missing.length === 0 && !turnstileToken && (
          <p className="text-sm text-[#767676]">
            {turnstileError
              ? `La vérification anti-spam n’a pas abouti. Réessayez ou appelez-nous au ${OFFER_PHONE.label}.`
              : 'Vérification anti-spam en cours…'}
          </p>
        )}
        {submitError && <p className="text-sm text-[#F70046]" role="alert">{submitError}</p>}
      </div>
    </form>
  )
}
