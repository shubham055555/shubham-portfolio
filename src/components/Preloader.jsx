import React, { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const preloaderRef = useRef(null)
  const pillRef = useRef(null)
  const marqueeRef = useRef(null)

  useEffect(() => {
    // Disable body scroll during preload
    document.body.style.overflow = 'hidden'

    // Continuous Infinite Left Marquee Animation
    if (marqueeRef.current) {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        repeat: -1,
        duration: 14,
        ease: 'none',
      })
    }

    // Progress counter animation
    const tl = gsap.timeline({
      onComplete: () => {
        setIsReady(true)
        // Auto transition after brief pause
        setTimeout(() => {
          triggerExit()
        }, 600)
      }
    })

    const progressObj = { value: 0 }
    tl.to(progressObj, {
      value: 100,
      duration: 2.2,
      ease: 'power2.inOut',
      onUpdate: () => {
        setProgress(Math.floor(progressObj.value))
      }
    })

    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const triggerExit = () => {
    if (!preloaderRef.current) return

    const exitTl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = ''
        if (onComplete) onComplete()
      }
    })

    exitTl
      .to(pillRef.current, {
        scale: 1.1,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in'
      })
      .to(preloaderRef.current, {
        yPercent: -100,
        duration: 0.9,
        ease: 'power4.inOut'
      })
  }

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#d8f0ea] text-slate-900 select-none overflow-hidden"
    >
      {/* Top Bar */}
      <div className="w-full max-w-7xl mx-auto px-4 py-4 sm:px-6 sm:py-6 flex items-center justify-between z-20">
        <div className="flex items-center gap-2">
          <span className="font-bold text-xl sm:text-2xl tracking-tighter text-slate-900 font-display">
            SS
          </span>
          <span className="h-2 w-2 rounded-full bg-mint-500 animate-ping"></span>
        </div>

        {/* Minimal Equalizer */}
        <div className="flex items-end gap-1 sm:gap-1.5 h-5 sm:h-6">
          <div className="w-1 bg-slate-900 rounded-full animate-eq-1"></div>
          <div className="w-1 bg-mint-500 rounded-full animate-eq-2"></div>
          <div className="w-1 bg-slate-900 rounded-full animate-eq-3"></div>
          <div className="w-1 bg-slate-900 rounded-full animate-eq-4"></div>
        </div>
      </div>

      {/* Giant Background Marquee Text */}
      <div className="relative w-full overflow-hidden whitespace-nowrap py-8 sm:py-12 opacity-85 select-none pointer-events-none flex">
        <div
          ref={marqueeRef}
          className="inline-flex text-[10vw] sm:text-[9vw] font-black uppercase tracking-tight text-slate-900 leading-none whitespace-nowrap will-change-transform"
        >
          <span>AI/ML ENGINEER • GENERATIVE AI • MACHINE LEARNING • DEEP LEARNING • NLP •&nbsp;</span>
          <span>AI/ML ENGINEER • GENERATIVE AI • MACHINE LEARNING • DEEP LEARNING • NLP •&nbsp;</span>
        </div>
      </div>

      {/* Center Interactive Loading Pill */}
      <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none px-4">
        <div
          ref={pillRef}
          onClick={isReady ? triggerExit : undefined}
          className={`pointer-events-auto transition-all duration-300 transform max-w-full ${
            isReady ? 'cursor-pointer hover:scale-105 shadow-mint-glow' : ''
          }`}
        >
          <div className="relative flex items-center gap-3 sm:gap-4 bg-[#080c10] text-white px-5 py-3 sm:px-8 sm:py-4 rounded-full border border-slate-700/80 shadow-2xl overflow-hidden group">
            {/* Teal glowing edge accent */}
            <div className="absolute left-0 top-0 bottom-0 w-2 sm:w-2.5 bg-gradient-to-b from-mint-300 via-mint-400 to-mint-600 shadow-[0_0_15px_#00f5d4]"></div>

            <div className="flex items-center gap-2 sm:gap-3 font-mono text-xs sm:text-sm tracking-wider sm:tracking-widest pl-1 sm:pl-2">
              {!isReady ? (
                <>
                  <span className="font-semibold text-slate-300 uppercase">LOADING</span>
                  <span className="text-mint-400 font-bold min-w-[2.8rem] sm:min-w-[3.5rem] text-right">
                    {progress}%
                  </span>
                  <div className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 bg-mint-400 rounded-sm animate-pulse shadow-[0_0_8px_#00f5d4]"></div>
                </>
              ) : (
                <>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-mint-400 rounded-sm"></div>
                  <span className="font-bold text-mint-300 tracking-wider">WELCOME</span>
                  <span className="text-[10px] sm:text-xs text-slate-400 font-sans tracking-normal pl-1 sm:pl-2 group-hover:text-white">
                    (Tap to enter)
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Info Bar */}
      <div className="w-full max-w-7xl mx-auto px-4 py-4 sm:px-6 sm:py-6 flex items-center justify-between text-[11px] sm:text-xs font-mono text-slate-600 z-20">
        <span>© 2026 SHUBHAM</span>
        <button
          onClick={triggerExit}
          className="hover:text-slate-900 underline underline-offset-4 cursor-pointer transition-colors p-1"
        >
          Skip Intro →
        </button>
      </div>
    </div>
  )
}
