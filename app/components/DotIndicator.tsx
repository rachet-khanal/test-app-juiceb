"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

interface DotIndicatorProps {
  mode: "loader" | "stepper"
  total: number // Number of dots to display
  currentStep?: number // For stepper mode (0-indexed)
  className?: string
}

export default function DotIndicator({
  mode,
  total,
  currentStep = 0,
  className = "",
}: DotIndicatorProps) {
  const dotsRef = useRef<(HTMLDivElement | null)[]>([])
  const animationRef = useRef<gsap.core.Timeline | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  // Loader mode: auto-animate through dots
  useEffect(() => {
    if (mode !== "loader") return

    const timeline = gsap.timeline({ repeat: -1 })

    for (let i = 0; i < total; i++) {
      timeline.to(
        {},
        {
          duration: 0.5,
          onStart: () => setActiveIndex(i),
        }
      )
    }

    animationRef.current = timeline

    return () => {
      timeline.kill()
    }
  }, [mode, total])

  // Stepper mode: animate on currentStep change
  useEffect(() => {
    if (mode !== "stepper") return

    setActiveIndex(currentStep)
  }, [mode, currentStep])

  // Animate dot transitions with GSAP
  useEffect(() => {
    dotsRef.current.forEach((dot, index) => {
      if (!dot) return

      const isActive = index === activeIndex

      gsap.to(dot, {
        scale: isActive ? 1.15 : 1,
        duration: 0.4,
        ease: "power2.out",
      })
    })
  }, [activeIndex])

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          ref={(el) => {
            dotsRef.current[index] = el
          }}
          className="w-2 h-2 rounded-full transition-colors duration-400"
          style={{
            backgroundColor:
              index === activeIndex
                ? "var(--color-brand-purple)"
                : "var(--color-dot-inactive)",
          }}
        />
      ))}
    </div>
  )
}
