#!/usr/bin/env node
// Compile data/*.json into api/*.json.
//
// The API is a folder of static JSON files. That is deliberate: no keys, no
// rate limits, no service to fall over during a demo, and anyone can open the
// repo and see exactly what the product "knows". Serve it from any static host,
// or import it directly in a Next.js app.
//
// Every entity carries BOTH the raw value and the display string. Devs bind to
// durationSec / playCount; designers paste duration / playCountLabel.

import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { rng } from './lib/rng.mjs'
import { slugify, uniqueSlug } from './lib/slug.mjs'
import { artDirection, buildPrompt, paperGenUrl } from './lib/artwork.mjs'
import { CARD, GRID, countryPrompt, countryPaperGen } from './lib/place-art.mjs'
import {
  CANON, fmtDuration, compactCount, groupedCount, totalDurationLabel, playCountFor,
} from './lib/canon.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const read = (f) => JSON.parse(readFileSync(join(ROOT, 'data', f), 'utf8'))

// Places: one gazetteer for curators, scenes, artist hometowns and the globe.
const placesDoc = read('places.json')
const PLC = Object.fromEntries(placesDoc.places.map((p) => [p.id, p]))
const geoFor = (placeId) => { const p = placeId ? PLC[placeId] : null; return p ? { placeId: p.id, city: p.city, country: p.country, lat: p.lat, lng: p.lng } : null }
const clean = (arr) => arr.filter((x) => x && x.id) // drop $scene marker objects

const genresDoc = read('genres.json')
const labels = read('labels.json').labels
const curatorsDoc = read('curators.json')
const artists = clean(read('artists.json').artists)
const albums = clean(read('albums.json').albums)
const tracks = clean(read('tracks.json').tracks)
const playlists = clean(read('playlists.json').playlists)
const users = clean(read('users.json').users)

// Country lists: a country card with a `list` (data/countries.json) is a list
// too, titled with the country. Local artists' tracks are pinned first (two per
// artist, six at most) and the rest fills from its genres like any other list.
// They stay out of the Home feed: a standing shelf, not this week's updates.
const countriesDoc = read('countries.json')
for (const c of countriesDoc.countries) {
  if (!c.list) continue
  const local = new Set(artists.filter((a) => PLC[a.placeId]?.country === c.code).map((a) => a.id))
  const perArtist = {}
  const pinnedTrackIds = tracks
    .filter((t) => local.has(t.artistId) && (perArtist[t.artistId] = (perArtist[t.artistId] ?? 0) + 1) <= 2)
    .slice(0, 6).map((t) => t.id)
  playlists.push({ id: `pl_country-${slugify(c.name)}`, title: c.name, origin: 'country', countryCode: c.code, moods: [], pinnedTrackIds, ...c.list })
}

const rand = rng('overflow-build-v1')
const byId = (arr) => Object.fromEntries(arr.map((x) => [x.id, x]))
const A = byId(artists), AL = byId(albums), T = byId(tracks)
const CUR = byId(curatorsDoc.curators), LBL = byId(labels)
const G = Object.fromEntries(genresDoc.genres.map((g) => [g.slug, g]))

// --- normalise genre shares (they are authored by hand and drift) -----------
const shareSum = genresDoc.genres.reduce((s, g) => s + g.share, 0)
genresDoc.genres.forEach((g) => { g.shareNormalized = +(g.share / shareSum).toFixed(4) })

const out = []
const emit = (path, data) => {
  const full = join(ROOT, 'api', path)
  mkdirSync(dirname(full), { recursive: true })
  writeFileSync(full, JSON.stringify(data, null, 2) + '\n')
  out.push(path)
}

// --- artwork ---------------------------------------------------------------
// Every entity gets a deterministic art direction and a ready-to-use
// paper-gen:// URL. `image` stays null until a real asset is generated and
// pasted back in; the UI falls back to the prompt-derived palette meanwhile.
// data/artwork.json maps seed keys ("album:alb_bloom") to generated image paths. Written by
// `npm run artwork -- --write-back <key> <path>` after exporting from Paper.
const ART = existsSync(join(ROOT, 'data', 'artwork.json')) ? read('artwork.json') : {}
function artworkFor(seedKey, genreSlug, kind, { year = null } = {}) {
  const r = rng(seedKey)
  const dir = artDirection(r, genreSlug, { year, kind })
  const prompt = buildPrompt(dir, kind)
  return { image: ART[seedKey] ?? null, direction: dir, prompt, paperGen: paperGenUrl(prompt, kind) }
}

