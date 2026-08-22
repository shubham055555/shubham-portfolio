import React, { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    // Create an ultra-smooth Lenis instance
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.6,
      infinite: false,
    })

    lenisRef.current = lenis
    window.__lenis = lenis

    // Sync Lenis scroll event with ScrollTrigger.update()
    lenis.on('scroll', ScrollTrigger.update)

    // Use gsap.ticker to drive Lenis's raf continuously
    const updateTicker = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(updateTicker)
    gsap.ticker.lagSmoothing(0)

    // Global smooth anchor link listener for all internal navigation links
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"], button[data-target]')
      if (!target) return
      
      const href = target.getAttribute('href') || target.getAttribute('data-target')
      if (!href || href === '#') return

      const element = document.querySelector(href)
      if (element) {
        e.preventDefault()
        lenis.scrollTo(element, {
          offset: -70,
          duration: 1.4,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        })
      }
    }

    document.addEventListener('click', handleAnchorClick)

    // Resize sync
    const handleResize = () => {
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      document.removeEventListener('click', handleAnchorClick)
      window.removeEventListener('resize', handleResize)
      gsap.ticker.remove(updateTicker)
      lenis.destroy()
      window.__lenis = null
    }
  }, [])

  return <>{children}</>
}

