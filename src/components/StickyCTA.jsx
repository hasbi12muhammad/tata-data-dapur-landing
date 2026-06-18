import React, { useState, useEffect } from 'react'

export default function StickyCTA() {
  const [visible, setVisible] = useState(false)
  const [entered, setEntered] = useState(false)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 600)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 600)
    window.addEventListener('resize', onResize)

    const hero = document.getElementById('hero')
    if (!hero) return () => window.removeEventListener('resize', onResize)

    const observer = new IntersectionObserver(
      ([entry]) => {
        const showing = !entry.isIntersecting
        setVisible(showing)
        if (showing) setTimeout(() => setEntered(true), 10)
        else setEntered(false)
      },
      { threshold: 0.1 }
    )
    observer.observe(hero)
    return () => { window.removeEventListener('resize', onResize); observer.disconnect() }
  }, [])

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: 0, left: 0, right: 0,
      zIndex: 98,
      display: 'flex',
      alignItems: 'center',
      justifyContent: isMobile ? 'center' : 'space-between',
      padding: isMobile ? '10px 20px' : '12px 32px',
      background: 'rgba(27, 18, 8, 0.78)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(255, 210, 160, 0.14)',
      boxShadow: '0 -4px 32px rgba(0,0,0,0.22)',
      transform: entered ? 'translateY(0)' : 'translateY(100%)',
      opacity: entered ? 1 : 0,
      transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease',
    }}>
      {!isMobile && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span style={{
            color: '#D4C0AA',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: '14px', fontWeight: 700,
          }}>Tata Data Dapur</span>
          <span style={{ color: '#6B5243', fontSize: '12px' }}>Bayar sekali · Pakai selamanya</span>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {!isMobile && (
          <span style={{
            fontFamily: 'Fraunces, serif',
            fontSize: '22px', fontWeight: 600,
            color: '#C4A87A', letterSpacing: '-0.5px',
          }}>Rp 175.000</span>
        )}
        <a
          href="/beli"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: isMobile ? '11px 28px' : '11px 22px',
            background: '#B5532A', color: '#fff',
            borderRadius: '99px',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: '14px', fontWeight: 800,
            textDecoration: 'none', whiteSpace: 'nowrap',
            boxShadow: '0 2px 16px rgba(181,83,42,0.4)',
            transition: 'background 0.2s, transform 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#8B3D1A'; e.currentTarget.style.transform = 'scale(1.03)' }}
          onMouseLeave={e => { e.currentTarget.style.background = '#B5532A'; e.currentTarget.style.transform = 'scale(1)' }}
        >
          {isMobile ? 'Beli · Rp 175.000' : 'Beli Sekarang'}
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </div>
  )
}
