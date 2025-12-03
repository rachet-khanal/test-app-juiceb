import "./globals.css"

import type { Metadata, Viewport } from "next"
import {
  agrandir,
  bagoss,
  sfCompactDisplay,
  sfProDisplay,
  sohne,
} from "./fonts"

export const metadata: Metadata = {
  title: "Juicebox",
  description: "Juicebox App",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Juicebox",
  },
  icons: {
    apple: "/images/logo.svg",
  },
}

export const viewport: Viewport = {
  themeColor: "#3D3D3D",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </head>
      <body
        className={`
          ${bagoss.variable} ${sohne.variable} ${agrandir.variable} ${sfProDisplay.variable} 
          ${sfCompactDisplay.variable} antialiased bg-[141218]`}
      >
        <div
          className="
          fixed inset-0 -z-10
        "
        />
        {children}
      </body>
    </html>
  )
}
