// Paper: "Top bar" — logo + history, search, account.
import { Link, useNavigate } from 'react-router-dom'
import Icon from './Icon.jsx'
import { useApi, art, bg } from '../lib/api.js'

export default function TopBar() {
  const navigate = useNavigate()
  const { data } = useApi(['home', 'curators/sofia-reyes'])
  const [home, me] = data || []

  return (
    <header className="topbar">
      <div className="topbar-left">
        <Link to="/" className="logo">
          <Icon name="logo" />
          <span className="display t-lg">Kraft</span>
        </Link>
        <nav className="topbar-nav" aria-label="History">
          <button className="iconbtn" onClick={() => navigate(-1)} aria-label="Back">
            <Icon name="back" size={14} />
          </button>
          <button className="iconbtn" onClick={() => navigate(1)} aria-label="Forward">
            <Icon name="forward" size={14} />
          </button>
        </nav>
      </div>

      <label className="search">
        <Icon name="search" size={14} />
        <input type="search" placeholder="Search tracks, artists, albums…" />
      </label>

      <div className="topbar-right">
        <div className="avatar" style={{ width: 24, height: 24, ...bg(art(me?.artwork?.portrait)) }} />
        <span className="t-sm">{home?.user?.displayName ?? '…'}</span>
      </div>
    </header>
  )
}
