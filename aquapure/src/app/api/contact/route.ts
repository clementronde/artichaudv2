import { NextResponse } from "next/server";

const FIELDS = ["prenom", "nom", "email", "adresse", "message"] as const;

/**
 * Reçoit les demandes d'estimation.
 * Pour recevoir les messages, définir CONTACT_WEBHOOK_URL (Make, Zapier, n8n, Slack, Formspree…) :
 * la demande y est transmise en JSON. Sans cette variable, la route renvoie 503 et
 * le formulaire invite à appeler directement.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const data = Object.fromEntries(FIELDS.map((f) => [f, String(body[f] ?? "").trim().slice(0, 4000)]));
  if (FIELDS.some((f) => !data[f]) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return NextResponse.json({ error: "Champs manquants ou invalides" }, { status: 422 });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ error: "Réception des messages non configurée" }, { status: 503 });
  }

  const res = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, source: "aquapure-site", date: new Date().toISOString() }),
  });

  return res.ok
    ? NextResponse.json({ ok: true })
    : NextResponse.json({ error: "Échec de transmission" }, { status: 502 });
}
