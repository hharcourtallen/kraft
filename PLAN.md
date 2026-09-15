# Overflow FM — consolidation plan

Written 2026-09-04 after a full scan of the Paper file (UI page, experiments page,
API map) and this repo. Decisions taken in that session are recorded in §0; they
are not up for re-discussion inside this plan, only in a new one.

---

## 0. Decisions already made

| Question | Decision |
|---|---|
| Product model | **Curation-first, playback stays.** Curators, lists and notes are the primary objects. Home is a feed of what curators put on the shelf. Player, queue and Now Playing remain. |
| Scope | Improve what is needed, complete what is missing, keep it simple. This is an education/showcase build, not product scale. |
| Platform | **Desktop only** (1440) for this pass. Existing mobile artboards stay on the canvas untouched, labelled deferred. Mobile is derived later. |
| Visual system | **One system, themed.** Plum (mist + slate) becomes the first theme. The Control Surface greys become the second theme so nothing is thrown away. |
| Theme mechanics | **Semantic layer + swappable primitives.** Screens reference semantic tokens only. A theme is a set of primitive ramps. Switching a theme rewrites the ramps; the whole canvas re-skins. |
| Mode axis | **Every theme ships dark + light.** Mode stays a suffix (`-light`) because both modes must be visible on the canvas at once. |
| Canvas | **UI page stays flat**, organised in labelled rows. No new pages. |
| Web app | **Scoped in this plan**, not built yet. Next.js, static API, theme switcher. |
| Cleared without asking | Delete duplicate Desktop Home Dark; delete the four Tidal reference frames; rescale all numbers to canon; generate artwork through Paper (spends generation usage). |
| Not cleared | Renaming the five real-world name collisions (Milo Crane, Vinyl Jones, The Collectors, Needle Drop, *Overgrown*). They stay, validate keeps reporting them. |

---

## 1. What the scan found

### Canvas (UI page, 26 artboards)
- **Screens present:** Desktop Home, Playlist, Artist, Now Playing × dark/light; Mobile Home, Playlist, Library, Now Playing, Search × dark/light; an Artist stress test; two Playlist artwork cards.
- **Duplicates:** two identical "Desktop / Home — Dark". The one in the dark row (y ≈ -478) is the keeper; the isolated one above it (y ≈ -1585) goes.
- **Reference material:** four unnamed 1500px "Frame" artboards are Tidal captures with real artists and real covers. Canon §Legal forbids these leaking; they go.
- **Missing on desktop:** Library, Explore, Curator profile. Desktop nav says *Explore*, mobile says *Search*, and neither Explore nor any curator surface exists anywhere.
- **Tokenisation:** colours are fully tokenised (every text node resolves to `var(--color-…)`). Type sizes are not: desktop screens use 11 / 12 / 13 / 13.5 / 16 / 18 px, none of which is on the token scale (12 / 14 / 17 / 20). Spacing, radii, control heights and icon sizes are literal everywhere.
- **Two colour vocabularies for the same roles:** `bg / bg-raised / bg-overlay / border` (product) and `panel / surface / well / line / primary / panel-muted` (Control Surface, raw hex). Same idea, different names, different values.
- **Layer naming:** desktop screens are almost entirely "Frame". Mobile sections are named.
- **No reuse:** sidebar, track row, cover card, mini player, tab bar and section header are rebuilt per screen. Nothing is a component.
- **Content drift:** Vinyl Sundays has two descriptions, 10 vs 9 tracks, 46 vs 57 min, two different tracklists. Sidebar shows every list as "Sofía Reyes" while `data/playlists.json` already attributes them to six different curators. Listener counts are Spotify-scale (4.2M) where canon says 268K.
- **Foundations artboard** ("One system, two themes") lives on the *experiments* page, not the UI page. It is good and should move to the UI page as row 0.
- **Desktop / Home — Control Surface** (experiments) is a more complete Home than the UI-page one (continue cards, new tracks, artists you follow). It is a useful donor but has an icon-rail sidebar and a "Mixes and radio" shelf that is pure streaming.

### Data layer (this repo)
- Static JSON API is sound: deterministic, raw + display values, artwork briefs on every entity, validate/build/generate loop, API map artboard documents it.
- Shape is streaming-first: `player`, `queue`, `downloads`, `liked-songs`, `monthlyListeners`. Curators exist but only as a list with bios: no profile endpoint, no follows, no notes, no activity.
- `validate` currently reports 14 errors, 60 warnings, 24 notes. Most notes are the design drift above; the errors are the Edge Cases fixture pointing at re-slugged track IDs.
- `schema/` is empty.

---

## 2. Product model for the redesign

**The sentence:** *Overflow is where people who choose records show you what they chose, and why.*

Objects, smallest set that makes it a curation platform:

| Object | Already in data | Change |
|---|---|---|
| **Curator** | yes (9 authored of 34) | becomes a first-class page. Add avatar brief, followers, latest note. |
| **List** (= playlist) | yes | keep the `playlist` id/word in data; UI copy says *list*. Add `note` (rename of `editorial`), keep `followers`, `updated`. |
| **Note** | half (`editorial` string) | a curator's sentence or two on a list. The one thing streaming apps do not have. Shown on List, Curator, Home feed. |
| **Artist / Album / Track** | yes | unchanged. Artist gains `onLists` (which curators shelved them) computed at build. |
| **Scene** | in CANON only | promote to data: `scenes.json` with name, city, artistIds, look. Explore is built on scenes + curators. |
| **You** (listener) | yes | add `following: { curatorIds, artistIds, playlistIds }`. Drop `downloadIds`. |

Actions: **Follow** (curator, artist), **Save** (list, album), **Play**. Nothing else. No likes-per-track UI beyond the one system list.

Amber rule holds: amber marks what the system is doing (playing now, updated today). Blue marks what you set (following, saved, shuffle on).

---

## 3. Token architecture

Goal: one vocabulary, two axes (theme × mode), no literal values on any screen.

### 3.1 Colour: primitives (theme-owned, hue-agnostic names)

Rename the ramps so a theme is just a set of values, not a set of names.

| Today | Becomes | Note |
|---|---|---|
| `--color-mist-50…950` | `--color-neutral-50…950` | Plum theme: hue 323. Graphite theme: the Control Surface greys, mapped to the same 50–950 steps. |
| `--color-snow` | `--color-neutral-0` | |
| `--color-slate-200…700` | `--color-accent-200…700` | Plum theme: hue 257.5. |
| `--color-amber-400…700` | `--color-signal-400…700` | Plum theme: hue 75. |
| `--color-ink-900/950` | delete | aliases nobody needs |
| `--color-panel / surface / well / primary / line / panel-muted` (+ `-light`) | delete after migration | Control Surface literals become the Graphite theme's neutral ramp; their roles map onto the semantic set below. |

### 3.2 Colour: semantic (mode-owned, what screens use)

