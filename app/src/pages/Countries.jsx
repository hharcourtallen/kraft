// Paper: UI page, the "Country / …" cards. "All ten" from Home's Around the
// world row lands here: every card in data/countries.json, the ones with a list
// link to it, the queue (no art yet) sits on the template's grey placeholder.
import { Link } from 'react-router-dom'
import CountryCard from '../components/CountryCard.jsx'
import { useApi } from '../lib/api.js'
import './Home.css'

export default function Countries() {
  const { data, error } = useApi(['countries', 'playlists/index'])
  if (error) return <p className="page muted">Could not load /api/countries.json</p>
  if (!data) return null
  const [doc, plIndex] = data
  const lists = Object.fromEntries(plIndex.playlists.map((p) => [p.id, p]))
  const done = doc.countries.filter((c) => c.image).length

  return (
    <div className="page">
      <section className="section">
        <header className="section-head">
          <div>
            <h2 className="t-lg w-medium">Around the world</h2>
            <p className="t-sm muted">One list per country, picked by someone who knows it. {done} drawn, {doc.countries.length - done} on the way.</p>
          </div>
        </header>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-6) 19px' }}>
          {doc.countries.map((c) => {
            const list = c.playlistId ? lists[c.playlistId] : null
            const body = (
              <>
                <CountryCard country={c} />
                <span style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-0-5)' }}>
                  <span className="t-sm w-medium">{list ? list.subtitle : c.name}</span>
                  <span className="t-xs muted">{list ? list.metaLine : c.metaLine}</span>
                </span>
              </>
            )
            const style = { display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }
            return list
              ? <Link key={c.code} to={`/lists/${list.slug}`} style={style}>{body}</Link>
              : <div key={c.code} style={style}>{body}</div>
          })}
        </div>
      </section>
    </div>
  )
}
