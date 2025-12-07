"use client"

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react"

// Gradient configurations
export const GRADIENTS = {
  home: "radial-gradient(94.55% 94.55% at 50% 5.45%, #222737 0%, #0C0D10 100%)",
  "tutorial-first":
    "radial-gradient(51.9% 51.9% at 50% 48.1%, #222737 0%, #0C0D10 100%)",
  default:
    "radial-gradient(94.55% 94.55% at 50% 5.45%, #222737 0%, #0C0D10 100%)",
} as const

export type GradientType = keyof typeof GRADIENTS

interface BackgroundContextType {
  currentGradient: GradientType
  setGradient: (gradient: GradientType) => void
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(
  undefined
)

export function BackgroundProvider({ children }: { children: ReactNode }) {
  const [currentGradient, setCurrentGradientState] =
    useState<GradientType>("home")

  const setGradient = useCallback((gradient: GradientType) => {
    setCurrentGradientState(gradient)
  }, [])

  return (
    <BackgroundContext.Provider value={{ currentGradient, setGradient }}>
      {children}
    </BackgroundContext.Provider>
  )
}

export function useBackground() {
  const context = useContext(BackgroundContext)
  if (context === undefined) {
    throw new Error("useBackground must be used within a BackgroundProvider")
  }
  return context
}
