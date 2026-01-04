import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentions Légales | Artichaud Studio',
  description: 'Mentions légales, politique de confidentialité et conditions d\'utilisation du site Artichaud Studio.',
  robots: {
    index: true, // On veut que Google indexe cette page pour la confiance
    follow: true,
  },
};

export default function MentionsLegales() {
  return (
    <main className="bg-black text-white min-h-screen px-6 py-24 md:py-32">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* En-tête sémantique pour Google */}
        <header className="space-y-4 border-b border-white/20 pb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#D0FF00]">
            Mentions Légales
          </h1>
          <p className="text-white/60 text-lg">
            En vigueur au {new Date().toLocaleDateString('fr-FR')}
          </p>
        </header>

        {/* Contenu structuré */}
        <section className="space-y-6">
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">1. Éditeur du site</h2>
            <p className="text-white/80 leading-relaxed">
              Le site internet <strong>Artichaud Studio</strong> est édité par :<br />
              <strong>Nom de la société / Indépendant :</strong> Artichaud Studio<br />
              <strong>Forme juridique :</strong> Micro entreprise<br />
              <strong>Siège social :</strong> 18 rue d'aguesseau, Boulogne-Billancourt<br />
              <strong>SIRET :</strong> 93470685400015<br />
              <strong>Email :</strong> artichaud.studio@gmail.com<br />
              <strong>Téléphone :</strong> 07 66 48 99 82
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">2. Hébergement</h2>
            <p className="text-white/80 leading-relaxed">
              Le site est hébergé par :<br />
              <strong>Hébergeur :</strong> Hostinger<br />
              <strong>Adresse :</strong> 61 Lordou Vironos Street, 6023 Larnaca, Chypre<br />
              <strong>Site web :</strong> https://www.hostinger.com/fr
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">3. Propriété intellectuelle</h2>
            <p className="text-white/80 leading-relaxed">
              L’ensemble de ce site relève de la législation française et internationale sur le droit d’auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">4. Données personnelles</h2>
            <p className="text-white/80 leading-relaxed">
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d’un droit d’accès, de rectification et de suppression des données vous concernant. Pour exercer ce droit, contactez-nous par email. Aucune donnée personnelle n'est vendue à des tiers.
            </p>
          </div>

        </section>
      </div>
    </main>
  );
}