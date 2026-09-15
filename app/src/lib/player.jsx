// Fake but live playback. /player.json seeds the state; from then on the
// position advances on a timer, the queue is the context list, and play /
// pause / prev / next / shuffle / repeat are real. Nothing makes a sound.
import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { getJson } from './api.js'

const PlayerContext = createContext(null)
const slugOf = (id) => id.replace(/^pl_/, '')

export function PlayerProvider({ children }) {
  const [state, setState] = useState({
    ready: false,
    tracks: [],      // resolved tracks of the current context, in order
    index: 0,
    position: 0,
    playing: false,
    shuffle: false,
    repeat: 'off',
    volume: 0.8,
    context: null,   // { type, id, title, curatorName, line }
    pin: null,       // the list's note pinned to a moment: { trackId, sec, label, curatorName }
  })
  const tick = useRef(null)

  // Seed from the API once.
  useEffect(() => {
    let live = true
    ;(async () => {
      const p = await getJson('player')
      const list = await getJson(`playlists/${slugOf(p.contextId)}`)
      if (!live) return
      const tracks = list.tracks || []
      const index = Math.max(0, tracks.findIndex((t) => t.id === p.trackId))
      setState((s) => ({
        ...s,
        ready: true,
        tracks,
        index,
        position: p.positionSec,
        playing: p.state === 'playing',
        shuffle: p.shuffle,
        repeat: p.repeat,
        volume: p.volume,
        context: p.context,
        pin: list.notePin ?? null,
      }))
    })()
    return () => { live = false }
  }, [])

  // The clock.
  useEffect(() => {
    clearInterval(tick.current)
    if (!state.playing) return
    tick.current = setInterval(() => {
      setState((s) => {
        const track = s.tracks[s.index]
        if (!track) return s
        if (s.position + 1 < track.durationSec) return { ...s, position: s.position + 1 }
        return advance(s, 1, true)
      })
    }, 1000)
    return () => clearInterval(tick.current)
  }, [state.playing])

  const api = useMemo(() => ({
    toggle: () => setState((s) => ({ ...s, playing: !s.playing })),
    play: () => setState((s) => ({ ...s, playing: true })),
    pause: () => setState((s) => ({ ...s, playing: false })),
    next: () => setState((s) => advance(s, 1, false)),
    prev: () => setState((s) => (s.position > 3 ? { ...s, position: 0 } : advance(s, -1, false))),
    seek: (sec) => setState((s) => ({ ...s, position: Math.max(0, Math.floor(sec)) })),
    toggleShuffle: () => setState((s) => ({ ...s, shuffle: !s.shuffle })),
    setRepeat: (repeat) => setState((s) => ({ ...s, repeat })),
    cycleRepeat: () => setState((s) => ({ ...s, repeat: s.repeat === 'off' ? 'all' : s.repeat === 'all' ? 'one' : 'off' })),
    // Start a list from a track (or its first track).
    playList: (list, trackId) => {
      const tracks = list.tracks || []
      const index = Math.max(0, tracks.findIndex((t) => t.id === trackId))
      setState((s) => ({
        ...s,
        tracks,
        index,
        position: 0,
        playing: true,
        context: {
          type: 'playlist',
          id: list.id,
          title: list.title,
          curatorName: list.curator?.name ?? null,
          line: `From ${list.title}${list.curator ? ` · ${list.curator.name}` : ''}`,
        },
        pin: list.notePin ?? null,
      }))
    },
    jumpTo: (i) => setState((s) => ({ ...s, index: i, position: 0, playing: true })),
  }), [])

  const track = state.tracks[state.index] || null
  const queue = state.tracks.slice(state.index + 1)
  const value = useMemo(() => ({ ...state, track, queue, ...api }), [state, track, api]) // eslint-disable-line react-hooks/exhaustive-deps
  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
}

function advance(s, dir, auto) {
  const n = s.tracks.length
  if (!n) return s
  if (auto && s.repeat === 'one') return { ...s, position: 0 }
  let index = s.shuffle && n > 1 ? pickOther(s.index, n) : s.index + dir
  if (index >= n) {
    if (s.repeat === 'off' && auto) return { ...s, index: n - 1, position: 0, playing: false }
    index = 0
  }
  if (index < 0) index = n - 1
  return { ...s, index, position: 0 }
}

const pickOther = (i, n) => {
  let j = i
  while (j === i) j = Math.floor(Math.random() * n)
  return j
}

export const usePlayer = () => useContext(PlayerContext)
