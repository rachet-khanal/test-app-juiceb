"use client"

import { ReactNode } from "react"

interface IconButtonProps {
  label: string
  onClick?: () => void
  children: ReactNode
}

export default function IconButton({ label, onClick, children }: IconButtonProps) {
  return (
    <button
      className="text-white w-px-46 h-px-46 bg-white/5 flex items-center justify-center rounded-[12.5rem] cursor-pointer hover:bg-white/10 transition-colors"
      aria-label={label}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
