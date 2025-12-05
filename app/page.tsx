"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import CTAButton from "./components/CTAButton"
import Image from "next/image"
import LottieAnimation from "./components/LottieAnimation"
import TopNav from "./components/TopNav"

export default function Home() {
  const textOverlaysRef = useRef<(HTMLParagraphElement | null)[]>([])
  const headingRef = useRef<HTMLHeadingElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate text overlays with stagger
      gsap.fromTo(
        textOverlaysRef.current.filter(Boolean),
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          delay: 0.3,
        }
      )

      // Animate main heading
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          {
            opacity: 0,
            scale: 0.95,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power2.out",
            delay: 1.2,
          }
        )
      }

      // Animate CTA button
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: 1.5,
          }
        )
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <div
      className="text-white"
      style={{
        background:
          "radial-gradient(94.55% 94.55% at 50% 5.45%, #222737 0%, #0C0D10 100%)",
      }}
    >
      <div className="w-full">
        {/* Header - no back button on home screen */}
        <div style={{ paddingTop: "env(safe-area-inset-top)" }}>
          <TopNav showBackButton={false} />
        </div>

        {/* Lottie Animation with Text Overlays */}
        <div className="relative w-full max-w-px-390 mx-auto">
          <div className="relative py-px-28">
            {/* Lottie animation with embedded background */}
            <div className="relative w-px-274 h-px-290 mx-auto">
              <LottieAnimation
                className="w-full h-full pointer-events-none blob-mask"
                loop
                autoplay
                speed={1}
                delay={0.5}
              />
            </div>

            {/* Text overlays - positioned above everything */}
            <p
              ref={(el) => {
                textOverlaysRef.current[0] = el
              }}
              className="absolute z-20 font-sohne text-xs text-[#fafafa] w-px-292 left-px-20 top-10 leading-[1.35] tracking-[0.02em]"
            >
              WA businesses feel confident about future growth
            </p>
            <p
              ref={(el) => {
                textOverlaysRef.current[1] = el
              }}
              className="absolute z-20 font-sohne text-xs text-[#fafafa] text-right right-px-20 top-px-86 leading-[1.35] tracking-[0.02em]"
            >
              AI cant replace creativity
            </p>
            <p
              ref={(el) => {
                textOverlaysRef.current[2] = el
              }}
              className="absolute z-20 font-sohne text-xs text-[#fafafa] left-px-20 top-px-147 leading-[1.35] tracking-[0.02em]"
            >
              Sales measure true success
            </p>
            <p
              ref={(el) => {
                textOverlaysRef.current[3] = el
              }}
              className="absolute z-20 font-sohne text-xs text-[#fafafa] text-right right-px-30 top-px-211 bottom-px-80 leading-[1.35] tracking-[0.02em]"
            >
              Human connection drives WA business
            </p>
            <p
              ref={(el) => {
                textOverlaysRef.current[4] = el
              }}
              className="absolute z-20 font-sohne text-xs text-[#fafafa] left-px-20 top-px-274 bottom-px-20 max-w-px-226 leading-[1.35] tracking-[0.02em]"
            >
              The primary barrier to digital transformation is financial
              investment
            </p>
          </div>
        </div>

        {/* Main Heading */}
        <h2
          ref={headingRef}
          className="font-bagoss text-2xl text-center mx-5 pb-6 leading-[1.2] tracking-[0.01em] text-[#FAFAFA]"
        >
          Compare your thoughts on{" "}
          <span
            className="font-bagoss"
            style={{
              background:
                "linear-gradient(90deg, #FABBFF 0%, #B179FF 35%, #6DDDFF 83%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            technology
          </span>{" "}
          with current industry opinions.
        </h2>

        {/* CTA Button */}
        <div ref={ctaRef}>
          <CTAButton text="Get a reality check" variant="primary" />
        </div>
      </div>
    </div>
  )
}
