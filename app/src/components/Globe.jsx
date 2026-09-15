// The homepage globe — globe.gl with HTML markers (after globe.gl/example/html-markers).
// One bright dot per point in api/globe.json. States, see Components 13 · Globe marker:
//   idle      the dot, pulsing like starlight (own period and phase per dot, amplitude
//             by how squarely it faces the camera, so the near side breathes and the
//             horizon barely moves); curators wear a thin ring
//   hover     a peek pill: track, artist, who · where
//   open      click: cover, the live position on a mini waveform, the list, Play / Open list;
//             one open at a time and the globe stops turning
//   playing   the ring goes solid, Play reads Pause
// Night-lights texture is bundled locally. Markers are plain DOM so globe.gl can move them.
import { useEffect, useRef } from 'react'
import Globe from 'globe.gl'
import { bars } from './Waveform.jsx'
import { mmss } from '../lib/api.js'
import './Globe.css'

const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))

// The mini strip inside the open card: same generator as the Waveform component, 248 × 24, 4px pitch.
function miniWave(seed, played, w = 248, h = 24) {
  const r = bars(seed, w, h, 4)
  const cut = Math.round(played * w)
  const rect = (b) => `<rect x="${b.x}" y="${b.y}" width="2" height="${b.h}" rx="1"/>`
  return `<span class="gl-wave" style="width:${w}px;height:${h}px"><svg class="gl-wave-off" width="${w}" height="${h}">${r.map(rect).join('')}</svg><svg class="gl-wave-on" width="${w}" height="${h}">${r.filter((b) => b.x + 1 <= cut).map(rect).join('')}</svg><i class="gl-wave-head" style="left:${cut}px"></i></span>`
}

function markerHtml(d) {
  const who = d.who ? `${esc(d.who.name)} · ` : ''
  const dur = d.track?.durationSec ?? 1
  const at = Math.min(d.startedSecAgo ?? 0, dur)
  const cover = d.track?.image ? `style="background-image:url(${esc(d.track.image)})"` : ''
  const onList = d.playlist ? `on ${esc(d.playlist.title)}` : ''
  const whoLine = d.who
    ? `<span class="gl-who"><i class="gl-portrait" style="background-image:url(${esc(d.who.image ?? '')})"></i>${esc(d.who.name)} · ${onList}</span>`
    : `<span class="gl-who"><i class="gl-led"></i>Someone in ${esc(d.city)} · ${onList}</span>`
  return `<span class="gl-dot"></span>
<span class="gl-peek"><span class="gl-title">${esc(d.track?.title)}</span><span class="gl-sub">${esc(d.track?.artist)}</span><span class="gl-meta">${who}${esc(d.city)}</span></span>
<span class="gl-open">
  <span class="gl-open-head"><i class="gl-cover" ${cover}></i><span class="gl-open-text"><span class="gl-title">${esc(d.track?.title)}</span><span class="gl-sub">${esc(d.track?.artist)}</span></span><button type="button" class="gl-x" data-act="close" aria-label="Close">×</button></span>
  ${miniWave(d.track?.id ?? d.id, at / dur)}
  <span class="gl-times"><span>${mmss(at)}</span><span>${mmss(dur)}</span></span>
  ${whoLine}
  <span class="gl-actions"><button type="button" class="gl-play" data-act="play">Play</button>${d.playlist ? `<a class="gl-link" href="/lists/${esc(d.playlist.slug)}" data-act="open-list">Open list</a>` : ''}</span>
</span>`
}

