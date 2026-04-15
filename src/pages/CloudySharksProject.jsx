import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Cursor from '../components/Cursor'
import sm1 from '../assets/Shark Slide/New 1/1.png'
import sm2 from '../assets/Shark Slide/New 1/2.png'
import sm3 from '../assets/Shark Slide/New 1/3.png'
import sm4 from '../assets/Shark Slide/New 1/4.png'
import sm5 from '../assets/Shark Slide/New 1/5.png'
import sm6 from '../assets/Shark Slide/New 1/6.png'
import heroVideo from '../assets/Shark Slide/New 1/intro.mp4'
import heroImage from '../assets/Shark Slide/New 1/hero image.png'
import problemImg from '../assets/Shark Slide/New 1/problem3.png'
import story1 from '../assets/Shark Slide/Story1.png'
import story2 from '../assets/Shark Slide/Story2.png'
import story3 from '../assets/Shark Slide/Story3.png'

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

const accent = '#7CB9E8'
const dark = '#0a0a0a'

function SectionLabel({ number, text }) {
  return (
    <R>
      <div className="flex items-center gap-4 mb-6 md:mb-10">
        <span className="text-[0.6rem] font-500 tracking-[0.3em] opacity-25">{number}</span>
        <div className="w-8 h-px bg-current opacity-15" />
        <span className="text-[0.6rem] font-500 tracking-[0.3em] opacity-40">{text}</span>
      </div>
    </R>
  )
}

