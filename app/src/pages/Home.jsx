// Paper: Desktop / Home — Continue, Who's on, "This week on the shelf", Around the world, Scenes.
import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { useApi, bg, initials, mmss } from '../lib/api.js'
import Avatar from '../components/Avatar.jsx'
import { usePlayer } from '../lib/player.jsx'
import './Home.css'

export default function Home() {
  const { data, error } = useApi(['home', 'playlists/index', 'curators/index', 'scenes'])
  if (error) return <p className="page muted">Could not load /api/home.json</p>
  if (!data) return null
  const [home, plIndex, cuIndex, scenesDoc] = data
  const lists = Object.fromEntries(plIndex.playlists.map((p) => [p.id, p]))
  const curators = Object.fromEntries(cuIndex.curators.map((c) => [c.id, c]))
  const scenes = scenesDoc.scenes.filter((s) => home.scenes.includes(s.id)).slice(0, 3)

  return (
    <div className="page">
      <Continue />

      {home.live?.length > 0 && (
        <section className="section">
          <header className="section-head">
            <div>
              <h2 className="t-lg w-medium">Who's on right now</h2>
              <p className="t-sm muted">{words(home.live.length)} people you follow are playing something</p>
            </div>
            <Link to="/explore" className="t-sm muted">All {words(home.live.length).toLowerCase()}</Link>
          </header>
          <div className="live">
            {home.live.slice(0, 5).map((l) => {
              const c = curators[l.curatorId]
              if (!c?.nowPlaying) return null
              return (
                <Link key={c.id} to={`/lists/${c.nowPlaying.slug}`} className="live-item">
                  <Avatar src={c.image} name={c.name} size={48} textClass="t-sm" />
                  <span className="live-text">
                    <span className="t-base w-medium">{c.name}</span>
                    <span className="t-xs muted">playing {c.nowPlaying.title}</span>
                  </span>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      <section className="section">
        <header className="section-head">
          <div>
            <h2 className="t-lg w-medium">{home.title}</h2>
            <p className="t-sm muted">{home.subtitle}</p>
          </div>
          <Link to="/library" className="t-sm muted">Everyone you follow</Link>
        </header>
        <div className="shelf">
          {home.shelf.map((item) => {
            const list = lists[item.playlistId]
            const curator = curators[item.curatorId]
            if (!list) return null
            return (
              <article key={item.playlistId} className="shelf-item">
                <Link to={`/lists/${list.slug}`} className="cover shelf-cover" style={bg(list.image)} />
                <div className="shelf-body">
                  <div className="shelf-meta">
                    <span className="avatar t-micro" style={{ width: 24, height: 24 }}>{initials(curator?.name)}</span>
                    <Link to={`/curators/${curator?.slug}`} className="t-sm w-medium">{curator?.name}</Link>
                    <span className="t-xs subtle">updated {item.updatedLabel}</span>
                  </div>
                  <div>
                    <Link to={`/lists/${list.slug}`} className="t-base w-medium">{list.title}</Link>
                    <p className="t-xs muted">{list.metaLine} · {list.followersLabel} following</p>
                  </div>
                  <p className="t-base">{item.note}</p>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {home.countries?.playlistIds.length > 0 && (
        <section className="section">
          <header className="section-head">
            <div>
              <h2 className="t-lg w-medium">{home.countries.title}</h2>
              <p className="t-sm muted">{home.countries.subtitle}</p>
            </div>
            <Link to="/countries" className="t-sm muted">All {words(home.countries.playlistIds.length).toLowerCase()}</Link>
          </header>
          <div className="world">
            {home.countries.playlistIds.map((id) => {
              const list = lists[id]
              if (!list) return null
              return (
                <Link key={id} to={`/lists/${list.slug}`} className="world-item">
                  <span className="cover world-cover" style={bg(list.image)} role="img" aria-label={list.title} />
                  <span className="world-text">
                    <span className="t-sm w-medium">{list.subtitle}</span>
                    <span className="t-xs muted">{list.metaLine}</span>
                  </span>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      <section className="section">
        <header className="section-head">
          <div>
            <h2 className="t-lg w-medium">Scenes</h2>
            <p className="t-sm muted">A label, a city, a way of recording</p>
          </div>
          <Link to="/explore" className="t-sm muted">All seven</Link>
        </header>
        <div className="scenes">
          {scenes.map((s) => (
            <Link key={s.id} to="/explore" className="scene" style={bg(s.artwork?.image)}>
              <span className="scene-text">
                <span className="t-lg w-medium">{s.name}</span>
                <span className="t-xs">{s.metaLine} · {s.look}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

const words = (n) => ['None', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'][n] ?? String(n)

function Continue() {
  const p = usePlayer()
  const t = p.track
  if (!t) return null
  const pct = (p.position / t.durationSec) * 100
  return (
    <div className="continue">
      <span className="cover" style={{ width: 40, height: 40, ...bg(t.albumArt) }} />
      <div className="continue-text">
        <span className="t-base w-medium">{t.title}</span>
        <span className="t-xs muted">{t.artist.name} · {p.context?.line}</span>
      </div>
      <div className="continue-progress">
        <span className="t-micro subtle tnum">{mmss(p.position)}</span>
        <div className="track continue-track" onClick={(e) => {
          const r = e.currentTarget.getBoundingClientRect()
          p.seek(((e.clientX - r.left) / r.width) * t.durationSec)
        }}>
          <div className="track-fill continue-fill" style={{ width: `${pct}%` }} />
        </div>
        <span className="t-micro subtle tnum">{t.duration}</span>
      </div>
      <button className="btn-inverse" onClick={p.playing ? p.pause : p.play}>
        <Icon name={p.playing ? 'pause' : 'play'} size={12} />
        {p.playing ? 'Pause' : 'Continue'}
      </button>
    </div>
  )
}
