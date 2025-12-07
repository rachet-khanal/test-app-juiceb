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
      <div className="absolute-top-full">
        <div className="py-px-28">
          {/* Text overlays - positioned absolutely with high z-index */}
          <p
            ref={(el) => {
              textOverlaysRef.current[0] = el
            }}
            className="text-overlay-left overlay-position-1"
          >
            WA businesses feel confident about future growth
          </p>
          <p
            ref={(el) => {
              textOverlaysRef.current[1] = el
            }}
            className="text-overlay-right overlay-position-2"
          >
            AI cant replace creativity
          </p>
          <p
            ref={(el) => {
              textOverlaysRef.current[2] = el
            }}
            className="text-overlay-left overlay-position-3"
          >
            Sales measure true success
          </p>
          <p
            ref={(el) => {
              textOverlaysRef.current[3] = el
            }}
            className="text-overlay-right-30 overlay-position-4 bottom-px-80"
          >
            Human connection drives WA business
          </p>
          <p
            ref={(el) => {
              textOverlaysRef.current[4] = el
            }}
            className="text-overlay-left overlay-position-5 bottom-px-20"
          >
            The primary barrier to digital transformation is financial
            investment
          </p>
        </div>
      </div>

      {/* Main Heading */}
      <h2
        ref={headingRef}
        className="heading-with-spacing"
      >
        Compare your thoughts on{" "}
        <span className="text-gradient">
          technology
        </span>{" "}
        with current industry opinions.
      </h2>
    </div>
  )
}
