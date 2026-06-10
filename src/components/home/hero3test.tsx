'use client'

import { useCallback, useEffect, useRef, useState } from "react"
import { ImageTrail } from "@/components/ui/image-trail"
import Image from "next/image"
import Link from "next/link"
import { useLocale } from '@/context/LocaleContext'
import gsap from "gsap"

const HERO_TRAIL_IMAGES = [
  "/projects/charitio/charitioprojet2.avif",
  "/projects/cherico/chericoprojet2.avif",
  "/projects/comon/comonprojet2.avif",
  "/projects/disobey/disobeyprojet2.avif",
  "/projects/jobmi/jobmiprojet2.avif",
  "/projects/keleti/keletiprojet2.avif",
  "/projects/lumyn/Lumynprojet2.avif",
  "/projects/multiface/multifaceprojet2.avif",
  "/projects/rockstar/rockstarprojet2.avif",
  "/projects/yumdeal/yumdealprojet2.avif",
]

const TRAIL_INTERVAL_MS = 180
const HERO_TRAIL_ANIMATION_SEQUENCE = [
  [{ scale: 1, opacity: 1, y: 0 }, { duration: 0.4, ease: [0.23, 1, 0.32, 1] }],
  [{ scale: 0.8, opacity: 0, y: 40 }, { duration: 1.2, ease: "easeOut" }],
]

type FlameParticle = {
  x: number; y: number; vx: number; vy: number
  radius: number; life: number; maxLife: number
  heat: number; wobble: number; smoke: boolean
}

const BTN_H = 56
const CANVAS_ABOVE = 280

const EMBER_COLORS = ["#ffecb4", "#ffac00", "#ff7a00", "#ff4800", "#F70046"]

function spawnEmberSparks(cx: number, cy: number) {
  const count = 2 + Math.floor(Math.random() * 3)
  for (let i = 0; i < count; i++) {
    const el = document.createElement("span")
    el.style.cssText = [
      "position:fixed",
      `left:${cx}px`, `top:${cy}px`,
      `width:${1.5 + Math.random() * 2.5}px`,
      `height:${1.5 + Math.random() * 2.5}px`,
      "border-radius:50%",
      `background:${EMBER_COLORS[Math.floor(Math.random() * EMBER_COLORS.length)]}`,
      "pointer-events:none", "z-index:9999",
      "mix-blend-mode:screen", "will-change:transform,opacity",
    ].join(";")
    document.body.appendChild(el)
    gsap.to(el, {
      x: (Math.random() - 0.5) * 70,
      y: -22 - Math.random() * 58,
      opacity: 0, scale: 0.1,
      duration: 0.35 + Math.random() * 0.55,
      ease: "power2.out",
      onComplete: () => el.remove(),
    })
  }
}

// ─── FireMorphCanvas ───────────────────────────────────────────────────────────
// Canvas height = BTN_H + CANVAS_ABOVE, anchored bottom-0 inside the button.
// Lower BTN_H px = pill shape that morphs into flame silhouette.
// Upper CANVAS_ABOVE px = particle flame system.

