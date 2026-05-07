import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'

const A = '/assets/components/'

const marqueeItems = [
  { text: 'Hitung HPP otomatis',       img: `${A}7.png`,  w: 22, h: 22 },
  { text: 'Pantau stok real-time',      img: `${A}3.png`,  w: 26, h: 20 },
  { text: 'Bayar sekali selamanya',     img: `${A}1.png`,  w: 22, h: 22 },
  { text: 'Khusus F&B & Bakery',        img: `${A}8.png`,  w: 30, h: 20 },
]

export default function MarqueeStrip() {
  const trackRef = useRef(null)

  useEffect(() => {
    if (!trackRef.current) return
    const animation = gsap.to(trackRef.current, { x: '-50%', duration: 30, ease: 'none', repeat: -1 })
    return () => animation.kill()
  }, [])

  const items = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems]

  return (
    <div style={{
      background: '#FFFCF8',
      borderTop: '1px solid rgba(200,67,26,0.18)',
      borderBottom: '1px solid rgba(200,67,26,0.18)',
      paddingTop: '13px', paddingBottom: '13px',
      overflow: 'hidden',
    }}>
      <div ref={trackRef} style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', width: 'max-content' }}>
        {items.map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ paddingLeft: '28px', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
              <img
                src={item.img} alt=""
                style={{ width: item.w, height: item.h, objectFit: 'contain', mixBlendMode: 'multiply', opacity: 0.85, display: 'block', flexShrink: 0 }}
              />
              <span style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: '1.35rem', color: '#1A1208', letterSpacing: '-0.01em' }}>
                {item.text}
              </span>
            </span>
            <span style={{ fontFamily: 'Fraunces, serif', fontSize: '1.1rem', color: '#C8431A', paddingLeft: '14px', opacity: 0.65 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
