import React, { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown, ChevronUp, Layers, Cpu, Database, Sparkles, CheckCircle } from 'lucide-react'
import codingDeskImg from '../assets/coding-desk.jpg'

gsap.registerPlugin(ScrollTrigger)

export default function WhatIDo() {
  // Default expanded states
  const [expandedCards, setExpandedCards] = useState({
    frontend: true,
    backend: true,
    ai: false,
  })

  const sectionRef = useRef(null)
  const deskImgRef = useRef(null)
  const cardsContainerRef = useRef(null)
  const titleRef = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      // ScrollTrigger for Section Title & Desk Graphic
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
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

      if (deskImgRef.current) {
        gsap.fromTo(
          deskImgRef.current,
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

      // Slide up for service cards
      if (cardsContainerRef.current) {
        gsap.fromTo(
          cardsContainerRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            clearProps: 'all',
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // Floating animation for the desk graphic
      gsap.to(deskImgRef.current, {
        y: -10,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const toggleCard = (cardKey) => {
    setExpandedCards((prev) => ({
      ...prev,
      [cardKey]: !prev[cardKey],
    }))
  }

  return (
    <section
      id="what-i-do"
      ref={sectionRef}
      className="relative py-28 bg-background/40 overflow-hidden"
    >
      {/* Background glow ambiance */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-mint-500/10 rounded-full blur-[140px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          
          {/* Left Column: WHAT I DO Heading + 3D Coding Character at Desk */}
          <div className="lg:col-span-5 flex flex-col items-start lg:sticky lg:top-28">
            
            {/* Giant Title (Matches reference screenshot 5) */}
            <div ref={titleRef} className="mb-8">
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-none font-display">
                <span className="text-white block">WHAT</span>
                <span className="text-mint-400 glow-text-mint block">I DO</span>
              </h2>
              <p className="mt-3 text-sm text-slate-400 font-mono">
                // Specialized Engineering Disciplines
              </p>
            </div>

            {/* 3D Developer at Coding Desk Illustration Card */}
            <div
              ref={deskImgRef}
              className="relative w-full rounded-2xl bg-surface-50 border border-slate-800 p-3 shadow-2xl group overflow-hidden"
            >
              {/* Neon aura on hover */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-mint-500/20 to-purple-500/20 blur-lg opacity-60 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-[#070b0f] flex items-center justify-center">
                <img
                  src={codingDeskImg}
                  alt="Developer working at desk"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 select-none"
                />

                {/* Cyberpunk corner markers on image */}
                <div className="absolute top-2 left-2 text-[10px] font-mono text-mint-400 bg-black/60 px-2 py-0.5 rounded border border-mint-500/30 backdrop-blur-sm">
                  DEV_ENVIRONMENT : ACTIVE
                </div>
              </div>

              {/* Bottom Quick Specs Bar */}
              <div className="mt-3 px-2 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Sparkles className="w-3.5 h-3.5 text-mint-400" />
                  Full-Lifecycle Development
                </span>
                <span className="text-mint-400 font-semibold">Ready to Ship</span>
              </div>
            </div>

          </div>

          {/* Right Column: Expandable Futuristic Tech-Bracket Cards */}
          <div ref={cardsContainerRef} className="lg:col-span-7 flex flex-col gap-6">
            
            {/* CARD 1: GENERATIVE AI & PROMPT ENGINEERING */}
            <div className="tech-bracket-card relative rounded-xl bg-surface-50/90 border border-slate-800 p-6 sm:p-8 backdrop-blur-sm shadow-xl transition-all duration-300 hover:border-slate-700">
              <div className="tech-corner-tr"></div>
              <div className="tech-corner-bl"></div>

              {/* Header area */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-mint-400"></span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight font-display">
                      GEN AI & PROMPT ENG
                    </h3>
                  </div>
                  <p className="text-xs font-mono uppercase tracking-wider text-mint-300 mb-3">
                    LLM Workflows & Conversational Data Analysis
                  </p>
                </div>

                {/* Expand / Collapse Button */}
                <button
                  onClick={() => toggleCard('frontend')}
                  className="w-9 h-9 rounded-lg bg-surface-100 hover:bg-surface-200 border border-slate-700 hover:border-mint-400/50 flex items-center justify-center text-slate-300 hover:text-mint-400 transition-all cursor-pointer shadow-sm"
                  aria-label="Toggle Generative AI card"
                >
                  {expandedCards.frontend ? (
                    <ChevronUp className="w-5 h-5 text-mint-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Summary Description */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Designing autonomous Generative AI workflows, prompt optimization pipelines, and conversational data analysis with cutting-edge Large Language Models.
              </p>

              {/* Expandable Body */}
              {expandedCards.frontend && (
                <div className="mt-6 pt-6 border-t border-slate-800/80 animate-fadeIn">
                  <div className="mb-4">
                    <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">
                      Key Capabilities & Highlights
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-mint-400 shrink-0" />
                        Conversational Data Analysis with LLMs
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-mint-400 shrink-0" />
                        Google Cloud GenAI Solutions
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-mint-400 shrink-0" />
                        Prompt Optimization & Automation
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-mint-400 shrink-0" />
                        Model Fine-Tuning & Evaluation
                      </li>
                    </ul>
                  </div>

                  {/* Skillset & Tools Pills */}
                  <div>
                    <h5 className="text-[11px] font-mono uppercase tracking-widest text-slate-500 mb-2.5">
                      Skillset & Tools
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {['Generative AI', 'Prompt Engineering', 'LLMs', 'Google Cloud GenAI', 'Python', 'Conversational Analytics', 'Model Fine-Tuning', 'Microsoft Azure AI', 'Responsible AI'].map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full bg-surface-100 hover:bg-surface-200 border border-slate-800 hover:border-mint-400/40 text-xs font-mono text-slate-300 hover:text-white transition-colors cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* CARD 2: MACHINE LEARNING & DEEP LEARNING */}
            <div className="tech-bracket-card relative rounded-xl bg-surface-50/90 border border-slate-800 p-6 sm:p-8 backdrop-blur-sm shadow-xl transition-all duration-300 hover:border-slate-700">
              <div className="tech-corner-tr"></div>
              <div className="tech-corner-bl"></div>

              {/* Header area */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-mint-400"></span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight font-display">
                      MACHINE LEARNING
                    </h3>
                  </div>
                  <p className="text-xs font-mono uppercase tracking-wider text-mint-300 mb-3">
                    Deep Learning, NLP & Predictive Analytics
                  </p>
                </div>

                {/* Expand / Collapse Button */}
                <button
                  onClick={() => toggleCard('backend')}
                  className="w-9 h-9 rounded-lg bg-surface-100 hover:bg-surface-200 border border-slate-700 hover:border-mint-400/50 flex items-center justify-center text-slate-300 hover:text-mint-400 transition-all cursor-pointer shadow-sm"
                  aria-label="Toggle ML card"
                >
                  {expandedCards.backend ? (
                    <ChevronUp className="w-5 h-5 text-mint-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Summary Description */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Developing intelligent models that analyze datasets, understand text through NLP, and power automated candidate screening and sentiment intelligence.
              </p>

              {/* Expandable Body */}
              {expandedCards.backend && (
                <div className="mt-6 pt-6 border-t border-slate-800/80 animate-fadeIn">
                  <div className="mb-4">
                    <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">
                      Key Capabilities & Highlights
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-mint-400 shrink-0" />
                        AI Resume Screening & Ranking
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-mint-400 shrink-0" />
                        Twitter Sentiment NLP Pipeline
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-mint-400 shrink-0" />
                        Neural Networks & Model Training
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-mint-400 shrink-0" />
                        Data Visualization for Business Insights
                      </li>
                    </ul>
                  </div>

                  {/* Skillset & Tools Pills */}
                  <div>
                    <h5 className="text-[11px] font-mono uppercase tracking-widest text-slate-500 mb-2.5">
                      Skillset & Tools
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {['Machine Learning', 'Deep Learning', 'NLP', 'Python', 'Scikit-Learn', 'Neural Networks', 'Sentiment Analysis', 'Data Visualization', 'Pandas / NumPy'].map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full bg-surface-100 hover:bg-surface-200 border border-slate-800 hover:border-mint-400/40 text-xs font-mono text-slate-300 hover:text-white transition-colors cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* CARD 3: FRONTEND & CLOUD PLATFORMS */}
            <div className="tech-bracket-card relative rounded-xl bg-surface-50/90 border border-slate-800 p-6 sm:p-8 backdrop-blur-sm shadow-xl transition-all duration-300 hover:border-slate-700">
              <div className="tech-corner-tr"></div>
              <div className="tech-corner-bl"></div>

              {/* Header area */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-mint-400"></span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight font-display">
                      FRONTEND & CLOUD
                    </h3>
                  </div>
                  <p className="text-xs font-mono uppercase tracking-wider text-mint-300 mb-3">
                    Interactive UIs, Cloud Deployments & E-Commerce
                  </p>
                </div>

                {/* Expand / Collapse Button */}
                <button
                  onClick={() => toggleCard('ai')}
                  className="w-9 h-9 rounded-lg bg-surface-100 hover:bg-surface-200 border border-slate-700 hover:border-mint-400/50 flex items-center justify-center text-slate-300 hover:text-mint-400 transition-all cursor-pointer shadow-sm"
                  aria-label="Toggle Frontend & Cloud card"
                >
                  {expandedCards.ai ? (
                    <ChevronUp className="w-5 h-5 text-mint-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Summary Description */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Building responsive, accessible web interfaces (HTML5/CSS3/JavaScript/React), managing cloud platforms (AWS, GCP, Azure), and leading digital product operations.
              </p>

              {/* Expandable Body */}
              {expandedCards.ai && (
                <div className="mt-6 pt-6 border-t border-slate-800/80 animate-fadeIn">
                  <div className="mb-4">
                    <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">
                      Key Capabilities & Highlights
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-mint-400 shrink-0" />
                        Responsive UI & Interactive Web Pages
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-mint-400 shrink-0" />
                        Version Control (Git) & Debugging
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-mint-400 shrink-0" />
                        AWS & Google Cloud Certified
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-mint-400 shrink-0" />
                        E-Commerce Product Lifecycle Management
                      </li>
                    </ul>
                  </div>

                  {/* Skillset & Tools Pills */}
                  <div>
                    <h5 className="text-[11px] font-mono uppercase tracking-widest text-slate-500 mb-2.5">
                      Skillset & Tools
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Git / GitHub', 'AWS Certified', 'Google Cloud', 'Microsoft Azure', 'Shopify', 'UI Accessibility'].map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full bg-surface-100 hover:bg-surface-200 border border-slate-800 hover:border-mint-400/40 text-xs font-mono text-slate-300 hover:text-white transition-colors cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
