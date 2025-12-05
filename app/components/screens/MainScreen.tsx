"use client"

import { LOTTIE_PRESETS, useLottie } from "../../contexts/LottieContext"
import { useNavigation } from "../../contexts/NavigationContext"
import { useEffect, useRef } from "react"

export default function MainScreen() {
  const textOverlaysRef = useRef<(HTMLParagraphElement | null)[]>([])
  const headingRef = useRef<HTMLHeadingElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { setLottieSize } = useLottie()
  const { isTransitioning } = useNavigation()

  // Set Lottie to home configuration when this screen mounts
  // Wait for transition to complete before changing size
  useEffect(() => {
    if (isTransitioning) return // Wait for transition to finish

    setLottieSize(LOTTIE_PRESETS.home.width, LOTTIE_PRESETS.home.height)
  }, [setLottieSize, isTransitioning])

  return (
    <div className="w-full" ref={containerRef}>
      {/* Spacer and Text Overlays Container */}
      <div className="w-full max-w-px-390 mx-auto absolute top-0">
        <div className="py-px-28">
          {/* Text overlays - positioned absolutely with high z-index */}
          <p
            ref={(el) => {
              textOverlaysRef.current[0] = el
            }}
            className="absolute font-sohne text-xs text-[#fafafa] w-px-292 left-px-20 top-10 leading-[1.35] tracking-[0.02em]"
          >
            WA businesses feel confident about future growth
          </p>
          <p
            ref={(el) => {
              textOverlaysRef.current[1] = el
            }}
            className="absolute font-sohne text-xs text-[#fafafa] text-right right-px-20 top-px-86 leading-[1.35] tracking-[0.02em]"
          >
            AI cant replace creativity
          </p>
          <p
            ref={(el) => {
              textOverlaysRef.current[2] = el
            }}
            className="absolute font-sohne text-xs text-[#fafafa] left-px-20 top-px-147 leading-[1.35] tracking-[0.02em]"
          >
            Sales measure true success
          </p>
          <p
            ref={(el) => {
              textOverlaysRef.current[3] = el
            }}
            className="absolute font-sohne text-xs text-[#fafafa] text-right right-px-30 top-px-211 bottom-px-80 leading-[1.35] tracking-[0.02em]"
          >
            Human connection drives WA business
          </p>
          <p
            ref={(el) => {
              textOverlaysRef.current[4] = el
            }}
            className="absolute font-sohne text-xs text-[#fafafa] left-px-20 top-px-274 bottom-px-20 max-w-px-226 leading-[1.35] tracking-[0.02em]"
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
    </div>
  )
}
