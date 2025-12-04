import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/data/posts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Le Blog | Conseils en Branding & Web Design',
  description: 'Actualités, stratégies et retours d\'expérience sur le design, le développement web et le branding par Artichaud Studio.',
};

export default function BlogIndex() {
  return (
    <main className="w-full bg-white pt-40 pb-20 min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* En-tête SEO H1 */}
        <h1 className="text-[40px] md:text-[60px] leading-[1.1] font-normal text-arti-black mb-16">
          Insights & <br/> Perspectives
        </h1>

        {/* Grille des articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group block cursor-pointer">
              {/* Image avec effet Zoom */}
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 mb-6">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              {/* Textes */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-wider text-gray-400">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span>{post.readTime}</span>
                </div>
                <h2 className="text-2xl font-medium text-arti-black group-hover:text-amber-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-500 line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}