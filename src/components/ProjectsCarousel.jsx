import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Layers,
  Sparkles,
  Zap,
  Star,
  CheckCircle2,
  X,
  LayoutGrid,
  SlidersHorizontal,
  ArrowUpRight
} from 'lucide-react'
import { GithubIcon } from './SocialIcons'
import airPollutionImg from '../assets/project-air-pollution.jpg'
import deepfakeImg from '../assets/project-deepfake-detection.jpg'
import expenseTrackerImg from '../assets/project-expense-tracker.jpg'
import leadGenImg from '../assets/project-lead-gen.jpg'
import emailAgentImg from '../assets/project-email-agent.jpg'
import facialEmotionImg from '../assets/project-facial-emotion.jpg'
import promptopsImg from '../assets/project-promptops.jpg'
import spaceBiologyImg from '../assets/project-space-biology.jpg'
import trainSafetyImg from '../assets/project-train-prevention.jpg'
import resumeScreeningImg from '../assets/project-resume-screening.jpg'
import voiceAssistantImg from '../assets/project-voice-assistant.jpg'
import projectAiImg from '../assets/project-ai.jpg'

gsap.registerPlugin(ScrollTrigger)

const projectsData = [
  {
    id: 'air-pollution-control',
    title: 'AI-Based Smart Eco Air Pollution Control System',
    category: 'IoT & Computer Vision',
    tag: 'IoT + ML System',
    image: airPollutionImg,
    description:
      'An intelligent IoT and Machine Learning environmental system that monitors real-time air quality data and triggers automated eco-control responses to mitigate pollution.',
    tech: ['IoT', 'Machine Learning', 'Python', 'Sensor APIs', 'Predictive ML', 'Hardware Telemetry'],
    highlights: [
      'Built an IoT + ML system that monitors real-time air quality data and triggers automated eco-control responses.',
      'Applied predictive ML models to forecast pollution levels and environmental anomalies.',
      'Designed automated alert thresholds for real-time hazardous AQI mitigation.',
    ],
    githubUrl: 'https://github.com/shubham055555/AI-Based-Smart-Eco-Air-Pollution-Control-System',
    stars: 'Featured IoT',
  },
  {
    id: 'deepfake-detection',
    title: 'Deepfake Detection & Media Forensics',
    category: 'IoT & Computer Vision',
    tag: 'Deep Learning Security',
    image: deepfakeImg,
    description:
      'Deep neural network system trained to detect manipulated facial features, synthetic voice artifacts, and generative media alterations in video frames.',
    tech: ['Deep Learning', 'CNNs', 'Computer Vision', 'PyTorch', 'Media Forensics', 'Python'],
    highlights: [
      'Analyzes spatial artifacts and temporal inconsistencies across high-resolution video frames.',
      'Robust classification identifying AI-manipulated and synthetically generated media.',
      'Trained on extensive benchmark facial manipulation datasets.',
    ],
    githubUrl: 'https://github.com/shubham055555/Deepfake-Detection',
    stars: 'Media Forensics',
  },
  {
    id: 'ai-lead-generation',
    title: 'AI Lead Generation & Enrichment Automation',
    category: 'Generative AI & Agents',
    tag: 'Autonomous AI Agent',
    image: leadGenImg,
    description:
      'Autonomous pipeline automating prospective lead discovery, web data scraping, contact enrichment, and AI-personalized outreach email generation.',
    tech: ['AI Agents', 'Web Scraping', 'Python', 'LLMs', 'Automated Pipelines', 'Outreach'],
    highlights: [
      'Automated prospect discovery and contact data extraction from public web directories.',
      'Integrated LLM prompts to generate personalized, high-conversion outreach copy.',
      'Streamlined business development workflows with automated lead scoring.',
    ],
    githubUrl: 'https://github.com/shubham055555/AI-Lead-Generation-Automation',
    stars: 'Lead Gen AI',
  },
  {
    id: 'ai-expense-tracker',
    title: 'AI-Powered Expense Tracker with Budget Alerts',
    category: 'Generative AI & Agents',
    tag: 'Financial AI & Analytics',
    image: expenseTrackerImg,
    description:
      'Personal finance intelligence system leveraging machine learning to evaluate transaction spending patterns, forecast budgets, and generate LLM-based financial summaries.',
    tech: ['Machine Learning', 'LLMs', 'Financial NLP', 'Python', 'Data Analytics', 'Budget Alerts'],
    highlights: [
      'Built a personal finance system using ML to analyse spending patterns and generate LLM-based budget summaries.',
      'Automated budget overrun alerts; reduced manual expense review time by ~50%.',
      'Engineered structured financial report generation with predictive trend analysis.',
    ],
    githubUrl: 'https://github.com/shubham055555/AI-Powered-Expense-Tracker-with-CFO-Alerts',
    stars: 'LLM Finance',
  },
  {
    id: 'customer-intelligence-agent',
    title: 'Customer Intelligence Email Automation Agent',
    category: 'Generative AI & Agents',
    tag: 'Autonomous Email Agent',
    image: emailAgentImg,
    description:
      'Autonomous customer intelligence agent analyzing incoming emails for sentiment and context, retrieving relevant knowledge base data, and drafting smart responses.',
    tech: ['AI Agents', 'LLMs', 'Email Automation', 'NLP', 'Customer Intelligence', 'Python'],
    highlights: [
      'Analyzes customer sentiment, tone, and inquiry intent in real-time.',
      'Generates contextual, professional email drafts for rapid team approval.',
      'Enhances support satisfaction with instant, accurate contextual answers.',
    ],
    githubUrl: 'https://github.com/shubham055555/Customer-Intelligence-Email-Automation-Agent',
    stars: 'Email Agent',
  },
  {
    id: 'facial-emotion-detection',
    title: 'Facial Emotion Detection using Deep Learning & OpenCV',
    category: 'IoT & Computer Vision',
    tag: 'Deep Learning & Vision',
    image: facialEmotionImg,
    description:
      'Real-time Convolutional Neural Network (CNN) emotion recognition architecture built for live camera video processing and high-precision emotion classification.',
    tech: ['Deep Learning', 'CNN', 'OpenCV', 'Computer Vision', 'Python', 'Real-Time Video'],
    highlights: [
      'Designed a real-time CNN-based emotion recognition system for live video processing using OpenCV.',
      'Optimised for low-latency deployment across 7 distinct facial emotion categories.',
      'Integrated face detection haar cascades and deep feature extraction pipelines.',
    ],
    githubUrl: 'https://github.com/shubham055555/Facial-Emotion-Detection-using-Deep-Learning-and-OpenCV',
    stars: 'OpenCV & CNN',
  },
  {
    id: 'promptops-ai',
    title: 'PromptOps-AI — Enterprise Prompt Engineering',
    category: 'Generative AI & Agents',
    tag: 'Prompt Engineering Platform',
    image: promptopsImg,
    description:
      'Advanced prompt operations platform automating prompt testing, versioning, chain-of-thought benchmarking, and output quality optimization for enterprise LLMs.',
    tech: ['Generative AI', 'Prompt Engineering', 'LLMs', 'Python', 'LangChain', 'Evaluation Metrics'],
    highlights: [
      'Automated prompt evaluation pipelines testing response consistency and token efficiency.',
      'Designed structured prompt templates and chain-of-thought workflows for LLM tasks.',
      'Standardized prompt performance benchmarking across diverse foundation models.',
    ],
    githubUrl: 'https://github.com/shubham055555/PromptOps-AI',
    stars: 'PromptOps',
  },
  {
    id: 'space-biology-engine',
    title: 'Space Biology Knowledge Engine',
    category: 'Generative AI & Agents',
    tag: 'Scientific RAG & Search',
    image: spaceBiologyImg,
    description:
      'Domain-specific RAG knowledge retrieval and semantic search engine indexing scientific space biology literature, microgravity experiments, and planetary research.',
    tech: ['RAG', 'Vector DB', 'Python', 'NLP', 'Semantic Search', 'LLMs'],
    highlights: [
      'Vector embedding search and LLM query answering over dense space biology datasets.',
      'Fast contextual retrieval for scientific literature and microgravity experimental findings.',
      'Built interactive query interface for complex biological domain exploration.',
    ],
    githubUrl: 'https://github.com/shubham055555/Space_Biology_Knowledge_Engine',
    stars: 'Space Biology RAG',
  },
  {
    id: 'train-accident-prevention',
    title: 'Train Accident Prevention Safety System',
    category: 'IoT & Computer Vision',
    tag: 'Safety & Object Detection',
    image: trainSafetyImg,
    description:
      'Automated railway safety system leveraging computer vision and sensor telemetry to detect track obstacles, signal irregularities, and trigger collision prevention safeguards.',
    tech: ['Computer Vision', 'Object Detection', 'IoT', 'Machine Learning', 'Python', 'Safety Systems'],
    highlights: [
      'Real-time video analysis for track obstruction detection and automated alarm triggers.',
      'Integrated sensor metrics to forecast track safety and prevent catastrophic collisions.',
      'Designed low-latency fail-safe notification triggers for railway operations.',
    ],
    githubUrl: 'https://github.com/shubham055555/Train_Accident_Prevention_project',
    stars: 'Safety AI',
  },
  {
    id: 'resume-screening-system',
    title: 'Resume Candidate Screening System using Machine Learning',
    category: 'Machine Learning & NLP',
    tag: 'ML Recruitment Classifier',
    image: resumeScreeningImg,
    description:
      'End-to-end recruitment intelligence system automating resume parsing, skill matching, candidate ranking, and domain experience evaluation using NLP algorithms.',
    tech: ['Machine Learning', 'NLP', 'Scikit-Learn', 'TF-IDF', 'Python', 'Streamlit'],
    highlights: [
      'Automated candidate evaluation and qualification matching with 92%+ classification accuracy.',
      'Extracted technical skills, certifications, and domain experience from unstructured resumes.',
      'Reduced manual recruitment shortlisting overhead by 80%+ with automated candidate ranking.',
    ],
    githubUrl: 'https://github.com/shubham055555/Resume-Candidate-Screening-System-using-Machine-Learning',
    stars: 'InternPro ML',
  },
  {
    id: 'support-ticket-classification',
    title: 'Support Ticket Classification & Prioritization using Machine Learning',
    category: 'Machine Learning & NLP',
    tag: 'NLP Ticket Classifier',
    image: projectAiImg,
    description:
      'Automated NLP classification pipeline categorizing customer support queries, detecting sentiment urgency, and routing high-priority tickets to specialized response teams.',
    tech: ['NLP', 'Text Classification', 'Machine Learning', 'Scikit-Learn', 'Python', 'Pandas'],
    highlights: [
      'Multi-class text classification categorizing issues and assigning priority urgency in real-time.',
      'Significantly reduced customer ticket triage time and manual routing errors.',
      'Optimized customer resolution response workflows with automated tagging.',
    ],
    githubUrl: 'https://github.com/shubham055555/Support-Ticket-Classification-Prioritization-using-Machine-Learning',
    stars: 'NLP Classifier',
  },
  {
    id: 'personal-voice-assistant',
    title: 'Personal Voice AI Assistant (N8N, Lovable, ElevenLabs)',
    category: 'Generative AI & Agents',
    tag: 'Multimodal Voice AI',
    image: voiceAssistantImg,
    description:
      'Multimodal AI personal assistant integrating N8N workflow automation, Lovable modern user interface, and ElevenLabs ultra-realistic neural voice generation.',
    tech: ['N8N', 'Lovable', 'ElevenLabs', 'Voice AI', 'Workflow Automation', 'Webhooks'],
    highlights: [
      'End-to-end voice conversation with ultra-realistic text-to-speech neural synthesis.',
      'N8N workflow automation coordinating calendar, tasks, and dynamic API integrations.',
      'Clean interactive frontend interface crafted with Lovable and responsive WebSockets.',
    ],
    githubUrl: 'https://github.com/shubham055555/My-Personal-AI-Based-Assistant-using_N8N-Lovable-ElevanLabs',
    stars: 'Voice Assistant',
  },
]

