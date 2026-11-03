// Anchos de las variantes WebP que hay al lado de cada foto (NN-400.webp…).
const STEPS = [400, 800, 1200]

// Foto responsive: WebP en 400/800/1200 px de ancho y la grande, con el JPG
// (y su miniatura -800) de respaldo para navegadores sin WebP.
export default function Img({ photo, sizes = '100vw', className = '', priority = false, alt, ...rest }) {
  const { src, w, h } = photo
  const base = src.replace(/\.jpg$/, '')
  const webp = [...STEPS.filter((s) => s < w).map((s) => `${base}-${s}.webp ${s}w`), `${base}.webp ${w}w`].join(', ')
  const w800 = Math.round((w * 800) / Math.max(w, h))
  return (
    <picture className="contents">
      <source type="image/webp" srcSet={webp} sizes={sizes} />
      <img
        src={src}
        srcSet={`${base}-800.jpg ${w800}w, ${src} ${w}w`}
        sizes={sizes}
        width={w}
        height={h}
        alt={alt ?? photo.alt ?? ''}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
        className={className}
        {...rest}
      />
    </picture>
  )
}
