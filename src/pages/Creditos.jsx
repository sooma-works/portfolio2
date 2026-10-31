import { useEffect } from 'react'
import { CutLink } from '../components/Cut.jsx'
import Footer from '../components/Footer.jsx'
import { credits } from '../data/credits.js'
import { obras } from '../data/obras.js'

const nombres = {
  ...Object.fromEntries(obras.map((o) => [o.slug, o.nombre])),
  materiales: 'Muestrario de materiales',
  estudio: 'Retratos del estudio',
}

export default function Creditos() {
  useEffect(() => {
    document.title = 'Créditos de fotos · Estudio Lindero'
  }, [])
  const grupos = credits.reduce((acc, c) => ({ ...acc, [c.grupo]: [...(acc[c.grupo] ?? []), c] }), {})
  return (
    <>
      <main id="contenido" className="frame obra-top pb-16">
        <p className="mono">
          <CutLink to="/" className="nav-link">
            Volver al inicio
          </CutLink>
        </p>
        <h1 className="obra-title wide">Créditos</h1>
        <p className="obra-bajada">
          Este sitio es una demo con contenido ficticio. Todas las fotos son de Unsplash, bajo la licencia de Unsplash. Los
          espacios no son obras reales del estudio.
        </p>
        {Object.entries(grupos).map(([g, list]) => (
          <section key={g} className="mt-12">
            <h2 className="sub-title">{nombres[g]}</h2>
            <ol className="creditos">
              {list.map((c) => (
                <li key={c.src} className="mono">
                  <span className="text-concrete-ink">{c.src.split('/').slice(-2).join('/')}</span>
                  <span>
                    Foto de{' '}
                    <a href={c.url} target="_blank" rel="noreferrer" className="underline underline-offset-2">
                      {c.autor}
                    </a>{' '}
                    en Unsplash
                  </span>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </main>
      <Footer lamina="99 · Créditos" />
    </>
  )
}
