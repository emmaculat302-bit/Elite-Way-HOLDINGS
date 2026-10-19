import { useEffect, useRef } from 'react'

export default function Stars() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf
    const stars = []
    const n = window.innerWidth < 768 ? 40 : 55
    const link = window.innerWidth < 768 ? 95 : 125

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      canvas.style.width = '100%'
      canvas.style.height = '100%'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < n; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random(),
        r: Math.random() * 2.2 + 0.9,
        a: Math.random() * 0.35 + 0.55,
        hue: Math.random() < 0.4 ? '210, 230, 255' : Math.random() < 0.5 ? '190, 150, 255' : '255, 255, 255',
        vx: (Math.random() - 0.5) * 0.00035,
        vy: (Math.random() - 0.5) * 0.00035,
        tw: Math.random() * Math.PI * 2,
      })
    }

    const draw = (move) => {
      const w = window.innerWidth
      const h = window.innerHeight
      ctx.clearRect(0, 0, w, h)

      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = (stars[i].x - stars[j].x) * w
          const dy = (stars[i].y - stars[j].y) * h
          const d = Math.hypot(dx, dy)
          if (d < link) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(140, 170, 255, ${0.22 * (1 - d / link)})`
            ctx.lineWidth = 0.8
            ctx.moveTo(stars[i].x * w, stars[i].y * h)
            ctx.lineTo(stars[j].x * w, stars[j].y * h)
            ctx.stroke()
          }
        }
      }

      for (const st of stars) {
        if (move) {
          st.tw += 0.02
          st.x += st.vx
          st.y += st.vy
          if (st.x < 0 || st.x > 1) st.vx *= -1
          if (st.y < 0 || st.y > 1) st.vy *= -1
        }
        ctx.beginPath()
        ctx.arc(st.x * w, st.y * h, st.r, 0, Math.PI * 2)
        const a = move ? Math.min(1, st.a * (0.7 + 0.3 * Math.sin(st.tw))) : st.a
        ctx.fillStyle = `rgba(${st.hue}, ${a})`
        ctx.fill()
      }
    }

    if (reduce) {
      draw(false)
      return () => window.removeEventListener('resize', resize)
    }

    const loop = () => {
      draw(true)
      raf = requestAnimationFrame(loop)
    }
    loop()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])
  return <canvas ref={ref} id="stars-canvas" aria-hidden />
}
