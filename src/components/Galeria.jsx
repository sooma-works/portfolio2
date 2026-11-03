import { useEffect, useRef, useState } from 'react'
import Img from './Img.jsx'

const num = (i) => `F-${String(i + 1).padStart(2, '0')}`

/**
 * Hoja de contactos de la obra: miniaturas cuadradas en grilla. Al tocar una
 * se abre completa en un visor (dialog nativo), con anterior/siguiente por
 * botones o flechas del teclado y Esc para cerrar.
 */
export default function Galeria({ fotos, nombre }) {
  const [open, setOpen] = useState(null)
  const dlg = useRef(null)

  useEffect(() => {
    const d = dlg.current
    if (open === null) {
      if (d.open) d.close()
      return
    }
    if (!d.open) d.showModal()
    const onKey = (e) => {
      if (e.key === 'ArrowRight') setOpen((i) => (i + 1) % fotos.length)
      if (e.key === 'ArrowLeft') setOpen((i) => (i - 1 + fotos.length) % fotos.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, fotos.length])

  const f = open !== null ? fotos[open] : null

  return (
    <>
      <ul className="galeria">
        {fotos.map((p, i) => (
          <li key={p.src}>
            <button
              type="button"
              className="galeria-btn"
              onClick={() => setOpen(i)}
              aria-label={`Ver foto ${i + 1} de ${fotos.length}: ${p.alt}`}
            >
              <Img photo={p} alt="" sizes="(min-width: 900px) 420px, 50vw" />
            </button>
            <p className="mono galeria-cap">
              <span>{num(i)}</span> {p.alt}
            </p>
          </li>
        ))}
      </ul>

      <dialog
        ref={dlg}
        className="visor"
        aria-label={`Fotos de ${nombre}`}
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === e.currentTarget && setOpen(null)}
      >
        {f && (
          <figure className="visor-fig">
            <Img key={f.src} photo={f} sizes="100vw" className="visor-img" />
            <figcaption className="mono visor-bar">
              <span className="visor-cap">
                <span>{num(open)}</span> {f.alt}
              </span>
              <span className="visor-nav">
                <button type="button" onClick={() => setOpen((open - 1 + fotos.length) % fotos.length)}>
                  ← Anterior
                </button>
                <button type="button" onClick={() => setOpen((open + 1) % fotos.length)}>
                  Siguiente →
                </button>
                <button type="button" onClick={() => setOpen(null)} autoFocus>
                  Cerrar
                </button>
              </span>
            </figcaption>
          </figure>
        )}
      </dialog>
    </>
  )
}
