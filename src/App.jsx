import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useScroll, useTransform, useMotionValue, animate, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import DrawCanvas from './components/DrawCanvas'
import Cursor from './components/Cursor'
import heroImg from './assets/hero.jpg'
import childhoodImg from './assets/childhood.jpg'
import cricketImg from './assets/cricket.jpg'
import injuryImg from './assets/injury.png'
import plottwistImg from './assets/plottwist.jpg'
import presentImg from './assets/present.jpg'
import { hero, craft, tools, aiTools, career, stats, works, quoteSection, floatingQuotes, shayari, dreams, playlist, testimonials as testimonialData, gallery, footer } from './content'
import vanshdeepThumb from './assets/Vanshdeep logo.jpg'
import sharkThumb from './assets/Shark Slide/SharkLogo.svg'
import oswalThumb from './assets/Oswal/oswal-logo.png'
import rrThumb from './assets/Rajasthan Royals/Final/1.png'
import pImg1 from './assets/Personal images/IMG_4740.jpg'
import pImg2 from './assets/Personal images/IMG_9875.JPG'
import pImg3 from './assets/Personal images/IMG_6600.jpg'
import pImg4 from './assets/Personal images/IMG_5181.jpg'
import pImg5 from './assets/Personal images/IMG_6769.jpg'
import pImg6 from './assets/Personal images/IMG_0323.JPG'
import pImg7 from './assets/Personal images/IMG_6628.JPG'
import pImg8 from './assets/Personal images/IMG_9403.JPG'
import pImg9 from './assets/Personal images/IMG_1093.JPG'
import pImg10 from './assets/Personal images/IMG_0427.JPG'
import pImg11 from './assets/Personal images/IMG_6278.jpg'
import pImg12 from './assets/Personal images/DSC04139.JPG'
import pImg13 from './assets/Personal images/IMG_6282.JPG'
import pImg14 from './assets/Personal images/IMG_9876.JPG'
import pImg15 from './assets/Personal images/DSC04160.JPG'
import pImg16 from './assets/Personal images/IMG_5707.JPG'
import pImg17 from './assets/Personal images/IMG_6777.jpg'
import pImg18 from './assets/Personal images/IMG_0268 2.jpg'
import pImg19 from './assets/Personal images/IMG_5705.JPG'
import pImg20 from './assets/Personal images/IMG_9119.JPG'
import pImg21 from './assets/Personal images/IMG_6613.jpg'
import pImg22 from './assets/Personal images/DSC04168.JPG'
import pImg23 from './assets/Personal images/IMG_4993.JPG'
import pImg24 from './assets/Personal images/IMG_0141.JPG'
import pImg25 from './assets/Personal images/IMG_6771.jpg'
import pImg26 from './assets/Personal images/DSC04174.JPG'
import pImg27 from './assets/Personal images/IMG_5211.jpg'
import pImg28 from './assets/Personal images/DSC04162.JPG'
import pImg29 from './assets/Personal images/IMG_9874.JPG'
import pImg30 from './assets/Personal images/IMG_0558.JPG'
import aiClaude from './assets/AI tool logo/claude.svg'
import aiChatGPT from './assets/AI tool logo/chat gpt.svg'
import aiGemini from './assets/AI tool logo/gemini.svg'
import aiHiggsfield from './assets/AI tool logo/higgsfield.svg'

// Brand logos
const logoModules = import.meta.glob('./assets/logos/*.svg', { eager: true, query: '?url', import: 'default' })
// Logos that need extra scaling (tall/square aspect ratios appear smaller)
const logoScale = {
  'logo-3': 1.3,
  'logo-5': 1.35,
  'logo-12': 1.25,
  'logo-15': 1.4,
  'logo-16': 1.2,
  'logo-17': 1.3,
  'logo-18': 1.25,
  'logo-20': 1.35,
  'logo-21': 1.4,
  'logo-22': 1.25,
}
const excludeLogos = new Set(['logo-24'])
const brandLogos = Object.entries(logoModules)
  .sort(([a], [b]) => {
    const numA = parseInt(a.match(/logo-(\d+)/)?.[1] || '0')
    const numB = parseInt(b.match(/logo-(\d+)/)?.[1] || '0')
    return numA - numB
  })
  .filter(([path]) => !excludeLogos.has(path.split('/').pop().replace('.svg', '')))
  .map(([path, url]) => {
    const name = path.split('/').pop().replace('.svg', '')
    return { src: url, name, scale: logoScale[name] || 1 }
  })

gsap.registerPlugin(ScrollTrigger)

/* ═══ SMOOTH SCROLL ═══ */
function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(time => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)
    return () => { lenis.destroy(); gsap.ticker.remove(lenis.raf) }
  }, [])
}

const blue = 'var(--color-blue)'
const dk = 'var(--color-dark)'
const lt = 'var(--color-light)'

/* ═══ UTILS ═══ */
function R({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const v = useInView(ref, { once: true, margin: '-60px' })
  return <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.25, 1, 0.5, 1] }} className={className}>{children}</motion.div>
}

