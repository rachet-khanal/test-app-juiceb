"use client"

import lottie, { AnimationItem } from "lottie-web"
import { useCallback, useEffect, useRef } from "react"

import { gsap } from "gsap"

interface LottieAnimationProps {
  className?: string
  loop?: boolean
  autoplay?: boolean
  speed?: number
  delay?: number // Delay in seconds before animation starts
}

export default function LottieAnimation({
  className,
  loop = true,
  autoplay = true,
  speed = 1,
  delay = 0,
}: LottieAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const patternRef = useRef<SVGPatternElement>(null)

  // Update pattern transform based on blob flip state
  const updatePatternTransform = (isFlipped: boolean) => {
    if (!patternRef.current) return

    if (isFlipped) {
      // Blob is horizontally flipped - flip pattern to match
      patternRef.current.setAttribute(
        "patternTransform",
        "scale(1.05, -1.05) translate(0, 1)"
      )
    } else {
      // Blob is in normal orientation - apply default pattern transform
      patternRef.current.setAttribute(
        "patternTransform",
        "scale(-1.05, -1.05) translate(-1, 1)"
      )
    }
  }

  // Extract transform matrix from currently active Lottie frame
  const getActiveFrameTransform = (lottieContainer: Element): string | null => {
    const allTransformGroups = lottieContainer.querySelectorAll("g[transform]")
    const visibleGroups: Element[] = []

    // Filter out hidden groups
    for (const group of allTransformGroups) {
      const style = (group as HTMLElement).style.display
      if (style !== "none") {
        visibleGroups.push(group)
      }
    }

    // Find active frame (the one with opacity="1")
    let activeGroup = null
    for (const group of visibleGroups) {
      const nested = group.querySelector("g")
      const opacity = nested?.getAttribute("opacity")

      if (nested && opacity === "1") {
        activeGroup = group
        break
      }
    }

    // Fallback to last visible group if no active frame found
    if (!activeGroup && visibleGroups.length > 0) {
      activeGroup = visibleGroups[visibleGroups.length - 1]
    }

    return activeGroup?.getAttribute("transform") || null
  }

  // Check if the transform matrix indicates a horizontal flip
  const isBlobFlipped = (transform: string | null): boolean => {
    return transform?.includes("matrix(-1") || false
  }

  // Initialize Lottie animation with custom settings
  const loadLottie = (currentContainer: HTMLDivElement) => {
    return lottie.loadAnimation({
      container: currentContainer,
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: "/JB2G_JAI.json",
      rendererSettings: {
        // @ts-expect-error - id is supported but not in type definitions
        id: "lottie-blob",
        className: "w-full h-full",
        preserveAspectRatio: "none",
        viewBoxSize: "40 0 570 650",
      },
    })
  }

  // Setup GSAP-controlled animation after Lottie DOM is ready
  const setupGSAPAnimation = useCallback(
    (anim: AnimationItem) => {
      let frameTween: gsap.core.Tween | null = null
      const lottieContainer =
        containerRef.current?.querySelector("svg#lottie-blob")
      if (!lottieContainer) return null

      const startFrame = 0
      const endFrame = anim.totalFrames - 1
      const frameObj = { frame: startFrame }
      const duration = 2 / speed // Animation duration in seconds, adjusted by speed

      let lastFlipState = false

      if (autoplay) {
        frameTween = gsap.fromTo(
          frameObj,
          { frame: startFrame },
          {
            frame: endFrame,
            duration: duration,
            repeat: loop ? -1 : 0,
            ease: "none",
            delay: delay,
            onUpdate: () => {
              // Update Lottie to current frame (rounded to avoid interpolation artifacts)
              const currentFrame = Math.round(frameObj.frame)
              anim.goToAndStop(currentFrame, true)

              // Check if blob is flipped and update pattern accordingly
              const transform = getActiveFrameTransform(lottieContainer)
              const isFlipped = isBlobFlipped(transform)

              // Only update pattern when flip state changes to avoid unnecessary DOM operations
              if (isFlipped !== lastFlipState) {
                updatePatternTransform(isFlipped)
                lastFlipState = isFlipped
              }
            },
          }
        )
      }
      return frameTween
    },
    [autoplay, loop, speed, delay]
  )

  useEffect(() => {
    if (!containerRef.current) return

    const anim = loadLottie(containerRef.current)

    const frameTween: gsap.core.Tween | null = setupGSAPAnimation(anim)

    anim.addEventListener("DOMLoaded", () => setupGSAPAnimation(anim))

    // Cleanup function
    return () => {
      if (frameTween) {
        frameTween.kill()
      }
      anim.destroy()
    }
  }, [speed, setupGSAPAnimation])

  return (
    <div ref={containerRef} className={`relative ${className ?? ""}`}>
      {/* Pattern definition kept for future use */}
      <svg className="opacity-0 absolute">
        <defs>
          <pattern
            ref={patternRef}
            id="blobPattern"
            x="0"
            y="0"
            width="1"
            height="1"
            patternContentUnits="objectBoundingBox"
            patternTransform="scale(-1.05, -1.05) translate(-1, 1)"
          >
            <image
              href="/images/blob-bg.png"
              x="0"
              y="0"
              width="1"
              height="1"
              preserveAspectRatio="xMidYMid slice"
            />
          </pattern>
        </defs>
      </svg>
    </div>
  )
}
