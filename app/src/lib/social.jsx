// Follow and save state. Seeded from /library.json, then kept in localStorage.
// This is the only state in the app that the API does not own.
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getJson } from './api.js'

const SocialContext = createContext(null)
const KEY = 'ofm.social'

const load = () => {
  try { return JSON.parse(localStorage.getItem(KEY)) || null } catch { return null }
}

export function SocialProvider({ children }) {
  const [state, setState] = useState(() => load())

  useEffect(() => {
    if (state) return
    getJson('library').then((lib) =>
      setState({
        curators: lib.following.curatorIds,
        artists: lib.following.artistIds,
        lists: lib.following.playlistIds,
      }),
    )
  }, [state])

  useEffect(() => {
    if (state) try { localStorage.setItem(KEY, JSON.stringify(state)) } catch {}
  }, [state])

  const value = useMemo(() => {
    const has = (kind, id) => !!state?.[kind]?.includes(id)
    const toggle = (kind, id) =>
      setState((s) => {
        const cur = s?.[kind] ?? []
        return { ...s, [kind]: cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id] }
      })
    return { ready: !!state, has, toggle, ...state }
  }, [state])

  return <SocialContext.Provider value={value}>{children}</SocialContext.Provider>
}

export const useSocial = () => useContext(SocialContext)
