// Paper: Desktop / Now Playing — the stage and the queue panel.
import { Transport } from '../components/PlayerBar.jsx'
import Waveform from '../components/Waveform.jsx'
import Avatar from '../components/Avatar.jsx'
import { usePlayer } from '../lib/player.jsx'
import { bg, mmss } from '../lib/api.js'
import './NowPlaying.css'

export default function NowPlaying() {
  const p = usePlayer()
  const t = p.track
  if (!t) return null
  const pin = p.pin && p.pin.trackId === t.id ? p.pin : null

  return (
    <div className="np">
      <section className="stage">
        <div className="stage-art" style={bg(t.albumArt)} />
        <div className="stage-copy">
          <h1 className="display t-xl">{t.title}</h1>
          <p className="t-sm muted">{t.artist.name} · {t.album.title}</p>
          <p className="t-xs subtle">{p.context?.line}</p>
        </div>
        <div className="scrubber">
          <span className="t-micro subtle tnum">{mmss(p.position)}</span>
          <Waveform seed={t.id} position={p.position} duration={t.durationSec} pin={pin} onSeek={p.seek} />
          <span className="t-micro subtle tnum">{t.duration}</span>
        </div>
        {pin && (
          <div className="pinned stage-pin">
            <Avatar src={pin.curatorImage} name={pin.curatorName} size={16} textClass="t-micro" />
            <span className="t-xs muted">{pin.curatorName} at {pin.label} · “{pin.note}”</span>
          </div>
        )}
        <div className="stage-transport">
          <Transport size={26} playSize={56} iconSize={22} />
        </div>
      </section>

      <aside className="queue">
        <div className="queue-head">
          <span className="t-base w-semibold">Queue</span>
          <button className="t-xs w-medium muted">Clear</button>
        </div>
        <QueueRow track={t} current />
        <div className="queue-next t-sm w-semibold subtle">Next up</div>
        <div className="queue-list">
          {p.queue.map((q, i) => (
            <QueueRow key={q.id} track={q} onClick={() => p.jumpTo(p.index + 1 + i)} />
          ))}
        </div>
      </aside>
    </div>
  )
}

function QueueRow({ track, current, onClick }) {
  return (
    <div className={`qrow${current ? ' qrow--current' : ''}`} onClick={onClick}>
      <span className="cover" style={{ width: 40, height: 40, ...bg(track.albumArt) }} />
      <span className="qrow-text">
        <span className={`t-sm w-medium clamp-1${current ? ' qrow-title' : ''}`}>{track.title}</span>
        <span className="t-xs muted">{track.artist.name}</span>
      </span>
      <span className="t-xs muted tnum qrow-time">{track.duration}</span>
    </div>
  )
}
