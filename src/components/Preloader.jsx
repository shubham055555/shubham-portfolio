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
      <div className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-20">
        <div className="flex items-center gap-2">
          <span className="font-bold text-2xl tracking-tighter text-slate-900 font-display">
            SS
          </span>
          <span className="h-2 w-2 rounded-full bg-mint-500 animate-ping"></span>
        </div>

        {/* Minimal Equalizer */}
        <div className="flex items-end gap-1.5 h-6">
          <div className="w-1 bg-slate-900 rounded-full animate-eq-1"></div>
          <div className="w-1 bg-mint-500 rounded-full animate-eq-2"></div>
          <div className="w-1 bg-slate-900 rounded-full animate-eq-3"></div>
          <div className="w-1 bg-slate-900 rounded-full animate-eq-4"></div>
        </div>
      </div>

      {/* Giant Background Marquee Text */}
      <div className="relative w-full overflow-hidden whitespace-nowrap py-12 opacity-85 select-none pointer-events-none">
        <div
          ref={marqueeRef}
          className="inline-block text-[13vw] font-black uppercase tracking-tight text-slate-900 leading-none whitespace-nowrap"
        >
          AI/ML ENGINEER • GENERATIVE AI • MACHINE LEARNING • DEEP LEARNING • NLP • AI/ML ENGINEER •
        </div>
      </div>

      {/* Center Interactive Loading Pill */}
      <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
        <div
          ref={pillRef}
          onClick={isReady ? triggerExit : undefined}
          className={`pointer-events-auto transition-all duration-300 transform ${
            isReady ? 'cursor-pointer hover:scale-105 shadow-mint-glow' : ''
          }`}
        >
          <div className="relative flex items-center gap-4 bg-[#080c10] text-white px-8 py-4 rounded-full border border-slate-700/80 shadow-2xl overflow-hidden group">
            {/* Teal glowing edge accent */}
            <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-b from-mint-300 via-mint-400 to-mint-600 shadow-[0_0_15px_#00f5d4]"></div>

            <div className="flex items-center gap-3 font-mono text-sm tracking-widest pl-2">
              {!isReady ? (
                <>
                  <span className="font-semibold text-slate-300 uppercase">LOADING</span>
                  <span className="text-mint-400 font-bold min-w-[3.5rem] text-right">
                    {progress}%
                  </span>
                  <div className="w-3.5 h-3.5 bg-mint-400 rounded-sm animate-pulse shadow-[0_0_8px_#00f5d4]"></div>
                </>
              ) : (
                <>
                  <div className="w-3 h-3 bg-mint-400 rounded-sm"></div>
                  <span className="font-bold text-mint-300 tracking-wider">WELCOME</span>
                  <span className="text-xs text-slate-400 font-sans tracking-normal pl-2 group-hover:text-white">
                    (Click to enter)
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Info Bar */}
      <div className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between text-xs font-mono text-slate-600 z-20">
        <span>EXPERIENCE PORTFOLIO © 2026</span>
        <button
          onClick={triggerExit}
          className="hover:text-slate-900 underline underline-offset-4 cursor-pointer transition-colors"
        >
          Skip Intro →
        </button>
      </div>
    </div>
  )
}
