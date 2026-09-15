# Kraft — canon

The rules the catalogue obeys. Anything generated must satisfy these; anything
authored by hand should too. `npm run validate` enforces most of them.

---

## The product

Kraft is a **curation-first** music service — the inverse of a
catalogue-scale pitch. It is not Spotify with a different colour.

| | |
|---|---|
| Subscribers | **2,400,000** |
| Monthly actives | **1,680,000** (70%) |
| Albums in catalogue | **41,200** — chosen, not ingested |
| Curation | **community.** Anyone who joins can shelve a list and write why; **1,240** members have one on the shelf, nine carry a byline in the product |
| Auto-generated playlists | **one** (Liked Songs), and it is labelled as such |
| Audio | 24-bit / 192 kHz lossless on every plan, no tiering |

Everything in the product should read as a consequence of that positioning.
A playlist has a *person's* name on it. A number is small enough to be real.
The product never talks about money: nobody is paid to curate, and no revenue
split appears in canon, data or copy (decided 2026-09-14).

---

## §Scale — the rule most likely to be broken

**Listener and play figures derive from 2.4M subscribers, never from a
600M-user service.** Numbers borrowed from Spotify screenshots are the single
fastest way to make the demo read as a mockup.

Artist tiers (`scripts/lib/canon.mjs`), and the share of the roster in each:

| Tier | Share of roster | Monthly listeners |
|---|---|---|
| flagship | 1% | 180,000 – 420,000 |
| headline | 5% | 60,000 – 180,000 |
| established | 16% | 18,000 – 60,000 |
| working | 33% | 3,000 – 18,000 |
| tail | 45% | 180 – 3,000 |

Ceilings validate enforces:

- No artist exceeds **35% of monthly actives** (≈588,000).
- No track exceeds **~120 lifetime plays per monthly listener**.
- Followers never exceed monthly listeners.
- No release or career end-date is in the future (current year: **2026**).

### Known drift from the Paper file

The artboards currently show Spotify-scale numbers. Canon rescales them,
preserving rank order. `npm run validate` lists every one as a `design` note.

| Artist | Artboard | Canon |
|---|---|---|
| Dusk Ritual | 5.1M | 384K |
| Felix Drift | 4.8M | 341K |
| Jack Hatfield | 4.2M | 268K |
| Zaya Blue | 3.8M | 231K |
| Elara Cove | 2.9M | 164K |
| Milo Kestrel (was Milo Crane) | 2.1M | 112K |

Zaya Blue's top track goes from 64,201,455 to 3,214,880 plays. Either update
the Paper text to match, or accept the drift knowingly — but do not let it be
an accident.

---

## §Curation — the objects the product is made of

Kraft is not a streaming app with a different colour. The objects, smallest set:

| Object | What it is |
|---|---|
| **Curator** | A member with a list on the shelf, a beat, a city and a start year. Nine are named and carry a byline; 1,240 exist as a count. |
| **List** | A curator's playlist. Data keeps the word `playlist`; the UI says *list*. |
| **Note** | The curator's sentence or two on a list. Every non-system list has one. This is the product; a list without a note is a streaming playlist. `validate` warns. |
| **Scene** | A label, a city, a production approach and a look. `data/scenes.json`. Explore is built on scenes and curators. |
| **Following** | Curators and artists you follow, lists you saved. `users.json → following`. Home is the feed of what the people you follow shelved this week. |

Actions are three: follow, save, play. There is one system list (Liked Songs), labelled as such. There are no downloads, mixes or radio.

The canvas is frozen at **2026-08-25** (`TODAY` in build.mjs) so relative dates never drift.

## §Scenes

The catalogue is organised into scenes, not just genres. A scene shares a
label, a city, a production approach and a look.

**Analog Revival** — The Worn Grooves, Analog Hearts, Oliver Felt, Spinning
Room, Second Hand Sound, Margot & The Spindles, Hiss & Warmth, Shellac Jones,
The Dusty Crates, Lead-In Groove. Mostly on Second Pressing or self-released. Tape,
room mics, visible wear. This scene powers *Vinyl Sundays* and the Now Playing
queue, and exists because the design file already contained it — it was
absorbed into canon rather than discarded.

**Blue Hour** — Zaya Blue, Elara Cove. Coastal dream-pop, close-mic vocals.

**Hedgerow** — Jack Hatfield, Felix Drift, Keane Sol, Petal & Dew. British and
American folk, one room, no click.

---

## §Naming

Generated names must vary along three axes, because real catalogues do:

**Region** — roughly 42% Anglophone, the rest spread across Latin America,
the Nordics, West Africa, Japan, Brazil, France, Germany and the Balkans.
A catalogue that is 100% Anglo names reads as a placeholder.

**Formation** — solo legal name, stage alias, "The X", "X & The Y", compound,
one-word, ampersand duo, collective, initialism. Weighted, not uniform.

**Genre fit** — word pools are keyed to scene register (pastoral, maritime,
nocturnal, analog, mineral, botanical, civic, cosmic). A dub act and a modern
composition act do not draw from the same pool.

Secondary genres come from an explicit adjacency map. "hip-hop /
modern-composition" is not a real artist.

---

## §Strings