Dark is the base name; light is the `-light` suffix, as today. Eighteen roles, no more.

| Role | Dark → | Light → | Was called |
|---|---|---|---|
| `--color-bg` | neutral-950 | neutral-50 | bg / panel |
| `--color-surface` | neutral-900 | neutral-100 | bg-raised / surface |
| `--color-well` | neutral-800 | neutral-200 | bg-overlay / well |
| `--color-bg-inverse` | neutral-0 | neutral-900 | bg-inverse / primary |
| `--color-hover` | white 6% | black 5% | bg-hover |
| `--color-scrim` | black 40% | black 40% | scrim |
| `--color-text` | neutral-0 | neutral-900 | text / primary |
| `--color-text-muted` | neutral-400 | neutral-600 | text-muted / panel-muted |
| `--color-text-subtle` | neutral-500 | neutral-500 | text-subtle |
| `--color-text-inverse` | neutral-950 | neutral-0 | text-inverse |
| `--color-line` | neutral-800 | neutral-200 | border / line |
| `--color-line-subtle` | neutral-900 | neutral-100 | border-subtle |
| `--color-line-strong` | neutral-700 | neutral-300 | border-strong |
| `--color-accent` | accent-300 | accent-600 | accent |
| `--color-accent-subtle` | accent 15% | accent 12% | accent-subtle |
| `--color-accent-core` | accent-100-ish | accent-100-ish | accent-core (LED centre) |
| `--color-signal` | signal-400 | signal-600 | signal |
| `--color-signal-core` | #FFF4E3 | #FFF4E3 | signal-core |

Shadows stay literal (Paper has no shadow token). Three, from Control Surface: rim, drop, sink. LED glow only in dark mode, only on things that emit.

### 3.3 Type

The screens use 13/14/16/18 and the tokens say 14/17/20. Retune the scale to what a dense product UI needs and what marketing v3 already uses (16/26 body, 40 statement). Ten steps, then stop.

| Token | px | Leading | Use |
|---|---|---|---|
| `--text-micro` | 11 | 14 | caps kickers, table headers only |
| `--text-xs` | 12 | 16 | meta under row titles |
| `--text-sm` | 13 | 18 | sidebar, secondary rows, captions |
| `--text-base` | 14 | 20 | row titles, body in product |
| `--text-md` | 16 | 26 | marketing body, notes |
| `--text-lg` | 18 | 24 | section headings |
| `--text-xl` | 24 | 30 | panel titles |
| `--text-2xl` | 32 | 38 | page titles |
| `--text-3xl` | 40 | 48 | marketing statement, list title |
| `--text-4xl` | 52 | 56 | artist / curator hero |

Delete `5xl`, `6xl`. Weights: Inter 400 / 500, Matter 430 / 570 for display. Nothing bolder (Rams rule from Control Surface). `13.5px` dies.

### 3.4 Space, radius, size

- Spacing tokens exist (4…96). Add `--spacing-11: 44px` for touch height. Every gap, padding and height on screens binds to one.
- Radius: `--radius-sm 4` (thumbnails ≤ 40px), `--radius-md 6` (default: buttons, inputs, cards, art), `--radius-lg 12` (hero art, panels), `--radius-full`. Delete `xs`, `xl`; retune `md` from 10 to 6.
- Control heights: 32 pointer, 44 touch. Icon sizes: 16 inline, 20 nav, 24 transport.

### 3.5 Themes artboard

One artboard, "Themes — Overflow FM", on the UI page. For each theme: the three ramps as swatches with their oklch values, plus the same mini component strip (sidebar item, track row, mini player, follow button) rendered in dark and light. Two themes at launch:

1. **Plum** — the current mist/slate/amber.
2. **Graphite** — Control Surface greys as neutral, slate as accent, amber as signal. This is where the marketing pages already live, so they become "Graphite theme" rather than a second system.

Switching = one `set_tokens` call that rewrites the 20-odd primitive values. Documented on the artboard as the demo move.

---

## 4. Components

Paper has no instances, so a component is a canonical node on the Components artboard that screens **clone** (`x-paper-clone`) and never restyle in place. The rule that keeps the file honest: *if you want to change a component, change it on the Components artboard and re-clone.*

"Components — Overflow FM" artboard, dark and light side by side, eleven entries:

| # | Component | Variants | Notes |
|---|---|---|---|
| 1 | **App shell** | — | top bar (logo, back/forward, search field 480, account), 240px sidebar (Home / Explore / Library + *Your lists*), 89px player bar. Fixed lanes. |
| 2 | **Track row** | default, playing (amber dot), in-context (no album column) | # · art 34 · title/artist · album · duration · save · more. Fixed-width slots. |
| 3 | **Cover card** | 148 shelf, 112 grid | art + title + byline. Used for albums and lists. |
| 4 | **Person** | tile (circle 96), row (avatar 40) | artists and curators share it; meta line differs. |
| 5 | **Section header** | with/without subline, with/without *View all* or paging | |
| 6 | **Button** | primary (inverted), secondary, icon; 32 / 44; rest, hover, pressed, on, disabled | straight from Control Surface §03–04 |
| 7 | **Segmented control** | 2–4 items | Library tabs, All/Albums/Singles |
| 8 | **Note** | on list, in feed | avatar 24 · name · time · 1–3 lines Inter 16/26. The curation object. |
| 9 | **Transport** | bar (player), full (Now Playing) | shuffle/prev/play/next/repeat + progress + volume, Control Surface §05 |
| 10 | **Page hero** | list, artist, curator | image · kicker · title 52 · meta · actions. Same anatomy, different image ratio. |
| 11 | **Empty state** | — | one drawing, one line, one button. Library for a new listener, Explore with no follows. |

Layer names follow `Component / Variant` so `find_nodes` can find them. No other components without a case that two screens share.

---

## 5. Screens (desktop 1440, dark + light = 14 artboards)

| Screen | Status | What changes |
|---|---|---|
| **Home** | rework | Title becomes *This week on the shelf*. Three sections only: (1) **Feed**: lists updated by curators you follow, each a Cover card 148 + Note; (2) **Continue**: the one thing you were playing; (3) **Scenes**: three scene tiles. Drop *Recently added* table, *Popular artists*, greeting copy. Donor: the Control Surface Home on experiments for the continue cards. |
| **Explore** | new | Replaces Search as a destination; search stays in the top bar. Sections: **Curators** (Person tiles, 9 authored + "and 25 more"), **Scenes** (wide tiles with city and look), **Browse** (genre tiles from `/search.browseAll`, moved here). |
| **Library** | new on desktop | Segmented: *Lists · Albums · Artists*. Lists = followed + your own, with curator byline. No Downloads tab. Empty state shown once in a small inset. |
| **List** | tune | Keep layout. Fix drift (one description, 10 tracks, 46 min). Add Note block under the title, curator avatar linking to profile, followers, *Updated 16 Aug*. Track rows become the component. |
| **Curator** | new | Page hero (portrait, kicker *Curator · Mexico City · since 2019*, name, beat), Follow button, **Notes** column (latest three), **Lists** grid, *Also follows* row. |
| **Artist** | tune | Rescale numbers to canon (268K, 3.2M plays). Add **On lists by** row (Person rows of curators, from `onLists`). Discography from stress board. |
| **Now Playing** | tune | Add context line *From Vinyl Sundays · Sofía Reyes*. Queue rows become Track row in-context variant. Transport becomes the component. |