function Counter({ target, suffix = '+' }) {
  const ref = useRef(null); const v = useInView(ref, { once: true }); const mv = useMotionValue(0); const [d, setD] = useState('0')
  useEffect(() => { if (!v) return; const c = animate(mv, target, { duration: 2, ease: 'easeOut', onUpdate: x => setD(Math.floor(x).toString()) }); return c.stop }, [v, target, mv])
  return <span ref={ref}>{d}{suffix}</span>
}

/* ═══ HORIZONTAL STORY ═══ */
function StorySection() {
  const cRef = useRef(null), tRef = useRef(null)
  const panels = [
    { year: '1999', title: 'BORN.', content: <>Born into a proud family.<br />Some said, "Mera beta doctor banega."<br />Some said, "Engineer."<br />Everyone had plans for me.<br />But me? no idea</>, img: childhoodImg, realImg: true },
    { year: '2011', title: 'THE DREAM.', content: <>"India lifted the World Cup after 28 years."<br />That moment… damn, goosebumps.<br />And I still remember, Sachin sir said in the post-match presentation:<br /><span className="font-700" style={{ color: '#3B82F6' }}>"Chase your dreams, because dreams do come true."</span><br />Those words stayed with me. That's when I saw my dream —<br />to play for India, wearing that blue jersey.</>, img: cricketImg, realImg: true },
    { year: '2019', title: 'THE INJURY.', content: <>Everything was going good… until that black day.<br />Rainy season. Practice.<br />Years of hard work gone in a moment.<br /><br />That day… something didn't just break.<br />It ended.</>, img: injuryImg, realImg: true, zoom: 1.4, pos: 'center 60%' },
    { year: '2019', title: 'THE PLOT TWIST.', accent: true, content: <>I'm a very ambitious person.<br />I don't quit. Because I believe — <span className="font-700" style={{ color: '#3B82F6' }}>अंतः अस्ति प्रारंभः</span><br />So I shifted my practice…<br />from the cricket ground to Photoshop.<br />Same dedication. Same curiosity.<br />Same obsession to get better.</>, img: plottwistImg, realImg: true },
    { year: 'Present', title: 'NEW INNINGS.', content: <>I didn't become what I planned.<br />I became what I was meant to be.<br />From swinging the ball to building brands.<br />From wearing spikes to creating identities.<br />This wasn't a backup plan.<br /><br /><span className="font-700" style={{ color: '#3B82F6' }}>It's God's plan, baby.</span><br /><br />A professional cricketer who became a graphic designer.</>, img: presentImg, realImg: true, zoom: 1.2, pos: '40% 25%' },
  ]

  const [activePanel, setActivePanel] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = tRef.current; if (!track) return
      const scrollDist = track.scrollWidth - window.innerWidth
      const end = () => '+=' + (scrollDist + window.innerHeight * 0.5)
      gsap.to(track, { x: -scrollDist, ease: 'none', scrollTrigger: { trigger: cRef.current, pin: true, anticipatePin: 1, scrub: 1, end, invalidateOnRefresh: true,
        onUpdate: (self) => { setActivePanel(Math.round(self.progress * (panels.length - 1))) }
      } })
    }, cRef)
    return () => ctx.revert()
  }, [panels.length])

  return (
    <section ref={cRef} className="relative overflow-hidden bg-[var(--color-light)] text-[var(--color-dark)]">
      {/* Timeline with dots */}
      <div className="absolute bottom-8 left-[10%] right-[10%] z-20">
        {/* Line */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-black/8 -translate-y-1/2" />
        {/* Year labels + dots */}
        <div className="flex justify-between items-center relative">
          {panels.map((p, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <span className={`text-[0.6rem] font-500 tracking-[0.2em] transition-all duration-400 ${activePanel === i ? 'opacity-80' : 'opacity-30'}`} style={activePanel === i ? { color: '#3B82F6' } : {}}>{p.year}</span>
              <div className={`w-3 h-3 rounded-full border-2 transition-all duration-400 ${activePanel === i ? 'border-[#3B82F6] bg-[#3B82F6] scale-125' : 'border-black/15 bg-transparent'}`} />
            </div>
          ))}
        </div>
      </div>

      <div ref={tRef} className="flex w-max h-screen">
        {panels.map((p, i) => (
          <div key={i} className="h-screen flex items-center shrink-0 px-6 md:px-16" style={{ width: '90vw' }}>
            <div className="max-w-4xl mx-auto w-full flex flex-col-reverse md:flex-row gap-6 md:gap-14 items-center">
              <div className="flex-1 min-w-0">
                <p className="text-[4rem] md:text-[8rem] leading-none font-700 select-none tracking-tight opacity-10">{p.year}</p>
                <h2 className="text-2xl md:text-4xl font-700 leading-tight mt-3 whitespace-pre-line" style={{ color: '#3B82F6' }}>{p.title}</h2>
                <p className="text-sm md:text-base leading-relaxed mt-5 max-w-md" style={{ color: 'rgba(0,0,0,0.45)' }}>{p.content}</p>
              </div>
              {p.img && p.realImg && <div className="w-40 md:w-72 shrink-0 overflow-hidden rounded-2xl">
                <img src={p.img} alt="" className="aspect-[3/4] w-full object-cover grayscale" style={{ transform: p.zoom ? `scale(${p.zoom})` : undefined, objectPosition: p.pos || 'center top' }} />
              </div>}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ═══ CRAFT — spotlight on hover ═══ */
function CraftSection() {
  const [h, setH] = useState(null)
  const ref = useRef(null), v = useInView(ref, { once: true, margin: '-80px' })
  const lines = craft.lines

  const getOpacity = (i) => {
    if (!v) return 0
    if (h === null) return 0.15  // all dim by default
    return h === i ? 1 : 0.04   // hovered = bright, rest = nearly invisible
  }

  const getColor = (i) => {
    if (i === 3) return h === 3 ? 'var(--color-blue)' : 'rgba(59,130,246,0.15)'
    return h === i ? '#ffffff' : 'rgba(255,255,255,0.15)'
  }

  return (
    <section ref={ref} className="min-h-screen flex items-center py-24 bg-[var(--color-dark)] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-10 w-full relative z-10" onMouseLeave={() => setH(null)}>
        {lines.map((l, i) => (
          <motion.h2 key={i}
            className="font-700 leading-[0.88] cursor-default select-none"
            style={{
              fontSize: 'clamp(3rem, 12vw, 9rem)',
              color: getColor(i),
              textShadow: h === i ? (i === 3 ? '0 0 60px rgba(59,130,246,0.3)' : '0 0 60px rgba(255,255,255,0.15)') : 'none',
              transition: 'color 0.4s, text-shadow 0.4s, opacity 0.4s',
            }}
            initial={{ opacity: 0, filter: 'blur(16px)', y: 20 }}
            animate={v ? { opacity: getOpacity(i), filter: 'blur(0px)', y: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.25, 1, 0.5, 1] }}
            onMouseEnter={() => setH(i)}
          >{l}</motion.h2>
        ))}
        <motion.p className="text-sm mt-8 opacity-10" initial={{ opacity: 0 }} animate={v ? { opacity: 0.1 } : {}} transition={{ delay: 0.7 }}>{craft.subtitle}</motion.p>
      </div>
    </section>
  )
}

/* ═══ TOOLS — from content.js ═══ */

/* ═══ THINGS I BELIEVE IN ═══ */
const flyXs = [-300, 400, -250, 350, -400, 300, -350, 250, -200, 450]
const flyYs = [-200, 150, 250, -180, 200, -250, 180, -150, 300, -200]
const flyRs = [-25, 20, -15, 30, -20, 18, -28, 15, -12, 22]
const landRs = [-3, 2, -1.5, 2.5, -2, 1.5, -2.5, 1, -1, 2]

function QuoteCard({ text, author, accent, index }) {
  const ref = useRef(null)
  const v = useInView(ref, { once: true, margin: '-40px' })
  const fx = flyXs[index % 10], fy = flyYs[index % 10], fr = flyRs[index % 10], lr = landRs[index % 10]

  return (
    <motion.div
      ref={ref}
      className="hover-target group relative p-5 md:p-6 rounded-2xl border border-white/[0.04] overflow-hidden cursor-default"
      initial={{ opacity: 0, x: fx, y: fy, rotate: fr, scale: 0.5, filter: 'blur(12px)' }}
      animate={v ? { opacity: 1, x: 0, y: 0, rotate: lr, scale: 1, filter: 'blur(0px)' } : {}}
      transition={{ duration: 1.2, delay: index * 0.07, type: 'spring', stiffness: 45, damping: 13 }}
      whileHover={{ y: -10, rotate: 0, scale: 1.05, zIndex: 30, transition: { type: 'spring', stiffness: 300, damping: 18 } }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle at top left, ${accent}12, transparent 60%)` }} />
      <div className="absolute top-3 left-3 text-4xl font-700 opacity-[0.03] select-none">"</div>
      <div className="w-1.5 h-1.5 rounded-full mb-2.5 opacity-50" style={{ background: accent }} />
      <p className="font-300 leading-relaxed opacity-30 group-hover:opacity-65 transition-opacity duration-500 relative z-10 whitespace-pre-line" style={{ fontSize: '11px' }}>{text}</p>
      {author && <p className="font-400 opacity-15 mt-3 group-hover:opacity-30 transition-opacity duration-500 relative z-10" style={{ fontSize: '10px' }}>{author}</p>}
      <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(to right, transparent, ${accent}30, transparent)` }} />
    </motion.div>
  )
}

function FloatingQuotesSection() {
  const accents = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#E91E8C', '#6366F1', '#14B8A6', '#F97316', '#EC4899']
  const allCards = shayari.map((s, i) => ({ text: s.text, author: s.author, accent: accents[i % accents.length] }))

  return (
    <section className="relative overflow-x-clip py-24" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #060a12 50%, #0a0a0a 100%)' }}>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.025]" style={{ background: 'radial-gradient(circle, #3B82F6, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.02]" style={{ background: 'radial-gradient(circle, #8B5CF6, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 pb-12 text-center">
        <R><p className="text-[0.6rem] font-500 tracking-[0.3em] opacity-15 mb-3">THINGS I BELIEVE IN</p></R>
        <R delay={0.05}><p className="text-xs opacity-10 mb-6">quotes, shers, and borrowed wisdom.</p></R>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 grid grid-cols-2 md:grid-cols-5 gap-3">
        {allCards.map((card, i) => (
          <QuoteCard key={i} text={card.text} author={card.author} accent={card.accent} index={i} />
        ))}
      </div>
    </section>
  )
}

/* ═══ TESTIMONIALS — stacked rotating cards ═══ */
function TestimonialSection() {
  const testimonials = testimonialData

  const [current, setCurrent] = useState(0)
  const dir = useRef(0)

  return (
    <section className="py-28 bg-[var(--color-light)] text-[var(--color-dark)] overflow-hidden">
      <div className="max-w-4xl mx-auto px-10 text-center">
        <R><p className="text-[0.6rem] font-500 tracking-[0.3em] opacity-25 mb-3">TESTIMONIALS</p></R>
        <R delay={0.05}><h2 className="text-2xl md:text-4xl font-700 mb-2">What others say about Virat</h2></R>
        <R delay={0.1}><p className="text-sm opacity-35 mb-16">you don't have to trust our word.</p></R>

        <div className="relative h-[280px] flex items-center justify-center">
          <div className="absolute w-[90%] max-w-lg h-[220px] bg-white/40 rounded-2xl rotate-2 top-1/2 -translate-y-1/2 shadow-sm" style={{ zIndex: 1 }} />
          <div className="absolute w-[85%] max-w-lg h-[210px] bg-white/60 rounded-2xl -rotate-1 top-1/2 -translate-y-1/2 shadow-sm" style={{ zIndex: 2 }} />

          <AnimatePresence initial={false} custom={dir.current}>
            <motion.div
              key={current}
              custom={dir.current}
              initial={(d) => ({ x: d > 0 ? 450 : -450, rotate: d > 0 ? 15 : -15, opacity: 0 })}
              animate={{ x: 0, rotate: 0, opacity: 1 }}
              exit={(d) => ({ x: d > 0 ? -450 : 450, rotate: d > 0 ? -15 : 15, opacity: 0 })}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="absolute w-[95%] max-w-lg bg-white rounded-2xl shadow-xl p-8 md:p-10 text-left"
              style={{ zIndex: 10 }}
            >
              <p className="text-base md:text-lg font-400 leading-relaxed text-[var(--color-dark)]">{testimonials[current].text}</p>
              <div className="flex items-center gap-3 mt-6">
                <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-xs font-600 opacity-40">{testimonials[current].name.charAt(0)}</div>
                <div>
                  <p className="text-sm font-600">{testimonials[current].name}</p>
                  <p className="text-xs opacity-40">{testimonials[current].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Buttons outside the card container — no z-index conflicts */}
        <div className="flex items-center justify-center gap-6 mt-6" role="navigation">
          <div className="w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center text-lg border border-black/5 hover:scale-110 active:scale-95 transition-all select-none"
            role="button" tabIndex={0}
            onMouseDown={() => { dir.current = -1; setCurrent(c => (c - 1 + testimonials.length) % testimonials.length) }}>‹</div>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <div key={i} role="button" tabIndex={0}
                onMouseDown={() => { dir.current = i > current ? 1 : -1; setCurrent(i) }}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${i === current ? 'bg-[var(--color-blue)] w-6' : 'bg-black/10 w-2'}`} />
            ))}
          </div>

          <div className="w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center text-lg border border-black/5 hover:scale-110 active:scale-95 transition-all select-none"
            role="button" tabIndex={0}
            onMouseDown={() => { dir.current = 1; setCurrent(c => (c + 1) % testimonials.length) }}>›</div>
        </div>
      </div>
    </section>
  )
}

/* ═══ PRELOADER — minimal line ═══ */
/* ═══ HERO — GSAP-driven: quote clear on load → exits → intro slides in ═══ */
function HeroSection() {
  const containerRef = useRef(null)
  const quoteRef = useRef(null)
  const introRef = useRef(null)
  const photoRef = useRef(null)
  const scrollCueRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          anticipatePin: 1,
          scrub: 1,
          start: 'top top',
          end: '+=250%',
        }
      })

      // Scroll cue: fades out immediately
      tl.to(scrollCueRef.current, { opacity: 0, duration: 0.05 }, 0)

      // Quote: holds 0–0.15, then fully exits 0.15–0.35
      tl.to(quoteRef.current, { opacity: 0, y: -100, duration: 0.2, ease: 'power2.in' }, 0.15)

      // Gap: 0.35–0.5 = empty black screen (clean pause)

      // Photo: fades in 0.5–0.7
      tl.fromTo(photoRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.2, ease: 'power2.out' },
        0.5
      )

      // Intro: slides up 0.55–0.75 (slightly after photo starts)
      tl.fromTo(introRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' },
        0.55
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="h-screen overflow-hidden relative" style={{ background: '#000' }}>

      {/* Photo — right side, fades in with intro */}
      <div ref={photoRef} className="absolute top-0 right-0 w-full md:w-[55%] h-full" style={{ opacity: 0 }}>
        <img src={heroImg} alt="Virat Singh" className="w-full h-full object-cover object-top" />
        {/* Gradients blend photo edges into pure black bg */}
        <div className="absolute inset-0 md:hidden" style={{ background: 'rgba(0,0,0,0.6)' }} />
        <div className="absolute inset-0 hidden md:block" style={{ background: 'linear-gradient(to right, #000 0%, #000 5%, transparent 50%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #000 0%, transparent 30%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #000 0%, transparent 15%)' }} />
      </div>

      {/* Quote — CLEAR on first frame, holds, then exits up */}
      <div ref={quoteRef} className="absolute inset-0 flex items-center justify-center z-10">
        <p className="text-lg md:text-xl font-500 leading-relaxed text-center max-w-2xl px-10 opacity-70 whitespace-pre-line">
          {hero.quote}
        </p>
      </div>

      {/* Intro — slides up after quote exits */}
      <div ref={introRef} className="absolute inset-0 flex items-center z-10" style={{ opacity: 0 }}>
        <div className="max-w-7xl mx-auto px-10 w-full">
          <div className="max-w-lg">
            <p className="text-sm font-400 opacity-40 mb-3">{hero.greeting}</p>
            <h1 className="font-700 leading-[0.9] tracking-tight mb-8" style={{ fontSize: 'clamp(3.5rem, 8vw, 6rem)' }}>
              I am {hero.name}<br />{hero.surname}<span style={{ color: blue }}>.</span>
            </h1>
            <p className="text-sm md:text-base leading-relaxed opacity-40 max-w-md">
              {hero.bio}
            </p>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div ref={scrollCueRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10" style={{ opacity: 0.15 }}>
        <span className="text-[0.6rem] font-500 tracking-[0.3em]">SCROLL</span>
        <motion.span className="text-sm" animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2 }}>↓</motion.span>
      </div>
    </section>
  )
}

function Preloader({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200)
    return () => clearTimeout(t)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-[var(--color-dark)]"
      style={{ zIndex: 9999 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="flex flex-col items-center gap-6">
        <motion.p className="text-xs font-500 tracking-[0.3em] opacity-30"
          initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} transition={{ duration: 0.5 }}>
          VIRAT SINGH
        </motion.p>
        <div className="w-24 h-[1px] bg-white/5 overflow-hidden rounded-full">
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'var(--color-blue)' }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: [0.25, 1, 0.5, 1] }}
          />
        </div>
      </div>
    </motion.div>
  )
}

/* ═══ APP ═══ */
export default function App() {
  const [loaded, setLoaded] = useState(false)
  useSmoothScroll()
  const { scrollYProgress } = useScroll()
  const progressW = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <>
      <AnimatePresence>
        {!loaded && <Preloader onDone={() => setLoaded(true)} />}
      </AnimatePresence>
      <DrawCanvas />
      <Cursor />
      <motion.div className="fixed top-0 left-0 h-[2px] z-[999]" style={{ width: progressW, background: blue }} />

      {/* ═══ HERO — scroll-driven: quote slides out, intro slides in ═══ */}
      <HeroSection />

      {/* ═══ BRAND LOGOS MARQUEE ═══ */}
      <div className="pb-16 pt-8 overflow-hidden" style={{ background: '#000' }}>
        <div className="logo-marquee-track flex w-max items-center gap-[80px] px-10">
          {[...Array(2)].flatMap((_, setIndex) =>
            brandLogos.map((logo, i) => (
              <img
                key={`${setIndex}-${i}`}
                src={logo.src}
                alt={logo.name}
                className="logo-marquee-item hover-target"
                style={logo.scale !== 1 ? { transform: `scale(${logo.scale})` } : undefined}
                draggable={false}
              />
            ))
          )}
        </div>
        <style>{`
          .logo-marquee-track {
            animation: logoMarquee 35s linear infinite;
          }
          .logo-marquee-item {
            width: 180px;
            height: 80px;
            object-fit: contain;
            filter: grayscale(1) brightness(0.6) contrast(1.2);
            opacity: 0.45;
            transition: filter 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            flex-shrink: 0;
          }
          .logo-marquee-item:hover {
            filter: grayscale(0) brightness(1) contrast(1) drop-shadow(0 0 20px rgba(212,175,55,0.15));
            opacity: 1;
          }
          @keyframes logoMarquee {
            to { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* ═══ 3. STORY (horizontal) ═══ */}
      <StorySection />

      {/* ═══ 4. 6+ YEARS — as a story beat ═══ */}
      <section className="py-20 bg-[var(--color-light)] text-[var(--color-dark)] text-center">
        <R>
          <p className="text-sm font-400 opacity-30 mb-3">And it's been</p>
          <p className="font-700 leading-none" style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', color: blue }}>6+ YEARS</p>
          <p className="text-sm font-700 opacity-30 mt-3">of turning ideas into visuals, brands into stories, and clients into believers.</p>
        </R>
      </section>

      {/* ═══ 5. CAREER ═══ */}
      <section className="py-16 bg-[var(--color-light)] text-[var(--color-dark)]">
        <div className="max-w-3xl mx-auto px-10">
          <R><p className="text-[0.6rem] font-500 tracking-[0.3em] opacity-25 mb-8 text-center">CAREER PATH</p></R>
          <div className="grid md:grid-cols-2 gap-4">
            {career.map((t, i) => (
              <R key={i} delay={i * 0.06}>
                <motion.div
                  className={`group p-5 rounded-xl border transition-all duration-300 cursor-default ${t.active ? 'border-[var(--color-blue)]/15 bg-[var(--color-blue)]/[0.03]' : 'border-black/[0.05]'}`}
                  whileHover={{ y: -3, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <p className={`text-sm font-600 ${t.active ? '' : 'opacity-70'}`} style={t.active ? { color: blue } : {}}>{t.role}</p>
                  <p className={`text-xs mt-1 ${t.active ? 'opacity-45' : 'opacity-30'}`}>{t.company}</p>
                  <p className="text-[0.6rem] opacity-20 mt-2 tracking-wide">{t.period}</p>
                </motion.div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 6. CRAFT ═══ */}
      <CraftSection />

      {/* ═══ 7. TOOLS ═══ */}
      <section className="py-24 bg-[var(--color-dark)]">
        <div className="max-w-6xl mx-auto px-10 text-center">
          <R><p className="text-[0.6rem] font-500 tracking-[0.3em] opacity-20 mb-8">WHAT I WORK WITH</p></R>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-14 max-w-3xl mx-auto">
            {tools.map((t, i) => (
              <R key={t.name} delay={i * 0.03}>
                <motion.div className="hover-target group p-5 rounded-xl border border-white/[0.04] text-center transition-colors duration-400 hover:border-white/[0.12] cursor-default"
                  whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                  <div className="w-10 h-10 rounded-lg mx-auto flex items-center justify-center text-[0.65rem] font-700 mb-3" style={{ background: t.color + '15', color: t.color }}>{t.abbr}</div>
                  <p className="text-[0.7rem] font-400 opacity-40 group-hover:opacity-80 transition-opacity">{t.name}</p>
                </motion.div>
              </R>
            ))}
          </div>
          <R><p className="text-[0.6rem] font-500 tracking-[0.3em] mb-5" style={{ color: blue }}>AI COMPANIONS</p></R>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { name: 'Claude', logo: aiClaude },
              { name: 'ChatGPT', logo: aiChatGPT },
              { name: 'Gemini', logo: aiGemini },
              { name: 'Higgsfield', logo: aiHiggsfield },
            ].map((t, i) => (
              <R key={t.name} delay={i * 0.03}>
                <motion.div className="hover-target flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-white/[0.04] transition-colors duration-300 hover:border-white/[0.12] cursor-default"
                  whileHover={{ y: -3 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                  <img src={t.logo} alt={t.name} className="w-6 h-6 object-contain" />
                  <span className="text-xs font-400 opacity-40">{t.name}</span>
                </motion.div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 8. OVERVIEW — clean, single row, no rectangles ═══ */}
      <section className="py-20 bg-[var(--color-light)] text-[var(--color-dark)]">
        <div className="max-w-7xl mx-auto px-10 text-center">
          <R><p className="text-[0.6rem] font-500 tracking-[0.3em] opacity-25 mb-10">OVERVIEW</p></R>
          <R>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-4">
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <p className="font-700 leading-none" style={{ fontSize: 'clamp(36px, 8vw, 50px)' }}><Counter target={s.number} suffix={s.suffix} /></p>
                  <p className="text-xs font-400 opacity-30 mt-2">{s.label}</p>
                </div>
              ))}
            </div>
          </R>
        </div>
      </section>

      {/* ═══ 9. WORK — no category/years ═══ */}
      <section className="py-24 bg-[var(--color-light)] text-[var(--color-dark)]">
        <div className="max-w-6xl mx-auto px-10">
          <R><h2 className="text-xl font-600 mb-10">SELECTED WORKS</h2></R>
          <div className="grid grid-cols-4 gap-4 max-md:grid-cols-2">
            {works.map((p, i) => (
              <R key={i} delay={i * 0.05}>
                {p.link ? (
                  <div
                    className="hover-target block rounded-xl overflow-hidden group transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
                    onClick={() => window.location.href = p.link}
                    role="link"
                  >
                    <div className="aspect-[4/3] transition-transform duration-700 group-hover:scale-105 relative" style={{ background: p.bg }}>
                      {p.thumb === 'vanshdeep' && <img src={vanshdeepThumb} alt="" className="absolute inset-0 w-full h-full object-cover" />}
                      {p.thumb === 'cloudysharks' && <img src={sharkThumb} alt="" className="absolute inset-0 w-full h-full object-contain p-10" />}
                      {p.thumb === 'oswal' && <img src={oswalThumb} alt="" className="absolute inset-0 w-full h-full object-contain p-10" />}
                      {p.thumb === 'rr' && <img src={rrThumb} alt="" className="absolute inset-0 w-full h-full object-cover" />}
                    </div>
                    <div className="p-4 bg-white"><h3 className="font-500 text-sm">{p.title}</h3></div>
                  </div>
                ) : (
                  <div className="hover-target block rounded-xl overflow-hidden group transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
                    <div className="aspect-[4/3] transition-transform duration-700 group-hover:scale-105" style={{ background: p.bg }} />
                    <div className="p-4 bg-white"><h3 className="font-500 text-sm">{p.title}</h3></div>
                  </div>
                )}
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 10. QUOTE ═══ */}
      <section className="flex items-center justify-center text-center bg-[var(--color-dark)] py-28">
        <div className="max-w-4xl px-10">
          <R><h2 className="font-700 leading-[1.15] tracking-tight whitespace-pre-line" style={{ fontSize: '20px' }}>{quoteSection.hindi}</h2></R>
          <R delay={0.15}><p className="text-sm mt-8 opacity-12">{quoteSection.english}</p></R>
        </div>
      </section>

      {/* ═══ 11. FLOATING QUOTES ═══ */}
      <FloatingQuotesSection />

      {/* ═══ 12. DREAMS — modern cards ═══ */}
      <section className="relative overflow-hidden py-28" style={{ background: 'linear-gradient(180deg,#060a12,#0c1018 50%,#0a0a0a 100%)' }}>
        <div className="absolute inset-0 pointer-events-none animate-pulse opacity-60" style={{ background: 'radial-gradient(1px at 8% 15%,rgba(59,130,246,.4),transparent),radial-gradient(1px at 25% 8%,rgba(255,255,255,.25),transparent),radial-gradient(1.5px at 45% 12%,rgba(59,130,246,.3),transparent),radial-gradient(1px at 65% 20%,rgba(255,255,255,.2),transparent),radial-gradient(1px at 88% 5%,rgba(59,130,246,.25),transparent),radial-gradient(1px at 12% 40%,rgba(255,255,255,.15),transparent),radial-gradient(1.5px at 38% 50%,rgba(59,130,246,.3),transparent),radial-gradient(1px at 58% 35%,rgba(255,255,255,.2),transparent),radial-gradient(1px at 50% 72%,rgba(59,130,246,.25),transparent)', animationDuration: '4s' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-10 text-center">
          <R><h2 className="text-2xl md:text-4xl font-700 mb-2" style={{ color: blue }}>BEFORE I'M DONE.</h2></R>
          <R delay={0.08}><p className="text-xs opacity-15 mb-14">not a bucket list. a promise to myself.</p></R>
          <div className="space-y-3 max-w-xl mx-auto text-left">
            {dreams.map((d, i) => (
              <R key={i} delay={i * 0.05}>
                <motion.div
                  className="group flex items-center gap-4 px-6 py-4 rounded-2xl border border-white/[0.03] relative overflow-hidden cursor-default"
                  whileHover={{ x: 10, scale: 1.01, borderColor: d.done ? 'rgba(16,185,129,0.15)' : 'rgba(59,130,246,0.15)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-blue)]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="w-5 h-5 rounded-full border flex items-center justify-center shrink-0 relative z-10 transition-colors" style={{ borderColor: d.done ? 'rgba(16,185,129,0.4)' : 'rgba(255,255,255,0.08)' }}>
                    {d.done && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                  <span className={`text-sm font-400 relative z-10 transition-opacity ${d.done ? 'opacity-40 line-through' : 'opacity-60 group-hover:opacity-100'}`}>{d.text}</span>
                </motion.div>
              </R>
            ))}
          </div>
          <R delay={0.4}><p className="text-sm mt-10 opacity-15" style={{ color: blue }}>loading<span className="animate-pulse">...</span></p></R>
        </div>
      </section>

      {/* ═══ 13. OFF SCREEN — cluttered photo dump ═══ */}
      <style>{`.photo-card{transition:transform 0.4s cubic-bezier(0.25,1,0.5,1),box-shadow 0.3s ease;will-change:transform;backface-visibility:hidden}.photo-card:hover{transform:rotate(0deg) scale(1.15)!important;z-index:30!important;box-shadow:0 20px 40px rgba(0,0,0,0.3)}`}</style>
      <section className="py-24 bg-[var(--color-light)] text-[var(--color-dark)] overflow-hidden">
        <div className="max-w-6xl mx-auto px-10">
          <R><h2 className="text-xl font-600 mb-14">OFF SCREEN.</h2></R>
          <div className="relative hidden md:block" style={{ height: '1050px', contain: 'layout style paint' }}>
            {[
              { img: pImg4, top: '0%', left: '2%', w: 150, r: -8, z: 3 },
              { img: pImg12, top: '-1%', left: '20%', w: 190, r: 3, z: 8 },
              { img: pImg2, top: '2%', left: '48%', w: 140, r: -5, z: 5 },
              { img: pImg11, top: '0%', left: '70%', w: 155, r: 7, z: 2 },
              { img: pImg17, top: '3%', left: '88%', w: 120, r: -9, z: 14 },
              { img: pImg26, top: '15%', left: '-3%', w: 130, r: -10, z: 2 },
              { img: pImg3, top: '16%', left: '15%', w: 145, r: 6, z: 6 },
              { img: pImg1, top: '14%', left: '35%', w: 135, r: -4, z: 9 },
              { img: pImg6, top: '17%', left: '56%', w: 160, r: 5, z: 4 },
              { img: pImg18, top: '16%', left: '78%', w: 140, r: 7, z: 8 },
              { img: pImg10, top: '32%', left: '3%', w: 155, r: -7, z: 7 },
              { img: pImg22, top: '30%', left: '22%', w: 125, r: 10, z: 4 },
              { img: pImg9, top: '33%', left: '42%', w: 165, r: -3, z: 10 },
              { img: pImg5, top: '30%', left: '62%', w: 145, r: 8, z: 1 },
              { img: pImg28, top: '34%', left: '82%', w: 135, r: -6, z: 11 },
              { img: pImg8, top: '50%', left: '-1%', w: 150, r: -6, z: 11 },
              { img: pImg14, top: '48%', left: '18%', w: 140, r: 4, z: 3 },
              { img: pImg29, top: '50%', left: '38%', w: 155, r: -8, z: 12 },
              { img: pImg15, top: '48%', left: '58%', w: 145, r: 6, z: 13 },
              { img: pImg30, top: '52%', left: '78%', w: 135, r: -5, z: 5 },
              { img: pImg7, top: '66%', left: '5%', w: 155, r: 5, z: 12 },
              { img: pImg13, top: '68%', left: '25%', w: 165, r: -8, z: 2 },
              { img: pImg21, top: '65%', left: '48%', w: 145, r: -7, z: 15 },
              { img: pImg16, top: '67%', left: '70%', w: 140, r: -5, z: 5 },
              { img: pImg27, top: '66%', left: '88%', w: 120, r: 9, z: 6 },
              { img: pImg20, top: '82%', left: '0%', w: 135, r: 8, z: 9 },
              { img: pImg23, top: '83%', left: '18%', w: 150, r: -6, z: 10 },
              { img: pImg19, top: '80%', left: '38%', w: 145, r: -4, z: 6 },
              { img: pImg24, top: '84%', left: '58%', w: 130, r: 5, z: 7 },
              { img: pImg25, top: '82%', left: '78%', w: 145, r: -8, z: 13 },
            ].map((p, i) => (
              <div
                key={i}
                className="absolute photo-card rounded-lg overflow-hidden shadow-lg cursor-default"
                style={{ top: p.top, left: p.left, width: p.w, zIndex: p.z, transform: `rotate(${p.r}deg)`, border: '3px solid white', contain: 'layout style paint' }}
              >
                <img src={p.img} alt="" className="w-full aspect-[4/5] object-cover object-top" loading="lazy" decoding="async" />
              </div>
            ))}
          </div>
          {/* Mobile: messy grid */}
          <div className="md:hidden grid grid-cols-3 gap-2">
            {[pImg4, pImg12, pImg2, pImg11, pImg3, pImg1, pImg6, pImg10, pImg9, pImg5, pImg8, pImg14, pImg15, pImg21, pImg22, pImg29, pImg27, pImg28].map((img, i) => (
              <R key={i} delay={i * 0.03}>
                <div className="rounded-lg overflow-hidden" style={{ border: '3px solid white', transform: `rotate(${[-5, 3, -3, 6, -4, 2, -6, 4, -2, 5, -3, 7, -4, 6, -5, 3, -7, 8][i]}deg)` }}>
                  <img src={img} alt="" className="w-full aspect-square object-cover object-top" loading="lazy" />
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 14. SOUL ═══ */}
      <section className="py-24 bg-[var(--color-dark)]">
        <div className="max-w-6xl mx-auto px-10">
          <div>
            <R><p className="text-[0.6rem] font-500 tracking-[0.3em] mb-2" style={{ color: blue }}>ON REPEAT 🎧</p></R>
            <R delay={0.05}><p className="text-[0.6rem] opacity-12 mb-5">you can tell a lot about a person by their playlist.</p></R>
            <R delay={0.08}>
              <div className="flex flex-wrap gap-2">
                {playlist.map(s => (
                  <span key={s} className="hover-target text-xs font-400 px-4 py-2 rounded-full border border-white/[0.04] transition-all duration-300 hover:border-[var(--color-blue)]/25 cursor-default">{s}</span>
                ))}
              </div>
              <p className="text-[0.6rem] opacity-8 mt-3">— all Arijit Singh. obviously.</p>
            </R>
          </div>
        </div>
      </section>


      {/* ═══ FOOTER ═══ */}
      <div className="bg-[var(--color-light)] text-[var(--color-dark)] border-t border-black/[0.06] py-6 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <a href={`mailto:${footer.email}`} className="hover-target text-sm font-600 hover:opacity-60 transition-opacity">{footer.email}</a>
          <div className="flex items-center gap-4">
            <a href={footer.instagram} className="hover-target w-9 h-9 rounded-full border border-black/10 flex items-center justify-center hover:bg-[var(--color-dark)] hover:text-white hover:border-transparent transition-all duration-300">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href={footer.linkedin} className="hover-target w-9 h-9 rounded-full border border-black/10 flex items-center justify-center hover:bg-[var(--color-dark)] hover:text-white hover:border-transparent transition-all duration-300">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href={footer.whatsapp} className="hover-target w-9 h-9 rounded-full border border-black/10 flex items-center justify-center hover:bg-[#25D366] hover:text-white hover:border-transparent transition-all duration-300">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
