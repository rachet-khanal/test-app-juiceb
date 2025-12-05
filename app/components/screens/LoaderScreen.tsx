"use client"

import { useEffect, useRef } from "react"

import AnimatedLogo from "../AnimatedLogo"
import DotIndicator from "../DotIndicator"
import { gsap } from "gsap"

interface LoaderScreenProps {
  onComplete?: () => void
  duration?: number // Duration in seconds before calling onComplete
}

export default function LoaderScreen({
  onComplete,
  duration = 1.75,
}: LoaderScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Call onComplete after duration
    if (onComplete) {
      gsap.delayedCall(duration, () => {
        // fade out
        const gtween = gsap.fromTo(
          containerRef.current,
          { opacity: 1 },
          { opacity: 0, duration: 0.25, ease: "power2.in" }
        )
        gtween.eventCallback("onComplete", onComplete)
      })
    }
  }, [duration, onComplete])

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center text-white"
      style={{
        background:
          "radial-gradient(94.55% 94.55% at 50% 5.45%, #222737 0%, #0C0D10 100%)",
      }}
    >
      {/* Animated Logo */}
      <div className="mb-12">
        <AnimatedLogo width={160} height={38} />
      </div>

      {/* Loader Dots - always visible */}
      <DotIndicator mode="loader" total={4} />
    </div>
  )
}