Light versions are made by duplicating the finished dark artboard and swapping the semantic tokens to `-light` with `find_nodes` + `update_styles`, never by hand. Existing light artboards are replaced, not patched.

Mobile: the ten existing mobile artboards stay in their rows, renamed with a *(deferred)* suffix. Nothing else.

---

## 6. Data layer changes

Keep the static folder. Changes are small and all in `data/` + `scripts/build.mjs`.

### data/
- `curators.json`: add `avatar` (artwork brief kind `curatorPortrait`), `followers`, `listIds` (derived at build), keep `bio`, `beat`, `city`, `since`.
- `playlists.json`: rename `editorial` → `note`; every list has one (write the missing ones, one to two sentences, spoken register).
- `scenes.json` (new): `id, name, city, labelId, artistIds, look` for Analog Revival, Blue Hour, Hedgerow + three generated.
- `users.json`: add `following: { curatorIds, artistIds, playlistIds }`; remove `downloadIds`.
- `artists.json`: no change; `onLists` is computed.

### api/ (build output)
| Endpoint | Change |
|---|---|
| `/home` | `shelf[]` (feed: `{ playlistId, curatorId, note, updated }` for followed curators, newest first), `continue` (from player), `scenes[]`. Remove `recentlyAdded`, `popularArtists`. |
| `/explore` | new: `curators[]`, `scenes[]`, `browse[]` (moved from `/search`). |
| `/library` | tabs `lists / albums / artists`; lists carry `curator`. Downloads removed. |
| `/curators/{slug}` | new: profile, `lists[]`, `notes[]` (list notes, newest first), `following[]`. |
| `/playlists/{slug}` | `note` instead of `editorial`. |
| `/artists/{slug}` | add `onLists[]: { playlistId, curatorId }`. |
| `/player`, `/search` | unchanged except `browseAll` leaves `/search`. |
| `/` | counts gain `scenes`, `notes`. |

### scripts/
- `validate`: add checks — every list has a `note`; every curator referenced by a list exists; `following` ids resolve; drift report compares canvas numbers to canon (exists).
- `artwork-prompts`: add `curatorPortrait` kind. Add `--write-back <slug> <path>` so an exported Paper image path lands in `image`.
- Fix the 14 Edge Cases errors (re-slugged track ids) as part of the same pass.
- `schema/`: write one `.d.ts` or JSON schema per entity so the app has types. Small, but it is the thing that makes "import api/ directly" true.

---

## 7. Artwork

The canvas today uses stock photographs. They look fine but every cover is a landscape or a still life, which is the sameness CANON §Artwork was written to fix. Regenerate through the brief system so era and genre actually vary.

Budget, all desktop-visible entities only:

| Kind | Count |
|---|---|
| Album covers on screens | ~16 |
| List covers | 14 |
| Curator portraits | 9 |
| Artist portraits + heroes | 6 + 6 |
| Scene / browse tiles | ~12 |
| **Total** | **~63**, in batches of ≤10 per `write_html` |

Workflow: an "Artwork — contact sheet" artboard on the UI page, one row per kind, generated from `npm run artwork -- --kind … --format html`. Export each to `public/artwork/{kind}/{slug}.png`, write the path back into `data/` so the web app and the canvas share one source. Keep a few of the existing stock photos where they already carry a screen (Vinyl Sundays gramophone) so the canvas never goes blank mid-migration.

---

## 8. Canvas layout (UI page, flat)

Rows, top to bottom, 1440 wide artboards with 160px gutters, 400px between rows:

```
Row 0  Foundations · Themes · Components · API map (cloned from its page)
Row 1  Desktop — Dark:   Home · Explore · Library · List · Curator · Artist · Now Playing
Row 2  Desktop — Light:  same seven
Row 3  Stress:           Artist stress · List edge cases (moved from experiments)
Row 4  Artwork contact sheet
Row 5  Mobile (deferred): existing ten artboards, untouched
```

Removed: the duplicate Desktop Home Dark, the four Tidal frames. Left on experiments: marketing v1–v3, Control Surface docs, tactile buttons.

---

## 9. Web app (scope only)

- **Stack:** Next.js App Router, static export, zero backend. `api/` copied into `public/api/` at build; pages fetch JSON at build time.
- **Routes:** `/` (Home), `/explore`, `/library`, `/lists/[slug]`, `/curators/[slug]`, `/artists/[slug]`, `/now-playing`. Seven, matching the seven artboards.
- **Theming:** `get_tokens format:"css"` emits `:root`. Primitives live under `[data-theme="plum"]` / `[data-theme="graphite"]`; semantics under `[data-mode="dark"]` / `[data-mode="light"]`. Switcher in the account menu. This is the same two-axis model as the canvas, which is the teaching point.
- **Components:** one file per Components-artboard entry, header comment cites the Paper node name. Values come from `get_jsx` / `get_computed_styles`, never from screenshots.
- **State:** follow/save/play in `localStorage`. Audio is a silent 30s buffer so the transport actually moves.
- **Footer:** the canon disclaimer, verbatim.
- **Deploy:** Vercel or GitHub Pages. "Fake but live."

---

## 10. Sequence

Each phase ends with a screenshot review and `npm run validate` clean of new errors.

| Phase | Work | Output |
|---|---|---|
| **0 Hygiene** | Delete dupe + Tidal frames. Move Foundations, stress boards to UI page. Lay out rows. Rename desktop layers to `Screen / Section`. | Clean canvas, nothing lost |
| **1 Tokens** | Rename ramps, add semantic set, retune type/radius, migrate every literal (`find_nodes` → `update_styles`), delete retired tokens. Themes artboard with Plum + Graphite. Update Foundations copy. | Zero literal colours/sizes on desktop screens |
| **2 Components** | Components artboard, eleven entries, dark + light. | Source of truth for screens |
| **3 Data** | §6 changes, rebuild, validate, fix Edge Cases errors, write missing notes. Update API map artboard. | `api/` at v0.2 |
| **4 Screens dark** | Home rework, Explore, Library, Curator new; List, Artist, Now Playing tuned. Canon numbers everywhere. Clone from Components only. | 7 dark artboards |
| **5 Screens light** | Duplicate + token swap. | 7 light artboards |
| **6 Artwork** | Contact sheet, ~63 images in batches, export, write back. Swap into screens. | Covers that vary by era and genre |
| **7 App scaffold** | Next.js skeleton, token CSS, two routes live (Home, List), theme switcher. | Something to open in a browser |