export default function GlobeHero({ points = [], size = 1400, view = { lat: 22, lng: -72, altitude: 1.75 }, playingId = null, onPlay }) {
  const ref = useRef(null)
  const markers = useRef([])
  const handlers = useRef({ onPlay })
  handlers.current.onPlay = onPlay

  useEffect(() => {
    const el = ref.current
    if (!el) return
    markers.current = []
    // Seeded per-dot period and phase, so the field never pulses in step.
    let s = 4241
    const rand = () => { s = (s * 9301 + 49297) % 233280; return s / 233280 }

    const globe = Globe()(el)
      .width(size).height(size)
      .backgroundColor('rgba(0,0,0,0)')
      .globeImageUrl('/globe/earth-night.jpg')
      .showAtmosphere(true).atmosphereColor('#5b6f9d').atmosphereAltitude(0.12)
      // Fresh objects per mount: three-globe tags each datum with its scene object, so a
      // remount (React StrictMode) would otherwise find them claimed and build nothing.
      .htmlElementsData(points.map((d) => ({ ...d })))
      .htmlLat('lat').htmlLng('lng').htmlAltitude(0.012)
      .htmlElement((d) => {
        const m = document.createElement('div')
        m.className = `gl-marker${d.kind === 'curator' ? ' gl-marker--curator' : ''}`
        m.dataset.id = d.id
        const dur = 2.4 + rand() * 2.4
        m.style.setProperty('--dur', `${dur.toFixed(2)}s`)
        m.style.setProperty('--delay', `${(-rand() * dur).toFixed(2)}s`)
        try { m.innerHTML = markerHtml(d) } catch (err) { console.error('[globe] marker failed', d?.id, err); m.innerHTML = '<span class="gl-dot"></span>' }
        markers.current.push({ el: m, d })
        return m
      })
      // Markers on the far side of the globe fade out instead of showing through it.
      .htmlElementVisibilityModifier((m, visible) => { m.style.opacity = visible ? 1 : 0; m.style.pointerEvents = visible ? 'auto' : 'none' })
    globe.pointOfView(view, 0)
    const controls = globe.controls()
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.35
    controls.enableZoom = false
    controls.enablePan = false

    // --- nearness: how squarely each dot faces the camera, 0 at the horizon, 1 dead centre
    let timer
    const tick = () => {
      const cam = globe.camera().position
      const cl = Math.hypot(cam.x, cam.y, cam.z) || 1
      for (const { el: m, d } of markers.current) {
        const c = globe.getCoords(d.lat, d.lng, 0.012)
        const near = (c.x * cam.x + c.y * cam.y + c.z * cam.z) / ((Math.hypot(c.x, c.y, c.z) || 1) * cl)
        m.style.setProperty('--near', Math.max(0, near).toFixed(2))
      }
      timer = setTimeout(tick, 120)
    }
    tick()

    // --- states
    let open = null
    const close = () => { if (open) { open.classList.remove('is-open'); open = null } if (!el.matches(':hover')) controls.autoRotate = true }
    const onClick = (e) => {
      const m = e.target.closest('.gl-marker')
      const act = e.target.closest('[data-act]')?.dataset.act
      if (!m) return
      const d = markers.current.find((x) => x.el === m)?.d
      if (act === 'close') { close(); return }
      if (act === 'play') { handlers.current.onPlay?.(d, m.classList.contains('is-playing')); return }
      if (act === 'open-list') return // the link handles it
      if (open && open !== m) open.classList.remove('is-open')
      open = m
      m.classList.add('is-open')
      controls.autoRotate = false
    }
    const onKey = (e) => { if (e.key === 'Escape') close() }
    const onDoc = (e) => { if (open && !el.contains(e.target)) close() }
    const stop = () => { controls.autoRotate = false }
    const go = () => { if (!open) controls.autoRotate = true }
    el.addEventListener('click', onClick)
    el.addEventListener('pointerenter', stop)
    el.addEventListener('pointerleave', go)
    document.addEventListener('keydown', onKey)
    document.addEventListener('click', onDoc)
    return () => {
      clearTimeout(timer)
      el.removeEventListener('click', onClick)
      el.removeEventListener('pointerenter', stop)
      el.removeEventListener('pointerleave', go)
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('click', onDoc)
      globe._destructor?.()
      el.replaceChildren()
      markers.current = []
    }
  }, [points, size, view.lat, view.lng, view.altitude])

  // Playing state: the marker whose track is in the player.
  useEffect(() => {
    for (const { el: m, d } of markers.current) {
      const on = playingId != null && d.track?.id === playingId
      m.classList.toggle('is-playing', on)
      const b = m.querySelector('.gl-play'); if (b) b.textContent = on ? 'Pause' : 'Play'
    }
  }, [playingId, points])

  return <div ref={ref} className="gl-globe" style={{ width: size, height: size }} />
}
