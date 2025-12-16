

import { NextRequest, NextResponse } from 'next/server'

// Types
interface FormData {
  services: string[]
  budget: string
  timeline: string
  name: string
  email: string
  company: string
  website: string
  message: string
  howFound: string
}

// Mapping des IDs vers les labels lisibles
const servicesMap: Record<string, string> = {
  branding: 'Brand Identity',
  webdesign: 'Web Design',
  webdev: 'Développement Web',
  social: 'Social Media',
  marketing: 'Webmarketing',
  photo: 'Shooting Photo & Vidéo',
}

const budgetsMap: Record<string, string> = {
  small: 'Moins de 3 000 €',
  medium: '3 000 € — 8 000 €',
  large: '8 000 € — 15 000 €',
  enterprise: 'Plus de 15 000 €',
  unknown: 'À définir ensemble',
}

const timelinesMap: Record<string, string> = {
  urgent: 'Moins d\'un mois',
  normal: '1 à 3 mois',
  relaxed: '3 à 6 mois',
  flexible: 'Pas de contrainte',
}

export async function POST(request: NextRequest) {
  try {
    const data: FormData = await request.json()

    // Validation basique
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: 'Champs requis manquants' },
        { status: 400 }
      )
    }

    // Vérifier la clé API Brevo
    const brevoApiKey = process.env.BREVO_API_KEY
    if (!brevoApiKey) {
      console.error('BREVO_API_KEY non configurée')
      return NextResponse.json(
        { error: 'Configuration serveur manquante' },
        { status: 500 }
      )
    }

    // Préparer les données lisibles
    const servicesLabels = data.services.map(s => servicesMap[s] || s).join(', ')
    const budgetLabel = budgetsMap[data.budget] || data.budget || 'Non spécifié'
    const timelineLabel = timelinesMap[data.timeline] || data.timeline || 'Non spécifié'

    // 1. ENVOYER L'EMAIL DE NOTIFICATION À L'ÉQUIPE
    const emailContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #191919; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .header { border-bottom: 2px solid #191919; padding-bottom: 20px; margin-bottom: 30px; }
    .header h1 { margin: 0; font-size: 24px; font-weight: 500; }
    .section { margin-bottom: 25px; }
    .label { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #666; margin-bottom: 5px; }
    .value { font-size: 16px; color: #191919; }
    .message-box { background: #f5f5f5; padding: 20px; border-radius: 8px; margin-top: 10px; }
    .footer { border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px; font-size: 12px; color: #999; }
    .badge { display: inline-block; background: #191919; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; margin-right: 5px; margin-bottom: 5px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Nouvelle demande de projet</h1>
    </div>
    
    <div class="section">
      <div class="label">Contact</div>
      <div class="value"><strong>${data.name}</strong></div>
      <div class="value">${data.email}</div>
      ${data.company ? `<div class="value">${data.company}</div>` : ''}
      ${data.website ? `<div class="value"><a href="${data.website}">${data.website}</a></div>` : ''}
    </div>

    <div class="section">
      <div class="label">Services demandés</div>
      <div class="value">
        ${data.services.map(s => `<span class="badge">${servicesMap[s] || s}</span>`).join('')}
      </div>
    </div>

    <div class="section">
      <div class="label">Budget</div>
      <div class="value">${budgetLabel}</div>
    </div>

    <div class="section">
      <div class="label">Délai souhaité</div>
      <div class="value">${timelineLabel}</div>
    </div>

    <div class="section">
      <div class="label">Description du projet</div>
      <div class="message-box">${data.message.replace(/\n/g, '<br>')}</div>
    </div>

    ${data.howFound ? `
    <div class="section">
      <div class="label">Source</div>
      <div class="value">${data.howFound}</div>
    </div>
    ` : ''}

    <div class="footer">
      Envoyé depuis le formulaire de contact artichaud-studio.com
    </div>
  </div>
</body>
</html>
    `

    // Appel API Brevo pour envoyer l'email
    const emailResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': brevoApiKey,
      },
      body: JSON.stringify({
        sender: {
          name: 'Artichaud Studio',
          email: process.env.BREVO_SENDER_EMAIL || 'noreply@artichaud-studio.com',
        },
        to: [
          {
            email: process.env.CONTACT_EMAIL || 'artichaud.studio@gmail.com',
            name: 'Artichaud Studio',
          },
        ],
        replyTo: {
          email: data.email,
          name: data.name,
        },
        subject: `[Nouveau projet] ${data.name} - ${servicesLabels.split(',')[0]}`,
        htmlContent: emailContent,
      }),
    })

    if (!emailResponse.ok) {
      const errorData = await emailResponse.json()
      console.error('Erreur Brevo email:', errorData)
      throw new Error('Erreur envoi email')
    }

    // 2. AJOUTER LE CONTACT À LA LISTE BREVO (optionnel)
    const listId = process.env.BREVO_LIST_ID
    if (listId) {
      try {
        await fetch('https://api.brevo.com/v3/contacts', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'api-key': brevoApiKey,
          },
          body: JSON.stringify({
            email: data.email,
            attributes: {
              NOM: data.name,
              ENTREPRISE: data.company || '',
              SERVICES: servicesLabels,
              BUDGET: budgetLabel,
              SOURCE: data.howFound || 'Formulaire contact',
            },
            listIds: [parseInt(listId)],
            updateEnabled: true, // Met à jour si le contact existe déjà
          }),
        })
      } catch (contactError) {
        // On log l'erreur mais on ne bloque pas le processus
        console.error('Erreur ajout contact Brevo:', contactError)
      }
    }

    // 3. ENVOYER UN EMAIL DE CONFIRMATION AU CLIENT (optionnel)
    if (process.env.SEND_CONFIRMATION_EMAIL === 'true') {
      const confirmationContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #191919; background: #f9f9f9; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .card { background: white; border-radius: 16px; padding: 40px; }
    .logo { font-size: 24px; font-weight: 700; margin-bottom: 30px; }
    h1 { font-size: 28px; font-weight: 500; margin: 0 0 20px 0; }
    p { color: #666; margin: 0 0 15px 0; }
    .recap { background: #f5f5f5; border-radius: 12px; padding: 20px; margin: 25px 0; }
    .recap-item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
    .recap-item:last-child { border-bottom: none; }
    .recap-label { color: #999; font-size: 14px; }
    .recap-value { font-weight: 500; font-size: 14px; }
    .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #999; }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div class="logo">Artichaud.</div>
      
      <h1>Merci ${data.name.split(' ')[0]} !</h1>
      
      <p>
        Nous avons bien reçu votre demande et nous en sommes ravis.
        Notre équipe va l'étudier avec attention et reviendra vers vous
        sous 24 à 48 heures.
      </p>

      <div class="recap">
        <div class="recap-item">
          <span class="recap-label">Services</span>
          <span class="recap-value">${servicesLabels}</span>
        </div>
        <div class="recap-item">
          <span class="recap-label">Budget</span>
          <span class="recap-value">${budgetLabel}</span>
        </div>
        <div class="recap-item">
          <span class="recap-label">Délai</span>
          <span class="recap-value">${timelineLabel}</span>
        </div>
      </div>

      <p>
        D'ici là, n'hésitez pas à consulter nos dernières réalisations
        sur <a href="https://artichaud-studio.com/works" style="color: #191919;">notre portfolio</a>.
      </p>

      <p style="margin-top: 25px;">
        À très vite,<br>
        <strong>L'équipe Artichaud</strong>
      </p>
      
      <div class="footer">
        Artichaud Studio — Agence Web & Branding Paris<br>
        <a href="https://artichaud-studio.com" style="color: #999;">artichaud-studio.com</a>
      </div>
    </div>
  </div>
</body>
</html>
      `

      try {
        await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'api-key': brevoApiKey,
          },
          body: JSON.stringify({
            sender: {
              name: 'Artichaud Studio',
              email: process.env.BREVO_SENDER_EMAIL || 'noreply@artichaud-studio.com',
            },
            to: [
              {
                email: data.email,
                name: data.name,
              },
            ],
            subject: 'Votre demande a bien été reçue — Artichaud Studio',
            htmlContent: confirmationContent,
          }),
        })
      } catch (confirmError) {
        console.error('Erreur email confirmation:', confirmError)
      }
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Erreur API contact:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}