// Artwork direction, on two independent axes.
//
// The first version of this file had one kit per genre, each locked to a single
// decade — so every dream-pop record ever made got a 1990s 4AD sleeve, and a
// 2025 release looked identical to a 2009 one. Worse, the release year was
// never passed in at all. The result read as one uniform vintage mood.
//
// Real catalogues do not work that way. A jazz record from 1962 and one from
// 2024 share a subject register and a palette, and share almost nothing else:
// the medium, the printing process, the composition and the level of
// abstraction all move with the decade. So:
//
//   GENRE_VOICE  — palette + subject register.   The WHAT. Stays put.
//   ERA_TREATMENT — medium + composition.        The HOW. Moves with the year.
//
// Cross them and a genre keeps its identity while the catalogue spans seventy
// years of visual language.
//
// Two further rules:
//  - Covers stay OFF the app palette (warm plum 323 / slate 257.5). The chrome
//    is the product; the covers are the world. Contrast is the point.
//  - No baked-in text by default — models garble type. Pass { text } to switch
//    to a text-capable model when a wordmark is genuinely wanted.

// ---------------------------------------------------------------------------
// Axis 1 — era treatment (the HOW)
// ---------------------------------------------------------------------------

export const ERAS = [
  { key: 'heritage', label: '1955-1979', from: 1900, to: 1979 },
  { key: 'classic', label: '1980-1999', from: 1980, to: 1999 },
  { key: 'digital', label: '2000-2014', from: 2000, to: 2014 },
  { key: 'contemporary', label: '2015-present', from: 2015, to: 2100 },
]

export const eraForYear = (year) =>
  (ERAS.find((e) => year >= e.from && year <= e.to) ?? ERAS[3]).key

/**
 * Medium + composition per era. Weighted so each era has a dominant look but
 * real spread underneath — a decade is not a monoculture.
 */
export const ERA_TREATMENTS = {
  heritage: [
    { w: 5, photo: true, medium: 'studio photograph on 120 film, warm dye-transfer colour, soft vignette', composition: 'classic centred portrait framing, subject filling two thirds of the frame' },
    { w: 4, medium: 'painted illustration in gouache on board, visible brush texture', composition: 'flat poster illustration, no perspective, filled frame' },
    { w: 4, medium: 'offset lithograph with visible halftone rosette and slight colour misregistration', composition: 'bold flat shapes, wide margins, one dominant form' },
    { w: 3, photo: true, medium: 'documentary black-and-white 35mm photograph, coarse grain, printed hard', composition: 'candid framing, subject off-centre, generous empty space' },
    { w: 3, abstract: true, medium: 'modernist graphic design in flat cut-paper shapes', composition: 'strict grid, large flat colour fields' },
    { w: 2, photo: true, medium: 'hand-tinted photograph, colour applied over monochrome', composition: 'centred, formal, symmetrical' },
  ],
  classic: [
    { w: 5, medium: 'airbrushed illustration with glossy highlights and gradient blends', composition: 'monumental centred subject, low horizon, dramatic scale' },
    { w: 4, photo: true, medium: 'hard-flash colour photograph, deep black shadow, slight over-exposure', composition: 'snapshot framing, subject centred, background falling away' },
    { w: 4, medium: 'photocopied high-contrast collage with torn edges and visible tape', composition: 'chaotic layered collage, deliberately crude' },
    { w: 3, photo: true, medium: 'duotone photograph printed over a flat solid colour block', composition: 'photograph occupying two thirds, wide flat colour band, strong asymmetry' },
    { w: 3, medium: 'early digital compositing with visible layer edges, chrome and lens flare', composition: 'stacked geometric arcs, central emblem' },
    { w: 2, photo: true, medium: 'long-exposure photograph with heavy bloom and lens diffusion', composition: 'abstracted, subject barely legible, edge-to-edge softness' },
  ],
  digital: [
    { w: 5, medium: 'glossy CGI render with ray-traced reflections and studio HDRI lighting', composition: 'single hero object floating on a smooth gradient ground' },
    { w: 4, photo: true, medium: 'desaturated minimal photograph, cool cast, lots of empty space', composition: 'subject small and off-centre, vast negative space' },
    { w: 4, medium: 'clean vector illustration, flat colour, no texture, crisp edges', composition: 'centred emblem, generous margin, perfectly symmetrical' },
    { w: 3, photo: true, medium: 'HDR photograph with heavy clarity and saturated local contrast', composition: 'wide view, deep depth of field, everything sharp' },
    { w: 3, abstract: true, medium: 'macro photograph of a surface at extreme magnification', composition: 'abstract full bleed, no recognisable scale' },
    { w: 2, photo: true, medium: 'photographic composite with soft shadow layering, magazine retouching', composition: 'subject cut out and floated over a flat field' },
  ],
  contemporary: [
    { w: 5, medium: '3D render with soft global illumination and matte clay materials', composition: 'a single object floating in an infinite seamless ground, long soft shadow' },
    { w: 4, medium: 'digital collage of cut-out photography over scanned paper texture', composition: 'layered and deliberately flat, elements overlapping at odd scales' },
    { w: 4, photo: true, medium: 'staged surreal still life, crisp studio lighting, uncanny scale relationships', composition: 'object dead centre, hard directional shadow, seamless backdrop' },
    { w: 3, photo: true, medium: 'hyperreal close-up photograph with phone-camera immediacy and slight distortion', composition: 'extreme crop, subject pressed against the frame' },
    { w: 3, abstract: true, medium: 'risograph print in two spot inks, visible grain, overprint where they cross', composition: 'bold flat shapes, limited palette, halftone texture throughout' },
    { w: 3, abstract: true, medium: 'generative abstraction, fluid gradient mesh, no depicted object', composition: 'non-representational, full bleed, edge-to-edge colour' },
    { w: 2, photo: true, medium: 'sculptural or textile object photographed under raking light', composition: 'tactile, close, shallow depth of field' },
  ],
}

