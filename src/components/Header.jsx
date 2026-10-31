import { useEffect, useState } from 'react'
import { CutLink } from './Cut.jsx'

const links = [
  { to: '/#obras', label: 'Obras' },
  { to: '/#materiales', label: 'Materiales' },
  { to: '/#estudio', label: 'Estudio' },
  { to: '/#contacto', label: 'Contacto' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="site-header">
      <div className="frame flex h-full items-center justify-between gap-4">
        <CutLink to="/" className="group flex items-baseline gap-3 no-underline" aria-label="Estudio Lindero, inicio">
          <span className="text-[19px] leading-none font-[750] tracking-[-0.01em] wide">Lindero</span>
          <span className="mono hidden text-concrete-ink sm:inline">arquitectura e interiores · Rosario</span>
        </CutLink>
        <nav aria-label="Secciones" className="hidden md:block">
          <ul className="mono flex gap-7">
            {links.map((l) => (
              <li key={l.to}>
                <CutLink to={l.to} className="nav-link">
                  {l.label}
                </CutLink>
              </li>
            ))}
          </ul>
        </nav>
        <button
          type="button"
          className="mono nav-link md:hidden"
          aria-expanded={open}
          aria-controls="menu-movil"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'Cerrar' : 'Índice'}
        </button>
      </div>
      {open && (
        <nav id="menu-movil" aria-label="Secciones" className="menu-sheet md:hidden">
          <ol className="frame">
            {links.map((l, i) => (
              <li key={l.to}>
                <CutLink to={l.to} onClick={() => setOpen(false)}>
                  <span className="mono text-concrete-ink">{String(i + 1).padStart(2, '0')}</span>
                  <span className="wide text-[40px] leading-none font-[750]">{l.label}</span>
                </CutLink>
              </li>
            ))}
          </ol>
        </nav>
      )}
    </header>
  )
}
