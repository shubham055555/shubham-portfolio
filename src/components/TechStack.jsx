import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Code2,
  Server,
  Database,
  Cloud,
  Cpu,
  Terminal,
  Layers,
  Sparkles,
  GitBranch,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const techCategories = [
  {
    id: 'genai',
    name: 'Generative AI & LLMs',
    icon: Cpu,
    description: 'Autonomous LLM workflows, conversational analytics, prompt engineering, and cloud AI models.',
    skills: [
      { name: 'Generative AI (Top Skill)', level: '96%', experience: 'Specialist' },
      { name: 'Prompt Engineering & Tuning', level: '95%', experience: 'Advanced' },
      { name: 'Conversational Data Analysis', level: '92%', experience: 'Vodafone Project' },
      { name: 'Google Cloud Generative AI', level: '90%', experience: 'Certified' },
      { name: 'Model Fine-Tuning & Evaluation', level: '88%', experience: 'Practical' },
      { name: 'Microsoft Azure AI Tools', level: '86%', experience: 'Certified' },
      { name: 'Responsible AI Practices', level: '94%', experience: 'Standard' },
    ],
  },
  {
    id: 'ml-nlp',
    name: 'Machine Learning & NLP',
    icon: Server,
    description: 'Supervised/unsupervised learning, deep neural architectures, and natural language understanding.',
    skills: [
      { name: 'Machine Learning (Top Skill)', level: '95%', experience: 'Advanced' },
      { name: 'Python (Programming Language)', level: '98%', experience: 'Primary' },
      { name: 'Natural Language Processing (NLP)', level: '92%', experience: 'Applied' },
      { name: 'Deep Learning & Neural Networks', level: '88%', experience: 'Academic & Labs' },
      { name: 'Scikit-Learn / ML Pipelines', level: '92%', experience: 'Production' },
      { name: 'Sentiment Analysis Algorithms', level: '90%', experience: 'Twitter Project' },
      { name: 'Candidate Screening Classifiers', level: '94%', experience: 'InternPro' },
    ],
  },
  {
    id: 'cloud-tools',
    name: 'Cloud & Infrastructure',
    icon: Cloud,
    description: 'Multi-cloud platforms, DevOps version control, and digital operations.',
    skills: [
      { name: 'Google Cloud Platform (GCP)', level: '92%', experience: 'Virtual Intern' },
      { name: 'AWS Certifications / Cloud', level: '88%', experience: 'Certified' },
      { name: 'Microsoft Azure Services', level: '85%', experience: 'Microsoft AI' },
      { name: 'Git & GitHub Version Control', level: '94%', experience: 'Daily' },
      { name: 'Browser Debugging Tools', level: '92%', experience: 'Edunet Web' },
      { name: 'Shopify E-Commerce Operations', level: '90%', experience: 'Founder' },
    ],
  },
  {
    id: 'web-data',
    name: 'Web Dev & Data Viz',
    icon: Code2,
    description: 'Front-end development, responsive UI interfaces, and impactful data analytics.',
    skills: [
      { name: 'Data Visualization & Insights', level: '94%', experience: 'Certified' },
      { name: 'HTML5 & Semantic Markup', level: '96%', experience: 'Edunet AICTE' },
      { name: 'CSS3 & Modern Layouts', level: '94%', experience: 'Edunet AICTE' },
      { name: 'JavaScript (ES6+)', level: '90%', experience: 'Interactive Web' },
      { name: 'React.js UI Components', level: '88%', experience: 'Modern SPA' },
      { name: 'Web Accessibility & Vitals', level: '92%', experience: 'Standard' },
      { name: 'Pandas, NumPy & Matplotlib', level: '94%', experience: 'Data Pipelines' },
    ],
  },
]

export default function TechStack() {
  const [activeTab, setActiveTab] = useState('genai')
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const tabsRef = useRef(null)
  const cardRef = useRef(null)

  const currentCategory =
    techCategories.find((cat) => cat.id === activeTab) || techCategories[0]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header slide-up animation
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

      // Tabs reveal animation
      if (tabsRef.current) {
        gsap.fromTo(
          tabsRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power3.out',
            clearProps: 'all',
            scrollTrigger: {
              trigger: tabsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // Card reveal animation
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            clearProps: 'all',
            scrollTrigger: {
              trigger: cardRef.current,
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
      id="tech-stack"
      ref={sectionRef}
      className="relative py-28 bg-surface-DEFAULT/40 border-t border-slate-800/60 overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-mint-500/5 rounded-full blur-[180px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-mint-400/10 border border-mint-400/30 text-mint-300 font-mono text-xs uppercase tracking-widest mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>ARSENAL & PROFICIENCY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-display">
            Core <span className="text-mint-400 glow-text-mint">Tech Stack</span>
          </h2>
          <p className="mt-3 text-sm text-slate-400 font-normal">
            Battle-tested frameworks, cloud infrastructure, and toolkits leveraged across production systems.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div ref={tabsRef} className="flex flex-wrap justify-center gap-3 mb-12">
          {techCategories.map((cat) => {
            const Icon = cat.icon
            const isActive = activeTab === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-mono text-xs transition-all cursor-pointer ${
                  isActive
                    ? 'bg-mint-400 text-black font-bold shadow-mint-sm'
                    : 'bg-surface-50 hover:bg-surface-100 text-slate-300 border border-slate-800 hover:border-slate-700'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-mint-400'}`} />
                <span>{cat.name}</span>
              </button>
            )
          })}
        </div>

        {/* Active Category Display Card */}
        <div ref={cardRef} className="tech-bracket-card relative max-w-4xl mx-auto rounded-2xl bg-surface-50 border border-slate-800 p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div className="tech-corner-tr"></div>
          <div className="tech-corner-bl"></div>

          <div className="flex items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
            <div>
              <h3 className="text-2xl font-black text-white font-display flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-mint-400 animate-pulse"></span>
                {currentCategory.name}
              </h3>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                {currentCategory.description}
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-100 border border-slate-800 text-xs font-mono text-mint-300">
              <ShieldCheck className="w-4 h-4 text-mint-400" />
              <span>Production Ready</span>
            </div>
          </div>

          {/* Skill Bars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {currentCategory.skills.map((skill, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-surface-100/60 border border-slate-800/80 hover:border-mint-400/40 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-sm text-slate-200 group-hover:text-white transition-colors">
                    {skill.name}
                  </span>
                  <span className="font-mono text-xs text-mint-400 font-bold">
                    {skill.level}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-slate-800/80 overflow-hidden mb-2">
                  <div
                    className="h-full bg-gradient-to-r from-mint-500 to-mint-300 rounded-full transition-all duration-700 shadow-[0_0_8px_rgba(0,245,212,0.4)]"
                    style={{ width: skill.level }}
                  ></div>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>Experience</span>
                  <span className="text-slate-400">{skill.experience}</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}
