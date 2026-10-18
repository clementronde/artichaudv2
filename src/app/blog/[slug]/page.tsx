import { getPublishedPostBySlug, getAllPosts } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import CalloutBox from '@/components/mdx/CalloutBox';
import ContactCTA from '@/components/mdx/ContactCTA';
import remarkGfm from 'remark-gfm';
import RelatedLinks from '@/components/seo/RelatedLinks';
import { relatedLinkGroups } from '@/components/seo/relatedLinksData';
import { SITE_URL as BASE_URL } from '@/lib/seo';
import TableOfContents from '@/components/blog/TableOfContents';
import { getHeadings, slugifyHeading } from '@/lib/toc';
import ReadingProgress from '@/components/blog/ReadingProgress';
import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react';

// Texte brut d'un titre MDX, même quand il contient du gras ou un lien
function textOf(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textOf).join('');
  if (node && typeof node === 'object' && 'props' in node) {
    return textOf((node.props as { children?: ReactNode }).children);
  }
  return '';
}

type ElementWithChildren = ReactElement<{ children?: ReactNode }>;

function elementsOf(node: ReactNode): ElementWithChildren[] {
  return Children.toArray(node).filter(isValidElement) as ElementWithChildren[];
}

// Recopie l'intitulé de chaque colonne sur ses cellules (data-label), pour l'affichage en cartes sur mobile
function labelTableCells(children: ReactNode): ReactNode {
  const [thead, ...rest] = elementsOf(children);
  const headerRow = thead ? elementsOf(thead.props.children)[0] : undefined;
  if (!headerRow) return children;
  const labels = elementsOf(headerRow.props.children).map((cell) => textOf(cell.props.children));

  return [
    thead,
    ...rest.map((tbody) =>
      cloneElement(
        tbody,
        undefined,
        elementsOf(tbody.props.children).map((row) =>
          cloneElement(
            row,
            undefined,
            elementsOf(row.props.children).map((cell, i) =>
              cloneElement(cell as ReactElement<Record<string, unknown>>, { 'data-label': labels[i] ?? '' })
            )
          )
        )
      )
    ),
  ];
}

// Bandeau de fin : on propose la suite logique du sujet de l'article
function getEndCta(tags: string[]) {
  const topics = tags.join(' ').toLowerCase();
  if (/branding|identit|logo/.test(topics)) {
    return {
      title: 'Votre marque mérite une identité à sa hauteur',
      text: 'Logo, couleurs, typographies, guide de marque : on construit avec vous une identité cohérente sur tous vos supports. Premier échange gratuit de 30 minutes.',
      cta: 'Parler de mon identité',
    };
  }
  if (/seo|référencement|google/.test(topics)) {
    return {
      title: 'Envie d’être mieux trouvé sur Google ?',
      text: 'On analyse votre site et votre visibilité, puis on vous propose un plan d’action concret. Premier échange gratuit de 30 minutes.',
      cta: 'Améliorer mon référencement',
    };
  }
  return {
    title: 'Un projet de site internet ?',
    text: 'On en parle 30 minutes, gratuitement, et vous recevez un devis détaillé sous 24h. Un site vitrine démarre à 2 000 €.',
    cta: 'Demander mon devis gratuit',
  };
}

// 1. GÉNÉRATION STATIQUE (SSG)
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// 2. MÉTA-DONNÉES SEO
export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  try {
    const params = await props.params;
    const post = getPublishedPostBySlug(params.slug);
    
    const ogImage = post.meta.image.startsWith('http') 
      ? post.meta.image 
      : `${BASE_URL}${post.meta.image}`;

    return {
      // Sans suffixe « | Artichaud Studio » : Google affiche déjà le nom du site, on garde la place pour le sujet
      title: { absolute: post.meta.seoTitle ?? post.meta.title },
      description: post.meta.excerpt,
      keywords: post.meta.tags,
      robots: post.meta.noindex === true
        ? {
            index: false,
            follow: true,
            googleBot: {
              index: false,
              follow: true,
            },
          }
        : undefined,
      alternates: {
        canonical: `${BASE_URL}/blog/${post.slug}`,
      },
      openGraph: {
        title: post.meta.title,
        description: post.meta.excerpt,
        type: 'article',
        publishedTime: post.meta.date,
        modifiedTime: post.meta.modifiedDate,
        authors: ['Clément Rondepierre'],
        url: `${BASE_URL}/blog/${post.slug}`,
        siteName: 'Artichaud Studio',
        locale: 'fr_FR',
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: post.meta.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.meta.title,
        description: post.meta.excerpt,
        images: [ogImage],
        creator: '@artichaudstudio',
      },
    };
  } catch (e) {
    return {};
  }
}

