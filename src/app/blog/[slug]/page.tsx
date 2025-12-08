import { getPostBySlug, getAllPosts } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import CalloutBox from '@/components/mdx/CalloutBox';

// 1. GÉNÉRATION STATIQUE (SSG)
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// 2. MÉTA-DONNÉES
export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  try {
    const params = await props.params;
    const post = getPostBySlug(params.slug);
    
    return {
      title: post.meta.title,
      description: post.meta.excerpt,
      keywords: post.meta.tags,
      openGraph: {
        images: [post.meta.image],
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
    post = getPostBySlug(params.slug);
  } catch (e) {
    notFound();
  }

  // --- CORRECTION HYDRATION ---
  // On remplace les balises <a> standard du Markdown par une version qui ignore les warnings
  const mdxComponents = {
    CalloutBox,
    a: (props: any) => <a {...props} suppressHydrationWarning />, 
  };

  return (
    <main className="bg-white min-h-screen pt-32 pb-20">
      <article className="container mx-auto px-6 md:px-12 max-w-4xl">
        
        {/* Navigation retour (Correction Hydration ici aussi) */}
        <Link 
          href="/blog" 
          suppressHydrationWarning 
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-black mb-8 transition-colors"
        >
          ← Retour au blog
        </Link>

        <header className="mb-12">
          <div className="flex gap-2 mb-6">
            {post.meta.tags.map((tag: string) => (
              <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full text-xs font-bold uppercase tracking-wider text-gray-600">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-6xl font-normal text-arti-black leading-tight mb-6">
            {post.meta.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-500 border-b border-gray-100 pb-8">
            <time>{post.meta.date}</time>
            <span>•</span>
            <span>{post.meta.readTime}</span>
          </div>
        </header>

        <div className="relative w-full aspect-[16/9] mb-16 rounded-2xl overflow-hidden bg-gray-100">
          <Image
            src={post.meta.image}
            alt={post.meta.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* CONTENU MDX */}
        <div className="prose prose-lg max-w-none prose-headings:font-normal prose-headings:text-arti-black prose-p:text-gray-600 prose-a:text-amber-600 prose-a:no-underline hover:prose-a:underline">
          <MDXRemote 
            source={post.content} 
            components={mdxComponents} 
          />
        </div>

        {/* CTA Fin (Correction Hydration ici aussi) */}
        <div className="mt-20 pt-10 border-t border-gray-100">
          <p className="text-xl font-medium mb-6">Vous avez un projet similaire ?</p>
          <Link 
            href="/contact" 
            suppressHydrationWarning
            className="inline-block bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-amber-600 transition-colors"
          >
            Discutons-en
          </Link>
        </div>

      </article>
    </main>
  );
}