"use client"

import { LoaderProvider, useLoader } from "./contexts/LoaderContext"
import { ReactNode, useState } from "react"

import AnimatedBackground from "./components/AnimatedBackground"
import { BackButtonProvider } from "./contexts/BackButtonContext"
import CTAButton from "./components/CTAButton"
import { CTAButtonProvider } from "./contexts/CTAButtonContext"
import { FormDataProvider } from "./contexts/FormDataContext"
import GlobalLottie from "./components/GlobalLottie"
import LoaderScreen from "./components/screens/LoaderScreen"
import { LottieProvider } from "./contexts/LottieContext"
import { NavigationProvider } from "./contexts/NavigationContext"
import PageTransition from "./components/PageTransition"
import SmoothScroll from "./components/SmoothScroll"
import TopNav from "./components/TopNav"

function LayoutInner({ children }: { children: ReactNode }) {
  const [showLoader, setShowLoader] = useState(true)
  const { setLoaderFinished } = useLoader()

  const handleLoaderComplete = () => {
    setShowLoader(false)
    setLoaderFinished(true) // Signal to pages that loader is done
  }

  return (
    <NavigationProvider>
      <LottieProvider>
        <FormDataProvider>
          <BackButtonProvider>
            <CTAButtonProvider>
              {/* Animated Background - handles all gradient transitions */}
              <AnimatedBackground />

              <div className="text-white relative flex flex-col h-full">
                <SmoothScroll>
                  {/* Loader Overlay - shows ONCE on initial mount only */}
                  {showLoader && (
                    <div className="fixed inset-0 z-50">
                      <LoaderScreen
                        onComplete={handleLoaderComplete}
                        duration={1.75}
                      />
                    </div>
                  )}

                  {/* Header - always visible */}
                  <div
                    className="relative shrink-0"
                    style={{ paddingTop: "env(safe-area-inset-top)" }}
                  >
                    <TopNav />
                  </div>

                  {/* Page Content with transitions - grows to fill space */}
                  <div className="relative flex-1 overflow-y-auto">
                    <GlobalLottie />
                    <PageTransition>{children}</PageTransition>
                  </div>

                  {/* CTA Button - fixed at bottom with 24px spacing */}
                  <div className="shrink-0" style={{ paddingBottom: "24px" }}>
                    <CTAButton />
                  </div>
                </SmoothScroll>
              </div>
            </CTAButtonProvider>
          </BackButtonProvider>
        </FormDataProvider>
      </LottieProvider>
    </NavigationProvider>
  )
}

export function LayoutContent({ children }: { children: ReactNode }) {
  return (
    <LoaderProvider>
      <LayoutInner>{children}</LayoutInner>
    </LoaderProvider>
  )
}
