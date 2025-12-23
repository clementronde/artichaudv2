import { useEffect, useRef, RefObject } from "react"

// Accepter que containerRef.current puisse être null
export function useMousePositionRef(containerRef: RefObject<HTMLDivElement | null>) {
  const position = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      if (!containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      
      position.current = {
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2,
      }
    }

    window.addEventListener("mousemove", updatePosition)
    return () => window.removeEventListener("mousemove", updatePosition)
  }, [containerRef])

  return position
}