import { useEffect, useRef } from 'react'

export default function DrawCanvas() {
  const canvasRef = useRef(null)
  const strokes = useRef([])
  const current = useRef(null)
  const drawing = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const resize = () => { canvas.width = innerWidth; canvas.height = innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const isUI = t => t.closest('a,button,input,textarea')

    const onDown = e => {
      if (e.button !== 0 || isUI(e.target)) return
      drawing.current = true
      current.current = { pts: [{ x: e.clientX, y: e.clientY + scrollY }] }
      strokes.current.push(current.current)
    }
    const onMove = e => {
      if (!drawing.current || !current.current) return
      current.current.pts.push({ x: e.clientX, y: e.clientY + scrollY })
    }
    const onUp = () => { drawing.current = false; current.current = null }

    document.addEventListener('mousedown', onDown)
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const sy = scrollY
      strokes.current.forEach(s => {
        if (s.pts.length < 2) return
        ctx.beginPath()
        ctx.strokeStyle = '#c8a55a'
        ctx.lineWidth = 2.5
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.globalAlpha = 0.4
        const p = s.pts
        ctx.moveTo(p[0].x, p[0].y - sy)
        for (let i = 1; i < p.length - 1; i++) {
          ctx.quadraticCurveTo(p[i].x, p[i].y - sy, (p[i].x + p[i + 1].x) / 2, ((p[i].y + p[i + 1].y) / 2) - sy)
        }
        ctx.lineTo(p[p.length - 1].x, p[p.length - 1].y - sy)
        ctx.stroke()
      })
      ctx.globalAlpha = 1
      requestAnimationFrame(render)
    }
    render()

    return () => {
      window.removeEventListener('resize', resize)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-50 pointer-events-none" />
}
