import AboutClient from "@/components/about/AboutClient"
// On utilise getAllPosts car c'est le nom de la fonction dans votre lib/mdx
import { getAllPosts } from "@/lib/mdx" 

export const metadata = {
  title: "À Propos | Agence Artichaud",
  description: "Découvrez notre équipe et notre vision.",
}

export default async function AboutPage() {
  // Récupération des données côté serveur
  const posts = await getAllPosts()

  // On passe les données au client
  return <AboutClient posts={posts} />
}