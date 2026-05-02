import React from 'react'

export function GarlicIllustration({ className = '', style = {} }) {
  return (
    <svg className={className} style={style} width="80" height="95" viewBox="0 0 80 95" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Bulb outer shape */}
      <path d="M40 82 C18 82 8 66 8 50 C8 34 20 18 40 14 C60 18 72 34 72 50 C72 66 62 82 40 82Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      {/* Center clove division */}
      <path d="M40 14 C38 28 36 42 36 56 C36 66 37 74 40 82" stroke="currentColor" strokeWidth="1.2" fill="none"/>
      <path d="M40 14 C42 28 44 42 44 56 C44 66 43 74 40 82" stroke="currentColor" strokeWidth="1.2" fill="none"/>
      {/* Left clove outline */}
      <path d="M22 42 C20 34 25 22 35 18" stroke="currentColor" strokeWidth="1" fill="none"/>
      <path d="M22 42 C16 52 20 68 36 76" stroke="currentColor" strokeWidth="1" fill="none"/>
      {/* Right clove outline */}
      <path d="M58 42 C60 34 55 22 45 18" stroke="currentColor" strokeWidth="1" fill="none"/>
      <path d="M58 42 C64 52 60 68 44 76" stroke="currentColor" strokeWidth="1" fill="none"/>
      {/* Stem */}
      <path d="M40 14 C39 10 37 6 39 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M39 2 C41 1 43 4 40 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      {/* Roots */}
      <path d="M32 80 C30 85 28 88 26 92" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none"/>
      <path d="M40 82 C40 86 40 89 40 93" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none"/>
      <path d="M48 80 C50 85 52 88 54 92" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none"/>
    </svg>
  )
}

export function StarAniseIllustration({ className = '', style = {} }) {
  return (
    <svg className={className} style={style} width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Center circle */}
      <circle cx="35" cy="35" r="5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      {/* 8 arms with seed pods */}
      {[0,45,90,135,180,225,270,315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const x1 = 35 + 7 * Math.cos(rad)
        const y1 = 35 + 7 * Math.sin(rad)
        const x2 = 35 + 26 * Math.cos(rad)
        const y2 = 35 + 26 * Math.sin(rad)
        const px = 35 + 28 * Math.cos(rad)
        const py = 35 + 28 * Math.sin(rad)
        return (
          <g key={i}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1.2"/>
            <ellipse cx={px} cy={py} rx="4" ry="3"
              transform={`rotate(${angle}, ${px}, ${py})`}
              stroke="currentColor" strokeWidth="1.2" fill="none"/>
          </g>
        )
      })}
    </svg>
  )
}

export function OnionIllustration({ className = '', style = {} }) {
  return (
    <svg className={className} style={style} width="75" height="85" viewBox="0 0 75 85" fill="none">
      {/* Main bulb */}
      <path d="M37 75 C15 75 5 58 5 42 C5 26 18 12 37 8 C56 12 70 26 70 42 C70 58 59 75 37 75Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      {/* Inner layer lines */}
      <path d="M37 8 C37 8 28 22 26 42 C24 58 30 70 37 75" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6"/>
      <path d="M37 8 C37 8 46 22 48 42 C50 58 44 70 37 75" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6"/>
      {/* Top neck */}
      <path d="M32 8 C31 4 32 1 37 0 C42 1 43 4 42 8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      {/* Stem shoots */}
      <path d="M35 10 C33 8 31 5 33 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      <path d="M39 10 C41 8 43 4 41 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      {/* Roots */}
      <path d="M28 73 C25 78 22 81 20 84" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none"/>
      <path d="M37 75 C37 79 37 82 37 85" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none"/>
      <path d="M46 73 C49 78 52 81 54 84" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none"/>
    </svg>
  )
}

export function ChiliIllustration({ className = '', style = {} }) {
  return (
    <svg className={className} style={style} width="60" height="90" viewBox="0 0 60 90" fill="none">
      {/* Chili body */}
      <path d="M20 15 C10 20 5 35 6 55 C7 70 16 85 30 87 C44 85 53 70 54 55 C55 35 50 20 40 15" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      {/* Center line */}
      <path d="M30 87 C30 60 30 35 30 15" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5"/>
      {/* Top cap */}
      <path d="M20 15 C23 10 27 8 30 8 C33 8 37 10 40 15" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      {/* Stem */}
      <path d="M30 8 C30 4 31 1 33 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      {/* Leaf */}
      <path d="M33 5 C38 2 44 3 46 8 C42 10 36 8 33 5Z" stroke="currentColor" strokeWidth="1.2" fill="none"/>
      {/* Seeds inside */}
      <ellipse cx="28" cy="45" rx="2" ry="3" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5"/>
      <ellipse cx="32" cy="55" rx="2" ry="3" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5"/>
    </svg>
  )
}

export function HerbsIllustration({ className = '', style = {} }) {
  return (
    <svg className={className} style={style} width="65" height="80" viewBox="0 0 65 80" fill="none">
      <path d="M32 75 C32 50 32 30 32 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M32 55 C32 55 22 48 18 40 C22 36 30 42 32 55Z" stroke="currentColor" strokeWidth="1.2" fill="none"/>
      <path d="M32 45 C32 45 42 38 46 30 C42 26 34 32 32 45Z" stroke="currentColor" strokeWidth="1.2" fill="none"/>
      <path d="M32 32 C32 32 22 25 18 17 C22 13 30 19 32 32Z" stroke="currentColor" strokeWidth="1.2" fill="none"/>
      <path d="M32 22 C32 22 42 15 46 7 C42 3 34 9 32 22Z" stroke="currentColor" strokeWidth="1.2" fill="none"/>
    </svg>
  )
}