// --- tracks ----------------------------------------------------------------
const trackOut = tracks.map((t) => {
  const artist = A[t.artistId]
  const album = AL[t.albumId]
  return {
    id: t.id,
    slug: slugify(t.title),
    title: t.title,
    trackNumber: t.no,
    durationSec: t.durationSec,
    duration: fmtDuration(t.durationSec),
    playCount: t.playCount,
    playCountLabel: groupedCount(t.playCount),
    playCountCompact: compactCount(t.playCount),
    artist: artist ? { id: artist.id, name: artist.name, slug: slugify(artist.name) } : null,
    album: album ? { id: album.id, title: album.title, slug: slugify(album.title), year: album.year } : null,
    genres: artist?.genres ?? [],
    explicit: false,
    lossless: { bitDepth: 24, sampleRateKhz: 192 }, // brand canon: every plan, every track
  }
})
const TO = byId(trackOut)

// --- albums ----------------------------------------------------------------
const albumSlugs = new Set()
const albumOut = albums.map((al) => {
  const artist = A[al.artistId]
  const own = trackOut.filter((t) => t.album?.id === al.id).sort((a, b) => a.trackNumber - b.trackNumber)
  const known = own.reduce((s, t) => s + t.durationSec, 0)
  // Only some tracks are authored; estimate the rest from the ones we have.
  const avg = own.length ? known / own.length : 240
  const totalSec = Math.round(known + avg * Math.max(0, al.trackCount - own.length))
  // Album titles repeat constantly across a real catalogue — "Bloom" occurs
  // four times here. A title-only slug silently overwrote 82 albums onto 31
  // files, so every colliding request served another artist's record.
  const baseSlug = slugify(al.title)
  const slug = albumSlugs.has(baseSlug)
    ? uniqueSlug(`${baseSlug}-${slugify(artist?.name ?? 'unknown')}`, albumSlugs)
    : (albumSlugs.add(baseSlug), baseSlug)
  return {
    id: al.id,
    slug,
    title: al.title,
    year: al.year,
    type: al.type,
    subtitle: `${al.year} · ${al.type}`,
    trackCount: al.trackCount,
    durationSec: totalSec,
    durationLabel: totalDurationLabel(totalSec),
    artist: artist ? { id: artist.id, name: artist.name, slug: slugify(artist.name) } : null,
    label: LBL[al.labelId] ? { id: al.labelId, name: LBL[al.labelId].name } : null,
    genres: artist?.genres ?? [],
    tracks: own.map((t) => t.id),
    artwork: artworkFor(`album:${al.id}`, artist?.genres?.[0] ?? 'folk', 'album', { year: al.year }),
    nameRisk: al.nameRisk ?? null,
  }
})
const ALO = byId(albumOut)

// --- artists ---------------------------------------------------------------
const artistOut = artists.map((ar) => {
  const disc = albumOut.filter((a) => a.artist?.id === ar.id).sort((a, b) => b.year - a.year)
  const popular = trackOut.filter((t) => t.artist?.id === ar.id).sort((a, b) => b.playCount - a.playCount)
  const primary = ar.genres[0] ?? 'folk'
  return {
    id: ar.id,
    slug: slugify(ar.name),
    name: ar.name,
    formation: ar.formation,
    country: ar.country,
    hometown: ar.hometown,
    geo: geoFor(ar.placeId),
    region: ar.region,
    genres: ar.genres,
    primaryGenre: { slug: primary, name: G[primary]?.name ?? primary },
    label: LBL[ar.labelId] ? { id: ar.labelId, name: LBL[ar.labelId].name } : null,
    tier: ar.tier,
    monthlyListeners: ar.monthlyListeners,
    monthlyListenersLabel: `${compactCount(ar.monthlyListeners)} monthly listeners`,
    followers: ar.followers,
    followersLabel: compactCount(ar.followers),
    // The Home shelf caption: "Folk · 4.2M listeners"
    shelfCaption: `${G[primary]?.name ?? primary} · ${compactCount(ar.monthlyListeners)} listeners`,
    verified: ar.verified,
    active: ar.active,
    bio: ar.bio,
    discography: disc.map((a) => a.id),
    popularTrackIds: popular.slice(0, 10).map((t) => t.id),
    artwork: {
      // An artist's press shots track their latest release, not their debut.
      portrait: artworkFor(`artist-portrait:${ar.id}`, primary, 'artistPortrait', { year: disc[0]?.year ?? CANON.currentYear }),
      hero: artworkFor(`artist-hero:${ar.id}`, primary, 'artistHero', { year: disc[0]?.year ?? CANON.currentYear }),
    },
    nameRisk: ar.nameRisk ?? null,
    designFileValue: ar.designFileValue ?? null,
  }
})
const ARO = byId(artistOut)

