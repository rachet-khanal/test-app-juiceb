"use client"

import { GRADIENTS, useBackground } from "../contexts/BackgroundContext"
import { useEffect, useRef } from "react"

import { gsap } from "gsap"

export default function AnimatedBackground() {
  const { currentGradient } = useBackground()
  const canvasRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const currentGradientRef = useRef<string>(GRADIENTS.home)

  useEffect(() => {
    if (!canvasRef.current || !overlayRef.current) return

    const targetGradient = GRADIENTS[currentGradient]

    // Skip animation if gradient hasn't changed
    if (currentGradientRef.current === targetGradient) return

    const overlay = overlayRef.current

    // Set the new gradient on overlay
    overlay.style.background = targetGradient

    // Animate overlay from transparent to opaque
    gsap.fromTo(
      overlay,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          // Update the canvas background
          if (canvasRef.current) {
            canvasRef.current.style.background = targetGradient
          }
          // Reset overlay opacity for next transition
          overlay.style.opacity = "0"
          // Update current gradient ref
          currentGradientRef.current = targetGradient
        },
      }
    )
  }, [currentGradient])

  return (
    <>
      {/* Base canvas - 527px height minus status bar (46px) = 481px */}
      <div
        ref={canvasRef}
        className="absolute left-1/2 -translate-x-1/2 z-0 top-0 w-full max-w-[430px]"
        style={{
          background: GRADIENTS.home,
          height: "481px",
        }}
      />
      {/* Transition overlay */}
      <div
        ref={overlayRef}
        className="absolute left-1/2 -translate-x-1/2 z-0 pointer-events-none top-0 w-full max-w-[430px]"
        style={{
          opacity: 0,
          height: "481px",
        }}
      />
    </>
  )
}
