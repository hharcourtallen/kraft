// Country cards: a typographic template with one pixel-art strip of a city.
//
// The card is Agu's template on the Paper UI page ('Country / …'), measured off
// the canvas. Its type is width-independent, so any country name drops in
// without re-kerning a single offset:
//
//   ghost   — the name upside down in pale grey, pinned at x 83 / y 40 and
//             turned 180° about its own top-left, so it hangs off the top edge
//   middle  — the name starting at the card's centre line, bleeding off right
//   bottom  — the name centred (+8 optical), bleeding off the bottom
//
// The image sits under the lower half. Both black names overlap it, which is
// why the art direction below is high-key with an empty sky and a quiet ground.
//
// Every prompt is STYLE + TONE + LAYOUT + PLACE + NEGATIVE. The first three are
// constant across the series; only PLACE changes. After generation the image is
// snapped to one pixel grid (GRID) and quantised, so AI-drawn "pixel art" with
// uneven pixel sizes ends up on the same grid as every other card.

export const CARD = {
  size: 215,
  ground: '#FFFFFF',
  image: { top: 97, height: 118 },
  type: {
    family: 'var(--font-display)',
    size: 48,
    leading: 48,
    weight: 'var(--font-weight-display-medium)',
    tracking: 'var(--tracking-snug)',
    ink: 'var(--color-text-light)',
    ghost: '#D1D1D1',
  },
  ghost: { left: 83, top: 40 },
  middle: { left: 108, top: 73 },
  bottom: { offset: 8, top: 178 },
}

// One art pixel = two card pixels at 215. 108 × 59 is the image rect's ratio.
export const GRID = { w: 108, h: 59, colors: 16, scale: 8 }

// The canvas size in STYLE is GRID's, on purpose: when the model draws finer
// than the grid, one-pixel details (a lattice, a spire) break up in the snap.
const STYLE = 'Pixel art city strip, wide landscape, in the manner of a 16-bit era game background. True pixel art drawn on a tiny canvas about 108 pixels wide and 59 tall, then enlarged with nearest-neighbour so every pixel is a big visible square block: no anti-aliasing, no gradients, no painterly texture, no blur, flat colour areas, dithering used sparingly. Shapes simplified to what reads at that resolution. Straight-on side elevation with no perspective: every landmark stands on one shared baseline like a skyline cut-out. Soft midday light from the left, shadows one pixel deep.'

const TONE = 'High-key and sun-bleached: every value sits between light and mid, no black outlines, nothing darker than a mid tone.'

// Matches the template: the middle name sits over the top fifth of the image,
// the bottom name over the bottom third.
const LAYOUT = 'The top quarter is open pale sky, plain and empty. The landmarks stand in the middle, their bases on one baseline two thirds of the way down; only the tallest rises high into the sky. Below the baseline the bottom third is a quiet, flat, empty foreground — a wide plaza, calm water or lawn — in one or two flat colours with no detail.'

const NEGATIVE = 'No text, lettering, signage, numbers, flags, logos, watermarks, borders, frames or UI. No close-up people.'

export const MODEL = 'google-nano-banana-2'
export const ASPECT = '16:9'

export function countryPrompt(country, city) {
  const place = `Place: ${city}, ${country.name}. Left to right: ${country.landmarks.join('; ')}. Palette, at most ten colours: ${country.palette}.`
  return [STYLE, TONE, LAYOUT, place, NEGATIVE].join(' ')
}

export const countryPaperGen = (prompt, model = MODEL) =>
  `paper-gen://${model}?prompt=${encodeURIComponent(prompt)}&aspect_ratio=${encodeURIComponent(ASPECT)}`

// The Kraft mark from the template, as drawn: four squares and the wordmark.
const MARK = `<div layer-name="Mark" style="position:absolute;left:154px;top:9px;display:flex;align-items:center;gap:5px;height:13px"><div style="position:relative;width:13px;height:13px;flex-shrink:0"><div style="position:absolute;left:0;top:0;width:4px;height:13px;background:#222222"></div><div style="position:absolute;left:4px;top:4px;width:5px;height:5px;background:#222222"></div><div style="position:absolute;left:9px;top:0;width:4px;height:4px;background:#222222"></div><div style="position:absolute;left:9px;top:9px;width:4px;height:4px;background:#222222"></div></div><div style="font-family:var(--font-display);font-weight:var(--font-weight-display-medium);font-size:var(--text-base);line-height:var(--leading-sm);color:#222222;white-space:pre">Kraft</div></div>`

/**
 * The whole card as Paper HTML, for one write_html call. `image` is any URL —
 * a paper-gen:// prompt, a Paper CDN asset or a paper-asset:// path.
 */
export function countryCardHtml(country, city, image) {
  const t = CARD.type
  const font = `font-family:${t.family};font-size:${t.size}px;line-height:${t.leading}px;font-weight:${t.weight};letter-spacing:${t.tracking};white-space:pre`
  const img = image ? `background-image:url('${image}');background-size:cover;background-position:center` : 'background-image:linear-gradient(180deg, oklab(89.8% 0 0), oklab(71.8% 0 0))'
  return `<div layer-name="Country / ${country.name} · ${city}" style="position:relative;width:${CARD.size}px;height:${CARD.size}px;background:${CARD.ground};overflow:clip">`
    + `<div layer-name="Art · ${city}" style="position:absolute;left:0;top:${CARD.image.top}px;width:${CARD.size}px;height:${CARD.image.height}px;${img}"></div>`
    + MARK
    + `<div layer-name="Name / ghost" style="position:absolute;left:${CARD.ghost.left}px;top:${CARD.ghost.top}px;rotate:180deg;transform-origin:0 0;${font};color:${t.ghost}">${country.name}</div>`
    + `<div layer-name="Name / bottom" style="position:absolute;left:calc(50% + ${CARD.bottom.offset}px);top:${CARD.bottom.top}px;translate:-50%;text-align:center;${font};color:${t.ink}">${country.name}</div>`
    + `<div layer-name="Name / middle" style="position:absolute;left:${CARD.middle.left}px;top:${CARD.middle.top}px;${font};color:${t.ink}">${country.name}</div>`
    + `</div>`
}