Phases 1–3 are independent of each other and can run in parallel. 4 needs 1–3. 6 can start any time after 3.

---

## 11. Open items (not blocking)

- **Name collisions** stay until you decide: Milo Crane, Vinyl Jones, The Collectors, Needle Drop, *Overgrown*.
- **Word choice:** UI says *list*, data says `playlist`. Fine for now; if it grates in the app, the rename is one build-script pass.
- **Graphite theme accent:** Control Surface kept slate + amber. If Graphite should feel more distinct, give it its own accent hue when the Themes artboard is built.
- **Type scale retune** (§3.3) changes marketing page body from 17 to 16 and section headings from 20 to 18. Marketing v3 already uses 16 so the change is toward what exists, but it is the one token decision that touches pages outside this plan.

---

## 12. Progress log

### 2026-09-04 · session 1

**Phase 0 — done.** Duplicate Desktop Home Dark and the four Tidal reference frames deleted. Foundations and the List edge-case board moved from experiments to the UI page. Rows laid out: row 0 at y −3200 (Foundations, Themes, Components), dark desktop at y −478, light at y 822, stress at y 2122, mobile (deferred) at y 4600 / 5560. Desktop top-level layers renamed (Top bar, Body, Sidebar, Main, Player bar). Mobile artboards suffixed *(deferred)*. Playlist screens renamed *List*.

**Phase 1 — done on the UI page.**
- Ramps renamed hue-agnostic: `neutral-0…950`, `accent-200…700`, `signal-400…700`. Semantic set renamed to the §3.2 vocabulary (`surface`, `well`, `line`, `hover`…). Deprecated `ink-*`, `radius-xl`, `text-5xl/6xl` and their leadings deleted. Control Surface literals parked as `--color-cs-*` (see 1b).
- Type scale retuned to §3.3. `--text-md` 16/26, `--spacing-11` 44, `--spacing-0-5` 2 added. Radius now sm 4 / md 6 / lg 12 / full.
- Every literal font size, line height, radius, gap and padding on the four dark desktop screens is token-bound. Light desktop screens were left alone; phase 5 replaces them.
- Foundations artboard updated (ten-step type, radius row, surface/well naming, Matter 570 ceiling). Themes artboard built: Plum (live-bound swatches) and Graphite (literal values), plus the switching note.
- API map artboard rebound from `cs-*` to semantic tokens.

**Gotcha worth knowing:** renaming a token with `set_tokens newName` does not refresh aliases inside *other* tokens. Re-setting the alias to the new name is a silent no-op. The fix is to bounce the alias through a literal in one sequential call. Recorded in memory.

**Phase 1b — open.** The marketing v1–v3 pages and the Control Surface docs on the experiments page still bind to `--color-cs-*` (about 200+ nodes). Rebinding them to semantic tokens makes them re-skin with the active theme, which means they will render Plum on the canvas until the Graphite switch is demonstrated. Do this after the screens, and delete the `cs-*` tokens at the end.

**Housekeeping found:** Page 4 holds a stale *Desktop / Playlist — Light*; Page 3 holds 59 loose nodes; Snapshot is empty. Left untouched, yours to delete.

### 2026-09-04 · session 2

**Phase 1b — done.** All nine experiments-page artboards (Marketing v2 light ×4, Marketing v3 dark ×4, Home — Control Surface) and the one stray label on the API map are rebound to the semantic set: `cs-panel→bg`, `cs-surface→surface`, `cs-well→well`, `cs-primary→text` / `bg-inverse` (by property), `cs-line→line`, `cs-muted→text-muted`, text on inverted buttons `→text-inverse`; light variants likewise. The twelve `--color-cs-*` tokens are deleted. Those pages now re-skin with the active theme.

**Phases 2–4 — done** (session 1 tail, recorded here). Components artboard built; data layer v0.2 built and validated (curation objects, scenes, following, notes, schema types); the seven dark desktop screens rebuilt on tokens and verified by screenshot.

**Phase 5 — done.** Seven light screens: duplicated from dark, every colour binding swapped to the `-light` semantic (bg, surface, well, line/line-subtle/line-strong, hover, accent-subtle, bg-inverse, text/text-muted/text-subtle/text-inverse; neutral-700→300 and 400→600 for the volume track; LED dots become flat `accent-light`/`signal-light` with no glow). Chrome (top bar, sidebar, player bar) is one hand-drawn light set on Home — inline SVGs bound to `-light` tokens — cloned into the other six with `x-paper-clone`, then the active nav item re-set per screen. In-page icons that stayed dark (Now Playing transport, Artist play/more, Curator more) were redrawn the same way.

**Phase 6 — done.** *Artwork — contact sheet* artboard on the UI page holds 45 paper-gen renders: 12 list covers, 7 scene tiles (16:9), the ten Vinyl Sundays sleeves, Zaya Blue portrait + hero + five sleeves, 9 curator portraits. Model google-nano-banana-2 (hero: flux-2-pro). Portrait briefs were wrong (they inherited the genre *subject*, so a curator "portrait" was a cassette); `scripts/lib/artwork.mjs` now swaps in a person subject for `artistPortrait`, `artistHero` and the new `curatorPortrait` kind, and `build.mjs` uses `curatorPortrait` for curators. Renders exported at 1024p, converted to JPEG in `public/artwork/{album,playlist,scene,artist,curator}/` (12 MB total), keyed in `data/artwork.json`; `data/artwork-paper.json` keeps the matching Paper CDN URL per key so the canvas and the app share one source. Every stock photo on the canvas (all 14 desktop screens, the stress boards, the deferred mobile boards) is rebound to the generated set — 37 stock assets, ~430 nodes. The Vinyl Sundays cover was regenerated once because the first render wrote a track list on the cassette label.

**Phase 7 — scope only**, as agreed. §9 stands.

**Paper notes from this session:** `write_html` takes `targetNodeId`, not `nodeId`. `export` with scale `1024p` lands PNGs in `~/Downloads/<layer name>@1024p.png`; `1024w` silently exports nothing. `get_computed_styles` returns the generated fill URL without image bytes, so it is the cheap way to harvest 45 URLs. `find_nodes` with `styleValue: "*<asset id>*"` on the page root is the way to find every use of one image across artboards.

**Still open:** the four real-name collisions (`npm run validate` reports them); Page 3/4/Snapshot housekeeping; Phase 7 build.

**Phase 7 — first cut built** (`app/`, Vite + React + React Router, plain CSS on Paper tokens). Shell (top bar with theme and mode switches, sidebar, player bar), Home, List and Now Playing; the other four routes are placeholders. Build changes to support it: list details now ship resolved `tracks[]` with `albumArt`, and every index entry (playlists, albums, curators, artists) carries `image`. Matter is not on Google Fonts, so display type falls back to Inter until the font is added locally. Second pass: Explore, Library, Curator, Artist; save/follow state in localStorage; deploy.

