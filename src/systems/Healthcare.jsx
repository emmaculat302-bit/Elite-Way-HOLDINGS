import { useState } from 'react'
import Shell, { Kpi, Toast } from './Shell'

const seed = [
  { name: 'Thandi M.', where: 'Ward A3 · bed 12', feel: 'Stable', wait: 'Seen', note: 'Pain managed. Family in the passage.' },
  { name: 'Johan K.', where: 'ICU · bed 2', feel: 'Watch closely', wait: 'In care', note: 'Vitals every 15 minutes. Do not skip.' },
  { name: 'Lerato P.', where: 'Ward A1 · bed 7', feel: 'Stable', wait: 'Seen', note: 'Waiting on pharmacy. Cheerful.' },
  { name: 'Amira S.', where: 'Paeds · bed 4', feel: 'Getting better', wait: 'Seen', note: 'Mom is here. Discharge likely tomorrow.' },
]

const color = {
  Stable: 'bg-emerald-500/20 text-emerald-200',
  'Watch closely': 'bg-rose-500/25 text-rose-200',
  'Getting better': 'bg-sky-500/20 text-sky-200',
  Waiting: 'bg-amber-500/20 text-amber-200',
}

export default function Healthcare() {
  const [board, setBoard] = useState(seed)
  const [msg, setMsg] = useState('This is Wardlight. A clinic board a nurse can read from the door.')
  const watching = board.filter((p) => p.feel === 'Watch closely').length

  return (
    <Shell
      product="Wardlight"
      tagline="Who is in the building, how they feel, what to do next."
      promise="For small clinics and wards that still run on a whiteboard and a tired WhatsApp group."
      accent="#22d3ee"
    >
      <p className="text-white/70 mb-5 leading-relaxed">
        No codes. No “encounters”. Names, beds, and a colour you can see from two metres. Tap a person. Admit a walk-in. Finish a round.
      </p>
      <div className="grid sm:grid-cols-3 gap-3 mb-6">
        <Kpi label="People in our care" value={board.length} hint="Everyone on this screen is real in the story" />
        <Kpi label="Need eyes now" value={watching} hint={watching ? 'Start with ICU' : 'Quiet shift'} good={!watching} />
        <Kpi label="Door-to-nurse" value="11 min" hint="Four minutes faster than last week" />
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        <button className="btn-primary text-sm" onClick={() => {
          setBoard([{ name: 'Walk-in · not named yet', where: 'Triage chair', feel: 'Waiting', wait: 'Just arrived', note: 'Take vitals. Ask who came with them.' }, ...board])
          setMsg('A walk-in is on the board. Triage before you make tea.')
        }}>A walk-in just arrived</button>
        <button className="btn-ghost text-sm" onClick={() => {
          setBoard(board.map((p) => p.where.includes('ICU') ? { ...p, feel: 'Stable', note: 'Round done. Still in ICU. Breathing easier.' } : p))
          setMsg('ICU round is written. Johan is stable. Do not delete the watch — just lower it.')
        }}>We finished the ICU round</button>
        <button className="btn-ghost text-sm" onClick={() => setMsg('Discharge pack for Amira: meds list, follow-up Tuesday, mom’s number on the front. (Preview — no PDF leaves this demo.)')}>
          Send Amira home with a pack
        </button>
      </div>
      <Toast>{msg}</Toast>
      <div className="grid sm:grid-cols-2 gap-3">
        {board.map((p) => (
          <div key={p.name} className="rounded-2xl border border-white/10 p-4 bg-white/[0.03]">
            <div className="flex justify-between gap-2">
              <div className="font-bold text-lg">{p.name}</div>
              <span className={`badge ${color[p.feel] || 'bg-white/10'}`}>{p.feel}</span>
            </div>
            <div className="text-sm text-cyan-200 mt-1">{p.where}</div>
            <p className="text-sm text-white/70 mt-3 leading-relaxed">{p.note}</p>
          </div>
        ))}
      </div>
    </Shell>
  )
}
