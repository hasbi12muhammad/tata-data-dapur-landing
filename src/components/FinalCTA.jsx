import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

export default function FinalCTA() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current.querySelectorAll('.cta-animate'), {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="cta"
      ref={sectionRef}
      style={{
        background: '#B5532A',
        paddingTop: '112px',
        paddingBottom: '112px',
        paddingLeft: '48px',
        paddingRight: '48px',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      {/* Noise overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        opacity: 0.05,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '200px 200px',
      }} />

      {/* Decorative ✦ symbols */}
      <div style={{
        position: 'absolute',
        top: '40px',
        left: '60px',
        fontSize: '4rem',
        color: 'rgba(251,246,236,0.08)',
        userSelect: 'none',
        fontFamily: 'Fraunces, Georgia, serif',
        zIndex: 1,
      }}>
        ✦
      </div>
      <div style={{
        position: 'absolute',
        top: '40px',
        right: '60px',
        fontSize: '4rem',
        color: 'rgba(251,246,236,0.08)',
        userSelect: 'none',
        fontFamily: 'Fraunces, Georgia, serif',
        zIndex: 1,
      }}>
        ✦
      </div>
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '80px',
        fontSize: '2.5rem',
        color: 'rgba(251,246,236,0.06)',
        userSelect: 'none',
        fontFamily: 'Fraunces, Georgia, serif',
        zIndex: 1,
      }}>
        ✦
      </div>
      <div style={{
        position: 'absolute',
        bottom: '40px',
        right: '80px',
        fontSize: '2.5rem',
        color: 'rgba(251,246,236,0.06)',
        userSelect: 'none',
        fontFamily: 'Fraunces, Georgia, serif',
        zIndex: 1,
      }}>
        ✦
      </div>

      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Headline */}
        <h2
          className="cta-animate"
          style={{
            fontFamily: 'Fraunces, Georgia, serif',
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
            color: '#FBF6EC',
            fontWeight: 400,
            margin: 0,
            marginBottom: '24px',
            lineHeight: 1.1,
          }}
        >
          Siap tahu untung kamu{' '}
          <em>hari ini?</em>
        </h2>

        {/* Subtext */}
        <p
          className="cta-animate"
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '1.1rem',
            color: 'rgba(251,246,236,0.75)',
            marginBottom: '40px',
            maxWidth: '500px',
            margin: '0 auto 40px',
            lineHeight: 1.6,
          }}
        >
          Bergabung dengan pemilik usaha kuliner yang sudah berhenti tebak-tebakan.
        </p>

        {/* CTA Button */}
        <a
          className="cta-animate"
          href="https://wa.me/6281234567890?text=Halo%2C%20saya%20tertarik%20dengan%20Tata%20Data%20Dapur"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#FBF6EC',
            color: '#B5532A',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '1rem',
            fontWeight: 600,
            padding: '16px 36px',
            borderRadius: '100px',
            textDecoration: 'none',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            boxShadow: '0 8px 32px rgba(27,18,8,0.2)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.03)'
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(27,18,8,0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(27,18,8,0.2)'
          }}
        >
          Hubungi via WhatsApp →
        </a>

        <p
          className="cta-animate"
          style={{
            fontFamily: '"DM Mono", monospace',
            fontSize: '0.7rem',
            color: 'rgba(251,246,236,0.45)',
            marginTop: '20px',
            letterSpacing: '0.04em',
          }}
        >
          Gratis 14 hari · Tidak perlu kartu kredit
        </p>
      </div>
    </section>
  )
}
