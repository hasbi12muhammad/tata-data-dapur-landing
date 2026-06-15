import React from 'react'

// SVG paths sourced from svgrepo.com — Tabler Icons collection (MIT license)
// https://www.svgrepo.com/collection/tabler-icons/

const PATHS = {
  // ── Tour menu icons ──
  dashboard: (
    // Layout / dashboard grid
    <>
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <rect x="14" y="4" width="6" height="6" rx="1" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <rect x="14" y="14" width="6" height="6" rx="1" />
    </>
  ),
  package: (
    // Ingredient / cube box
    <>
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3" />
      <path d="M12 12L4 7.5" />
      <path d="M12 12v9" />
      <path d="M12 12l8-4.5" />
      <path d="M16 5.25l-8 4.5" />
    </>
  ),
  cart: (
    // Shopping cart / purchases
    <>
      <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M1 1h2.5l2.5 12h10l2 -7h-14.5" />
    </>
  ),
  wallet: (
    // Wallet / expenses
    <>
      <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" />
      <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" />
    </>
  ),
  chefHat: (
    // Chef hat / products
    <>
      <path d="M12 3a5 5 0 0 1 5 5c0 1.8-.9 3.4-2.3 4.4l-.7 .6v5h-4v-5l-.7-.6a5.4 5.4 0 0 1 -2.3 -4.4a5 5 0 0 1 5 -5z" />
      <path d="M8 18h8" />
      <path d="M9 21h6" />
    </>
  ),
  factory: (
    // Factory / production
    <>
      <path d="M4 21v-15l7 5v-5l7 5v-5" />
      <path d="M3 21h18" />
      <path d="M10 21v-4h4v4" />
    </>
  ),
  receipt: (
    // Receipt / sales
    <>
      <path d="M5 21v-16a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v16l-3 -2l-2 2l-2 -2l-2 2l-2 -2l-3 2" />
      <path d="M9 7h6" />
      <path d="M9 11h6" />
      <path d="M9 15h4" />
    </>
  ),
  barChart: (
    // Bar chart / reports
    <>
      <path d="M3 12h2v9h-2z" />
      <path d="M8 7h2v14h-2z" />
      <path d="M13 3h2v18h-2z" />
      <path d="M18 9h2v12h-2z" />
    </>
  ),
  settings: (
    // Settings sliders
    <>
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
      <circle cx="9" cy="6" r="2" fill="currentColor" stroke="none" />
      <circle cx="15" cy="12" r="2" fill="currentColor" stroke="none" />
      <circle cx="9" cy="18" r="2" fill="currentColor" stroke="none" />
    </>
  ),

  // ── Tab bar icons ──
  map: (
    // Compass / tour
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v2" />
      <path d="M12 19v2" />
      <path d="M3 12h2" />
      <path d="M19 12h2" />
      <path d="M8 12l3 -3l5 2l-3 3l-5 -2z" />
    </>
  ),
  help: (
    // Question mark circle / FAQ
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M10 10a2 2 0 1 1 4 0c0 1 -1 1.5 -2 2.5" />
      <path d="M12 17l.01 0" />
    </>
  ),
  playCircle: (
    // Play circle / video
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M10 8.5l6 3.5l-6 3.5v-7z" />
    </>
  ),

  // ── Utility icons ──
  image: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5 -5l-5 5" />
      <path d="M14 14l-2 -2l-4 4" />
    </>
  ),
  lightbulb: (
    <>
      <path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3" />
      <path d="M9.7 17h4.6" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8l.01 0" />
      <path d="M11 12h1v4h1" />
    </>
  ),
  plus: (
    <>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </>
  ),
  arrowLeft: (
    <>
      <path d="M5 12h14" />
      <path d="M5 12l6 6" />
      <path d="M5 12l6 -6" />
    </>
  ),
  play: (
    <path d="M7 4v16l13 -8z" />
  ),
}

export default function Icon({ name, size = 20, stroke = 1.75, fill = 'none', color, style, ...rest }) {
  const node = PATHS[name]
  if (!node) return null
  const solid = name === 'play'
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={solid ? (color || 'currentColor') : fill}
      stroke={solid ? 'none' : (color || 'currentColor')}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      style={{ display: 'block', flexShrink: 0, ...style }}
      {...rest}
    >
      {node}
    </svg>
  )
}
