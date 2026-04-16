import { useRef, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Cursor from '../components/Cursor'
import heroVideo from '../assets/Intro animation video.mp4'
import newspaperImg from '../assets/Vanshdeep/Bhaskar&toi.jpg'
import beforeImg from '../assets/before.jpg'
import afterImg from '../assets/after.jpg'
import toiImg from '../assets/Vanshdeep/TOI.jpg'
import toi2Img from '../assets/Vanshdeep/TOI2.jpg'
import np1 from '../assets/newspaper 1.jpg'
import np2 from '../assets/newspaper 2.jpg'
import np3 from '../assets/newspaper 3.jpg'
import np5 from '../assets/newspaper 5.jpg'
import np6 from '../assets/newspaper 6.jpg'
import np7 from '../assets/newspaper 7.jpg'
import npLast from '../assets/newspaper.jpg'
import visitingCardImg from '../assets/Vanshdeep/visiting card.jpg'
import bagImg from '../assets/Vanshdeep/bag.jpg'
import logoImg from '../assets/Vanshdeep/logo.png'
import smPost1 from '../assets/Vanshdeep/Social media/1.png'
import smPost2 from '../assets/Vanshdeep/Social media/2.png'
import smPost3 from '../assets/Vanshdeep/Social media/3.png'
import smPost4 from '../assets/Vanshdeep/Social media/4.png'
import smPost5 from '../assets/Vanshdeep/Social media/5.png'
import smPost6 from '../assets/Vanshdeep/Social media/6.png'
import hrd1 from '../assets/Vanshdeep/Hoarding 1/hoarding 1.jpg'
import hrd2 from '../assets/Vanshdeep/Hoarding 1/hoarding 2.jpg'
import hrd3 from '../assets/Vanshdeep/Hoarding 1/hoarding 3.jpg'
import hrd4 from '../assets/Vanshdeep/Hoarding 1/hoarding 4.jpg'
import expoCube1 from '../assets/Vanshdeep/expo/cube 1.jpg'
import expoCube2 from '../assets/Vanshdeep/expo/cube 2.jpg'
import expoFlags from '../assets/Vanshdeep/expo/event flags2.jpg'
import expoTent from '../assets/Vanshdeep/expo/tent carf.jpg'
import priceChartImg from '../assets/Vanshdeep/Price chart.jpg'

gsap.registerPlugin(ScrollTrigger)

function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(time => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)
    return () => { lenis.destroy(); gsap.ticker.remove(lenis.raf) }
  }, [])
}

function R({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const v = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.25, 1, 0.5, 1] }} className={className}>
      {children}
    </motion.div>
  )
}

const gold = '#B8963E'
const dark = '#1A1A1A'
const ivory = '#F5F0E8'

/* ─── LIGHTBOX ─── */
function Lightbox({ src, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', handleKey); document.body.style.overflow = '' }
  }, [onClose])

  return ReactDOM.createPortal(
    <div
      className="flex items-center justify-center"
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, background: 'rgba(0,0,0,0.9)' }}
      onClick={onClose}
    >
      <div style={{ position: 'relative', display: 'inline-block' }} onClick={(e) => e.stopPropagation()}>
        <img
          src={src}
          alt=""
          style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: 8, display: 'block' }}
        />
        <button
          className="flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
          style={{ position: 'absolute', top: 10, right: 10, zIndex: 10000, width: 36, height: 36, borderRadius: '50%', background: 'rgba(0,0,0,0.6)', border: 'none' }}
          onClick={onClose}
        >
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
            <path d="M2 2L16 16M16 2L2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>,
    document.body
  )
}

