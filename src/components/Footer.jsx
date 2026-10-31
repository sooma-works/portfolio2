import { contacto, estudio } from '../data/estudio.js'
import { CutLink } from './Cut.jsx'
import { Signature } from './sooma-signature/Signature.jsx'

const hoy = new Date()
const fecha = [hoy.getDate(), hoy.getMonth() + 1, hoy.getFullYear()].map((n) => String(n).padStart(2, '0')).join('.')

// El pie es el rótulo de la lámina: la firma de Sooma va en la celda "Dibujó".
export default function Footer({ lamina = '00' }) {
  return (
    <footer className="frame pt-16 pb-10">
      <div className="rotulo grid grid-cols-2 md:grid-cols-6">
        <div className="cell col-span-2 md:row-span-2">
          <span className="cell-k">Estudio</span>
          <p className="wide text-[28px] leading-none font-[750]">{estudio.nombre}</p>
          <p className="mono mt-2 text-concrete-ink">
            {contacto.direccion} · {contacto.ciudad}
          </p>
        </div>
        <div className="cell">
          <span className="cell-k">Lámina</span>
          <span className="mono text-[15px]">{lamina}</span>
        </div>
        <div className="cell">
          <span className="cell-k">Escala</span>
          <span className="mono text-[15px]">1:1</span>
        </div>
        <div className="cell">
          <span className="cell-k">Fecha</span>
          <span className="mono text-[15px]">{fecha}</span>
        </div>
        <div className="cell">
          <span className="cell-k">Desde</span>
          <span className="mono text-[15px]">{estudio.desde}</span>
        </div>
        <div className="cell col-span-2 md:col-span-2">
          <span className="cell-k">Dibujó</span>
          <Signature variant="black" />
        </div>
        <div className="cell col-span-2 md:col-span-2">
          <span className="cell-k">Notas</span>
          <p className="mono">Proyecto demo · contenido ficticio</p>
          <p className="mono text-concrete-ink">
            Fotos de Unsplash ·{' '}
            <CutLink to="/creditos" className="underline decoration-1 underline-offset-2">
              ver créditos
            </CutLink>
          </p>
        </div>
      </div>
    </footer>
  )
}
