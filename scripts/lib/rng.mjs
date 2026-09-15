// Deterministic RNG. Every generated value must be reproducible from a seed,
// otherwise a rebuild reshuffles the catalogue under the Paper file.

export function hashSeed(str) {
  let h = 2166136261 >>> 0
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619) >>> 0
  }
  return h >>> 0
}

/** mulberry32 — small, fast, good enough for content generation. */
export function rng(seed) {
  let a = typeof seed === 'string' ? hashSeed(seed) : seed >>> 0
  const next = () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  next.int = (min, max) => min + Math.floor(next() * (max - min + 1))
  next.pick = (arr) => arr[Math.floor(next() * arr.length)]
  next.chance = (p) => next() < p
  next.shuffle = (arr) => {
    const a2 = [...arr]
    for (let i = a2.length - 1; i > 0; i--) {
      const j = Math.floor(next() * (i + 1))
      ;[a2[i], a2[j]] = [a2[j], a2[i]]
    }
    return a2
  }
  /** Weighted pick. items: [{weight, ...}] or ([item], [weight]). */
  next.weighted = (items, weightOf = (x) => x.weight ?? 1) => {
    const total = items.reduce((s, x) => s + weightOf(x), 0)
    let r = next() * total
    for (const item of items) {
      r -= weightOf(item)
      if (r <= 0) return item
    }
    return items[items.length - 1]
  }
  /** Box-Muller, clamped. Real-world quantities are rarely uniform. */
  next.normal = (mean, sd, min = -Infinity, max = Infinity) => {
    const u = Math.max(next(), 1e-9)
    const v = next()
    const n = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
    return Math.min(max, Math.max(min, mean + n * sd))
  }
  /** Log-normal — the shape of listener counts, play counts, follower counts. */
  next.logNormal = (mu, sigma) => Math.exp(next.normal(mu, sigma))
  return next
}
