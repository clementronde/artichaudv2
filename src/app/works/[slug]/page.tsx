import { projects } from '@/data/project';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

const BASE_URL = 'https://artichaud-studio.com';

// 1. GÉNÉRATION STATIQUE (SSG)
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// 2. MÉTA-DONNÉES SEO
export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  try {
    const params = await props.params;
    const project = projects.find((p) => p.slug === params.slug);

    if (!project) return {};

    const ogImage = project.cover.startsWith('http')
      ? project.cover
      : `${BASE_URL}${project.cover}`;

    return {
      title: `${project.client} - ${project.category} | Artichaud Studio`,
      description: project.description[0],
      keywords: [...project.services, project.category, project.client],
      alternates: {
        canonical: `${BASE_URL}/works/${project.slug}`,
      },
      openGraph: {
        title: `${project.client} - ${project.category}`,
        description: project.description[0],
        type: 'website',
        url: `${BASE_URL}/works/${project.slug}`,
        siteName: 'Artichaud Studio',
        locale: 'fr_FR',
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: project.client,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${project.client} - ${project.category}`,
        description: project.description[0],
        images: [ogImage],
        creator: '@artichaudstudio',
      },
    };
  } catch (e) {
    console.error("Error generating metadata:", e);
    return {
      title: 'Artichaud Studio Works'
    };
  }
}

// 3. PAGE PROJET
export default async function ProjectPage(
  props: { params: Promise<{ slug: string }> }
) {
  const params = await props.params;
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  // --- DONNÉES STRUCTURÉES (JSON-LD) ---
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.client,
    description: project.description[0],
    image: project.cover,
    datePublished: project.year,
    author: {
      '@type': 'Organization',
      name: 'Artichaud Studio',
      url: BASE_URL,
    },
    genre: project.category,
    keywords: project.services.join(', '),
  };

  return (
    <main className="bg-white min-h-screen pt-32 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="container mx-auto px-6 md:px-12">

        {/* Fil d'Ariane */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-medium max-w-6xl mx-auto">
          <Link href="/" suppressHydrationWarning className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <Link href="/works" suppressHydrationWarning className="hover:text-black transition-colors">Works</Link>
          <span>/</span>
          <span className="text-arti-black">{project.client}</span>
        </nav>

        {/* Bouton Retour */}
        <Link
          href="/works"
          suppressHydrationWarning
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-black mb-12 transition-colors max-w-6xl mx-auto"
        >
          ← Retour aux projets
        </Link>

        {/* Header du projet */}
        <header className="mb-16 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

            {/* Colonne gauche: Infos */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-amber-50 text-amber-700 border border-amber-100 rounded-full text-xs font-bold uppercase tracking-wider">
                  {project.category}
                </span>
                <span className="text-sm text-gray-500">{project.year}</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-arti-black leading-[1.1] mb-8 tracking-tight">
                {project.client}
              </h1>

              {/* Services */}
              <div className="mb-8">
                <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Services</h2>
                <div className="flex flex-wrap gap-2">
                  {project.services.map((service) => (
                    <span
                      key={service}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Couleurs */}
              {project.colors && project.colors.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Palette de couleurs</h2>
                  <div className="flex flex-wrap gap-3">
                    {project.colors.map((color) => (
                      <div key={color.hex} className="flex flex-col items-center gap-2">
                        <div
                          className="w-16 h-16 rounded-lg shadow-md border border-gray-200"
                          style={{ backgroundColor: color.hex }}
                        />
                        <div className="text-center">
                          <div className="text-xs font-medium text-gray-700">{color.name}</div>
                          <div className="text-xs text-gray-400 font-mono">{color.hex}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Colonne droite: Description */}
            <div className="space-y-6">
              {project.description.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-lg md:text-xl text-gray-600 leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </header>

        {/* Image de couverture */}
        <div className="relative w-full aspect-[16/9] mb-12 rounded-2xl overflow-hidden bg-gray-100 shadow-lg max-w-6xl mx-auto">
          <Image
            src={project.cover}
            alt={`${project.client} cover`}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 1400px"
          />
        </div>

        {/* Galerie d'images */}
        {project.images && project.images.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-6xl mx-auto">
            {project.images.map((image, index) => (
              <div
                key={index}
                className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 shadow-md"
              >
                <Image
                  src={image}
                  alt={`${project.client} image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
        )}

        {/* CTA Fin */}
        <div className="mt-24 bg-[#0a0a0a] text-white rounded-3xl p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 max-w-6xl mx-auto">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Un projet en tête ?</h3>
            <p className="text-white/60">Discutons de votre vision et créons quelque chose d'extraordinaire ensemble.</p>
          </div>
          <Link
            href="/contact"
            suppressHydrationWarning
            className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-amber-500 hover:text-white transition-all duration-300"
          >
            Démarrer un projet <span>→</span>
          </Link>
        </div>

      </article>
    </main>
  );
}
