"use client"

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react"

// Base dimensions - the actual rendered size of the Lottie container
export const BASE_LOTTIE_SIZE = {
  width: 274,
  height: 290,
  padding: 28,
} as const

interface LottieConfig {
  targetWidth: number // Desired width
  targetHeight: number // Desired height
  scale: number // Calculated scale based on target dimensions
  padding: number // Padding for wrapper
}

interface LottieContextType {
  lottieConfig: LottieConfig
  setLottieSize: (
    targetWidth: number,
    targetHeight: number,
    padding?: number
  ) => void
}

// Calculate scale based on target dimensions
function calculateScale(targetWidth: number, _targetHeight: number): number {
  // Use width as the primary dimension for scaling
  return targetWidth / BASE_LOTTIE_SIZE.width
}

const defaultConfig: LottieConfig = {
  targetWidth: BASE_LOTTIE_SIZE.width,
  targetHeight: BASE_LOTTIE_SIZE.height,
  scale: 1,
  padding: 28,
}

const LottieContext = createContext<LottieContextType | undefined>(undefined)

export function LottieProvider({ children }: { children: ReactNode }) {
  const [lottieConfig, setLottieConfigState] =
    useState<LottieConfig>(defaultConfig)

  const setLottieSize = useCallback(
    (targetWidth: number, targetHeight: number, padding = 28) => {
      const scale = calculateScale(targetWidth, targetHeight)
      setLottieConfigState({
        targetWidth,
        targetHeight,
        scale,
        padding,
      })
    },
    []
  )

  return (
    <LottieContext.Provider value={{ lottieConfig, setLottieSize }}>
      {children}
    </LottieContext.Provider>
  )
}

export function useLottie() {
  const context = useContext(LottieContext)
  if (context === undefined) {
    throw new Error("useLottie must be used within a LottieProvider")
  }
  return context
}

// Preset configurations for different pages
export const LOTTIE_PRESETS = {
  home: {
    width: 274,
    height: 290,
    padding: 28,
  },
  tutorial: {
    width: 146,
    height: 155,
    padding: 48,
  },
} as const
