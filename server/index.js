const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 5173
const DATA = path.join(__dirname, 'submissions.json')
const DIST = path.join(__dirname, '..', 'dist')

app.use(cors())
app.use(express.json())

function load() {
  try {
    return JSON.parse(fs.readFileSync(DATA, 'utf8'))
  } catch {
    return []
  }
}

function save(rows) {
  fs.writeFileSync(DATA, JSON.stringify(rows, null, 2))
}

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, company, message, type } = req.body || {}
  if (!name || !phone || !message) {
    return res.status(400).json({ ok: false, error: 'Name, WhatsApp number and message are required.' })
  }
  const row = {
    id: Date.now().toString(36),
    type: type || 'contact',
    name,
    email,
    phone: phone || '',
    company: company || '',
    message,
    to: 'emmaculat302@gmail.com',
    createdAt: new Date().toISOString(),
  }
  const rows = load()
  rows.unshift(row)
  save(rows)
  try {
    await fetch('http://127.0.0.1:5178/api/public/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name, email, phone, company,
        message, type: type || 'contact',
        need: message,
      }),
    })
  } catch { /* House down: form still saved here */ }
  res.json({ ok: true, message: 'Received. We follow up on WhatsApp. Closer card is on House.' })
})

app.post('/api/site-chat', async (req, res) => {
  try {
    const r = await fetch('http://127.0.0.1:5178/api/public/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: req.body?.message || '' }),
    })
    const d = await r.json()
    res.status(r.status).json(d)
  } catch {
    res.status(502).json({ spec: { say: 'WhatsApp 076 342 5896 — Pretoria house.' } })
  }
})

app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'eliteway-api' }))

app.use(express.static(DIST))
app.use((req, res, next) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') return next()
  if (req.path.startsWith('/api')) return next()
  res.sendFile(path.join(DIST, 'index.html'))
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Elite Way site+API on :${PORT}`)
})
