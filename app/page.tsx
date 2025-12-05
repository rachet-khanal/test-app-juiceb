"use client"

import MainScreen from "./components/screens/MainScreen"
import { useCTAButton } from "./contexts/CTAButtonContext"
import { useEffect } from "react"
import { useNavigation } from "./contexts/NavigationContext"

export default function Home() {
  const { navigateTo } = useNavigation()
  const { setCTAConfig } = useCTAButton()

  // Configure CTA button for home page
  useEffect(() => {
    setCTAConfig({
      text: "Get a reality check",
      variant: "primary",
      disabled: false,
      onClick: () => navigateTo("/tutorial"),
    })
  }, [navigateTo, setCTAConfig])

  return <MainScreen />
}