**Phase 7 — second pass built.** Explore, Library (three tabs), Curator (notes, also-follows, lists, beat) and Artist (hero, popular, about, on-lists-by, discography) are real pages. Follow state for curators and artists is seeded from `/library.json` and kept in `localStorage`. Build changes: artist details ship resolved `popular[]` (with play counts) and `albums[]`, and each `onLists[]` entry carries `slug`, `image` and the "X opens it / X is track N" caption. All seven routes from §9 exist; still open: deploy target, Matter font file, search.

### 2026-09-10 · homepage

**Marketing / Homepage — Dark** built on the UI page (stress row, right of the contact sheet), 1440 wide, fit-content. Brief: the homepage is a shelf, not a pitch — a logged-out visitor sees what a member sees on Home, minus the chrome. Sections: nav (Curators · Scenes · Pricing · Log in · Start listening), hero (statement "Every list here has someone's name on it." + one 44px Start listening CTA, Log in as text; right field is eight real list covers under "On the shelf this week" with the page's single accent LED), *Who's picking* (fixed-lane directory of the nine named curators: portrait, name, city, beat, lists, following, Follow), *In their words* (three notes verbatim from `data/`, avatar + cover), close ("Follow three people and see what shows up." + CTA), footer with the canon disclaimer. Register is marketing v3: 88px margin, 408 / 32 / 824 axis, Matter 430 at 40/48 (hero), 32/38 (close), 24/30 (sections); Inter 400 16/26 body, 14/22 meta, Inter 500 names/buttons; sentence case; no cards, no pills, no amber. Images are the Paper CDN URLs from `data/artwork-paper.json`. Not in the app yet — a `/welcome` route (logged-out root) is the natural port; everything on the page is already in `api/`.

**Homepage, second round (same day).** Agu's canvas comments on v1: hero has too much jargon; the curator directory "feels stupid", he wants a community-driven curator layer, "more like SoundCloud"; the notes section is boring for a music platform. Two new artboards sit to the right of v1 in the stress row, both with the jargon-free hero "Music, chosen by people. / Follow curators. Hear what they hear." and one CTA:
- **B Stream** — the members' feed as the homepage. Hero card that is actually playing (Sofía · Vinyl Sundays, waveform with played region in accent, 412 listening now). Left rail *People*: nine curators with who-follows-whom from `follows[]` and Follow buttons. Right *The stream*: four posts (update / repost) with the note at 18px, cover, play + chunky waveform, and curator replies underneath. Close + footer cloned from v1.
- **C Stage** — music first. Full-bleed hero on the Zaya Blue hero render with a bottom scrim, 56px statement (above the 44px Matter ceiling, deliberate, pull back if it jars), wide waveform with played region in neutral-0, LED "412 listening now". *Who's on right now*: nine 104px portraits each "playing <list>". *Notes on the record*: one wide waveform with three notes pinned at timestamps. Close + footer cloned.
Waveforms are inline SVG bar sets generated by a tiny seeded script (56 bars for cards, 120 for the wide one); no image assets. **Data implications if either direction is chosen:** an `activity` object (update / repost, timestamp), `replies[]` on notes, `nowPlaying` per curator, and a `timestampSec` on notes for the pinned variant. Replies and "listening now" counts on the canvas are invented placeholders. The three comment threads on v1 are left open for Agu to close.

**Stage chosen; circled back to the UI (same day).** Agu picked C Stage. Two things followed:
- **C Stage v2** artboard (right of C Stage): no photo, dark ground; the hero is the wide waveform itself with three curator notes pinned at timestamps (avatar + accent tick + "Ingrid · 2:14 · …"), the now-playing line under it. *Who's on right now* kept; *Notes on the record* replaced by *This week*, six activity rows (updated / replied at a timestamp / reposted / started following). Close + footer cloned.
- **Product UI.** Components gained **12 · Waveform** (scrubber and pinned variants, dark + light). Now Playing dark + light: the 4px progress bar is now the 400×32 waveform with Sofía's note pinned at 0:38 and the note line beneath. Home dark + light: a *Who's on right now* row (five followed curators, portrait + "playing <list>", "All seven" link) between Continue and the shelf.
- **Data:** `curators.json` gets `nowPlaying` (a playlist id per curator); `playlists.json` gets `notePin { trackId, sec }` on Vinyl Sundays (0:38), Jazz Nights (0:04) and Garden Sessions (6:40). Build resolves `nowPlaying` on curators (index too), `notePin` on list details (track title, label, note, curator name + image) and `home.live[]` for followed curators. Validate unchanged: the four name collisions only.
- **App:** `components/Waveform.jsx` (deterministic bars from the track id, played bars in text colour, unplayed in `--color-track`, pin as accent tick, click to seek); Now Playing uses it and shows the pinned note (clamped to two lines) when the pin's track is the one playing; the player keeps `pin` from the list; Home renders the live row from `home.live` + curator `nowPlaying`.
Open: the marketing pages themselves are not in the app; the Stage's "412 listening now" and the activity rows are still canvas-only placeholders (no `activity` object yet).

**Homepage consolidated and built (same day).** *Marketing / Homepage — Stage final* (right of C Stage v2) is the one to build from: photo hero with the waveform and three pinned curator notes, *Who's on right now*, *This week* (activity), *Scenes* (four tiles), *Three things you can do here*, *The deal* (four hairline rows, no price), close, footer. Built in the app as `/welcome` (`app/src/pages/Welcome.jsx` + `.css`), outside the Shell, linked from the foot of the sidebar. Everything on it is API-driven: the hero plays the real player state (pause/play works, the waveform seeks), pins come from the three lists' `notePin` (drawn as fractions of their own track and staggered when close), *Who's on* from `curators/index` `nowPlaying`, *This week* from the new `data/activity.json` → `api/activity.json` (update / reply-at-second / repost / follow, resolved with names, slugs, images and relative dates), scenes from `scenes.json`, the curator count and disclaimer from `index.json`. "Listening now" is derived (list followers / 200) and labelled as fake-live in the code. `Waveform` gained `pins[]` and a `tone="photo"` variant. The page reads through the theme tokens, so it also renders in light mode even though the canvas is dark-only.

**2026-09-11 · homepage explains itself.** Agu asked the welcome page to say more about how the platform works, give *This week* context, and add headings and data that invite people into a community that shares value. Changes on *Stage final* and in `/welcome`: (1) **What this is** under the hero: "A small library, played by people who talk about it." with a four-sentence explanation and four canon numbers (41,200 albums · 34 curators · 2.4M members / 1.68M listened this month · 70% to artists), all read from `index.json.canon` in the app. (2) **This week on Overflow** is now a split section: a lead-in explaining update / reply-at-a-moment / repost / follow, a weekly tally (`activity.json.thisWeek`, authored at canon scale, the six rows are a sample), and a type lane on each row. Reposts read "put X's list on their shelf". (3) **The deal** became **Who gets what**: three columns, You / The 34 curators / The artists, three lines each. (4) The close carries the membership line: members, monthly listeners, notes this week. Production build passes.

**What this is → bento (2026-09-11).** The section under the hero is now a balanced bento on *Stage final* and in `/welcome`: columns 400 / 400 / 432, rows 176, gap 16. Statement tile spans 2×2 (statement 40/44 + paragraph 18/28); right stack: Albums (41,200) and Curators (34, with eight portraits); bottom row: Members (2.4M, LED "1.68M listened this month"), Artists (70% split bar), Notes at a moment (mini waveform with a pin, 141 this week). Tiles: surface, hairline `line-subtle`, radius 12, padding 24. In the app the grid is CSS grid (`.wl-bento`), numbers from `index.json.canon`, notes count from `activity.json.thisWeek`.

**2026-09-14 · hero strip responsive and centred.** Agu flagged that the hero waveform was a fixed 1264px and the hero content was not centred, so on wide production screens the design floated left. Fix in the app only (the artboard is 1440 and unchanged): `Waveform` gained a `fluid` prop — the strip fills its container (`width: 100%`, SVG `preserveAspectRatio="none"`) and pins are placed by fraction in percent instead of pixels; the hero body and the nav are now centred columns with `max-width: 1440px` and 88px side padding; `.wl-pins` and `.wl-times` follow the strip; sections and the footer use `width: min(1264px, 100% - 176px)`; the bento columns are `400fr 400fr 432fr` and the statement covers flex with `aspect-ratio: 1`; the feed card waveforms are fluid too. Verified by measuring the layout at 1200, 1440 and 1920 (hero strip, pins, sections and bento share one centred column at every width) and visually in a 2168px-wide viewport; console clean.

**2026-09-14 · app body centred.** Same complaint inside the product: on wide screens the page column hung off the sidebar and the edge-to-edge screens sat left. `.page` (Home, Explore, Library, Curator) is now `margin: 0 auto` inside the main column (still 1152 max, fluid below). The edge-to-edge screens keep their 1440 canvas width and centre beyond it: `.list-page` and `.np` get `max-width: 1440px; margin: 0 auto`; on Artist the hero still bleeds the full width but its text aligns to the centred column (`left: max(40px, calc(50% - 720px + 40px))`) and the actions, columns and both sections are capped at 1440 and centred. Verified in a 2182px-wide viewport on Home, List, Now Playing and Artist.

**2026-09-14 · Waveform v2, layered.** Agu asked for a thinner, more polished strip on a precise micro grid, drawn in layers so each aspect can be controlled on its own. Spec on Components *12 · Waveform* (dark + light, scrubber + pinned) and applied to the Stage final hero, both feed cards and the Notes tile: five layers in one box — grid (centre hairline, ruler ticks at 64 tall), unplayed bars, played bars, a 1px playhead that overshoots by 4px, 2px accent pins. Bars are 2px wide on a 4px pitch (6px in the hero), heights snap to 2px, every x is an integer, so nothing lands on a half pixel. Canvas note: Paper drops `position:absolute` on the direct children of a replaced root, so the layer frames are re-pinned with update_styles after each write. App: `components/Waveform.jsx` rebuilt the same way (`pitch`, `ruler`, `playhead`, `fluid` measures its container with a ResizeObserver so the grid stays on whole pixels; `count`/`gap` are gone), `Waveform.css` styles per layer; `/welcome` passes pitch 6 + ruler in the hero and `playhead={false}` on cards and the tile.

**2026-09-14 · geolocated points for the globe.** Agu is designing a new homepage hero: a 3D globe (globe.gl, HTML markers) with bright dots that reveal a track on hover. Data now carries geography: `data/places.json` (97 city centroids with ISO codes, `plc_*` ids, aliases for the "City, ST" hometown form), `placeId` stamped on all nine curators, seven scenes and every artist (all 81 hometowns resolved), and `data/listening.json` (59 points: the nine curators at home on their now-playing list, fifty anonymous members across the world, each on a track from a real list). `scripts/build.mjs` resolves `geo` onto curators, scenes and artists and emits `api/globe.json` — `listeningNow` (2% of monthly actives = 33,600), `points[]` with lat/lng, kind, track + artist (+ album image where one exists), list, curator, `startedSecAgo` and a `label` string for the hover card, and `places[]`. `index.json` lists `/globe.json` and counts places and listening. `scripts/validate.mjs` gained geography checks; `schema/types.d.ts` has `Geo`, `Place`, `GlobePoint`, `Globe`. README and CANON document it. Not yet built: the globe hero itself (canvas reference is the selected frame left of Foundations; the app would add globe.gl to `/welcome`).

**2026-09-14 · globe hero built.** The welcome page hero is now the globe from Agu's reference (globe.gl 2.46, after the html-markers example): `app/src/components/Globe.jsx` mounts `Globe()` on a 1400px square, night-lights texture bundled at `app/public/globe/earth-night.jpg`, transparent background, faint atmosphere, one HTML marker per point in `api/globe.json` (`htmlElementsData`), markers on the far side fade via `htmlElementVisibilityModifier`. A marker is a 10px accent-core dot with the LED glow (12px for curators); hovering it shows a dark card with the track, the artist and "curator · city" (members show only the city). The globe auto-rotates slowly, stops while the pointer is over it, no zoom or pan. Hero copy from the reference: "Connect and discover through music." + Start listening / Log in + the LED line "33,600 listening right now" from `globe.listeningNow`. The hero ground is pinned dark in both modes (a night globe wants night around it); the globe sits in the centred 1440 column, rising out of the top-right and bleeding off the edges. The photo hero, the waveform strip and the pinned notes left the hero; the strip lives on in Now Playing, the feed cards and the tile. Verified in Chrome: dots render on the right cities, hover reveals the card, console clean, production build passes (globe.gl adds ~1MB to the bundle, flagged by Vite's chunk-size warning; a lazy import would split it).

