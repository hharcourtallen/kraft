// Paper: Marketing / Homepage — Stage final. The logged-out homepage.
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

const COVERS = ['golden-hour', 'the-archive', 'garden-sessions', 'jazz-nights', 'cassette-dreams', 'tropicalia']
const PAIR = ['luana-andrade', 'ade-mensah', 'ingrid-halvorsen']
const first = (n = '') => n.split(' ')[0]
const compact = (n) => (n >= 1e6 ? `${+(n / 1e6).toFixed(2)}M` : n >= 1e3 ? `${Math.round(n / 1e3)}K` : String(n))

// The week as it happened: an update owns the replies left on its list; reposts and follows are rows.
function groupFeed(activity) {
  const used = new Set()
  const out = []
  for (const a of activity) {
    if (a.type === 'update') {
      const replies = activity.filter((r) => r.type === 'reply' && r.playlist?.id === a.playlist?.id && !used.has(r.id))
      replies.forEach((r) => used.add(r.id))
      out.push({ kind: 'card', a, replies })
    } else if (a.type === 'reply') {
      if (!used.has(a.id)) { used.add(a.id); out.push({ kind: 'row', a }) }
    } else out.push({ kind: 'row', a })
  }
  return out
}

export default function Welcome() {
  const { data, error } = useApi(['curators/index', 'activity', 'scenes', 'index', 'playlists/index', 'globe', 'countries'])
  const p = usePlayer()
  if (error) return <p className="page muted">Could not load the homepage data.</p>
  if (!data) return null
  const [cu, act, scenesDoc, index, plIndex, globe, countriesDoc] = data
  // On the shelf this week: real lists, newest update first. Around the world: the drawn country cards.
  const shelf = plIndex.playlists.filter((l) => !l.system && !l.stressFixture && l.image).sort((a, b) => (b.updated ?? '').localeCompare(a.updated ?? '')).slice(0, 8)
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
  const feed = groupFeed(act.activity)

  return (
    <div className="wl">
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
            <h1 className="display wl-statement">Connect and discover through music.</h1>
            <div className="wl-actions">
              <Link to="/" className="wl-btn">Start listening</Link>
              <Link to="/" className="t-sm">Log in</Link>
            </div>
            <div className="wl-live t-sm wl-dim"><span className="led" /> {globe.listeningNow.toLocaleString('en')} listening right now</div>
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
          <div><h2 className="display t-xl">On the shelf this week</h2><p className="t-sm muted">Lists updated by the people who made them, newest first.</p></div>
          <Link to="/explore" className="t-sm muted">All lists</Link>
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
          <div><h2 className="display t-xl">Who's on right now</h2><p className="t-sm muted">Nine members, each playing a list they made. Follow the ones who hear what you hear.</p></div>
          <Link to="/explore" className="t-sm muted">See everyone playing</Link>
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

      <section className="wl-section wl-split">
        <div className="wl-split-lead">
          <h2 className="display t-xl">This week on Kraft</h2>
          <p className="t-md muted">Lists get updated. Replies land at a second inside a track. Lists end up on other people's shelves. One week, as it happened.</p>
          {act.thisWeek && <p className="t-sm muted">{act.thisWeek.listsUpdated} lists updated · {act.thisWeek.notesLeft} notes left · {act.thisWeek.reposts} reposts</p>}
        </div>
        <div className="wl-feed">
          {feed.map(({ kind, a, replies }) => kind === 'card' ? (
            <article key={a.id} className="wl-card">
              <div className="wl-card-head">
                <Link to={`/lists/${a.playlist?.slug}`} className="cover wl-card-cover" style={bg(a.playlist?.image)} aria-label={a.playlist?.title} />
                <div className="wl-card-text">
                  <Link to={`/lists/${a.playlist?.slug}`} className="t-md w-medium">{a.playlist?.title}</Link>
                  <span className="wl-card-meta t-sm muted"><Avatar src={a.curator?.image} name={a.curator?.name} size={20} /><span><Link to={`/curators/${a.curator?.slug}`}>{a.curator?.name}</Link> updated the list</span></span>
                </div>
                <span className="t-sm muted wl-card-when">{a.dateLabel}</span>
              </div>
              {a.text && <p className="t-md wl-card-note">“{a.text}”</p>}
              <Waveform seed={replies[0]?.track?.id ?? a.playlist?.id} position={0} duration={1} width={784} height={40} pitch={4} playhead={false} fluid
                pins={replies.map((r) => ({ fraction: r.track?.durationSec ? r.sec / r.track.durationSec : 0.5 }))} />
              {replies.map((r) => (
                <div key={r.id} className="wl-reply t-sm">
                  <Avatar src={r.curator?.image} name={r.curator?.name} size={24} />
                  <Link to={`/curators/${r.curator?.slug}`} className="w-medium">{r.curator?.name}</Link>
                  <span className="muted">at {r.secLabel}</span>
                  {r.text && <span>“{r.text}”</span>}
                </div>
              ))}
            </article>
          ) : (
            <div key={a.id} className="wl-feed-row">
              <Avatar src={a.curator?.image} name={a.curator?.name} size={32} textClass="t-xs" />
              <div className="wl-row-text">
                <span className="t-md"><Link to={`/curators/${a.curator?.slug}`}>{a.curator?.name}</Link> {a.line}{a.text ? `. “${a.text}”` : ''}</span>
                <span className="t-sm muted">{a.dateLabel}</span>
              </div>
              {a.type === 'repost' && a.playlist?.image && <Link to={`/lists/${a.playlist.slug}`} className="cover wl-row-cover" style={bg(a.playlist.image)} aria-label={a.playlist.title} />}
              {a.type === 'follow' && a.target && <Link to={`/curators/${a.target.slug}`}><Avatar src={a.target.image} name={a.target.name} size={40} textClass="t-xs" /></Link>}
            </div>
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

      <section className="wl-section">
        <h2 className="display t-xl">Three things you can do here</h2>
        <div className="wl-three">
          {[
            ['Follow people', 'Anyone here can shelve a list. Follow the ones who hear what you hear, and nothing else shows up.'],
            ['Play the list', 'Every one is sequenced by a person, with a note on why. There is no autoplay after the last track.'],
            ['Leave a note at a moment', 'Press the waveform where it got you and say so. It stays there for everyone who plays it after you.'],
          ].map(([title, body], i) => (
            <div key={title} className="wl-thing">
              <span className="t-sm muted">{i + 1}</span>
              <span className="t-lg w-medium">{title}</span>
              <span className="t-md muted">{body}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="wl-section wl-close">
        <h2 className="display wl-close-line">Follow three people and see what shows up.</h2>
        <div className="wl-actions">
          <Link to="/" className="wl-btn">Start listening</Link>
          <Link to="/" className="t-sm muted">Already here? Log in</Link>
        </div>
        <p className="t-sm muted wl-members">{(index.canon.subscribers / 1e6).toFixed(1)} million members. {compact(index.canon.monthlyActive)} of them listened this month{act.thisWeek ? `, and ${act.thisWeek.notesLeft} left a note this week` : ''}.</p>
      </section>

      <footer className="wl-footer">
        <div className="wl-footer-row">
          <span className="display t-md">Kraft</span>
          <nav className="wl-links t-sm muted"><a href="#people">People</a><a href="#scenes">Scenes</a><Link to="/">Log in</Link></nav>
        </div>
        <p className="t-sm subtle wl-disclaimer">{index.disclaimer}</p>
      </footer>
    </div>
  )
}
