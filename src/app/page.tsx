// 1. Import de la logique serveur (lecture MDX)
import { getAllPosts } from '@/lib/mdx';
// 2. Import du composant client qu'on vient de créer
import HomeClient from '@/components/home/HomeClient';

export default async function Home() {
  
  // A. Récupération des données
  const mdxPosts = getAllPosts();
  
  // --- AJOUTER CECI POUR DEBUGGER ---
  console.log("📂 Chemin racine du projet :", process.cwd());
  console.log("📝 Articles trouvés :", mdxPosts.length);
  if (mdxPosts.length > 0) {
    console.log("🔍 Premier article :", mdxPosts[0]);
  }
  // ----------------------------------

  const posts = mdxPosts.map((post) => ({
    // ... votre code e
    id: post.slug,
    slug: post.slug,
    title: post.meta.title,
    excerpt: post.meta.excerpt,
    date: post.meta.date,
    image: post.meta.image,
    readTime: post.meta.readTime,
    tags: post.meta.tags,
  }));

  // C. On envoie les données "propres" au composant client
  return (
    <HomeClient posts={posts} />
  );
}