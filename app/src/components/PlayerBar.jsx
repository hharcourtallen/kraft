// Paper: "Player bar" — now playing, transport, volume.
import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'
import { usePlayer } from '../lib/player.jsx'
import { bg } from '../lib/api.js'

export function Transport({ size = 24, playSize = 40, iconSize = 24 }) {
  const p = usePlayer()
  return (
    <div className="transport">
      <button aria-label="Shuffle" aria-pressed={p.shuffle} onClick={p.toggleShuffle}><Icon name="shuffle" size={size} /></button>
      <button aria-label="Previous" onClick={p.prev}><Icon name="prev" size={size} /></button>
      <button className="playbtn" style={{ width: playSize, height: playSize }} aria-label={p.playing ? 'Pause' : 'Play'} onClick={p.toggle}>
        <Icon name={p.playing ? 'pause' : 'play'} size={iconSize} />
      </button>
      <button aria-label="Next" onClick={p.next}><Icon name="next" size={size} /></button>
      <button aria-label="Repeat" aria-pressed={p.repeat !== 'off'} onClick={p.cycleRepeat}><Icon name="repeat" size={size} /></button>
    </div>
  )
}

export default function PlayerBar() {
  const p = usePlayer()
  const t = p.track
  return (
    <footer className="playerbar">
      <Link to="/now-playing" className="playerbar-info">
        <span className="cover" style={bg(t?.albumArt)} />
        <span style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <span className="t-base w-semibold clamp-1">{t?.title ?? '—'}</span>
          <span className="t-xs muted">{t?.artist?.name ?? ''}</span>
        </span>
      </Link>
      <Transport />
      <div className="volume">
        <Icon name="volume" />
        <div className="track" role="slider" aria-label="Volume" aria-valuenow={Math.round(p.volume * 100)}>
          <div className="track-fill" style={{ width: `${p.volume * 100}%` }} />
        </div>
      </div>
    </footer>
  )
}