const FireMorphCanvas = ({ active }: { active: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<FlameParticle[]>([])
  const morphRef = useRef(0)
  const activeRef = useRef(active)

  useEffect(() => { activeRef.current = active }, [active])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    let frameId = 0
    let lastTime = performance.now()

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const { width, height } = canvas.getBoundingClientRect()
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const spawnParticle = (W: number, spawnY: number, smoke = false): FlameParticle => ({
      x: W / 2 + (Math.random() - 0.5) * (smoke ? 65 : 45),
      y: spawnY + Math.random() * 8,
      vx: (Math.random() - 0.5) * (smoke ? 0.3 : 1.1),
      vy: smoke ? -0.45 - Math.random() * 0.45 : -2.5 - Math.random() * 3.0,
      radius: smoke ? 10 + Math.random() * 18 : 7 + Math.random() * 16,
      life: 0,
      maxLife: smoke ? 1.6 + Math.random() * 1.3 : 0.65 + Math.random() * 0.6,
      heat: smoke ? 0 : Math.random(),
      wobble: Math.random() * Math.PI * 2,
      smoke,
    })

    const drawParticle = (pt: FlameParticle) => {
      const prog = pt.life / pt.maxLife
      const alpha = pt.smoke
        ? Math.max(0, (1 - prog) * 0.13)
        : Math.max(0, Math.sin(prog * Math.PI) * (0.55 + pt.heat * 0.35))
      const radius = pt.smoke
        ? pt.radius * (1 + prog * 1.8)
        : pt.radius * (1 - prog * 0.7)
      const g = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, radius)
      if (pt.smoke) {
        g.addColorStop(0, `rgba(64,55,51,${alpha})`)
        g.addColorStop(0.65, `rgba(78,67,61,${alpha * 0.45})`)
        g.addColorStop(1, "rgba(78,67,61,0)")
      } else {
        const core = Math.max(0, 1 - prog * 2.2)
        g.addColorStop(0, `rgba(255,248,188,${alpha * (0.75 + core * 0.25)})`)
        g.addColorStop(0.22, `rgba(255,205,64,${alpha})`)
        g.addColorStop(0.48, `rgba(255,100,0,${alpha * 0.88})`)
        g.addColorStop(0.75, `rgba(247,0,70,${alpha * 0.42})`)
        g.addColorStop(1, "rgba(247,0,70,0)")
      }
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.ellipse(
        pt.x, pt.y,
        radius * (pt.smoke ? 1.1 : 0.58),
        radius * (pt.smoke ? 0.75 : 1.45),
        pt.vx * 0.08, 0, Math.PI * 2
      )
      ctx.fill()
    }

    // Draw the pill→flame morphing shape
    const drawMorphShape = (W: number, H: number, p: number, time: number) => {
      const BTN_TOP = H - BTN_H
      const r = BTN_H / 2
      const ep = Math.max(0, (p - 0.04) / 0.96)

      // Flicker per tongue
      const fL = Math.sin(time * 0.009) * BTN_H * 0.13 * ep
      const fM = Math.sin(time * 0.007 + 1.5) * BTN_H * 0.11 * ep
      const fR = Math.sin(time * 0.011 + 0.8) * BTN_H * 0.12 * ep

      // Tongue tip positions
      const lTipX = W * 0.16 + fL * 0.5
      const lTipY = BTN_TOP - BTN_H * 2.2 * ep
      const mTipX = W * 0.5 + fM * 0.3
      const mTipY = BTN_TOP - BTN_H * 3.9 * ep
      const rTipX = W * 0.84 + fR * 0.4
      const rTipY = BTN_TOP - BTN_H * 1.9 * ep

      // Gradient from button bottom to highest tip
      const makeGrad = (alpha: number) => {
        const g = ctx.createLinearGradient(W / 2, H, W / 2, mTipY)
        g.addColorStop(0, `rgba(255,235,70,${alpha * 0.98})`)
        g.addColorStop(0.12, `rgba(255,140,0,${alpha * 0.95})`)
        g.addColorStop(0.38, `rgba(247,0,70,${alpha * 0.9})`)
        g.addColorStop(0.7, `rgba(160,0,30,${alpha * 0.55})`)
        g.addColorStop(1, `rgba(80,0,15,0)`)
        return g
      }

      const drawPill = () => {
        ctx.beginPath()
        ctx.moveTo(r, BTN_TOP)
        ctx.lineTo(W - r, BTN_TOP)
        ctx.arcTo(W, BTN_TOP, W, BTN_TOP + r, r)
        ctx.lineTo(W, BTN_TOP + BTN_H - r)
        ctx.arcTo(W, BTN_TOP + BTN_H, W - r, BTN_TOP + BTN_H, r)
        ctx.lineTo(r, BTN_TOP + BTN_H)
        ctx.arcTo(0, BTN_TOP + BTN_H, 0, BTN_TOP + BTN_H - r, r)
        ctx.lineTo(0, BTN_TOP + r)
        ctx.arcTo(0, BTN_TOP, r, BTN_TOP, r)
        ctx.closePath()
      }

      const drawLeftTongue = () => {
        ctx.beginPath()
        ctx.moveTo(W * 0.04, BTN_TOP)
        ctx.bezierCurveTo(
          W * 0.01, BTN_TOP - BTN_H * 0.9 * ep,
          lTipX - W * 0.09, lTipY + BTN_H * 0.4 * ep,
          lTipX, lTipY
        )
        ctx.bezierCurveTo(
          lTipX + W * 0.09, lTipY + BTN_H * 0.4 * ep,
          W * 0.37, BTN_TOP - BTN_H * 0.75 * ep,
          W * 0.37, BTN_TOP
        )
        ctx.closePath()
      }

      const drawCenterTongue = () => {
        ctx.beginPath()
        ctx.moveTo(W * 0.27, BTN_TOP)
        ctx.bezierCurveTo(
          W * 0.32, BTN_TOP - BTN_H * 1.7 * ep,
          mTipX - W * 0.1, mTipY + BTN_H * 0.55 * ep,
          mTipX, mTipY
        )
        ctx.bezierCurveTo(
          mTipX + W * 0.1, mTipY + BTN_H * 0.55 * ep,
          W * 0.68, BTN_TOP - BTN_H * 1.7 * ep,
          W * 0.73, BTN_TOP
        )
        ctx.closePath()
      }

      const drawRightTongue = () => {
        ctx.beginPath()
        ctx.moveTo(W * 0.63, BTN_TOP)
        ctx.bezierCurveTo(
          W * 0.63, BTN_TOP - BTN_H * 0.7 * ep,
          rTipX - W * 0.08, rTipY + BTN_H * 0.35 * ep,
          rTipX, rTipY
        )
        ctx.bezierCurveTo(
          rTipX + W * 0.07, rTipY + BTN_H * 0.35 * ep,
          W * 0.98, BTN_TOP - BTN_H * 0.6 * ep,
          W * 0.97, BTN_TOP
        )
        ctx.closePath()
      }

      // Glow pass
      ctx.save()
      ctx.globalCompositeOperation = "screen"
      ctx.filter = `blur(${14 * p}px)`
      ctx.globalAlpha = p * 0.42
      ctx.fillStyle = makeGrad(1)
      drawPill(); ctx.fill()
      if (ep > 0.01) {
        drawLeftTongue(); ctx.fill()
        drawCenterTongue(); ctx.fill()
        drawRightTongue(); ctx.fill()
      }
      ctx.restore()

      // Sharp pass
      ctx.save()
      ctx.globalCompositeOperation = "screen"
      ctx.globalAlpha = p
      ctx.fillStyle = makeGrad(1)
      drawPill(); ctx.fill()
      if (ep > 0.01) {
        drawLeftTongue(); ctx.fill()
        drawCenterTongue(); ctx.fill()
        drawRightTongue(); ctx.fill()
      }
      ctx.restore()

      // Hot white core at pill center
      ctx.save()
      ctx.globalCompositeOperation = "screen"
      ctx.globalAlpha = p * 0.3
      const coreGrad = ctx.createRadialGradient(W / 2, BTN_TOP + BTN_H * 0.55, 0, W / 2, BTN_TOP + BTN_H * 0.55, W * 0.38)
      coreGrad.addColorStop(0, `rgba(255,255,200,1)`)
      coreGrad.addColorStop(0.4, `rgba(255,200,60,0.7)`)
      coreGrad.addColorStop(1, "rgba(255,100,0,0)")
      ctx.fillStyle = coreGrad
      drawPill(); ctx.fill()
      ctx.restore()
    }

    const animate = (now: number) => {
      const delta = Math.min(0.05, (now - lastTime) / 1000)
      lastTime = now

      const target = activeRef.current ? 1 : 0
      morphRef.current += (target - morphRef.current) * 3.0 * delta
      const p = morphRef.current

      const W = canvas.clientWidth
      const H = canvas.clientHeight
      const spawnY = H - BTN_H - 4

      ctx.clearRect(0, 0, W, H)

      if (p > 0.01) drawMorphShape(W, H, p, now)

      if (activeRef.current && p > 0.2) {
        for (let i = 0; i < 12; i++) particlesRef.current.push(spawnParticle(W, spawnY))
        if (Math.random() > 0.63) particlesRef.current.push(spawnParticle(W, spawnY, true))
      }

      particlesRef.current = particlesRef.current.filter((pt) => {
        pt.life += delta
        if (pt.life >= pt.maxLife) return false
        const prog = pt.life / pt.maxLife
        pt.wobble += delta * (pt.smoke ? 1.7 : 8.8)
        pt.x += (pt.vx + Math.sin(pt.wobble) * (pt.smoke ? 0.3 : 1.05)) * 60 * delta
        pt.y += pt.vy * 60 * delta
        pt.vx *= pt.smoke ? 0.995 : 0.985
        pt.vy += (pt.smoke ? -0.04 : 0.82) * prog * delta
        return true
      })

      if (particlesRef.current.length > 0) {
        ctx.save()
        ctx.globalCompositeOperation = "screen"
        particlesRef.current.filter((pt) => !pt.smoke).forEach(drawParticle)
        ctx.restore()
        particlesRef.current.filter((pt) => pt.smoke).forEach(drawParticle)
      }

      frameId = requestAnimationFrame(animate)
    }

    resize()
    window.addEventListener("resize", resize)
    frameId = requestAnimationFrame(animate)
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(frameId) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute left-0 right-0 bottom-0 w-full"
      style={{ height: `${BTN_H + CANVAS_ABOVE}px` }}
    />
  )
}

