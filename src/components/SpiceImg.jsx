import React from 'react'

// Transparent-background PNG illustrations
// cream  → render directly, dark ink on light bg
// dark   → invert to light on dark bg
// terracotta → render directly with reduced opacity
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
        style={{ ...base, opacity: opacity ?? 0.88, ...style }}
      />
    )
  }

  if (bg === 'dark') {
    return (
      <img
        src={src} alt={alt} className={className}
        style={{
          ...base,
          filter: 'invert(1) brightness(0.82) sepia(0.1)',
          opacity: opacity ?? 0.5,
          ...style,
        }}
      />
    )
  }

  // terracotta
  return (
    <img
      src={src} alt={alt} className={className}
      style={{ ...base, opacity: opacity ?? 0.55, ...style }}
    />
  )
}
