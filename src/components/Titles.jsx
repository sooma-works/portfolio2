import { useEffect, useRef, useState } from 'react'
import { useScrollVar } from '../lib/useScrollVar.js'

// De que el título asoma por abajo (0) a que llega arriba de la pantalla (1).
const entering = (r, vh) => 1 - r.top / vh

/**
 * Título que se extruye: entra como contorno y, al aparecer en pantalla, se
 * rellena y gana una sombra isométrica, como si se levantara del plano.
 */
export function Extrude({ as: Tag = 'h1', className = '', children, ...rest }) {
  const ref = useRef(null)
  const [up, setUp] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setUp(true)
          io.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <Tag ref={ref} className={`extrude ${up ? 'is-up' : ''} ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

/**
 * Título de sección: ultraexpandido al entrar por abajo, se comprime a medida
 * que sube por la pantalla (eje de ancho de Archivo, de 125 a 68).
 */
export function SectionTitle({ children, className = '', id, as: Tag = 'h2' }) {
  const ref = useRef(null)
  useScrollVar(ref, '--w', 125, 68, entering)
  return (
    <Tag ref={ref} id={id} className={`section-title ${className}`}>
      {children}
    </Tag>
  )
}
