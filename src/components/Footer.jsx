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

// Pie en grafito: una línea con estudio, índice y contacto, y debajo el
// rótulo de la lámina con la firma de Sooma.
export default function Footer({ lamina = '00' }) {
  return (
    <footer className="site-footer">
      <div className="frame">
        <div className="footer-top">
          <p className="footer-name">
            <CutLink to="/" aria-label="Estudio Lindero, inicio">
              Estudio Lindero
            </CutLink>
            <span className="mono footer-dim">
              {contacto.ciudad} · desde {estudio.desde}
            </span>
          </p>
          <nav aria-label="Secciones del pie">
            <ul className="footer-nav mono">
              {links.map((l) => (
                <li key={l.to}>
                  <CutLink to={l.to} className="footer-link">
                    {l.label}
                  </CutLink>
                </li>
              ))}
            </ul>
          </nav>
          <a href={`mailto:${contacto.email}`} className="footer-link mono">
            {contacto.email}
          </a>
        </div>

        <div className="footer-rotulo mono">
          <div className="fcell">
            <span className="fcell-k">Lámina</span> {lamina}
          </div>
          <div className="fcell">
            <span className="fcell-k">Esc.</span> 1:1
          </div>
          <div className="fcell">
            <span className="fcell-k">Fecha</span> {fecha}
          </div>
          <div className="fcell fcell-sig">
            <span className="sig-wrap">
              <Signature variant="white" />
            </span>
          </div>
          <div className="fcell fcell-notas">
            <span>
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
