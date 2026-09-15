// Paper: Desktop / Explore — Curators, Scenes, Browse.
import { Link } from 'react-router-dom'
import Avatar from '../components/Avatar.jsx'
import { useApi, bg } from '../lib/api.js'
import './Home.css'
import './Explore.css'

export default function Explore() {
  const { data, error } = useApi(['explore', 'curators/index', 'scenes'])
  if (error) return <p className="page muted">Could not load /api/explore.json</p>
  if (!data) return null
  const [ex, cuIndex, scenesDoc] = data
  const curators = ex.curators.curatorIds.map((id) => cuIndex.curators.find((c) => c.id === id)).filter(Boolean)
  const scenes = ex.scenes.sceneIds.map((id) => scenesDoc.scenes.find((s) => s.id === id)).filter(Boolean)

  return (
    <div className="page">
      <section className="section">
        <header className="section-head">
          <div>
            <h2 className="t-lg w-medium">{ex.curators.title}</h2>
            <p className="t-sm muted">Nine people with a byline this week. Anyone here can have one.</p>
          </div>
          <span className="t-sm muted">All {ex.curators.total.toLocaleString("en-US")}</span>
        </header>
        <div className="curator-row">
          {curators.map((c) => (
            <Link key={c.id} to={`/curators/${c.slug}`} className="curator-tile">
              <Avatar src={c.image} name={c.name} size={96} textClass="t-lg" />
              <span className="curator-tile-text">
                <span className="t-base w-medium">{c.name}</span>
                <span className="t-xs muted">{c.city} · {c.listCount} lists</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <header className="section-head">
          <div>
            <h2 className="t-lg w-medium">{ex.scenes.title}</h2>
            <p className="t-sm muted">A label, a city, a way of recording. Seven so far.</p>
          </div>
        </header>
        <div className="scene-grid">
          {scenes.map((s) => (
            <div key={s.id} className="scene scene--sm" style={bg(s.artwork?.image)}>
              <span className="scene-text">
                <span className="t-base w-medium">{s.name}</span>
                <span className="t-xs">{s.metaLine}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <header className="section-head">
          <div>
            <h2 className="t-lg w-medium">{ex.browse.title}</h2>
            <p className="t-sm muted">By genre, when you know what you want</p>
          </div>
        </header>
        <div className="browse-grid">
          {ex.browse.tiles.map((t) => (
            <div key={t.slug} className="browse-tile t-base w-medium">{t.label}</div>
          ))}
        </div>
      </section>
    </div>
  )
}
