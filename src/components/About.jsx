import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Code2, Server, Cpu, Sparkles, Terminal, CheckCircle2, ArrowRight } from 'lucide-react'
import heroAvatarImg from '../assets/hero-avatar.jpg'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const avatarCardRef = useRef(null)
  const pillarsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal animation on scroll for avatar
      if (avatarCardRef.current) {
        gsap.fromTo(
          avatarCardRef.current,
          { opacity: 0, scale: 0.92 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            clearProps: 'opacity,transform',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // Reveal animation on scroll for content
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            clearProps: 'all',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // Staggered pillars reveal
      if (pillarsRef.current) {
        gsap.fromTo(
          pillarsRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            clearProps: 'all',
            scrollTrigger: {
              trigger: pillarsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-16 sm:py-28 bg-surface-DEFAULT/80 border-t border-b border-slate-800/60 overflow-hidden"
    >
      {/* Background glow accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-mint-500/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: 3D Character Avatar & Tech Card */}
          <div
            ref={avatarCardRef}
            className="lg:col-span-5 flex flex-col items-center justify-center relative"
          >
            <div className="relative group w-full max-w-sm">
              {/* Outer atmospheric aura */}
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-mint-500/20 via-teal-500/10 to-purple-500/20 blur-xl opacity-75 group-hover:opacity-100 transition-all duration-500"></div>

              {/* Character Glass Container */}
              <div className="relative rounded-2xl bg-surface-50 border border-slate-700/70 p-4 shadow-2xl overflow-hidden">
                <div className="relative rounded-xl overflow-hidden aspect-square bg-[#0a0f14] flex items-center justify-center">
                  <img
                    src={heroAvatarImg}
                    alt="Developer in action"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f14]/80 via-transparent to-transparent pointer-events-none"></div>
                  
                  {/* Live Status Badge */}
                  <div className="absolute bottom-3 left-3 right-3 px-3 py-2 rounded-lg bg-[#080d12]/90 border border-slate-700 backdrop-blur-md flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-300 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-mint-400 animate-pulse"></span>
                      Status
                    </span>
                    <span className="text-mint-400 font-semibold">Ready to Innovate</span>
                  </div>
                </div>

                {/* Micro tech tags below avatar */}
                <div className="mt-4 grid grid-cols-3 gap-2 text-center font-mono text-[11px]">
                  <div className="p-2 rounded-lg bg-surface-100 border border-slate-800">
                    <div className="text-mint-400 font-bold">100%</div>
                    <div className="text-slate-400 text-[9px] uppercase">Commitment</div>
                  </div>
                  <div className="p-2 rounded-lg bg-surface-100 border border-slate-800">
                    <div className="text-white font-bold">&lt; 50ms</div>
                    <div className="text-slate-400 text-[9px] uppercase">Avg Latency</div>
                  </div>
                  <div className="p-2 rounded-lg bg-surface-100 border border-slate-800">
                    <div className="text-mint-300 font-bold">A+</div>
                    <div className="text-slate-400 text-[9px] uppercase">Code Quality</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Content */}
          <div ref={contentRef} className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Section Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-mint-400/10 border border-mint-400/30 text-mint-300 font-mono text-xs uppercase tracking-widest mb-3">
              <span>ABOUT ME</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight font-display mb-6">
              Exploring AI to Solve <br />
              <span className="text-mint-400 glow-text-mint">Real-World Challenges</span>
            </h2>

            {/* Core Bio Paragraph */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal mb-6">
              I’m a <strong className="text-white font-semibold">B.Tech Computer Science (AI & ML) student at KR Mangalam University (2023–2027)</strong> passionate about exploring how Artificial Intelligence can solve complex real-world problems and improve human experiences.
            </p>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-normal mb-8">
              I enjoy working on <strong className="text-mint-300 font-medium">Machine Learning, Deep Learning, and Natural Language Processing</strong> — experimenting with models, analyzing conversational data, prompt engineering with LLMs, and creating intelligent systems that learn and adapt. From understanding neural networks to fine-tuning models for higher accuracy, I'm constantly innovating and competing in national hackathons.
            </p>

            {/* Core Pillars Grid */}
            <div ref={pillarsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-8">
              <div className="p-4 rounded-xl bg-surface-50 border border-slate-800 hover:border-mint-500/30 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-mint-400/10 flex items-center justify-center text-mint-400 mb-3 group-hover:bg-mint-400 group-hover:text-black transition-colors">
                  <Cpu className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-white mb-1">Generative AI & LLMs</h4>
                <p className="text-xs text-slate-400 leading-normal">
                  Conversational data analysis with LLMs, Google Cloud GenAI, prompt engineering, and intelligent agents.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface-50 border border-slate-800 hover:border-mint-500/30 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-mint-400/10 flex items-center justify-center text-mint-400 mb-3 group-hover:bg-mint-400 group-hover:text-black transition-colors">
                  <Server className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-white mb-1">Machine & Deep Learning</h4>
                <p className="text-xs text-slate-400 leading-normal">
                  Predictive modeling, neural networks, model evaluation, fine-tuning, and Python data pipelines.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface-50 border border-slate-800 hover:border-mint-500/30 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-mint-400/10 flex items-center justify-center text-mint-400 mb-3 group-hover:bg-mint-400 group-hover:text-black transition-colors">
                  <Code2 className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-white mb-1">Natural Language Processing</h4>
                <p className="text-xs text-slate-400 leading-normal">
                  Text sentiment classification, resume screening systems, semantic search, and data visualization.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface-50 border border-slate-800 hover:border-mint-500/30 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-mint-400/10 flex items-center justify-center text-mint-400 mb-3 group-hover:bg-mint-400 group-hover:text-black transition-colors">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-white mb-1">Web Development & Cloud</h4>
                <p className="text-xs text-slate-400 leading-normal">
                  Front-end web engineering (HTML5, CSS3, JavaScript, React), Google Cloud, AWS & Microsoft Azure.
                </p>
              </div>
            </div>

            {/* Action CTA */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#what-i-do"
                onClick={(e) => {
                  e.preventDefault()
                  const el = document.getElementById('what-i-do')
                  if (el) {
                    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -60 })
                    else el.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-mint-400 hover:bg-mint-300 text-black font-bold text-xs font-mono uppercase tracking-wider transition-all shadow-mint-sm hover:shadow-mint-glow cursor-pointer"
              >
                <span>View What I Do</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  const el = document.getElementById('contact')
                  if (el) {
                    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -60 })
                    else el.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-100 hover:bg-surface-200 text-slate-300 hover:text-white text-xs font-mono transition-colors border border-slate-800 cursor-pointer"
              >
                <span>shubhamramdhiraj@gmail.com</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
