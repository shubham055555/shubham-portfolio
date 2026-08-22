import React, { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    // 2. Create a Lenis instance with user-specified options
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    })

    lenisRef.current = lenis
    window.__lenis = lenis

    // 4. Sync Lenis scroll event with ScrollTrigger.update()
    lenis.on('scroll', ScrollTrigger.update)

    // Use gsap.ticker to drive Lenis's raf continuously
    const updateTicker = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(updateTicker)
    gsap.ticker.lagSmoothing(0)

    // Global smooth anchor link listener for # links
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]')
      if (!target) return
      const href = target.getAttribute('href')
      if (href === '#' || !href) return
      const element = document.querySelector(href)
      if (element) {
        e.preventDefault()
        lenis.scrollTo(element, { offset: -60, duration: 1.2 })
      }
    }

    document.addEventListener('click', handleAnchorClick)

    // 5. Clean up the Lenis instance on component unmount
    return () => {
      document.removeEventListener('click', handleAnchorClick)
      gsap.ticker.remove(updateTicker)
      lenis.destroy()
      window.__lenis = null
    }
  }, [])

  return <>{children}</>
}

