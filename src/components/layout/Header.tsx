import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-10 flex justify-between items-center mix-blend-difference text-white">
      
      {/* Logo */}
      <Link href="/" className="text-xl font-bold tracking-tight uppercase">
        Artichaud
      </Link>

      {/* Navigation Desktop */}
      <nav className="hidden md:flex items-center gap-8">
        <Link href="/works" className="text-sm font-medium hover:opacity-70 transition-opacity">
          Works
        </Link>
        <Link href="/services" className="text-sm font-medium hover:opacity-70 transition-opacity">
          Services
        </Link>
        <Link href="/about" className="text-sm font-medium hover:opacity-70 transition-opacity">
          About
        </Link>
        
        {/* CTA Button */}
        <Link 
          href="/contact" 
          className="ml-4 px-6 py-2 border border-white/30 rounded-full text-sm font-bold hover:bg-white hover:text-black transition-colors duration-300"
        >
          Let's talk
        </Link>
      </nav>

      {/* Burger Menu Mobile (Visuel simple pour l'instant) */}
      <button className="md:hidden text-sm font-bold uppercase">
        Menu
      </button>
    </header>
  );
}