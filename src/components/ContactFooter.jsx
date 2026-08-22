import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import confetti from 'canvas-confetti'
import {
  Mail,
  Copy,
  Check,
  Send,
  ArrowUp,
  Sparkles,
  MapPin,
  Clock,
  ExternalLink
} from 'lucide-react'
import { GithubIcon, LinkedinIcon, TwitterIcon } from './SocialIcons'

gsap.registerPlugin(ScrollTrigger)

export default function ContactFooter() {
  const [copied, setCopied] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const leftColRef = useRef(null)
  const rightColRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
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

      // Left column cards reveal animation
      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            clearProps: 'all',
            scrollTrigger: {
              trigger: leftColRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // Right column form reveal animation
      if (rightColRef.current) {
        gsap.fromTo(
          rightColRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            clearProps: 'all',
            scrollTrigger: {
              trigger: rightColRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const email = 'shubhamramdhiraj@gmail.com'

  const handleCopyEmail = (e) => {
    e.preventDefault()
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    setIsSubmitting(true)
    setErrorMessage('')

    try {
      // Send real email via FormSubmit API to Shubham's inbox
      const response = await fetch(`https://formsubmit.co/ajax/${email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: formData.subject ? `[Portfolio] ${formData.subject}` : `[Portfolio Inquiry] from ${formData.name}`,
          message: formData.message,
          _captcha: 'false',
          _template: 'table',
        }),
      })

      if (response.ok) {
        // Trigger celebration confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#00f5d4', '#2dd4bf', '#a855f7', '#ffffff'],
        })
        setFormSubmitted(true)
      } else {
        // Fallback: Open mailto directly if API encounters issue
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(
          formData.subject || 'Portfolio Inquiry'
        )}&body=${encodeURIComponent(
          `Hi Shubham,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`
        )}`
        setFormSubmitted(true)
      }
    } catch (err) {
      console.warn('Form submission network fallback:', err)
      // If network fails (e.g. offline/adblocker), open user's mail client
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(
        formData.subject || 'Portfolio Inquiry'
      )}&body=${encodeURIComponent(
        `Hi Shubham,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`
      )}`
      setFormSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.5 })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <footer id="contact" ref={sectionRef} className="relative pt-16 sm:pt-24 pb-10 sm:pb-12 bg-[#040608] border-t border-slate-800/80 overflow-hidden">
      {/* Background glow ambiance */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-mint-500/10 rounded-full blur-[160px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Contact Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-mint-400/10 border border-mint-400/30 text-mint-300 font-mono text-xs uppercase tracking-widest mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>LET'S COLLABORATE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight font-display">
            Start a <span className="text-mint-400 glow-text-mint">Conversation</span>
          </h2>
          <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-slate-400">
            Open to internships, AI/ML research collaborations, and opportunities to build impactful intelligent solutions.
          </p>
        </div>

        {/* Two-Column Grid: Contact Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-16 sm:mb-20">
          
          {/* Left Column: Quick Contact Details */}
          <div ref={leftColRef} className="lg:col-span-5 flex flex-col gap-4 sm:gap-6">
            
            {/* Quick Email Card with Copy */}
            <div className="tech-bracket-card relative rounded-2xl bg-surface-50 border border-slate-800 p-5 sm:p-8 backdrop-blur-md">
              <div className="tech-corner-tr"></div>
              <div className="tech-corner-bl"></div>

              <div className="flex items-center gap-2 text-xs font-mono text-mint-400 mb-2">
                <span className="w-2 h-2 rounded-full bg-mint-400 animate-pulse"></span>
                <span>DIRECT INBOX</span>
              </div>

              <div className="mb-4">
                <a
                  href={`mailto:${email}`}
                  className="block text-xs sm:text-base lg:text-[17px] xl:text-xl font-bold text-white font-mono tracking-tight hover:text-mint-300 transition-colors select-all leading-normal break-all sm:break-normal"
                  title="Send email to shubhamramdhiraj@gmail.com"
                >
                  shubhamramdhiraj@gmail.com
                </a>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-mint-400 hover:bg-mint-300 text-black font-bold text-xs font-mono uppercase tracking-wider transition-all shadow-mint-sm cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Copied! 📋</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-100 hover:bg-surface-200 text-slate-300 hover:text-white text-xs font-mono border border-slate-800 transition-colors cursor-pointer"
                >
                  <span>Open Mail App</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Location & Timezone info */}
            <div className="p-6 rounded-2xl bg-surface-50 border border-slate-800 space-y-4 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-mint-400 shrink-0" />
                <span>Greater Delhi Area, India • Open Worldwide</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-mint-400 shrink-0" />
                <span>Timezone: IST (UTC +5:30) • Flexible for Collaborations</span>
              </div>
              <div className="flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-mint-400 shrink-0" />
                <span>KR Mangalam University • B.Tech CSE (AI & ML)</span>
              </div>
            </div>

            {/* Honors & Awards Badge Card */}
            <div className="p-5 rounded-2xl bg-surface-50/80 border border-slate-800 space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-widest text-mint-400 font-semibold flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Honors & Hackathon Awards</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['National Technology Day (1st Prize)', 'RoboRush 1.0', 'Hack KRMU 4.0', 'Code for Bharat', 'Adobe Hackathon'].map((award, i) => (
                  <span key={i} className="px-2.5 py-1 rounded bg-surface-100 border border-slate-800 text-[11px] font-mono text-slate-300">
                    🏆 {award}
                  </span>
                ))}
              </div>
            </div>

            {/* Social Links Bar */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/shubhamsharma-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-50 hover:bg-surface-100 border border-slate-800 hover:border-mint-400/40 text-xs font-mono text-slate-300 hover:text-white transition-all group cursor-pointer"
              >
                <LinkedinIcon className="w-4 h-4 text-mint-400 group-hover:scale-110 transition-transform" />
                <span>LinkedIn</span>
              </a>

              <a
                href="https://github.com/shubham055555"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-50 hover:bg-surface-100 border border-slate-800 hover:border-mint-400/40 text-xs font-mono text-slate-300 hover:text-white transition-all group cursor-pointer"
              >
                <GithubIcon className="w-4 h-4 text-mint-400 group-hover:scale-110 transition-transform" />
                <span>GitHub</span>
              </a>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form */}
          <div ref={rightColRef} className="lg:col-span-7">
            <div className="tech-bracket-card relative rounded-2xl bg-surface-50 border border-slate-800 p-6 sm:p-8 backdrop-blur-md shadow-2xl">
              <div className="tech-corner-tr"></div>
              <div className="tech-corner-bl"></div>

              {!formSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase tracking-wider">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. John Doe"
                        className="w-full px-4 py-3 rounded-lg bg-surface-100 border border-slate-800 focus:border-mint-400 focus:ring-1 focus:ring-mint-400 text-base sm:text-sm text-white placeholder-slate-500 outline-none font-sans transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase tracking-wider">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-lg bg-surface-100 border border-slate-800 focus:border-mint-400 focus:ring-1 focus:ring-mint-400 text-base sm:text-sm text-white placeholder-slate-500 outline-none font-sans transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase tracking-wider">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Project Inquiry / Job Opportunity / Collaboration"
                      className="w-full px-4 py-3 rounded-lg bg-surface-100 border border-slate-800 focus:border-mint-400 focus:ring-1 focus:ring-mint-400 text-base sm:text-sm text-white placeholder-slate-500 outline-none font-sans transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase tracking-wider">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your project, goals, or questions..."
                      className="w-full px-4 py-3 rounded-lg bg-surface-100 border border-slate-800 focus:border-mint-400 focus:ring-1 focus:ring-mint-400 text-base sm:text-sm text-white placeholder-slate-500 outline-none font-sans resize-none transition-all"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3.5 rounded-lg bg-mint-400 hover:bg-mint-300 text-black font-bold text-xs font-mono uppercase tracking-widest transition-all shadow-mint-sm hover:shadow-mint-glow flex items-center justify-center gap-2 cursor-pointer ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        <span>Transmitting Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="py-12 text-center flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-mint-400/20 text-mint-400 flex items-center justify-center mb-4">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold text-white font-display mb-2">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-sm text-slate-400 max-w-sm mb-6 font-normal">
                    Thank you for reaching out, {formData.name}. I'll review your note and get back to you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false)
                      setFormData({ name: '', email: '', subject: '', message: '' })
                    }}
                    className="px-5 py-2 rounded-lg bg-surface-100 text-slate-300 hover:text-white border border-slate-800 text-xs font-mono cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Footer Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300 font-display">SS</span>
            <span>•</span>
            <span>SHUBHAM SHARMA © 2026</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="hidden sm:inline text-slate-400">
              AI/ML Engineer • Generative AI • Python
            </span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-surface-50 hover:bg-surface-100 text-slate-300 hover:text-mint-400 border border-slate-800 transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  )
}
