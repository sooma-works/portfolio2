import { contacto } from '../data/estudio.js'
import { SectionTitle } from './Titles.jsx'

export default function Contacto() {
  return (
    <section id="contacto" className="frame section" aria-labelledby="contacto-title">
      <div className="section-head">
        <SectionTitle id="contacto-title">Contacto</SectionTitle>
        <p className="section-note">
          Contanos qué tenés: un terreno, una casa vieja, un local vacío. Con una foto y la dirección ya podemos empezar a
          hablar.
        </p>
      </div>

      <a href={`mailto:${contacto.email}`} className="contacto-mail">
        {contacto.email}
      </a>

      <dl className="rotulo contacto-grid">
        <div className="cell">
          <dt className="cell-k">Teléfono</dt>
          <dd>
            <a href={contacto.whatsapp} target="_blank" rel="noreferrer" className="mono text-[15px]">
              {contacto.telefono}
            </a>
          </dd>
        </div>
        <div className="cell">
          <dt className="cell-k">Estudio</dt>
          <dd className="mono text-[15px]">
            {contacto.direccion}
            <br />
            {contacto.ciudad}
          </dd>
        </div>
        <div className="cell">
          <dt className="cell-k">Horario</dt>
          <dd className="mono text-[15px]">{contacto.horario}</dd>
        </div>
        <div className="cell">
          <dt className="cell-k">Punto fijo</dt>
          <dd className="mono flex items-center gap-2 text-[15px]">
            <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" className="shrink-0">
              <circle cx="10" cy="10" r="8" fill="none" stroke="var(--marker)" strokeWidth="1.5" />
              <path d="M10 2v16M2 10h16" stroke="var(--marker)" strokeWidth="1" />
            </svg>
            {contacto.coordenadas}
          </dd>
        </div>
      </dl>
    </section>
  )
}
