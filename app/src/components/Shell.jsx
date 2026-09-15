// The frame every desktop screen shares: Top bar, Sidebar, Player bar.
// Paper: "Top bar", "Sidebar", "Player bar" on Desktop / Home — Dark.
import { Outlet, useLocation } from 'react-router-dom'
import TopBar from './TopBar.jsx'
import Sidebar from './Sidebar.jsx'
import PlayerBar from './PlayerBar.jsx'
import './Shell.css'

// List and Now Playing run edge to edge on the canvas; Artist keeps the
// sidebar but bleeds its hero to the main column's edges.
const NO_SIDEBAR = [/^\/lists\//, /^\/now-playing/]
const BLEED = [/^\/artists\//]

export default function Shell() {
  const { pathname } = useLocation()
  const sidebar = !NO_SIDEBAR.some((re) => re.test(pathname))
  const bleed = !sidebar || BLEED.some((re) => re.test(pathname))
  return (
    <div className="shell">
      <TopBar />
      <div className="shell-body">
        {sidebar && <Sidebar />}
        <main className={bleed ? 'shell-main shell-main--full' : 'shell-main'}>
          <Outlet />
        </main>
      </div>
      <PlayerBar />
    </div>
  )
}
