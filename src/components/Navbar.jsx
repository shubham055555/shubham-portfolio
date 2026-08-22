import React, { useState, useEffect } from 'react'
import { Menu, X, Copy, Check, ArrowUpRight } from 'lucide-react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const email = 'shubhamramdhiraj@gmail.com'

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const copyEmail = (e) => {
    e.preventDefault()
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const scrollToSection = (id) => {
    setMobileMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      if (window.__lenis) {
        window.__lenis.scrollTo(element, { offset: -70 })
      } else {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-3.5 bg-[#06090c]/85 backdrop-blur-md border-b border-slate-800/80 shadow-lg'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Brand Monogram */}
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-surface-100 border border-slate-700/80 flex items-center justify-center font-display font-black text-lg text-white group-hover:border-mint-400 group-hover:text-mint-400 transition-colors shadow-sm">
              SS
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="font-bold text-sm text-slate-200 tracking-tight leading-none">
                Shubham Sharma
              </span>
              <span className="text-[10px] font-mono text-mint-400 leading-tight">
                AI / ML Engineer
              </span>
            </div>
          </button>

          {/* Center Email Link with one-click copy */}
          <div className="hidden md:flex items-center">
            <button
              onClick={copyEmail}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-50 hover:bg-surface-100 border border-slate-800 hover:border-mint-500/40 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer group"
              title="Click to copy email address"
            >
              <span className="w-2 h-2 rounded-full bg-mint-400 animate-pulse"></span>
              <span>{email}</span>
              {copied ? (
                <Check className="w-3.5 h-3.5 text-mint-400" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:text-mint-400 transition-colors" />
              )}
            </button>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest uppercase">
            <button
              onClick={() => scrollToSection('about')}
              className="text-slate-400 hover:text-mint-300 transition-colors cursor-pointer"
            >
              ABOUT
            </button>
            <button
              onClick={() => scrollToSection('what-i-do')}
              className="text-slate-400 hover:text-mint-300 transition-colors cursor-pointer"
            >
              SERVICES
            </button>
            <button
              onClick={() => scrollToSection('timeline')}
              className="text-slate-400 hover:text-mint-300 transition-colors cursor-pointer"
            >
              TIMELINE
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="text-slate-400 hover:text-mint-300 transition-colors cursor-pointer"
            >
              WORK
            </button>
            <button
              onClick={() => scrollToSection('tech-stack')}
              className="text-slate-400 hover:text-mint-300 transition-colors cursor-pointer"
            >
              STACK
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-4 py-2 rounded-lg bg-mint-400/10 hover:bg-mint-400 text-mint-300 hover:text-black font-semibold border border-mint-400/30 transition-all duration-300 cursor-pointer shadow-mint-sm"
            >
              CONTACT
            </button>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={copyEmail}
              className="p-2 rounded-lg bg-surface-50 border border-slate-800 text-xs font-mono text-slate-300 flex items-center gap-1.5"
            >
              {copied ? <Check className="w-4 h-4 text-mint-400" /> : <Copy className="w-4 h-4 text-mint-400" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-surface-50 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#06090c]/95 backdrop-blur-xl flex flex-col justify-center items-center gap-6 p-8 md:hidden">
          <div className="flex flex-col items-center gap-6 text-base font-mono tracking-widest uppercase">
            <button
              onClick={() => scrollToSection('about')}
              className="text-slate-300 hover:text-mint-300 py-2"
            >
              ABOUT
            </button>
            <button
              onClick={() => scrollToSection('what-i-do')}
              className="text-slate-300 hover:text-mint-300 py-2"
            >
              SERVICES (WHAT I DO)
            </button>
            <button
              onClick={() => scrollToSection('timeline')}
              className="text-slate-300 hover:text-mint-300 py-2"
            >
              CAREER TIMELINE
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="text-slate-300 hover:text-mint-300 py-2"
            >
              FEATURED WORK
            </button>
            <button
              onClick={() => scrollToSection('tech-stack')}
              className="text-slate-300 hover:text-mint-300 py-2"
            >
              TECH STACK
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="mt-4 px-8 py-3 rounded-full bg-mint-400 text-black font-bold tracking-wider"
            >
              GET IN TOUCH
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs font-mono text-slate-500 mb-2">DIRECT EMAIL</p>
            <button
              onClick={copyEmail}
              className="text-sm font-mono text-mint-400 flex items-center justify-center gap-2"
            >
              <span>{email}</span>
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