// 3. PAGE ARTICLE
export default async function BlogPost(
  props: { params: Promise<{ slug: string }> }
) {
  const params = await props.params;
  
  let post;
  try {
    post = getPublishedPostBySlug(params.slug);
  } catch (e) {
    notFound();
  }

  const headings = getHeadings(post.content);
  const hasToc = headings.length >= 3;

  // --- DONNÉES STRUCTURÉES (JSON-LD) ---
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blog/${post.slug}`,
    },
    headline: post.meta.title,
    description: post.meta.excerpt,
    image: post.meta.image,
    datePublished: post.meta.date,
    dateModified: post.meta.modifiedDate,
    author: {
      '@type': 'Person',
      name: 'Clément Rondepierre',
      jobTitle: 'CEO & Co-fondateur',
      url: `${BASE_URL}/about`,
      worksFor: {
        '@type': 'Organization',
        name: 'Artichaud Studio',
        url: BASE_URL,
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'Artichaud Studio',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/icon.png`,
      },
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Blog',
          item: `${BASE_URL}/blog`
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: post.meta.title,
          item: `${BASE_URL}/blog/${post.slug}`
        }
      ]
    }
  };

  const endCta = getEndCta(post.meta.tags);

  const mdxComponents = {
    CalloutBox,
    ContactCTA,
    // Ancre sur chaque H2 pour le sommaire ; scroll-mt laisse la place à la barre de navigation
    h2: (props: any) => <h2 {...props} id={slugifyHeading(textOf(props.children))} className="scroll-mt-32" />,
    // Petit repère rose devant les sous-titres pour les distinguer des titres de section
    h3: (props: any) => (
      <h3 {...props} className="relative pl-4 before:absolute before:left-0 before:top-[0.3em] before:h-[0.9em] before:w-[3px] before:rounded-full before:bg-[#F70046]" />
    ),
    a: (props: any) => <a {...props} suppressHydrationWarning className="text-[#F70046] underline decoration-[#F70046]/30 underline-offset-4 transition-colors hover:decoration-[#F70046]" />,
    img: (props: any) => (
      <span className="block my-8 relative w-full aspect-video rounded-xl overflow-hidden bg-gray-50">
        <Image
          src={props.src}
          alt={props.alt || "Illustration"}
          fill
          sizes="(max-width: 768px) 100vw, 720px"
          className="object-cover"
        />
      </span>
    ),
    // Sur mobile, le tableau devient une pile de cartes (voir .article-table dans globals.css)
    table: (props: any) => (
      <div className="not-prose my-8 overflow-hidden rounded-[12px] border border-black/10">
        <table className="article-table w-full border-collapse text-left text-sm">
          {labelTableCells(props.children)}
        </table>
      </div>
    ),
    thead: (props: any) => (
      <thead {...props} className="bg-[#F6F1F3] text-arti-black" />
    ),
    tbody: (props: any) => (
      <tbody {...props} className="bg-white divide-y divide-black/5" />
    ),
    tr: (props: any) => (
      <tr {...props} />
    ),
    th: (props: any) => (
      <th {...props} className="px-5 py-4 text-xs font-semibold uppercase tracking-wider" />
    ),
    td: (props: any) => (
      <td {...props} className="text-[15px] leading-relaxed text-[#444] align-top md:px-5 md:py-4" />
    ),
  };

  return (
    <>
      <ReadingProgress targetId="article-content" />
      <main className="bg-white min-h-screen pt-32 pb-20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

      <article
        className={`container mx-auto px-6 md:px-12 ${hasToc ? 'max-w-[816px] lg:max-w-[1100px] lg:grid lg:grid-cols-[220px_minmax(0,720px)] lg:justify-between lg:gap-16' : 'max-w-[816px]'}`}
      >
        {/* Sommaire à gauche, qui suit la lecture (grands écrans) */}
        {hasToc && (
          <aside className="hidden lg:block">
            <div className="sticky top-32 max-h-[calc(100vh-10rem)] overflow-y-auto pt-1" data-lenis-prevent>
              <TableOfContents headings={headings} />
            </div>
          </aside>
        )}

        {/* Colonne de lecture limitée à ~70 caractères par ligne */}
        <div className="min-w-0 max-w-[720px]">
        {/* Fil d'Ariane */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-medium">
          <Link href="/" suppressHydrationWarning className="hover:text-black transition-colors">Accueil</Link>
          <span>/</span>
          <Link href="/blog" suppressHydrationWarning className="hover:text-black transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-arti-black line-clamp-1">{post.meta.title}</span>
        </nav>

        {/* Bouton Retour */}
        <Link href="/blog" suppressHydrationWarning className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-black mb-8 transition-colors">
          ← Retour au blog
        </Link>

        <header className="mb-12">
          <div className="flex flex-wrap gap-2 mb-6">
            {post.meta.tags.map((tag: string) => (
              <span key={tag} className="px-3 py-1 bg-[#F6F1F3] text-[#411120] rounded-full text-xs font-bold uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[52px] font-normal text-arti-black leading-[1.1] mb-6 tracking-tight">
            {post.meta.title}
          </h1>

          <Link
            href="/about"
            suppressHydrationWarning
            className="flex items-center gap-4 group mb-6 -mx-2 px-2 py-2 rounded-xl transition-colors hover:bg-[#F6F1F3]"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white shadow-sm shrink-0">
              <Image
                src="/clement_profil.png"
                width={48}
                height={48}
                alt="Clément Rondepierre, CEO et co-fondateur d'Artichaud Studio"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="leading-tight">
              <span className="block font-semibold text-black group-hover:text-[#F70046] transition-colors">
                Clément Rondepierre
              </span>
              <span className="block text-sm text-gray-500">
                CEO &amp; Co-fondateur, Artichaud Studio
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-4 text-sm text-gray-500 border-b border-gray-100 pb-8">
            <time dateTime={post.meta.date}>
              {new Date(post.meta.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </time>
            <span>•</span>
            <span>{post.meta.readingTime}</span>
          </div>
        </header>

        <div className="relative w-full aspect-[16/9] mb-12 rounded-2xl overflow-hidden bg-gray-100 shadow-sm">
          <Image
            src={post.meta.image}
            alt={post.meta.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 720px"
          />
        </div>

        {/* En bref : la réponse en quelques lignes pour le lecteur pressé */}
        {post.meta.summary && post.meta.summary.length > 0 && (
          <aside className="mb-10 rounded-[16px] bg-[#F6F1F3] p-6 md:p-8">
            <p className="mb-4 text-xs font-bold uppercase tracking-wider text-[#F70046]">En bref</p>
            <ul className="flex flex-col gap-3">
              {post.meta.summary.map((point: string) => (
                <li key={point} className="flex gap-3 text-base leading-relaxed text-arti-black">
                  <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#F70046]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </aside>
        )}

        {/* Sommaire repliable (mobile et tablette) */}
        {hasToc && (
          <details className="group/toc mb-12 rounded-[12px] border border-black/10 lg:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-base text-arti-black [&::-webkit-details-marker]:hidden">
              Sommaire
              <span aria-hidden="true" className="transition-transform duration-300 group-open/toc:rotate-180">↓</span>
            </summary>
            <div className="px-5 pb-5">
              <TableOfContents headings={headings} variant="inline" />
            </div>
          </details>
        )}

        {/* CONTENU MDX */}
        <div id="article-content" className="prose prose-lg max-w-none
          prose-headings:font-normal prose-headings:text-arti-black
          prose-h2:mt-20 prose-h2:mb-5 prose-h2:text-[28px] md:prose-h2:text-[34px] prose-h2:leading-[1.2]
          prose-h3:mt-10 prose-h3:mb-3 prose-h3:text-[21px] prose-h3:font-medium
          prose-p:text-[#444] prose-p:leading-[1.75] prose-p:mb-6
          prose-li:text-[#444] prose-li:my-1.5
          prose-a:text-[#F70046] prose-a:font-normal
          prose-ul:list-disc prose-ul:pl-6 prose-li:marker:text-[#F70046]
          prose-ol:pl-6 prose-ol:marker:text-[#F70046]
          prose-strong:font-semibold prose-strong:text-arti-black">

          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              }
            }}
          />
        </div>

        {/* CTA Fin, adapté au sujet de l'article */}
        <div className="mt-24 bg-[#411120] text-white rounded-3xl p-8 md:p-12 flex flex-col gap-8">
          <div>
            <h3 className="text-2xl md:text-3xl font-normal mb-3">{endCta.title}</h3>
            <p className="text-white/70 leading-relaxed">{endCta.text}</p>
          </div>
          <Link
            href="/contact"
            suppressHydrationWarning
            className="self-start inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-[#F70046] hover:text-white transition-all duration-300"
          >
            {endCta.cta} <span>→</span>
          </Link>
        </div>
        </div>

      </article>
    </main>
    <RelatedLinks
      title="Mettre ce sujet en pratique"
      links={relatedLinkGroups.editorial.filter((link) => link.href !== `/blog/${post.slug}`)}
    />
  </>
  );
}
