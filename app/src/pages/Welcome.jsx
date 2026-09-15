// Paper: the homepage frame (globe hero → bento → shelf → who's on → scenes → around the world → footer).
// Everything on it comes from the API: the player, the members' now-playing,
// the activity log, the scenes, the note pins and the canon disclaimer.
// Curation is community-driven: anyone who joins can shelve a list, write why
// and reply at a second. Nothing here talks about how anyone is paid.
import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import Avatar from '../components/Avatar.jsx'
import Waveform from '../components/Waveform.jsx'
import GlobeHero from '../components/Globe.jsx'
import CountryCard from '../components/CountryCard.jsx'
import { useApi, bg, getJson } from '../lib/api.js'
import { usePlayer } from '../lib/player.jsx'
import './Welcome.css'

// The shelf as drawn on the homepage frame, left to right.
const SHELF = ['garden-sessions', 'the-archive', 'late-night-heat', 'jazz-nights', 'cassette-dreams', 'poolside', 'golden-hour', 'tropicalia']
const COVERS = ['golden-hour', 'the-archive', 'garden-sessions', 'jazz-nights', 'cassette-dreams', 'tropicalia']
const PAIR = ['luana-andrade', 'ade-mensah', 'ingrid-halvorsen']
const first = (n = '') => n.split(' ')[0]
const compact = (n) => (n >= 1e6 ? `${+(n / 1e6).toFixed(2)}M` : n >= 1e3 ? `${Math.round(n / 1e3)}K` : String(n))

