'use client';

import { useState, useEffect } from 'react';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Charger la préférence depuis localStorage
    const saved = localStorage.getItem('blog-dark-mode');
    if (saved) {
      setIsDark(saved === 'true');
      document.documentElement.classList.toggle('dark-mode', saved === 'true');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    localStorage.setItem('blog-dark-mode', String(newMode));
    document.documentElement.classList.toggle('dark-mode', newMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-noir text-blanc dark-mode:bg-blanc dark-mode:text-noir shadow-lg hover:scale-110 transition-all"
      aria-label={isDark ? 'Mode clair' : 'Mode sombre'}
    >
      {isDark ? (
        // Icône soleil
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        // Icône lune
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
}