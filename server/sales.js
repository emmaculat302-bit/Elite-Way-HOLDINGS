const express = require('express')
const path = require('path')
const app = express()
const DIST = path.join(__dirname, '..', 'dist')
const PORT = 5174

app.get('/', (_req, res) => res.redirect('/sales'))
app.use(express.static(DIST))
app.use((req, res, next) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') return next()
  res.sendFile(path.join(DIST, 'index.html'))
})
app.listen(PORT, '0.0.0.0', () => console.log(`Sales desk on :${PORT}`))
