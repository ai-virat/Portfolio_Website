import { useRef, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Cursor from '../components/Cursor'
import img1 from '../assets/Rajasthan Royals/Final/1.png'
import img2 from '../assets/Rajasthan Royals/Final/ 2.jpg'
import img3 from '../assets/Rajasthan Royals/Final/3.jpg'
import img4 from '../assets/Rajasthan Royals/Final/4.png'
import img5 from '../assets/Rajasthan Royals/Final/5.jpg'
import img6 from '../assets/Rajasthan Royals/Final/6.png'
import img7 from '../assets/Rajasthan Royals/Final/7.jpg'
import img8 from '../assets/Rajasthan Royals/Final/8.png'
import img9 from '../assets/Rajasthan Royals/Final/9.png'
import img10 from '../assets/Rajasthan Royals/Final/10.jpg'
import img11 from '../assets/Rajasthan Royals/Final/11.jpg'
import img12 from '../assets/Rajasthan Royals/Final/12.jpg'

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

const pink = '#E91E8C'
const royal = '#2D1B69'
const dark = '#0a0a0a'

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

export default function RajasthanRoyalsProject() {
  useSmoothScroll()
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const [lightboxImg, setLightboxImg] = useState(null)

  return (
    <div className="text-[#1A1A1A]" style={{ fontFamily: "'Google Sans', system-ui, sans-serif", background: '#FAFAFA' }}>
      <Cursor />
      {lightboxImg && <Lightbox src={lightboxImg} onClose={() => setLightboxImg(null)} />}

      {/* ═══ NAV ═══ */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-5 flex items-center justify-between" style={{ background: 'rgba(250,250,250,0.85)', backdropFilter: 'blur(20px)' }}>
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
            <p className="text-[0.6rem] font-500 tracking-[0.3em] opacity-30 mb-6">RAJASTHAN ROYALS</p>
            <h1 className="font-700 leading-[0.95] tracking-tight mb-8 overflow-hidden" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
              <motion.span className="block" initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}>Heritage meets cricket.</motion.span>
              <motion.span className="block" initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: 0.25 }}>Halla Bol.</motion.span>
            </h1>
            <p className="text-base md:text-lg leading-relaxed opacity-40 max-w-xl">
              Designing the 2024 team jersey and stadium experience rooted in Rajasthani heritage — Bandhani prints, Kaalbeliya dance, and Hathkargha traditions woven into every touchpoint.
            </p>
          </motion.div>

          <motion.div className="flex flex-wrap gap-x-6 md:gap-x-10 gap-y-3 mt-10 md:mt-14" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            {[
              { l: 'Client', v: 'Rajasthan Royals' },
              { l: 'Role', v: 'Design Lead' },
              { l: 'Scope', v: 'Jersey + Match Day' },
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

      {/* ═══ HERO MOCKUP ═══ */}
      <section style={{ background: dark }} className="py-8 md:py-16">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10">
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
            <div className="rounded-2xl overflow-hidden" style={{ background: '#151515' }}>
              <img src={img3} alt="Halla Bol — Stadium Welcome" className="w-full object-cover" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ INTRODUCTION ═══ */}
      <section className="py-14 md:py-28">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <SectionLabel number="01" text="INTRODUCTION" />
          <R>
            <p className="text-xl md:text-2xl font-400 leading-relaxed opacity-70 max-w-3xl">
              Rajasthan Royals needed their 2024 jersey to go beyond sport — a <span className="font-600 opacity-100">cultural tribute to Rajasthan</span>. We wove the state's rich textile heritage into the team's identity, from jersey patterns to match-day experiences.
            </p>
          </R>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 md:px-10"><div className="h-px bg-black/[0.06]" /></div>

      {/* ═══ THE BRIEF ═══ */}
      <section className="pt-14 pb-8 md:pt-28 md:pb-14">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <SectionLabel number="02" text="THE BRIEF" />
          <R>
            <h2 className="text-2xl md:text-3xl font-700 leading-tight mb-8 md:mb-10">
              Not just a jersey. A cultural statement.
            </h2>
          </R>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { title: 'Bandhani Print', text: 'Heritage tie-dye patterns on the jersey fabric.' },
              { title: 'Kaalbeliya Dance', text: 'Pattern inspired by the iconic dance form.' },
              { title: 'Hathkargha Craft', text: 'Handloom traditions of Rajasthan.' },
              { title: 'Match-Day Design', text: 'Stadium banners, fan cards, signage.' },
              { title: 'Brand Merchandise', text: 'Calendars, keychains, collectibles.' },
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
      <section className="pt-8 pb-14 md:pt-14 md:pb-28" style={{ background: '#F5F5F5' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <SectionLabel number="03" text="THE SOLUTION" />
          <R>
            <h2 className="text-2xl md:text-3xl font-700 leading-tight mb-3 md:mb-4 max-w-2xl">
              Rajasthan's soul, stitched into<br />every thread and touchpoint.
            </h2>
          </R>
          <R delay={0.1}>
            <p className="text-sm leading-relaxed opacity-50 max-w-xl">
              The jersey pattern draws from Kaalbeliya outfits and Bandhani textiles. The same cultural DNA extends to stadium banners, fan placards, and branded merchandise — creating a unified match-day identity.
            </p>
          </R>
        </div>
      </section>

      {/* ═══ DARK SHOWCASE ═══ */}
      <section style={{ background: dark }}>
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-12 md:py-16 space-y-8 md:space-y-12">

          {/* Stadium Banners — 2 col, square */}
          <div>
            <R><p className="text-[0.6rem] font-500 tracking-[0.3em] mb-4" style={{ color: `${pink}80` }}>STADIUM BANNERS</p></R>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {[img1, img2].map((img, i) => (
                <R key={i} delay={i * 0.06}>
                  <div className="rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform duration-300 aspect-square" style={{ background: '#151515' }} onClick={() => setLightboxImg(img)}>
                    <img src={img} alt={`Stadium Banner ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                </R>
              ))}
            </div>
          </div>

          {/* Match-Day Standees — 3 col, square */}
          <div>
            <R><p className="text-[0.6rem] font-500 tracking-[0.3em] mb-4" style={{ color: `${pink}80` }}>MATCH-DAY STANDEES</p></R>
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              {[img8, img9, img10].map((img, i) => (
                <R key={i} delay={i * 0.05}>
                  <div className="rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform duration-300 aspect-square" style={{ background: '#151515' }} onClick={() => setLightboxImg(img)}>
                    <img src={img} alt={`Standee ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                </R>
              ))}
            </div>
          </div>

          {/* Fan Cards — 2x2, square */}
          <div>
            <R><p className="text-[0.6rem] font-500 tracking-[0.3em] mb-4" style={{ color: `${pink}80` }}>FAN CARDS</p></R>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {[img4, img5, img6, img7].map((img, i) => (
                <R key={i} delay={i * 0.05}>
                  <div className="rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform duration-300 aspect-square" style={{ background: '#151515' }} onClick={() => setLightboxImg(img)}>
                    <img src={img} alt={`Fan Card ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                </R>
              ))}
            </div>
          </div>

          {/* Merchandise — 2 col, landscape */}
          <div>
            <R><p className="text-[0.6rem] font-500 tracking-[0.3em] mb-4" style={{ color: `${pink}80` }}>MERCHANDISE</p></R>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {[img11, img12].map((img, i) => (
                <R key={i} delay={i * 0.06}>
                  <div className="rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform duration-300 aspect-[4/3]" style={{ background: '#151515' }} onClick={() => setLightboxImg(img)}>
                    <img src={img} alt={`Merchandise ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                </R>
              ))}
            </div>
          </div>

        </div>

        {/* Impact */}
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 md:py-16">
          <SectionLabel number="04" text="IMPACT" light />
          <R>
            <h2 className="text-2xl md:text-3xl font-700 leading-tight mb-3 md:mb-4 max-w-2xl" style={{ color: '#F5F5F5' }}>
              A jersey that became a<br />cultural conversation.
            </h2>
          </R>
          <R delay={0.1}>
            <p className="text-sm leading-relaxed max-w-xl" style={{ color: 'rgba(255,255,255,0.4)' }}>
              The Bandhani-inspired design turned heads across IPL stadiums — fans wore heritage, not just a jersey. Every match-day touchpoint echoed Rajasthan's soul.
            </p>
          </R>
        </div>

      </section>

      {/* ═══ CLOSING ═══ */}
      <section className="py-14 md:py-28">
        <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
          <R>
            <p className="text-lg md:text-xl font-500 leading-relaxed opacity-50">
              "When culture meets sport,<br />every stitch tells a story."
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
