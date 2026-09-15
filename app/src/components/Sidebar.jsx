// Paper: "Sidebar" — primary nav + Your lists.
import { NavLink, Link } from 'react-router-dom'
import Icon from './Icon.jsx'
import { useApi, bg } from '../lib/api.js'

const NAV = [
  { to: '/', icon: 'home', label: 'Home', end: true },
  { to: '/explore', icon: 'explore', label: 'Explore' },
  { to: '/library', icon: 'library', label: 'Library' },
]

export default function Sidebar() {
  const { data } = useApi('playlists/index')
  const lists = (data?.playlists ?? [])
    .filter((l) => !l.stressFixture && !l.countryCode) // country lists live on Home, not in your lists
    .sort((a, b) => Number(b.system) - Number(a.system)) // Liked Songs first

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {NAV.map((n) => (
          <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => `navitem${isActive ? ' active' : ''}`}>
            <Icon name={n.icon} size={18} />
            {n.label}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-head t-sm">
        Your lists
        <Icon name="chevron" size={12} />
      </div>
      <div className="sidebar-lists">
        {lists.map((l) =>
          l.system ? (
            <Link key={l.id} to="/library" className="listrow">
              <span className="liked"><Icon name="liked" size={14} /></span>
              <span className="listrow-text">
                <span className="t-sm clamp-1">{l.title}</span>
                <span className="t-micro subtle">{l.subtitle}</span>
              </span>
            </Link>
          ) : (
            <Link key={l.id} to={`/lists/${l.slug}`} className="listrow">
              <span className="cover" style={bg(l.image)} />
              <span className="listrow-text">
                <span className="t-sm clamp-1">{l.title}</span>
                <span className="t-micro subtle">{l.curator?.name}</span>
              </span>
            </Link>
          ),
        )}
      </div>
      <Link to="/welcome" className="sidebar-foot t-xs subtle">Homepage</Link>
      <div className="sidebar-settings">
        <NavLink to="/settings" className={({ isActive }) => `navitem${isActive ? ' active' : ''}`}>
          <Icon name="gear" size={18} />
          Settings
        </NavLink>
      </div>
    </aside>
  )
}
