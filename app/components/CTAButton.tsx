"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { useCTAButton } from "../contexts/CTAButtonContext"

export default function CTAButton() {
  const { ctaConfig } = useCTAButton()
  const textRef = useRef<HTMLSpanElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const prevConfigRef = useRef(ctaConfig)

  const baseStyles =
    "font-sohne flex items-center justify-center mx-px-20 my-6 cursor-pointer overflow-hidden relative"

  const variantStyles = {
    // Purple background (home page)
    primary: "bg-[#cdaaff] text-[#0c0d10] hover:bg-[#d9b8ff]",
    // White background (Get started)
    secondary: "bg-white text-[#0c0d10] hover:bg-gray-100",
    // Black outline (Continue)
    outline: "bg-transparent text-white border border-white hover:bg-white/10",
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
      className={`${baseStyles} ${variantStyles[ctaConfig.variant]} transition-colors duration-300`}
      style={{
        width: "-webkit-fill-available",
        height: "3.5rem", // 56px
        fontSize: "1em", // 16px (relative to parent)
        lineHeight: "1.1875", // 19px / 16px
        borderRadius: "1.1875rem", // 19px
      }}
    >
      <span ref={textRef} className="inline-block">
        {ctaConfig.text}
      </span>
    </button>
  )
}
