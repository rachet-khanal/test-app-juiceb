"use client"

import { useEffect, useRef } from "react"

import { gsap } from "gsap"
import { useCTAButton } from "../contexts/CTAButtonContext"

export default function CTAButton() {
  const { ctaConfig } = useCTAButton()
  const textRef = useRef<HTMLSpanElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const prevConfigRef = useRef(ctaConfig)

  const variantStyles = {
    // Purple background (home page)
    primary: "btn-cta btn-cta-primary",
    // White background (Get started)
    secondary: "btn-cta btn-cta-secondary",
    // Black outline (Continue)
    outline: "btn-cta btn-cta-outline",
  }

  // Animate text and background when config changes
  useEffect(() => {
    if (!textRef.current || !buttonRef.current) return

    const prevConfig = prevConfigRef.current
    const hasChanged =
      prevConfig.text !== ctaConfig.text ||
      prevConfig.variant !== ctaConfig.variant

    if (hasChanged) {
      const timeline = gsap.timeline()

      // Slide out current text to the left
      timeline.to(textRef.current, {
        x: -30,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      })

      // Update text in the middle of animation
      timeline.call(() => {
        prevConfigRef.current = ctaConfig
      })

      // Slide in new text from the right
      timeline.fromTo(
        textRef.current,
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.25,
          ease: "power2.out",
        }
      )

      // Background color transitions automatically via CSS transition
    } else {
      prevConfigRef.current = ctaConfig
    }
  }, [ctaConfig])

  return (
    <button
      ref={buttonRef}
      onClick={ctaConfig.onClick}
      disabled={ctaConfig.disabled}
      className={variantStyles[ctaConfig.variant]}
    >
      <span ref={textRef} className="inline-block">
        {ctaConfig.text}
      </span>
    </button>
  )
}
