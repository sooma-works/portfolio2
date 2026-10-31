import gsap from 'gsap'
import { forwardRef, useId, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { bbox } from '../data/plans/helpers.js'
import { fmtM, fmtM2 } from '../lib/format.js'
import { prefersReducedMotion } from '../lib/motion.js'

const M = 190 // margen alrededor de la planta para cotas, norte y escala (cm)


function useScale(svgRef, vbWidth) {
  const [k, setK] = useState(vbWidth / 1000)
  useLayoutEffect(() => {
    const el = svgRef.current
    if (!el) return
    const update = () => {
      const w = el.getBoundingClientRect().width
      if (w > 0) setK(vbWidth / w)
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [svgRef, vbWidth])
  return k // centímetros por píxel de pantalla
}

function Opening({ o, k }) {
  const { w, t } = o
  const hx = (o.hinge * w) / 2
  const s = o.swing
  const sy = (s * t) / 2
  const sweep = o.hinge * s === -1 ? 0 : 1
  const e = 2 * k
  return (
    <g transform={`translate(${o.x} ${o.y}) rotate(${o.a})`}>
      <rect className="pl-erase" x={-w / 2} y={-t / 2 - e} width={w} height={t + 2 * e} fill="var(--paper)" />
      <line className="pl-op" x1={-w / 2} y1={-t / 2} x2={-w / 2} y2={t / 2} strokeWidth={1.4 * k} pathLength="1" />
      <line className="pl-op" x1={w / 2} y1={-t / 2} x2={w / 2} y2={t / 2} strokeWidth={1.4 * k} pathLength="1" />
      {o.type === 'window' && (
        <>
          <line className="pl-op" x1={-w / 2} y1={-t / 2} x2={w / 2} y2={-t / 2} strokeWidth={0.7 * k} pathLength="1" />
          <line className="pl-op" x1={-w / 2} y1={t / 2} x2={w / 2} y2={t / 2} strokeWidth={0.7 * k} pathLength="1" />
          <line className="pl-op" x1={-w / 2} y1={-t / 7} x2={w / 2} y2={-t / 7} strokeWidth={1.1 * k} pathLength="1" />
          <line className="pl-op" x1={-w / 2} y1={t / 7} x2={w / 2} y2={t / 7} strokeWidth={1.1 * k} pathLength="1" />
        </>
      )}
      {o.type === 'door' && (
        <>
          <line className="pl-op" x1={hx} y1={sy} x2={hx} y2={sy + s * w} strokeWidth={1.5 * k} pathLength="1" />
          <path
            className="pl-op"
            d={`M ${hx} ${sy + s * w} A ${w} ${w} 0 0 ${sweep} ${-hx} ${sy}`}
            strokeWidth={0.7 * k}
            pathLength="1"
          />
        </>
      )}
    </g>
  )
}

function Dim({ d, k, rot }) {
  const [ax, ay] = d.a
  const [bx, by] = d.b
  const len = Math.hypot(bx - ax, by - ay)
  const ux = (bx - ax) / len
  const uy = (by - ay) / len
  const nx = -uy
  const ny = ux
  const p1 = [ax + nx * d.off, ay + ny * d.off]
  const p2 = [bx + nx * d.off, by + ny * d.off]
  const sgn = Math.sign(d.off) || 1
  const gap = 8 * k
  let ang = (Math.atan2(uy, ux) * 180) / Math.PI
  const screen = ang + rot
  const norm = ((screen + 540) % 360) - 180
  if (norm > 90 || norm <= -90) ang += 180
  const mid = [(p1[0] + p2[0]) / 2 + nx * sgn * 7 * k, (p1[1] + p2[1]) / 2 + ny * sgn * 7 * k]
  const tick = 5 * k
  return (
    <g className="pl-dim">
      <line className="pl-dimline" x1={ax + nx * sgn * gap} y1={ay + ny * sgn * gap} x2={p1[0] + nx * sgn * tick} y2={p1[1] + ny * sgn * tick} strokeWidth={0.6 * k} pathLength="1" />
      <line className="pl-dimline" x1={bx + nx * sgn * gap} y1={by + ny * sgn * gap} x2={p2[0] + nx * sgn * tick} y2={p2[1] + ny * sgn * tick} strokeWidth={0.6 * k} pathLength="1" />
      <line className="pl-dimline" x1={p1[0]} y1={p1[1]} x2={p2[0]} y2={p2[1]} strokeWidth={0.7 * k} pathLength="1" />
      {[p1, p2].map(([x, y], i) => (
        <line
          key={i}
          className="pl-dimline"
          x1={x - (ux + nx) * tick}
          y1={y - (uy + ny) * tick}
          x2={x + (ux + nx) * tick}
          y2={y + (uy + ny) * tick}
          strokeWidth={1.4 * k}
          pathLength="1"
        />
      ))}
      <text
        className="pl-dimtext"
        x={mid[0]}
        y={mid[1]}
        transform={`rotate(${ang} ${mid[0]} ${mid[1]})`}
        fontSize={10.5 * k}
        textAnchor="middle"
        dominantBaseline="middle"
        data-value={len}
      >
        {fmtM(len)}
      </text>
    </g>
  )
}

/**
 * Planta dibujada a partir de los datos de src/data/plans.
 * - play: dispara la animación de dibujo (muros → aberturas → cotas y textos).
 * - interactive: los ambientes son botones (hover, toque, teclado).
 * - rotate: gira la planta 90° (para pantallas angostas con plantas largas).
 */
const Plan = forwardRef(function Plan(
  { plan, play = true, interactive = false, active, onActivate, rotate = false, labels = true, onDrawn, className = '', title },
  ref,
) {
  const svgRef = useRef(null)
  const uid = useId().replace(/:/g, '')
  const rot = rotate ? 90 : 0

  const [x0, y0, x1, y1] = useMemo(() => bbox(plan.walls.flat().concat(plan.rooms.flatMap((r) => r.pts))), [plan])
  const vb = rotate
    ? [-(y1 + M), x0 - M, y1 - y0 + 2 * M, x1 - x0 + 2 * M]
    : [x0 - M, y0 - M, x1 - x0 + 2 * M, y1 - y0 + 2 * M]
  const k = useScale(svgRef, vb[2])

  useImperativeHandle(ref, () => ({
    svg: svgRef.current,
    // Coordenadas de pantalla (px) de los vértices de un ambiente.
    roomScreenPoints(id) {
      const poly = svgRef.current?.querySelector(`[data-room="${id}"]`)
      const room = plan.rooms.find((r) => r.id === id)
      if (!poly || !room) return []
      const m = poly.getScreenCTM()
      const pt = svgRef.current.createSVGPoint()
      return room.pts.map(([x, y]) => {
        pt.x = x
        pt.y = y
        const p = pt.matrixTransform(m)
        return [p.x, p.y]
      })
    },
  }))

  // Animación de dibujo. Los estilos iniciales se fijan antes del primer
  // pintado para que no se vea la planta completa un instante.
  const doneRef = useRef(false)
  useLayoutEffect(() => {
    const svg = svgRef.current
    if (!svg || doneRef.current) return
    const q = (s) => svg.querySelectorAll(s)
    const strokes = '.pl-outline, .pl-op, .pl-fix, .pl-roof, .pl-dimline'
    const fades = '.pl-fill, .pl-col, .pl-erase, .pl-label, .pl-dimtext, .pl-legend'
    if (prefersReducedMotion()) {
      doneRef.current = true
      onDrawn?.()
      return
    }
    gsap.set(q(strokes), { strokeDasharray: 1, strokeDashoffset: 1 })
    gsap.set(q(fades), { opacity: 0 })
    if (!play) return
    doneRef.current = true
    const tl = gsap.timeline({ onComplete: () => onDrawn?.() })
    tl.to(q('.pl-outline'), { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut', stagger: 0.035 })
      .to(q('.pl-fill, .pl-col'), { opacity: 1, duration: 0.45, ease: 'none' }, '-=0.25')
      .to(q('.pl-erase'), { opacity: 1, duration: 0.01 }, '<')
      .to(q('.pl-op'), { strokeDashoffset: 0, duration: 0.5, ease: 'power1.out', stagger: 0.008 }, '<')
      .to(q('.pl-fix, .pl-roof'), { strokeDashoffset: 0, duration: 0.5, ease: 'power1.out', stagger: 0.02 }, '-=0.3')
      .to(q('.pl-dimline'), { strokeDashoffset: 0, duration: 0.5, ease: 'power1.out', stagger: 0.01 }, '-=0.25')
      .to(q('.pl-dimtext, .pl-label, .pl-legend'), { opacity: 1, duration: 0.35, stagger: 0.02 }, '-=0.35')
    // Las cotas cuentan hasta su valor real.
    q('.pl-dimtext').forEach((el, i) => {
      const v = Number(el.dataset.value)
      const o = { v: 0 }
      tl.to(o, { v, duration: 0.8, ease: 'power2.out', onUpdate: () => (el.textContent = fmtM(o.v)) }, `-=${i === 0 ? 0.35 : 0.78}`)
    })
    return () => {
      // En StrictMode el efecto corre dos veces: si se corta, que vuelva a dibujar.
      if (tl.progress() < 1) doneRef.current = false
      tl.kill()
    }
  }, [play, onDrawn])

  const legendScreen = [
    vb[0] + vb[2] - 400 - 90 * k,
    plan.legend === 'tr' && !rotate ? vb[1] + 70 : vb[1] + vb[3] - 70 - 10 * k,
  ]

  return (
    <svg
      ref={svgRef}
      viewBox={vb.join(' ')}
      className={`plan block h-auto w-full select-none ${className}`}
      role={interactive ? 'group' : 'img'}
      aria-label={title}
      fill="none"
      stroke="var(--graphite)"
      strokeLinecap="square"
    >
      <defs>
        <pattern id={`h-${uid}`} patternUnits="userSpaceOnUse" width={5 * k} height={5 * k} patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2={5 * k} stroke="var(--graphite)" strokeWidth={0.7 * k} />
        </pattern>
        <pattern id={`hm-${uid}`} patternUnits="userSpaceOnUse" width={7 * k} height={7 * k} patternTransform="rotate(-45)">
          <rect width={7 * k} height={7 * k} fill="rgb(226 83 31 / 0.08)" stroke="none" />
          <line x1="0" y1="0" x2="0" y2={7 * k} stroke="var(--marker)" strokeWidth={1.1 * k} />
        </pattern>
      </defs>

      <g transform={rotate ? 'rotate(90)' : undefined}>
        <g className="pl-rooms">
          {plan.rooms.map((room) => {
            const on = interactive && active === room.id
            return (
              <polygon
                key={room.id}
                data-room={room.id}
                points={room.pts.map((p) => p.join(',')).join(' ')}
                fill={on ? `url(#hm-${uid})` : 'transparent'}
                stroke={on ? 'var(--marker)' : 'none'}
                strokeWidth={1.6 * k}
                pointerEvents={interactive ? 'all' : 'none'}
                tabIndex={interactive ? 0 : undefined}
                role={interactive ? 'button' : undefined}
                aria-pressed={interactive ? on : undefined}
                aria-label={interactive ? `${room.name}, ${fmtM2(room.m2)} metros cuadrados` : undefined}
                onPointerEnter={interactive ? (e) => e.pointerType === 'mouse' && onActivate?.(room.id) : undefined}
                onClick={interactive ? () => onActivate?.(room.id) : undefined}
                onFocus={interactive ? () => onActivate?.(room.id) : undefined}
                data-snap={interactive ? '' : undefined}
                style={{ outline: 'none', transition: 'fill .2s' }}
              />
            )
          })}
        </g>

        <g pointerEvents="none">
          <g className="pl-fixtures" stroke="var(--concrete)">
            {plan.fixtures?.map((f, i) =>
              f.circle ? (
                <circle key={i} className="pl-fix" cx={f.circle[0]} cy={f.circle[1]} r={f.circle[2]} strokeWidth={0.7 * k} pathLength="1" />
              ) : (
                <polygon key={i} className="pl-fix" points={f.pts.map((p) => p.join(',')).join(' ')} strokeWidth={0.7 * k} pathLength="1" />
              ),
            )}
          </g>

          {plan.roof?.map((pts, i) => (
            <polyline
              key={i}
              className="pl-roof"
              points={pts.map((p) => p.join(',')).join(' ')}
              stroke="var(--concrete)"
              strokeWidth={0.8 * k}
              strokeDasharray={`${8 * k} ${4 * k} ${1.5 * k} ${4 * k}`}
            />
          ))}

          <g className="pl-walls">
            {plan.walls.map((pts, i) => (
              <polygon key={i} className="pl-outline" points={pts.map((p) => p.join(',')).join(' ')} strokeWidth={2.2 * k} pathLength="1" strokeLinejoin="miter" />
            ))}
            <g className="pl-fill" stroke="none">
              {plan.walls.map((pts, i) => (
                <polygon key={i} points={pts.map((p) => p.join(',')).join(' ')} fill="var(--paper)" />
              ))}
              {plan.walls.map((pts, i) => (
                <polygon key={i} points={pts.map((p) => p.join(',')).join(' ')} fill={`url(#h-${uid})`} />
              ))}
            </g>
            {plan.columns?.map((pts, i) => (
              <polygon key={i} className="pl-col" points={pts.map((p) => p.join(',')).join(' ')} fill="var(--graphite)" stroke="none" />
            ))}
          </g>

          <g className="pl-openings">
            {plan.openings.map((o, i) => (
              <Opening key={i} o={o} k={k} />
            ))}
          </g>

          <g className="pl-dims" stroke="var(--graphite)">
            {plan.dims.map((d, i) => (
              <Dim key={i} d={d} k={k} rot={rot} />
            ))}
          </g>

          {labels && (
            <g className="pl-labels" stroke="none">
              {plan.rooms.map((room) => {
                const [x, y] = room.label
                const on = interactive && active === room.id
                const t = rotate ? `rotate(-90 ${x} ${y})` : undefined
                // En ambientes chicos (en pantalla) el rótulo se achica o se omite.
                const [bx0, by0, bx1, by1] = bbox(room.pts)
                const side = Math.min(bx1 - bx0, by1 - by0) / k
                const across = (rotate ? by1 - by0 : bx1 - bx0) / k
                if (side < 26 || across < room.name.length * 6.2) return null
                const showM2 = side >= 44
                return (
                  <g key={room.id} className="pl-label" transform={t}>
                    <text
                      x={x}
                      y={showM2 ? y - 4 * k : y + 4 * k}
                      textAnchor="middle"
                      fontSize={12 * k}
                      fontWeight="600"
                      fill={on ? 'var(--marker)' : 'var(--graphite)'}
                      style={{ fontVariationSettings: "'wdth' 88" }}
                    >
                      {room.name}
                    </text>
                    {showM2 && (
                      <text
                        x={x}
                        y={y + 10 * k}
                        textAnchor="middle"
                        fontSize={10 * k}
                        fill="var(--concrete-ink)"
                        fontFamily="var(--font-mono)"
                      >
                        {fmtM2(room.m2)} m²
                      </text>
                    )}
                  </g>
                )
              })}
            </g>
          )}
        </g>
      </g>

      <Legend k={k} at={legendScreen} north={plan.north + rot} />
    </svg>
  )
})

// Norte y escala gráfica: fuera del giro, siempre derechos en pantalla.
function Legend({ k, at, north }) {
  const [x, y] = at
  const seg = 100
  return (
    <g className="pl-legend" pointerEvents="none" stroke="var(--graphite)">
      <g transform={`translate(${x} ${y})`}>
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={i}
            x={i * seg}
            y={0}
            width={seg}
            height={5 * k}
            fill={i % 2 ? 'var(--paper)' : 'var(--graphite)'}
            strokeWidth={0.7 * k}
          />
        ))}
        {[0, 1, 2, 3, 4].map((m) => (
          <text key={m} x={m * seg} y={18 * k} fontSize={9.5 * k} textAnchor="middle" fill="var(--graphite)" stroke="none" fontFamily="var(--font-mono)">
            {m}
          </text>
        ))}
        <text x={4 * seg + 8 * k} y={5 * k} fontSize={9.5 * k} fill="var(--graphite)" stroke="none" fontFamily="var(--font-mono)">
          m
        </text>
      </g>
      <g transform={`translate(${x + 4 * seg + 26 * k + 46 * k} ${y}) rotate(${north})`}>
        <circle r={22 * k} fill="none" strokeWidth={0.8 * k} />
        <path d={`M 0 ${-22 * k} L ${7 * k} ${10 * k} L 0 ${5 * k} Z`} fill="var(--graphite)" stroke="none" />
        <path d={`M 0 ${-22 * k} L ${-7 * k} ${10 * k} L 0 ${5 * k} Z`} fill="var(--paper)" strokeWidth={0.8 * k} />
        <text y={-28 * k} fontSize={10 * k} textAnchor="middle" fill="var(--graphite)" stroke="none" fontFamily="var(--font-mono)" transform={`rotate(${-north} 0 ${-30 * k})`}>
          N
        </text>
      </g>
    </g>
  )
}

export default Plan
