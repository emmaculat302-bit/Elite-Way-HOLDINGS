import { useState } from 'react'
import Shell, { Kpi, Toast } from './Shell'

export default function Business() {
  const [cash, setCash] = useState(428000)
  const [goals, setGoals] = useState([
    { name: 'Finish Wardlight for the clinic', why: 'So nurses stop using a paper book', p: 72 },
    { name: 'Keep the community above 70 NPS', why: 'Members stay if they feel seen', p: 90 },
    { name: 'SaaS that pays R80k a month', why: 'So the house is not only campaign-to-campaign', p: 44 },
  ])
  const [msg, setMsg] = useState('This is Tillhouse. Money, people, and promises on one page your partner can read.')
  const [staff] = useState(14)

  return (
    <Shell
      product="Tillhouse"
      tagline="Know if you can pay people Friday — and if the week still matches the dream."
      promise="For studios, academies and small teams who are tired of three apps and a shoebox of slips."
      accent="#f59e0b"
    >
      <p className="text-white/70 mb-5 leading-relaxed">
        Cash is not a vibe. Neither is burnout. Collect an invoice, pulse the goals, pay the team. Each button is a sentence you would say out loud.
      </p>
      <div className="grid sm:grid-cols-3 gap-3 mb-6">
        <Kpi label="In the account" value={`R${(cash / 1000).toFixed(0)}k`} hint="Enough for payroll plus a scare" />
        <Kpi label="We spend a month" value="R62k" hint="Keep this smaller than the love" />
        <Kpi label="People who trust us" value={staff} hint="Pay them like you mean the Club" />
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        <button className="btn-primary text-sm" onClick={() => {
          setCash((c) => c + 25000)
          setMsg('Embedded paid R25 000. The till just got heavier. Thank Kagiso before you spend it.')
        }}>Embedded just paid us</button>
        <button className="btn-ghost text-sm" onClick={() => {
          setGoals(goals.map((g) => ({ ...g, p: Math.min(100, g.p + 8) })))
          setMsg('Weekly pulse: every goal moved. The SaaS one still needs a client who is not us.')
        }}>How did the week treat the goals?</button>
        <button className="btn-ghost text-sm" onClick={() => setMsg(`Payroll for ${staff} people is queued. Nobody should have to chase you on Saturday.`)}>
          Pay the 14 people
        </button>
        <button className="btn-ghost text-sm" onClick={() => setMsg('Stock note: merch low, studio kit low. Reorder before the next shoot pretends it is fine.')}>
          What are we about to run out of?
        </button>
      </div>
      <Toast>{msg}</Toast>
      <div className="space-y-5">
        {goals.map((g) => (
          <div key={g.name}>
            <div className="flex justify-between gap-4 text-sm mb-1">
              <span className="font-semibold">{g.name}</span>
              <span className="text-amber-200">{g.p}%</span>
            </div>
            <p className="text-xs text-white/45 mb-2">{g.why}</p>
            <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-400 to-violet-500" style={{ width: g.p + '%' }} />
            </div>
          </div>
        ))}
      </div>
    </Shell>
  )
}
