#!/usr/bin/env node
// Check catalogue names against MusicBrainz to make sure they are NOT real.
//
//   node scripts/check-names.mjs                 # artists only
//   node scripts/check-names.mjs --albums        # also check release titles
//   node scripts/check-names.mjs --authored      # only hand-authored entries
//   node scripts/check-names.mjs --write         # append hits to the blocklist
//
// Why MusicBrainz: its core dataset is CC0 public domain, it has a free
// documented web service, and here it is used purely as a NEGATIVE filter —
// we are not importing any of its data into the product, only asking "does
// this invented name already belong to somebody?". That is the one use of a
// real music database that carries no licensing question at all.
//
// The service asks for a descriptive User-Agent and one request per second.
// Both are honoured below. Run it before shipping, not on every build.

import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const argv = process.argv.slice(2)
const CHECK_ALBUMS = argv.includes('--albums')
const ONLY_AUTHORED = argv.includes('--authored')
const WRITE = argv.includes('--write')

const UA = 'Kraft-FictionalCatalogue/0.1 (design demo; negative name check)'
const BASE = 'https://musicbrainz.org/ws/2'

const load = (f) => JSON.parse(readFileSync(join(ROOT, 'data', f), 'utf8'))
const clean = (a) => a.filter((x) => x && x.id)
let artists = clean(load('artists.json').artists)
let albums = clean(load('albums.json').albums)
if (ONLY_AUTHORED) {
  artists = artists.filter((a) => a.origin === 'authored')
  albums = albums.filter((a) => a.origin === 'authored')
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function query(entity, name) {
  const url = `${BASE}/${entity}?query=${encodeURIComponent(`"${name}"`)}&fmt=json&limit=5`
  const res = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'application/json' } })
  if (res.status === 503) { await sleep(2000); return query(entity, name) }
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return res.json()
}

const norm = (s) => String(s).toLowerCase().replace(/^the\s+/, '').replace(/[^a-z0-9]/g, '')
const hits = { artists: [], albums: [] }

async function run(list, entity, key, bucket) {
  for (const item of list) {
    const name = item[key]
    try {
      const json = await query(entity, name)
      const results = json[entity === 'artist' ? 'artists' : 'releases'] ?? []
      const exact = results.filter((r) => norm(r.title ?? r.name) === norm(name))
      if (exact.length) {
        const top = exact[0]
        const detail = entity === 'artist'
          ? [top.disambiguation, top.country, top['life-span']?.begin].filter(Boolean).join(' · ')
          : [top['artist-credit']?.[0]?.name, top.date].filter(Boolean).join(' · ')
        // MusicBrainz scores 0-100; a 100 on an exact string is a real match.
        const score = top.score ?? 0
        const sev = score >= 90 ? 'HIT ' : 'weak'
        console.log(`  ${sev} ${name}${detail ? `  — ${detail}` : ''}`)
        if (score >= 90) bucket.push(name)
      } else {
        console.log(`  ok   ${name}`)
      }
    } catch (e) {
      console.log(`  ??   ${name}  (lookup failed: ${e.message})`)
    }
    await sleep(1100) // MusicBrainz rate limit: 1 req/sec
  }
}

console.log(`\nChecking ${artists.length} artist names against MusicBrainz…`)
console.log('(this is a negative check — a HIT means the name is already taken)\n')
await run(artists, 'artist', 'name', hits.artists)

if (CHECK_ALBUMS) {
  console.log(`\nChecking ${albums.length} release titles…\n`)
  await run(albums, 'release', 'title', hits.albums)
}

console.log(`\n${hits.artists.length} artist collisions, ${hits.albums.length} release collisions`)

if (WRITE && (hits.artists.length || hits.albums.length)) {
  const path = join(ROOT, 'data', 'real-world-blocklist.json')
  const bl = JSON.parse(readFileSync(path, 'utf8'))
  const merge = (arr, add) => [...new Set([...arr, ...add])].sort()
  bl.artists = merge(bl.artists, hits.artists)
  bl.albums = merge(bl.albums, hits.albums)
  writeFileSync(path, JSON.stringify(bl, null, 2) + '\n')
  console.log(`blocklist updated — run \`npm run validate\` to see the new findings`)
} else if (hits.artists.length || hits.albums.length) {
  console.log('re-run with --write to add these to data/real-world-blocklist.json')
}
