// Minimal PNG read/write and a pixel-grid snap, zero dependencies (node:zlib).
//
// Reads 8-bit, non-interlaced greyscale / RGB / RGBA — which is what Paper's
// image generator and exporter write. Always returns RGBA.

import { inflateSync, deflateSync } from 'node:zlib'

const SIG = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])

export function decodePng(buf) {
  if (!buf.subarray(0, 8).equals(SIG)) throw new Error('not a PNG')
  let off = 8, w = 0, h = 0, depth = 0, type = 0, interlace = 0
  const idat = []
  while (off < buf.length) {
    const len = buf.readUInt32BE(off)
    const kind = buf.toString('ascii', off + 4, off + 8)
    const data = buf.subarray(off + 8, off + 8 + len)
    if (kind === 'IHDR') {
      w = data.readUInt32BE(0); h = data.readUInt32BE(4)
      depth = data[8]; type = data[9]; interlace = data[12]
    } else if (kind === 'IDAT') idat.push(data)
    else if (kind === 'IEND') break
    off += 12 + len
  }
  const channels = { 0: 1, 2: 3, 4: 2, 6: 4 }[type]
  if (depth !== 8 || !channels || interlace) throw new Error(`unsupported PNG (depth ${depth}, type ${type}, interlace ${interlace})`)

  const raw = inflateSync(Buffer.concat(idat))
  const stride = w * channels
  const px = Buffer.alloc(stride * h)
  for (let y = 0; y < h; y++) {
    const f = raw[y * (stride + 1)]
    const src = y * (stride + 1) + 1
    const row = y * stride
    for (let x = 0; x < stride; x++) {
      const a = x >= channels ? px[row + x - channels] : 0
      const b = y ? px[row - stride + x] : 0
      const c = y && x >= channels ? px[row - stride + x - channels] : 0
      let v = raw[src + x]
      if (f === 1) v += a
      else if (f === 2) v += b
      else if (f === 3) v += (a + b) >> 1
      else if (f === 4) {
        const p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c)
        v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c
      }
      px[row + x] = v & 255
    }
  }
  const rgba = new Uint8Array(w * h * 4)
  for (let i = 0; i < w * h; i++) {
    const s = i * channels
    const g = px[s]
    rgba[i * 4] = channels >= 3 ? px[s] : g
    rgba[i * 4 + 1] = channels >= 3 ? px[s + 1] : g
    rgba[i * 4 + 2] = channels >= 3 ? px[s + 2] : g
    rgba[i * 4 + 3] = channels === 4 ? px[s + 3] : channels === 2 ? px[s + 1] : 255
  }
  return { width: w, height: h, data: rgba }
}

const CRC = new Int32Array(256).map((_, n) => {
  let c = n
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
  return c
})
const crc32 = (buf) => {
  let c = -1
  for (const b of buf) c = CRC[(c ^ b) & 255] ^ (c >>> 8)
  return (c ^ -1) >>> 0
}
const chunk = (kind, data) => {
  const out = Buffer.alloc(12 + data.length)
  out.writeUInt32BE(data.length, 0)
  out.write(kind, 4, 'ascii')
  data.copy(out, 8)
  out.writeUInt32BE(crc32(out.subarray(4, 8 + data.length)), 8 + data.length)
  return out
}

export function encodePng({ width: w, height: h, data }) {
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4)
  ihdr[8] = 8; ihdr[9] = 2 // 8-bit RGB
  const raw = Buffer.alloc((w * 3 + 1) * h)
  for (let y = 0; y < h; y++) {
    raw[y * (w * 3 + 1)] = 0
    for (let x = 0; x < w; x++) {
      const s = (y * w + x) * 4, d = y * (w * 3 + 1) + 1 + x * 3
      raw[d] = data[s]; raw[d + 1] = data[s + 1]; raw[d + 2] = data[s + 2]
    }
  }
  return Buffer.concat([SIG, chunk('IHDR', ihdr), chunk('IDAT', deflateSync(raw, { level: 9 })), chunk('IEND', Buffer.alloc(0))])
}

// --- snap ------------------------------------------------------------------
// Generated "pixel art" has pixels of uneven size, soft edges, a few hundred
// near-duplicate colours — and is drawn finer than the card's grid. Snapping:
//
//   1. centre-crop to the grid's ratio
//   2. cluster the whole image to a small palette in OKLab (k-means++)
//   3. vote each cell: a colour's score is its share of the cell divided by
//      the square root of its share of the whole image. Sky is common, a red
//      tower is rare, so a tower line covering a quarter of a cell keeps the
//      cell instead of vanishing into the sky — what a pixel artist would do
//      by hand when halving a sprite
//   4. drop lone specks: a cell unlike all eight neighbours that agree
//
// Each palette entry is drawn in the median sRGB colour of its members — a
// real colour from the image, never an average.

