// Paper: Desktop / Curator — hero, Notes, Also follows, Lists, Beat.
import { useParams, Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import Avatar, { FollowButton } from '../components/Avatar.jsx'
import { useApi } from '../lib/api.js'
import { useSocial } from '../lib/social.jsx'
import './Home.css'
import './Explore.css'
import './Curator.css'

export default function Curator() {
  const { slug } = useParams()
  const { data, error } = useApi([`curators/${slug}`, 'curators/index', 'playlists/index', 'scenes'])
  const social = useSocial()
  if (error) return <p className="page muted">No curator at /api/curators/{slug}.json</p>
  if (!data) return null
  const [c, cuIndex, pl, scenesDoc] = data
  const curators = Object.fromEntries(cuIndex.curators.map((x) => [x.id, x]))
  const lists = c.listIds.map((id) => pl.playlists.find((p) => p.id === id)).filter(Boolean)
  const archive = Math.max(0, c.listCount - lists.length)
  const beatScenes = scenesDoc.scenes.filter((s) => s.genres?.some((g) => c.beat.includes(g))).map((s) => s.name)
  const following = social.has('curators', c.id)

  return (
    <div className="page">
      <header className="cur-hero">
        <Avatar src={c.image ?? c.artwork?.portrait?.image} name={c.name} size={120} textClass="t-xl" />
        <div className="cur-hero-text">
          <div className="cur-hero-lines">
            <span className="t-sm muted">{c.kicker}</span>
            <h1 className="display cur-name t-4xl">{c.name}</h1>
            <span className="t-sm muted">{c.beatLabel} · {c.listCount} lists · {c.followersLabel} following</span>
          </div>
          <p className="t-md cur-bio">{c.bio}</p>
          <div className="cur-actions">
            <FollowButton active={following} onClick={() => social.toggle('curators', c.id)} />
            <button className="iconbtn cur-more" aria-label="More"><Icon name="more" size={16} /></button>
          </div>
        </div>
      </header>

      <div className="cur-columns">
        <section className="cur-col">
          <div className="section-head">
            <div>
              <h2 className="t-lg w-medium">Notes</h2>
              <p className="t-sm muted">What she wrote on her lists, newest first</p>
            </div>
          </div>
          {c.notes.map((n) => (
            <article key={n.playlistId} className="note">
              <div className="note-head">
                <Link to={`/lists/${lists.find((l) => l.id === n.playlistId)?.slug ?? ''}`} className="t-sm w-medium">{n.playlistTitle}</Link>
                <span className="t-xs subtle">updated {n.updatedLabel}</span>
              </div>
              <p className="t-md">{n.note}</p>
            </article>
          ))}
          <div className="also">
            <h2 className="t-lg w-medium">Also follows</h2>
            {c.follows.map((id) => curators[id]).filter(Boolean).map((f) => (
              <div key={f.id} className="also-row">
                <Avatar src={f.image} name={f.name} size={40} textClass="t-sm" />
                <Link to={`/curators/${f.slug}`} className="also-text">
                  <span className="t-base w-medium">{f.name}</span>
                  <span className="t-xs muted">Curator · {f.city} · {f.listCount} lists</span>
                </Link>
                <FollowButton active={social.has('curators', f.id)} onClick={() => social.toggle('curators', f.id)} />
              </div>
            ))}
          </div>
        </section>

        <section className="cur-col">
          <div className="section-head">
            <div>
              <h2 className="t-lg w-medium">Lists</h2>
              <p className="t-sm muted">{words(lists.length)} on the shelf this season, {archive} in the archive</p>
            </div>
            <span className="t-sm muted">All {c.listCount}</span>
          </div>
          <div className="cur-lists">
            {lists.map((l) => (
              <Link key={l.id} to={`/lists/${l.slug}`} className="cur-list">
                <span className="cover cur-list-cover" style={{ backgroundImage: l.image ? `url(${l.image})` : undefined }} />
                <span className="t-base w-medium">{l.title}</span>
                <span className="t-xs muted">{l.trackCount} tracks · {l.followersLabel} following</span>
              </Link>
            ))}
            {archive > 0 && (
              <div className="cur-archive">
                <span className="display cur-archive-n t-xl">{archive}</span>
                <span className="t-xs muted">in the archive</span>
              </div>
            )}
          </div>
          <div className="beat">
            <span className="t-sm w-medium">Beat</span>
            <span className="t-sm muted">{c.beatLabel}.{beatScenes.length ? ` Scenes: ${beatScenes.join(', ')}.` : ''}</span>
          </div>
        </section>
      </div>
    </div>
  )
}

const words = (n) => ['None', 'One', 'Two', 'Three', 'Four', 'Five', 'Six'][n] ?? String(n)
