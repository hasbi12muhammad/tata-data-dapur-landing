import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'

export default function Navbar() {
  const navRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current) return
      const scrolled = window.scrollY > 50
      gsap.to(navRef.current, {
        boxShadow: scrolled ? '0 1px 16px rgba(26,18,8,0.1)' : 'none',
        duration: 0.3,
        ease: 'power2.out',
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'rgba(255,252,248,0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(181,83,42,0.18)',
        padding: '0 24px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <img
          src="/assets/td-logo.png"
          alt="Tata Data"
          style={{
            height: '32px',
            width: '32px',
            objectFit: 'contain',
            filter: 'brightness(0) saturate(100%) invert(34%) sepia(60%) saturate(600%) hue-rotate(348deg) brightness(85%)',
          }}
        />
        <div style={{
          fontFamily: 'Fraunces, serif',
          fontSize: '20px',
          fontWeight: 700,
          color: '#B5532A',
          letterSpacing: '-0.3px',
          whiteSpace: 'nowrap',
        }}>
          Tata Data<span style={{ color: '#1B1208' }}> Dapur</span>
        </div>
      </div>

      {/* CTA group */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <a
          href="https://app.tatadatadapur.my.id"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#5A3D25',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: '13px',
            fontWeight: 600,
            textDecoration: 'none',
            padding: '10px 16px',
            borderRadius: '99px',
            border: '1.5px solid rgba(181,83,42,0.25)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            whiteSpace: 'nowrap',
            transition: 'border-color 0.2s, color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#B5532A'; e.currentTarget.style.color = '#B5532A' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(181,83,42,0.25)'; e.currentTarget.style.color = '#5A3D25' }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>
          </svg>
          Masuk ke App
        </a>
        <a
          href="#pricing"
          style={{
            background: '#B5532A',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '99px',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            whiteSpace: 'nowrap',
            transition: 'background 0.2s, transform 0.1s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#8B3D1A' }}
          onMouseLeave={e => { e.currentTarget.style.background = '#B5532A' }}
          onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.97)' }}
          onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)' }}
        >
          Beli Sekarang
        </a>
      </div>
    </nav>
  )
}
