import { useState } from 'react'

export default function SiteChat() {
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')
  const [busy, setBusy] = useState(false)
  const [msgs, setMsgs] = useState([{ role: 'bot', content: 'Pretoria house. Ask about packages, proof, or how we work. WhatsApp 076 342 5896 if you want a human. I will not share internal business data.' }])

  async function send(e) {
    e?.preventDefault()
    const q = text.trim()
    if (!q || busy) return
    setText('')
    setMsgs((m) => [...m, { role: 'you', content: q }])
    setBusy(true)
    try {
      let r = await fetch('/api/site-chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: q }) })
      if (!r.ok) {
        r = await fetch('http://127.0.0.1:5178/api/public/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: q }) })
      }
      const d = await r.json()
      setMsgs((m) => [...m, { role: 'bot', content: d.spec?.say || d.error || 'WhatsApp 076 342 5896.' }])
    } catch {
      setMsgs((m) => [...m, { role: 'bot', content: 'I am offline. WhatsApp 076 342 5896.' }])
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="fixed bottom-5 left-5 z-[80]">
      {open && (
        <div className="mb-3 w-[min(92vw,360px)] rounded-2xl border border-white/15 bg-[#0a0814]/95 backdrop-blur-xl shadow-2xl overflow-hidden">
          <div className="px-4 py-3 flex justify-between items-center bg-gradient-to-r from-[#6c5ce7] to-[#2a4de0]">
            <div className="text-sm font-bold">Elite Way · ask</div>
            <button type="button" className="text-xs" onClick={() => setOpen(false)}>Close</button>
          </div>
          <div className="p-3 max-h-72 overflow-y-auto space-y-2">
            {msgs.map((m, i) => (
              <p key={i} className={'text-sm leading-relaxed px-3 py-2 rounded-xl ' + (m.role === 'you' ? 'bg-emerald-700/80 ml-6' : 'bg-white/10 mr-4')}>{m.content}</p>
            ))}
          </div>
          <form className="p-3 flex gap-2 border-t border-white/10" onSubmit={send}>
            <input className="flex-1 bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-sm" value={text} onChange={(e) => setText(e.target.value)} placeholder="Ask a public question…" />
            <button className="btn-primary text-sm" type="submit" disabled={busy}>{busy ? '…' : 'Send'}</button>
          </form>
        </div>
      )}
      <button type="button" className="h-14 w-14 rounded-full bg-[#6c5ce7] shadow-lg text-sm font-bold" onClick={() => setOpen(!open)} aria-label="Ask Elite Way">
        {open ? '×' : 'AI'}
      </button>
    </div>
  )
}
