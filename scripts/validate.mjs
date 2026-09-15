#!/usr/bin/env node
// Quality gate for the catalogue.
//
//   node scripts/validate.mjs            # report
//   node scripts/validate.mjs --strict   # exit 1 on any error
//
// Four classes of check:
//   integrity — broken references, duplicates, missing fields
//   realism   — numbers that contradict the brand or each other
//   legal     — names that collide with real acts, releases or brands
//   design    — drift between the API and what the Paper file currently shows

import { readFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { CANON, DURATION_BY_GENRE, ARTIST_TIERS } from './lib/canon.mjs'
import { slugify } from './lib/slug.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const load = (f) => JSON.parse(readFileSync(join(ROOT, 'data', f), 'utf8'))
const clean = (a) => a.filter((x) => x && x.id)

const genres = load('genres.json').genres
const labels = load('labels.json').labels
const curators = load('curators.json')
const artists = clean(load('artists.json').artists)
const albums = clean(load('albums.json').albums)
const tracks = clean(load('tracks.json').tracks)
const playlists = clean(load('playlists.json').playlists)
const users = clean(load('users.json').users)
const block = load('real-world-blocklist.json')
const places = load('places.json').places
const sceneRows = load('scenes.json').scenes
const listening = load('listening.json').listening

const findings = []
const add = (severity, cls, message, detail = null) =>
  findings.push({ severity, cls, message, detail })

const gSet = new Set(genres.map((g) => g.slug))
const aSet = new Set(artists.map((a) => a.id))
const alSet = new Set(albums.map((a) => a.id))
const tSet = new Set(tracks.map((t) => t.id))
const lSet = new Set(labels.map((l) => l.id))
const cSet = new Set(curators.curators.map((c) => c.id))

// --- integrity -------------------------------------------------------------
const dupe = (arr, key, label) => {
  const seen = new Map()
  arr.forEach((x) => {
    const k = String(x[key]).toLowerCase()
    if (seen.has(k)) add('error', 'integrity', `duplicate ${label} ${key}: "${x[key]}"`, `${seen.get(k)} and ${x.id}`)
    else seen.set(k, x.id)
  })
}
dupe(artists, 'id', 'artist'); dupe(artists, 'name', 'artist')
dupe(albums, 'id', 'album'); dupe(tracks, 'id', 'track'); dupe(playlists, 'id', 'playlist')
dupe(places, 'id', 'place'); dupe(listening, 'id', 'listening')

// --- geography: every placeId resolves, every coordinate is on the planet ---
const pSet = new Set(places.map((p) => p.id))
const listSet = new Set(playlists.map((p) => p.id))
places.forEach((p) => {
  if (typeof p.lat !== 'number' || typeof p.lng !== 'number' || Math.abs(p.lat) > 90 || Math.abs(p.lng) > 180) add('error', 'integrity', `place ${p.id} has an impossible coordinate`, `${p.lat}, ${p.lng}`)
  if (!/^[A-Z]{2}$/.test(p.country ?? '')) add('error', 'integrity', `place ${p.id} needs an ISO country code`, p.country)
})
curators.curators.forEach((c) => { if (!pSet.has(c.placeId)) add('error', 'integrity', `curator ${c.id} has no place`, c.city) })
sceneRows.forEach((s) => { if (!pSet.has(s.placeId)) add('error', 'integrity', `scene ${s.id} has no place`, s.city) })
artists.forEach((a) => { if (a.placeId && !pSet.has(a.placeId)) add('error', 'integrity', `artist ${a.id} points at an unknown place`, a.placeId) })
listening.forEach((l) => {
  if (!pSet.has(l.placeId)) add('error', 'integrity', `listening ${l.id} has no place`, l.placeId)
  if (!tSet.has(l.trackId)) add('error', 'integrity', `listening ${l.id} plays an unknown track`, l.trackId)
  if (l.playlistId && !listSet.has(l.playlistId)) add('error', 'integrity', `listening ${l.id} names an unknown list`, l.playlistId)
  if (l.kind === 'curator' && !cSet.has(l.curatorId)) add('error', 'integrity', `listening ${l.id} names an unknown curator`, l.curatorId)
  if (l.kind === 'curator') { const c = curators.curators.find((x) => x.id === l.curatorId); if (c && c.placeId !== l.placeId) add('warn', 'realism', `curator ${c.id} is listening away from home`, `${l.placeId} vs ${c.placeId}`) }
})
if (listening.length > 200) add('warn', 'realism', 'listening.json is a sample, not a census — keep it under 200 points', String(listening.length))

const slugs = new Map()
artists.forEach((a) => {
  const s = slugify(a.name)
  if (!s) add('error', 'integrity', `artist "${a.name}" produces an empty slug`, a.id)
  if (slugs.has(s)) add('error', 'integrity', `slug collision "${s}"`, `${slugs.get(s)} and ${a.id}`)
  slugs.set(s, a.id)
})

// Album and playlist slugs are URLs too. Missing this check let 82 albums
// silently overwrite each other onto 31 files.
const albumSlugSeen = new Map()
albums.forEach((al) => {
  const artistName = artists.find((x) => x.id === al.artistId)?.name ?? '?'
  const s = slugify(al.title)
  if (albumSlugSeen.has(s)) {
    add('warn', 'integrity', `album title "${al.title}" is used by more than one artist`,
      `${albumSlugSeen.get(s)} and ${artistName} — build disambiguates the URL, but check it is intentional`)
  } else albumSlugSeen.set(s, artistName)
})
const plSlugSeen = new Set()
playlists.forEach((p) => {
  const s = slugify(p.title)
  if (plSlugSeen.has(s)) add('error', 'integrity', `duplicate playlist slug "${s}"`, p.id)
  plSlugSeen.add(s)
})

artists.forEach((a) => {
  a.genres.forEach((g) => { if (!gSet.has(g)) add('error', 'integrity', `artist "${a.name}" has unknown genre "${g}"`, a.id) })
  if (a.labelId && !lSet.has(a.labelId)) add('error', 'integrity', `artist "${a.name}" has unknown label "${a.labelId}"`, a.id)
  if (!ARTIST_TIERS.some((t) => t.tier === a.tier)) add('error', 'integrity', `artist "${a.name}" has unknown tier "${a.tier}"`, a.id)
})
albums.forEach((al) => {
  if (!aSet.has(al.artistId)) add('error', 'integrity', `album "${al.title}" references missing artist ${al.artistId}`, al.id)
  if (al.labelId && !lSet.has(al.labelId)) add('error', 'integrity', `album "${al.title}" has unknown label "${al.labelId}"`, al.id)
})
tracks.forEach((t) => {
  if (!alSet.has(t.albumId)) add('error', 'integrity', `track "${t.title}" references missing album ${t.albumId}`, t.id)
  if (!aSet.has(t.artistId)) add('error', 'integrity', `track "${t.title}" references missing artist ${t.artistId}`, t.id)
})
playlists.forEach((p) => {
  if (p.curatorId && !cSet.has(p.curatorId)) add('error', 'integrity', `playlist "${p.title}" has unknown curator ${p.curatorId}`, p.id)
  ;(p.trackIds ?? []).forEach((id) => { if (!tSet.has(id)) add('error', 'integrity', `playlist "${p.title}" references missing track ${id}`, p.id) })
})
users.forEach((u) => {
  const check = (ids, set, what) => (ids ?? []).forEach((id) => { if (!set.has(id)) add('error', 'integrity', `user library references missing ${what} ${id}`, u.id) })
  check(u.library?.playlistIds, new Set(playlists.map((p) => p.id)), 'playlist')
  check(u.library?.albumIds, alSet, 'album')
  check(u.library?.artistIds, aSet, 'artist')
  if (u.player?.trackId && !tSet.has(u.player.trackId)) add('error', 'integrity', `player references missing track ${u.player.trackId}`, u.id)
})

// --- realism ---------------------------------------------------------------
const topListeners = Math.max(...artists.map((a) => a.monthlyListeners ?? 0))
if (topListeners > CANON.monthlyActive * 0.35) {
  add('error', 'realism',
    `top artist has ${topListeners.toLocaleString()} monthly listeners on a service with ${CANON.monthlyActive.toLocaleString()} monthly actives`,
    'more than a third of the entire userbase listening to one artist is not credible')
}
artists.forEach((a) => {
  if (a.monthlyListeners > CANON.subscribers) add('error', 'realism', `"${a.name}" has more monthly listeners than Kraft has subscribers`, a.id)
  if (a.followers > a.monthlyListeners) add('warn', 'realism', `"${a.name}" has more followers than monthly listeners`, a.id)
  if (a.active?.to && a.active.to > CANON.currentYear) add('error', 'realism', `"${a.name}" is active until ${a.active.to}, which is in the future`, a.id)
  if (a.active?.from && a.active.to && a.active.from > a.active.to) add('error', 'realism', `"${a.name}" has from > to`, a.id)
})
albums.forEach((al) => {
  if (al.year > CANON.currentYear) add('error', 'realism', `album "${al.title}" is dated ${al.year}, in the future`, al.id)
  const ar = artists.find((x) => x.id === al.artistId)
  if (ar?.active?.from && al.year < ar.active.from) add('warn', 'realism', `album "${al.title}" (${al.year}) predates ${ar.name}'s debut (${ar.active.from})`, al.id)
})
const listenersOf = Object.fromEntries(artists.map((a) => [a.id, a.monthlyListeners]))
tracks.forEach((t) => {
  const ml = listenersOf[t.artistId] ?? 1
  // A track cannot plausibly exceed ~120 lifetime plays per monthly listener.
  if (t.playCount > ml * 120) {
    add('error', 'realism', `track "${t.title}" has ${t.playCount.toLocaleString()} plays but its artist has only ${ml.toLocaleString()} monthly listeners`,
      `ratio ${(t.playCount / ml).toFixed(0)}x — plausible ceiling is ~120x`)
  }
  const ar = artists.find((x) => x.id === t.artistId)
  const g = ar?.genres?.[0]
  const env = DURATION_BY_GENRE[g]
  if (env && (t.durationSec < env[0] * 0.6 || t.durationSec > env[2] * 1.5)) {
    add('warn', 'realism', `track "${t.title}" is ${Math.round(t.durationSec)}s, far outside the ${g} envelope (${env[0]}-${env[2]}s)`, t.id)
  }
})

// --- legal -----------------------------------------------------------------
const norm = (s) => String(s).toLowerCase().replace(/^the\s+/, '').trim()
const blockArtists = new Set(block.artists.map(norm))
const blockAlbums = new Set(block.albums.map(norm))
const blockBrands = new Set(block.brands.map(norm))

artists.forEach((a) => {
  if (blockArtists.has(norm(a.name))) {
    add('error', 'legal', `artist "${a.name}" collides with a real act`, a.nameRisk?.reason ?? 'on the blocklist')
  }
  if (blockBrands.has(norm(a.name))) add('error', 'legal', `artist "${a.name}" collides with a real brand`, a.id)
})
albums.forEach((al) => {
  if (blockAlbums.has(norm(al.title))) {
    add(al.nameRisk?.level === 'low' ? 'info' : 'warn', 'legal', `album "${al.title}" matches a well-known real release`, al.nameRisk?.reason ?? 'on the blocklist')
  }
})
labels.forEach((l) => { if (blockBrands.has(norm(l.name))) add('error', 'legal', `label "${l.name}" collides with a real label`, l.id) })
playlists.forEach((p) => { if (blockBrands.has(norm(p.title))) add('warn', 'legal', `playlist "${p.title}" matches a real brand`, p.id) })

// --- design ----------------------------------------------------------------
artists.filter((a) => a.designFileValue).forEach((a) => {
  const d = a.designFileValue
  if (d.monthlyListeners && d.monthlyListeners !== a.monthlyListeners) {
    add('info', 'design', `"${a.name}": artboard shows ${(d.monthlyListeners / 1e6).toFixed(1)}M, canon is ${(a.monthlyListeners / 1e3).toFixed(0)}K`,
      'update the Paper text to match, or accept the drift')
  }
})
tracks.filter((t) => t.designFileValue).forEach((t) => {
  const d = t.designFileValue
  if (d.playCount && d.playCount !== t.playCount) {
    add('info', 'design', `"${t.title}": artboard shows ${d.playCount.toLocaleString()}, canon is ${t.playCount.toLocaleString()}`, 'update the Paper text to match')
  }
})
playlists.forEach((p) => {
  const declared = p.trackCount ?? (p.trackIds?.length ?? 0)
  const have = p.trackIds?.length ?? 0
  if (!p.system && declared > have && !p.trackIds) {
    add('info', 'design', `playlist "${p.title}" declares ${declared} tracks; the catalogue fills it from genre affinity`, 'the catalogue is frozen; add tracks by hand in data/tracks.json')
  }
})

// --- curation --------------------------------------------------------------
// The note is the product. A list without one is a streaming playlist.
const plSet = new Set(playlists.map((p) => p.id))
for (const p of playlists) if (!p.system && !p.note) add('warn', 'integrity', `list "${p.title}" has no note`)
const scenes = load('scenes.json').scenes
for (const s of scenes) {
  if (!lSet.has(s.labelId)) add('error', 'integrity', `scene "${s.name}" references missing label ${s.labelId}`)
  for (const id of s.artistIds) if (!aSet.has(id)) add('error', 'integrity', `scene "${s.name}" references missing artist ${id}`)
  if (s.artistIds.length < 3) add('warn', 'realism', `scene "${s.name}" has only ${s.artistIds.length} artists — run generate with --genre ${s.genres[0]}`)
}
for (const u of users) {
  for (const id of u.following?.curatorIds ?? []) if (!cSet.has(id)) add('error', 'integrity', `user follows missing curator ${id}`)
  for (const id of u.following?.artistIds ?? []) if (!aSet.has(id)) add('error', 'integrity', `user follows missing artist ${id}`)
  for (const id of u.following?.playlistIds ?? []) if (!plSet.has(id)) add('error', 'integrity', `user follows missing list ${id}`)
  if (u.library?.downloadIds) add('warn', 'design', 'user.library.downloadIds is retired — Library has no Downloads tab')
}
for (const c of curators.curators) {
  for (const id of c.follows ?? []) if (!cSet.has(id)) add('error', 'integrity', `curator "${c.name}" follows missing curator ${id}`)
  if (c.followers == null) add('warn', 'integrity', `curator "${c.name}" has no followers count`)
}

// --- country cards ---------------------------------------------------------
// A card draws a gazetteer city inside its own country; a country where a
// curator or scene lives should have a card; a card without art is queued.
const countryRows = load('countries.json').countries
const cardCodes = new Set()
for (const c of countryRows) {
  if (cardCodes.has(c.code)) add('error', 'integrity', `duplicate country card ${c.code}`)
  cardCodes.add(c.code)
  const city = places.find((p) => p.id === c.cityId)
  if (!city) add('error', 'integrity', `country card ${c.name} draws unknown city ${c.cityId}`)
  else if (city.country !== c.code) add('error', 'integrity', `country card ${c.name} draws ${city.city}, which is in ${city.country}`)
  if ((c.landmarks?.length ?? 0) < 3) add('warn', 'design', `country card ${c.name} names fewer than three landmarks`)
}
const countryOfPlace = new Map(places.map((p) => [p.id, p.country]))
const homeCountries = new Set([...curators.curators, ...scenes].map((x) => countryOfPlace.get(x.placeId)).filter(Boolean))
for (const code of homeCountries) if (!cardCodes.has(code)) add('info', 'design', `curators or scenes live in ${code} but it has no country card`, 'add it to data/countries.json')
const artKeys = existsSync(join(ROOT, 'data', 'artwork.json')) ? load('artwork.json') : {}
const cardsWithoutArt = countryRows.filter((c) => !artKeys[`country:${c.code}`])
if (cardsWithoutArt.length) add('info', 'design', `${cardsWithoutArt.length} country cards have no art yet: ${cardsWithoutArt.map((c) => c.code).join(' ')}`, 'npm run countries -- --missing --format card')

// --- string coverage -------------------------------------------------------
const lens = artists.map((a) => a.name.length)
const maxLen = Math.max(...lens)
if (maxLen < 28) add('warn', 'design', `longest artist name is only ${maxLen} characters`, 'the UI is not being tested against long strings; the stress fixtures were archived on 2026-09-15')
if (!artists.some((a) => /[^\x00-\x7F]/.test(a.name))) add('warn', 'design', 'no artist name contains non-ASCII characters', 'diacritics and non-Latin script will appear in production; test them now')

// --- report ----------------------------------------------------------------
const order = { error: 0, warn: 1, info: 2 }
const clsOrder = { integrity: 0, legal: 1, realism: 2, design: 3 }
findings.sort((a, b) =>
  (clsOrder[a.cls] ?? 9) - (clsOrder[b.cls] ?? 9) || order[a.severity] - order[b.severity])
const counts = findings.reduce((m, f) => ({ ...m, [f.severity]: (m[f.severity] ?? 0) + 1 }), {})
const icon = { error: '✗', warn: '!', info: 'i' }

console.log(`\nKraft — catalogue validation`)
console.log(`${artists.length} artists · ${albums.length} albums · ${tracks.length} tracks · ${playlists.length} playlists\n`)
let lastCls = null
for (const f of findings) {
  if (f.cls !== lastCls) { console.log(`  ${f.cls.toUpperCase()}`); lastCls = f.cls }
  console.log(`   ${icon[f.severity]} ${f.message}`)
  if (f.detail) console.log(`      ${f.detail}`)
}
if (!findings.length) console.log('  clean\n')
console.log(`\n${counts.error ?? 0} errors · ${counts.warn ?? 0} warnings · ${counts.info ?? 0} notes\n`)
if (process.argv.includes('--strict') && counts.error) process.exit(1)
