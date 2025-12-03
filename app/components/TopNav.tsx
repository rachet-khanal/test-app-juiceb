"use client"

import Image from "next/image"
import IconButton from "./IconButton"

interface TopNavProps {
  showBackButton?: boolean
}

export default function TopNav({
  showBackButton = false,
}: TopNavProps) {
  const handleBackClick = () => {
    // Navigate back in history
    if (typeof window !== 'undefined') {
      window.history.back()
    }
  }

  const handleRefreshClick = () => {
    // Reload the page
    if (typeof window !== 'undefined') {
      window.location.reload()
    }
  }

  return (
    <div className="flex flex-row justify-between items-center w-full px-px-20 py-5">
      {/* Left side - Back button or spacer */}
      {showBackButton ? (
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
      ) : (
        <div className="w-px-46" />
      )}

      {/* Center - Logo */}
      <Image
        src="/images/logo.svg"
        alt="juicebox logo"
        width={123}
        height={29}
        priority
        className="absolute left-1/2 -translate-x-1/2"
      />

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
