import React from 'react'

/**
 * bg: 'cream' | 'dark' | 'terracotta'
 * Semua PNG asset punya bg cream (#F5EDD8), jadi:
 *  - cream   → mix-blend-mode: multiply  (bg melebur, ilustrasi terlihat bersih)
 *  - dark    → filter invert + opacity rendah (jadi ghost light on dark)
 *  - terracotta → multiply + opacity (bg melebur ke terracotta)
 */
export default function SpiceImg({
  src, alt = '', width, height, style = {},
  bg = 'cream', opacity, className = '',
}) {
  const base = {
    display: 'block',
    objectFit: 'contain',
    userSelect: 'none',
    pointerEvents: 'none',
    width: width || undefined,
    height: height || undefined,
  }

  if (bg === 'cream') {
    return (
      <img
        src={src} alt={alt} className={className}
        style={{
          ...base,
          mixBlendMode: 'multiply',
          opacity: opacity ?? 0.92,
          ...style,
        }}
      />
    )
  }

  if (bg === 'dark') {
    return (
      <img
        src={src} alt={alt} className={className}
        style={{
          ...base,
          filter: 'invert(1) brightness(0.55) sepia(0.15)',
          mixBlendMode: 'screen',
          opacity: opacity ?? 0.55,
          ...style,
        }}
      />
    )
  }

  // terracotta
  return (
    <img
      src={src} alt={alt} className={className}
      style={{
        ...base,
        mixBlendMode: 'multiply',
        opacity: opacity ?? 0.28,
        ...style,
      }}
    />
  )
}
