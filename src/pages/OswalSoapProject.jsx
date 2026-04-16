import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Cursor from '../components/Cursor'
import logoImg from '../assets/Oswal/oswal-logo.png'
import cutoutImg from '../assets/Oswal/Anil K_ Cutout.jpg'
import hoarding1 from '../assets/Oswal/Hoarding 1.png'
import hoarding2 from '../assets/Oswal/hoarding mockup2.png'
import hoarding3 from '../assets/Oswal/hoarding mockup3.png'
import npMockup from '../assets/Oswal/Oswal newspaper ad mockup.png'
import fpDark from '../assets/Oswal/front page op3.png'
import fpLight from '../assets/Oswal/front page op4.png'
import fpSpread from '../assets/Oswal/front page op6.jpg'
import fpFolded from '../assets/Oswal/front page_folded.png'
import epaperImg from '../assets/Oswal/epaper.jpg'
import mockupsImg from '../assets/Oswal/Oswal_Mockups.png'
import heroVideo from '../assets/Oswal/Oswal Soap Group  Anil Kapoor  Advertisement - Oswal Soap (1080p, h264).mp4'

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

const crimson = '#C41E3A'
const gold = '#D4A017'
const dark = '#1A0A0A'
const ivory = '#FFF8F0'

function SectionLabel({ number, text, light }) {
  return (
    <R>
      <div className="flex items-center gap-4 mb-6 md:mb-10">
        <span className="text-[0.6rem] font-500 tracking-[0.3em] opacity-25" style={light ? { color: '#fff' } : {}}>{number}</span>
        <div className="w-8 h-px opacity-15" style={{ background: light ? '#fff' : 'currentColor' }} />
        <span className="text-[0.6rem] font-500 tracking-[0.3em] opacity-40" style={light ? { color: '#fff' } : {}}>{text}</span>
      </div>
    </R>
  )
}

