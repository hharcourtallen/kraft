// Second-pass routes. The artboards exist on the canvas; the pages come next.
import { useParams } from 'react-router-dom'

export default function Placeholder({ title }) {
  const { slug } = useParams()
  return (
    <div className="page">
      <h1 className="display t-3xl" style={{ margin: 0 }}>{title}{slug ? ` · ${slug}` : ''}</h1>
      <p className="t-md muted" style={{ margin: 0, maxWidth: 560 }}>
        Designed on the canvas (Desktop / {title}), not built yet. The data is already at
        /api — this route is the second pass.
      </p>
    </div>
  )
}
