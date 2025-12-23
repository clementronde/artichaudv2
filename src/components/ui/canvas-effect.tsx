"use client"

import { useEffect, useRef } from "react"

export function CanvasEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // CONFIGURATION
    const config = {
      debug: true,
      friction: 0.5,
      trails: 20,
      size: 50,
      dampening: 0.025,
      tension: 0.98,
    }

    let pos = { x: 0, y: 0 }
    let lines: Line[] = []
    
    // Note: J'ai supprimé la classe Oscillator car nous n'en avons plus besoin
    // pour une couleur fixe.

    class Node {
      x: number = 0
      y: number = 0
      vx: number = 0
      vy: number = 0
    }

    class Line {
      spring: number
      friction: number
      nodes: Node[]

      constructor(e: { spring: number }) {
        this.spring = e.spring + 0.1 * Math.random() - 0.05
        this.friction = config.friction + 0.01 * Math.random() - 0.005
        this.nodes = []
        for (let i = 0; i < config.size; i++) {
          const t = new Node()
          t.x = pos.x
          t.y = pos.y
          this.nodes.push(t)
        }
      }

      update() {
        let spring = this.spring
        let node = this.nodes[0]
        
        node.vx += (pos.x - node.x) * spring
        node.vy += (pos.y - node.y) * spring

        for (let i = 0; i < this.nodes.length; i++) {
          node = this.nodes[i]
          
          if (i > 0) {
            const prev = this.nodes[i - 1]
            node.vx += (prev.x - node.x) * spring
            node.vy += (prev.y - node.y) * spring
            node.vx += prev.vx * config.dampening
            node.vy += prev.vy * config.dampening
          }

          node.vx *= this.friction
          node.vy *= this.friction
          node.x += node.vx
          node.y += node.vy
          
          spring *= config.tension
        }
      }

      draw() {
        let node, next
        let x = this.nodes[0].x
        let y = this.nodes[0].y

        ctx!.beginPath()
        ctx!.moveTo(x, y)

        for (let i = 1; i < this.nodes.length - 2; i++) {
          node = this.nodes[i]
          next = this.nodes[i + 1]
          x = 0.5 * (node.x + next.x)
          y = 0.5 * (node.y + next.y)
          ctx!.quadraticCurveTo(node.x, node.y, x, y)
        }
        
        node = this.nodes[this.nodes.length - 2]
        next = this.nodes[this.nodes.length - 1]
        ctx!.quadraticCurveTo(node.x, node.y, next.x, next.y)
        ctx!.stroke()
        ctx!.closePath()
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      pos.x = e.clientX - rect.left
      pos.y = e.clientY - rect.top
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0 && canvas) {
        const rect = canvas.getBoundingClientRect()
        pos.x = e.touches[0].clientX - rect.left
        pos.y = e.touches[0].clientY - rect.top
      }
    }

    const resizeCanvas = () => {
      if (canvas.offsetParent) {
         ctx.canvas.width = (canvas.offsetParent as HTMLElement).clientWidth
         ctx.canvas.height = (canvas.offsetParent as HTMLElement).clientHeight
      } else {
         ctx.canvas.width = window.innerWidth
         ctx.canvas.height = window.innerHeight
      }
    }

    const render = () => {
      if (!ctx) return
      
      // Nettoyage du canvas pour la frame suivante
      ctx.globalCompositeOperation = "source-over"
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      
      // "Lighter" permet aux lignes superposées de briller (effet néon)
      ctx.globalCompositeOperation = "lighter"

      // --- MODIFICATION COULEUR ICI ---
      // Couleur D0FF00 (RGB: 208, 255, 0)
      // L'opacité (0.025) est très basse volontairement pour créer l'effet de traînée
      ctx.strokeStyle = "rgba(208, 255, 0, 0.025)" 
      
      ctx.lineWidth = 10

      for (let i = 0; i < config.trails; i++) {
        if (lines[i]) {
            lines[i].update()
            lines[i].draw()
        }
      }

      window.requestAnimationFrame(render)
    }

    // --- INIT ---
    
    resizeCanvas()
    // Initialisation au centre
    pos = { x: ctx.canvas.width / 2, y: ctx.canvas.height / 2 }

    lines = []
    for (let i = 0; i < config.trails; i++) {
      lines.push(new Line({ spring: 0.45 + (i / config.trails) * 0.025 }))
    }

    window.addEventListener("resize", resizeCanvas)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleTouchMove)

    const animationId = window.requestAnimationFrame(render)

    return () => {
      window.cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      // J'ai aussi ajouté une légère ombre portée via Tailwind (drop-shadow) pour renforcer l'effet néon si le fond est sombre
      className="pointer-events-none absolute inset-0 z-0 mx-auto w-full h-full opacity-60 drop-shadow-[0_0_10px_rgba(208,255,0,0.5)]"
    />
  )
}