/**
 * How often a genre deliberately apes an older era. Real 2024 records ape 1972
 * sleeves all the time — but a techno record almost never does, and an
 * analog-revival record almost always does. That is the whole conceit.
 */
export const RETRO_BIAS = {
  'analog-revival': 0.92, dub: 0.55, bossa: 0.45, cumbia: 0.45, soul: 0.4,
  funk: 0.4, americana: 0.38, folk: 0.35, 'spiritual-jazz': 0.35, jazz: 0.3,
  'post-punk': 0.3, punk: 0.3, 'singer-songwriter': 0.28, shoegaze: 0.25,
  'dream-pop': 0.22, metal: 0.22, rock: 0.2, 'hip-hop': 0.18, latin: 0.25,
  rnb: 0.12, house: 0.15, 'indie-rock': 0.15, downtempo: 0.15, afrobeat: 0.3,
  ambient: 0.1, 'modern-composition': 0.08, techno: 0.06, electronic: 0.1,
  experimental: 0.12,
}

// ---------------------------------------------------------------------------
// Axis 2 — genre voice (the WHAT)
// ---------------------------------------------------------------------------
// Subjects deliberately mix registers: landscape, object, figure, architecture
// and pure abstraction. The old version was almost entirely landscape and
// figure, which is a large part of why everything felt the same.

