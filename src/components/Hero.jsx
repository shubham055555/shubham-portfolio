import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { FileText, ArrowDown, Sparkles, ExternalLink, Mail } from 'lucide-react'
import { GithubIcon } from './SocialIcons'
import AICharacter3D from './AICharacter3D'

export default function Hero() {
  const heroRef = useRef(null)
  const avatarRef = useRef(null)
  const leftTextRef = useRef(null)
  const rightTextRef = useRef(null)
  const bgGlowRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        leftTextRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, clearProps: 'all' }
      )
      .fromTo(
        avatarRef.current,
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, clearProps: 'all' },
        '-=0.6'
      )
      .fromTo(
        rightTextRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, clearProps: 'all' },
        '-=0.7'
      )

      // Subtle breathing glow animation
      gsap.to(bgGlowRef.current, {
        scale: 1.15,
        opacity: 0.8,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const scrollToWork = () => {
    const el = document.getElementById('what-i-do')
    if (el) {
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { offset: -60 })
      } else {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const scrollToContact = () => {
    const el = document.getElementById('contact')
    if (el) {
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { offset: -60 })
      } else {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-between pt-24 pb-8 overflow-hidden bg-background"
    >
      {/* Ambient background glows */}
      <div
        ref={bgGlowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-mint-500/10 rounded-full blur-[140px] pointer-events-none -z-10"
      ></div>
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-mint-400/10 rounded-full blur-[130px] pointer-events-none -z-10"></div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none -z-10"></div>

      {/* Main Hero Row */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-4 py-8">
          
          {/* Left Column: Hello I'm Shubham Kumar */}
          <div
            ref={leftTextRef}
            className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left z-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mint-950/60 border border-mint-500/30 text-mint-300 font-mono text-[11px] sm:text-xs mb-4 shadow-sm text-center">
              <Sparkles className="w-3.5 h-3.5 text-mint-400 shrink-0 animate-spin-slow" />
              <span>Greater Delhi Area • Available for AI/ML Roles</span>
            </div>

            <p className="text-lg sm:text-2xl font-semibold text-mint-400 mb-1 tracking-tight">
              Hello! I'm
            </p>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight leading-[1.08] font-display">
              SHUBHAM <br />
              <span className="text-slate-100">SHARMA</span>
            </h1>

            <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-slate-300 font-normal max-w-md">
              <strong className="text-mint-300 font-medium">BE THE EXCEPTION.</strong> AI/ML Engineer passionate about Machine Learning, Deep Learning, NLP, and Generative AI — fine-tuning intelligent models that learn, adapt, and scale.
            </p>

            {/* Quick Action Buttons */}
            <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start w-full sm:w-auto">
              <button
                onClick={scrollToWork}
                className="w-full sm:w-auto px-5 py-3 sm:py-2.5 rounded-lg bg-mint-400 hover:bg-mint-300 text-black font-bold text-xs font-mono uppercase tracking-wider transition-all duration-300 shadow-mint-sm hover:shadow-mint-glow cursor-pointer text-center"
              >
                Explore Experience ↓
              </button>
              <button
                onClick={scrollToContact}
                className="w-full sm:w-auto px-5 py-3 sm:py-2.5 rounded-lg bg-surface-100 hover:bg-surface-200 text-slate-200 hover:text-white font-medium text-xs font-mono uppercase tracking-wider border border-slate-800 hover:border-slate-600 transition-all duration-300 cursor-pointer text-center"
              >
                Get In Touch
              </button>
            </div>
          </div>

          {/* Center Column: 3D Interactive AI Robot Character */}
          <div className="lg:col-span-4 flex flex-col justify-center items-center my-4 lg:my-0 z-20">
            <div
              ref={avatarRef}
              className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center"
            >
              {/* Interactive 3D Mascot Canvas */}
              <AICharacter3D className="w-full h-full" />

              {/* Floating Status Pill */}
              <div className="absolute -bottom-2 sm:bottom-0 left-1/2 -translate-x-1/2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[#080d12]/90 border border-mint-400/40 backdrop-blur-md flex items-center gap-2 shadow-lg z-30 pointer-events-none max-w-[95%]">
                <span className="w-2 h-2 rounded-full bg-mint-400 shrink-0 animate-ping"></span>
                <span className="text-[10px] sm:text-[11px] font-mono font-medium text-slate-200 truncate">
                  KR Mangalam University • B.Tech AI/ML
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: AI / ML Engineer */}
          <div
            ref={rightTextRef}
            className="lg:col-span-4 flex flex-col items-center lg:items-end text-center lg:text-right z-10"
          >
            <p className="text-xl sm:text-2xl font-semibold text-slate-300 mb-1 tracking-tight">
              Generative AI &
            </p>

            <div className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-[1.05] font-display">
              <span className="text-mint-400 glow-text-mint block">
                AI / ML
              </span>
              <span className="text-white block">
                ENGINEER
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 justify-center lg:justify-end max-w-xs font-mono text-[11px] text-slate-400">
              <span className="px-2.5 py-1 rounded bg-surface-100 border border-slate-800">Generative AI</span>
              <span className="px-2.5 py-1 rounded bg-surface-100 border border-slate-800">Machine Learning</span>
              <span className="px-2.5 py-1 rounded bg-surface-100 border border-slate-800">Deep Learning & NLP</span>
              <span className="px-2.5 py-1 rounded bg-surface-100 border border-slate-800">Python & GCP GenAI</span>
            </div>

            {/* Quick stats counter pill */}
            <div className="mt-6 p-3 rounded-xl bg-surface-50/70 border border-slate-800/80 backdrop-blur-sm flex items-center gap-4 text-left">
              <div>
                <div className="text-lg font-bold text-mint-400 font-mono leading-none">6+</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">AI Roles/Internships</div>
              </div>
              <div className="w-px h-7 bg-slate-800"></div>
              <div>
                <div className="text-lg font-bold text-white font-mono leading-none">5+</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Hackathons Won/Top</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Hero Bar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full flex items-center justify-between z-20 pt-4">
        {/* Bottom Left: LinkedIn & GitHub Links */}
        <div className="flex items-center gap-3">
          <a
            href="https://www.linkedin.com/in/shubhamsharma-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-slate-400 hover:text-mint-300 transition-colors group p-2 rounded-lg hover:bg-surface-50 cursor-pointer"
            title="Visit LinkedIn Profile"
          >
            <span className="font-mono text-xs text-mint-400 font-semibold group-hover:scale-105 transition-transform">in/</span>
            <span className="hidden sm:inline font-mono text-xs text-slate-300 group-hover:text-mint-300">
              shubhamsharma-ai
            </span>
          </a>

          <a
            href="https://github.com/shubham055555"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-slate-400 hover:text-mint-300 transition-colors group p-2 rounded-lg hover:bg-surface-50 cursor-pointer"
            title="Visit GitHub Profile"
          >
            <GithubIcon className="w-4 h-4 text-mint-400 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline font-mono text-xs text-slate-300 group-hover:text-mint-300">
              github/shubham055555
            </span>
          </a>
        </div>

        {/* Bottom Center: Scroll indicator */}
        <button
          onClick={scrollToWork}
          className="hidden md:flex flex-col items-center gap-1 text-slate-500 hover:text-mint-400 transition-colors cursor-pointer group"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 group-hover:text-mint-300">
            Scroll Down
          </span>
          <ArrowDown className="w-4 h-4 animate-bounce text-mint-400" />
        </button>

        {/* Bottom Right: Resume Button */}
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault()
            scrollToContact()
          }}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-surface-50 hover:bg-surface-100 border border-slate-800 hover:border-mint-400/40 text-xs font-mono text-slate-300 hover:text-mint-300 transition-all cursor-pointer group shadow-sm"
        >
          <span className="tracking-widest font-semibold">RESUME</span>
          <FileText className="w-4 h-4 text-mint-400 group-hover:rotate-12 transition-transform" />
        </a>
      </div>
    </section>
  )
}
