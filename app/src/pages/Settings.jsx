// Paper: Desktop / Settings — Dark / Light (direction C, chosen 2026-09-15).
// Appearance: one card per theme with a live preview, then Mode. Each preview
// sets its own data-theme and data-mode, so it is drawn by the real tokens —
// the same two-axis system as the page around it, not a picture of it.
import Icon from '../components/Icon.jsx'
import { useTheme } from '../lib/theme.jsx'
import { usePlayer } from '../lib/player.jsx'
import './Settings.css'

const NAMES = { plum: 'Plum', graphite: 'Graphite' }
const MODE = { dark: ['moon', 'Dark'], light: ['sun', 'Light'], system: ['monitor', 'System'] }
const COVERS = ['vinyl-sundays', 'garden-sessions', 'the-archive'].map((s) => `/artwork/playlist/${s}.jpg`)

function ThemePreview({ theme, mode }) {
  return (
    <span className="tp" data-theme={theme} data-mode={mode} aria-hidden="true">
      <span className="tp-top"><i className="tp-mark" /><i className="tp-word" /><i className="tp-search" /><i className="tp-avatar" /></span>
      <span className="tp-body">
        <span className="tp-side">
          <i className="tp-nav tp-nav--on" /><i className="tp-nav" /><i className="tp-nav" />
          <i className="tp-gap" />
          <i className="tp-row" /><i className="tp-row" /><i className="tp-row" />
        </span>
        <span className="tp-main">
          <i className="tp-title" /><i className="tp-sub" />
          <span className="tp-covers">{COVERS.map((c) => <i key={c} style={{ backgroundImage: `url(${c})` }} />)}</span>
          <span className="tp-actions"><i className="tp-btn" /><i className="tp-led tp-led--accent" /><i className="tp-led tp-led--signal" /></span>
        </span>
      </span>
      <span className="tp-player"><i className="tp-play" /><i className="tp-progress" /></span>
    </span>
  )
}

function Row({ title, detail, children, stack = false }) {
  return (
    <div className={`settings-row${stack ? ' settings-row--stack' : ''}`}>
      <div className="settings-label">
        <span className="t-base w-medium">{title}</span>
        <span className="t-sm muted">{detail}</span>
      </div>
      {children}
    </div>
  )
}

export default function Settings() {
  const { theme, mode, resolvedMode, themes, modes, setTheme, setMode } = useTheme()
  const p = usePlayer()

  return (
    <div className="page">
      <div className="settings">
        <header className="settings-head">
          <h1 className="display t-2xl">Settings</h1>
          <p className="t-sm muted">How Kraft looks and plays on this computer.</p>
        </header>

        <section className="settings-section">
          <h2 className="t-lg w-medium">Appearance</h2>
          <Row title="Theme" detail="Two palettes on one system. Every screen changes with it." stack>
            <div className="theme-cards" role="radiogroup" aria-label="Theme">
              {themes.map((t) => (
                <button key={t} type="button" role="radio" aria-checked={theme === t} className="theme-card" onClick={() => setTheme(t)}>
                  <span className="theme-frame"><ThemePreview theme={t} mode={resolvedMode} /></span>
                  <span className="theme-meta">
                    <span className="t-sm w-medium">{NAMES[t] ?? t}</span>
                    <span className="swatches" data-theme={t} data-mode={resolvedMode} aria-hidden="true">
                      <i className="sw-neutral" /><i className="sw-accent" /><i className="sw-signal" />
                    </span>
                    {theme === t && <span className="theme-inuse t-xs"><Icon name="check" size={14} />In use</span>}
                  </span>
                </button>
              ))}
            </div>
          </Row>
          <Row title="Mode" detail="System follows your computer, dark at night if it is.">
            <div className="seg" role="radiogroup" aria-label="Mode">
              {modes.map((m) => (
                <button key={m} type="button" role="radio" aria-checked={mode === m} onClick={() => setMode(m)}>
                  <Icon name={MODE[m][0]} size={14} />{MODE[m][1]}
                </button>
              ))}
            </div>
          </Row>
        </section>

        <section className="settings-section">
          <h2 className="t-lg w-medium">Playback</h2>
          <Row title="Audio quality" detail="The same on every plan, for every track.">
            <span className="t-sm muted">Lossless · 24-bit / 192 kHz</span>
          </Row>
          <Row title="When a list ends" detail="Kraft never plays on into something nobody picked.">
            <div className="seg" role="radiogroup" aria-label="When a list ends">
              <button type="button" role="radio" aria-checked={p.repeat === 'off'} onClick={() => p.setRepeat('off')}>Stop</button>
              <button type="button" role="radio" aria-checked={p.repeat !== 'off'} onClick={() => p.setRepeat('all')}>Repeat the list</button>
            </div>
          </Row>
        </section>
      </div>
    </div>
  )
}
