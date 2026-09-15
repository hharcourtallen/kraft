// The API is a folder of JSON. This is the whole data layer.
import { useEffect, useState } from 'react'

const cache = new Map()

export async function getJson(path) {
  const key = path.replace(/^\//, '')
  if (cache.has(key)) return cache.get(key)
  const p = fetch(`/api/${key}.json`).then((r) => {
    if (!r.ok) throw new Error(`${r.status} ${key}`)
    return r.json()
  })
  cache.set(key, p)
  return p
}

// useApi('home') → { data, error }. Pass an array to load several at once.
export function useApi(paths) {
  const list = Array.isArray(paths) ? paths : [paths]
  const key = list.join('|')
  const [state, setState] = useState({ data: null, error: null })
  useEffect(() => {
    let live = true
    setState({ data: null, error: null })
    Promise.all(list.map(getJson))
      .then((all) => live && setState({ data: Array.isArray(paths) ? all : all[0], error: null }))
      .catch((error) => live && setState({ data: null, error }))
    return () => { live = false }
  }, [key]) // eslint-disable-line react-hooks/exhaustive-deps
  return state
}

// Artwork: the build writes "/artwork/<kind>/<slug>.jpg" when a render exists.
export const art = (aw) => (aw && aw.image) || null
export const bg = (url) => (url ? { backgroundImage: `url(${url})` } : undefined)

export const initials = (name = '') =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map((s) => s[0]).join('').toUpperCase()

export const mmss = (sec = 0) => {
  const s = Math.max(0, Math.round(sec))
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}
