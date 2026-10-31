import { lazy, Suspense, useEffect } from 'react'
import Contacto from '../components/Contacto.jsx'
import Estudio from '../components/Estudio.jsx'
import Footer from '../components/Footer.jsx'
import Hero from '../components/Hero.jsx'
import Indice from '../components/Indice.jsx'
import Manifiesto from '../components/Manifiesto.jsx'

// El muestrario (con arrastre de framer-motion) queda fuera del primer paquete.
const Muestrario = lazy(() => import('../components/Muestrario.jsx'))

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
        <Suspense fallback={<div className="frame section" style={{ minHeight: 760 }} />}>
          <Muestrario />
        </Suspense>
        <Estudio />
        <Contacto />
      </main>
      <Footer lamina="00 · Índice" />
    </>
  )
}