// --- playlists -------------------------------------------------------------
// Playlists with an explicit tracklist keep it. The rest are filled from the
// catalogue by genre affinity, deterministically, so counts stay honest.
const playlistSlugs = new Set()
// Album art rides on every track so a list page or the player never needs a
// second fetch. Null until the sleeve has been generated (see data/artwork.json).
const ALBUM_IMG = Object.fromEntries(albumOut.map((a) => [a.id, a.artwork?.image ?? null]))
trackOut.forEach((t) => { t.albumArt = t.album ? ALBUM_IMG[t.album.id] ?? null : null })
const trackRef = ({ id, slug, title, duration, durationSec, artist, album, albumArt }) => ({ id, slug, title, duration, durationSec, artist, album, albumArt })

// Artist pages read their popular tracks and discography resolved, so the app
// never has to load the 900-track index for one page.
const ALBUM_BY_ID = Object.fromEntries(albumOut.map((a) => [a.id, a]))
artistOut.forEach((a) => {
  a.popular = (a.popularTrackIds ?? []).map((id) => TO[id]).filter(Boolean).map((t) => ({ ...trackRef(t), playCountLabel: t.playCountLabel }))
  a.albums = (a.discography ?? []).map((id) => ALBUM_BY_ID[id]).filter(Boolean)
    .map(({ id, slug, title, subtitle, year, type, artwork }) => ({ id, slug, title, subtitle, year, type, image: artwork?.image ?? null }))
})

const playlistOut = playlists.map((pl) => {
  let ids = pl.trackIds
  if (!ids) {
    const r = rng(`playlist:${pl.id}`)
    const pool = trackOut.filter((t) => t.genres.some((g) => pl.genres?.includes(g)))
    const fallback = pool.length ? pool : trackOut
    // pinnedTrackIds are authored picks that must appear (they give artists their 'on lists by' row); the rest is filled by affinity.
    const pinned = (pl.pinnedTrackIds ?? []).filter((id) => TO[id])
    const rest = r.shuffle(fallback.filter((t) => !pinned.includes(t.id))).map((t) => t.id)
    ids = [...pinned, ...rest].slice(0, Math.max(pinned.length, Math.min(pl.trackCount ?? 10, fallback.length + pinned.length)))
  }
  const secs = ids.reduce((s, id) => s + (TO[id]?.durationSec ?? 0), 0)
  const declared = pl.trackCount ?? ids.length
  // If the authored count exceeds what the catalogue can supply, report the
  // declared count (that is what the design shows) but flag the shortfall.
  const shortfall = declared > ids.length ? declared - ids.length : 0
  const perTrack = ids.length ? secs / ids.length : 240
  const estSec = Math.round(secs + perTrack * shortfall)
  const cur = pl.curatorId ? CUR[pl.curatorId] : null
  return {
    id: pl.id,
    slug: uniqueSlug(slugify(pl.title), playlistSlugs),
    title: pl.title,
    description: pl.description ?? null,
    note: pl.note ?? null,
    notePin: pl.notePin ?? null,
    stressFixture: !!pl.stressFixture,
    system: !!pl.system,
    countryCode: pl.countryCode ?? null,
    subtitle: pl.system ? (pl.subtitle ?? 'Auto-generated') : (cur?.name ?? null),
    curator: cur ? { id: cur.id, name: cur.name, city: cur.city } : null,
    trackCount: declared,
    durationSec: estSec,
    durationLabel: totalDurationLabel(estSec),
    // The Playlist header line: "10 tracks · 46 min"
    metaLine: `${declared} tracks · ${totalDurationLabel(estSec)}`,
    // The Library row line: "List · 10 songs"
    libraryLine: `List · ${declared} songs`,
    followers: pl.followers ?? null,
    followersLabel: pl.followers ? compactCount(pl.followers) : null,
    updated: pl.updated ?? null,
    moods: pl.moods ?? [],
    genres: pl.genres ?? [],
    trackIds: ids,
    // Resolved, in order — what the List page and the queue actually render.
    tracks: ids.map((id) => TO[id]).filter(Boolean).map(trackRef),
    resolvedTrackCount: ids.length,
    shortfall,
    artwork: artworkFor(`playlist:${pl.id}`, pl.genres?.[0] ?? 'folk', 'playlist', { year: CANON.currentYear }),
  }
})
const PLO = byId(playlistOut)