export const GENRE_VOICE = {
  folk: { palette: 'desaturated ochre, moss green, bone white, overcast grey', subjects: ['a lone figure at the edge of a winter field', 'a bare hedgerow against low white sky', 'a stone wall and wet grass', 'cut wheat bound with twine', 'an empty wooden chair in a bare room', 'overlapping circles in earth pigment'] },
  americana: { palette: 'dust red, faded turquoise, cream, asphalt grey', subjects: ['an empty diner parking lot at noon', 'a screen door and porch light', 'telephone poles receding into heat haze', 'a chrome bumper reflecting sky', 'a folded road map', 'stacked horizontal bands like a desert horizon'] },
  'singer-songwriter': { palette: 'warm greyscale with sepia in the shadows, one muted accent', subjects: ['a close portrait looking away from camera', 'a figure seated by a window', 'an unmade bed', 'a hand resting on a table', 'a single glass of water', 'a soft vertical gradient'] },
  'dream-pop': { palette: 'bruised violet, teal shadow, hot magenta bloom, deep blue-black', subjects: ['blurred flowers at night', 'a figure dissolving into fog', 'light through a curtain', 'hair underwater', 'a bloom of coloured smoke', 'overlapping translucent ovals'] },
  shoegaze: { palette: 'washed pink, acid white, cool grey-green', subjects: ['a motion-blurred crowd', 'a face doubled by exposure', 'streetlight streaks', 'a smeared field of colour', 'a wall of static', 'a single soft white circle'] },
  'indie-rock': { palette: 'flash white, cheap yellow, dark green, exit-sign red', subjects: ['a badly photographed kitchen', 'an empty stage after load-out', 'a car park at night', 'a stack of amplifiers', 'a folding table and two chairs', 'a hand-drawn scrawl of shapes'] },
  rock: { palette: 'oxblood, smoke grey, brass, hard black', subjects: ['a drum kit lit from one side', 'a cracked windscreen', 'a stadium roof from below', 'a leather jacket on a hook', 'a fist of crumpled foil', 'a bold diagonal split of two colours'] },
  'post-punk': { palette: 'cold grey with one hard accent, two colours only', subjects: ['a brutalist stairwell', 'industrial signage geometry', 'a severe architectural corner', 'a chain-link shadow', 'a single black rectangle offset on a field', 'a wireframe grid in perspective'] },
  punk: { palette: 'pure black, newsprint white, one screaming spot colour', subjects: ['a defaced official photograph', 'a tower block', 'a torn poster wall', 'a safety pin at macro scale', 'crude geometric ransom shapes', 'a spray-paint blot'] },
  metal: { palette: 'obsidian, blood red, cold silver, sulphur', subjects: ['a volcanic ridge under storm', 'a cathedral of black rock', 'an eclipse over water', 'an anatomical skull rendered in stone', 'a burning geometric sigil', 'a shattered mirror'] },
  jazz: { palette: 'deep navy or oxblood with cream, one flat colour block', subjects: ['a musician in profile lit from one side', 'a rehearsal room chair and stand', 'smoke in a stage light', 'a brass bell in extreme close-up', 'a city window at 2am', 'three offset rectangles'] },
  'spiritual-jazz': { palette: 'saffron, deep indigo, burnt orange, gold', subjects: ['a sun disc over water', 'concentric hand-drawn rays', 'a figure with arms raised in silhouette', 'a mandala of interlocking shapes', 'a lotus rendered geometrically', 'nested circles radiating outward'] },
  ambient: { palette: 'pale ice blue, warm grey, faint pink, near-white', subjects: ['an empty pale sky', 'still water at dawn', 'a single gradient wash', 'frost on glass', 'a horizon that is almost not there', 'a soft field of nothing'] },
  'modern-composition': { palette: 'white, graphite, one muted accent', subjects: ['one piano string in macro', 'a folded sheet of paper', 'a plumb line against plaster', 'a single tuning fork', 'a thin black line bisecting white', 'a stack of translucent planes'] },
  electronic: { palette: 'ultramarine, silver, black, one acid highlight', subjects: ['a circuit trace at macro scale', 'a mirrored sphere', 'stacked translucent planes', 'a cable coiled precisely', 'an oscilloscope waveform', 'interlocking extruded shapes'] },
  house: { palette: 'electric blue, chrome, hot orange, black', subjects: ['a city skyline abstracted into bands', 'a chrome sphere', 'stacked geometric arcs', 'a dancefloor from above', 'a sunburst of radiating lines', 'a glossy liquid drop'] },
  techno: { palette: 'gunmetal, black, one cold accent — cyan or acid green', subjects: ['a machined aluminium surface', 'a technical schematic without labels', 'a grid of drilled holes', 'a rubber gasket at macro scale', 'a repeating extruded lattice', 'a single perfect circle on grey'] },
  downtempo: { palette: 'sodium orange, wet black, muddy green', subjects: ['a rainy window at night', 'a corridor lit by one bulb', 'headlights through fog', 'an empty swimming pool', 'a blurred neon sign', 'a slow horizontal smear'] },
  dub: { palette: 'green, gold, red and black, printed slightly off-register', subjects: ['a mixing desk drawn loosely', 'a lion rendered flat and graphic', 'a sound system stack', 'a spool of tape', 'concentric ripples', 'a bold radiating starburst'] },
  soul: { palette: 'warm brown, gold, deep burgundy, cream', subjects: ['a portrait in a velvet chair', 'hands on a piano lid', 'a figure in silhouette against warm light', 'a single rose on fabric', 'a curtain of gold beads', 'soft concentric warm bands'] },
  funk: { palette: 'hot pink, gold, purple, deep orange', subjects: ['a band in coordinated outfits', 'a chrome starburst', 'a stage lit in colour gels', 'a platform boot at low angle', 'a mirrorball fragment', 'dense overlapping circles'] },
  afrobeat: { palette: 'chrome yellow, deep green, vermilion, black', subjects: ['a horn section rendered flat and graphic', 'a crowd of dancers as pattern', 'a painted portrait', 'a woven textile at macro scale', 'repeating adinkra-like geometry', 'a bold interlocking pattern'] },
  'hip-hop': { palette: 'concrete grey, brick red, sodium yellow, deep shadow', subjects: ['a stoop at dusk', 'a subway platform', 'a portrait against brick', 'a pair of sneakers on a wire', 'a fire escape from below', 'a bold graphic monogram shape'] },
  rnb: { palette: 'ivory, champagne, deep plum, silver', subjects: ['a portrait behind wet glass', 'silk fabric in motion', 'a close crop of a shoulder and jaw', 'a glass of something cold', 'a satin ribbon coiled', 'a soft pearlescent gradient'] },
  latin: { palette: 'terracotta, cobalt, marigold, whitewash', subjects: ['a tiled courtyard', 'a street band at golden hour', 'painted shutters', 'a ceramic vessel', 'papel picado geometry', 'bold repeating tile pattern'] },
  bossa: { palette: 'sand, sea green, sun yellow, white', subjects: ['abstract shapes suggesting waves', 'a beach horizon reduced to bands', 'a single palm shadow', 'a modernist chair on tile', 'interlocking curved shapes', 'a thin horizon line on cream'] },
  cumbia: { palette: 'hot orange, turquoise, lime, magenta', subjects: ['dancers as flat repeating pattern', 'tropical foliage drawn boldly', 'an accordion rendered graphically', 'a striped awning', 'a bold floral repeat', 'concentric hot-coloured rings'] },
  experimental: { palette: 'monochrome with one chemical stain of colour', subjects: ['light leaked onto photographic paper', 'a scanned crumpled surface', 'interference patterns', 'a decayed magnetic tape', 'an unresolvable form', 'pure noise resolving into structure'] },
  'analog-revival': { palette: 'yellowed cream, faded brown, dust grey, warm amber', subjects: ['a stack of second-hand records', 'a turntable platter in raking light', 'a faded paper inner sleeve', 'a cassette with a handwritten label', 'ring wear on cardboard', 'a worn corner and tape repair'] },
}

