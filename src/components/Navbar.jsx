import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'

export default function Navbar() {
  const navRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current) return
      const scrolled = window.scrollY > 50

      gsap.to(navRef.current, {
        boxShadow: scrolled
          ? '0 8px 32px rgba(27,18,8,0.12)'
          : '0 2px 8px rgba(27,18,8,0.04)',
        backgroundColor: scrolled
          ? 'rgba(244,237,224,0.95)'
          : 'rgba(244,237,224,0.8)',
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
        top: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 96px)',
        maxWidth: '740px',
        zIndex: 1000,
        background: 'rgba(244,237,224,0.8)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(196,154,63,0.2)',
        borderRadius: '100px',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 8px rgba(27,18,8,0.04)',
      }}
    >
      {/* Logo + Wordmark */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '34px', height: '34px',
          background: '#1B1208', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, overflow: 'hidden',
        }}>
          <img
            src="/assets/td-logo.png" alt="TD"
            style={{ width: '22px', height: '22px', objectFit: 'contain' }}
          />
        </div>
        <span style={{
          fontFamily: 'Fraunces, Georgia, serif', fontSize: '0.95rem',
          color: '#1B1208', fontWeight: 400, letterSpacing: '-0.01em',
        }}>
          Tata Data Dapur
        </span>
      </div>

      {/* Nav links */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '28px',
      }}>
        {['Fitur', 'Cara Kerja', 'FAQ'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(' ', '-')}`}
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '0.82rem',
              color: 'rgba(27,18,8,0.7)',
              textDecoration: 'none',
              fontWeight: 400,
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => e.target.style.color = '#1B1208'}
            onMouseLeave={(e) => e.target.style.color = 'rgba(27,18,8,0.7)'}
          >
            {item}
          </a>
        ))}
      </div>

      {/* CTA Button */}
      <a
        href="#cta"
        style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '0.82rem',
          fontWeight: 500,
          background: '#1B1208',
          color: '#F4EDE0',
          padding: '8px 18px',
          borderRadius: '100px',
          textDecoration: 'none',
          transition: 'opacity 0.2s ease, transform 0.2s ease',
          display: 'inline-block',
        }}
        onMouseEnter={(e) => {
          e.target.style.opacity = '0.85'
          e.target.style.transform = 'scale(1.02)'
        }}
        onMouseLeave={(e) => {
          e.target.style.opacity = '1'
          e.target.style.transform = 'scale(1)'
        }}
      >
        Mulai Sekarang
      </a>
    </nav>
  )
}