export default function ProjectsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [viewMode, setViewMode] = useState('carousel') // 'carousel' or 'grid'
  const [activeModalProject, setActiveModalProject] = useState(null)

  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const contentRef = useRef(null)

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

      // Content showcase slide-up animation
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
              trigger: contentRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const categories = [
    'All',
    'Generative AI & Agents',
    'Machine Learning & NLP',
    'IoT & Computer Vision'
  ]

  const filteredProjects =
    selectedFilter === 'All'
      ? projectsData
      : projectsData.filter((p) => p.category === selectedFilter)

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? filteredProjects.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === filteredProjects.length - 1 ? 0 : prev + 1))
  }

  const currentProject = filteredProjects[currentIndex] || filteredProjects[0]

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-28 bg-background/40 overflow-hidden border-t border-slate-800/60"
    >
      {/* Background glow ambiance */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-mint-500/10 rounded-full blur-[160px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header & Filter Tabs */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-mint-400/10 border border-mint-400/30 text-mint-300 font-mono text-xs uppercase tracking-widest mb-3">
              <Zap className="w-3.5 h-3.5" />
              <span>FEATURED WORK & GITHUB PROJECTS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-display">
              Projects & <span className="text-mint-400 glow-text-mint">Case Studies</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-400 font-mono">
              // 12 Open-Source AI, Machine Learning, Computer Vision & Agent Repositories
            </p>
          </div>

          {/* Controls: View Mode & Categories */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
            {/* View Mode Switcher */}
            <div className="flex items-center p-1 rounded-lg bg-surface-50 border border-slate-800 shrink-0">
              <button
                onClick={() => setViewMode('carousel')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono transition-all cursor-pointer ${
                  viewMode === 'carousel'
                    ? 'bg-mint-400 text-black font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Featured Carousel View"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Carousel</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-mint-400 text-black font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="All Projects Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grid ({filteredProjects.length})</span>
              </button>
            </div>

            {/* Filter Tabs (Horizontal scroll on mobile) */}
            <div className="flex overflow-x-auto no-scrollbar gap-1.5 w-full sm:w-auto pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedFilter(cat)
                    setCurrentIndex(0)
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    selectedFilter === cat
                      ? 'bg-mint-400 text-black font-bold shadow-mint-sm'
                      : 'bg-surface-50 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Showcase Container */}
        <div ref={contentRef}>

        {/* MODE 1: Carousel Showcase Card */}
        {viewMode === 'carousel' && currentProject && (
          <div className="tech-bracket-card relative rounded-2xl bg-surface-50/90 border border-slate-800 p-6 sm:p-10 backdrop-blur-md shadow-2xl transition-all duration-500">
            <div className="tech-corner-tr"></div>
            <div className="tech-corner-bl"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Image Preview with overlay badges */}
              <div className="lg:col-span-7 relative group">
                <div className="absolute -inset-2 rounded-xl bg-gradient-to-r from-mint-500/20 to-purple-500/20 blur-lg opacity-70 group-hover:opacity-100 transition-opacity"></div>

                <div className="relative rounded-xl overflow-hidden aspect-video bg-[#070b0e] border border-slate-700/80 shadow-2xl">
                  <img
                    src={currentProject.image}
                    alt={currentProject.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 select-none cursor-pointer"
                    onClick={() => setActiveModalProject(currentProject)}
                  />

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-black/80 border border-mint-500/40 text-[11px] font-mono font-semibold text-mint-300 backdrop-blur-md">
                    {currentProject.tag}
                  </div>

                  {/* Hover Quick View Overlay */}
                  <div
                    onClick={() => setActiveModalProject(currentProject)}
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer backdrop-blur-[2px]"
                  >
                    <span className="px-4 py-2 rounded-full bg-mint-400 text-black font-mono text-xs font-bold shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      Click for Full Details ↗
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Project Details */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-mint-400 mb-2">
                    <span>{currentProject.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      {currentProject.stars}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-white font-display mb-3">
                    {currentProject.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    {currentProject.description}
                  </p>

                  {/* Key Highlights */}
                  <div className="space-y-2 mb-6">
                    {currentProject.highlights.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-mint-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack pills */}
                  <div className="flex flex-wrap gap-1.5 mb-8">
                    {currentProject.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded bg-surface-100 border border-slate-800 text-[11px] font-mono text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTAs and Carousel Navigation */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                    <a
                      href={currentProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg bg-mint-400 hover:bg-mint-300 text-black font-bold text-xs font-mono uppercase tracking-wider transition-all shadow-mint-sm flex items-center gap-1.5 cursor-pointer"
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>GitHub Repo</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>

                    <button
                      onClick={() => setActiveModalProject(currentProject)}
                      className="p-2 rounded-lg bg-surface-100 hover:bg-surface-200 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer text-xs font-mono"
                      title="View Details Modal"
                    >
                      Details
                    </button>
                  </div>

                  {/* Carousel Controls */}
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-slate-500 mr-2">
                      {String(currentIndex + 1).padStart(2, '0')} / {String(filteredProjects.length).padStart(2, '0')}
                    </span>
                    <button
                      onClick={handlePrev}
                      className="w-9 h-9 rounded-lg bg-surface-100 hover:bg-surface-200 border border-slate-800 hover:border-mint-400/50 flex items-center justify-center text-slate-300 hover:text-mint-400 transition-all cursor-pointer"
                      aria-label="Previous project"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="w-9 h-9 rounded-lg bg-surface-100 hover:bg-surface-200 border border-slate-800 hover:border-mint-400/50 flex items-center justify-center text-slate-300 hover:text-mint-400 transition-all cursor-pointer"
                      aria-label="Next project"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* MODE 2: Comprehensive All Projects Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, idx) => (
              <div
                key={project.id || idx}
                className="tech-bracket-card relative rounded-xl bg-surface-50 border border-slate-800 p-5 flex flex-col justify-between hover:border-mint-500/40 transition-all duration-300 group"
              >
                <div className="tech-corner-tr"></div>
                <div className="tech-corner-bl"></div>

                <div>
                  <div className="flex items-center justify-between gap-2 mb-2 text-[11px] font-mono">
                    <span className="px-2 py-0.5 rounded bg-mint-950/80 border border-mint-500/40 text-mint-300">
                      {project.tag}
                    </span>
                    <span className="text-slate-500">{project.category}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white font-display mb-2 group-hover:text-mint-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Highlights snippet */}
                  <div className="space-y-1 mb-4">
                    {project.highlights.slice(0, 2).map((h, i) => (
                      <p key={i} className="text-[11px] text-slate-300 flex items-start gap-1.5">
                        <span className="text-mint-400 font-bold">›</span>
                        <span className="line-clamp-2">{h}</span>
                      </p>
                    ))}
                  </div>

                  {/* Tech Pills */}
                  <div className="flex flex-wrap gap-1 mb-6">
                    {project.tech.slice(0, 4).map((t, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-surface-100 border border-slate-800 text-[10px] font-mono text-slate-400"
                      >
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="px-1.5 py-0.5 rounded bg-surface-100 text-[10px] font-mono text-slate-500">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-mint-400 hover:text-white transition-colors"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>View Repository</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="text-[11px] font-mono text-slate-400 hover:text-white cursor-pointer"
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        </div>

      </div>

      {/* Project Quick View Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-3xl rounded-2xl bg-surface-50 border border-slate-700 p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-surface-100 text-slate-400 hover:text-white border border-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="px-2.5 py-1 rounded bg-mint-950 text-mint-300 border border-mint-500/40 text-xs font-mono">
                {activeModalProject.tag}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white font-display mt-2">
                {activeModalProject.title}
              </h3>
              <p className="text-xs font-mono text-slate-400 mt-1">
                {activeModalProject.category}
              </p>
            </div>

            <div className="rounded-xl overflow-hidden border border-slate-800 mb-6">
              <img
                src={activeModalProject.image}
                alt={activeModalProject.title}
                className="w-full h-auto object-cover max-h-72"
              />
            </div>

            <p className="text-sm text-slate-300 mb-6 leading-relaxed">
              {activeModalProject.description}
            </p>

            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-3">
              Key Engineering Highlights:
            </h4>
            <div className="space-y-2 mb-6">
              {activeModalProject.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-mint-400 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {activeModalProject.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded bg-surface-100 border border-slate-800 text-xs font-mono text-slate-300"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <a
                href={activeModalProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-lg bg-mint-400 hover:bg-mint-300 text-black font-bold text-xs font-mono uppercase tracking-wider shadow-mint-sm flex items-center gap-2 cursor-pointer transition-all"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Open on GitHub ↗</span>
              </a>
              <button
                onClick={() => setActiveModalProject(null)}
                className="px-5 py-2.5 rounded-lg bg-surface-100 hover:bg-surface-200 text-white text-xs font-mono uppercase tracking-wider border border-slate-800 cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