**2026-09-14 · country cards.** Agu drew a card template on the UI page (six 215px frames beside Themes, name set three times over a grey image slot) and asked for a small system to generate the artwork: pixel art of the places that make a city recognisable. Canvas: the six templates completed (the middle names on Spain, Mexico and Argentina still read "… States"; the middle name normalised to x 108 on all six, two were at 116) and four added (Brazil · São Paulo, France · Paris, Ghana · Accra, Norway · Oslo, the four curator countries without a card), all ten laid out in two rows of five at y 932 / 1171, named `Country / <name> · <city>` with `Art`, `Mark`, `Name / ghost|middle|bottom` layers. Repo: `data/countries.json` (16 countries keyed by ISO code, each pointing at a `plc_*` city in the gazetteer, with landmarks and a named palette; six are queued without art), `scripts/lib/place-art.mjs` (template geometry `CARD`, pixel grid `GRID` 108×59, the constant STYLE/TONE/LAYOUT prompt blocks, `countryCardHtml`), `scripts/lib/png.mjs` (zero-dep PNG read/write + the detail-preserving snap), `scripts/country-art.mjs` = `npm run countries`, build emits `api/countries.json` (card, grid, and per country: city, curators and scenes through their place, `metaLine`, image, prompt), validate checks every card draws a city in its own country and notes countries with curators or scenes but no card. App: `components/CountryCard.jsx` (template in card units via container queries, so it scales; art drawn with `image-rendering: pixelated`) and a `/countries` contact-sheet route, not in the nav. Generation: 13 renders on nano-banana-2 (two pilot rounds of two, the second with a v2 prompt that asks for pixels at the grid size and moves the ground to the bottom third, eight, one Oslo redo). Open: the mark on the template says **Kraft**, kept as drawn; the card has no home in the product yet (Explore or the globe hover card are the natural places).

