'use client'

import { motion, MotionProps } from 'framer-motion'
import { useIsMobile } from '@/hooks/useIsMobile'

// Composant optimisé qui désactive les animations complexes sur mobile
export function OptimizedMotion({
  children,
  simplifyOnMobile = true,
  ...props
}: MotionProps & {
  children: React.ReactNode
  simplifyOnMobile?: boolean
}) {
  const isMobile = useIsMobile()

  // Sur mobile, simplifier les animations si demandé
  if (isMobile && simplifyOnMobile) {
    return <div {...(props as any)}>{children}</div>
  }

  return <motion.div {...props}>{children}</motion.div>
}

// Export des autres composants motion optimisés
export const OptimizedMotionSection = (props: MotionProps & { children: React.ReactNode, simplifyOnMobile?: boolean }) => {
  const isMobile = useIsMobile()
  const { children, simplifyOnMobile = true, ...motionProps } = props

  if (isMobile && simplifyOnMobile) {
    return <section>{children}</section>
  }

  return <motion.section {...motionProps}>{children}</motion.section>
}
