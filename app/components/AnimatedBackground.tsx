"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"

import { gsap } from "gsap"

// Gradient configurations based on route
const GRADIENTS = {
  home: "radial-gradient(94.55% 94.55% at 50% 5.45%, #222737 0%, #0C0D10 100%)",
  "tutorial-first":
    "radial-gradient(51.9% 51.9% at 50% 48.1%, #222737 0%, #0C0D10 100%)",
  default:
    "radial-gradient(94.55% 94.55% at 50% 5.45%, #222737 0%, #0C0D10 100%)",
} as const

// Map routes to gradient types
const getGradientForRoute = (pathname: string): keyof typeof GRADIENTS => {
  if (pathname === "/") return "home"
  // Tutorial will use custom event to determine gradient
  if (pathname === "/tutorial") return "tutorial-first"
  return "default"
}

export default function AnimatedBackground() {
  const pathname = usePathname()
  const canvasRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const currentGradientRef = useRef<string>(GRADIENTS.home)
  const [tutorialSlide, setTutorialSlide] = useState(0)

  // Listen for tutorial slide changes
  useEffect(() => {
    const handleSlideChange = (event: CustomEvent) => {
      setTutorialSlide(event.detail.slide)
    }

    window.addEventListener(
      "tutorial-slide-change" as any,
      handleSlideChange as any
    )

    return () => {
      window.removeEventListener(
        "tutorial-slide-change" as any,
        handleSlideChange as any
      )
    }
  }, [])

  useEffect(() => {
    if (!canvasRef.current || !overlayRef.current) return

    // Determine target gradient based on route and tutorial slide
    const targetGradient =
      pathname === "/tutorial"
        ? tutorialSlide === 0
          ? GRADIENTS["tutorial-first"]
          : GRADIENTS.default
        : GRADIENTS[getGradientForRoute(pathname)]

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
  }, [pathname, tutorialSlide])

  return (
    <>
      {/* Base canvas - 527px height minus status bar (46px) = 481px */}
      <div
        ref={canvasRef}
        className="fixed inset-0 z-0 top-0"
        style={{
          background: GRADIENTS.home,
          height: "481px",
        }}
      />
      {/* Transition overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-0 pointer-events-none top-0"
        style={{
          opacity: 0,
          height: "481px",
        }}
      />
    </>
  )
}
