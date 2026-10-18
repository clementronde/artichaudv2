'use client'

import { useEffect, useState } from 'react'

const TYPE_SPEED = 70
const DELETE_SPEED = 40
const HOLD_DELAY = 1800
const NEXT_DELAY = 300

// Écrit un mot, le laisse affiché, l'efface puis passe au suivant, en boucle.
// Le mot le plus long est rendu invisible dans la même cellule pour réserver la place : le texte autour ne bouge pas.
export default function TypewriterWords({ words }: { words: readonly string[] }) {
  const [index, setIndex] = useState(0)
  // Rendu serveur : le premier mot complet (lisible sans JavaScript)
  const [length, setLength] = useState(words[0]?.length ?? 0)
  const [deleting, setDeleting] = useState(false)

  const word = words[index] ?? ''
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), '')

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Mouvement réduit : on change de mot sans l'effet d'écriture
    if (reduceMotion) {
      const timer = setTimeout(() => {
        const next = (index + 1) % words.length
        setIndex(next)
        setLength(words[next].length)
      }, HOLD_DELAY + 700)
      return () => clearTimeout(timer)
    }

    let delay = deleting ? DELETE_SPEED : TYPE_SPEED
    if (!deleting && length === word.length) delay = HOLD_DELAY
    if (deleting && length === 0) delay = NEXT_DELAY

    const timer = setTimeout(() => {
      if (!deleting && length === word.length) {
        setDeleting(true)
      } else if (deleting && length === 0) {
        setDeleting(false)
        setIndex((index + 1) % words.length)
      } else {
        setLength(length + (deleting ? -1 : 1))
      }
    }, delay)
    return () => clearTimeout(timer)
  }, [index, length, deleting, word, words])

  return (
    <span className="inline-grid align-bottom">
      <span aria-hidden="true" className="invisible col-start-1 row-start-1 whitespace-nowrap">
        {longest}
      </span>
      <span aria-hidden="true" className="col-start-1 row-start-1 whitespace-nowrap text-[#F70046]">
        {word.slice(0, length)}
        <span className="hero-caret ml-[0.04em] inline-block w-[0.06em] bg-current align-[-0.08em]" style={{ height: '0.9em' }} />
      </span>
    </span>
  )
}
