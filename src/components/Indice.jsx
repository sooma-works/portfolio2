import { useEffect, useRef, useState } from 'react'
import { obras } from '../data/obras.js'
import { isFinePointer } from '../lib/motion.js'
import { CutLink } from './Cut.jsx'
import Img from './Img.jsx'
import { SectionTitle } from './Titles.jsx'

const cols = ['Lámina', 'Obra', 'Tipo', 'Ubicación', 'm²', 'Año', 'Estado']

function Estado({ value }) {
  const enObra = value === 'En obra'
  return <span className={enObra ? 'estado-obra' : ''}>{value}</span>
}

/**
 * Índice de obras con estética de rótulo de plano. En desktop, la miniatura
 * de la obra sigue al cursor mientras se recorre la tabla.
 */
export default function Indice() {
  const thumb = useRef(null)
  const [hover, setHover] = useState(null)
  const fine = useRef(false)

  useEffect(() => {
    fine.current = isFinePointer()
  }, [])

  const move = (e) => {
    if (!fine.current || !thumb.current) return
    thumb.current.style.transform = `translate3d(${e.clientX + 28}px, ${e.clientY - 90}px, 0)`
  }

  return (
    <section id="obras" className="frame section" aria-labelledby="obras-title">
      <div className="section-head">
        <SectionTitle id="obras-title">Obras</SectionTitle>
        <p className="section-note mono">5 láminas · 2022–2026</p>
      </div>

      <table className="rotulo-table hidden md:table" onPointerMove={move} onPointerLeave={() => setHover(null)}>
        <caption className="sr-only">Índice de obras del estudio</caption>
        <thead>
          <tr>
            {cols.map((c) => (
              <th key={c} scope="col" className={c === 'm²' || c === 'Año' ? 'num' : ''}>
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {obras.map((o) => (
            <tr
              key={o.slug}
              className={hover === o.slug ? 'is-hover' : ''}
              onPointerEnter={() => setHover(o.slug)}
            >
              <td className="mono">{o.numero}</td>
              <td className="obra-cell">
                <CutLink to={`/obras/${o.slug}`} className="row-link" onFocus={() => setHover(o.slug)} onBlur={() => setHover(null)}>
                  {o.nombre}
                </CutLink>
              </td>
              <td>{o.tipo}</td>
              <td>{o.ubicacion}</td>
              <td className="mono num">{o.m2}</td>
              <td className="mono num">{o.anio}</td>
              <td className="mono">
                <Estado value={o.estado} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div ref={thumb} className={`index-thumb ${hover ? 'is-on' : ''}`} aria-hidden="true">
        {obras.map((o) => (
          <Img
            key={o.slug}
            photo={o.fotos[0]}
            alt=""
            sizes="280px"
            className={hover === o.slug ? 'is-on' : ''}
          />
        ))}
      </div>

      {/* Mobile: cada obra es un rótulo propio con su miniatura. */}
      <ol className="md:hidden">
        {obras.map((o) => (
          <li key={o.slug} className="rotulo-card">
            <CutLink to={`/obras/${o.slug}`} className="grid grid-cols-[96px_1fr] no-underline">
              <Img photo={o.fotos[0]} alt="" sizes="96px" className="h-full w-full object-cover" />
              <div className="grid grid-cols-2">
                <div className="cell col-span-2">
                  <span className="cell-k">Lámina {o.numero}</span>
                  <span className="text-[19px] leading-tight font-[650]">{o.nombre}</span>
                </div>
                <div className="cell">
                  <span className="cell-k">Tipo</span>
                  <span className="text-[14px] leading-snug">{o.tipo}</span>
                </div>
                <div className="cell">
                  <span className="cell-k">Estado</span>
                  <span className="mono">
                    <Estado value={o.estado} />
                  </span>
                </div>
                <div className="cell">
                  <span className="cell-k">Superficie</span>
                  <span className="mono">{o.m2} m²</span>
                </div>
                <div className="cell">
                  <span className="cell-k">Año</span>
                  <span className="mono">{o.anio}</span>
                </div>
              </div>
            </CutLink>
          </li>
        ))}
      </ol>
    </section>
  )
}
