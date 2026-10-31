import { createContext, useCallback, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { prefersReducedMotion } from '../lib/motion.js'

const CutContext = createContext(() => {})

const useCut = () => useContext(CutContext)

function scrollToHash(hash) {
  if (!hash) return window.scrollTo(0, 0)
  // Espera a que la página nueva monte antes de buscar la sección.
  const jump = () => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'instant', block: 'start' })
  requestAnimationFrame(() => requestAnimationFrame(jump))
  // Segundo intento: las secciones que cargan diferido pueden correr la posición.
  setTimeout(jump, 450)
}

// Línea de corte A — A': trazo punto-raya con flechas en los extremos.
function cutLineSVG() {
  return `
  <div class="cut-line"></div>
  <div class="cut-end cut-a"><b>A</b><span class="cut-arrow"></span></div>
  <div class="cut-end cut-b"><b>A′</b><span class="cut-arrow"></span></div>`
}

/**
 * Transición "corte": una línea de corte barre la pantalla de lado a lado y
 * la página vieja se separa en dos mitades que se abren hacia arriba y abajo.
 * La página vieja es una copia estática del DOM; abajo ya está la nueva.
 */
export function CutProvider({ children }) {
  const navigate = useNavigate()
  const busy = useRef(false)

  const go = useCallback(
    (to) => {
      const [path, hash = ''] = to.split('#')
      const target = path || window.location.pathname
      const sameRoute = target === window.location.pathname

      if (sameRoute) {
        if (hash) document.getElementById(hash)?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
        else window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
        return
      }
      if (busy.current) return
      const page = document.getElementById('page')
      if (prefersReducedMotion() || !page) {
        navigate(target)
        scrollToHash(hash && `#${hash}`)
        return
      }
      busy.current = true

      const vw = window.innerWidth
      const vh = window.innerHeight
      const y = window.scrollY
      const overlay = document.createElement('div')
      overlay.className = 'cut-overlay'
      const halves = ['top', 'bottom'].map((side) => {
        const half = document.createElement('div')
        half.className = `cut-half cut-${side} paper-grid`
        half.style.backgroundPosition = `var(--gx) ${-y}px`
        const clone = page.cloneNode(true)
        clone.removeAttribute('id')
        clone.setAttribute('aria-hidden', 'true')
        clone.inert = true
        clone.style.cssText = `position:absolute;left:0;top:${-y}px;width:${vw}px;margin:0`
        half.appendChild(clone)
        overlay.appendChild(half)
        return half
      })
      const line = document.createElement('div')
      line.className = 'cut-rule'
      line.innerHTML = cutLineSVG()
      overlay.appendChild(line)
      document.body.appendChild(overlay)

      navigate(target)
      scrollToHash(hash && `#${hash}`)

      const sweep = line.querySelector('.cut-line').animate(
        [{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)' }],
        { duration: 520, easing: 'cubic-bezier(.6,0,.2,1)', fill: 'forwards' },
      )
      line.querySelector('.cut-a').animate([{ opacity: 0 }, { opacity: 1 }], { duration: 160, fill: 'forwards' })
      line
        .querySelector('.cut-b')
        .animate([{ opacity: 0 }, { opacity: 1 }], { duration: 160, delay: 420, fill: 'forwards' })

      sweep.finished.then(() => {
        const ease = 'cubic-bezier(.7,0,.25,1)'
        const opts = { duration: 760, easing: ease, fill: 'forwards' }
        halves[0].animate([{ transform: 'translateY(0)' }, { transform: `translateY(${-vh * 0.62}px) rotate(-1.2deg)` }], opts)
        const last = halves[1].animate(
          [{ transform: 'translateY(0)' }, { transform: `translateY(${vh * 0.62}px) rotate(1.2deg)` }],
          opts,
        )
        line.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, delay: 260, fill: 'forwards' })
        last.finished.then(() => {
          overlay.remove()
          busy.current = false
        })
      })
    },
    [navigate],
  )

  return <CutContext.Provider value={go}>{children}</CutContext.Provider>
}

// Link interno que pasa por la transición de corte.
export function CutLink({ to, children, onClick, ...rest }) {
  const go = useCut()
  return (
    <a
      href={to}
      onClick={(e) => {
        onClick?.(e)
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
        e.preventDefault()
        go(to)
      }}
      {...rest}
    >
      {children}
    </a>
  )
}
