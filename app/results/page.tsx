"use client"

import { LOTTIE_PRESETS, useLottie } from "@/app/contexts/LottieContext"
import { useEffect, useState } from "react"

import { useBackButton } from "@/app/contexts/BackButtonContext"
import { useCTAButton } from "@/app/contexts/CTAButtonContext"
import { useFormData } from "@/app/contexts/FormDataContext"
import { useNavigation } from "@/app/contexts/NavigationContext"

export default function ResultsPage() {
  const { navigateTo } = useNavigation()
  const { setCTAConfig } = useCTAButton()
  const { setCustomBackHandler } = useBackButton()
  const { formData } = useFormData()
  const { setLottieSize } = useLottie()
  const [isHydrated, setIsHydrated] = useState(false)

  // Wait for hydration from localStorage
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  // Redirect to survey if user hasn't completed it (after hydration)
  useEffect(() => {
    if (isHydrated && (!formData.name || !formData.email)) {
      navigateTo("/survey")
    }
  }, [isHydrated, formData.name, formData.email, navigateTo])

  // Set Lottie size for this page
  useEffect(() => {
    setLottieSize(
      LOTTIE_PRESETS.result.width,
      LOTTIE_PRESETS.result.width,
      LOTTIE_PRESETS.result.padding
    )
  }, [setLottieSize])

  // Configure CTA button
  useEffect(() => {
    setCTAConfig({
      text: "Continue",
      variant: "secondary",
      disabled: false,
      onClick: () => {
        navigateTo("/")
        // handle lottie animation immediately
        setLottieSize(LOTTIE_PRESETS.home.width, LOTTIE_PRESETS.home.height)
      },
    })
  }, [navigateTo, setCTAConfig])

  // Configure back button
  useEffect(() => {
    const handleBack = () => {
      navigateTo("/survey")
    }
    setCustomBackHandler(() => handleBack)
    return () => setCustomBackHandler(null)
  }, [navigateTo, setCustomBackHandler])

  // Don't render anything if not hydrated or redirecting
  if (!isHydrated || !formData.name || !formData.email) {
    return null
  }

  return (
    <div className="flex flex-col items-center justify-start px-px-20 -mt-1 text-[19px] font-bagoss text-center text-[#fafafa]">
      <p className="leading-snug mb-6">
        Thanks, {formData.name}! Now it&apos;s time to get a reality check.
      </p>
      <p className="leading-snug">This will take 2-3 minutes.</p>
    </div>
  )
}
