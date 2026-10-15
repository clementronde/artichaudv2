import Link from 'next/link';

interface ContactCTAProps {
  /** "devis" met en avant un devis gratuit, "appel" un appel découverte gratuit */
  variant?: 'devis' | 'appel';
}

const CONTENT = {
  devis: {
    eyebrow: 'Devis gratuit',
    title: 'Un projet en tête ? Obtenez votre devis gratuit, sans engagement.',
    text: "On étudie votre besoin et on vous répond avec un chiffrage clair, sous 48h.",
    cta: 'Demander mon devis gratuit',
  },
  appel: {
    eyebrow: 'Appel découverte',
    title: 'Un doute sur votre projet ? Réservez un appel découverte gratuit, sans engagement.',
    text: '30 minutes pour faire le point sur votre site, vos objectifs et la meilleure approche.',
    cta: 'Réserver mon appel gratuit',
  },
} as const;

export default function ContactCTA({ variant = 'devis' }: ContactCTAProps) {
  const content = CONTENT[variant];

  return (
    <div
      className="not-prose my-10 rounded-2xl border border-[#F70046]/20 bg-[#FDF4E7] p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6 md:gap-8"
    >
      <div className="flex-1">
        <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#F70046] mb-2">
          {content.eyebrow} · Sans engagement
        </span>
        <h3 className="text-xl md:text-2xl font-bold text-arti-black leading-snug mb-2">
          {content.title}
        </h3>
        <p className="text-gray-600 text-base leading-relaxed">
          {content.text}
        </p>
      </div>
      <Link
        href="/contact"
        suppressHydrationWarning
        className="group inline-flex items-center justify-center gap-2 bg-[#F70046] text-white px-6 py-4 rounded-full font-bold whitespace-nowrap hover:bg-[#d4003c] transition-colors duration-300 shrink-0"
      >
        <span>{content.cta}</span>
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </Link>
    </div>
  );
}
