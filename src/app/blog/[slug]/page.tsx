import { blogPosts } from '@/data/posts';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

// 1. GÉNÉRATION STATIQUE (SSG)
// Permet à Next.js de construire toutes les pages au moment du build (ultra rapide)
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// 2. MÉTA-DONNÉES DYNAMIQUES (SEO Titre & Description)
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      images: [post.image],
    },
  };
}

// 3. COMPOSANT PAGE PRINCIPAL
export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  // --- CONSTRUCTION DES DONNÉES STRUCTURÉES (SCHEMA.ORG) ---
  
  // Base : Article de Blog
  let schemaData: any = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    image: post.image,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: 'Artichaud Studio',
      url: 'https://artichaud-studio.com'
    },
  };

  // Conditionnel : Ajout de la FAQ uniquement pour l'article sur le Rebranding
  // (Tu pourras ajouter d'autres conditions ici pour d'autres articles plus tard)
  if (post.slug === 'guide-rebranding-2025') {
    schemaData = {
      ...schemaData,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Quelle est la différence entre un refresh et un rebranding ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Le refresh est une modernisation légère (nettoyage logo, couleurs), tandis que le rebranding est une refonte totale de la stratégie, du nom et de l'identité visuelle."
          }
        },
        {
          "@type": "Question",
          "name": "Combien coûte un rebranding complet ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Pour un studio créatif expert, comptez entre 4 000€ et 12 000€ pour une stratégie complète incluant le positionnement, le logo et la charte graphique."
          }
        }
      ]
    };
  }

  return (
    <main className="bg-white min-h-screen pt-32 pb-20">
      
      {/* Injection du script JSON-LD pour Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <article className="container mx-auto px-6 md:px-12 max-w-4xl">
        
        {/* Navigation retour */}
        <Link href="/blog" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-black mb-8 transition-colors">
          ← Retour au blog
        </Link>

        {/* Header Article */}
        <header className="mb-12">
          <div className="flex gap-2 mb-6">
            {post.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full text-xs font-bold uppercase tracking-wider text-gray-600">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-6xl font-normal text-arti-black leading-tight mb-6">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-500 border-b border-gray-100 pb-8">
            <time dateTime={post.date}>{post.date}</time>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
        </header>

        {/* Image Principale */}
        <div className="relative w-full aspect-[16/9] mb-16 rounded-2xl overflow-hidden bg-gray-100">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Contenu (HTML injecté) */}
        {/* On utilise Tailwind Typography (prose) pour le style automatique */}
        <div 
          className="prose prose-lg max-w-none 
                     prose-headings:font-normal prose-headings:text-arti-black 
                     prose-p:text-gray-600 prose-p:leading-relaxed
                     prose-a:text-amber-600 prose-a:no-underline hover:prose-a:underline
                     prose-li:text-gray-600
                     prose-strong:font-bold prose-strong:text-black"
          dangerouslySetInnerHTML={{ __html: post.content || `<p>${post.excerpt}</p>` }} 
        />

        {/* Call to Action fin d'article */}
        <div className="mt-20 pt-10 border-t border-gray-100">
          <p className="text-xl font-medium mb-6">Vous avez un projet similaire ?</p>
          <Link href="/contact" className="inline-block bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-amber-600 transition-colors">
            Discutons-en
          </Link>
        </div>

      </article>
    </main>
  );
}