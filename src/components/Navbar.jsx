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
      <div style={{
        fontFamily: 'Fraunces, serif',
        fontSize: '20px',
        fontWeight: 700,
        color: '#B5532A',
        letterSpacing: '-0.3px',
      }}>
        Tata Data<span style={{ color: '#1B1208' }}> Dapur</span>
      </div>

      {/* CTA */}
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
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </a>
    </nav>
  )
}