export const DEFAULT_VOICE = GENRE_VOICE.folk

// ---------------------------------------------------------------------------

const pickW = (rand, items) => rand.weighted(items, (x) => x.w)

/**
 * Build an art direction. `year` is what makes this work — without it every
 * record in a genre gets the same decade, which is exactly the bug this
 * replaces.
 */
export function artDirection(rand, genreSlug, { year = null, kind = 'album' } = {}) {
  // A press shot is a photograph. Album-cover treatments — risograph, vector,
  // 3D render, collage — are wrong for an artist portrait or hero banner, and
  // the `kind` was previously ignored when picking a medium.
  const wantsPhoto = kind === 'artistPortrait' || kind === 'artistHero' || kind === 'curatorPortrait'
  const voice = GENRE_VOICE[genreSlug] ?? DEFAULT_VOICE
  const nativeEra = year ? eraForYear(year) : 'contemporary'

  // Deliberate period homage — common in some scenes, near-absent in others.
  // Revivals reach back to eras with a strong visual identity — the 60s/70s
  // sleeve and the 80s/90s sleeve. Almost nobody deliberately apes 2007.
  const retro = rand.chance(RETRO_BIAS[genreSlug] ?? 0.15)
  const revivable = ERAS
    .filter((e) => e.to < (year ?? 2026) && e.key !== nativeEra)
    .map((e) => ({ key: e.key, w: e.key === 'heritage' ? 5 : e.key === 'classic' ? 4 : 1 }))
  const era = retro && revivable.length ? rand.weighted(revivable, (x) => x.w).key : nativeEra

  const all = ERA_TREATMENTS[era] ?? ERA_TREATMENTS.contemporary
  const pool = wantsPhoto ? (all.filter((t) => t.photo).length ? all.filter((t) => t.photo) : all) : all
  const treatment = pickW(rand, pool)

  return {
    genre: genreSlug,
    year,
    era,
    eraLabel: ERAS.find((e) => e.key === era)?.label ?? era,
    isPeriodHomage: era !== nativeEra,
    medium: treatment.medium,
    composition: treatment.composition,
    abstract: !!treatment.abstract,
    subject: wantsPhoto ? rand.pick(PEOPLE[kind]) : rand.pick(voice.subjects),
    palette: voice.palette,
  }
}

