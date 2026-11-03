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

// Destino de cada vértice al expandir el ambiente al campo de la lámina
// (todo el ancho, desde abajo del nombre hasta el pie de la sección).
function morphTargets(pts, [L, T, R, B]) {
  const xs = pts.map((p) => p[0])
  const ys = pts.map((p) => p[1])
  const [x0, y0, x1, y1] = [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)]
  const corners = [
    [x0, y0, L, T],
    [x1, y0, R, T],
    [x1, y1, R, B],
    [x0, y1, L, B],
  ]
  const near = (a, b) => Math.abs(a - b) < 1.5
  const isCorner = ([x, y], c) => near(x, c[0]) && near(y, c[1])
  const missing = corners.filter((c) => !pts.some((p) => isCorner(p, c)))
  return pts.map((p) => {
    const own = corners.find((c) => isCorner(p, c))
    if (own) return [own[2], own[3]]
    const pool = missing.length ? missing : corners
    const c = pool.reduce((best, c) => (Math.hypot(p[0] - c[0], p[1] - c[1]) < Math.hypot(p[0] - best[0], p[1] - best[1]) ? c : best))
    return [c[2], c[3]]
  })
}

// Borde superior del campo de la foto abierta: debajo del nombre y la bajada.
const fieldTop = (sec, head) => head.getBoundingClientRect().bottom - sec.getBoundingClientRect().top + 24

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
  const [phase, setPhase] = useState('draw') // draw → room → grow → open
  const tl = useRef(null)

  const headRef = useRef(null)
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
    // Cada vértice del ambiente viaja a una esquina del campo. Las
    // esquinas del ambiente van a su esquina equivalente; los vértices de la
    // muesca de la L van a la esquina que le falta, así la forma se completa
    // en un rectángulo mientras crece, sin pasar por figuras raras.
    const { width: W, height: H } = sec.current.getBoundingClientRect()
    const targets = morphTargets(pts, [0, fieldTop(sec.current, headRef.current), W, H])
    const state = { t: 0 }
    const apply = () => {
      const e = state.t
      wrap.current.style.clipPath = poly(pts.map(([x, y], i) => [x + (targets[i][0] - x) * e, y + (targets[i][1] - y) * e]))
    }
    tl.current = gsap
      .timeline()
      .fromTo(wrap.current, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power1.out' })
      .add(() => {
        // La foto pasa a ocupar la sección completa; el recorte sigue siendo el patio.
        // El nombre queda siempre sobre papel: la foto se abre debajo.
        Object.assign(wrap.current.style, { left: '0px', top: '0px', width: '100%', height: '100%' })
        Object.assign(imgRef.current.style, { left: '0px', top: '0px', width: '100%', height: '100%' })
        apply()
        setPhase('grow')
      }, '+=0.7')
      .to(state, { t: 1, duration: 1.5, ease: 'power3.inOut', onUpdate: apply })
      .add(() => setPhase('open'), '-=0.45')
      .add(() => {
        wrap.current.style.clipPath = `inset(${fieldTop(sec.current, headRef.current)}px 0 0 0)`
      })
  }, [placeInRoom])

  useEffect(() => () => tl.current?.kill(), [])

  // Abierta, el campo de la foto sigue al alto del nombre si cambia el tamaño.
  useEffect(() => {
    if (phase !== 'open') return
    const f = () => {
      wrap.current.style.clipPath = `inset(${fieldTop(sec.current, headRef.current)}px 0 0 0)`
    }
    window.addEventListener('resize', f)
    return () => window.removeEventListener('resize', f)
  }, [phase])

  // Si cambia el tamaño antes de abrir, la foto se vuelve a acomodar al patio.
  useEffect(() => {
    if (phase !== 'room') return
    const f = () => placeInRoom()
    window.addEventListener('resize', f)
    return () => window.removeEventListener('resize', f)
  }, [phase, placeInRoom])

  const open = phase === 'open'

  return (
    <section ref={sec} className={`hero ${open ? 'is-open' : ''} ${open || phase === 'grow' ? 'is-growing' : ''}`} aria-labelledby="hero-title">
      <div className="frame hero-inner">
        <div ref={headRef} className="hero-head">
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
        <Img ref={imgRef} photo={photo} loading="eager" sizes="100vw" className="hero-img" />
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
