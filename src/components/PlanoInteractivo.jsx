import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../lib/motion.js'
import { useMedia } from '../lib/useMedia.js'
import Img from './Img.jsx'
import { fmtM2 } from '../lib/format.js'
import Plan from './Plan.jsx'

// Número que cuenta hasta su valor cada vez que cambia.
function Count({ value }) {
  const [v, setV] = useState(value)
  const from = useRef(0)
  const reduce = prefersReducedMotion()
  useEffect(() => {
    if (reduce) return
    const start = performance.now()
    const a = from.current
    let raf
    const tick = (t) => {
      const p = Math.min(1, (t - start) / 600)
      const e = 1 - (1 - p) ** 3
      setV(a + (value - a) * e)
      if (p < 1) raf = requestAnimationFrame(tick)
      else from.current = value
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value, reduce])
  return fmtM2(reduce ? value : v)
}

/**
 * Plano navegable de una obra: cada ambiente se resalta con rayado naranja,
 * muestra nombre y m² y la foto de ese ambiente. Funciona con mouse, toque
 * y teclado (Tab entre ambientes).
 */
export default function PlanoInteractivo({ obra }) {
  const { plan, fotos } = obra
  const first = plan.rooms.find((r) => r.photo !== undefined) ?? plan.rooms[0]
  const [active, setActive] = useState(first.id)
  const [play, setPlay] = useState(false)
  const box = useRef(null)
  const narrow = useMedia('(max-width: 767px)')
  const [x0, y0, x1, y1] = [
    Math.min(...plan.rooms.flatMap((r) => r.pts.map((p) => p[0]))),
    Math.min(...plan.rooms.flatMap((r) => r.pts.map((p) => p[1]))),
    Math.max(...plan.rooms.flatMap((r) => r.pts.map((p) => p[0]))),
    Math.max(...plan.rooms.flatMap((r) => r.pts.map((p) => p[1]))),
  ]
  const rotate = narrow && (x1 - x0) / (y1 - y0) > 1.5

  // La planta se dibuja (y las cotas cuentan) recién al entrar en pantalla.
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setPlay(true), { threshold: 0.25 })
    io.observe(box.current)
    return () => io.disconnect()
  }, [])

  const room = plan.rooms.find((r) => r.id === active)
  const photo = room.photo !== undefined ? fotos[room.photo] : null
  const total = plan.rooms.filter((r) => !r.exterior).reduce((a, r) => a + r.m2, 0)

  return (
    <div className="plano" ref={box}>
      <div className="plano-dwg">
        <Plan
          plan={plan}
          play={play}
          interactive
          active={active}
          onActivate={setActive}
          rotate={rotate}
          title={`Planta de ${obra.nombre}. Recorré los ambientes con el mouse, tocándolos o con la tecla Tab.`}
        />
      </div>

      <aside className="plano-panel" aria-live="polite">
        <div className="rotulo grid grid-cols-2">
          <div className="cell col-span-2">
            <span className="cell-k">Ambiente</span>
            <span className="plano-room">{room.name}</span>
          </div>
          <div className="cell">
            <span className="cell-k">Superficie</span>
            <span className="mono text-[20px]">
              <Count value={room.m2} /> m²
            </span>
          </div>
          <div className="cell">
            <span className="cell-k">{room.exterior ? 'Descubierto' : 'Cubierto total'}</span>
            <span className="mono text-[20px]">{room.exterior ? '—' : `${fmtM2(total)} m²`}</span>
          </div>
        </div>
        <div className="plano-photo">
          {photo ? (
            <Img key={photo.src} photo={photo} sizes="(min-width: 768px) 34vw, 100vw" className="plano-img" />
          ) : (
            <div className="plano-empty">
              <span className="mono">Sin fotos de este ambiente: es un espacio privado de la familia.</span>
            </div>
          )}
        </div>
        <ul className="plano-list mono" aria-label="Ambientes">
          {plan.rooms.map((r) => (
            <li key={r.id}>
              <button
                type="button"
                className={r.id === active ? 'is-on' : ''}
                onClick={() => setActive(r.id)}
                aria-pressed={r.id === active}
                tabIndex={-1}
              >
                {r.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  )
}
