import { useEffect } from 'react'
import { CutLink } from '../components/Cut.jsx'

export default function NotFound() {
  useEffect(() => {
    document.title = 'Lámina no encontrada · Estudio Lindero'
  }, [])
  return (
    <main id="contenido" className="frame obra-top min-h-[70svh]">
      <p className="mono text-concrete-ink">Error 404</p>
      <h1 className="obra-title wide">Esta lámina no está en el juego de planos</h1>
      <p className="obra-bajada">La dirección no corresponde a ninguna página del sitio.</p>
      <p className="mt-8">
        <CutLink to="/#obras" className="btn-line">
          Ir al índice de obras
        </CutLink>
      </p>
    </main>
  )
}