/* ─── BEFORE/AFTER COMPARISON SLIDER ─── */
function BeforeAfterSlider({ before, after }) {
  const containerRef = useRef(null)
  const [sliderPos, setSliderPos] = useState(50)
  const isDragging = useRef(false)

  const updatePosition = (clientX) => {
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPos(percent)
  }

  const handleMouseDown = () => { isDragging.current = true }
  const handleMouseUp = () => { isDragging.current = false }
  const handleMouseMove = (e) => { if (isDragging.current) updatePosition(e.clientX) }
  const handleTouchMove = (e) => { updatePosition(e.touches[0].clientX) }

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative rounded-2xl overflow-hidden cursor-col-resize select-none"
      onMouseDown={handleMouseDown}
      onTouchMove={handleTouchMove}
      style={{ background: '#151515' }}
    >
      {/* After image (full) */}
      <img src={after} alt="After" className="w-full block" draggable={false} />

      {/* Before image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPos}%` }}
      >
        <img
          src={before}
          alt="Before"
          className="block h-full object-cover"
          style={{ width: containerRef.current ? containerRef.current.offsetWidth : '100%', maxWidth: 'none' }}
          draggable={false}
        />
      </div>

      {/* Slider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5"
        style={{ left: `${sliderPos}%`, background: gold }}
      >
        {/* Handle */}
        <div
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: gold, left: '50%' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M5 3L2 8L5 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11 3L14 8L11 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-[10px] font-500 tracking-wider" style={{ background: 'rgba(0,0,0,0.5)', color: 'rgba(255,255,255,0.7)' }}>BEFORE</div>
      <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-[10px] font-500 tracking-wider" style={{ background: `${gold}CC`, color: '#fff' }}>AFTER</div>
    </div>
  )
}

