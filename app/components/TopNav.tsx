"use client"

import { useEffect, useRef, useState } from "react"

import AnimatedLogo from "./AnimatedLogo"
import IconButton from "./IconButton"
import { gsap } from "gsap"
import { useBackButton } from "../contexts/BackButtonContext"
import { useNavigation } from "../contexts/NavigationContext"
import { usePathname } from "next/navigation"

export default function TopNav() {
  const pathname = usePathname()
  const { navigateTo } = useNavigation()
  const { customBackHandler } = useBackButton()
  const [triggerAnimation, setTriggerAnimation] = useState(false)
  const backButtonRef = useRef<HTMLDivElement>(null)

  // Show back button on non-home pages
  const showBackButton = pathname !== "/"

  const handleBackClick = () => {
    if (customBackHandler) {
      // Use custom back handler if set by a page (e.g., tutorial slides)
      customBackHandler()
    } else {
      // Default: Navigate back using transition-aware navigation
      navigateTo("/")
    }
  }

  const handleRefreshClick = () => {
    // Reload the page
    if (typeof window !== "undefined") {
      window.location.reload()
    }
  }

  const handleLogoInteraction = () => {
    setTriggerAnimation(true)
    // Reset after animation completes
    setTimeout(() => setTriggerAnimation(false), 1500)
  }

  // Animate back button in/out when showBackButton changes
  useEffect(() => {
    if (!backButtonRef.current) return

    if (showBackButton) {
      // Fade in
      gsap.fromTo(
        backButtonRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        }
      )
    } else {
      // Fade out
      gsap.to(backButtonRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      })
    }
  }, [showBackButton])

  return (
    <div className="flex flex-row justify-between items-center w-full px-px-20 py-5">
      {/* Left side - Back button (always rendered, animated in/out) */}
      <div
        ref={backButtonRef}
        style={{ opacity: 0 }}
        className={showBackButton ? "" : "pointer-events-none"}
      >
        <IconButton label="Go back" onClick={handleBackClick}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.70711 16.7071C9.31659 17.0976 8.68342 17.0976 8.2929 16.7071L2.29289 10.7071C1.90237 10.3166 1.90237 9.68342 2.29289 9.29289L8.2929 3.29289C8.68342 2.90237 9.31659 2.90237 9.70712 3.29289C10.0976 3.68342 10.0976 4.31658 9.70712 4.70711L5.41422 9H17C17.5523 9 18 9.44772 18 10C18 10.5523 17.5523 11 17 11L5.41422 11L9.70711 15.2929C10.0976 15.6834 10.0976 16.3166 9.70711 16.7071Z"
              fill="#FAFAFA"
            />
          </svg>
        </IconButton>
      </div>

      {/* Center - Animated Logo */}
      <div
        className="absolute left-1/2 -translate-x-1/2 cursor-pointer"
        onMouseEnter={handleLogoInteraction}
        onClick={handleLogoInteraction}
      >
        <AnimatedLogo
          width={123}
          height={29}
          mode="trigger"
          trigger={triggerAnimation}
        />
      </div>

      {/* Right side - Refresh button */}
      <IconButton label="Refresh" onClick={handleRefreshClick}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.33325 3.33325V7.49992H3.81785M16.615 9.16659C16.2049 5.87799 13.3996 3.33325 9.99992 3.33325C7.2021 3.33325 4.80683 5.05673 3.81785 7.49992M3.81785 7.49992H7.49992M16.6666 16.6666V12.4999H16.182M16.182 12.4999C15.193 14.9431 12.7977 16.6666 9.99992 16.6666C6.60024 16.6666 3.79491 14.1218 3.38483 10.8333M16.182 12.4999H12.4999"
            stroke="#FAFAFA"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </IconButton>
    </div>
  )
}
