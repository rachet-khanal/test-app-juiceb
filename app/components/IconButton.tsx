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
      className="btn-icon"
      aria-label={label}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
