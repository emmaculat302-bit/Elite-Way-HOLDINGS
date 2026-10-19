import { useState } from 'react'
import Shell, { Kpi, Toast } from './Shell'

const stages = [
  { id: 'warm', label: 'Just met', help: 'Said hello. Not ready to buy.' },
  { id: 'talk', label: 'In conversation', help: 'They asked a real question.' },
  { id: 'offer', label: 'We sent a price', help: 'Ball is in their yard.' },
  { id: 'yes', label: 'They said yes', help: 'Invoice. Celebrate. Deliver.' },
]

const seed = [
  { who: 'Kagiso — Embedded Clothing', need: 'Wants a retainer after the 2M-view drop', money: 48000, stage: 'offer', next: 'Call Thursday. He hates email.' },
  { who: 'Haywood front desk', need: 'Member house for 400+ ink clients', money: 32000, stage: 'talk', next: 'Send the community spark one-pager.' },
  { who: 'Miggs — Foreal Academy', need: 'LMS so enrolments are not a spreadsheet', money: 76000, stage: 'warm', next: 'Watch a class. Do not pitch in the booth.' },
  { who: 'World Apps — GDE East', need: 'Rollout support after 100-school pilot', money: 210000, stage: 'yes', next: 'Kickoff with district IT. Done celebrating.' },
]

export default function CRM() {
  const [people, setPeople] = useState(seed)
  const [msg, setMsg] = useState('This is Housebook. A CRM that talks like a person, not a funnel diagram.')
  const [open, setOpen] = useState(0)

  const move = (i) => {
    const order = stages.map((s) => s.id)
    setPeople(people.map((p, idx) => {
      if (idx !== i) return p
      const n = Math.min(order.indexOf(p.stage) + 1, order.length - 1)
      return { ...p, stage: order[n], next: n === 3 ? 'Send the invoice. Then deliver.' : p.next }
    }))
    setMsg(`Moved ${people[i].who.split('—')[0].trim()} one step closer to yes.`)
  }

  return (
    <Shell
      product="Housebook"
      tagline="Remember who you promised — and what they actually need."
      promise="Built for Pretoria operators who know faces, not Salesforce fields. Community and sales in one book."
      accent="#c084fc"
    >
      <p className="text-white/70 mb-5 leading-relaxed">
        Open a card. Read the next step. Press “Move them forward” when the conversation is real. That is the whole product.
      </p>
      <div className="grid sm:grid-cols-3 gap-3 mb-6">
        <Kpi label="Money still in play" value="R366k" hint="If you do the next steps" />
        <Kpi label="People in the book" value={people.length} hint="Not leads. People." />
        <Kpi label="Already said yes" value={people.filter((p) => p.stage === 'yes').length} hint="Protect these relationships" />
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        <button className="btn-primary text-sm" onClick={() => {
          setPeople([{ who: 'You — website demo', need: 'Saw Clearline. Asked for a price.', money: 15000, stage: 'warm', next: 'WhatsApp today. Do not wait until Monday.' }, ...people])
          setOpen(0)
          setMsg('Someone used the site. They are in the book. WhatsApp them today.')
        }}>Someone just asked for a demo</button>
        <button className="btn-ghost text-sm" onClick={() => setMsg('Three-touch sequence queued: WhatsApp today, voice note tomorrow, one useful file on Friday. No spam.')}>
          Nudge everyone who is waiting
        </button>
      </div>
      <Toast>{msg}</Toast>
      <div className="grid md:grid-cols-2 gap-3">
        {people.map((p, i) => {
          const st = stages.find((s) => s.id === p.stage)
          return (
            <button key={p.who} type="button" onClick={() => setOpen(i)} className={`text-left rounded-2xl border p-4 ${open === i ? 'border-violet-400 bg-violet-500/10' : 'border-white/10 bg-white/[0.03]'}`}>
              <div className="font-bold">{p.who}</div>
              <p className="text-sm text-white/60 mt-1">{p.need}</p>
              <p className="text-blue-300 font-semibold mt-2">R{p.money.toLocaleString()}</p>
              <p className="text-xs text-violet-200 mt-2">{st.label} — {st.help}</p>
              <p className="text-sm text-white/80 mt-3">Next: {p.next}</p>
              {p.stage !== 'yes' && (
                <span
                  className="btn-ghost text-xs mt-3 inline-block"
                  onClick={(e) => { e.stopPropagation(); move(i) }}
                >Move them forward</span>
              )}
            </button>
          )
        })}
      </div>
    </Shell>
  )
}
