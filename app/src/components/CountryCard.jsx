// Paper: UI page, "Country / <name> · <city>" — the country card template.
// Geometry is the template's, measured off the canvas (see scripts/lib/place-art.mjs
// CARD): every length is in card units, so the card scales with its width and
// the type never needs re-kerning per country. The art is a pixel-snapped PNG
// from `npm run countries -- --snap`, drawn with nearest-neighbour scaling.
import './CountryCard.css'

export default function CountryCard({ country, size }) {
  return (
    <figure
      className="country-card"
      style={size ? { width: size } : undefined}
      aria-label={`${country.name} · ${country.city}`}
    >
      <div className="cc-art" style={country.image ? { backgroundImage: `url(${country.image})` } : undefined} />
      <span className="cc-mark" aria-hidden="true">
        <svg viewBox="0 0 13 13" width="13" height="13">
          <rect x="0" y="0" width="4" height="13" />
          <rect x="4" y="4" width="5" height="5" />
          <rect x="9" y="0" width="4" height="4" />
          <rect x="9" y="9" width="4" height="4" />
        </svg>
        Kraft
      </span>
      <span className="cc-name cc-ghost" aria-hidden="true">{country.name}</span>
      <span className="cc-name cc-bottom" aria-hidden="true">{country.name}</span>
      <span className="cc-name cc-middle">{country.name}</span>
    </figure>
  )
}