// --- genres ----------------------------------------------------------------
const genreOut = genresDoc.genres.map((g) => ({
  ...g,
  artistCount: artistOut.filter((a) => a.genres.includes(g.slug)).length,
  estimatedAlbums: Math.round(CANON.catalogueAlbums * g.shareNormalized),
  artwork: artworkFor(`genre:${g.slug}`, g.slug, 'genreTile', { year: CANON.currentYear }),
}))

const browseOut = genresDoc.browseCategories.map((b) => ({
  ...b,
  artwork: artworkFor(`browse:${b.slug}`, b.kind === 'genre' ? b.slug : (b.genres?.[0] ?? 'ambient'), 'genreTile', { year: CANON.currentYear }),
}))

// --- scenes ----------------------------------------------------------------
// A scene is a label, a city, a production approach and a look (CANON §Scenes).
const scenesDoc = read('scenes.json')
const sceneOut = scenesDoc.scenes.map((s) => ({
  ...s,
  slug: slugify(s.name),
  geo: geoFor(s.placeId),
  label: LBL[s.labelId] ? { id: s.labelId, name: LBL[s.labelId].name } : null,
  artistCount: s.artistIds.length,
  metaLine: `${s.city} · ${s.artistIds.length} artists`,
  artwork: artworkFor(`scene:${s.id}`, s.genres[0], 'genreTile', { year: CANON.currentYear }),
}))

// --- dates -----------------------------------------------------------------
// The canvas is frozen at one date so "3 days ago" never drifts.
const TODAY = '2026-08-25'
const relDate = (iso) => {
  if (!iso) return null
  const d = Math.round((Date.parse(TODAY) - Date.parse(iso)) / 86400000)
  if (d <= 0) return 'today'
  if (d === 1) return 'yesterday'
  if (d < 7) return `${d} days ago`
  if (d < 28) return `${Math.round(d / 7)} week${d < 11 ? '' : 's'} ago`
  const dt = new Date(iso)
  return `${dt.getUTCDate()} ${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][dt.getUTCMonth()]}`
}
playlistOut.forEach((p) => { p.updatedLabel = relDate(p.updated) })

// --- curators --------------------------------------------------------------
// Curators are people first. Their lists and the notes on them are the feed.
const curatorOut = curatorsDoc.curators.map((c) => {
  const lists = playlistOut.filter((p) => p.curator?.id === c.id && !p.stressFixture)
  const notes = lists.filter((p) => p.note)
    .sort((a, b) => (b.updated ?? '').localeCompare(a.updated ?? ''))
    .map((p) => ({ playlistId: p.id, playlistTitle: p.title, note: p.note, updated: p.updated, updatedLabel: p.updatedLabel }))
  return {
    id: c.id,
    slug: slugify(c.name),
    name: c.name,
    beat: c.beat,
    beatLabel: c.beat.map((g) => G[g]?.name ?? g).join(' · '),
    city: c.city,
    geo: geoFor(c.placeId),
    since: c.since,
    bio: c.bio,
    kicker: `Curator · ${c.city} · since ${c.since}`,
    listCount: c.playlists,
    listIds: lists.map((p) => p.id),
    followers: c.followers ?? null,
    followersLabel: c.followers ? compactCount(c.followers) : null,
    follows: c.follows ?? [],
    nowPlaying: (() => { const pl = c.nowPlaying ? playlistOut.find((p) => p.id === c.nowPlaying) : null; return pl ? { playlistId: pl.id, slug: pl.slug, title: pl.title, curatorName: pl.curator?.name ?? null } : null })(),
    notes,
    artwork: { portrait: artworkFor(`curator-portrait:${c.id}`, c.beat[0], 'curatorPortrait', { year: CANON.currentYear }) },
  }
})

