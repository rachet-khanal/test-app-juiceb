import type { Metadata } from "next";
import "./globals.css";
import { bagoss, sohne, agrandir, sfProDisplay, sfCompactDisplay } from "./fonts";

export const metadata: Metadata = {
  title: "Juicebox",
  description: "Juicebox App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bagoss.variable} ${sohne.variable} ${agrandir.variable} ${sfProDisplay.variable} ${sfCompactDisplay.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
