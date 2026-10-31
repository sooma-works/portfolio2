import { useEffect, useRef, useState } from 'react'

const SNAP_TARGETS = 'a, button, [role="button"], [data-snap], summary, label'
const NEAR = 36 // px: distancia para engancharse a un punto en elementos grandes

const fmt = (px) => (px / 100).toFixed(3)

// Puntos notables del rectángulo: extremos y puntos medios, como un osnap.
function snapPoints(r) {
  const mx = (r.left + r.right) / 2
  const my = (r.top + r.bottom) / 2
  return [
    [r.left, r.top, 'Punto final'],
    [r.right, r.top, 'Punto final'],
    [r.left, r.bottom, 'Punto final'],
    [r.right, r.bottom, 'Punto final'],
    [mx, r.top, 'Punto medio'],
    [mx, r.bottom, 'Punto medio'],
    [r.left, my, 'Punto medio'],
    [r.right, my, 'Punto medio'],
  ]
}

/**
 * Cursor de CAD: cruz que atraviesa la pantalla con coordenadas en vivo.
 * Sobre elementos clicables se engancha a sus extremos y puntos medios.
 * Solo con puntero fino (en táctil no existe).
 */
export default function CadCursor() {
  const [enabled, setEnabled] = useState(false)
  const h = useRef(null)
  const v = useRef(null)
  const box = useRef(null)
  const tag = useRef(null)
  const snapRef = useRef(null)

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setEnabled(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const root = document.documentElement
    root.classList.add('cad-on')
    let raf = 0
    let last = null
    let visible = false

    const render = () => {
      raf = 0
      if (!last) return
      let x = last.x
      let y = last.y
      let mode = ''
      const el = last.target instanceof Element ? last.target.closest(SNAP_TARGETS) : null
      if (el) {
        const r = el.getBoundingClientRect()
        const small = r.width < 260 && r.height < 120
        let best = null
        for (const [px, py, m] of snapPoints(r)) {
          const d = Math.hypot(px - x, py - y)
          if (!best || d < best[0]) best = [d, px, py, m]
        }
        if (best && (small || best[0] < NEAR)) {
          ;[, x, y, mode] = best
        }
      }
      const gx = parseFloat(getComputedStyle(root).getPropertyValue('--gx')) || 0
      h.current.style.transform = `translate3d(0, ${y}px, 0)`
      v.current.style.transform = `translate3d(${x}px, 0, 0)`
      box.current.style.transform = `translate3d(${x - 5}px, ${y - 5}px, 0)`
      const flip = x > window.innerWidth - 220
      tag.current.style.transform = `translate3d(${flip ? x - 14 : x + 14}px, ${y + 12}px, 0) translateX(${flip ? '-100%' : '0'})`
      tag.current.firstChild.textContent = `X ${fmt(x - gx)} · Y ${fmt(y + window.scrollY)}`
      snapRef.current.textContent = mode
      root.dataset.snap = mode ? 'on' : ''
      if (!visible) {
        visible = true
        root.dataset.cad = 'visible'
      }
    }

    const onMove = (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') return
      last = { x: e.clientX, y: e.clientY, target: e.target }
      if (!raf) raf = requestAnimationFrame(render)
    }
    const onLeave = () => {
      visible = false
      root.dataset.cad = ''
    }
    const onScroll = () => {
      if (last && !raf) raf = requestAnimationFrame(render)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    return () => {
      root.classList.remove('cad-on')
      delete root.dataset.cad
      delete root.dataset.snap
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [enabled])

  if (!enabled) return null
  return (
    <div className="cad" aria-hidden="true">
      <div ref={h} className="cad-h" />
      <div ref={v} className="cad-v" />
      <div ref={box} className="cad-box" />
      <div ref={tag} className="cad-tag">
        <span />
        <em ref={snapRef} />
      </div>
    </div>
  )
}