// Artists gain the social hook: which curators shelved them.
artistOut.forEach((a) => {
  a.onLists = playlistOut
    .filter((p) => !p.system && !p.stressFixture && p.trackIds.some((id) => TO[id]?.artist?.id === a.id))
    .map((p) => {
      const at = p.trackIds.findIndex((id) => TO[id]?.artist?.id === a.id)
      const track = TO[p.trackIds[at]]
      return {
        playlistId: p.id, slug: p.slug, title: p.title, image: p.artwork?.image ?? null,
        curatorId: p.curator?.id ?? null, curatorName: p.curator?.name ?? null,
        trackTitle: track?.title ?? null, position: at + 1,
        // "Golden Thread opens it" / "Paper Lanterns is track 3"
        caption: track ? (at === 0 ? `${track.title} opens it` : `${track.title} is track ${at + 1}`) : null,
      }
    })
})

// --- screen payloads -------------------------------------------------------

// A note pinned to a moment: the curator's sentence lives at a second inside one track.
playlistOut.forEach((p) => {
  if (!p.notePin) return
  const t = TO[p.notePin.trackId]
  const cu = curatorOut.find((c) => c.id === p.curator?.id)
  p.notePin = t ? { ...p.notePin, trackTitle: t.title, label: fmtDuration(p.notePin.sec), note: p.note, curatorName: cu?.name ?? null, curatorImage: cu?.artwork?.portrait?.image ?? null } : null
})
// Activity: what curators did, resolved for the homepage's This week.
const activityDoc = read('activity.json')
const CUO = Object.fromEntries(curatorOut.map((c) => [c.id, c]))
const activityOut = activityDoc.activity.map((a) => {
  const c = CUO[a.curatorId]
  const pl = a.playlistId ? PLO[a.playlistId] : null
  const target = a.targetCuratorId ? CUO[a.targetCuratorId] : null
  const t = a.trackId ? TO[a.trackId] : null
  const first = (n) => (n ?? '').split(' ')[0]
  const line = a.type === 'update' ? `updated ${pl?.title}`
    : a.type === 'reply' ? `replied on ${pl?.title}${a.sec != null ? ` at ${fmtDuration(a.sec)}` : ''}`
    : a.type === 'repost' ? `put ${pl?.curator ? first(pl.curator.name) + "'s " : ''}${pl?.title} on ${c?.pronoun === 'she' ? 'her' : c?.pronoun === 'he' ? 'his' : 'their'} shelf`
    : `started following ${target?.name}`
  return { id: a.id, type: a.type, date: a.date, dateLabel: relDate(a.date), text: a.text ?? null, line,
    curator: c ? { id: c.id, slug: c.slug, name: c.name, image: c.artwork?.portrait?.image ?? null } : null,
    playlist: pl ? { id: pl.id, slug: pl.slug, title: pl.title, image: pl.artwork?.image ?? null, curatorName: pl.curator?.name ?? null } : null,
    track: t ? { id: t.id, title: t.title, durationSec: t.durationSec } : null, sec: a.sec ?? null, secLabel: a.sec != null ? fmtDuration(a.sec) : null,
    target: target ? { id: target.id, slug: target.slug, name: target.name, image: target.artwork?.portrait?.image ?? null } : null }
})
const user = users[0]
const followedCurators = new Set(user.following?.curatorIds ?? [])

// Home is a feed: lists updated by people you follow, newest first, each with its note.
const shelf = playlistOut
  .filter((p) => p.curator && followedCurators.has(p.curator.id) && !p.stressFixture && !p.countryCode)
  .sort((a, b) => (b.updated ?? '').localeCompare(a.updated ?? ''))
  .map((p) => ({ playlistId: p.id, curatorId: p.curator.id, note: p.note, updated: p.updated, updatedLabel: p.updatedLabel }))

const home = {
  user: { id: user.id, displayName: user.displayName, plan: user.plan },
  title: 'This week on the shelf',
  subtitle: `${shelf.length} lists updated by people you follow`,
  shelf,
  continue: { trackId: user.player.trackId, contextType: user.player.contextType, contextId: user.player.contextId, positionSec: user.player.positionSec, positionLabel: fmtDuration(user.player.positionSec) },
  scenes: sceneOut.slice(0, 3).map((s) => s.id),
  // Who's on right now: followed curators with a list playing (the Stage direction).
  live: curatorOut.filter((c) => followedCurators.has(c.id) && c.nowPlaying).map((c) => ({ curatorId: c.id, playlistId: c.nowPlaying.playlistId })),
  // Around the world: the country lists that have a cover, in data order.
  countries: {
    title: 'Around the world',
    subtitle: 'One list per country, picked by someone who knows it',
    playlistIds: playlistOut.filter((p) => p.countryCode && p.artwork?.image).map((p) => p.id),
  },
}