The UI must be tested against the strings it will actually meet, not only
comfortable twelve-character ones: a 50-character album title, a one-character
artist name, diacritics, non-Latin script, an all-caps name, an apostrophe, a
`(feat. …)` title long enough to truncate. The procedural generator that seeded
those fixtures left the repo on 2026-09-15 (archived; see PLAN.md §13). The
*Playlist — Edge Cases* and *Artist — Stress* artboards on the canvas keep the
cases visible; `npm run validate` still warns when the longest artist name is
under 28 characters or no name contains non-ASCII.

---

## §Legal

The catalogue is entirely invented. Three rules:

1. **No real artist, release, label or brand names.** `data/real-world-blocklist.json`
   is the deny list; `npm run check-names` queries MusicBrainz live as a
   *negative* filter — MusicBrainz core data is CC0, and we import nothing from
   it, we only ask whether an invented name is already taken.

2. **No real artwork.** Every cover is generated from an art-direction brief in
   `scripts/lib/artwork.mjs`. There is no path in this repo that fetches a real
   album cover.

3. **The disclaimer ships.** `api/index.json` carries it, and the live product
   should surface it in the footer:
   > Kraft is a fictional product. Every artist, release, track, label and
   > curator is invented. Any resemblance to a real recording is unintended.

### Collisions resolved (2026-09-15)

Four artist names confirmed against MusicBrainz on 2026-08-25 were renamed
when the project moved into the repo; the old names stay on the blocklist.

| Was | Collided with | Now |
|---|---|---|
| Milo Crane | exact MusicBrainz artist match | **Milo Kestrel** |
| Vinyl Jones | "Vinyl Jones of Paul Revere" | **Shellac Jones** |
| The Collectors | Canadian band (1966–69); also a Japanese band (1986–) | **Second Hand Sound** |
| Needle Drop | Anthony Fantano's review channel | **Lead-In Groove** |

*Overgrown* (album, James Blake 2013) is still open; suggested Rootwork, Gone to Seed.

`Bloom` and `Quiet Village` are flagged at low severity — common words, real
associations, your call.

**The product name itself.** On 2026-09-14 the brand became **Kraft** (it was
Overflow FM), taking the name and mark from the country card template. Kraft is
a real consumer brand (Kraft Heinz, food) and close to Kraftwerk in music. That
breaks rule 1 knowingly: it was Agu's call, kept on the record here so it stays
a decision rather than an accident. The repo is `kraft` since 2026-09-15; the
Paper file name is unchanged.

---

## §Artwork

Covers move on **two independent axes**. This matters — the first version of the
system had one kit per genre, each locked to a single decade, and the release
year was never passed in at all. Every dream-pop record ever made got a 1990s
4AD sleeve. The whole catalogue read as one uniform vintage mood.

**Genre voice — the WHAT.** Palette and subject register. Stays put, so jazz
keeps feeling like jazz. Subjects deliberately mix landscape, object, figure,
architecture and pure abstraction; the old version was almost entirely landscape
and figure, which is most of why everything looked the same.

**Era treatment — the HOW.** Medium and composition, derived from the album's
actual release year:

| Era | Years | Dominant look |
|---|---|---|
| heritage | ≤1979 | 120 film, gouache, offset litho with halftone rosette, cut-paper modernism |
| classic | 1980–99 | airbrush, hard flash, photocopied collage, duotone over flat colour |
| digital | 2000–14 | glossy CGI, flat vector, desaturated minimalism, HDR |
| contemporary | 2015– | 3D clay render, digital collage, staged surreal still life, risograph, generative abstraction |

Cross the two and a 1962 jazz record and a 2024 jazz record share a palette and
share nothing else. **25 distinct mediums** are in play across the catalogue.

**Period homage.** `RETRO_BIAS` sets how often a genre deliberately apes an
older era — analog-revival 0.92, jazz 0.30, techno 0.06. Revivals target
heritage and classic, weighted 5:4:1, because almost nobody deliberately apes
2007.

**Abstraction.** Treatments flagged `abstract: true` phrase the subject as
*"not a depiction — an abstract composition that only distantly evokes X"*,
so a "no depicted object" medium never gets paired with a literal subject.

**Off-palette, always.** Kraft's chrome is warm plum (hue 323) and slate blue
(hue 257.5). Covers must not use it. The chrome is the product; the covers are
the world, and the contrast is what makes the UI read as a real product rather
than a themed mockup.

**Coverage is enforced.** Every genre in `data/genres.json` must have an entry
in `GENRE_VOICE`. An earlier version was missing `rock` and `electronic`, so
**12.4% of the catalogue silently rendered as folk imagery.**

Covers generate **without text** by default — models garble type. Pass
`{ text: '…' }` to switch to a text-capable model when a wordmark is genuinely
wanted.

**Country cards are the one deliberate monoculture.** Covers vary; the country
cards are a set, so they share one medium (16-bit pixel art, side elevation, one
baseline), one light (high-key midday, nothing darker than a mid tone, because
black 48px type sits on the image) and one grid (108×59, 16 colours, enforced by
the snap, not by the prompt). Only the city changes: its landmarks and a palette
named after real things there. The type is set by the template, never by the model.

---

## §Geography

Places are city centroids from `data/places.json`, two decimals, ISO country codes. A curator lives in one city and listens from it. The globe's *listening now* figure is **2% of monthly actives (33,600)**, derived, never a count of the sample points in `data/listening.json`; that file stays under 200 rows and reads as a sample. Members on the globe are anonymous: a place, a track, a list, no name.