export default function Welcome() {
  const { data, error } = useApi(['curators/index', 'activity', 'scenes', 'index', 'playlists/index', 'globe', 'countries'])
  const p = usePlayer()
  if (error) return <p className="page muted">Could not load the homepage data.</p>
  if (!data) return null
  const [cu, act, scenesDoc, index, plIndex, globe, countriesDoc] = data
  // On the shelf this week: the eight lists on the frame, in its order. Around the world: the drawn country cards.
  const shelf = SHELF.map((slug) => plIndex.playlists.find((l) => l.slug === slug)).filter(Boolean)
  const world = countriesDoc.countries.filter((c) => c.image).slice(0, 5)
  const listSlug = Object.fromEntries(plIndex.playlists.map((l) => [l.id, l.slug]))
  // A dot's Play: load the list it is on and start at that track; Pause when it is already the one playing.
  const playPoint = (pt, isPlayingThis) => {
    if (isPlayingThis) { p.toggle(); return }
    if (!pt?.playlist?.slug) return
    getJson(`playlists/${pt.playlist.slug}`).then((l) => p.playList(l, pt.track.id))
  }
  const bySlug = Object.fromEntries(cu.curators.map((c) => [c.slug, c]))
  const covers = COVERS.map((s) => plIndex.playlists.find((l) => l.slug === s)).filter(Boolean)
  const pair = PAIR.map((s) => bySlug[s]).filter(Boolean)

  return (
    <div className="wl" id="top">
      <header className="wl-nav">
        <Link to="/welcome" className="logo"><Icon name="logo" /><span className="display t-lg">Kraft</span></Link>
        <nav className="wl-links t-sm">
          <a href="#people">People</a>
          <a href="#scenes">Scenes</a>
          <Link to="/" className="wl-login">Log in</Link>
          <Link to="/" className="wl-btn wl-btn--sm">Start listening</Link>
        </nav>
      </header>

      <section className="wl-hero wl-hero--globe">
        <div className="wl-globe-wrap"><GlobeHero points={globe.points} playingId={p.playing ? p.track?.id : null} onPlay={playPoint} /></div>
        <div className="wl-hero-body">
          <div className="wl-hero-copy">
            <h1 className="display wl-statement">Connect and discover through music</h1>
            <div className="wl-actions">
              <Link to="/" className="wl-btn">Start listening</Link>
              <Link to="/" className="t-sm">Log in</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="wl-section wl-what">
        <div className="wl-bento">
          <div className="wl-tile wl-tile--statement">
            <div className="wl-tile-copy">
              <h2 className="display wl-what-line">A small library, played by people who talk about it.</h2>
              <p className="t-lg muted">Every list here is made by a member, with a note on why. Every reply is pinned to a second inside a track.</p>
            </div>
            <div className="wl-covers">
              {covers.map((l) => <Link key={l.id} to={`/lists/${l.slug}`} className="cover" style={bg(l.image)} aria-label={l.title} />)}
            </div>
          </div>
          <div className="wl-tile wl-tile--albums">
            <span className="t-sm muted">Albums</span>
            <div className="wl-tile-num"><span className="display wl-number-n">{index.canon.catalogueAlbums.toLocaleString('en')}</span><span className="t-sm muted">chosen, not ingested</span></div>
          </div>
          <div className="wl-tile wl-tile--curators">
            <div className="wl-tile-head">
              <span className="t-sm muted">Who curates</span>
              <span className="wl-portraits">{cu.curators.slice(0, 8).map((c) => <Avatar key={c.id} src={c.image} name={c.name} size={28} />)}</span>
            </div>
            <div className="wl-tile-num"><span className="display wl-number-n">Anyone</span><span className="t-sm muted">shelve a list, write why</span></div>
          </div>
          <div className="wl-tile wl-tile--members">
            <div className="wl-tile-head">
              <span className="t-sm muted">Members</span>
              <span className="wl-live t-xs muted"><span className="led" /> {compact(index.canon.monthlyActive)} listened this month</span>
            </div>
            <div className="wl-tile-num"><span className="display wl-number-n">{compact(index.canon.subscribers)}</span><span className="t-sm muted">listening and replying</span></div>
          </div>
          <div className="wl-tile wl-tile--follows">
            <div className="wl-tile-head">
              <span className="t-sm muted">New follows</span>
              <span className="wl-pair">{pair.map((c, i) => <span key={c.id} className="wl-pair-item">{i > 0 && <i />}<Avatar src={c.image} name={c.name} size={28} /></span>)}</span>
            </div>
            <div className="wl-tile-num"><span className="display wl-number-n">{(act.thisWeek?.newFollows ?? 0).toLocaleString('en')}</span><span className="t-sm muted">this week, member to member</span></div>
          </div>
          <div className="wl-tile wl-tile--notes">
            <span className="t-sm muted">Notes at a moment</span>
            <Waveform seed="notes-at-a-moment" position={0} duration={1} width={384} height={32} pitch={4} playhead={false} pins={[{ fraction: 0.15 }]} />
            <div className="wl-tile-num"><span className="display wl-number-n">{act.thisWeek?.notesLeft ?? '—'}</span><span className="t-sm muted">pinned to a second, this week</span></div>
          </div>
        </div>
      </section>

      <section className="wl-section">
        <header className="wl-head">
          <h2 className="display t-xl">On the shelf this week</h2>
        </header>
        <div className="wl-shelf">
          {shelf.map((l) => (
            <Link key={l.id} to={`/lists/${l.slug}`} className="wl-shelf-item">
              <span className="cover wl-shelf-cover" style={bg(l.image)} />
              <span className="t-base w-medium">{l.title}</span>
              <span className="t-xs muted">{l.curator?.name} · {l.trackCount} tracks</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="wl-section" id="people">
        <header className="wl-head">
          <h2 className="display t-xl">Who's on right now</h2>
        </header>
        <div className="wl-people">
          {cu.curators.map((c) => (
            <Link key={c.id} to={`/curators/${c.slug}`} className="wl-person">
              <Avatar src={c.image} name={c.name} size={104} textClass="t-lg" />
              <span className="t-base w-medium">{c.name}</span>
              {c.nowPlaying && <span className="t-sm muted">playing {c.nowPlaying.curatorName !== c.name ? `${first(c.nowPlaying.curatorName)}'s ` : ''}{c.nowPlaying.title}</span>}
            </Link>
          ))}
        </div>
      </section>

      <section className="wl-section" id="scenes">
        <header className="wl-head">
          <div><h2 className="display t-xl">Scenes</h2><p className="t-sm muted">A label, a city, a way of recording. Seven of them, each with people on it.</p></div>
          <Link to="/explore" className="t-sm muted">All {scenesDoc.scenes.length === 7 ? 'seven' : scenesDoc.scenes.length}</Link>
        </header>
        <div className="wl-scenes">
          {scenesDoc.scenes.slice(0, 4).map((s) => (
            <Link key={s.id} to="/explore" className="scene wl-scene" style={bg(s.artwork?.image)}>
              <span className="scene-text"><span className="t-lg w-medium">{s.name}</span><span className="t-xs">{s.metaLine} · {s.look}</span></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="wl-section" id="world">
        <header className="wl-head">
          <div><h2 className="display t-xl">Around the world</h2><p className="t-sm muted">One list per country, picked by someone who knows it.</p></div>
          <Link to="/countries" className="t-sm muted">All {countriesDoc.countries.length}</Link>
        </header>
        <div className="wl-world">
          {world.map((c) => (
            <Link key={c.code} to={listSlug[c.playlistId] ? `/lists/${listSlug[c.playlistId]}` : '/countries'} className="wl-world-item">
              <CountryCard country={c} size={215} />
              <span className="t-xs muted">{c.metaLine}</span>
            </Link>
          ))}
        </div>
      </section>

      <footer className="wl-footer">
        <div className="wl-footer-row">
          <span className="display t-md">Kraft</span>
          <nav className="wl-links t-sm muted"><a href="#people">People</a><a href="#scenes">Scenes</a><a href="#top">Pricing</a><a href="#top">Magazine</a><Link to="/">Log in</Link></nav>
        </div>
        <p className="t-sm subtle wl-disclaimer">{index.disclaimer}</p>
      </footer>
    </div>
  )
}
