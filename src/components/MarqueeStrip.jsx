import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { StarAniseIllustration, ChiliIllustration, GarlicIllustration } from './illustrations/index'

const marqueeItems = [
  { text: 'Hitung HPP otomatis', Icon: StarAniseIllustration, iconStyle: { width: 20, height: 20, color: '#B5532A', opacity: 0.7 } },
  { text: 'Pantau profit harian', Icon: ChiliIllustration, iconStyle: { width: 12, height: 20, color: '#C49A3F', opacity: 0.7 } },
  { text: 'Kelola bahan baku', Icon: GarlicIllustration, iconStyle: { width: 18, height: 20, color: '#5A6B3B', opacity: 0.65 } },
  { text: 'Real-time, akurat', Icon: StarAniseIllustration, iconStyle: { width: 20, height: 20, color: '#B5532A', opacity: 0.7 } },
  { text: 'Tanpa spreadsheet', Icon: ChiliIllustration, iconStyle: { width: 12, height: 20, color: '#C49A3F', opacity: 0.7 } },
  { text: 'Data aman & terenkripsi', Icon: GarlicIllustration, iconStyle: { width: 18, height: 20, color: '#5A6B3B', opacity: 0.65 } },
]

export default function MarqueeStrip() {
  const trackRef = useRef(null)

  useEffect(() => {
    if (!trackRef.current) return
    const animation = gsap.to(trackRef.current, {
      x: '-50%', duration: 28, ease: 'none', repeat: -1,
    })
    return () => animation.kill()
  }, [])

  const items = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems]

  return (
    <div style={{
      background: '#F4EDE0',
      borderTop: '1px solid rgba(181,83,42,0.18)',
      borderBottom: '1px solid rgba(181,83,42,0.18)',
      paddingTop: '14px', paddingBottom: '14px',
      overflow: 'hidden',
    }}>
      <div
        ref={trackRef}
        style={{
          display: 'flex', alignItems: 'center',
          whiteSpace: 'nowrap', width: 'max-content', gap: '0',
        }}
      >
        {items.map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ paddingLeft: '28px', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
              <item.Icon style={item.iconStyle} />
              <span style={{
                fontFamily: 'Fraunces, Georgia, serif',
                fontStyle: 'italic', fontSize: '1.35rem',
                color: '#1B1208', letterSpacing: '-0.01em',
              }}>
                {item.text}
              </span>
            </span>
            <span style={{
              fontFamily: 'Fraunces, Georgia, serif',
              fontSize: '1.1rem', color: '#B5532A',
              paddingLeft: '14px', opacity: 0.7,
            }}>
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
