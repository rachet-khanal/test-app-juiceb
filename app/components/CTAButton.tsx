"use client"

interface CTAButtonProps {
  text: string
  onClick?: () => void
  variant?: "primary" | "secondary" | "outline"
  fullWidth?: boolean
}

export default function CTAButton({
  text,
  onClick,
  variant = "primary",
  fullWidth = true,
}: CTAButtonProps) {
  const baseStyles =
    "font-sohne transition-colors flex items-center justify-center mx-px-20 my-6 cursor-pointer"

  const variantStyles = {
    // Purple background (home page)
    primary: "bg-[#cdaaff] text-[#0c0d10] hover:bg-[#d9b8ff]",
    // White background (Get started)
    secondary: "bg-white text-[#0c0d10] hover:bg-gray-100",
    // Black outline (Continue)
    outline: "bg-transparent text-white border border-white hover:bg-white/10",
  }

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]}`}
      style={{
        width: fullWidth ? "-webkit-fill-available" : "auto",
        height: "3.5rem", // 56px
        fontSize: "1em", // 16px (relative to parent)
        lineHeight: "1.1875", // 19px / 16px
        borderRadius: "1.1875rem", // 19px
      }}
    >
      {text}
    </button>
  )
}
