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
    document.addEventListener('mousemove', onMove, { passive: true })

    const loop = () => {
      dx += (mx - dx) * 0.35
      dy += (my - dy) * 0.35
      rx += (mx - rx) * 0.2
      ry += (my - ry) * 0.2
      if (dot) dot.style.transform = `translate3d(${dx - 4}px, ${dy - 4}px, 0)`
      if (ring) ring.style.transform = `translate3d(${rx - 20}px, ${ry - 20}px, 0)`
      requestAnimationFrame(loop)
    }
    loop()

    const hide = () => { if (dot) dot.style.opacity = '0'; if (ring) ring.style.opacity = '0' }
    const show = () => { if (dot) dot.style.opacity = '1'; if (ring) ring.style.opacity = '1' }
    document.addEventListener('mouseleave', hide)
    document.addEventListener('mouseenter', show)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', hide)
      document.removeEventListener('mouseenter', show)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="fixed top-0 left-0 z-[9999] pointer-events-none" style={{ width: 8, height: 8, background: '#3B82F6', borderRadius: '50%', willChange: 'transform' }} />
      <div ref={ringRef} className="fixed top-0 left-0 z-[9998] pointer-events-none" style={{ width: 40, height: 40, border: '1px solid rgba(59,130,246,0.3)', borderRadius: '50%', willChange: 'transform' }} />
    </>
  )
}
