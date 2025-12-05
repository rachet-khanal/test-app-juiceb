"use client"

import { BASE_LOTTIE_SIZE, useLottie } from "../contexts/LottieContext"
import { useEffect, useRef } from "react"

import LottieAnimation from "./LottieAnimation"
import { gsap } from "gsap"
import { useLoader } from "../contexts/LoaderContext"

export default function GlobalLottie() {
  const { lottieConfig } = useLottie() // assumes { scale: number }
  const { loaderFinished } = useLoader()

  const containerRef = useRef<HTMLDivElement>(null)
  const parentContainerRef = useRef<HTMLDivElement>(null)
  const isInitialized = useRef(false)
  const previousScale = useRef<number | null>(null)

  const baseWidth = BASE_LOTTIE_SIZE.width
  const baseHeight = BASE_LOTTIE_SIZE.height

  /* ---------------------------------------------- */
  /* INITIAL SIZE AFTER LOADER                      */
  /* ---------------------------------------------- */
  useEffect(() => {
    if (!loaderFinished || !containerRef.current || isInitialized.current)
      return

    isInitialized.current = true

    gsap.set(containerRef.current, {
      width: baseWidth * lottieConfig.scale,
      height: baseHeight * lottieConfig.scale,
    })
    gsap.to(parentContainerRef.current, {
      paddingTop: lottieConfig.padding,
      paddingBottom: lottieConfig.padding,
      duration: 0.35,
      ease: "power2.inOut",
    })

    previousScale.current = lottieConfig.scale
  }, [loaderFinished, lottieConfig.scale, baseWidth, baseHeight])

  /* ---------------------------------------------- */
  /* SCALE ANIMATION – RUNS ALONGSIDE PAGE TRANS    */
  /* ---------------------------------------------- */
  useEffect(() => {
    if (!isInitialized.current || !containerRef.current) return

    const prev = previousScale.current
    const current = lottieConfig.scale

    // No change
    if (prev === current) return

    gsap.to(containerRef.current, {
      width: baseWidth * current,
      height: baseHeight * current,
      duration: 0.35,
      ease: "power2.inOut",
    })
    gsap.to(parentContainerRef.current, {
      paddingTop: lottieConfig.padding,
      paddingBottom: lottieConfig.padding,
      duration: 0.35,
      ease: "power2.inOut",
    })

    previousScale.current = current
  }, [lottieConfig, baseWidth, baseHeight])

  /* ---------------------------------------------- */

  return (
    <div
      ref={parentContainerRef}
      className="relative z-0 pointer-events-none w-full"
      style={{
        paddingTop: BASE_LOTTIE_SIZE.padding,
        paddingBottom: BASE_LOTTIE_SIZE.padding,
      }}
    >
      <div
        ref={containerRef}
        className="mx-auto"
        // Base size – GSAP will override width/height as it animates
        style={{
          width: baseWidth,
          height: baseHeight,
        }}
      >
        <LottieAnimation
          className="w-full h-full pointer-events-none blob-mask"
          loop
          autoplay
          speed={1}
          delay={1.5}
        />
      </div>
    </div>
  )
}
