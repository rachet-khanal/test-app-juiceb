"use client"

import { useEffect, ReactNode } from "react"
import Lenis from "@studio-freight/lenis"
import { gsap } from "gsap"

interface SmoothScrollProps {
  children: ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    // Request animation frame loop for Lenis
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Integrate Lenis with GSAP ScrollTrigger
    lenis.on("scroll", () => {
      gsap.ticker.tick()
    })

    return () => {
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
