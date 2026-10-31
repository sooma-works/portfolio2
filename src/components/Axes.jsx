import { useEffect, useState } from 'react'

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function useFrame() {
  const [f, setF] = useState({ gx: 0, w: 0, step: 128, height: 0 })
  useEffect(() => {
    const probe = document.createElement('div')
    probe.className = 'frame'
    probe.style.cssText = 'position:absolute;left:0;right:0;visibility:hidden;height:0'
    document.body.appendChild(probe)
    const page = document.getElementById('page')
    const measure = () => {
      const r = probe.getBoundingClientRect()
      setF({
        gx: r.left,
        w: r.width,
        step: window.innerWidth < 640 ? 64 : 128,
        height: page ? page.scrollHeight : document.body.scrollHeight,
      })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(document.body)
    if (page) ro.observe(page)
    return () => {
      ro.disconnect()
      probe.remove()
    }
  }, [])
  return f
}

// Ejes de estructura: letras arriba (fijas) y números al costado (corren con
// la página), alineados con las líneas fuertes de la grilla de fondo.
export default function Axes() {
  const { gx, w, step, height } = useFrame()
  const cols = w ? Math.round(w / step) + 1 : 0
  const rows = Math.ceil(height / step)
  return (
    <div aria-hidden="true">
      <div className="axes-top">
        {Array.from({ length: cols }, (_, i) => (
          <span key={i} className="axis-tag" style={{ left: gx + i * step }}>
            {LETTERS[i % 26]}
          </span>
        ))}
      </div>
      <div className="axes-left">
        {Array.from({ length: rows }, (_, i) => (
          <span key={i} className="axis-tag" style={{ top: (i + 1) * step }}>
            {i + 1}
          </span>
        ))}
      </div>
    </div>
  )
}