// ─── renderHeatLine ────────────────────────────────────────────────────────────
const renderHeatLine = (line: string, lineIndex: number) => (
  <span className="block heat-line" data-line={lineIndex}>
    {line.split("").map((char, index) => (
      <span key={`${char}-${index}`} className="heat-char inline-block whitespace-pre will-change-transform">
        {char}
      </span>
    ))}
  </span>
)

// ─── Hero3Test ─────────────────────────────────────────────────────────────────
export default function Hero3Test() {
  const ref = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const discussButtonRef = useRef<HTMLAnchorElement>(null)
  const igniteTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const [isActive, setIsActive] = useState(false)
  const [isCtaHovered, setIsCtaHovered] = useState(false)
  const [imagesReady, setImagesReady] = useState(false)
  const { t } = useLocale()

  useEffect(() => {
    let cancelled = false
    const preload = HERO_TRAIL_IMAGES.map((url) => {
      const img = new window.Image()
      img.src = url
      if ("decode" in img) return img.decode().catch(() => undefined)
      return new Promise<void>((resolve) => {
        ;(img as HTMLImageElement).onload = () => resolve()
        ;(img as HTMLImageElement).onerror = () => resolve()
      })
    })
    Promise.all(preload).then(() => { if (!cancelled) setImagesReady(true) })
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    const title = titleRef.current
    const button = discussButtonRef.current
    return () => {
      igniteTimelineRef.current?.kill()
      const heatChars = title?.querySelectorAll(".heat-char")
      const ctaChars = button?.querySelectorAll(".cta-char")
      gsap.killTweensOf([
        button,
        ...(heatChars ? Array.from(heatChars) : []),
        ...(ctaChars ? Array.from(ctaChars) : []),
      ])
    }
  }, [])

  const igniteDiscussCta = useCallback(() => {
    setIsCtaHovered(true)
    const title = titleRef.current
    const button = discussButtonRef.current
    if (!title || !button) return

    igniteTimelineRef.current?.kill()
    const tl = gsap.timeline()
    igniteTimelineRef.current = tl

    // Button bg → transparent (canvas takes over visually)
    tl.to(button, {
      backgroundColor: "rgba(0,0,0,0)",
      boxShadow: "0 0 0 1px rgba(247,0,70,0.18), 0 24px 60px rgba(247,0,70,0.48), 0 0 55px rgba(255,122,0,0.5)",
      scale: 1.04,
      duration: 0.6,
      ease: "power3.out",
    }, 0)

    // CTA text chars burn upward
    const ctaChars = Array.from(button.querySelectorAll(".cta-char"))
    if (ctaChars.length) {
      tl.to(ctaChars, {
        color: "#ffecb4",
        textShadow: "0 0 10px rgba(255,200,0,0.95), 0 0 22px rgba(255,100,0,0.8)",
        y: () => gsap.utils.random(-3, 0),
        duration: 0.22,
        ease: "power2.out",
        stagger: { from: "random", amount: 0.2 },
      }, 0.15)
      tl.to(ctaChars, {
        opacity: 0,
        y: () => gsap.utils.random(-18, -6),
        x: () => gsap.utils.random(-5, 5),
        rotate: () => gsap.utils.random(-14, 14),
        filter: () => `blur(${gsap.utils.random(1, 3)}px)`,
        scale: () => gsap.utils.random(0.25, 0.65),
        duration: () => gsap.utils.random(0.32, 0.58),
        ease: "power2.in",
        stagger: { from: "random", amount: 0.24 },
      }, 0.4)
    }

    // H1 burns ligne par ligne — bas → haut
    const lines = Array.from(title.querySelectorAll(".heat-line"))
    lines.forEach((line, lineIdx) => {
      const chars = Array.from(line.querySelectorAll(".heat-char"))
      const reverseIdx = lines.length - 1 - lineIdx
      const lineDelay = 0.3 + reverseIdx * 0.52

      tl.to(chars, {
        color: () => gsap.utils.random(["#F70046", "#ff5a00", "#ffb000", "#ffd460"]),
        textShadow: () => {
          const c = gsap.utils.random(["247,0,70", "255,90,0", "255,180,0"])
          return `0 0 12px rgba(${c},0.75), 0 0 26px rgba(255,122,0,0.55)`
        },
        y: () => gsap.utils.random(-13, 2),
        x: () => gsap.utils.random(-3, 3),
        rotate: () => gsap.utils.random(-5, 5),
        duration: 0.38,
        ease: "power2.out",
        stagger: { from: "random", amount: 0.3 },
      }, lineDelay)

      tl.call(() => {
        chars.forEach(char => {
          if (Math.random() > 0.42) {
            const rect = (char as HTMLElement).getBoundingClientRect()
            spawnEmberSparks(rect.left + rect.width / 2, rect.top + rect.height / 2)
          }
        })
      }, [], lineDelay + 0.2)

      tl.to(chars, {
        color: () => gsap.utils.random(["#251a17", "#5b5552", "#8a817b", "#3d3330"]),
        opacity: 0,
        filter: () => `blur(${gsap.utils.random(1.8, 5.2)}px)`,
        x: () => gsap.utils.random(-68, 68),
        y: () => gsap.utils.random(140, 290),
        rotate: () => gsap.utils.random(-115, 115),
        scale: () => gsap.utils.random(0.16, 0.58),
        duration: () => gsap.utils.random(1.7, 3.1),
        ease: "power2.in",
        stagger: { from: "random", amount: 1.85 },
      }, lineDelay + 0.3)

      tl.call(() => {
        chars.forEach(char => {
          if (Math.random() > 0.6) {
            const rect = (char as HTMLElement).getBoundingClientRect()
            spawnEmberSparks(rect.left + rect.width / 2, rect.top + rect.height / 2)
          }
        })
      }, [], lineDelay + 0.48)
    })
  }, [])

  const coolDiscussCta = useCallback(() => {
    setIsCtaHovered(false)
    igniteTimelineRef.current?.kill()
    igniteTimelineRef.current = null

    const title = titleRef.current
    const button = discussButtonRef.current
    if (!title || !button) return

    const heatChars = Array.from(title.querySelectorAll(".heat-char"))
    const ctaChars = Array.from(button.querySelectorAll(".cta-char"))
    gsap.killTweensOf([button, ...heatChars, ...ctaChars])

    gsap.to(button, {
      backgroundColor: "#30041B",
      boxShadow: "0 0 0 rgba(0,0,0,0)",
      scale: 1,
      duration: 0.42,
      ease: "power3.out",
    })

    gsap.to(ctaChars, {
      color: "#ffffff",
      opacity: 1, y: 0, x: 0, rotate: 0, scale: 1,
      filter: "blur(0px)",
      textShadow: "0px 0px 0px rgba(0,0,0,0)",
      duration: 0.5,
      ease: "power3.out",
      stagger: { from: "start", amount: 0.14 },
    })

    gsap.to(heatChars, {
      color: "#30041B",
      opacity: 1, x: 0, y: 0, rotate: 0, scale: 1,
      filter: "blur(0px)",
      textShadow: "0px 0px 0px rgba(0,0,0,0)",
      duration: 1.45,
      ease: "power3.out",
      stagger: { from: "end", amount: 0.85 },
    })
  }, [])

  return (
    <section
      ref={ref}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      className="relative z-20 w-full min-h-screen overflow-visible bg-white"
    >
      <div className="absolute inset-0 z-[100] pointer-events-none overflow-visible">
        <ImageTrail
          containerRef={ref}
          interval={TRAIL_INTERVAL_MS}
          rotationRange={20}
          animationSequence={HERO_TRAIL_ANIMATION_SEQUENCE}
          active={isActive && imagesReady && !isCtaHovered}
        >
          {HERO_TRAIL_IMAGES.map((url, index) => (
            <div key={index} className="relative w-[180px] h-[180px] md:w-[240px] md:h-[240px] overflow-hidden shadow-2xl">
              <Image src={url} alt={`Project ${index}`} fill priority className="object-cover" sizes="240px" />
            </div>
          ))}
        </ImageTrail>
      </div>

      <div className="absolute inset-0 z-20 w-full h-full pointer-events-none flex flex-col justify-end items-start px-6 pb-28 md:px-[7vw] md:pb-[12vh]">
        <div className="max-w-[980px] text-left">
          <h1
            ref={titleRef}
            className="font-normal text-black tracking-tight"
            style={{ fontFamily: "Helvetica, Arial, sans-serif", fontSize: "clamp(42px, 5.4vw, 86px)", lineHeight: 1.18 }}
          >
            {renderHeatLine(t.hero.title[0], 0)}
            {renderHeatLine(t.hero.title[1], 1)}
            {renderHeatLine(t.hero.title[2], 2)}
          </h1>

          <div className="mt-8 flex flex-col gap-3 pointer-events-auto sm:flex-row">
            <Link
              ref={discussButtonRef}
              href="/contact"
              onMouseEnter={igniteDiscussCta}
              onMouseLeave={coolDiscussCta}
              onFocus={igniteDiscussCta}
              onBlur={coolDiscussCta}
              className="group relative isolate inline-flex min-h-14 items-center justify-center gap-2 overflow-visible rounded-full bg-black px-7 text-base font-medium text-white"
            >
              {/* Outer glow halo */}
              <span className="absolute -inset-5 -z-10 rounded-full bg-[#F70046]/0 blur-2xl transition-colors duration-300 group-hover:bg-[#F70046]/30" />

              {/* Fire morphism canvas — pill → tongues de feu */}
              <FireMorphCanvas active={isCtaHovered} />

              {/* Button text (burns on hover) */}
              <span className="cta-char relative z-10 inline-block">→</span>
              <span className="relative z-10" aria-label={t.hero.ctaDiscuss}>
                {t.hero.ctaDiscuss.split("").map((char, i) => (
                  <span key={i} className="cta-char inline-block whitespace-pre" aria-hidden="true">{char}</span>
                ))}
              </span>
            </Link>

            <Link
              href="/works"
              className="inline-flex min-h-14 items-center justify-center rounded-full border border-black/15 px-7 text-base font-medium text-black transition-colors duration-300 hover:border-black hover:bg-black hover:text-white"
            >
              {t.hero.ctaProjects}
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 z-30 pointer-events-auto">
        <button
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
          className="flex items-center gap-2 text-sm font-medium tracking-wider text-black hover:opacity-70 transition-opacity"
        >
          {t.hero.scroll}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>

      <div aria-hidden="true" className="absolute w-0 h-0 overflow-hidden pointer-events-none">
        {HERO_TRAIL_IMAGES.map((url, index) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={index} src={url} alt="" loading="eager" decoding="async" fetchPriority="high" width={1} height={1} />
        ))}
      </div>
    </section>
  )
}
