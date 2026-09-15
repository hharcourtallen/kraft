// Kraft static API — shapes of api/*.json. Hand-maintained; keep in step with scripts/build.mjs.
// Every entity ships raw values for code and formatted labels for design (durationSec / duration).

export type Id = string
export type Slug = string
export type IsoDate = string // YYYY-MM-DD

export interface Artwork {
  image: string | null            // public path once generated and written back; null until then
  direction: { genre: string; year: number; era: string; eraLabel: string; isPeriodHomage: boolean; medium: string; composition: string; abstract: boolean; subject: string; palette: string }
  prompt: string
  paperGen: string                // paper-gen:// URL ready for write_html
}

export interface Ref { id: Id; name?: string; title?: string; slug?: Slug; year?: number }

export interface Track {
  id: Id; slug: Slug; title: string; trackNumber: number
  durationSec: number; duration: string
  playCount: number; playCountLabel: string; playCountCompact: string
  artist: Ref | null; album: Ref | null; genres: string[]; explicit: boolean
  lossless: { bitDepth: 24; sampleRateKhz: 192 }
}

export interface Album {
  id: Id; slug: Slug; title: string; year: number; type: 'Album' | 'EP' | 'Single' | 'Compilation' | 'Reissue'
  subtitle: string; trackCount: number; durationSec: number; durationLabel: string
  artist: Ref | null; label: Ref | null; genres: string[]; tracks: Id[]; artwork: Artwork; nameRisk: string | null
}

export interface Artist {
  geo?: Geo | null
  id: Id; slug: Slug; name: string; formation: string; country: string; hometown: string; region: string
  genres: string[]; primaryGenre: { slug: string; name: string }; label: Ref | null
  tier: 'flagship' | 'headline' | 'established' | 'working' | 'tail'
  monthlyListeners: number; monthlyListenersLabel: string; followers: number; followersLabel: string; shelfCaption: string
  verified: boolean; active: { from: number; to: number | null }; bio: string
  discography: Id[]; popularTrackIds: Id[]
  onLists: { playlistId: Id; title: string; curatorId: Id | null; curatorName: string | null }[]   // the social hook
  artwork: { portrait: Artwork; hero: Artwork }
}

export interface List {                 // data calls it playlist; the UI says list
  id: Id; slug: Slug; title: string; description: string | null
  note: string | null                   // the curator's sentence or two — the product
  system: boolean; stressFixture: boolean
  subtitle: string | null; curator: { id: Id; name: string; city: string } | null
  trackCount: number; durationSec: number; durationLabel: string; metaLine: string; libraryLine: string
  followers: number | null; followersLabel: string | null
  updated: IsoDate | null; updatedLabel: string | null
  moods: string[]; genres: string[]; trackIds: Id[]; resolvedTrackCount: number; shortfall: number
  artwork: Artwork
}

export interface Geo { placeId: Id; city: string; country: string; lat: number; lng: number }
export interface Place { id: Id; city: string; country: string; lat: number; lng: number }

export interface GlobePoint {           // one bright dot: who is playing what, where
  id: Id
  kind: 'curator' | 'member'
  placeId: Id; city: string; country: string; lat: number; lng: number
  track: { id: Id; title: string; artist: string | null; artistSlug: Slug | null; durationSec: number; image: string | null } | null
  playlist: { id: Id; slug: Slug; title: string; curatorName: string | null } | null
  who: { id: Id; slug: Slug; name: string; image: string | null } | null   // null for members
  startedSecAgo: number | null
  label: string | null                  // "Track · Artist", the hover card in one string
}
export interface Globe { today: IsoDate; listeningNow: number; points: GlobePoint[]; places: Place[] }

export interface Curator {
  geo?: Geo | null
  id: Id; slug: Slug; name: string; beat: string[]; beatLabel: string; city: string; since: number; bio: string
  kicker: string                        // "Curator · Oslo · since 2019"
  listCount: number; listIds: Id[]
  followers: number | null; followersLabel: string | null; follows: Id[]
  notes: { playlistId: Id; playlistTitle: string; note: string; updated: IsoDate | null; updatedLabel: string | null }[]
  artwork: { portrait: Artwork }
}

export interface Scene {
  geo?: Geo | null
  id: Id; slug: Slug; name: string; city: string; labelId: Id; label: Ref | null
  genres: string[]; look: string; artistIds: Id[]; artistCount: number; metaLine: string; artwork: Artwork
}

export interface Home {
  user: { id: Id; displayName: string; plan: string }
  title: string; subtitle: string
  shelf: { playlistId: Id; curatorId: Id; note: string | null; updated: IsoDate | null; updatedLabel: string | null }[]
  continue: { trackId: Id; contextType: 'playlist'; contextId: Id; positionSec: number; positionLabel: string }
  scenes: Id[]
  live: { curatorId: Id; playlistId: Id }[]
  countries: { title: string; subtitle: string; playlistIds: Id[] }   // Around the world: pl_country-* lists with a cover
}

export interface Explore {
  curators: { title: string; total: number; curatorIds: Id[] }
  scenes: { title: string; sceneIds: Id[] }
  browse: { title: string; tiles: { slug: string; label: string; kind: string; artwork: Artwork }[] }
}

export interface Library {
  tabs: { key: 'lists' | 'albums' | 'artists'; label: string; itemIds: Id[] }[]
  following: { curatorIds: Id[]; artistIds: Id[]; playlistIds: Id[] }
}

export interface Player {
  trackId: Id; contextType: 'playlist'; contextId: Id; positionSec: number; positionLabel: string
  state: 'playing' | 'paused'; volume: number; shuffle: boolean; repeat: 'off' | 'all' | 'one'
  track: Track
  context: { type: 'playlist'; id: Id; title: string; curatorName: string | null; line: string | null }
  queue: { nowPlaying: Id; nextUp: Id[] }
}

// /countries.json — the country card template (Paper, UI page, "Country / …")
export interface Country {
  code: string                          // ISO-2, matches Place.country
  slug: string; name: string
  city: string; cityId: Id              // the gazetteer city the art draws
  curators: { id: Id; slug: string; name: string; city: string }[]
  scenes: { id: Id; slug: string; name: string; city: string }[]
  metaLine: string                      // "New York · 1 curator · 2 scenes"
  image: string | null                  // /artwork/country/<slug>.png, null while queued
  artwork: { landmarks: string[]; palette: string; prompt: string; paperGen: string }
}
export interface Countries {
  card: { size: number; image: { top: number; height: number }; ghost: { left: number; top: number }; middle: { left: number; top: number }; bottom: { offset: number; top: number }; [k: string]: unknown }
  grid: { w: number; h: number; colors: number; scale: number }
  countries: Country[]
}
