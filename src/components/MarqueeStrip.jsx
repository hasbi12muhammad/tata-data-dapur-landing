import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'

const marqueeItems = [
  { text: 'Hitung HPP otomatis', symbol: '✦' },
  { text: 'Pantau profit harian', symbol: '✦' },
  { text: 'Kelola bahan baku', symbol: '✦' },
  { text: 'Real-time, akurat', symbol: '✦' },
]

export default function MarqueeStrip() {
  const trackRef = useRef(null)

  useEffect(() => {
    if (!trackRef.current) return

    const animation = gsap.to(trackRef.current, {
      x: '-50%',
      duration: 24,
      ease: 'none',
      repeat: -1,
    })

    return () => animation.kill()
  }, [])

  const items = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems]

  return (
    <div style={{
      background: '#F4EDE0',
      borderTop: '1px solid rgba(181,83,42,0.2)',
      borderBottom: '1px solid rgba(181,83,42,0.2)',
      paddingTop: '16px',
      paddingBottom: '16px',
      overflow: 'hidden',
    }}>
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          whiteSpace: 'nowrap',
          width: 'max-content',
          gap: '0',
        }}
      >
        {items.map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '16px' }}>
            <span style={{
              fontFamily: 'Fraunces, Georgia, serif',
              fontStyle: 'italic',
              fontSize: '1.5rem',
              color: '#1B1208',
              paddingLeft: '24px',
            }}>
              {item.text}
            </span>
            <span style={{
              fontFamily: 'Fraunces, Georgia, serif',
              fontSize: '1.3rem',
              color: '#B5532A',
              paddingRight: '8px',
            }}>
              {item.symbol}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
