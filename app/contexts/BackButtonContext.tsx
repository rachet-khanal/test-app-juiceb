"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface BackButtonContextType {
  customBackHandler: (() => void) | null
  setCustomBackHandler: (handler: (() => void) | null) => void
}

const BackButtonContext = createContext<BackButtonContextType | undefined>(
  undefined
)

export function BackButtonProvider({ children }: { children: ReactNode }) {
  const [customBackHandler, setCustomBackHandler] = useState<
    (() => void) | null
  >(null)

  return (
    <BackButtonContext.Provider
      value={{ customBackHandler, setCustomBackHandler }}
    >
      {children}
    </BackButtonContext.Provider>
  )
}

export function useBackButton() {
  const context = useContext(BackButtonContext)
  if (context === undefined) {
    throw new Error("useBackButton must be used within a BackButtonProvider")
  }
  return context
}
