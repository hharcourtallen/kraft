// Paper: Components / 12 · Waveform — the scrubber is the sound.
// v2: five layers on a 2px micro grid. Bars are 2px wide on a fixed pitch,
// heights snap to 2px, every x is an integer. Layers, bottom to top:
//   grid      centre hairline (+ ruler ticks when `ruler`)
//   unplayed  every bar, track colour
//   played    bars up to the position, text colour
//   playhead  1px line that overshoots the strip by 4px
//   pins      2px accent ticks at a second (a note, a reply)
// Deterministic per seed (the track id), never real audio.
import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import './Waveform.css'

const BAR = 2
const STEP = 2

export function bars(seed, w, h, pitch = 4) {
  let s = 0
  for (const ch of String(seed)) s = (s * 31 + ch.charCodeAt(0)) % 233280
  s = s || 7
  const rand = () => { s = (s * 9301 + 49297) % 233280; return s / 233280 }
  const n = Math.max(1, Math.floor((w - BAR) / pitch) + 1)
  const x0 = Math.floor((w - ((n - 1) * pitch + BAR)) / 2)
  const phase = rand() * Math.PI * 2
  const raw = Array.from({ length: n }, () => rand())
  const out = []
  for (let i = 0; i < n; i++) {
    const t = (i + 0.5) / n
    const env = 0.3 + 0.7 * Math.sin(Math.PI * t) ** 0.6                 // song-shaped
    const lfo = 0.82 + 0.18 * Math.sin(t * Math.PI * 2 * 3.3 + phase)     // sections
    const noise = (raw[Math.max(0, i - 1)] + raw[i] + raw[Math.min(n - 1, i + 1)]) / 3
    const v = Math.max(0.08, Math.min(1, env * lfo * (0.45 + 0.7 * noise)))
    const bh = Math.max(STEP * 2, Math.round((v * h) / STEP) * STEP)
    out.push({ x: x0 + i * pitch, y: (h - bh) / 2, h: bh })
  }
  return out
}

export default function Waveform({
  seed, position = 0, duration = 1, width = 400, height = 32, pitch = 4,
  pin = null, pins = null, tone = 'ui', fluid = false, ruler = false, playhead = true, onSeek, className = '',
}) {
  const ref = useRef(null)
  const [measured, setMeasured] = useState(null)
  // Fluid: measure the container and lay the bars out on that width, so the grid stays on whole pixels.
  useLayoutEffect(() => {
    if (!fluid || !ref.current) return
    const el = ref.current
    const read = () => setMeasured(Math.round(el.getBoundingClientRect().width))
    read()
    const ro = new ResizeObserver(read)
    ro.observe(el)
    return () => ro.disconnect()
  }, [fluid])
  const w = fluid ? (measured ?? width) : width
  const rects = useMemo(() => bars(seed, w, height, pitch), [seed, w, height, pitch])
  const played = Math.max(0, Math.min(1, duration > 0 ? position / duration : 0))
  const cut = Math.round(played * w)
  const marks = pins ? pins.map((p) => p.fraction) : pin ? [pin.sec / duration] : []
  const ticks = ruler ? Array.from({ length: 9 }, (_, k) => Math.min(w - 1, Math.round((k * w) / 8))) : []
  const rect = (b, i) => <rect key={i} x={b.x} y={b.y} width={BAR} height={b.h} rx="1" />

  return (
    <div ref={ref} className={`wave wave--${tone} ${className}`} style={{ width: fluid ? '100%' : width, height }}
      onClick={(e) => {
        if (!onSeek) return
        const r = e.currentTarget.getBoundingClientRect()
        onSeek(((e.clientX - r.left) / r.width) * duration)
      }} role="slider" aria-label="Position" aria-valuenow={Math.round(position)} aria-valuemax={Math.round(duration)}>
      <svg className="wave-layer wave-grid" width={w} height={height} viewBox={`0 0 ${w} ${height}`}>
        <rect x="0" y={height / 2} width={w} height="1" />
        {ticks.map((x, i) => <rect key={i} x={x} y={height - 3} width="1" height="3" />)}
      </svg>
      <svg className="wave-layer wave-off" width={w} height={height} viewBox={`0 0 ${w} ${height}`}>{rects.map(rect)}</svg>
      {playhead && (
        <svg className="wave-layer wave-on" width={w} height={height} viewBox={`0 0 ${w} ${height}`}>{rects.filter((b) => b.x + BAR / 2 <= cut).map(rect)}</svg>
      )}
      {playhead && <span className="wave-head" style={{ left: cut }} />}
      {marks.map((f, i) => <span key={i} className="wave-pin" style={{ left: `${f * 100}%` }} />)}
    </div>
  )
}
