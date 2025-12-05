"use client"

import { ReactNode, useEffect, useRef, useState } from "react"
import { usePathname, useRouter } from "next/navigation"

import gsap from "gsap"
import { useLoader } from "../contexts/LoaderContext"
import { useNavigation } from "../contexts/NavigationContext"

interface Props {
  children: ReactNode
}

export default function PageTransition({ children }: Props) {
  const pathname = usePathname()
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const { loaderFinished } = useLoader()
  const { pendingRoute, completePendingNavigation, setTransitioning } =
    useNavigation()

  const [displayChildren, setDisplayChildren] = useState(children)
  const hasAnimatedIn = useRef(false)
  const isTransitioning = useRef(false)

  /* ---------------------------------------------------- */
  /* INITIAL ENTRY ANIMATION → after loader finishes      */
  /* ---------------------------------------------------- */

  useEffect(() => {
    if (!loaderFinished || !containerRef.current || hasAnimatedIn.current)
      return

    hasAnimatedIn.current = true

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        }
      )
    })

    return () => ctx.revert()
  }, [loaderFinished])

  /* ---------------------------------------------------- */
  /* HANDLE PENDING NAVIGATION → trigger exit animation   */
  /* ---------------------------------------------------- */

  useEffect(() => {
    if (!pendingRoute || !hasAnimatedIn.current || isTransitioning.current)
      return
    if (!containerRef.current) return

    isTransitioning.current = true

    const ctx = gsap.context(() => {
      // Exit animation
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.35,
        ease: "power2.inOut",
        onComplete: () => {
          // Navigate after exit animation
          router.push(pendingRoute)
        },
      })
    })

    return () => ctx.revert()
  }, [pendingRoute, router, completePendingNavigation])

  /* ---------------------------------------------------- */
  /* ENTRY ANIMATION → when pathname actually changes     */
  /* ---------------------------------------------------- */

  useEffect(() => {
    if (pendingRoute) completePendingNavigation()

    if (!hasAnimatedIn.current || !isTransitioning.current) return
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // Entry animation
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          onComplete: () => {
            isTransitioning.current = false
            setTransitioning(false)
          },
        }
      )
    })

    return () => ctx.revert()
  }, [pathname, setTransitioning])

  /* ---------------------------------------------------- */
  /* UPDATE CONTENT → sync with children changes          */
  /* ---------------------------------------------------- */

  useEffect(() => {
    setDisplayChildren(children)
  }, [children])

  /* ---------------------------------------------------- */

  return (
    <div style={{ opacity: 0 }} ref={containerRef}>
      {displayChildren}
    </div>
  )
}
