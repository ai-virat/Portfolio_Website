import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if ('ontouchstart' in window) return

    const dot = dotRef.current
    const ring = ringRef.current
    let mx = 0, my = 0
    let dx = 0, dy = 0, rx = 0, ry = 0

    const onMove = e => { mx = e.clientX; my = e.clientY }
    document.addEventListener('mousemove', onMove)

    const loop = () => {
      dx += (mx - dx) * 0.2
      dy += (my - dy) * 0.2
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      if (dot) dot.style.transform = `translate(${dx - 4}px, ${dy - 4}px)`
      if (ring) ring.style.transform = `translate(${rx - 20}px, ${ry - 20}px)`
      requestAnimationFrame(loop)
    }
    loop()

    const grow = () => ring && (ring.style.width = '60px', ring.style.height = '60px')
    const shrink = () => ring && (ring.style.width = '40px', ring.style.height = '40px')

    const observe = () => {
      document.querySelectorAll('a, button, .hover-target').forEach(el => {
        el.removeEventListener('mouseenter', grow)
        el.removeEventListener('mouseleave', shrink)
        el.addEventListener('mouseenter', grow)
        el.addEventListener('mouseleave', shrink)
      })
    }
    observe()
    const obs = new MutationObserver(observe)
    obs.observe(document.body, { childList: true, subtree: true })

    const hide = () => { if (dot) dot.style.opacity = '0'; if (ring) ring.style.opacity = '0' }
    const show = () => { if (dot) dot.style.opacity = '1'; if (ring) ring.style.opacity = '1' }
    document.addEventListener('mouseleave', hide)
    document.addEventListener('mouseenter', show)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', hide)
      document.removeEventListener('mouseenter', show)
      obs.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="fixed z-[9999] pointer-events-none" style={{ width: 8, height: 8, background: '#3B82F6', borderRadius: '50%', willChange: 'transform' }} />
      <div ref={ringRef} className="fixed z-[9998] pointer-events-none" style={{ width: 40, height: 40, border: '1px solid rgba(59,130,246,0.3)', borderRadius: '50%', transition: 'width 0.3s, height 0.3s', willChange: 'transform' }} />
    </>
  )
}
