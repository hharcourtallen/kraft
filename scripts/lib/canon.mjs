// Kraft canon: the numbers the whole catalogue is scaled from, and the
// formatting helpers that turn them into UI strings. Read CANON.md first.
//
// CANON SCALE: Kraft has 2.4M subscribers. Listener and play figures are derived
// from that, NOT borrowed from a 600M-user service. Curation is community-driven;
// nothing here counts money.

export const CANON = {
  subscribers: 2_400_000,
  monthlyActive: 1_680_000, // 70% of subscribers listen in a given month
  catalogueAlbums: 41_200,
  curatingMembers: 1_240, // members with at least one list on the shelf; nine carry a byline
  foundedYear: 2019,
  currentYear: 2026,
}

/**
 * Artist tiers. `share` is the fraction of the roster in that tier — a real
 * catalogue is overwhelmingly long tail. `listeners` is monthly listeners on
 * Kraft, capped so the top artist stays well under monthlyActive.
 */
export const ARTIST_TIERS = [
  { tier: 'flagship', share: 0.01, listeners: [180_000, 420_000], followers: [90_000, 260_000] },
  { tier: 'headline', share: 0.05, listeners: [60_000, 180_000], followers: [25_000, 90_000] },
  { tier: 'established', share: 0.16, listeners: [18_000, 60_000], followers: [6_000, 25_000] },
  { tier: 'working', share: 0.33, listeners: [3_000, 18_000], followers: [800, 6_000] },
  { tier: 'tail', share: 0.45, listeners: [180, 3_000], followers: [40, 800] },
]

/**
 * Play counts for an artist's tracks. Within one artist the distribution is
 * steep: the lead single routinely does 5-15x the deep cuts. `rank` is 0-based
 * position in the artist's popularity order.
 */
export function playCountFor(rand, monthlyListeners, rank, ageYears) {
  const decay = Math.pow(0.62, rank) // steep drop after the hit
  const lifetimeMonths = Math.max(3, ageYears * 12)
  // Not every monthly listener plays every track; ~8-18% touch a given track.
  const reach = rand.normal(0.13, 0.035, 0.04, 0.3)
  const repeats = rand.normal(2.4, 0.7, 1.1, 6)
  const base = monthlyListeners * reach * repeats * Math.min(lifetimeMonths, 48) * decay
  const jitter = rand.normal(1, 0.22, 0.5, 1.9)
  return Math.max(37, Math.round(base * jitter))
}

/** Per-genre duration envelopes in seconds: [min, typical, max]. */
export const DURATION_BY_GENRE = {
  ambient: [240, 480, 780],
  'modern-composition': [150, 330, 660],
  jazz: [210, 375, 620],
  'spiritual-jazz': [280, 480, 840],
  dub: [200, 330, 480],
  house: [270, 390, 540],
  techno: [280, 400, 560],
  downtempo: [200, 300, 420],
  'dream-pop': [180, 250, 360],
  shoegaze: [190, 285, 430],
  'indie-rock': [150, 225, 330],
  'post-punk': [140, 205, 300],
  punk: [95, 145, 210],
  metal: [180, 300, 520],
  folk: [150, 235, 360],
  americana: [160, 250, 380],
  'singer-songwriter': [150, 230, 340],
  soul: [160, 240, 350],
  funk: [180, 280, 420],
  afrobeat: [260, 420, 720],
  'hip-hop': [130, 195, 290],
  rnb: [150, 225, 330],
  latin: [160, 240, 350],
  bossa: [140, 210, 300],
  cumbia: [170, 260, 380],
  experimental: [90, 300, 720],
  default: [150, 240, 380],
}

export const fmtDuration = (sec) =>
  `${Math.floor(sec / 60)}:${String(Math.round(sec % 60)).padStart(2, '0')}`

export function compactCount(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n >= 10_000_000 ? 0 : 1).replace(/\.0$/, '')}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(n >= 10_000 ? 0 : 1).replace(/\.0$/, '')}K`
  return String(n)
}

export const groupedCount = (n) => n.toLocaleString('en-US')

export function totalDurationLabel(seconds) {
  const h = Math.floor(seconds / 3600)
  const m = Math.round((seconds % 3600) / 60)
  return h ? `${h} hr ${m} min` : `${m} min`
}
