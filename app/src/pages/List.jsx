// Paper: Desktop / List — the list card on the left, the track table on the right.
import { useParams, Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { useApi, art, bg } from '../lib/api.js'
import { usePlayer } from '../lib/player.jsx'
import './List.css'

export default function List() {
  const { slug } = useParams()
  const { data, error } = useApi([`playlists/${slug}`, 'curators/index'])
  const p = usePlayer()
  if (error) return <p className="muted" style={{ padding: 24 }}>No list at /api/playlists/{slug}.json</p>
  if (!data) return null
  const [list, cuIndex] = data
  const curator = cuIndex.curators.find((c) => c.id === list.curator?.id)
  const isCurrent = p.context?.id === list.id
  const playingHere = isCurrent && p.playing

  return (
    <div className="list-page">
      <section className="list-card">
        <div className="list-card-head">
          <div className="list-byline">
            <Link to={`/curators/${curator?.slug}`} className="avatar" style={{ width: 20, height: 20, ...bg(curator?.image) }} />
            <Link to={`/curators/${curator?.slug}`} className="t-base w-medium">{list.curator?.name}</Link>
            <span className="t-base w-medium list-stats">{list.metaLine} · {list.followersLabel} following</span>
            <button className="iconbtn" aria-label="More"><Icon name="more" /></button>
          </div>
          <h1 className="display t-3xl list-title">{list.title}</h1>
          <div className="list-desc-row">
            <p className="t-base w-medium muted list-desc">{list.description}</p>
            <button
              className="playbtn"
              style={{ width: 48, height: 48 }}
              aria-label={playingHere ? 'Pause' : 'Play list'}
              onClick={() => (isCurrent ? p.toggle() : p.playList(list))}
            >
              <Icon name={playingHere ? 'pause' : 'play'} />
            </button>
          </div>
          {list.note && (
            <div className="list-note">
              <div className="list-byline">
                <span className="avatar" style={{ width: 24, height: 24, ...bg(curator?.image) }} />
                <span className="t-sm w-medium">{list.curator?.name}</span>
                <span className="t-xs subtle">updated {list.updatedLabel}</span>
              </div>
              <p className="t-md">{list.note}</p>
            </div>
          )}
        </div>
        <div className="cover list-cover" style={bg(art(list.artwork))} />
      </section>

      <section className="tracks">
        <div className="trackrow trackrow--head t-micro subtle">
          <span className="col-n">#</span>
          <span className="col-song"><span className="col-song-art" />song</span>
          <span className="col-album">Album</span>
          <span className="col-time">Time</span>
          <span className="col-icon" />
          <span className="col-icon"><Icon name="more" /></span>
        </div>
        {(list.tracks || []).map((t, i) => {
          const current = isCurrent && p.track?.id === t.id
          return (
            <div key={t.id} className={`trackrow${current ? ' trackrow--current' : ''}`} onDoubleClick={() => p.playList(list, t.id)}>
              <span className="col-n t-base muted tnum">{i + 1}</span>
              <span className="col-song">
                <span className="cover col-song-art" style={bg(t.albumArt)} />
                <span className="col-song-text">
                  <span className="t-base w-medium clamp-1">{t.title}</span>
                  <Link to={`/artists/${t.artist.slug}`} className="t-xs muted">{t.artist.name}</Link>
                </span>
              </span>
              <span className="col-album t-base muted clamp-1">{t.album.title}</span>
              <span className="col-time t-base muted tnum">{t.duration}</span>
              <button className="col-icon iconbtn" aria-label="Save"><Icon name="bookmark" /></button>
              <button className="col-icon iconbtn" aria-label="More"><Icon name="more" /></button>
            </div>
          )
        })}
      </section>
    </div>
  )
}
