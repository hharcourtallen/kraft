import { hashSeed } from './rng.mjs'

/**
 * URL slug for a display name.
 *
 * Names like "Ø" or "中川ハルカ" contain no ASCII at all, so the naive result is
 * an empty string — which silently produces broken URLs and colliding ids.
 * Real services solve this with an opaque identifier, so that is what happens
 * here: when nothing survives, fall back to a stable hash of the original.
 * Deterministic, so the URL never changes between builds.
 */
export function slugify(str, { prefix = 'a' } = {}) {
  const s = String(str)
  const out = s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // strip diacritics for the URL only
    .replace(/&/g, ' and ')
    .replace(/['’]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
  if (out) return out
  return `${prefix}-${hashSeed(s).toString(36).slice(0, 8)}`
}

/** Stable, human-readable id: "art_zaya-blue" */
export const id = (prefix, name) => `${prefix}_${slugify(name)}`

export function uniqueSlug(base, taken) {
  let s = base
  let n = 2
  while (taken.has(s)) s = `${base}-${n++}`
  taken.add(s)
  return s
}
