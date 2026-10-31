import { proceso, socias } from '../data/estudio.js'
import Img from './Img.jsx'
import { SectionTitle } from './Titles.jsx'

const total = proceso.reduce((a, p) => a + p.semanas, 0)

export default function Estudio() {
  return (
    <section id="estudio" className="frame section" aria-labelledby="estudio-title">
      <div className="section-head">
        <SectionTitle id="estudio-title">Estudio</SectionTitle>
        <p className="section-note">
          Somos dos arquitectas y un equipo chico. Fundamos el estudio en Rosario en 2016 y desde entonces hacemos pocas
          obras por año, con dirección de obra propia.
        </p>
      </div>

      <div className="socias">
        {socias.map((s) => (
          <figure key={s.nombre} className="socia">
            <Img photo={s.foto} sizes="(min-width: 768px) 40vw, 100vw" className="socia-img" />
            <figcaption className="rotulo grid grid-cols-2">
              <div className="cell col-span-2">
                <span className="cell-k">{s.rol}</span>
                <span className="text-[24px] leading-tight font-[650]">Arq. {s.nombre}</span>
              </div>
              <div className="cell col-span-2">
                <p className="text-[15px] leading-snug">{s.texto}</p>
              </div>
              <div className="cell col-span-2">
                <span className="cell-k">Formación</span>
                <span className="mono">{s.formacion}</span>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>

      <h3 className="sub-title">Cómo es una obra con nosotras</h3>
      <p className="mono mb-6 text-concrete-ink">Duración típica en semanas, para una reforma de 80 m².</p>
      <ol className="cadena" style={{ '--total': total }}>
        {proceso.map((p, i) => (
          <li key={p.etapa} className="eslabon" style={{ '--n': p.semanas }}>
            <div className="eslabon-cota" aria-hidden="true">
              <span className="mono">{p.semanas} sem</span>
            </div>
            <span className="mono text-concrete-ink">Etapa {i + 1}</span>
            <h4 className="eslabon-title">{p.etapa}</h4>
            <p className="eslabon-text">
              {p.texto} <span className="sr-only">Duración: {p.semanas} semanas.</span>
            </p>
          </li>
        ))}
      </ol>
    </section>
  )
}
