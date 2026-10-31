import { animate, motion, useMotionValue } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { materiales } from '../data/materiales.js'
import { prefersReducedMotion } from '../lib/motion.js'
import { useMedia } from '../lib/useMedia.js'
import Img from './Img.jsx'
import { SectionTitle } from './Titles.jsx'

// Posición inicial de cada muestra sobre la mesa (% del ancho/alto) y giro.
const layout = [
  { x: 5, y: 10, r: -4 },
  { x: 20, y: 44, r: 3 },
  { x: 38, y: 8, r: -2 },
  { x: 55, y: 46, r: 5 },
  { x: 70, y: 6, r: -6 },
  { x: 84, y: 40, r: 2 },
]
const layoutMobile = [
  { x: 4, y: 5, r: -4 },
  { x: 54, y: 9, r: 3 },
  { x: 8, y: 36, r: 2 },
  { x: 52, y: 40, r: -5 },
  { x: 5, y: 66, r: 4 },
  { x: 53, y: 69, r: -2 },
]

function Muestra({ m, i, pos, table, z, onFront, reset }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const [dragging, setDragging] = useState(false)

  // "Volver a ordenar" devuelve cada muestra a su lugar.
  useEffect(() => {
    if (!reset) return
    const opts = prefersReducedMotion() ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 28 }
    animate(x, 0, opts)
    animate(y, 0, opts)
  }, [reset, x, y])

  const nudge = (e) => {
    const step = e.shiftKey ? 48 : 16
    const d = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[e.key]
    if (!d) return
    e.preventDefault()
    onFront(i)
    x.set(x.get() + d[0])
    y.set(y.get() + d[1])
  }

  return (
    <motion.figure
      className={`muestra ${dragging ? 'is-drag' : ''}`}
      style={{ x, y, zIndex: z, left: `min(${pos.x}%, 100% - var(--cw) - 12px)`, top: `min(${pos.y}%, 100% - 290px)`, rotate: pos.r }}
      drag
      dragConstraints={table}
      dragElastic={0.08}
      dragMomentum={false}
      onPointerDown={() => onFront(i)}
      onDragStart={() => setDragging(true)}
      onDragEnd={() => setDragging(false)}
      whileDrag={{ scale: 1.04 }}
      tabIndex={0}
      onKeyDown={nudge}
      aria-label={`${m.nombre}, ${m.proveedor}. Usá las flechas para moverla sobre la mesa.`}
      data-snap=""
    >
      <Img photo={m.foto} alt={`Textura de ${m.nombre.toLowerCase()}`} sizes="200px" className="muestra-img" draggable="false" />
      <figcaption>
        <span className="mono text-concrete-ink">{m.codigo}</span>
        <span className="muestra-name">{m.nombre}</span>
        <span className="mono muestra-prov">{m.proveedor}</span>
        <span className="mono muestra-prov muestra-detalle text-concrete-ink">{m.detalle}</span>
      </figcaption>
    </motion.figure>
  )
}

/**
 * Muestrario: fichas de materiales que se arrastran y apilan sobre la mesa,
 * como cuando se arma el panel de materiales con el cliente.
 */
export default function Muestrario() {
  const table = useRef(null)
  const [order, setOrder] = useState(materiales.map((_, i) => i))
  const [reset, setReset] = useState(0)
  const front = (i) => setOrder((o) => (o[o.length - 1] === i ? o : [...o.filter((n) => n !== i), i]))

  const narrow = useMedia('(max-width: 767px)')
  const pos = narrow ? layoutMobile : layout

  return (
    <section id="materiales" className="frame section" aria-labelledby="materiales-title">
      <div className="section-head">
        <SectionTitle id="materiales-title">Materiales</SectionTitle>
        <p className="section-note">
          Antes de dibujar el último plano, armamos el panel con cada cliente. Mové las muestras, apilalas, combinalas.
        </p>
      </div>

      <div ref={table} className="mesa">
        <span className="mesa-cota mono" aria-hidden="true">
          Mesa de trabajo · 1,80 × 0,90
        </span>
        <span className="mesa-hint mono" aria-hidden="true">
          {narrow ? 'Arrastrá las muestras con el dedo' : 'Arrastrá las muestras'}
        </span>
        {materiales.map((m, i) => (
          <Muestra key={m.codigo} m={m} i={i} pos={pos[i]} table={table} z={order.indexOf(i) + 1} onFront={front} reset={reset} />
        ))}
      </div>
      <div className="mt-4 flex justify-end">
        <button type="button" className="btn-line" onClick={() => setReset((n) => n + 1)}>
          Volver a ordenar
        </button>
      </div>
    </section>
  )
}
