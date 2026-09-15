// Paper: Desktop / Artist — hero, Popular, About, On lists by, Discography.
import { useParams, Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import Avatar, { FollowButton } from '../components/Avatar.jsx'
import { useApi, bg } from '../lib/api.js'
import { useSocial } from '../lib/social.jsx'
import { usePlayer } from '../lib/player.jsx'
import './Home.css'
import './Explore.css'
import './Artist.css'

export default function Artist() {
  const { slug } = useParams()
  const { data, error } = useApi([`artists/${slug}`, 'curators/index'])
  const social = useSocial()
  const p = usePlayer()
  if (error) return <p className="page muted" style={{ padding: 24 }}>No artist at /api/artists/{slug}.json</p>
  if (!data) return null
  const [a, cuIndex] = data
  const curators = Object.fromEntries(cuIndex.curators.map((x) => [x.id, x]))
  const following = social.has('artists', a.id)
  const asList = { id: a.id, title: a.name, curator: null, tracks: a.popular }
  const playingHere = p.context?.id === a.id && p.playing
  const her = a.formation === 'solo' ? 'her' : 'them'

  return (
    <div className="artist">
      <header className="art-hero" style={bg(a.artwork?.hero?.image)}>
        <div className="art-hero-scrim" />
        <div className="art-hero-text">
          <span className="t-sm w-semibold">Artist · {a.primaryGenre?.name} · {a.hometown?.split(',')[0]}</span>
          <h1 className="display art-name t-4xl">{a.name}</h1>
          <span className="t-sm art-hero-meta">{a.monthlyListenersLabel} · {a.followersLabel} following</span>
        </div>
      </header>

      <div className="art-actions">
        <button className="playbtn" style={{ width: 48, height: 48 }} aria-label={playingHere ? 'Pause' : 'Play'} onClick={() => (p.context?.id === a.id ? p.toggle() : p.playList(asList))}>
          <Icon name={playingHere ? 'pause' : 'play'} size={20} />
        </button>
        <FollowButton size="pill" active={following} onClick={() => social.toggle('artists', a.id)} />
        <button className="iconbtn" aria-label="More"><Icon name="more" /></button>
      </div>

      <div className="art-columns">
        <section className="popular">
          <h2 className="t-lg w-semibold popular-title">Popular</h2>
          {a.popular.map((t, i) => (
            <div key={t.id} className="pop-row" onDoubleClick={() => p.playList(asList, t.id)}>
              <span className="t-sm muted pop-n">{i + 1}</span>
              <span className="cover" style={{ width: 40, height: 40, ...bg(t.albumArt) }} />
              <span className="t-sm w-medium pop-title clamp-1">{t.title}</span>
              <span className="t-sm subtle pop-plays tnum">{t.playCountLabel}</span>
              <span className="t-sm muted pop-time tnum">{t.duration}</span>
            </div>
          ))}
        </section>
        <aside className="about">
          <div className="about-img" style={bg(a.artwork?.portrait?.image)} />
          <div className="about-text">
            <span className="t-sm w-semibold">About</span>
            <p className="t-sm muted about-bio">{a.bio}</p>
          </div>
        </aside>
      </div>

      <section className="art-section">
        <header className="section-head">
          <div>
            <h2 className="t-lg w-medium">On lists by</h2>
            <p className="t-sm muted">{['No', 'One', 'Two', 'Three', 'Four'][a.onLists.length] ?? a.onLists.length} curator{a.onLists.length === 1 ? ' has' : 's have'} shelved {her}. This is how most people here find an artist.</p>
          </div>
        </header>
        <div className="onlists">
          {a.onLists.map((l) => {
            const c = curators[l.curatorId]
            return (
              <Link key={l.playlistId} to={`/lists/${l.slug}`} className="onlist">
                <span className="cover onlist-cover" style={bg(l.image)} />
                <span className="onlist-text">
                  <span className="t-base w-medium">{l.title}</span>
                  <span className="t-xs muted">List · {l.curatorName} · {l.caption}</span>
                </span>
                <Avatar src={c?.image} name={c?.name} size={24} />
              </Link>
            )
          })}
        </div>
      </section>

      <section className="art-section">
        <h2 className="t-lg w-semibold disco-title">Discography</h2>
        <div className="disco">
          {a.albums.map((al) => (
            <div key={al.id} className="disco-item">
              <span className="cover disco-cover" style={bg(al.image)} />
              <span className="t-sm w-medium">{al.title}</span>
              <span className="t-xs subtle">{al.subtitle}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