export default function CloudySharksProject() {
  useSmoothScroll()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="text-[#1A1A1A]" style={{ fontFamily: "'Google Sans', system-ui, sans-serif", background: 'linear-gradient(180deg, #D6EAF8 0%, #EBF3FA 8%, #FAFAFA 20%, #FAFAFA 45%, #EBF3FA 60%, #FAFAFA 75%, #E8F2FB 90%, #D6EAF8 100%)' }}>
      <Cursor />

      {/* ═══ NAV ═══ */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-5 flex items-center justify-between" style={{ background: 'rgba(250,250,250,0.85)', backdropFilter: 'blur(20px)' }}>
        <Link to="/" className="text-xs font-600 tracking-[0.15em] opacity-50 hover:opacity-100 transition-opacity">
          &larr; BACK
        </Link>
        <span className="text-[0.6rem] font-500 tracking-[0.3em] opacity-25">CASE STUDY</span>
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="min-h-screen flex flex-col justify-center relative overflow-hidden">

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 w-full pb-20 pt-10">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}>
            <p className="text-[0.6rem] font-500 tracking-[0.3em] opacity-30 mb-6">CLOUDY SHARKS</p>
            <h1 className="font-700 leading-[0.95] tracking-tight mb-8 overflow-hidden" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
              <motion.span className="block" initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}>Lightweight feels.</motion.span>
              <motion.span className="block" initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: 0.25 }}>Cloud visuals.</motion.span>
            </h1>
            <p className="text-base md:text-lg leading-relaxed opacity-40 max-w-xl">
              Crafting a visual language around clouds and comfort — making shark slides look as light as they feel.
            </p>
          </motion.div>

          <motion.div className="flex flex-wrap gap-x-6 md:gap-x-10 gap-y-3 mt-10 md:mt-14" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            {[
              { l: 'Client', v: 'Cloudy Sharks' },
              { l: 'Role', v: 'Visual Designer' },
              { l: 'Scope', v: 'Social Media' },
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
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
            <div className="w-full rounded-2xl overflow-hidden" style={{ background: '#151515' }}>
              <video src={heroVideo} autoPlay muted loop playsInline className="w-full" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ INTRODUCTION ═══ */}
      <section className="py-14 md:py-28">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <SectionLabel number="01" text="INTRODUCTION" />
          <R>
            <p className="text-xl md:text-2xl font-400 leading-relaxed opacity-70">
              Cloudy Sharks is a lifestyle footwear brand. We worked on <span className="font-600 opacity-100">social media visuals</span> to showcase their slides in a clean and appealing way.
            </p>
          </R>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 md:px-10"><div className="h-px bg-black/[0.06]" /></div>

      {/* ═══ THE PROBLEM ═══ */}
      <section className="py-14 md:py-28 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-center">
            <div>
              <SectionLabel number="02" text="THE PROBLEM" />
              <R>
                <h2 className="text-2xl md:text-3xl font-700 leading-tight mb-3 md:mb-4">
                  Comfortable product.<br />Flat visuals.
                </h2>
              </R>
              <R delay={0.1}>
                <p className="text-sm leading-relaxed opacity-50">
                  The slides are lightweight and comfortable — but regular product photography wasn't communicating that. The visuals looked generic and didn't differentiate the brand.
                </p>
              </R>
            </div>
            <R delay={0.15}>
              <img
                src={problemImg}
                alt="The Problem"
                className="w-full md:w-[140%] md:max-w-none object-contain max-w-[320px] mx-auto md:mx-0"
              />
            </R>
          </div>
        </div>
      </section>

      {/* ═══ SOLUTION ═══ */}
      <section className="py-14 md:py-28">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <SectionLabel number="03" text="THE SOLUTION" />
          <R>
            <h2 className="text-2xl md:text-3xl font-700 leading-tight mb-3 md:mb-4 max-w-2xl">
              Clouds. Because the brand literally has "Cloudy" in the name.
            </h2>
          </R>
          <R delay={0.1}>
            <p className="text-sm leading-relaxed opacity-50 max-w-xl">
              Products placed in soft, airy, cloud-like environments to visually express comfort and weightlessness.
            </p>
          </R>
        </div>
      </section>

      {/* ═══ DARK SHOWCASE BLOCK ═══ */}
      <section style={{ background: dark }}>

        {/* Hero Image */}
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-10 md:py-16">
          <R><div className="rounded-2xl overflow-hidden" style={{ background: '#151515' }}>
            <motion.img
              src={heroImage}
              alt="Cloudy Sharks — Hero"
              className="w-full object-cover"
              style={{ transform: 'scale(1.3)' }}
              whileInView={{ scale: 1.1 }}
              viewport={{ once: false }}
              transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
            />
          </div></R>
        </div>

        {/* Impact */}
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 md:py-16">
          <R>
            <div className="flex items-center gap-4 mb-6 md:mb-10">
              <span className="text-[0.6rem] font-500 tracking-[0.3em] opacity-25" style={{ color: '#fff' }}>04</span>
              <div className="w-8 h-px opacity-15" style={{ background: '#fff' }} />
              <span className="text-[0.6rem] font-500 tracking-[0.3em] opacity-40" style={{ color: '#fff' }}>IMPACT</span>
            </div>
          </R>
          <R>
            <h2 className="text-2xl md:text-3xl font-700 leading-tight mb-3 md:mb-4 max-w-2xl" style={{ color: '#F5F5F5' }}>
              A consistent visual language that clearly communicates lightweight and comfort.
            </h2>
          </R>
          <R delay={0.1}>
            <p className="text-sm leading-relaxed max-w-xl" style={{ color: 'rgba(255,255,255,0.4)' }}>
              The brand now looks clean, modern, and scroll-stopping — every post, story, and visual feels unmistakably Cloudy Sharks.
            </p>
          </R>
        </div>

        {/* Social Media Posts */}
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 space-y-10 md:space-y-16 pb-10 md:pb-16">
          <div>
            <R><p className="text-[0.6rem] font-500 tracking-[0.3em] mb-4" style={{ color: `${accent}80` }}>SOCIAL MEDIA POSTS</p></R>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {[sm1, sm2, sm3, sm4, sm5, sm6].map((img, i) => (
                <R key={i} delay={i * 0.08}>
                  <motion.div
                    className="rounded-2xl overflow-hidden cursor-pointer"
                    style={{ background: '#151515' }}
                    whileHover={{ scale: 1.05, zIndex: 10 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <img src={img} alt={`Post ${i + 1}`} className="w-full object-contain" />
                  </motion.div>
                </R>
              ))}
            </div>
          </div>

          {/* Stories / Reels */}
          <div>
            <R><p className="text-[0.6rem] font-500 tracking-[0.3em] mb-4" style={{ color: `${accent}80` }}>STORIES / REELS</p></R>
            <div className="grid grid-cols-3 gap-2 md:gap-4">
              {[story1, story2, story3].map((img, i) => (
                <R key={i} delay={i * 0.1}>
                  <motion.div
                    className="rounded-2xl overflow-hidden cursor-pointer"
                    style={{ background: '#151515' }}
                    whileHover={{ scale: 1.04, zIndex: 10 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <img src={img} alt={`Story ${i + 1}`} className="w-full object-contain" />
                  </motion.div>
                </R>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ═══ CLOSING ═══ */}
      <section className="py-14 md:py-28">
        <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
          <R>
            <p className="text-lg md:text-xl font-500 leading-relaxed opacity-50">
              "If the product feels like walking on clouds,<br />the visuals should feel like it too."
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
