import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CutLink } from '../components/Cut.jsx'
import Footer from '../components/Footer.jsx'
import Img from '../components/Img.jsx'
import PlanoInteractivo from '../components/PlanoInteractivo.jsx'
import { Extrude } from '../components/Titles.jsx'
import { getObra, nextObra, obras } from '../data/obras.js'
import NotFound from './NotFound.jsx'

const partes = ['Problema', 'Idea', 'Solución']

export default function Obra() {
  const { slug } = useParams()
  const obra = getObra(slug)

  useEffect(() => {
    if (obra) document.title = `${obra.nombre} · Estudio Lindero`
  }, [obra])

  if (!obra) return <NotFound />
  const next = nextObra(slug)
  const [portada, ...resto] = obra.fotos

  return (
    <>
      <main id="contenido" className="obra">
        <div className="frame obra-top">
          <p className="mono flex flex-wrap items-center gap-x-6 gap-y-1">
            <CutLink to="/#obras" className="nav-link">
              Índice de obras
            </CutLink>
            <span className="text-concrete-ink">
              Lámina {obra.numero} de {String(obras.length).padStart(2, '0')}
            </span>
          </p>
          <Extrude className="obra-title" key={obra.slug}>
            {obra.nombre}
          </Extrude>
          <p className="obra-bajada">{obra.bajada}</p>
        </div>

        <div className="frame">
          <dl className="rotulo ficha">
            <div className="cell">
              <dt className="cell-k">Tipo</dt>
              <dd>{obra.tipo}</dd>
            </div>
            <div className="cell">
              <dt className="cell-k">Ubicación</dt>
              <dd>{obra.ubicacion}</dd>
            </div>
            <div className="cell">
              <dt className="cell-k">Superficie</dt>
              <dd className="mono">{obra.m2} m²</dd>
            </div>
            <div className="cell">
              <dt className="cell-k">Año</dt>
              <dd className="mono">{obra.anio}</dd>
            </div>
            <div className="cell">
              <dt className="cell-k">Estado</dt>
              <dd className={`mono ${obra.estado === 'En obra' ? 'estado-obra' : ''}`}>{obra.estado}</dd>
            </div>
            <div className="cell ficha-wide">
              <dt className="cell-k">Equipo</dt>
              <dd>{obra.equipo.join(', ')}</dd>
            </div>
            <div className="cell ficha-wide">
              <dt className="cell-k">Materiales</dt>
              <dd>{obra.materiales.join(' · ')}</dd>
            </div>
          </dl>
        </div>

        <figure className="frame obra-portada">
          <Img photo={portada} priority sizes="(min-width: 1400px) 1280px, 100vw" />
        </figure>

        <section className="frame section" aria-labelledby="planta-title">
          <div className="section-head">
            <h2 id="planta-title" className="sub-title">
              Planta
            </h2>
            <p className="section-note">
              Pasá por los ambientes (o tocalos) para ver cada uno. Las medidas están en metros.
            </p>
          </div>
          <PlanoInteractivo obra={obra} key={obra.slug} />
        </section>

        <section className="frame section obra-texto" aria-label="Memoria del proyecto">
          {obra.texto.map((p, i) => (
            <div key={i} className="memoria">
              <h3 className="mono memoria-k">
                <span className="memoria-n">{i + 1}</span>
                {partes[i]}
              </h3>
              <p>{p}</p>
            </div>
          ))}
        </section>

        <section className="frame obra-fotos" aria-label="Fotos de la obra">
          {resto.map((f, i) => (
            <figure key={f.src} className={`obra-foto ${f.h > f.w ? 'is-v' : ''}`}>
              <Img photo={f} sizes="(min-width: 768px) 60vw, 100vw" />
              <figcaption className="mono">
                <span>F-{String(i + 2).padStart(2, '0')}</span> {f.alt}
              </figcaption>
            </figure>
          ))}
        </section>

        <nav className="frame obra-next" aria-label="Obra siguiente">
          <CutLink to={`/obras/${next.slug}`} className="next-link">
            <span className="mono text-concrete-ink">Siguiente · Lámina {next.numero}</span>
            <Extrude as="span" className="next-title" key={next.slug}>
              {next.nombre}
            </Extrude>
            <span className="mono">
              {next.tipo} · {next.ubicacion} · {next.anio}
            </span>
          </CutLink>
        </nav>
      </main>
      <Footer lamina={`${obra.numero} · ${obra.nombre}`} />
    </>
  )
}
