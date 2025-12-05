"use client"

import { createContext, useContext, useState, ReactNode } from "react"

export interface CTAButtonConfig {
  text: string
  variant: "primary" | "secondary" | "outline"
  disabled?: boolean
  onClick?: () => void
}

interface CTAButtonContextType {
  ctaConfig: CTAButtonConfig
  setCTAConfig: (config: CTAButtonConfig) => void
}

const CTAButtonContext = createContext<CTAButtonContextType | undefined>(
  undefined
)

export function CTAButtonProvider({ children }: { children: ReactNode }) {
  const [ctaConfig, setCTAConfig] = useState<CTAButtonConfig>({
    text: "Get a reality check",
    variant: "primary",
    disabled: false,
    onClick: () => {},
  })

  return (
    <CTAButtonContext.Provider value={{ ctaConfig, setCTAConfig }}>
      {children}
    </CTAButtonContext.Provider>
  )
}

export function useCTAButton() {
  const context = useContext(CTAButtonContext)
  if (context === undefined) {
    throw new Error("useCTAButton must be used within a CTAButtonProvider")
  }
  return context
}
