import logo from './assets/sooma-tile-sobre-oscuro-ocre-tinta.svg'
// Variante blanca: tile blanco con la tilde del color del fondo oscuro, así
// el isotipo no queda como un cuadrado liso (lo que pasaba con el filtro).
import logoBlanco from './assets/sooma-tile-blanco.svg'
import './Signature.css'

export function Signature({ variant = 'color' }) {
  const variantClass = variant !== 'color' ? ` signature--${variant}` : ''
  return (
    <a
      className={`signature signature--swap${variantClass}`}
      href="https://soomaworks.com"
      target="_blank"
      rel="noreferrer"
      aria-label="Hecho por Sooma"
    >
      <span className="sig-mark" aria-hidden="true">
        <img src={variant === 'white' ? logoBlanco : logo} alt="" />
      </span>
      <span className="sig-hecho">Hecho por&nbsp;</span>
      <span className="sig-sooma">
        sooma<span className="logo-dot">.</span>
      </span>
    </a>
  )
}