const explore = {
  curators: { title: 'Curators', total: curatorsDoc.totalCurators, curatorIds: curatorOut.map((c) => c.id) },
  scenes: { title: 'Scenes', sceneIds: sceneOut.map((s) => s.id) },
  browse: { title: 'Browse', tiles: browseOut },
}

const player = {
  ...user.player,
  positionLabel: fmtDuration(user.player.positionSec),
  track: TO[user.player.trackId],
  context: (() => {
    const pl = PLO[user.player.contextId]
    return { type: 'playlist', id: user.player.contextId, title: pl?.title, curatorName: pl?.curator?.name ?? null, line: pl ? `From ${pl.title} · ${pl.curator?.name ?? 'Kraft'}` : null }
  })(),
  queue: (() => {
    const pl = PLO[user.player.contextId]
    const i = pl.trackIds.indexOf(user.player.trackId)
    return { nowPlaying: user.player.trackId, nextUp: pl.trackIds.slice(i + 1) }
  })(),
}

const search = {
  placeholder: 'Search tracks, artists, albums…',
  recentSearches: user.recentSearches.map((s) => {
    if (s.type === 'artist') return { type: 'artist', id: s.id, title: ARO[s.id].name, subtitle: 'Artist', shape: 'circle' }
    if (s.type === 'track') return { type: 'track', id: s.id, title: TO[s.id].title, subtitle: `Song · ${TO[s.id].artist.name}`, shape: 'square' }
    return { type: 'album', id: s.id, title: ALO[s.id].title, subtitle: `Album · ${ALO[s.id].artist.name}`, shape: 'square' }
  }),
}

const library = {
  tabs: [
    { key: 'lists', label: 'Lists', itemIds: user.library.playlistIds },
    { key: 'albums', label: 'Albums', itemIds: user.library.albumIds },
    { key: 'artists', label: 'Artists', itemIds: user.library.artistIds },
  ],
  following: user.following,
}


// --- globe -----------------------------------------------------------------
// Who is playing what, where, right now. data/listening.json is a sample of
// points; the headline count is canon-scaled so the globe never claims more
// listeners than the service has.
const listeningDoc = read('listening.json')
const albumImage = (albumId) => albumOut.find((a) => a.id === albumId)?.artwork?.image ?? null
const globeOut = {
  today: TODAY,
  listeningNow: Math.round(CANON.monthlyActive * 0.02), // ~2% of monthly actives are on at any moment
  points: listeningDoc.listening.map((l) => {
    const geo = geoFor(l.placeId)
    const t = TO[l.trackId]
    const pl = l.playlistId ? PLO[l.playlistId] : null
    const c = l.curatorId ? CUO[l.curatorId] : null
    return {
      id: l.id, kind: l.kind, ...geo,
      track: t ? { id: t.id, title: t.title, artist: t.artist?.name ?? null, artistSlug: t.artist?.slug ?? null, durationSec: t.durationSec, image: albumImage(t.album?.id) } : null,
      playlist: pl ? { id: pl.id, slug: pl.slug, title: pl.title, curatorName: pl.curator?.name ?? null } : null,
      who: c ? { id: c.id, slug: c.slug, name: c.name, image: c.artwork?.portrait?.image ?? null } : null,
      startedSecAgo: l.startedSecAgo ?? null,
      label: t ? `${t.title} · ${t.artist?.name ?? ''}`.trim() : null,
    }
  }),
  places: placesDoc.places.map(({ aliases, ...p }) => p),
}

