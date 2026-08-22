import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Briefcase, Calendar, MapPin, Sparkles, ExternalLink } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const careerMilestones = [
  {
    period: 'JUN 2026 — PRESENT',
    duration: '3 mos · Present',
    role: 'AI & Prompt Engineering',
    company: 'VaultofCodes · Internship',
    location: 'Delhi, India · Remote',
    description:
      'Designing cutting-edge Generative AI workflows, prompt optimization strategies, and LLM automation pipelines to build intelligent, autonomous AI solutions.',
    achievements: [
      'Engineered structured prompt templates and chain-of-thought workflows for LLM tasks.',
      'Fine-tuned model response parameters for higher accuracy and semantic consistency.',
      'Developed automated workflows integrating LLM endpoints with modern web apps.',
    ],
    skills: ['Generative AI', 'Prompt Engineering', 'LLMs', 'Python', 'AI Pipelines'],
  },
  {
    period: 'AUG 2025 — NOV 2025',
    duration: '4 mos',
    role: 'Green Intern – Sustainability & Climate Action',
    company: '1M1B (1 Million for 1 Billion) · Internship',
    location: 'Remote',
    description:
      'Leveraged data analytics and technology frameworks to drive measurable sustainability outcomes aligned with UN Sustainable Development Goals (SDGs).',
    achievements: [
      'Analyzed climate impact metrics and presented actionable insights on green initiatives.',
      'Collaborated on youth-driven sustainability frameworks recognized by global partners.',
      'Spearheaded community-level environmental awareness programs powered by data insights.',
    ],
    skills: ['Data Analytics', 'Sustainability', 'UN SDGs', 'Climate Action', 'Research'],
  },
  {
    period: 'SEP 2025 — OCT 2025',
    duration: '2 mos',
    role: 'Internship on Conversational Data Analysis with LLMs',
    company: 'Vodafone Idea Foundation · Internship',
    location: 'Remote',
    description:
      'Conducted conversational data analysis, intent classification, and prompt evaluation utilizing modern Large Language Models and NLP frameworks.',
    achievements: [
      'Built conversational analytics pipelines extracting key user sentiment, dialogue flow, and intent patterns.',
      'Evaluated LLM reasoning accuracy, prompt effectiveness, and semantic consistency across datasets.',
      'Formulated prompt optimization benchmarks to improve conversational agent accuracy.',
    ],
    skills: ['LLMs', 'Conversational AI', 'Prompt Engineering', 'NLP', 'Data Analysis'],
  },
  {
    period: 'JUL 2025 — AUG 2025',
    duration: '2 mos',
    role: 'AI/ML Intern',
    company: 'InternPro · Internship',
    location: 'Remote',
    description:
      'Engineered intelligent machine learning systems and Natural Language Processing pipelines to solve domain-specific data challenges.',
    achievements: [
      'Architected and deployed an AI-Powered Resume Screening & Parsing System under mentorship.',
      'Evaluated candidate scoring accuracy using advanced NLP similarity metrics and tokenization algorithms.',
      'Strengthened practical problem-solving and automated AI pipeline development.',
    ],
    skills: ['Machine Learning', 'NLP', 'Python', 'Scikit-Learn', 'Resume Parsing'],
  },
  {
    period: 'APR 2025 — MAY 2025',
    duration: '2 mos',
    role: 'AI & Machine Learning Intern',
    company: 'Edunet Foundation · Internship',
    location: 'Remote',
    description:
      'Intensive artificial intelligence internship focusing on core machine learning algorithms, deep neural network fundamentals, and responsible AI practices.',
    achievements: [
      'Developed end-to-end ML classification and sentiment analysis models using Python and Scikit-Learn.',
      'Integrated predictive models with cloud services on Microsoft Azure (AICTE initiative).',
      'Applied AI principles towards sustainability use cases aligned with UN SDGs.',
    ],
    skills: ['Machine Learning', 'Python', 'Microsoft Azure', 'Sentiment Analysis', 'Responsible AI'],
  },
  {
    period: 'DEC 2024 — MAR 2025',
    duration: '4 mos',
    role: 'Former Founder & Product Manager',
    company: 'Aangan Market · Self-employed',
    location: 'Delhi, India',
    description:
      'Founded and operated an independent Shopify-based e-commerce store (Aangan Market), managing the complete product roadmap, UI/UX, and business lifecycle.',
    achievements: [
      'Managed end-to-end product listing, pricing strategy, inventory automation, and customer experience.',
      'Executed digital marketing via social media, WhatsApp campaigns, and promotional channels.',
      'Achieved 30% monthly sales growth during active operation.',
    ],
    skills: ['Product Management', 'Shopify', 'E-Commerce', 'Digital Marketing', 'Operations'],
  },
]

