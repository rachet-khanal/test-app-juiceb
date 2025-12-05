"use client"

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react"

interface NavigationContextType {
  pendingRoute: string | null
  isTransitioning: boolean
  navigateTo: (route: string) => void
  completePendingNavigation: () => void
  setTransitioning: (transitioning: boolean) => void
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
)

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [pendingRoute, setPendingRoute] = useState<string | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const navigateTo = useCallback((route: string) => {
    setPendingRoute(route)
    setIsTransitioning(true)
  }, [])

  const completePendingNavigation = useCallback(() => {
    setPendingRoute(null)
  }, [])

  const setTransitioning = useCallback((transitioning: boolean) => {
    setIsTransitioning(transitioning)
  }, [])

  return (
    <NavigationContext.Provider
      value={{
        pendingRoute,
        isTransitioning,
        navigateTo,
        completePendingNavigation,
        setTransitioning,
      }}
    >
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider")
  }
  return context
}
