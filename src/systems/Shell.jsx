import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function Shell({ product, tagline, promise, accent = '#5b7cff', children }) {
  return (
    <div className="pt-28 px-4 pb-16 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <Link to="/systems" className="text-sm text-white/50 inline-flex items-center gap-2 mb-5 hover:text-white">
          <ArrowLeft size={14} /> All products
        </Link>
        <div className="grid lg:grid-cols-[240px_1fr] gap-5">
          <aside className="glass p-5 h-fit">
            <div className="text-[10px] tracking-[0.25em] text-blue-300 mb-2">ELITE WAY SAAS</div>
            <h1 className="text-2xl font-black mb-2" style={{ color: accent }}>{product}</h1>
            <p className="text-sm text-white/70 leading-relaxed mb-4">{tagline}</p>
            <p className="text-xs text-white/45 leading-relaxed mb-5">{promise}</p>
            <p className="text-[11px] text-white/35 mb-4">Click anything. This is a live preview — no real data is saved.</p>
            <Link to="/contact" className="btn-primary text-xs w-full text-center block">I want this for my business</Link>
          </aside>
          <div className="glass overflow-hidden">
            <div className="h-1" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />
            <div className="p-4 md:p-6">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Kpi({ label, value, hint, good }) {
  return (
    <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4">
      <div className="text-[11px] text-white/45">{label}</div>
      <div className="text-2xl font-black mt-1 tracking-tight">{value}</div>
      {hint && <div className={`text-xs mt-1 ${good === false ? 'text-amber-300' : 'text-emerald-400'}`}>{hint}</div>}
    </div>
  )
}

export function Toast({ children }) {
  if (!children) return null
  return (
    <div className="mb-4 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
      {children}
    </div>
  )
}
