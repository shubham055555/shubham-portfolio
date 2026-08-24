import React, { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'

const GREETINGS = [
  { text: 'Hello', lang: 'English' },
  { text: 'Bonjour', lang: 'French' },
  { text: 'Hola', lang: 'Spanish' },
  { text: 'Ciao', lang: 'Italian' },
  { text: 'आपका स्वागत है', lang: 'Hindi' },
  { text: 'नमस्ते', lang: 'Hindi' },
  { text: 'こんにちは', lang: 'Japanese' },
  { text: '안녕하세요', lang: 'Korean' },
  { text: '你好', lang: 'Chinese' },
  { text: 'Olá', lang: 'Portuguese' },
  { text: 'Hallo', lang: 'German' },
  { text: 'مرحبا', lang: 'Arabic' },
  { text: 'Здравствуйте', lang: 'Russian' },
  { text: 'Welcome', lang: 'English' },
]

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [greetingIndex, setGreetingIndex] = useState(0)
  const preloaderRef = useRef(null)
  const textContainerRef = useRef(null)
  const percentRef = useRef(null)
  const dotRef = useRef(null)
  const isExitingRef = useRef(false)

  // Cycle languages continuously during loading
  useEffect(() => {
    const interval = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % GREETINGS.length)
    }, 240)

    return () => clearInterval(interval)
  }, [])

  // Animate text transition smoothly on greeting change
  useEffect(() => {
    if (textContainerRef.current) {
      gsap.fromTo(
        textContainerRef.current,
        { opacity: 0, y: 8, filter: 'blur(3px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.22, ease: 'power2.out' }
      )
    }
  }, [greetingIndex])

  const triggerExit = () => {
    if (!preloaderRef.current || isExitingRef.current) return
    isExitingRef.current = true

    const exitTl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = ''
        if (onComplete) onComplete()
      },
    })

    exitTl
      .to([textContainerRef.current, dotRef.current], {
        opacity: 0,
        y: -25,
        duration: 0.35,
        ease: 'power2.in',
      })
      .to(
        percentRef.current,
        {
          opacity: 0,
          y: 25,
          duration: 0.35,
          ease: 'power2.in',
        },
        '<0.05'
      )
      .to(
        preloaderRef.current,
        {
          yPercent: -100,
          duration: 0.85,
          ease: 'power4.inOut',
        },
        '-=0.15'
      )
  }

  // Progress counter and auto exit trigger
  useEffect(() => {
    // Disable body scroll during preload
    document.body.style.overflow = 'hidden'

    const progressObj = { value: 0 }

    const tl = gsap.timeline({
      onComplete: () => {
        // Hold briefly at 100% then trigger exit
        setTimeout(() => {
          triggerExit()
        }, 300)
      },
    })

    // Smooth staggered progress count-up
    tl.to(progressObj, {
      value: 100,
      duration: 2.8,
      ease: 'power3.inOut',
      onUpdate: () => {
        const val = Math.floor(progressObj.value)
        setProgress(val)
      },
    })

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        triggerExit()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const currentGreeting = GREETINGS[greetingIndex]

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] flex flex-col justify-between bg-[#121212] text-white select-none overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 50%, #1a1a1a 0%, #121212 60%, #0c0c0c 100%)',
      }}
    >
      {/* Top Bar / Minimal Brand Symbol & Skip Button */}
      <div className="w-full px-6 py-6 sm:px-12 sm:py-8 flex items-center justify-between z-20">
        {/* Top-Left Stylized Icon */}
        <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-neutral-400"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="12" cy="12" r="2" fill="#ef4444" />
          </svg>
          <span className="text-[11px] font-mono tracking-widest text-neutral-500 uppercase hidden sm:inline">
            SHUBHAM
          </span>
        </div>

        {/* Skip Button */}
        <button
          onClick={triggerExit}
          className="text-[11px] font-mono tracking-widest uppercase text-neutral-500 hover:text-neutral-200 transition-colors px-2 py-1 rounded cursor-pointer"
        >
          Skip [ESC]
        </button>
      </div>

      {/* Center Multilingual Greeting */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-6">
        <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
          {/* Vibrant Red Accent Dot */}
          <span
            ref={dotRef}
            className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 rounded-full bg-[#ef4444] shadow-[0_0_15px_rgba(239,68,68,0.85)] flex-shrink-0 animate-pulse"
          />

          {/* Dynamic Language Word */}
          <div
            ref={textContainerRef}
            className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-wide leading-tight font-sans min-w-[200px] sm:min-w-[340px]"
          >
            {currentGreeting.text}
          </div>
        </div>
      </div>

      {/* Bottom Bar: Loading Experience & Giant Percentage */}
      <div className="w-full px-6 py-6 sm:px-12 sm:py-10 flex items-end justify-between z-20">
        {/* Bottom-Left: • LOADING EXPERIENCE */}
        <div className="flex items-center gap-2.5 text-[10px] sm:text-xs font-mono tracking-[0.25em] text-neutral-400 uppercase pb-2">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#ef4444] shadow-[0_0_8px_rgba(239,68,68,0.9)] animate-ping" />
          <span>LOADING EXPERIENCE</span>
        </div>

        {/* Bottom-Right: Giant Percentage Counter */}
        <div
          ref={percentRef}
          className="flex items-baseline font-sans select-none"
        >
          <span className="text-7xl sm:text-8xl md:text-9xl font-light tracking-tighter text-white leading-none tabular-nums">
            {progress}
          </span>
          <span className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#ef4444] ml-1 sm:ml-2">
            %
          </span>
        </div>
      </div>
    </div>
  )
}
