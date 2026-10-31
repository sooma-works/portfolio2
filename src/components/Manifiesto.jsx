import { manifiesto } from '../data/estudio.js'

// Tres principios, cada uno como una llamada de detalle del plano:
// círculo partido con el número de detalle arriba y la lámina abajo.
export default function Manifiesto() {
  return (
    <section className="frame section" aria-labelledby="manifiesto-title">
      <h2 id="manifiesto-title" className="sr-only">
        Cómo trabajamos
      </h2>
      <p className="manifiesto-lead">
        Un lindero es la línea donde termina un terreno y empieza otro. Trabajamos ahí: entre lo que ya está y lo que
        hace falta.
      </p>
      <ol className="manifiesto-grid">
        {manifiesto.map((p) => (
          <li key={p.ref} className="detalle">
            <svg className="detalle-bubble" viewBox="0 0 64 64" aria-hidden="true">
              <circle cx="32" cy="32" r="30" />
              <line x1="2" y1="32" x2="62" y2="32" />
              <text x="32" y="25" textAnchor="middle">
                {p.ref}
              </text>
              <text x="32" y="50" textAnchor="middle" className="small">
                {p.lamina}
              </text>
            </svg>
            <span className="detalle-leader" aria-hidden="true" />
            <h3 className="detalle-title">{p.titulo}</h3>
            <p className="detalle-text">{p.texto}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
