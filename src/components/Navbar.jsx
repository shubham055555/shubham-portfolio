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
        <div className="fixed inset-0 z-50 bg-[#040608]/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-8 md:hidden overflow-y-auto">
          {/* Top Bar inside Drawer */}
          <div className="flex items-center justify-between w-full pb-6 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-surface-100 border border-mint-400/40 flex items-center justify-center font-display font-black text-sm text-mint-400">
                SS
              </div>
              <span className="font-bold text-sm text-white font-mono">Shubham Sharma</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-surface-100 border border-slate-800 text-slate-300 hover:text-white cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-mint-400" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-start gap-4 py-8 text-lg font-mono tracking-wider uppercase w-full">
            <button
              onClick={() => scrollToSection('about')}
              className="w-full text-left text-slate-200 hover:text-mint-300 py-2.5 border-b border-slate-900 flex items-center justify-between"
            >
              <span>01. ABOUT</span>
              <ArrowUpRight className="w-4 h-4 text-mint-400/60" />
            </button>
            <button
              onClick={() => scrollToSection('what-i-do')}
              className="w-full text-left text-slate-200 hover:text-mint-300 py-2.5 border-b border-slate-900 flex items-center justify-between"
            >
              <span>02. SERVICES (WHAT I DO)</span>
              <ArrowUpRight className="w-4 h-4 text-mint-400/60" />
            </button>
            <button
              onClick={() => scrollToSection('timeline')}
              className="w-full text-left text-slate-200 hover:text-mint-300 py-2.5 border-b border-slate-900 flex items-center justify-between"
            >
              <span>03. CAREER TIMELINE</span>
              <ArrowUpRight className="w-4 h-4 text-mint-400/60" />
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="w-full text-left text-slate-200 hover:text-mint-300 py-2.5 border-b border-slate-900 flex items-center justify-between"
            >
              <span>04. FEATURED PROJECTS</span>
              <ArrowUpRight className="w-4 h-4 text-mint-400/60" />
            </button>
            <button
              onClick={() => scrollToSection('tech-stack')}
              className="w-full text-left text-slate-200 hover:text-mint-300 py-2.5 border-b border-slate-900 flex items-center justify-between"
            >
              <span>05. TECH STACK</span>
              <ArrowUpRight className="w-4 h-4 text-mint-400/60" />
            </button>
            
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full mt-4 py-3.5 rounded-xl bg-mint-400 hover:bg-mint-300 text-black font-bold text-center tracking-widest uppercase font-mono shadow-mint-sm transition-all"
            >
              START A CONVERSATION →
            </button>
          </div>

          {/* Bottom Contact Pill */}
          <div className="pt-6 border-t border-slate-800/80 flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>GET IN TOUCH</span>
              <button
                onClick={copyEmail}
                className="text-mint-400 flex items-center gap-1.5 hover:text-mint-300"
              >
                {copied ? <span>Copied! ✓</span> : <span>Copy Email 📋</span>}
              </button>
            </div>
            <a
              href={`mailto:${email}`}
              className="text-xs font-mono text-slate-200 truncate bg-surface-50 p-2.5 rounded-lg border border-slate-800 block text-center"
            >
              {email}
            </a>
          </div>
        </div>
      )}
    </>
  )
}
