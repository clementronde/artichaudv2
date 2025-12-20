import BlogSection from '@/components/home/BlogSection' 
import ProjectList from '@/components/works/ProjectList' 
import { getAllPosts } from '@/lib/mdx'

export default async function WorkPage() {
  const posts = getAllPosts()

  return (
    <main className="w-full bg-white pt-40 min-h-screen overflow-x-hidden">
      
      {/* HEADER */}
      <div className="container mx-auto px-6 md:px-12 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-8 gap-x-5">
          <div className="hidden md:block col-span-1 pt-2">
            <span className="text-sm font-medium text-black block">
              Works
            </span>
          </div>
          <div className="col-span-1 md:col-span-5 md:col-start-2">
            <h1 className="text-[32px] md:text-[48px] lg:text-[56px] leading-[1.1] font-normal text-black tracking-tight">
              Working to shape the future of your industry? We create brands that bring that ambition to life.
            </h1>
          </div>
        </div>
      </div>

      {/* TITRE + BOUTON */}
      <div className="container mx-auto px-6 md:px-12 mb-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <h2 className="text-[40px] md:text-[60px] font-normal tracking-tight text-black">
              Most Recent
            </h2>
            {/* CORRECTION ICI : Utilisation de <a> au lieu de Link */}
            <a 
                href="/works/all" 
                className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full border border-black/10 hover:bg-black hover:text-white transition-all duration-300" 
            >
                <span className="relative z-10 font-medium text-sm">All projects</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
        </div>
      </div>

      {/* GRILLE PROJETS */}
      <ProjectList />

      {/* SÉPARATION */}
      <div className="container mx-auto ">
        <div className="w-full border-t border-black/20" />
      </div>

      {/* BLOG */}
      <BlogSection posts={posts} />

    </main>
  )
}