"use client"

import { InputHTMLAttributes, forwardRef } from "react"

import Image from "next/image"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
  isValid?: boolean
  onSubmit?: () => void
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, isValid = false, onSubmit, className = "", ...props }, ref) => {
    const handleButtonClick = () => {
      if (isValid && onSubmit) {
        onSubmit()
      }
    }

    return (
      <div className="w-full">
        <div
          className={`
          box-border
          flex flex-row justify-between items-center
          px-3 py-0
          gap-3
          w-full
          h-[60px]
          border border-white/60
          rounded-[18px]
          bg-transparent
          transition-all duration-200
          ${error ? "border-red-500/60" : "border-white/60"}
          focus-within:border-white
          ${className}
        `}
        >
          <input
            ref={ref}
            className="flex-1 bg-transparent text-white text-[16px] font-sohne placeholder:text-white/40 focus:outline-none w-full"
            {...props}
          />
          <button
            type="button"
            onClick={handleButtonClick}
            disabled={!isValid}
            className={`
              flex-shrink-0
              w-10 h-10
              rounded-full
              flex items-center justify-center
              transition-all duration-200
              ${
                isValid
                  ? "bg-white cursor-pointer hover:bg-gray-200 active:scale-95"
                  : "bg-white/20 cursor-not-allowed"
              }
            `}
            aria-label="Submit"
          >
            <Image
              src="/icons/arrow-up.svg"
              alt="Submit"
              width={20}
              height={20}
              className={`transition-opacity duration-200 ${
                isValid ? "opacity-100 text-black" : "opacity-30"
              }`}
              style={{
                filter: isValid ? "invert(0)" : "invert(1)",
              }}
            />
          </button>
        </div>
        {error && (
          <p className="text-red-400 text-sm mt-2 ml-3 font-sohne">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export default Input
