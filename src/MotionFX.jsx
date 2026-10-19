import { useEffect, useRef } from 'react'
import { IconWhatsApp } from './Icons'

const WA = 'https://wa.me/27763425896'

export default function MotionFX() {
  const canvasRef = useRef(null)
  const followerRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let particles = []
    let raf

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    class P {
      constructor() { this.reset() }
      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.4
        this.speedX = (Math.random() - 0.5) * 0.45
        this.speedY = (Math.random() - 0.5) * 0.45
        this.opacity = Math.random() * 0.45 + 0.08
      }
      update() {
        this.x += this.speedX
        this.y += this.speedY
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset()
      }
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(91, 124, 255, ${this.opacity})`
        ctx.fill()
      }
    }
    for (let i = 0; i < 70; i++) particles.push(new P())

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => { p.update(); p.draw() })
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.hypot(dx, dy)
          if (d < 120) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(107, 45, 255, ${0.1 * (1 - d / 120)})`
            ctx.lineWidth = 0.6
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(loop)
    }
    loop()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const follower = followerRef.current
    const dot = dotRef.current
    let mx = 0, my = 0, fx = 0, fy = 0, raf
    const move = (e) => {
      mx = e.clientX
      my = e.clientY
      if (dot) {
        dot.style.left = mx + 'px'
        dot.style.top = my + 'px'
      }
    }
    const tick = () => {
      fx += (mx - fx) * 0.15
      fy += (my - fy) * 0.15
      if (follower) {
        follower.style.left = fx + 'px'
        follower.style.top = fy + 'px'
      }
      raf = requestAnimationFrame(tick)
    }
    const grow = () => { if (follower) { follower.style.width = '42px'; follower.style.height = '42px' } }
    const shrink = () => { if (follower) { follower.style.width = '20px'; follower.style.height = '20px' } }
    document.addEventListener('mousemove', move)
    tick()
    const bind = () => {
      document.querySelectorAll('a, button, .glass').forEach((el) => {
        el.addEventListener('mouseenter', grow)
        el.addEventListener('mouseleave', shrink)
      })
    }
    bind()
    const obs = new MutationObserver(bind)
    obs.observe(document.body, { childList: true, subtree: true })
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('mousemove', move)
      obs.disconnect()
    }
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      document.querySelectorAll('.shape').forEach((shape, i) => {
        const speed = (i + 1) * 0.03
        shape.style.setProperty('--py', `${y * speed}px`)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div className="scroll-progress" id="scroll-progress" />
      <div className="noise" />
      <canvas ref={canvasRef} id="particles-canvas" />
      <div className="floating-shapes" aria-hidden>
        <div className="shape shape-1" />
        <div className="shape shape-2" />
        <div className="shape shape-3" />
        <div className="shape shape-4" />
      </div>
      <div ref={followerRef} className="cursor-follower" />
      <div ref={dotRef} className="cursor-dot" />
      <a
        href={WA}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-fab"
        aria-label="WhatsApp 076 342 5896"
        title="WhatsApp 076 342 5896"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          window.open(WA, '_blank', 'noopener,noreferrer')
        }}
      >
        <IconWhatsApp size={28} />
      </a>
    </>
  )
}

export function useTilt() {
  useEffect(() => {
    const cards = document.querySelectorAll('.tilt-card')
    const enter = function (e) {
      const rect = this.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const rx = (y - rect.height / 2) / 18
      const ry = (rect.width / 2 - x) / 18
      this.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`
    }
    const leave = function () {
      this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)'
    }
    cards.forEach((c) => {
      c.addEventListener('mousemove', enter)
      c.addEventListener('mouseleave', leave)
    })
    return () => cards.forEach((c) => {
      c.removeEventListener('mousemove', enter)
      c.removeEventListener('mouseleave', leave)
    })
  })
}

export function CountUp({ to, suffix = '', className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let started = false
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started) return
      started = true
      const target = to
      const t0 = performance.now()
      const dur = 1800
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / dur)
        const eased = 1 - Math.pow(1 - p, 3)
        el.textContent = Math.floor(eased * target) + suffix
        if (p < 1) requestAnimationFrame(tick)
        else el.textContent = target + suffix
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [to, suffix])
  return <span ref={ref} className={className}>0{suffix}</span>
}