function HoardingSlider() {
  const slides = [
    { label: 'City Billboard', img: hoarding1 },
    { label: 'Sunset Billboard', img: hoarding2 },
    { label: 'Highway Billboard', img: hoarding3 },
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
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-4"
          animate={{ x: `calc(-${pos} * (min(700px, 85vw) + 16px) + 50% - min(350px, 42.5vw))` }}
          transition={smooth ? { duration: 0.5, ease: [0.25, 1, 0.5, 1] } : { duration: 0 }}
        >
          {tripled.map((slide, i) => {
            const thisReal = i % total
            const isActive = thisReal === realIndex
            return (
              <motion.div
                key={i}
                className="shrink-0 rounded-2xl overflow-hidden cursor-pointer"
                style={{ background: '#151515', width: 'min(700px, 85vw)' }}
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

function VideoSection() {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.currentTime = 46
    }
  }, [])

  const handlePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (playing) {
      video.pause()
      setPlaying(false)
    } else {
      video.currentTime = 0
      video.play()
      setPlaying(true)
    }
  }

  return (
    <section style={{ background: dark }} className="py-8 md:py-16">
      <div className="max-w-[1000px] mx-auto px-6 md:px-10">
        <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
          <div
            className="w-full rounded-2xl overflow-hidden relative cursor-pointer group"
            style={{ background: '#151515' }}
            onClick={handlePlay}
          >
            <video
              ref={videoRef}
              src={heroVideo}
              playsInline
              className="w-full"
              onEnded={() => setPlaying(false)}
            />
            {/* Play/Pause overlay */}
            <div
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
              style={{ opacity: playing ? 0 : 1, background: 'rgba(0,0,0,0.3)' }}
            >
              <div
                className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{ background: crimson }}
              >
                <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
                  <path d="M22 14L2 26V2L22 14Z" fill="white" />
                </svg>
              </div>
            </div>
            {/* Pause button on hover while playing */}
            {playing && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center gap-1.5"
                  style={{ background: 'rgba(0,0,0,0.5)' }}
                >
                  <div className="w-1.5 h-6 bg-white rounded-full" />
                  <div className="w-1.5 h-6 bg-white rounded-full" />
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default function OswalSoapProject() {
  useSmoothScroll()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="text-[#1A1A1A]" style={{ fontFamily: "'Google Sans', system-ui, sans-serif", background: ivory }}>
      <Cursor />

      {/* ═══ NAV ═══ */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-5 flex items-center justify-between" style={{ background: 'rgba(255,248,240,0.85)', backdropFilter: 'blur(20px)' }}>
        <Link to="/" className="text-xs font-600 tracking-[0.15em] opacity-50 hover:opacity-100 transition-opacity">
          &larr; BACK
        </Link>
        <span className="text-[0.6rem] font-500 tracking-[0.3em] opacity-25">CASE STUDY</span>
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="min-h-screen flex flex-col justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(${dark} 1px, transparent 1px), linear-gradient(90deg, ${dark} 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 w-full pb-20 pt-10">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}>
            <p className="text-[0.6rem] font-500 tracking-[0.3em] opacity-30 mb-6">OSWAL SOAP GROUP</p>
            <h1 className="font-700 leading-[0.95] tracking-tight mb-8 overflow-hidden" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
              <motion.span className="block" initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}>70 Years of Trust.</motion.span>
              <motion.span className="block" initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: 0.25 }}>One Bold Campaign.</motion.span>
            </h1>
            <p className="text-base md:text-lg leading-relaxed opacity-40 max-w-xl">
              A gratitude-driven campaign celebrating seven decades of trust — fronted by Anil Kapoor, designed to thank every customer, dealer, and distributor.
            </p>
          </motion.div>

          <motion.div className="flex flex-wrap gap-x-6 md:gap-x-10 gap-y-3 mt-10 md:mt-14" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            {[
              { l: 'Client', v: 'Oswal Soap Group' },
              { l: 'Role', v: 'Lead Designer' },
              { l: 'Scope', v: 'Campaign Design' },
              { l: 'Year', v: '2026' },
            ].map((m, i) => (
              <div key={i}>
                <p className="text-[0.55rem] font-500 tracking-[0.2em] opacity-25 mb-1">{m.l}</p>
                <p className="text-sm font-500">{m.v}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ HERO MOCKUP — Video with Play Button ═══ */}
      <VideoSection />

      {/* ═══ INTRODUCTION ═══ */}
      <section className="py-14 md:py-28">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <SectionLabel number="01" text="INTRODUCTION" />
          <R>
            <p className="text-xl md:text-2xl font-400 leading-relaxed opacity-70 max-w-3xl">
              Oswal Soap Group — a household name since 1956. To celebrate <span className="font-600 opacity-100">70 glorious years</span>, they needed a campaign that says <span className="font-700 opacity-100" style={{ color: crimson }}>"शुक्रिया"</span> to everyone who made it possible.
            </p>
          </R>
        </div>
      </section>

      {/* ═══ MOCKUPS HERO ═══ */}
      <section className="pb-6 md:pb-10">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10">
          <R>
            <div className="rounded-2xl overflow-hidden">
              <img src={mockupsImg} alt="Oswal Soap — All Mockups" className="w-full object-cover" />
            </div>
          </R>
        </div>
      </section>

      {/* ═══ NEWSPAPER ═══ */}
      <section className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 gap-3 md:gap-4 items-stretch max-w-4xl mx-auto">
            <R className="flex">
              <div className="rounded-xl md:rounded-2xl overflow-hidden">
                <img src={epaperImg} alt="Dainik Bhaskar — Front Page Ad" className="w-full object-contain" />
              </div>
            </R>
            <R delay={0.1} className="flex">
              <div className="rounded-xl md:rounded-2xl overflow-hidden flex items-center">
                <img src={npMockup} alt="Newspaper Ad — Dainik Bhaskar" className="w-full h-full object-cover" />
              </div>
            </R>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 md:px-10"><div className="h-px bg-black/[0.06]" /></div>

      {/* ═══ THE BRIEF ═══ */}
      <section className="pt-14 pb-8 md:pt-28 md:pb-14">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <SectionLabel number="02" text="THE BRIEF" />
          <R>
            <h2 className="text-2xl md:text-3xl font-700 leading-tight mb-8 md:mb-10">
              Celebrate legacy. Thank the people.
            </h2>
          </R>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { title: 'Celebrate 70 Years', text: 'Bold, milestone-driven campaign.' },
              { title: 'Express Gratitude', text: '"शुक्रिया" to customers & dealers.' },
              { title: 'Celebrity Power', text: 'Anil Kapoor as the face.' },
              { title: 'Multi-Format Hoardings', text: '4–5 sizes for city-wide reach.' },
              { title: 'Reinforce Tagline', text: '"Har Rishte Ka Rakhe Khyal"' },
            ].map((p, i) => (
              <R key={i} delay={i * 0.05}>
                <h4 className="text-xs font-600 mb-1">{p.title}</h4>
                <p className="text-[11px] leading-relaxed opacity-40">{p.text}</p>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ THE SOLUTION ═══ */}
      <section className="pt-8 pb-14 md:pt-14 md:pb-28" style={{ background: '#FAFAF8' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <SectionLabel number="03" text="THE SOLUTION" />
          <R>
            <h2 className="text-2xl md:text-3xl font-700 leading-tight mb-3 md:mb-4 max-w-2xl">
              A <span style={{ color: crimson }}>"शुक्रिया"</span> campaign —<br />bold, emotional, and unmissable.
            </h2>
          </R>
          <R delay={0.1}>
            <p className="text-sm leading-relaxed opacity-50 max-w-xl">
              Front-page takeovers in Dainik Bhaskar, multi-format hoardings, and Anil Kapoor's cutout — all unified by the golden "70 years" visual and the brand's signature red.
            </p>
          </R>
        </div>
      </section>

      {/* ═══ DARK SHOWCASE BLOCK ═══ */}
      <section style={{ background: dark }}>

        {/* Newspaper Mockups */}
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 pt-12 md:pt-16">
          <R><p className="text-[0.6rem] font-500 tracking-[0.3em] mb-4" style={{ color: `${gold}80` }}>NEWSPAPER ADS</p></R>
          <div className="grid md:grid-cols-[1fr_1fr] gap-4">
            <div className="space-y-4">
              <R>
                <div className="rounded-2xl overflow-hidden" style={{ background: '#151515' }}>
                  <img src={fpLight} alt="Front Page — Light" className="w-full object-cover" />
                </div>
              </R>
              <R delay={0.06}>
                <div className="rounded-2xl overflow-hidden" style={{ background: '#151515' }}>
                  <img src={fpSpread} alt="Front Page — Spread" className="w-full object-cover" />
                </div>
              </R>
            </div>
            <R delay={0.1}>
              <div className="rounded-2xl overflow-hidden h-full" style={{ background: crimson }}>
                <img src={cutoutImg} alt="Anil Kapoor — Brand Cutout" className="w-full h-full object-cover" />
              </div>
            </R>
          </div>
        </div>

        {/* Hoardings */}
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-6 md:py-8">
          <R><p className="text-[0.6rem] font-500 tracking-[0.3em] mb-4" style={{ color: `${gold}80` }}>HOARDINGS</p></R>
          <HoardingSlider />
        </div>

        {/* Impact */}
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 md:py-16">
          <SectionLabel number="04" text="IMPACT" light />
          <R>
            <h2 className="text-2xl md:text-3xl font-700 leading-tight mb-3 md:mb-4 max-w-2xl" style={{ color: '#F5F5F5' }}>
              A campaign that turned gratitude<br />into brand power.
            </h2>
          </R>
          <R delay={0.1}>
            <p className="text-sm leading-relaxed max-w-xl" style={{ color: 'rgba(255,255,255,0.4)' }}>
              The "शुक्रिया" campaign gave Oswal Soap its most visible moment in 70 years — reinforcing trust across every touchpoint.
            </p>
          </R>
        </div>

      </section>

      {/* ═══ CLOSING ═══ */}
      <section className="py-14 md:py-28">
        <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
          <R>
            <p className="text-lg md:text-xl font-500 leading-relaxed opacity-50">
              "70 years is not just a number.<br />It's every household that chose to trust."
            </p>
          </R>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <section className="py-10 border-t border-black/[0.04]">
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
