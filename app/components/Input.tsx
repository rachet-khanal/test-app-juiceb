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
          className={`${
            error ? "input-container-error" : "input-container-default"
          } ${className}`}
        >
          <input ref={ref} className="input-field" {...props} />
          <button
            type="button"
            onClick={handleButtonClick}
            disabled={!isValid}
            className={
              isValid ? "btn-input-submit-valid" : "btn-input-submit-invalid"
            }
            aria-label="Submit"
          >
            <Image
              src="icons/arrow-up.svg"
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
        {error && <p className="text-error">{error}</p>}
      </div>
    )
  }
)

Input.displayName = "Input"

export default Input