**2026-09-14 · globe marker states + starlight pulse.** Agu asked to expand the globe and its revealing tag: think through the card's states beyond hover, iterate the content, and give the dots a randomised subtle pulse that varies with how close each is to the camera, so the field reads as live. Spec on Components **13 · Globe marker** (dark only — the globe is always night): *idle* (10px accent-core dot with the LED glow; curators wear a 1px ring), *hover* (peek pill: track, artist, who · where), *expanded* on click (296px card: cover or a well when the album has no art, live position on a 248 × 24 mini waveform with times, "Sofía Reyes · on Golden Hour" or "Someone in Jakarta · on Poolside", Play + Open list, close ×; one open at a time, the globe stops turning, Escape or a click outside closes) and *playing* (ring goes solid, Play reads Pause). Pulse: every dot gets its own period (2.4–4.8s) and phase from a seeded random; every 120ms the component computes how squarely each dot faces the camera (dot product of the marker's position and the camera direction, 0 at the horizon, 1 dead centre) and writes it as `--near`; the CSS keyframes scale opacity and size by `--near`, and a brightness filter dims the horizon, so the near side breathes and the edge barely moves. Reduced-motion turns the pulse off. App: `Globe.jsx` builds the markers as DOM (peek + card in one element so globe.gl can move them), the card's strip reuses the Waveform generator, Play loads the list and starts at that track through the player, and the welcome page passes `playingId` back so the marker shows the playing state. Two gotchas hit on the way: React StrictMode remounts the globe, so the points are cloned per mount (three-globe tags each datum with its scene object); and a background tab gets no animation frames, so verification was done by stepping frames and dispatching the events — all states confirmed, build passes.

**2026-09-14 · Kraft, and country lists on Home.** Agu's call: the brand becomes **Kraft** (name and mark from the country card template), and the country cards become lists in the product. *Brand:* on the UI page, 57 text nodes renamed (34 wordmarks, disclaimers, board kickers, marketing copy, the Vinyl Sundays note), wordmarks set to Matter 570 with no tracking as on the template, and the headphone icon replaced by the Kraft mark in all 27 lockups (16px beside 18px words, 19px beside 20px, on whole-pixel grids, `text` / `text-light` fill, gap 6–7px); system boards renamed `Foundations / Themes / Components — Kraft`. Footer wordmarks and the Foundations type specimen stay text-only. The experiments and API map pages, the Paper file name and the repo folder keep the old name. App: logo glyph, wordmark, page title, Welcome copy; build `name` and disclaimer; CANON and README; CANON §Legal records Kraft as a known collision with a real brand. *Country lists:* `countries.json` entries gain `list { curatorId, genres, trackCount, followers, updated, note }`; the build turns ten of them into `pl_country-<slug>` (local artists pinned, genre fill), covers are the cards exported from Paper at 640px, keyed in `artwork.json`. Home gains **Around the world** between the shelf and Scenes on both Home artboards (five card clones, curator + meta, light version with a `line-light` hairline) and in the app (all ten, five across, scrolls; "All ten" → `/countries`, whose cards now link to their lists). Country lists are kept out of the Home feed and the sidebar; curator pages include them. Home dark grew to 1906px, so the light row moved to y 1828, stress to 4130, mobile (deferred) to 5915 / 6875. Curators without a country of their own: Spain goes to Théo (Paris), Argentina and Chile to Luana (São Paulo).

