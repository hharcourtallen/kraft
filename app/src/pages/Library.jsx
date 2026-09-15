// Paper: Desktop / Library — Lists / Albums / Artists tabs.
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApi, bg } from '../lib/api.js'
import './Library.css'

export default function Library() {
  const [tab, setTab] = useState('lists')
  const { data, error } = useApi(['library', 'playlists/index', 'albums/index', 'artists/index'])
  if (error) return <p className="page muted">Could not load /api/library.json</p>
  if (!data) return null
  const [lib, pl, al, ar] = data
  const by = (list, key = 'id') => Object.fromEntries(list.map((x) => [x[key], x]))
  const lists = by(pl.playlists), albums = by(al.albums), artists = by(ar.artists)
  const tabs = lib.tabs
  const active = tabs.find((t) => t.key === tab)
  const counts = Object.fromEntries(tabs.map((t) => [t.key, t.itemIds.length]))

  const rows = active.itemIds.map((id) => {
    if (tab === 'lists') {
      const l = lists[id]; if (!l) return null
      const owner = l.curator?.id === 'cur_sofia-reyes' ? 'yours' : l.curator?.name
      return { id, to: `/lists/${l.slug}`, image: l.image, title: l.title, line: `${l.libraryLine} · ${owner}`, right: `updated ${l.updatedLabel}`, round: false }
    }
    if (tab === 'albums') {
      const a = albums[id]; if (!a) return null
      return { id, to: `/artists/${a.artist?.slug}`, image: a.image, title: a.title, line: `${a.type} · ${a.artist?.name} · ${a.year}`, right: `${a.trackCount} songs · ${a.durationLabel}`, round: false }
    }
    const a = artists[id]; if (!a) return null
    return { id, to: `/artists/${a.slug}`, image: a.image, title: a.name, line: a.shelfCaption, right: `${a.followersLabel} following`, round: true }
  }).filter(Boolean)

  return (
    <div className="page">
      <header className="lib-head">
        <div className="lib-head-text">
          <h1 className="display lib-title t-2xl">Library</h1>
          <p className="t-sm muted">{counts.lists} lists · {counts.albums} albums · {counts.artists} artists · following {lib.following.curatorIds.length} curators</p>
        </div>
        <div className="seg" role="tablist">
          {tabs.map((t) => (
            <button key={t.key} role="tab" aria-selected={tab === t.key} onClick={() => setTab(t.key)}>{t.label}</button>
          ))}
        </div>
      </header>
      <div className="lib-rows">
        {rows.map((r) => (
          <Link key={r.id} to={r.to} className="lib-row">
            <span className={`cover lib-cover${r.round ? ' lib-cover--round' : ''}`} style={bg(r.image)} />
            <span className="lib-row-text">
              <span className="t-base w-medium">{r.title}</span>
              <span className="t-xs muted">{r.line}</span>
            </span>
            <span className="t-sm muted lib-row-right">{r.right}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
