"use client"

import { useEffect, useRef, useState } from "react"
import { useNavigation } from "@/app/contexts/NavigationContext"
import { useCTAButton } from "@/app/contexts/CTAButtonContext"
import { useBackButton } from "@/app/contexts/BackButtonContext"
import { useFormData } from "@/app/contexts/FormDataContext"
import { useLottie } from "@/app/contexts/LottieContext"
import gsap from "gsap"

export default function OnboardingNamePage() {
  const { navigateTo } = useNavigation()
  const { setCTAConfig } = useCTAButton()
  const { setCustomBackHandler } = useBackButton()
  const { formData, dispatch } = useFormData()
  const { setLottieSize } = useLottie()
  const [name, setName] = useState(formData.name)
  const textRef = useRef<HTMLParagraphElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Set Lottie size for this page
  useEffect(() => {
    setLottieSize(80, 80) // Small hexagon like in the design
    return () => setLottieSize(100, 100) // Reset to default on unmount
  }, [setLottieSize])

  // Animate text on mount
  useEffect(() => {
    if (textRef.current) {
      const text = textRef.current.textContent || ""
      textRef.current.textContent = ""

      const chars = text.split("")
      const span = chars.map((char) => {
        const s = document.createElement("span")
        s.textContent = char
        s.style.opacity = "0"
        return s
      })

      span.forEach((s) => textRef.current?.appendChild(s))

      gsap.to(span, {
        opacity: 1,
        duration: 0.03,
        stagger: 0.02,
        ease: "power2.out",
      })
    }
  }, [])

  // Configure CTA button
  useEffect(() => {
    const handleContinue = () => {
      if (name.trim()) {
        dispatch({ type: "SET_NAME", payload: name.trim() })
        navigateTo("/onboarding/email")
      }
    }

    setCTAConfig({
      text: "Next",
      variant: "outline",
      disabled: !name.trim(),
      onClick: handleContinue,
    })
  }, [name, dispatch, navigateTo, setCTAConfig])

  // Configure back button
  useEffect(() => {
    const handleBack = () => {
      navigateTo("/tutorial")
    }
    setCustomBackHandler(() => handleBack)
    return () => setCustomBackHandler(null)
  }, [navigateTo, setCustomBackHandler])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && name.trim()) {
      dispatch({ type: "SET_NAME", payload: name.trim() })
      navigateTo("/onboarding/email")
    }
  }

  return (
    <div className="flex flex-col items-center justify-start px-20 pt-28 min-h-screen">
      <p
        ref={textRef}
        className="font-bagoss text-[15px] leading-[1.4] text-center text-[#fafafa] mb-32"
      >
        Let&apos;s start with the basics. Type in your first name.
      </p>

      <div className="w-full max-w-[350px]">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={name}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="First name"
            className="w-full bg-transparent border-b border-white/30 text-white text-[16px] font-sohne pb-3 pt-1 placeholder:text-white/40 focus:outline-none focus:border-white/60 transition-colors"
            autoFocus
          />
        </div>
      </div>
    </div>
  )
}
