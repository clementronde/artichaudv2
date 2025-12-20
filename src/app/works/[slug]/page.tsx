import { getPostBySlug, getAllPosts } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import CalloutBox from '@/components/mdx/CalloutBox';

const BASE_URL = 'https://artichaud-studio.com';

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
    const post = getPostBySlug(params.slug);
    
    if (!post || !post.meta) return {};

    // Secure image access
    const metaImage = post.meta.image || '';
    const ogImage = metaImage.startsWith('http') 
      ? metaImage 
      : `${BASE_URL}${metaImage}`;

    return {
      title: post.meta.title,
      description: post.meta.excerpt,
      keywords: post.meta.tags,
      alternates: {
        canonical: `${BASE_URL}/blog/${post.slug}`,
      },
      openGraph: {
        title: post.meta.title,
        description: post.meta.excerpt,
        type: 'article',
        publishedTime: post.meta.date,
        modifiedTime: post.meta.modifiedDate,
        authors: ['Artichaud Studio'],
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
    console.error("Error generating metadata:", e);
    return {
      title: 'Artichaud Studio Blog'
    };
  }
}

// 3. PAGE ARTICLE
export default async function BlogPost(
  props: { params: Promise<{ slug: string }> }
) {
  const params = await props.params;
  
  let post;
  try {
    post = getPostBySlug(params.slug);
  } catch (e) {
    notFound();
  }

  // Safety check
  if (!post || !post.meta) {
    notFound();
  }

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
      '@type': 'Organization',
      name: 'Artichaud Studio',
      url: BASE_URL,
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

  const mdxComponents = {
    CalloutBox,
    a: (props: any) => <a {...props} suppressHydrationWarning className="text-amber-600 hover:text-amber-700 underline underline-offset-2" />, 
    img: (props: any) => (
      <span className="block my-8 relative w-full aspect-video rounded-xl overflow-hidden bg-gray-50">
        <Image 
          src={props.src} 
          alt={props.alt || "Illustration"} 
          fill 
          className="object-cover" 
        />
      </span>
    ),
    table: (props: any) => (
      <div className="overflow-x-auto my-8 border border-gray-200 rounded-lg shadow-sm">
        <table {...props} className="w-full text-left text-sm border-collapse min-w-[600px]" />
      </div>
    ),
    thead: (props: any) => (
      <thead {...props} className="bg-gray-50 text-arti-black font-semibold border-b border-gray-200" />
    ),
    tbody: (props: any) => (
      <tbody {...props} className="bg-white divide-y divide-gray-100" />
    ),
    tr: (props: any) => (
      <tr {...props} className="hover:bg-gray-50/50 transition-colors" />
    ),
    th: (props: any) => (
      <th {...props} className="px-6 py-4 font-bold uppercase tracking-wider text-xs" />
    ),
    td: (props: any) => (
      <td {...props} className="px-6 py-4 text-gray-600 align-top whitespace-nowrap md:whitespace-normal" />
    ),
  };

  return (
    <main className="bg-white min-h-screen pt-32 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="container mx-auto px-6 md:px-12 max-w-4xl">
        
        {/* Fil d'Ariane */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-medium">
          <Link href="/" suppressHydrationWarning className="hover:text-black transition-colors">Home</Link>
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
            {post.meta.tags && post.meta.tags.map((tag: string) => (
              <span key={tag} className="px-3 py-1 bg-amber-50 text-amber-700 border border-amber-100 rounded-full text-xs font-bold uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-arti-black leading-[1.1] mb-6 tracking-tight">
            {post.meta.title}
          </h1>
          
          <div className="flex items-center gap-4 text-sm text-gray-500 border-b border-gray-100 pb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                 <Image src="/icon.png" width={32} height={32} alt="Author" />
              </div>
              <span className="font-medium text-black">Artichaud Team</span>
            </div>
            <span>•</span>
            <time dateTime={post.meta.date}>
              {new Date(post.meta.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </time>
            <span>•</span>
            <span className="flex items-center gap-1">
              ⏱️ {post.meta.readingTime}
            </span>
          </div>
        </header>

        {post.meta.image && (
          <div className="relative w-full aspect-[16/9] mb-16 rounded-2xl overflow-hidden bg-gray-100 shadow-sm">
            <Image
              src={post.meta.image}
              alt={post.meta.title || "Blog post image"}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 800px"
            />
          </div>
        )}

        {/* CONTENU MDX */}
        <div className="prose prose-lg max-w-none 
          prose-headings:font-normal prose-headings:text-arti-black prose-headings:mt-12 prose-headings:mb-6
          prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-6
          prose-a:text-amber-600 prose-a:no-underline hover:prose-a:underline
          prose-ul:list-disc prose-ul:pl-6 prose-li:marker:text-amber-500
          prose-strong:font-bold prose-strong:text-black">
          
          <MDXRemote 
            source={post.content} 
            components={mdxComponents} 
          />
        </div>

        {/* CTA Fin */}
        <div className="mt-24 bg-[#0a0a0a] text-white rounded-3xl p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-2">Besoin d'aller plus loin ?</h3>
            <p className="text-white/60">Transformons cette idée en réalité digitale.</p>
          </div>
          <Link 
            href="/contact" 
            suppressHydrationWarning
            className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-amber-500 hover:text-white transition-all duration-300"
          >
            Lancer mon projet <span>→</span>
          </Link>
        </div>

      </article>
    </main>
  );
}