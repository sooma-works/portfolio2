import gsap from 'gsap'
import { useCallback, useEffect, useRef, useState } from 'react'
import { destacada, getObra } from '../data/obras.js'
import { estudio } from '../data/estudio.js'
import { prefersReducedMotion } from '../lib/motion.js'
import { useMedia } from '../lib/useMedia.js'
import { useScrollVar } from '../lib/useScrollVar.js'
import { CutLink } from './Cut.jsx'
import Img from './Img.jsx'
import { fmtM2 } from '../lib/format.js'
import Plan from './Plan.jsx'

const obra = getObra(destacada.slug)
const room = obra.plan.rooms.find((r) => r.id === destacada.room)
const photo = obra.fotos[room.photo]

// El nombre se comprime a medida que el hero sale de pantalla.
const leaving = (r) => -r.top / (r.height * 0.8)

const poly = (pts) => `polygon(${pts.map(([x, y]) => `${x.toFixed(1)}px ${y.toFixed(1)}px`).join(', ')})`

/**
 * Hero: la planta de la obra destacada se dibuja sola; al terminar, el patio
 * se llena con su foto (recortada con el mismo polígono del plano) y se
 * expande hasta ocupar toda la pantalla.
 */
export default function Hero() {
  const sec = useRef(null)
  const planRef = useRef(null)
  const wrap = useRef(null)
  const imgRef = useRef(null)
  const narrow = useMedia('(max-width: 767px)')
  const [phase, setPhase] = useState('draw') // draw → room → open
  const tl = useRef(null)

  const nameRef = useRef(null)
  useScrollVar(nameRef, '--w', 125, 62, leaving)

  // Coloca la foto exactamente sobre el ambiente del plano.
  const placeInRoom = useCallback(() => {
    const s = sec.current.getBoundingClientRect()
    const pts = planRef.current.roomScreenPoints(room.id).map(([x, y]) => [x - s.left, y - s.top])
    const xs = pts.map((p) => p[0])
    const ys = pts.map((p) => p[1])
    const box = [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)]
    const w = wrap.current
    Object.assign(w.style, {
      left: `${box[0]}px`,
      top: `${box[1]}px`,
      width: `${box[2] - box[0]}px`,
      height: `${box[3] - box[1]}px`,
      clipPath: poly(pts.map(([x, y]) => [x - box[0], y - box[1]])),
    })
    Object.assign(imgRef.current.style, {
      left: `${-box[0]}px`,
      top: `${-box[1]}px`,
      width: `${s.width}px`,
      height: `${s.height}px`,
    })
    return { pts, s }
  }, [])

  const onDrawn = useCallback(() => {
    const { pts } = placeInRoom()
    setPhase('room')
    if (prefersReducedMotion()) {
      wrap.current.style.opacity = 1
      return
    }
    // Centro de la expansión: un punto dentro del patio (el rótulo).
    const [ox, oy] = (() => {
      const xs = pts.map((p) => p[0])
      const ys = pts.map((p) => p[1])
      return [(Math.max(...xs) * 0.6 + Math.min(...xs) * 0.4), (Math.max(...ys) + Math.min(...ys)) / 2]
    })()
    const state = { k: 1 }
    const apply = () => {
      wrap.current.style.clipPath = poly(pts.map(([x, y]) => [ox + (x - ox) * state.k, oy + (y - oy) * state.k]))
    }
    tl.current = gsap
      .timeline()
      .fromTo(wrap.current, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power1.out' })
      .add(() => {
        // La foto pasa a ocupar la sección completa; el recorte sigue siendo el patio.
        Object.assign(wrap.current.style, { left: '0px', top: '0px', width: '100%', height: '100%' })
        Object.assign(imgRef.current.style, { left: '0px', top: '0px', width: '100%', height: '100%' })
        apply()
        setPhase('open')
      }, '+=0.7')
      .to(state, { k: 14, duration: 1.5, ease: 'power3.inOut', onUpdate: apply })
      .add(() => {
        wrap.current.style.clipPath = 'none'
      })
  }, [placeInRoom])

  useEffect(() => () => tl.current?.kill(), [])

  // Si cambia el tamaño antes de abrir, la foto se vuelve a acomodar al patio.
  useEffect(() => {
    if (phase !== 'room') return
    const f = () => placeInRoom()
    window.addEventListener('resize', f)
    return () => window.removeEventListener('resize', f)
  }, [phase, placeInRoom])

  const open = phase === 'open'

  return (
    <section ref={sec} className={`hero ${open ? 'is-open' : ''}`} aria-labelledby="hero-title">
      <div className="frame hero-inner">
        <div className="hero-head">
          <h1 id="hero-title" className="hero-title">
            <span className="mono hero-kicker">Estudio</span>
            <span ref={nameRef} className="hero-name">
              Lindero
            </span>
          </h1>
          <p className="hero-bajada">{estudio.bajada}</p>
        </div>

        <div className="hero-plan">
          <Plan
            ref={planRef}
            plan={obra.plan}
            rotate={narrow}
            onDrawn={onDrawn}
            labels
            title={`Planta de ${obra.nombre}: ${obra.plan.rooms.length} ambientes alrededor de un patio central`}
          />
        </div>

        <p className="mono hero-meta">
          <span>Lámina {obra.numero}</span>
          <span>{obra.nombre} · planta baja</span>
          <span>Esc. 1:100</span>
        </p>
      </div>

      <div ref={wrap} className="hero-photo" style={{ opacity: 0 }}>
        <Img ref={imgRef} photo={photo} priority sizes="100vw" className="hero-img" />
      </div>

      <div className={`hero-card ${open ? 'is-in' : ''}`} aria-hidden={!open}>
        <p className="mono text-concrete-ink">
          Lámina {obra.numero} · {room.name} · {fmtM2(room.m2)} m²
        </p>
        <p className="mt-1 text-[22px] leading-tight font-[650]">{obra.nombre}</p>
        <p className="mono mt-1 text-concrete-ink">
          {obra.ubicacion} · {obra.anio}
        </p>
        <CutLink to={`/obras/${obra.slug}`} className="btn-line mt-4" tabIndex={open ? 0 : -1}>
          Recorrer la obra
        </CutLink>
      </div>
    </section>
  )
}
