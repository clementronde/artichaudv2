import { notFound } from 'next/navigation'
import { projects } from '@/data/project' 
import { getAllPosts } from '@/lib/mdx'
import ProjectClient from '@/components/Project/ProjectClient'

// Dans Next.js 15, params est une Promise
interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ProjectPage({ params }: PageProps) {
  // 1. On "attend" que les paramètres soient disponibles (Correctif Next.js 15)
  const resolvedParams = await params
  const { slug } = resolvedParams

  // DEBUG : Regardez votre terminal serveur pour voir ces messages
  console.log("Slug URL reçu:", slug)
  console.log("Slugs disponibles dans data:", projects.map(p => p.slug))

  // 2. Récupérer le projet correspondant au slug
  const project = projects.find(p => p.slug === slug)

  // 3. Si aucun projet ne correspond, renvoyer 404
  if (!project) {
    console.error(`Projet non trouvé pour le slug: ${slug}`)
    return notFound()
  }

  // 4. Récupérer les articles de blog
  const posts = getAllPosts()

  // 5. Passer le tout au composant Client
  return <ProjectClient project={project} posts={posts} />
}