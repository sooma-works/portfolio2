import { useEffect } from 'react'
import { prefersReducedMotion } from './motion.js'

/**
 * Escribe en una variable CSS del elemento un valor que depende de su
 * posición en pantalla. progress(rect) devuelve 0..1; el valor va de from a to.
 */
export function useScrollVar(ref, name, from, to, progress) {
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    let raf = 0
    const update = () => {
      raf = 0
      const p = Math.min(1, Math.max(0, progress(el.getBoundingClientRect(), window.innerHeight)))
      el.style.setProperty(name, (from + (to - from) * p).toFixed(1))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ref, name, from, to, progress])
}
