"use client"

import { LOTTIE_PRESETS, useLottie } from "@/app/contexts/LottieContext"
import { emailSchema, firstNameSchema } from "@/app/lib/validations"
import { useEffect, useRef, useState } from "react"

import Input from "@/app/components/Input"
import { ZodError } from "zod"
import gsap from "gsap"
import { useBackButton } from "@/app/contexts/BackButtonContext"
import { useBackground } from "@/app/contexts/BackgroundContext"
import { useCTAButton } from "@/app/contexts/CTAButtonContext"
import { useFormData } from "@/app/contexts/FormDataContext"
import { useNavigation } from "@/app/contexts/NavigationContext"

export default function SurveyPage() {
  const { navigateTo } = useNavigation()
  const { setCTAConfig } = useCTAButton()
  const { setCustomBackHandler } = useBackButton()
  const { formData, dispatch } = useFormData()
  const { setLottieSize } = useLottie()
  const { setGradient } = useBackground()

  const [step, setStep] = useState<1 | 2>(1)
  const [name, setName] = useState(formData.name)
  const [email, setEmail] = useState(formData.email)
  const [nameError, setNameError] = useState<string>("")
  const [emailError, setEmailError] = useState<string>("")

  const textRef = useRef<HTMLParagraphElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Set Lottie size and gradient for this page
  useEffect(() => {
    setLottieSize(
      LOTTIE_PRESETS.survey.width,
      LOTTIE_PRESETS.survey.width,
      LOTTIE_PRESETS.survey.padding
    )
    setGradient("default")
  }, [setLottieSize, setGradient])

  // Animate text on mount and step change
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

    // Focus input when step changes
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [step])

  // Validate name
  const validateName = (value: string): boolean => {
    try {
      firstNameSchema.parse(value)
      setNameError("")
      return true
    } catch (error) {
      if (error instanceof ZodError) {
        setNameError(error.issues[0]?.message || "Invalid name")
      }
      return false
    }
  }

  // Validate email
  const validateEmail = (value: string): boolean => {
    try {
      emailSchema.parse(value)
      setEmailError("")
      return true
    } catch (error) {
      if (error instanceof ZodError) {
        setEmailError(error.issues[0]?.message || "Invalid email")
      }
      return false
    }
  }

  // Configure CTA button based on step
  useEffect(() => {
    const handleSubmit = () => {
      if (step === 1) {
        if (validateName(name)) {
          dispatch({ type: "SET_NAME", payload: name.trim() })
          setStep(2)
        }
      } else {
        if (validateEmail(email)) {
          dispatch({ type: "SET_EMAIL", payload: email.trim() })
          navigateTo("/results")
        }
      }
    }

    const isValid =
      step === 1 ? name.trim().length > 0 : email.trim().length > 0

    setCTAConfig({
      text: "Next",
      variant: "outline",
      disabled: !isValid,
      onClick: handleSubmit,
    })
  }, [step, name, email, dispatch, navigateTo, setCTAConfig])

  // Configure back button
  useEffect(() => {
    const handleBack = () => {
      if (step === 1) {
        // Set Lottie size and gradient back to tutorial preset
        setLottieSize(
          LOTTIE_PRESETS.tutorial.width,
          LOTTIE_PRESETS.tutorial.height,
          LOTTIE_PRESETS.tutorial.padding
        )
        setGradient("default") // Tutorial slide 2 uses default gradient
        navigateTo("/tutorial")
      } else {
        setStep(1)
        setEmailError("") // Clear email error when going back
      }
    }
    setCustomBackHandler(() => handleBack)
    return () => setCustomBackHandler(null)
  }, [step, navigateTo, setCustomBackHandler, setLottieSize, setGradient])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (step === 1) {
      setName(value)
      // Clear error when user starts typing
      if (nameError) setNameError("")
    } else {
      setEmail(value)
      // Clear error when user starts typing
      if (emailError) setEmailError("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleInputSubmit()
    }
  }

  const handleInputSubmit = () => {
    if (step === 1 && validateName(name)) {
      dispatch({ type: "SET_NAME", payload: name.trim() })
      setStep(2)
    } else if (step === 2 && validateEmail(email)) {
      dispatch({ type: "SET_EMAIL", payload: email.trim() })
      navigateTo("/results")
    }
  }

  const isInputValid = () => {
    if (step === 1) {
      return name.trim().length > 0
    }
    return email.trim().length > 0
  }
  /* Page */

  return (
    <div className="container-page-survey">
      <p ref={textRef} className="body-medium pb-45">
        {step === 1
          ? "Let's start with the basics. Type in your first name."
          : "How should we contact you? Type in your email address."}
      </p>

      <div className="w-full flex-row-centered py-6">
        <Input
          ref={inputRef}
          type={step === 1 ? "text" : "email"}
          value={step === 1 ? name : email}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={step === 1 ? "First name" : "E-mail address"}
          error={step === 1 ? nameError : emailError}
          isValid={isInputValid()}
          onSubmit={handleInputSubmit}
          autoFocus
        />
      </div>
    </div>
  )
}
