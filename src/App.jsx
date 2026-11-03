import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation, useNavigationType } from 'react-router-dom'
import Axes from './components/Axes.jsx'
import CadCursor from './components/CadCursor.jsx'
import { CutProvider } from './components/Cut.jsx'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import NotFound from './pages/NotFound.jsx'
// La página de obra pesa poco y va en el paquete principal: así, entrando
// directo a una obra, no hay un segundo pedido antes de ver el título.
import Obra from './pages/Obra.jsx'

const Creditos = lazy(() => import('./pages/Creditos.jsx'))

// Con atrás/adelante del navegador no hay corte: solo vuelve arriba.
function ScrollOnPop() {
  const { pathname } = useLocation()
  const type = useNavigationType()
  useEffect(() => {
    if (type === 'POP') window.scrollTo(0, 0)
  }, [pathname, type])
  return null
}

export default function App() {
  return (
    <CutProvider>
      <ScrollOnPop />
      <a href="#contenido" className="skip-link mono">
        Saltar al contenido
      </a>
      <Header />
      <div id="page">
        <Suspense fallback={<div className="min-h-svh" />}>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/obras/:slug" element={<Obra />} />
          <Route path="/creditos" element={<Creditos />} />
          <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
      <Axes />
      <CadCursor />
    </CutProvider>
  )
}
