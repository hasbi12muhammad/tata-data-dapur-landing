import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SpiceImg from './SpiceImg'

const A = '/assets/components/'

const floatStyle = (r = 0, d = '4s', delay = '0s') => ({
  transform: `rotate(${r}deg)`,
  animation: `float ${d} ease-in-out infinite ${delay}`,
  '--rotate': `${r}deg`,
})

export default function FinalCTA() {
  const sectionRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current.querySelector('.cta-content'), {
        y: 20, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      })
      gsap.set(sectionRef.current.querySelectorAll('.cta-illus'), { opacity: 0 })
      gsap.to(sectionRef.current.querySelectorAll('.cta-illus'), {
        opacity: 1, duration: 1, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const noiseUrl = "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")"

  return (
    <section
      id="final-cta"
      ref={sectionRef}
      style={{
        background: '#1B1208',
        padding: '88px 24px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Noise overlay */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, opacity: 0.04, backgroundImage: noiseUrl, backgroundRepeat: 'repeat', backgroundSize: '200px 200px' }} />

      {/* Corner botanical illustrations */}
      <div className="cta-illus finalcta-side-illus" style={{ position: 'absolute', top: '20px', left: '40px', zIndex: 1 }}>
        <div style={floatStyle(-12, '5s', '0.3s')}>
          <SpiceImg src={`${A}1.png`} bg="dark" width={110} height={110} />
        </div>
      </div>
      <div className="cta-illus finalcta-side-illus" style={{ position: 'absolute', bottom: '10px', left: '10px', zIndex: 1 }}>
        <div style={floatStyle(8, '4.5s', '1s')}>
          <SpiceImg src={`${A}20.png`} bg="dark" width={120} height={105} />
        </div>
      </div>
      <div className="cta-illus finalcta-side-illus" style={{ position: 'absolute', top: '20px', right: '40px', zIndex: 1 }}>
        <div style={floatStyle(18, '4.8s', '0.5s')}>
          <SpiceImg src={`${A}3.png`} bg="dark" width={115} height={92} />
        </div>
      </div>
      <div className="cta-illus finalcta-side-illus" style={{ position: 'absolute', bottom: '10px', right: '10px', zIndex: 1 }}>
        <div style={floatStyle(-6, '5.2s', '1.5s')}>
          <SpiceImg src={`${A}7.png`} bg="dark" width={90} height={90} />
        </div>
      </div>

      {/* Content */}
      <div className="cta-content" style={{ position: 'relative', zIndex: 10, maxWidth: '680px', margin: '0 auto' }}>
        <h2 style={{
          fontFamily: 'Fraunces, serif',
          fontSize: 'clamp(28px, 4vw, 44px)',
          fontWeight: 700, letterSpacing: '-1px',
          color: '#fff', marginBottom: '16px', lineHeight: 1.2,
        }}>
          Kalau bisnismu penting,<br />
          <em style={{ color: '#B5532A', fontStyle: 'italic' }}>kamu butuh sistem yang jelas.</em>
        </h2>

        <p style={{ fontSize: '16px', color: '#C4B098', marginBottom: '36px', lineHeight: 1.7, maxWidth: '500px', margin: '0 auto 36px' }}>
          Setiap hari yang kamu jalankan tanpa data yang jelas adalah hari yang kamu lewatkan untuk tumbuh.<br />
          <strong style={{ color: '#D4C0AA', fontWeight: 700 }}>Mulai hari ini — satu kali bayar, selamanya punya kontrol.</strong>
        </p>

        <a
          href="#pricing"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: '#B5532A', color: '#fff',
            padding: '18px 40px', borderRadius: '99px',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: '16px', fontWeight: 800,
            textDecoration: 'none',
            boxShadow: '0 4px 24px rgba(181,83,42,0.35)',
            animation: 'pulse-btn 3s infinite',
            transition: 'background 0.2s, transform 0.1s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#8B3D1A'; e.currentTarget.style.transform = 'translateY(-1px)' }}
          onMouseLeave={e => { e.currentTarget.style.background = '#B5532A'; e.currentTarget.style.transform = 'translateY(0)' }}
        >
          Mulai Sekarang — Rp 175.000
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>

        <p style={{ fontSize: '13px', color: '#4A3020', marginTop: '20px' }}>
          Sudah 11 pengguna bergabung · 4 slot tersisa
        </p>
      </div>
    </section>
  )
}
