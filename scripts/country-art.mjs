#!/usr/bin/env node
// Country cards: prompts, Paper HTML and the pixel snap.
//
//   npm run countries                                  # every card: city, status, prompt
//   npm run countries -- --missing                     # only cards with no art yet
//   npm run countries -- --code JP --format urls       # bare paper-gen:// URL
//   npm run countries -- --missing --format card       # whole cards as Paper HTML, one per line
//   npm run countries -- --snap JP <url|file.png>      # snap a render to the grid and record it
//
// The loop for a new country: add it to data/countries.json → `--format card`
// → paste into write_html (≤10 images per call) → when the render is ready,
// read its URL with get_computed_styles → `--snap <code> <url>` → paste the
// <img> it prints as a write_html replace on the card's Art layer → `npm run build`.

import { readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { tmpdir } from 'node:os'
import { fileURLToPath } from 'node:url'
import { slugify } from './lib/slug.mjs'
import { GRID, countryPrompt, countryPaperGen, countryCardHtml } from './lib/place-art.mjs'
import { decodePng, encodePng, snapToGrid, upscale } from './lib/png.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const argv = process.argv.slice(2)
const flag = (n, d = null) => {
  const i = argv.indexOf(`--${n}`)
  if (i === -1) return d
  const v = argv[i + 1]
  return v && !v.startsWith('--') ? v : true
}
const readJson = (f, d = {}) => (existsSync(join(ROOT, f)) ? JSON.parse(readFileSync(join(ROOT, f), 'utf8')) : d)
const writeJson = (f, v) => writeFileSync(join(ROOT, f), JSON.stringify(v, null, 2) + '\n')

const countries = readJson('data/countries.json').countries
const places = readJson('data/places.json').places
const cityOf = (c) => places.find((p) => p.id === c.cityId)?.city ?? c.cityId
const ART = readJson('data/artwork.json')
const key = (c) => `country:${c.code}`

// --- snap ------------------------------------------------------------------
if (flag('snap')) {
  const code = String(flag('snap')).toUpperCase()
  const src = argv[argv.indexOf('--snap') + 2]
  const c = countries.find((x) => x.code === code)
  if (!c || !src) { console.error('usage: --snap <code> <url|file.png>'); process.exit(1) }
  const buf = /^https?:/.test(src) ? Buffer.from(await (await fetch(src)).arrayBuffer()) : readFileSync(src)
  const small = snapToGrid(decodePng(buf), GRID)
  const rel = `/artwork/country/${slugify(c.name)}.png`
  mkdirSync(join(ROOT, 'public', 'artwork', 'country'), { recursive: true })
  writeFileSync(join(ROOT, 'public', rel), encodePng(upscale(small, GRID.scale)))
  ART[key(c)] = rel
  writeJson('data/artwork.json', ART)
  if (/^https?:/.test(src)) { const paper = readJson('data/artwork-paper.json'); paper[`${key(c)}:source`] = src; writeJson('data/artwork-paper.json', paper) }
  // Paper cannot read ~/Documents (macOS folder protection), so a paper-asset://
  // pointing into this repo uploads nothing. Stage a copy in the temp dir.
  const staged = join(tmpdir(), 'overflow-country', `${slugify(c.name)}.png`)
  mkdirSync(dirname(staged), { recursive: true })
  copyFileSync(join(ROOT, 'public', rel), staged)
  const hex = small.palette.map(([r, g, b]) => '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')).join(' ')
  console.log(`${c.name} · ${cityOf(c)} → public${rel}  (${GRID.w}×${GRID.h} grid ×${GRID.scale}, ${small.palette.length} colours)`)
  console.log(`  ${hex}`)
  console.log(`  <img layer-name="Art · ${cityOf(c)}" src="paper-asset://${staged}" style="position:absolute;left:0;top:97px;width:215px;height:118px;object-fit:cover" />`)
  console.log('  ↑ write_html replace on the card\'s Art layer')
  process.exit(0)
}

// --- list ------------------------------------------------------------------
const CODE = flag('code')
const MISSING = !!flag('missing')
const FORMAT = flag('format', 'table')
const LIMIT = parseInt(flag('limit', '10'), 10)

let sel = countries
  .filter((c) => !CODE || c.code === String(CODE).toUpperCase())
  .filter((c) => !MISSING || !ART[key(c)])
const total = sel.length
sel = sel.slice(0, LIMIT)

for (const c of sel) {
  const city = cityOf(c)
  const url = countryPaperGen(countryPrompt(c, city))
  if (FORMAT === 'urls') console.log(url)
  else if (FORMAT === 'card') console.log(countryCardHtml(c, city, url))
  else {
    console.log(`\n${c.code}  ${c.name} · ${city}  ${ART[key(c)] ? '✓ ' + ART[key(c)] : '— no art yet'}`)
    console.log(`    ${countryPrompt(c, city)}`)
  }
}
if (FORMAT === 'table') console.log()
if (total > sel.length) console.error(`— showing ${sel.length} of ${total}. Keep each write_html call to 10 images or fewer.`)
