// Icons mirror the SVGs on the Paper "Components — Kraft" artboard.
// Every stroke and fill is currentColor, so the parent's color token decides.
const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }

const paths = {
  // The Kraft mark: a bar, a centre square and two corner squares on a 16 grid
  // (the card template draws it at 13: 4 / 5 / 4).
  logo: <path fill="currentColor" d="M0 0H5V16H0ZM5 5H11V11H5ZM11 0H16V5H11ZM11 11H16V16H11Z" />,
  back: <path {...stroke} d="M9 10L5 7l4-3" />,
  // Settings and the Appearance controls (after Lucide, ISC).
  gear: (
    <>
      <path {...stroke} d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle {...stroke} cx="12" cy="12" r="3" />
    </>
  ),
  moon: <path {...stroke} strokeWidth={2} d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />,
  sun: (
    <>
      <circle {...stroke} strokeWidth={2} cx="12" cy="12" r="4" />
      <path {...stroke} strokeWidth={2} d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </>
  ),
  monitor: (
    <>
      <rect {...stroke} strokeWidth={2} x="2" y="3" width="20" height="14" rx="2" />
      <path {...stroke} strokeWidth={2} d="M8 21h8M12 17v4" />
    </>
  ),
  check: <path {...stroke} strokeWidth={2.5} d="M20 6 9 17l-5-5" />,
  forward: <path {...stroke} d="M5 4l4 3-4 3" />,
  search: (
    <>
      <circle {...stroke} cx="7" cy="7" r="5" />
      <path {...stroke} d="M11 11l2.5 2.5" />
    </>
  ),
  home: (
    <path {...stroke} d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
  ),
  explore: (
    <>
      <circle {...stroke} cx="12" cy="12" r="9" />
      <path {...stroke} d="m15.5 8.5-2 5-5 2 2-5z" />
    </>
  ),
  library: <path {...stroke} d="M6 3h12v18l-6-4-6 4z" />,
  chevron: <path {...stroke} d="M6 9l6 6 6-6" />,
  liked: (
    <>
      <path {...stroke} d="M9 18V6l11-2v11" />
      <circle {...stroke} cx="6.5" cy="18" r="2.5" />
      <circle {...stroke} cx="17.5" cy="15" r="2.5" />
    </>
  ),
  play: <path fill="currentColor" d="M7 4l13 8-13 8z" />,
  pause: (
    <>
      <path fill="currentColor" d="M6 5h4v14H6z" />
      <path fill="currentColor" d="M14 5h4v14h-4z" />
    </>
  ),
  prev: (
    <>
      <polygon fill="currentColor" points="19 20 9 12 19 4 19 20" />
      <line {...stroke} x1="5" y1="19" x2="5" y2="5" />
    </>
  ),
  next: (
    <>
      <polygon fill="currentColor" points="5 4 15 12 5 20 5 4" />
      <line {...stroke} x1="19" y1="5" x2="19" y2="19" />
    </>
  ),
  shuffle: (
    <>
      <polyline {...stroke} points="16 3 21 3 21 8" />
      <line {...stroke} x1="4" y1="20" x2="21" y2="3" />
      <polyline {...stroke} points="21 16 21 21 16 21" />
      <line {...stroke} x1="15" y1="15" x2="21" y2="21" />
      <line {...stroke} x1="4" y1="4" x2="9" y2="9" />
    </>
  ),
  repeat: (
    <>
      <polyline {...stroke} points="17 1 21 5 17 9" />
      <path {...stroke} d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline {...stroke} points="7 23 3 19 7 15" />
      <path {...stroke} d="M21 13v2a4 4 0 0 1-4 4H3" />
    </>
  ),
  volume: (
    <>
      <path {...stroke} d="M11 5 6 9H2v6h4l5 4z" />
      <path {...stroke} d="M15.5 8.5a5 5 0 0 1 0 7" />
      <path {...stroke} d="M19 5.5a9 9 0 0 1 0 13" />
    </>
  ),
  bookmark: <path {...stroke} d="M6 3h12v18l-6-4-6 4z" />,
  more: (
    <>
      <circle fill="currentColor" cx="5" cy="12" r="1.5" />
      <circle fill="currentColor" cx="12" cy="12" r="1.5" />
      <circle fill="currentColor" cx="19" cy="12" r="1.5" />
    </>
  ),
}

const boxes = { logo: '0 0 16 16', back: '0 0 14 14', forward: '0 0 14 14', search: '0 0 16 16' }

export default function Icon({ name, size = 24, className, style }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={boxes[name] || '0 0 24 24'}
      aria-hidden="true"
      className={className}
      style={{ flexShrink: 0, display: 'block', ...style }}
    >
      {paths[name]}
    </svg>
  )
}