// A press shot has a person in it. The genre voice still drives palette, era
// and medium; only the subject swaps.
const PEOPLE = {
  artistPortrait: [
    'a musician in their late twenties looking just past the camera',
    'a musician seated, chin resting on one hand, half in shadow',
    'a musician mid-laugh, eyes closed, shot from slightly above',
    'a musician in profile against a plain wall',
    'a musician holding their instrument case, deadpan',
  ],
  artistHero: [
    'a musician alone on a small stage, one lamp on',
    'a musician walking away down a wet street, back to camera',
    'a musician in a rehearsal room, cables everywhere, window light',
    'a band of three standing far apart in an empty car park',
    'a musician leaning on a van, road behind them',
  ],
  curatorPortrait: [
    'a record collector in their thirties in front of a wall of shelves',
    'a person listening on headphones, eyes down, natural light',
    'a person holding a record sleeve, looking at the camera',
    'a person at a café table with a notebook and a coffee',
    'a person in a doorway, arms folded, faint smile',
  ],
}

const NEGATIVE = 'No text, lettering, typography, watermarks, logos or signatures anywhere in the image.'

const FRAMES = {
  album: 'Album cover artwork, square format.',
  artistHero: 'Wide editorial artist banner photograph, cinematic.',
  artistPortrait: 'Artist portrait, square, suitable for a circular crop.',
  curatorPortrait: 'Portrait of a music curator, square, suitable for a circular crop.',
  playlist: 'Playlist cover artwork, square format, evocative rather than literal.',
  genreTile: 'Genre browse tile image, wide, atmospheric, subject small in frame.',
}

export function buildPrompt(dir, kind = 'album', { text = null } = {}) {
  const parts = [
    FRAMES[kind] ?? FRAMES.album,
    // "sleeve" is album language; a press shot or a browse tile is not a sleeve.
    (() => {
      const noun = kind === 'album' ? 'sleeve'
        : kind === 'playlist' ? 'cover'
        : kind === 'genreTile' ? 'image'
        : 'press image'
      return dir.isPeriodHomage
        ? `A ${dir.year} ${noun} deliberately styled after ${dir.eraLabel}.`
        : `A ${dir.eraLabel} ${noun}.`
    })(),
    `Medium: ${dir.medium}.`,
    dir.abstract
      ? `Not a depiction — an abstract composition that only distantly evokes ${dir.subject}.`
      : `Subject: ${dir.subject}.`,
    `Palette: ${dir.palette}.`,
    `Composition: ${dir.composition}.`,
  ]
  parts.push(
    text
      ? `Render the words "${text}" in period-appropriate type, correctly spelled, integrated into the design.`
      : NEGATIVE
  )
  return parts.join(' ')
}

export const ASPECT = { album: '1:1', artistPortrait: '1:1', curatorPortrait: '1:1', playlist: '1:1', artistHero: '16:9', genreTile: '16:9' }

export const MODELS = { imageOnly: 'google-nano-banana-2', withText: 'recraft-v4-1', hero: 'flux-2-pro' }

export function paperGenUrl(prompt, kind = 'album', { text = null, model = null } = {}) {
  const m = model ?? (text ? MODELS.withText : kind === 'artistHero' ? MODELS.hero : MODELS.imageOnly)
  return `paper-gen://${m}?prompt=${encodeURIComponent(prompt)}&aspect_ratio=${encodeURIComponent(ASPECT[kind] ?? '1:1')}`
}