**2026-09-14 · On the shelf this week + Around the world.** Two sections added to the homepage. *On the shelf this week* sits under the bento: the real lists newest-update first (system and stress lists excluded), 194px covers with title and "curator · n tracks", eight in a row that scrolls past the column edge so the seventh peeks. *Around the world* sits after Scenes: the first five drawn country cards from `api/countries.json` (the other session's CountryCard component at 215px), captioned with the card's meta line, each linking to its country list, "All 16" to `/countries`. On the canvas the user's homepage frame already carried the shelf; the Around the world section was added there from clones of the Country card artboards (clones of artboards keep their world position, so the layer frames are re-pinned with position: relative). App verified in Chrome, build passes.

**2026-09-15 · globe cards above the dots.** Hover peeks and open cards were rendering under neighbouring dots: globe.gl's CSS2DRenderer re-sorts markers by camera distance every frame and writes an inline `z-index` on each, and each marker is its own stacking context, so the stylesheet's `z-index: 2` on the hovered marker always lost. `Globe.css` now puts `z-index: 100000 !important` on `.is-open` and `100001 !important` on `:hover` (the only thing that outranks an inline style), and the card ground went from 88% to 96% so a bright dot's glow no longer smudges through. Verified on `/welcome` by hit-testing the dots under an open card and a hover peek (the card wins in every case) and visually; console clean.

**2026-09-15 · Settings, and themes out of the top bar.** Workshopped three Appearance directions as full dark screens — A Rows (two segmented controls), B Matrix (2×2 previews, Plum/Graphite × Dark/Light, plus a follow-system toggle), C Previews (theme cards with a mini Kraft window + a Dark · Light · System control). Agu chose **C**, with Settings **pinned at the sidebar foot** under a hairline (a utility, not a destination). Canvas: *Desktop / Settings — Dark* sits right of Now Playing (x 7641) and *— Light* below it (y 1828); A and B moved to the stress row as *Explore / Settings — … (not chosen)*. The Settings foot is on every sidebar screen, dark and light (Home, Explore, Library, Curator, Artist; List and Now Playing have no sidebar). Settings page = header, Appearance (Theme cards, Mode), Playback (Audio quality: Lossless 24/192, read-only; When a list ends: Stop | Repeat the list). Finding worth keeping: in dark, Plum and Graphite are close at thumbnail size (violet vs steel); the light previews separate them clearly, which is why the previews follow the current mode. App: `/settings` (`pages/Settings.jsx` + `.css`); each preview is a `<span data-theme data-mode>` drawn with the real semantic tokens, so it is the system itself; `theme.jsx` gained a **System** mode (stores the preference, writes the resolved dark/light to `<html data-mode>`, follows `prefers-color-scheme` live); the top-bar Plum/Graphite and Dark/Light switches and `.switch` CSS are gone; `.seg` moved from Library.css to base.css and also styles `aria-checked` radios; `player.setRepeat()` added so the list-end control and the transport's repeat button share one state; Icon gained gear, moon, sun, monitor, check. Verified in Chrome: theme, mode and System apply and persist, the repeat control lights the transport, console clean.

## 13. Consolidation decisions (2026-09-15)

Agu answered two rounds of questions so the project can move into a GitHub repo, live on Vercel, as educational content: an educator must be able to replicate the Paper file, the API, the artwork pipeline and the app from the repo alone, whatever state the project is in. The repo becomes the source of truth from the first commit; the canvas follows it.

| Decision | Choice |
|---|---|
| Name | **Kraft everywhere.** Folder → `kraft`, both package names, token comment, and the older canvas artboards that still read Overflow. |
| Paper half | **Exports checked in + file link.** Commit tokens (JSON + CSS), component JSX from the Components artboard, artboard screenshots and the artwork prompt sets under `paper/`; README carries a duplicable Paper file link. |
| Name collisions | **Rename the four now.** Invented replacements that pass the blocklist and MusicBrainz check; data, canvas text and artwork keys updated; validator green. |
| Repo shape | **One pnpm workspace, `api/` committed.** Root holds `data`, `scripts`, `api`, `paper`; `app/` is a workspace package. One `pnpm install`, one `pnpm build`. Vercel builds the root then the app, output `app/dist`, SPA rewrite to `index.html`. |
| Scope kept | Globe hero + geography, country cards, Graphite second theme. |
| Scope dropped | **Procedural generator + stress cases.** `scripts/generate.mjs`, `lib/names.mjs`, `lib/realism.mjs`, the `--stress` path and stress entries leave the repo (archived locally). Generated catalogue entries already in `data/` stay as a frozen catalogue; the `origin` field remains so they can be identified. |
| Canon | **Community model, money removed.** No paid-curator row, no revenue split, anywhere in canon, data or copy. Numbers rescaled to match. |
| Display font | **Instrument Sans** (Google Fonts). Agu offered Instrument or Google Sans; Google Sans is not on Google Fonts, so it fails replication. Matter leaves canvas tokens and app. |
| Publish | **Public, no license yet.** All rights reserved until decided; disclaimer stays in the footer. |

Sequence: (1) rename + canon rewrite + four artist names, validator green; (2) font swap on canvas tokens and in the app; (3) workspace restructure, root `.gitignore`, `vercel.json`, generator archived; (4) `paper/` exports and the "replicate this" README path; (5) `git init`, first commit, push, Vercel. The folder rename and the workspace change touch the other session's working directory, so they run when that session is idle.

Execution notes from the session that owns the country system (2026-09-15): the other session is idle, so the rename and workspace change are clear. (a) `country-art.mjs` and `place-art.mjs` resolve paths from the repo root, so the folder rename is safe. (b) `place-art.mjs` `MARK` hardcodes `font-family:Matter` for the wordmark; switch it to `var(--font-display)` with the font swap. (c) The ten `public/artwork/playlist/country-*.png` covers have Matter baked in; after the swap, re-export the ten `Country / …` frames at 640p over the same filenames. The pixel art under `public/artwork/country/` has no type. (d) `build.mjs` imports `CANON`, `fmtDuration`, `compactCount`, `groupedCount`, `totalDurationLabel`, `playCountFor` and `validate.mjs` imports `CANON`, `DURATION_BY_GENRE`, `ARTIST_TIERS` from `lib/realism.mjs`; move those into a kept `lib/canon.mjs` before `realism.mjs` is archived. (e) `country-art.mjs --snap` stages under the OS temp dir; nothing to commit.

**2026-09-15 · consolidation executed.** Everything in §13 except the push and the deploy. (1) *Names:* Milo Crane → **Milo Kestrel**, The Collectors → **Second Hand Sound**, Vinyl Jones → **Shellac Jones**, Needle Drop → **Lead-In Groove**, ids and slugs included, in data, scenes, users and on 17 canvas text nodes; stale `nameRisk` blocks dropped; `npm run validate` is green (0 errors). (2) *Canon:* the paid-curator and revenue rows are gone; curation is community, `CANON.curatingMembers = 1,240` (members with a list on the shelf, nine with a byline), `curators.json.totalCurators` follows, Explore formats it; four marketing lines on canvas that said payroll, paid to listen or 70% were rewritten. (3) *Font:* Matter → **Instrument Sans** (Google Fonts): `--font-display` token, display weights 600/700, 103 canvas text nodes that carried Matter as a literal family now bind to the token, `tokens.css`, `index.html`, the wordmark helper in `place-art.mjs`, and the ten country list covers re-exported at 640p. (4) *Generator archived:* `generate.mjs`, `lib/names.mjs`, `lib/realism.mjs` and the stress fixtures (8 artists, 42 albums, 167 tracks, the Edge Cases list) moved to `dev/kraft-archive/`; the shared numbers and formatters now live in `scripts/lib/canon.mjs`; six listening points that pointed at removed tracks were re-pointed inside their lists; scenes dropped the removed artists. (5) *Repo shape:* folder renamed `dev/Overflow.fm` → `dev/kraft`; one pnpm workspace (`pnpm-workspace.yaml`, root lockfile, packages `kraft` and `@kraft/app`); root `.gitignore`, `vercel.json` (pnpm install, `pnpm build`, `app/dist`, SPA rewrite that leaves `api/`, `artwork/`, `globe/`, `assets/` static). (6) *Paper exports:* `paper/tokens.{json,css}`, `paper/components/*.jsx` (get_jsx of the 13 Components entries), `paper/screens/` (23 artboards at 1x), `paper/prompts/` (cover and country prompt sets), `paper/README.md`. (7) README rewritten around a *Replicate this* path. Left as is: the Paper file is still named *Overflow FM* (no MCP call renames a file); the *Overgrown* album title is still an open low-severity collision; six country cards have no art.

**2026-09-15 · pushed.** First commit on `main` at https://github.com/agusegui/kraft (public, no license yet). `paper/components/` holds the 13 `get_jsx` exports. Vercel: not yet connected; import the repo at vercel.com/new and keep the defaults, `vercel.json` carries the build and rewrite settings. After the first deploy, put the URL in the README's *Live app* row.

**2026-09-15 · fix: filled lists were empty.** Agu reported playlists not working on the live site (kraft-paper-fm.vercel.app). Cause: the stress-fixture cleanup earlier today wrote `trackIds: []` onto every playlist, and `build.mjs` fills a list from the catalogue only when `trackIds` is absent, so the twelve affinity-filled lists resolved to zero tracks, locally and in production alike. Fixed by restoring the absent key on those twelve (checked against the pre-cleanup backup); rebuilt `api/`; Jazz Nights 22/22, The Archive 40/40, no shortfall left.
