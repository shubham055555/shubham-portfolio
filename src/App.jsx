import React, { useState, useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SmoothScroll from './components/SmoothScroll'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import WhatIDo from './components/WhatIDo'
import Timeline from './components/Timeline'
import ProjectsCarousel from './components/ProjectsCarousel'
import TechStack from './components/TechStack'
import ContactFooter from './components/ContactFooter'
import bgAnimation from './assets/bg-animation.mp4'

export default function App() {
  const [loadingComplete, setLoadingComplete] = useState(false)

  const handleLoadingComplete = () => {
    setLoadingComplete(true)
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 150)
  }

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#050708] text-slate-100 overflow-x-hidden selection:bg-mint-400 selection:text-black">
        {/* Global Darkish Animated Video Background */}
        <div className="fixed inset-0 w-full h-full pointer-events-none -z-50 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-35 filter brightness-90 contrast-125 saturate-75"
          >
            <source src={bgAnimation} type="video/mp4" />
          </video>
          {/* Subtle dark ambient overlays to blend seamlessly */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050708]/60 via-transparent to-[#050708]/80 pointer-events-none"></div>
          <div className="absolute inset-0 bg-[#050708]/30 backdrop-blur-[0.5px] pointer-events-none"></div>
        </div>

        {/* Preloader Introduction */}
        {!loadingComplete && (
          <Preloader onComplete={handleLoadingComplete} />
        )}

        {/* Global Floating Header Navigation */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="relative z-10">
          {/* Section 1: Hero */}
          <Hero />

          {/* Section 2: About Me */}
          <About />

          {/* Section 3: What I Do (Expandable Frontend & Backend Cards) */}
          <WhatIDo />

          {/* Section 4: Scroll-Linked Career Timeline */}
          <Timeline />

          {/* Section 5: Featured Projects Carousel */}
          <ProjectsCarousel />

          {/* Section 6: Tech Stack */}
          <TechStack />

          {/* Section 7: Contact & Footer */}
          <ContactFooter />
        </main>
      </div>
    </SmoothScroll>
  )
}
