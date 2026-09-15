#!/usr/bin/env node
// Emit ready-to-use artwork prompts for the Paper MCP image generator.
//
//   node scripts/artwork-prompts.mjs                     # everything, as a table
//   node scripts/artwork-prompts.mjs --kind album        # album covers only
//   node scripts/artwork-prompts.mjs --artist zaya-blue  # one artist's set
//   node scripts/artwork-prompts.mjs --missing           # only what has no image yet
//   node scripts/artwork-prompts.mjs --format urls       # bare paper-gen:// URLs
//   node scripts/artwork-prompts.mjs --format html       # <img> tags to paste into write_html
//   node scripts/artwork-prompts.mjs --limit 10
//
// IMPORTANT: each generated image spends the user's Paper generation usage, and
// a single write_html call authoring more than 10 images is rejected outright.
// Work in batches of <= 10; --limit defaults to 10 for exactly that reason.

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const argv = process.argv.slice(2)
const flag = (n, d = null) => {
  const i = argv.indexOf(`--${n}`)
  if (i === -1) return d
  const v = argv[i + 1]
  return v && !v.startsWith('--') ? v : true
}
const KIND = flag('kind', null)
const ARTIST = flag('artist', null)
const MISSING = !!flag('missing')
const FORMAT = flag('format', 'table')
const LIMIT = parseInt(flag('limit', '10'), 10)

// --write-back <seedKey> <path>: record a generated image so the next build ships it.
//   node scripts/artwork-prompts.mjs --write-back album:alb_bloom public/artwork/album/bloom.png
if (flag('write-back')) {
  const key = flag('write-back'); const path = argv[argv.indexOf('--write-back') + 2]
  if (!key || !path) { console.error('usage: --write-back <seedKey> <path>'); process.exit(1) }
  const f = join(ROOT, 'data', 'artwork.json')
  const map = existsSync(f) ? JSON.parse(readFileSync(f, 'utf8')) : {}
  map[key] = path
  writeFileSync(f, JSON.stringify(map, null, 2) + '\n')
  console.log(`${key} -> ${path} (run npm run build)`)
  process.exit(0)
}
if (!existsSync(join(ROOT, 'api', 'index.json'))) {
  console.error('api/ not built yet — run `npm run build` first')
  process.exit(1)
}
const api = (p) => JSON.parse(readFileSync(join(ROOT, 'api', p), 'utf8'))

const rows = []
const push = (kind, key, label, aw) => {
  if (!aw) return
  if (MISSING && aw.image) return
  rows.push({ kind, key, label, prompt: aw.prompt, url: aw.paperGen, image: aw.image })
}

for (const a of api('albums/index.json').albums) {
  if (ARTIST && a.artist?.slug !== ARTIST) continue
  push('album', a.slug, `${a.artist?.name} — ${a.title}`, api(`albums/${a.slug}.json`).artwork)
}
for (const a of api('artists/index.json').artists) {
  if (ARTIST && a.slug !== ARTIST) continue
  const full = api(`artists/${a.slug}.json`)
  push('artistPortrait', a.slug, `${a.name} (portrait)`, full.artwork.portrait)
  push('artistHero', a.slug, `${a.name} (hero)`, full.artwork.hero)
}
for (const c of api('curators/index.json').curators) {
  if (ARTIST) break
  push('curatorPortrait', c.slug, `${c.name} (curator)`, api(`curators/${c.slug}.json`).artwork.portrait)
}
for (const p of api('playlists/index.json').playlists) {
  if (ARTIST) break
  push('playlist', p.slug, `Playlist — ${p.title}`, api(`playlists/${p.slug}.json`).artwork)
}
for (const b of api('genres.json').browseCategories) {
  if (ARTIST) break
  push('genreTile', b.slug, `Browse tile — ${b.label}`, b.artwork)
}

let sel = KIND ? rows.filter((r) => r.kind === KIND) : rows
const total = sel.length
sel = sel.slice(0, LIMIT)

if (FORMAT === 'urls') {
  sel.forEach((r) => console.log(r.url))
} else if (FORMAT === 'html') {
  console.log('<!-- Paste into a write_html call. Max 10 images per call. -->')
  sel.forEach((r) => {
    const size = r.kind === 'artistHero' || r.kind === 'genreTile' ? 'width:480px;aspect-ratio:16/9' : 'width:320px;aspect-ratio:1/1'
    console.log(`<img src="${r.url}" style="${size};object-fit:cover" layer-name="${r.label.replace(/"/g, "'")}" />`)
  })
} else {
  sel.forEach((r, i) => {
    console.log(`\n${String(i + 1).padStart(2)}. [${r.kind}] ${r.label}`)
    console.log(`    ${r.prompt}`)
  })
  console.log()
}

if (total > sel.length) {
  console.error(`\n— showing ${sel.length} of ${total}. Raise with --limit, but keep each write_html call to 10 images or fewer.`)
}
