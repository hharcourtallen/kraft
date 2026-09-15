# paper/ — what the Paper file contains, as files

Exports from the Kraft Paper file (`01KVEA9ZH9NC4H1JMS4CAP1VCP`, page *UI*),
taken 2026-09-15 so the design half of the project can be rebuilt without the
file. The file link is in the root README; duplicating it is the fast path.

| Path | Made with | Use it for |
|---|---|---|
| `tokens.json` | `get_tokens` | `create_tokens` in a new file; names and descriptions verbatim |
| `tokens.css` | `get_tokens format:"css"` | a plain `:root {}` block; `app/src/styles/tokens.css` is this split onto theme and mode axes |
| `components/NN-name.jsx` | `get_jsx format:"inline-styles"` per entry of the *Components* artboard | paste into `write_html` to recreate an entry; read to see how the app components map back |
| `screens/*.png` | `export` at 1x | the targets the app implements: foundations, themes, components, seven desktop screens dark and light, settings, the marketing pages, the artwork contact sheet |
| `prompts/artwork-prompts.md` | `pnpm artwork` | every cover the catalogue wants, as art-direction prose |
| `prompts/country-prompts.txt` | `pnpm countries -- --format urls` | the pixel-city strips, as `paper-gen://` URLs |

## Rebuilding the canvas with MCP

1. `create_file`, then `create_tokens` with the `tokens` array from `tokens.json`.
2. `get_font_family_info` for Inter and Instrument Sans (both on Google Fonts).
3. `create_artboard` 1440 wide, then `write_html` one component entry at a time
   from `components/`. Keep `var(--token)` references; they resolve to step 1.
4. Screens: build from the components (clone with `<x-paper-clone>`), using the
   screenshots as the target and `api/*.json` for every string.
5. Artwork: `write_html` with at most ten `paper-gen://` images per call, from
   `prompts/`. Export finished renders at 1024p and key them in
   `data/artwork.json`.

Canvas conventions worth keeping: the UI page is flat and organised in labelled
rows (Foundations, Themes, Components, Desktop dark, Desktop light, Stress,
Artwork, Mobile deferred); numbers on screens come from `api/`, never typed;
screens use semantic tokens only, so a theme is one `set_tokens` call.