/* ─── HOARDING SLIDER ─── */
function HoardingSlider() {
  const slides = [
    { label: 'Hoarding 1', img: hrd1 },
    { label: 'Hoarding 2', img: hrd2 },
    { label: 'Hoarding 3', img: hrd3 },
    { label: 'Hoarding 4', img: hrd4 },
  ]
  const total = slides.length
  const [pos, setPos] = useState(total)
  const realIndex = ((pos % total) + total) % total
  const isJumping = useRef(false)
  const [smooth, setSmooth] = useState(true)
  const tripled = [...slides, ...slides, ...slides]

  const prev = () => { setSmooth(true); setPos(p => p - 1) }
  const next = () => { setSmooth(true); setPos(p => p + 1) }
  const goTo = (i) => { setSmooth(true); setPos(total + i) }

  useEffect(() => {
    if (pos < 1 || pos >= total * 2 - 1) {
      const timer = setTimeout(() => {
        isJumping.current = true
        setSmooth(false)
        setPos(total + realIndex)
        requestAnimationFrame(() => { isJumping.current = false })
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [pos, realIndex, total])

  return (
    <div>
      <div className="overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #1A1A1A 0%, #1A1A1A80 30%, transparent 100%)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #1A1A1A 0%, #1A1A1A80 30%, transparent 100%)' }} />
        <motion.div
          className="flex gap-4"
          animate={{ x: `calc(-${pos} * (min(700px, 80vw) + 16px) + 50% - min(350px, 40vw))` }}
          transition={smooth ? { duration: 0.5, ease: [0.25, 1, 0.5, 1] } : { duration: 0 }}
        >
          {tripled.map((slide, i) => {
            const thisReal = i % total
            const isActive = thisReal === realIndex
            return (
              <motion.div
                key={i}
                className="shrink-0 rounded-2xl overflow-hidden cursor-pointer"
                style={{ background: '#151515', width: 'min(700px, 80vw)' }}
                animate={{ opacity: isActive ? 1 : 0.3, scale: isActive ? 1 : 0.92 }}
                transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                onMouseDown={() => goTo(thisReal)}
              >
                <img src={slide.img} alt={slide.label} className="w-full object-contain" />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
      <div className="flex items-center justify-center gap-4 mt-5">
        <button onMouseDown={prev} className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white/80 hover:border-white/25 transition-all">&#8249;</button>
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button key={i} onMouseDown={() => goTo(i)} className="h-1.5 rounded-full transition-all duration-300"
              style={{ width: realIndex === i ? 24 : 6, background: realIndex === i ? gold : 'rgba(255,255,255,0.15)' }} />
          ))}
        </div>
        <button onMouseDown={next} className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white/80 hover:border-white/25 transition-all">&#8250;</button>
      </div>
    </div>
  )
}

/* ─── SECTION LABEL ─── */
function SectionLabel({ number, text }) {
  return (
    <R>
      <div className="flex items-center gap-4 mb-10">
        <span className="text-[0.6rem] font-500 tracking-[0.3em] opacity-25">{number}</span>
        <div className="w-8 h-px bg-current opacity-15" />
        <span className="text-[0.6rem] font-500 tracking-[0.3em] opacity-40">{text}</span>
      </div>
    </R>
  )
}


/* ─── NEWSPAPER MOCKUP SLIDER (infinite seamless) ─── */
function NewspaperSlider() {
  const slides = [
    { label: 'Newspaper Ad 1', img: np1 },
    { label: 'Newspaper Ad 2', img: np2 },
    { label: 'Newspaper Ad 3', img: np3 },
    { label: 'Newspaper Ad 5', img: np5 },
    { label: 'Newspaper Ad 6', img: np6 },
    { label: 'Newspaper Ad 7', img: np7 },
    { label: 'Newspaper Ad', img: npLast },
  ]
  const total = slides.length
  // Use a continuous index that can go beyond 0..total-1
  const [pos, setPos] = useState(total) // start in middle set
  const realIndex = ((pos % total) + total) % total
  const isJumping = useRef(false)
  const [smooth, setSmooth] = useState(true)

  // Tripled for seamless buffer
  const tripled = [...slides, ...slides, ...slides]

  const prev = () => { setSmooth(true); setPos(p => p - 1) }
  const next = () => { setSmooth(true); setPos(p => p + 1) }
  const goTo = (i) => { setSmooth(true); setPos(total + i) }

  // When pos drifts too far, silently reset to middle set
  useEffect(() => {
    if (pos < 1 || pos >= total * 2 - 1) {
      const timer = setTimeout(() => {
        isJumping.current = true
        setSmooth(false)
        setPos(total + realIndex)
        // Re-enable smooth after instant jump
        requestAnimationFrame(() => {
          isJumping.current = false
        })
      }, 500) // wait for animation to finish
      return () => clearTimeout(timer)
    }
  }, [pos, realIndex, total])

  return (
    <div className="mt-6">
      <div className="overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #1A1A1A 0%, #1A1A1A80 30%, transparent 100%)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #1A1A1A 0%, #1A1A1A80 30%, transparent 100%)' }} />
        <motion.div
          className="flex gap-4"
          animate={{ x: `calc(-${pos} * (min(300px, 65vw) + 16px) + 50% - min(150px, 32.5vw))` }}
          transition={smooth ? { duration: 0.5, ease: [0.25, 1, 0.5, 1] } : { duration: 0 }}
        >
          {tripled.map((slide, i) => {
            const thisReal = i % total
            const isActive = thisReal === realIndex
            return (
              <motion.div
                key={i}
                className="shrink-0 rounded-2xl overflow-hidden cursor-pointer"
                style={{ background: '#151515', width: 'min(300px, 65vw)' }}
                animate={{
                  opacity: isActive ? 1 : 0.3,
                  scale: isActive ? 1 : 0.9,
                }}
                transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                onMouseDown={() => goTo(thisReal)}
              >
                <img src={slide.img} alt={slide.label} className="w-full object-contain" />
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-5">
        <button onMouseDown={prev} className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white/80 hover:border-white/25 transition-all">&#8249;</button>
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button key={i} onMouseDown={() => goTo(i)} className="h-1.5 rounded-full transition-all duration-300"
              style={{ width: realIndex === i ? 24 : 6, background: realIndex === i ? gold : 'rgba(255,255,255,0.15)' }} />
          ))}
        </div>
        <button onMouseDown={next} className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white/80 hover:border-white/25 transition-all">&#8250;</button>
      </div>
    </div>
  )
}

export default function VanshdeepProject() {
  useSmoothScroll()
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const [lightboxImg, setLightboxImg] = useState(null)

  const colors = [
    { name: 'Yellow', hex: '#f6ee1d', text: 'black' },
    { name: 'Black', hex: '#040707', text: 'white' },
    { name: 'White', hex: '#FFFFFF', text: 'black' },
  ]

  return (
    <div className="bg-[#FAFAF8] text-[#1A1A1A]" style={{ fontFamily: "'Google Sans', system-ui, sans-serif" }}>
      <Cursor />
      {lightboxImg && <Lightbox src={lightboxImg} onClose={() => setLightboxImg(null)} />}

      {/* ═══ NAV ═══ */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-5 flex items-center justify-between" style={{ background: 'rgba(250,250,248,0.85)', backdropFilter: 'blur(20px)' }}>
        <Link to="/" className="text-xs font-600 tracking-[0.15em] opacity-50 hover:opacity-100 transition-opacity">
          &larr; BACK
        </Link>
        <span className="text-[0.6rem] font-500 tracking-[0.3em] opacity-25">CASE STUDY</span>
      </nav>

      {/* ═══════════════════════════════════════════
           HERO
      ═══════════════════════════════════════════ */}
      <section className="min-h-screen flex flex-col justify-center relative overflow-hidden" style={{ background: `linear-gradient(180deg, ${ivory} 0%, #FAFAF8 100%)` }}>
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `linear-gradient(${dark} 1px, transparent 1px), linear-gradient(90deg, ${dark} 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 w-full pb-20 pt-10">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}>
            <p className="text-[0.6rem] font-500 tracking-[0.3em] opacity-30 mb-6">VANSHDEEP GROUP</p>
            <h1 className="font-700 leading-[0.95] tracking-tight mb-8" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
              Unified Design<br />Language System
            </h1>
            <p className="text-base md:text-lg leading-relaxed opacity-40 max-w-xl">
              Building a consistent visual identity across every touchpoint — from newspaper ads to expos, hoardings to social media.
            </p>
          </motion.div>

          <motion.div className="flex flex-wrap gap-x-10 gap-y-3 mt-14" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            {[
              { l: 'Client', v: 'Vanshdeep Group' },
              { l: 'Role', v: 'Lead Designer' },
              { l: 'Scope', v: 'Brand System' },
              { l: 'Year', v: '2024' },
            ].map((m, i) => (
              <div key={i}>
                <p className="text-[0.55rem] font-500 tracking-[0.2em] opacity-25 mb-1">{m.l}</p>
                <p className="text-sm font-500">{m.v}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
           HERO MOCKUP — full-width showcase
      ═══════════════════════════════════════════ */}
      <section style={{ background: dark }}>
        <div className="max-w-[1000px] mx-auto px-4 md:px-8 py-10 md:py-16">
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
            {/* Main hero mockup — video */}
            <div className="w-full rounded-2xl overflow-hidden" style={{ background: '#111' }}>
              <video
                src={heroVideo}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
           INTRODUCTION
      ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <SectionLabel number="01" text="INTRODUCTION" />
          <R>
            <p className="text-xl md:text-2xl font-400 leading-relaxed opacity-70">
              Vanshdeep Group is a trusted real estate brand known for quality and structural strength. As the brand scaled across multiple channels, it needed a <span className="font-600 opacity-100">consistent design language</span> to unify its presence and strengthen recall.
            </p>
          </R>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
           MOCKUP SHOWCASE — 3-up design samples
      ═══════════════════════════════════════════ */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-4">
            <R>
              <div className="rounded-2xl overflow-hidden aspect-[4/3]" style={{ background: dark }}>
                <img src={toiImg} alt="Newspaper Ad — TOI" className="w-full h-full object-cover" />
              </div>
            </R>
            <R delay={0.1}>
              <div className="rounded-2xl overflow-hidden aspect-[4/3]" style={{ background: dark }}>
                <img src={toi2Img} alt="Newspaper Ad — TOI 2" className="w-full h-full object-cover" />
              </div>
            </R>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 md:px-10"><div className="h-px bg-black/[0.06]" /></div>

      {/* ═══════════════════════════════════════════
           THE PROBLEM
      ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <SectionLabel number="02" text="THE PROBLEM" />
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <R>
              <h2 className="text-2xl md:text-3xl font-700 leading-tight">
                Fragmented visuals.<br />Weak recall.<br />No system.
              </h2>
            </R>
            <div>
              {[
                { title: 'Inconsistent Visuals', text: 'Every platform had its own look — different fonts, colors, layouts. No visual thread connecting them.' },
                { title: 'Weak Brand Recall', text: 'Without consistency, audiences couldn\'t recognize the brand at a glance across different media.' },
                { title: 'Fragmented Communication', text: 'Each piece felt like it came from a different company, diluting the brand\'s authority.' },
                { title: 'No Scalable System', text: 'Designers worked without guidelines, making every new piece a reinvention instead of an iteration.' },
              ].map((p, i) => (
                <R key={i} delay={i * 0.08}>
                  <div className="mb-6 last:mb-0">
                    <h4 className="text-sm font-600 mb-1">{p.title}</h4>
                    <p className="text-xs leading-relaxed opacity-40">{p.text}</p>
                  </div>
                </R>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
           DESIGN LANGUAGE — right after problem
      ═══════════════════════════════════════════ */}
      <section className="py-20 md:py-28" style={{ background: ivory }}>
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <SectionLabel number="03" text="DESIGN LANGUAGE" />

          <R>
            <div className="mb-16">
              <p className="text-[0.6rem] font-500 tracking-[0.3em] opacity-30 mb-8">TYPOGRAPHY · OWNERS</p>
              <div className="space-y-3">
                <div className="flex items-baseline gap-6 border-b border-black/[0.04] pb-3">
                  <span className="text-[0.55rem] tracking-wider opacity-20 min-w-[60px]">DISPLAY</span>
                  <p className="font-700 leading-none" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontFamily: "'Owners', 'Google Sans', sans-serif" }}>Vanshdeep Group</p>
                </div>
                <div className="flex items-baseline gap-6 border-b border-black/[0.04] pb-3">
                  <span className="text-[0.55rem] tracking-wider opacity-20 min-w-[60px]">HEADING</span>
                  <p className="font-600 text-lg md:text-xl opacity-60" style={{ fontFamily: "'Owners', 'Google Sans', sans-serif" }}>A way of life, built to last</p>
                </div>
                <div className="flex items-baseline gap-6 border-b border-black/[0.04] pb-3">
                  <span className="text-[0.55rem] tracking-wider opacity-20 min-w-[60px]">BODY</span>
                  <p className="font-400 text-sm opacity-40" style={{ fontFamily: "'Owners', 'Google Sans', sans-serif" }}>A way of life, built to last</p>
                </div>
                <div className="flex items-baseline gap-6">
                  <span className="text-[0.55rem] tracking-wider opacity-20 min-w-[60px]">CAPTION</span>
                  <p className="font-400 text-xs opacity-25 tracking-[0.15em]" style={{ fontFamily: "'Owners', 'Google Sans', sans-serif" }}>A WAY OF LIFE, BUILT TO LAST</p>
                </div>
              </div>
            </div>
          </R>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <R>
              <div>
                <p className="text-[0.6rem] font-500 tracking-[0.3em] opacity-30 mb-8">COLORS</p>
                <div className="flex gap-3">
                  {colors.map((c, i) => (
                    <div key={i} className="flex-1 aspect-[2/3] rounded-lg flex flex-col justify-end p-3"
                      style={{ background: c.hex, color: c.text, border: c.hex === '#FFFFFF' ? '1px solid rgba(0,0,0,0.08)' : 'none' }}>
                      <p className="text-[9px] font-500">{c.name}</p>
                      <p className="text-[8px] opacity-40">{c.hex}</p>
                    </div>
                  ))}
                </div>
              </div>
            </R>
            <R delay={0.1}>
              <div>
                <p className="text-[0.6rem] font-500 tracking-[0.3em] opacity-30 mb-8">LOGO</p>
                <div className="flex items-center justify-center">
                  <img src={logoImg} alt="Vanshdeep Group Logo" className="max-h-[240px] object-contain" />
                </div>
              </div>
            </R>
          </div>
        </div>
      </section>

      {/* ═══ BRAND COLLATERAL ═══ */}
      <section style={{ background: dark }} className="py-8 md:py-12">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10">
          <R><p className="text-[0.6rem] font-500 tracking-[0.3em] mb-4" style={{ color: `${gold}50` }}>BRAND COLLATERAL</p></R>
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            <R><div className="rounded-2xl overflow-hidden" style={{ background: '#151515' }}>
              <img src={visitingCardImg} alt="Visiting Card" className="w-full object-contain" />
            </div></R>
            <R delay={0.06}><div className="rounded-2xl overflow-hidden" style={{ background: '#151515' }}>
              <img src={bagImg} alt="Bag" className="w-full object-contain" />
            </div></R>
            <R delay={0.12}><div className="rounded-2xl overflow-hidden" style={{ background: '#151515' }}>
              <img src={priceChartImg} alt="Price Chart" className="w-full object-contain" />
            </div></R>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════
           THE SOLUTION — 3 cards in one row
      ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <SectionLabel number="04" text="THE SOLUTION" />
          <R>
            <h2 className="text-2xl md:text-3xl font-700 leading-tight mb-4 max-w-2xl">
              A unified design system built for consistency, clarity, and scale.
            </h2>
          </R>
          <R delay={0.1}>
            <p className="text-sm leading-relaxed opacity-40 max-w-xl">
              We created a comprehensive visual language — defining typography, color, grids, spacing, and reusable components — so every touchpoint speaks the same language.
            </p>
          </R>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
           MOCKUPS — Newspaper Ads (full-width, bold)
      ═══════════════════════════════════════════ */}
      <section style={{ background: dark }} className="py-4">
        <div className="max-w-[1000px] mx-auto px-4 md:px-6">
          <R><p className="text-[0.6rem] font-500 tracking-[0.3em] mb-4 px-1" style={{ color: `${gold}50` }}>NEWSPAPER ADS</p></R>
          <R><div className="rounded-2xl overflow-hidden" style={{ background: '#151515' }}>
            <img src={newspaperImg} alt="Newspaper Ad — Full Page" className="w-full object-cover" />
          </div></R>
          <NewspaperSlider />
        </div>
      </section>

      {/* ═══ MOCKUPS — Hoardings ═══ */}
      <section style={{ background: dark }} className="py-6 md:py-8">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10">
          <R><p className="text-[0.6rem] font-500 tracking-[0.3em] mb-4" style={{ color: `${gold}50` }}>HOARDINGS</p></R>
          <HoardingSlider />
        </div>
      </section>

      {/* ═══ MOCKUPS — Expo ═══ */}
      <section style={{ background: dark }} className="py-6 md:py-8">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10">
          <R><p className="text-[0.6rem] font-500 tracking-[0.3em] mb-4" style={{ color: `${gold}50` }}>EXPO</p></R>
          <div className="grid grid-cols-4 gap-2 md:gap-3">
            {[expoFlags, expoCube1, expoCube2, expoTent].map((img, i) => (
              <R key={i} delay={i * 0.05}>
                <div
                  className="rounded-xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
                  style={{ background: '#151515' }}
                  onClick={() => setLightboxImg(img)}
                >
                  <img src={img} alt={`Expo ${i + 1}`} className="w-full object-cover" />
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MOCKUPS — Social Media (Insta Grid) ═══ */}
      <section style={{ background: dark }} className="py-8 md:py-12">
        <div className="max-w-[800px] mx-auto px-6 md:px-10">
          <R><p className="text-[0.6rem] font-500 tracking-[0.3em] mb-6 md:mb-8" style={{ color: `${gold}50` }}>SOCIAL MEDIA</p></R>
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {[smPost1, smPost2, smPost3, smPost4, smPost5, smPost6].map((img, i) => (
              <R key={i} delay={i * 0.06}><div className="rounded-xl overflow-hidden" style={{ background: '#151515' }}>
                <img src={img} alt={`Social Media ${i + 1}`} className="w-full object-contain" />
              </div></R>
            ))}
          </div>
        </div>
      </section>



      {/* ═══════════════════════════════════════════
           IMPACT
      ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10 text-center">
          <SectionLabel number="05" text="IMPACT" />
          <R>
            <h2 className="text-2xl md:text-4xl font-700 leading-tight mb-16 mx-auto max-w-2xl">
              From fragmented to unified.
            </h2>
          </R>

          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { metric: 'Brand Recognition', desc: 'Stronger visual identity across all platforms and media.' },
              { metric: 'Consistent Communication', desc: 'Every touchpoint now speaks the same design language.' },
              { metric: 'Scalable System', desc: 'New formats and platforms can be added without reinventing the wheel.' },
            ].map((im, i) => (
              <R key={i} delay={i * 0.1}>
                <div className="p-6 rounded-xl border border-black/[0.06]">
                  <div className="w-2 h-2 rounded-full mx-auto mb-4" style={{ background: gold }} />
                  <h4 className="text-sm font-600 mb-2">{im.metric}</h4>
                  <p className="text-xs leading-relaxed opacity-35">{im.desc}</p>
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
           CLOSING
      ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32" style={{ background: ivory }}>
        <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
          <R>
            <p className="text-lg md:text-xl font-500 leading-relaxed opacity-50">
              "Good design is not about making things look pretty.<br />It's about making things work — consistently."
            </p>
          </R>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <section className="py-12 border-t border-black/[0.04]">
        <div className="max-w-6xl mx-auto px-6 md:px-10 flex items-center justify-between">
          <Link to="/" className="text-sm font-500 opacity-40 hover:opacity-100 transition-opacity">
            &larr; Back to Portfolio
          </Link>
          <p className="text-[0.6rem] font-500 tracking-[0.2em] opacity-20">VIRAT SINGH</p>
        </div>
      </section>
    </div>
  )
}
