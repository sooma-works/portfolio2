// Foto responsive con su miniatura de 800 px (sufijo -800) en el srcset.
export default function Img({ photo, sizes = '100vw', className = '', priority = false, alt, ...rest }) {
  const { src, w, h } = photo
  const small = src.replace(/\.jpg$/, '-800.jpg')
  const w800 = Math.round((w * 800) / Math.max(w, h))
  return (
    <img
      src={src}
      srcSet={`${small} ${w800}w, ${src} ${w}w`}
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
  )
}
