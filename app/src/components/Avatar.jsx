// Paper: "Person / avatar" — portrait when one exists, initials on a well otherwise.
import { bg, initials } from '../lib/api.js'

export default function Avatar({ src, name, size = 24, className = '', textClass = 't-micro' }) {
  return (
    <span className={`avatar ${textClass} ${className}`} style={{ width: size, height: size, ...bg(src) }}>
      {!src && initials(name)}
    </span>
  )
}

// Paper: "Button / follow" — bg-inverse when idle, outlined with an LED when following.
export function FollowButton({ active, onClick, size = 'md' }) {
  return (
    <button className={`follow follow--${size}${active ? ' follow--on' : ''}`} onClick={onClick} aria-pressed={active}>
      {active && <span className="led" />}
      {active ? 'Following' : 'Follow'}
    </button>
  )
}
