import React, { useState, useEffect, useRef } from 'react'

export default function StickyCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          setVisible(!entry.isIntersecting)
        })
      },
      { threshold: 0.1 }
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 99,
      padding: '14px 20px 20px',
      background: 'linear-gradient(to top, rgba(26,18,8,0.98) 80%, transparent)',
      display: 'flex',
      gap: '10px',
    }}>
      <a
        href="#pricing"
        style={{
          flex: 1,
          justifyContent: 'center',
          display: 'flex',
          alignItems: 'center',
          padding: '15px 20px',
          background: '#C8431A',
          color: '#fff',
          borderRadius: '99px',
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          fontSize: '15px',
          fontWeight: 800,
          textDecoration: 'none',
          boxShadow: '0 4px 24px rgba(200,67,26,0.3)',
          transition: 'background 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#9E3212' }}
        onMouseLeave={e => { e.currentTarget.style.background = '#C8431A' }}
      >
        Beli Sekarang — Rp 99K →
      </a>
      <a
        href="#how"
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '15px 18px',
          background: 'rgba(255,255,255,0.06)',
          color: '#D4C0AA',
          border: '1.5px solid rgba(255,255,255,0.12)',
          borderRadius: '99px',
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          fontSize: '13px',
          fontWeight: 600,
          textDecoration: 'none',
          transition: 'border-color 0.2s, color 0.2s',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = '#fff' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#D4C0AA' }}
      >
        Cara Kerja
      </a>
    </div>
  )
}