// --- countries -------------------------------------------------------------
// Country cards (data/countries.json): the country name set in the Paper
// template over a pixel-art strip of one city. Curators and scenes join a card
// through their place's country. `card` and `grid` ship with the list so the
// app draws the template from the same numbers the canvas was measured at.
const countryOut = countriesDoc.countries.map((c) => {
  const city = PLC[c.cityId]?.city ?? null
  const here = (geo) => geo?.country === c.code
  const curators = curatorOut.filter((x) => here(x.geo)).map((x) => ({ id: x.id, slug: x.slug, name: x.name, city: x.city }))
  const scenes = sceneOut.filter((s) => here(s.geo)).map((s) => ({ id: s.id, slug: s.slug, name: s.name, city: s.city }))
  const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`
  const prompt = countryPrompt(c, city)
  return {
    code: c.code,
    slug: slugify(c.name),
    name: c.name,
    city,
    cityId: c.cityId,
    curators,
    scenes,
    metaLine: [city, curators.length ? plural(curators.length, 'curator') : null, scenes.length ? plural(scenes.length, 'scene') : null].filter(Boolean).join(' · '),
    playlistId: c.list ? `pl_country-${slugify(c.name)}` : null,
    image: ART[`country:${c.code}`] ?? null,
    artwork: { landmarks: c.landmarks, palette: c.palette, prompt, paperGen: countryPaperGen(prompt) },
  }
})

// --- write -----------------------------------------------------------------
if (existsSync(join(ROOT, 'api'))) rmSync(join(ROOT, 'api'), { recursive: true, force: true })

emit('index.json', {
  name: 'Kraft',
  version: JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')).version,
  generatedFrom: 'data/*.json',
  canon: CANON,
  today: TODAY,
  disclaimer: 'Kraft is a fictional product. Every artist, release, track, label and curator is invented. Any resemblance to a real recording is unintended.',
  counts: { artists: artistOut.length, albums: albumOut.length, tracks: trackOut.length, playlists: playlistOut.length, genres: genreOut.length, curators: curatorOut.length, scenes: sceneOut.length, notes: playlistOut.filter((p) => p.note).length, places: placesDoc.places.length, listening: globeOut.points.length, countries: countryOut.length },
  endpoints: ['/home.json', '/explore.json', '/library.json', '/search.json', '/player.json', '/genres.json', '/scenes.json', '/globe.json', '/countries.json', '/curators/index.json', '/curators/{slug}.json', '/artists/index.json', '/artists/{slug}.json', '/albums/index.json', '/albums/{slug}.json', '/playlists/index.json', '/playlists/{slug}.json', '/tracks/index.json'],
})

emit('home.json', home)
emit('activity.json', { thisWeek: (({ $comment, ...t }) => t)(activityDoc.thisWeek ?? {}), activity: activityOut })
emit('explore.json', explore)
emit('library.json', library)
emit('search.json', search)
emit('player.json', player)
emit('genres.json', { genres: genreOut, browseCategories: browseOut, moods: genresDoc.moods })
emit('scenes.json', { scenes: sceneOut })
emit('globe.json', globeOut)
emit('countries.json', { card: CARD, grid: GRID, countries: countryOut })
emit('labels.json', { labels })

emit('curators/index.json', { curators: curatorOut.map(({ artwork, notes, bio, ...rest }) => ({ ...rest, image: artwork?.portrait?.image ?? null })), total: curatorsDoc.totalCurators })
curatorOut.forEach((c) => emit(`curators/${c.slug}.json`, c))
emit('artists/index.json', { artists: artistOut.map(({ artwork, bio, onLists, popular, albums, ...rest }) => ({ ...rest, image: artwork?.portrait?.image ?? null })) })
artistOut.forEach((a) => emit(`artists/${a.slug}.json`, a))
emit('albums/index.json', { albums: albumOut.map(({ artwork, ...rest }) => ({ ...rest, image: artwork?.image ?? null })) })
albumOut.forEach((a) => emit(`albums/${a.slug}.json`, a))
emit('playlists/index.json', { playlists: playlistOut.map(({ artwork, trackIds, tracks, ...rest }) => ({ ...rest, image: artwork?.image ?? null })) })
playlistOut.forEach((p) => emit(`playlists/${p.slug}.json`, p))
emit('tracks/index.json', { tracks: trackOut })

console.log(`built ${out.length} files into api/`)
console.log(`  ${artistOut.length} artists · ${albumOut.length} albums · ${trackOut.length} tracks · ${playlistOut.length} playlists · ${genreOut.length} genres`)
const short = playlistOut.filter((p) => p.shortfall > 0)
if (short.length) console.log(`  note: ${short.length} playlists declare more tracks than the catalogue can supply yet (the catalogue is frozen; add tracks by hand in data/tracks.json)`)
