"use client"

import "swiper/css"
import "swiper/css/pagination"

import { LOTTIE_PRESETS, useLottie } from "../contexts/LottieContext"
import { Swiper, SwiperSlide } from "swiper/react"
import { useEffect, useRef, useState } from "react"

import DotIndicator from "../components/DotIndicator"
import { Pagination } from "swiper/modules"
import { gsap } from "gsap"
import { useBackButton } from "../contexts/BackButtonContext"
import { useCTAButton } from "../contexts/CTAButtonContext"
import { useLoader } from "../contexts/LoaderContext"
import { useNavigation } from "../contexts/NavigationContext"
import { useRouter } from "next/navigation"

const tutorialSlides = [
  {
    text: "Professionals around the world shared how they feel about technology and I've listened. Now it's your turn.",
  },
  {
    text: "I'll ask you a handful of meaningful questions and compare your responses with people in your industry.",
  },
  {
    text: "You'll get insights into current industry sentiments and a reality check about technology in a few minutes. Deal? Great!",
  },
]

export default function TutorialPage() {
  const router = useRouter()
  const { loaderFinished } = useLoader()
  const { setCTAConfig } = useCTAButton()
  const { setCustomBackHandler } = useBackButton()
  const { navigateTo } = useNavigation()
  const { setLottieSize } = useLottie()
  const [currentSlide, setCurrentSlide] = useState(0)
  const swiperRef = useRef<any>(null)
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  const isLastSlide = currentSlide === tutorialSlides.length - 1

  // Configure Lottie for tutorial page (smaller size)
  useEffect(() => {
    setLottieSize(
      LOTTIE_PRESETS.tutorial.width,
      LOTTIE_PRESETS.tutorial.height,
      LOTTIE_PRESETS.tutorial.padding
    )
  }, [setLottieSize])

  // Animate text character by character
  const animateText = (index: number) => {
    const textEl = textRefs.current[index]
    if (!textEl) return

    // Split text into characters
    const text = textEl.textContent || ""
    textEl.innerHTML = ""

    // Create span for each character
    const chars: HTMLSpanElement[] = []
    for (let i = 0; i < text.length; i++) {
      const span = document.createElement("span")
      span.textContent = text[i]
      span.style.opacity = "0.5"
      textEl.appendChild(span)
      chars.push(span)
    }

    // Animate each character's opacity from 50% to 100%
    gsap.to(chars, {
      opacity: 1,
      duration: 0.03,
      stagger: 0.02,
      ease: "none",
    })
  }

  // Entry animation when loader finishes
  useEffect(() => {
    if (!loaderFinished || !containerRef.current) return

    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power2.out" }
    )

    // Animate first slide text
    setTimeout(() => animateText(0), 500)
  }, [loaderFinished])

  // Configure CTA button based on current slide
  useEffect(() => {
    const handleContinue = () => {
      if (swiperRef.current && currentSlide < tutorialSlides.length - 1) {
        swiperRef.current.slideNext()
      } else {
        // Last slide - navigate to survey (placeholder for now, will log)
        console.log("Get started - navigate to survey")
        // TODO: router.push('/survey') when survey page is ready
      }
    }

    setCTAConfig({
      text: isLastSlide ? "Get started" : "Continue",
      variant: isLastSlide ? "secondary" : "outline",
      disabled: false,
      onClick: handleContinue,
    })
  }, [currentSlide, isLastSlide, setCTAConfig])

  // Handle slide change
  const handleSlideChange = (swiper: any) => {
    setCurrentSlide(swiper.activeIndex)
    animateText(swiper.activeIndex)
  }

  // Set custom back button handler for TopNav
  useEffect(() => {
    const handleBack = () => {
      if (currentSlide === 0) {
        // First slide - navigate back to home
        navigateTo("/")

        // handle lottie animation immediately
        setLottieSize(LOTTIE_PRESETS.home.width, LOTTIE_PRESETS.home.height)
      } else {
        // Other slides - go to previous slide
        swiperRef.current?.slidePrev()
      }
    }

    setCustomBackHandler(() => handleBack)

    // Cleanup: remove custom handler when component unmounts
    return () => {
      setCustomBackHandler(null)
    }
  }, [currentSlide, navigateTo, setCustomBackHandler, setLottieSize])

  return (
    <div ref={containerRef} style={{ opacity: 0 }} className="flex">
      {/* Swiper Container */}
      <div className="w-full px-px-20 grow">
        <Swiper
          modules={[Pagination]}
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={handleSlideChange}
          onSwiper={(swiper) => {
            swiperRef.current = swiper
          }}
          pagination={{
            clickable: false,
            el: ".custom-pagination",
            renderBullet: () => "",
          }}
          allowTouchMove={true}
        >
          {tutorialSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <h4
                ref={(el) => {
                  textRefs.current[index] = el
                }}
                className="font-bagoss min-h-[150px] mb-12 text-xl text-center mx-auto leading-tight tracking-[0.01em]"
                style={{ color: "#fafafa" }}
              >
                {slide.text}
              </h4>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Pagination Dots */}
        <div className="flex justify-center mb-6">
          <DotIndicator mode="stepper" total={3} currentStep={currentSlide} />
        </div>
      </div>
    </div>
  )
}
