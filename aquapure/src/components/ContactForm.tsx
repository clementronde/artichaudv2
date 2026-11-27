"use client";

import { useEffect, useState, type FormEvent } from "react";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

function Field({ name, label, type = "text", autoComplete, className = "" }: { name: string; label: string; type?: string; autoComplete?: string; className?: string }) {
  return (
    <label className={`group relative block ${className}`}>
      <input
        name={name}
        type={type}
        required
        autoComplete={autoComplete}
        placeholder=" "
        className="peer w-full bg-transparent pb-[22px] text-txt text-white outline-none"
      />
      {/* Le label flotte au-dessus quand le champ est actif ou rempli */}
      <span className="pointer-events-none absolute left-0 top-0 origin-left text-txt text-white transition-all duration-500 ease-expo peer-focus:-translate-y-5 peer-focus:scale-[0.8] peer-focus:text-bleu-fluo peer-[:not(:placeholder-shown)]:-translate-y-5 peer-[:not(:placeholder-shown)]:scale-[0.8]">
        {label}
      </span>
      <span className="absolute inset-x-0 bottom-0 h-px bg-bleu-fluo/70" />
      <span className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-bleu-fluo transition-transform duration-700 ease-expo peer-focus:scale-x-100" />
    </label>
  );
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [toast, setToast] = useState(false);

  // Notification « message envoyé » : visible quelques secondes après un envoi réussi
  useEffect(() => {
    if (status !== "sent") return;
    setToast(true);
    const t = setTimeout(() => setToast(false), 5000);
    return () => clearTimeout(t);
  }, [status]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full flex-col items-start gap-[42px]">
      <div data-stagger className="flex w-full flex-col gap-[32px]">
        <div className="grid grid-cols-1 gap-[32px] sm:grid-cols-2 sm:gap-[29px]">
          <Field name="prenom" label="Prénom" autoComplete="given-name" />
          <Field name="nom" label="Nom" autoComplete="family-name" />
        </div>
        <Field name="email" label="Email" type="email" autoComplete="email" />
        <Field name="adresse" label="Adresse" autoComplete="street-address" />
        <label className="flex flex-col gap-3">
          <span className="text-txt text-white">Message</span>
          <textarea
            name="message"
            required
            rows={6}
            className="h-[168px] w-full resize-none border border-bleu-fluo bg-transparent p-4 text-txt leading-[1.3] text-white outline-none transition-[box-shadow,background-color] duration-500 focus:bg-white/[0.03] focus:shadow-[0_0_0_1px_#3cfff2]"
          />
        </label>
      </div>

      <div data-fade className="flex flex-wrap items-center gap-6">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group relative overflow-hidden rounded-[3px] bg-bleu-fluo px-[30px] py-4 text-button text-bleu-fonce disabled:opacity-70"
        >
          <span className="absolute inset-0 origin-bottom scale-y-0 bg-white transition-transform duration-500 ease-expo group-hover:scale-y-100" />
          <span className="relative block overflow-hidden">
            <span className="block transition-transform duration-500 ease-expo group-hover:-translate-y-full">
              {status === "sending" ? "Envoi…" : "Envoyer"}
            </span>
            <span aria-hidden className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-expo group-hover:translate-y-0">
              {status === "sending" ? "Envoi…" : "Envoyer"}
            </span>
          </span>
        </button>

        <p role="status" aria-live="polite" className="text-txt leading-snug text-white/80">
          {status === "sent" && "Merci ! Nous revenons vers vous très vite."}
          {status === "error" && (
            <>
              Envoi impossible pour le moment. Appelez-nous au{" "}
              <a href={PHONE_HREF} className="text-bleu-fluo underline underline-offset-4">
                {PHONE_DISPLAY}
              </a>
              .
            </>
          )}
        </p>
      </div>
      <div
        role="status"
        aria-live="polite"
        className={`fixed bottom-6 right-6 z-[60] flex w-[min(380px,calc(100vw-48px))] items-center gap-4 rounded-[8px] bg-bleu-fonce p-5 text-blanc shadow-[0_24px_60px_rgba(0,0,0,0.35)] ring-1 ring-bleu-fluo/40 transition-[transform,opacity] duration-700 ease-expo ${
          toast ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
        }`}
      >
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-bleu-fluo text-bleu-fonce" aria-hidden>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
        </span>
        <span className="flex flex-col gap-1.5">
          <span className="text-[18px] leading-none tracking-[-0.04em]">Message envoyé au plombier</span>
          <span className="text-[14px] leading-snug tracking-[-0.02em] text-blanc/70">AquaPure vous rappelle sous 30 minutes.</span>
        </span>
      </div>
    </form>
  );
}
