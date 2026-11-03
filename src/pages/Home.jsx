import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import Contacto from '../components/Contacto.jsx'
import Estudio from '../components/Estudio.jsx'
import Footer from '../components/Footer.jsx'
import Hero from '../components/Hero.jsx'
import Indice from '../components/Indice.jsx'
import Manifiesto from '../components/Manifiesto.jsx'

// El muestrario (con arrastre de framer-motion) queda fuera del primer paquete
// y se baja recién cuando se acerca a la pantalla. Mientras tanto, el lugar
// guarda su alto y su ancla, así los links a #materiales funcionan igual.
const Muestrario = lazy(() => import('../components/Muestrario.jsx'))

function MuestrarioDiferido() {
  const box = useRef(null)
  const [near, setNear] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: '1200px 0px' })
    io.observe(box.current)
    return () => io.disconnect()
  }, [])
  const hueco = <div ref={box} id="materiales" className="frame section" style={{ minHeight: 1020 }} />
  if (!near) return hueco
  return (
    <Suspense fallback={hueco}>
      <Muestrario />
    </Suspense>
  )
}

export default function Home() {
  useEffect(() => {
    document.title = 'Estudio Lindero · Arquitectura e interiores en Rosario'
  }, [])
  return (
    <>
      <main id="contenido">
        <Hero />
        <Manifiesto />
        <Indice />
        <MuestrarioDiferido />
        <Estudio />
        <Contacto />
      </main>
      <Footer lamina="00" />
    </>
  )
}
