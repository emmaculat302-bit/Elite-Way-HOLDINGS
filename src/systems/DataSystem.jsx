import { useState } from 'react'
import Shell, { Kpi, Toast } from './Shell'

const start = [
  { name: 'Till — Saturday sales', plain: 'Money from the shop this weekend', rows: 18420, ok: true, note: 'Clean. Ready to use.' },
  { name: 'GDE East — 100 schools', plain: 'The school list for the app pilot', rows: 100, ok: true, note: 'Live. Teachers can log in.' },
  { name: 'Warehouse scan', plain: 'Boxes counted by the scanners', rows: 240112, ok: false, note: 'Waiting in line. Nothing is broken.' },
  { name: 'WhatsApp leads dump', plain: 'Names copied from the broadcast list', rows: 902, ok: false, note: 'We are still checking for duplicates.' },
]

export default function DataSystem() {
  const [feeds, setFeeds] = useState(start)
  const [msg, setMsg] = useState('This is Clearline. It turns messy files into one honest picture.')
  const [selected, setSelected] = useState(0)
  const live = feeds.filter((f) => f.ok).length

  return (
    <Shell
      product="Clearline"
      tagline="See if your numbers are telling the truth."
      promise="For shops, schools and studios that keep data in Excel, WhatsApp and a till that does not speak to each other."
    >
      <p className="text-white/70 mb-5 leading-relaxed">
        You do not need to know what a “pipeline” is. You need to know: did Saturday’s money land, is the school list complete, and is anything waiting? Press the buttons. Watch the story change.
      </p>
      <div className="grid sm:grid-cols-3 gap-3 mb-6">
        <Kpi label="Feeds that are healthy" value={`${live} of ${feeds.length}`} hint="Green means you can trust it" />
        <Kpi label="Rows we are holding" value="261 534" hint="Sales + schools + stock" />
        <Kpi label="Mistakes found today" value="0" hint="If this rises, we tell you in English" />
      </div>
      <div className="flex flex-wrap gap-2 mb-5">
        <button className="btn-primary text-sm" onClick={() => {
          setFeeds([{ name: 'This morning’s till', plain: 'Just uploaded from the shop', rows: 1280, ok: false, note: 'Checking… give it a breath.' }, ...feeds])
          setMsg('We took this morning’s till. Checking for empty cells and double scans.')
          setSelected(0)
        }}>Bring in this morning’s till</button>
        <button className="btn-ghost text-sm" onClick={() => {
          setFeeds(feeds.map((f) => ({ ...f, ok: true, note: 'Checked. Safe to use.' })))
          setMsg('Everything in the queue is now clean. You can send this to the accountant — or to the app.')
        }}>Finish checking everything</button>
        <button className="btn-ghost text-sm" onClick={() => setMsg('We looked for strange spikes. Saturday was busy, not broken. No panic.')}>
          Is anything weird?
        </button>
      </div>
      <Toast>{msg}</Toast>
      <div className="grid md:grid-cols-2 gap-3">
        {feeds.map((f, i) => (
          <button
            key={f.name + i}
            type="button"
            onClick={() => { setSelected(i); setMsg(`${f.name}: ${f.note}`) }}
            className={`text-left rounded-2xl border p-4 transition ${selected === i ? 'border-blue-400 bg-blue-500/10' : 'border-white/10 bg-white/[0.03] hover:border-white/25'}`}
          >
            <div className="flex justify-between items-start gap-2">
              <div>
                <div className="font-bold">{f.name}</div>
                <div className="text-sm text-white/50 mt-1">{f.plain}</div>
              </div>
              <span className={`badge ${f.ok ? 'bg-emerald-500/20 text-emerald-200' : 'bg-amber-500/20 text-amber-200'}`}>
                {f.ok ? 'Healthy' : 'In progress'}
              </span>
            </div>
            <div className="text-xs text-white/40 mt-3">{f.rows.toLocaleString()} rows · {f.note}</div>
          </button>
        ))}
      </div>
    </Shell>
  )
}
