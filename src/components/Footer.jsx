import { contacto, estudio } from '../data/estudio.js'
import { CutLink } from './Cut.jsx'
import { Signature } from './sooma-signature/Signature.jsx'

const hoy = new Date()
const fecha = [hoy.getDate(), hoy.getMonth() + 1, hoy.getFullYear()].map((n) => String(n).padStart(2, '0')).join('.')

const links = [
  { to: '/#obras', label: 'Obras' },
  { to: '/#materiales', label: 'Materiales' },
  { to: '/#estudio', label: 'Estudio' },
  { to: '/#contacto', label: 'Contacto' },
]

// Pie en grafito, como el reverso de la lámina. Abajo, el rótulo: la firma de
// Sooma va en la celda "Dibujó".
export default function Footer({ lamina = '00' }) {
  return (
    <footer className="site-footer">
      <div className="frame">
        <div className="footer-top">
          <div>
            <CutLink to="/" className="footer-name" aria-label="Estudio Lindero, inicio">
              Estudio Lindero
            </CutLink>
            <p className="footer-bajada">
              Arquitectura, reformas e interiorismo en {contacto.ciudad}. Desde {estudio.desde}.
            </p>
          </div>
          <nav aria-label="Secciones del pie">
            <p className="mono footer-k">Índice</p>
            <ul>
              {links.map((l) => (
                <li key={l.to}>
                  <CutLink to={l.to} className="footer-link">
                    {l.label}
                  </CutLink>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="mono footer-k">Contacto</p>
            <ul>
              <li>
                <a href={`mailto:${contacto.email}`} className="footer-link">
                  {contacto.email}
                </a>
              </li>
              <li>
                <a href={contacto.whatsapp} target="_blank" rel="noreferrer" className="footer-link">
                  {contacto.telefono}
                </a>
              </li>
              <li className="footer-dim">{contacto.direccion}</li>
            </ul>
          </div>
        </div>

        <div className="footer-rotulo">
          <div className="fcell">
            <span className="fcell-k">Lámina</span>
            <span className="mono">{lamina}</span>
          </div>
          <div className="fcell">
            <span className="fcell-k">Escala</span>
            <span className="mono">1:1</span>
          </div>
          <div className="fcell">
            <span className="fcell-k">Fecha</span>
            <span className="mono">{fecha}</span>
          </div>
          <div className="fcell fcell-sig">
            <span className="fcell-k">Dibujó</span>
            <Signature variant="white" />
          </div>
          <div className="fcell fcell-notas">
            <span className="fcell-k">Notas</span>
            <span className="mono">
              Proyecto demo · contenido ficticio ·{' '}
              <CutLink to="/creditos" className="footer-link">
                créditos de fotos
              </CutLink>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