export default function Timeline() {
  const sectionRef = useRef(null)
  const lineRef = useRef(null)
  const headerRef = useRef(null)
  const itemsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal animation
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        })
      }

      // Animate the vertical timeline line height based on scroll
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { height: '0%' },
          {
            height: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              end: 'bottom 85%',
              scrub: 0.8,
            },
          }
        )
      }

      // Animate each milestone card as it scrolls into view
      itemsRef.current.forEach((el, index) => {
        if (!el) return
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="relative py-28 bg-surface-DEFAULT/50 border-t border-slate-800/60 overflow-hidden"
    >
      {/* Background ambient accents */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-mint-500/5 rounded-full blur-[140px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-600/5 rounded-full blur-[140px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-mint-400/10 border border-mint-400/30 text-mint-300 font-mono text-xs uppercase tracking-widest mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>CAREER JOURNEY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-display">
            Experience & <span className="text-mint-400 glow-text-mint">Milestones</span>
          </h2>
          <p className="mt-3 text-sm text-slate-400 font-normal">
            A scroll-linked chronicle of engineering leadership, production architectures, and shipped platforms.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Static track line */}
          <div className="absolute top-0 bottom-0 left-4 md:left-1/2 -translate-x-1/2 w-0.5 bg-slate-800 pointer-events-none"></div>

          {/* Dynamic ScrollTrigger animated progress laser */}
          <div
            ref={lineRef}
            className="absolute top-0 left-4 md:left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-mint-300 via-mint-400 to-mint-500 shadow-[0_0_12px_#00f5d4] pointer-events-none"
          ></div>

          {/* Timeline Cards */}
          <div className="space-y-12 sm:space-y-16">
            {careerMilestones.map((item, index) => {
              const isEven = index % 2 === 0
              return (
                <div
                  key={index}
                  ref={(el) => (itemsRef.current[index] = el)}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  } gap-6 md:gap-12 pl-12 md:pl-0`}
                >
                  {/* Center Node Marker */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-4 w-6 h-6 rounded-full bg-[#080d12] border-2 border-mint-400 flex items-center justify-center shadow-[0_0_12px_rgba(0,245,212,0.4)] z-20 group">
                    <div className="w-2 h-2 rounded-full bg-mint-400 group-hover:scale-150 transition-transform"></div>
                  </div>

                  {/* Content Card (Half Width on Desktop) */}
                  <div className="w-full md:w-1/2">
                    <div className="tech-bracket-card relative rounded-xl bg-surface-50 border border-slate-800/90 p-6 sm:p-7 backdrop-blur-sm shadow-xl hover:border-mint-500/40 transition-all duration-300 group">
                      <div className="tech-corner-tr"></div>
                      <div className="tech-corner-bl"></div>

                      {/* Period & Duration Badge */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-mint-950/80 border border-mint-500/40 text-[11px] font-mono font-semibold text-mint-300">
                            <Calendar className="w-3 h-3 text-mint-400" />
                            {item.period}
                          </span>
                          {item.duration && (
                            <span className="px-2 py-0.5 rounded bg-surface-100 border border-slate-800 text-[10px] font-mono text-slate-400">
                              {item.duration}
                            </span>
                          )}
                        </div>
                        <span className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
                          <MapPin className="w-3 h-3" />
                          {item.location}
                        </span>
                      </div>

                      {/* Role & Company */}
                      <h3 className="text-xl sm:text-2xl font-bold text-white font-display mb-1 group-hover:text-mint-300 transition-colors">
                        {item.role}
                      </h3>
                      <h4 className="text-xs font-mono font-medium text-slate-400 uppercase tracking-wider mb-4">
                        {item.company}
                      </h4>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Achievements */}
                      <div className="space-y-1.5 mb-5 border-l-2 border-slate-800 pl-3">
                        {item.achievements.map((ach, i) => (
                          <p key={i} className="text-xs text-slate-400 leading-normal flex items-start gap-1.5">
                            <span className="text-mint-400 font-bold">›</span>
                            <span>{ach}</span>
                          </p>
                        ))}
                      </div>

                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {item.skills.map((skill, sIndex) => (
                          <span
                            key={sIndex}
                            className="px-2 py-0.5 rounded bg-surface-100 border border-slate-800 text-[10px] font-mono text-slate-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Empty Spacer on Opposite Side for Alternating Layout */}
                  <div className="hidden md:block w-1/2"></div>
                </div>
              )
            })}
          </div>

        </div>

      </div>
    </section>
  )
}
