import fs from 'fs'

const buildDate = new Date().toISOString().split('T')[0]

fs.writeFileSync(
  '.buildinfo.json',
  JSON.stringify({ buildDate }, null, 2)
)