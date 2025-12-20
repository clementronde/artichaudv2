import { getAllPosts } from '@/lib/mdx';
import HomeClient from '@/components/home/HomeClient';

export default async function Home() {
  
  // 1. Récupération des données
  // getAllPosts retourne maintenant directement le format attendu (sans .meta)
  const posts = getAllPosts();

  // 2. On envoie les données directement au Client Component
  return (
    <HomeClient posts={posts} />
  );
}