const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4 }
function oklab(r, g, b) {
  r = lin(r); g = lin(g); b = lin(b)
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)
  return [0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s]
}
const d2 = (p, q) => (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2 + (p[2] - q[2]) ** 2
const nearest = (lab, cents) => {
  let bi = 0, bd = Infinity
  for (let i = 0; i < cents.length; i++) { const d = d2(lab, cents[i]); if (d < bd) { bd = d; bi = i } }
  return bi
}

export function snapToGrid(img, { w, h, colors = 16, minShare = 0.2 }) {
  const want = w / h
  let cw = img.width, ch = img.height, ox = 0, oy = 0
  if (cw / ch > want) { cw = Math.round(ch * want); ox = Math.floor((img.width - cw) / 2) }
  else { ch = Math.round(cw / want); oy = Math.floor((img.height - ch) / 2) }

  // 1–2. every cropped pixel in OKLab; k-means on a 1-in-9 sample.
  const N = cw * ch
  const lab = new Array(N), rgb = new Array(N)
  for (let y = 0; y < ch; y++) {
    for (let x = 0; x < cw; x++) {
      const i = ((oy + y) * img.width + ox + x) * 4
      const c = [img.data[i], img.data[i + 1], img.data[i + 2]]
      rgb[y * cw + x] = c
      lab[y * cw + x] = oklab(...c)
    }
  }
  const sample = []
  for (let y = 1; y < ch; y += 3) for (let x = 1; x < cw; x += 3) sample.push(lab[y * cw + x])

  let seed = 0x9e3779b9
  const rand = () => { seed = (seed + 0x6d2b79f5) >>> 0; let t = seed; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296 }
  const cents = [sample[Math.floor(rand() * sample.length)]]
  const dist = sample.map((p) => d2(p, cents[0]))
  while (cents.length < colors) {
    const total = dist.reduce((s, d) => s + d, 0)
    let r = rand() * total, pick = sample.length - 1
    for (let i = 0; i < dist.length; i++) { r -= dist[i]; if (r <= 0) { pick = i; break } }
    cents.push(sample[pick])
    sample.forEach((p, i) => { dist[i] = Math.min(dist[i], d2(p, sample[pick])) })
  }
  for (let iter = 0; iter < 10; iter++) {
    const sum = cents.map(() => [0, 0, 0, 0])
    for (const p of sample) { const s = sum[nearest(p, cents)]; s[0] += p[0]; s[1] += p[1]; s[2] += p[2]; s[3]++ }
    sum.forEach((s, i) => { if (s[3]) cents[i] = [s[0] / s[3], s[1] / s[3], s[2] / s[3]] })
  }
  const idx = new Uint8Array(N)
  const global = new Float64Array(colors)
  const members = cents.map(() => [[], [], []])
  for (let i = 0; i < N; i++) {
    const k = nearest(lab[i], cents)
    idx[i] = k; global[k]++
    if (i % 7 === 0) { members[k][0].push(rgb[i][0]); members[k][1].push(rgb[i][1]); members[k][2].push(rgb[i][2]) }
  }
  const med = (a) => (a.length ? a.sort((p, q) => p - q)[a.length >> 1] : 0)
  const swatch = members.map((m) => [med(m[0]), med(m[1]), med(m[2])])
  const weight = Array.from(global, (g) => 1 / Math.sqrt(Math.max(g / N, 1e-6)))

  // 3. vote each cell.
  const cells = new Uint8Array(w * h)
  const hist = new Float64Array(colors)
  for (let gy = 0; gy < h; gy++) {
    for (let gx = 0; gx < w; gx++) {
      hist.fill(0)
      const x0 = Math.floor(gx * cw / w), x1 = Math.max(x0 + 1, Math.floor((gx + 1) * cw / w))
      const y0 = Math.floor(gy * ch / h), y1 = Math.max(y0 + 1, Math.floor((gy + 1) * ch / h))
      for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) hist[idx[y * cw + x]]++
      const area = (x1 - x0) * (y1 - y0)
      let best = 0, bestScore = -1, top = 0
      for (let k = 0; k < colors; k++) if (hist[k] > hist[top]) top = k
      for (let k = 0; k < colors; k++) {
        const share = hist[k] / area
        if (share < minShare && k !== top) continue
        const score = share * weight[k]
        if (score > bestScore) { bestScore = score; best = k }
      }
      cells[gy * w + gx] = best
    }
  }

  // 4. lone specks.
  const out = cells.slice()
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const n = [-1, 0, 1].flatMap((dy) => [-1, 0, 1].map((dx) => (dx || dy ? cells[(y + dy) * w + x + dx] : -1))).filter((v) => v >= 0)
      if (n.every((v) => v === n[0]) && n[0] !== cells[y * w + x]) out[y * w + x] = n[0]
    }
  }

  const data = new Uint8Array(w * h * 4)
  out.forEach((k, i) => data.set([...swatch[k], 255], i * 4))
  return { width: w, height: h, data, palette: swatch.filter((_, k) => out.includes(k)) }
}

export function upscale(img, k) {
  const W = img.width * k, H = img.height * k
  const data = new Uint8Array(W * H * 4)
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const s = (((y / k) | 0) * img.width + ((x / k) | 0)) * 4
      data.set(img.data.subarray(s, s + 4), (y * W + x) * 4)
    }
  }
  return { width: W, height: H, data }
}
