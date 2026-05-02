import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import ReceiptCard from './ReceiptCard'
import { GarlicIllustration, StarAniseIllustration, ChiliIllustration } from './illustrations/index'

export default function Hero() {
  const eyebrowRef = useRef(null)
  const headlineRef = useRef(null)
  const subtextRef = useRef(null)
  const ctasRef = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })

      tl.from(eyebrowRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      })
        .from(headlineRef.current.querySelectorAll('.headline-word'), {
          y: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
        }, '-=0.3')
        .from(subtextRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
        }, '-=0.3')
        .from(ctasRef.current.children, {
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
        }, '-=0.3')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero-section"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        paddingTop: '120px',
        paddingBottom: '80px',
        paddingLeft: '48px',
        paddingRight: '48px',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '55% 45%',
        gap: '60px',
        alignItems: 'center',
      }}>
        {/* Left column */}
        <div>
          {/* Eyebrow */}
          <div
            ref={eyebrowRef}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '28px',
            }}
          >
            <span style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: '#B5532A',
              display: 'inline-block',
              flexShrink: 0,
            }} />
            <span style={{
              fontFamily: '"DM Mono", monospace',
              fontSize: '0.7rem',
              color: '#B5532A',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontWeight: 500,
            }}>
              UNTUK PEMILIK USAHA KULINER
            </span>
          </div>

          {/* Headline */}
          <h1
            ref={headlineRef}
            style={{
              fontFamily: 'Fraunces, Georgia, serif',
              fontSize: 'clamp(3rem, 5.5vw, 4.5rem)',
              lineHeight: 1.08,
              color: '#1B1208',
              margin: 0,
              marginBottom: '24px',
              fontWeight: 400,
            }}
          >
            <span className="headline-word" style={{ display: 'block' }}>Tahu untung rugi,</span>
            <span className="headline-word" style={{ display: 'block', fontStyle: 'italic' }}>setiap hari.</span>
          </h1>

          {/* Subtext */}
          <p
            ref={subtextRef}
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '1.05rem',
              lineHeight: 1.7,
              color: 'rgba(27,18,8,0.65)',
              maxWidth: '480px',
              marginBottom: '40px',
            }}
          >
            Catat bahan baku, hitung HPP otomatis, pantau profit dengan presisi. Tanpa spreadsheet, tanpa tebak-tebakan.
          </p>

          {/* CTAs */}
          <div
            ref={ctasRef}
            style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}
          >
            <a
              href="#cta"
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '0.95rem',
                fontWeight: 500,
                background: '#1B1208',
                color: '#F4EDE0',
                padding: '14px 28px',
                borderRadius: '100px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                boxShadow: '0 4px 16px rgba(27,18,8,0.2)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(27,18,8,0.25)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(27,18,8,0.2)'
              }}
            >
              Mulai Sekarang →
            </a>
            <a
              href="#how-it-works"
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '0.95rem',
                color: 'rgba(27,18,8,0.65)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                borderBottom: '1px solid transparent',
                paddingBottom: '2px',
                transition: 'color 0.2s ease, border-color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#1B1208'
                e.currentTarget.style.borderColor = 'rgba(27,18,8,0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(27,18,8,0.65)'
                e.currentTarget.style.borderColor = 'transparent'
              }}
            >
              Lihat cara kerja →
            </a>
          </div>
        </div>

        {/* Right column */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          minHeight: '520px',
        }}>
          {/* Receipt Card */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            <ReceiptCard />
          </div>

          {/* Garlic decoration */}
          <GarlicIllustration
            style={{
              position: 'absolute',
              top: '40px',
              right: '20px',
              color: '#B5532A',
              '--rotate': '15deg',
              animation: 'float 4s ease-in-out infinite',
              zIndex: 1,
              opacity: 0.85,
            }}
          />

          {/* Star Anise decoration */}
          <StarAniseIllustration
            style={{
              position: 'absolute',
              left: '10px',
              bottom: '80px',
              color: '#5A6B3B',
              '--rotate': '-10deg',
              animation: 'float 5s ease-in-out infinite 1s',
              zIndex: 1,
              opacity: 0.8,
            }}
          />

          {/* Chili decoration */}
          <ChiliIllustration
            style={{
              position: 'absolute',
              top: '50%',
              right: '-20px',
              transform: 'translateY(-50%)',
              color: '#C49A3F',
              '--rotate': '20deg',
              animation: 'float 3.5s ease-in-out infinite 0.5s',
              zIndex: 1,
              opacity: 0.7,
            }}
          />
        </div>
      </div>

      {/* Background decorative element */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        right: '-100px',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(196,154,63,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />
    </section>
  )
}
