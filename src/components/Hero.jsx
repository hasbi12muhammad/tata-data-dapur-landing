import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import ReceiptCard from './ReceiptCard'
import {
  GarlicIllustration,
  StarAniseIllustration,
  ChiliIllustration,
  OnionIllustration,
  BayLeafIllustration,
  CinnamonIllustration,
  PeppercornScatterIllustration,
  SparkleIllustration,
} from './illustrations/index'

export default function Hero() {
  const eyebrowRef = useRef(null)
  const headlineRef = useRef(null)
  const subtextRef = useRef(null)
  const ctasRef = useRef(null)
  const sectionRef = useRef(null)
  const illusRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })
      tl.from(eyebrowRef.current, { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' })
        .from(headlineRef.current.querySelectorAll('.headline-word'), {
          y: 40, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out',
        }, '-=0.3')
        .from(subtextRef.current, { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
        .from(ctasRef.current.children, {
          y: 20, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out',
        }, '-=0.3')
        .from(illusRef.current.querySelectorAll('.illus-item'), {
          scale: 0.6, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'back.out(1.5)',
        }, '-=0.8')
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const floatStyle = (delay = '0s', dur = '4s') => ({
    animation: `float ${dur} ease-in-out infinite ${delay}`,
  })

  return (
    <section
      id="hero-section"
      ref={sectionRef}
      style={{
        minHeight: '100vh', paddingTop: '130px', paddingBottom: '80px',
        paddingLeft: '48px', paddingRight: '48px',
        display: 'flex', alignItems: 'center',
        position: 'relative', overflow: 'hidden', background: '#F4EDE0',
      }}
    >
      {/* Ambient glows */}
      <div style={{
        position: 'absolute', top: '-80px', right: '-80px',
        width: '700px', height: '700px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(196,154,63,0.07) 0%, transparent 65%)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{
        position: 'absolute', bottom: '-100px', left: '-100px',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(181,83,42,0.05) 0%, transparent 65%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{
        maxWidth: '1200px', margin: '0 auto', width: '100%',
        display: 'grid', gridTemplateColumns: '55% 45%',
        gap: '60px', alignItems: 'center', position: 'relative', zIndex: 1,
      }}>
        {/* Left */}
        <div>
          <div ref={eyebrowRef} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '28px' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#B5532A', display: 'inline-block', flexShrink: 0 }} />
            <span style={{
              fontFamily: '"DM Mono", monospace', fontSize: '0.68rem',
              color: '#B5532A', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500,
            }}>
              Untuk pemilik usaha kuliner
            </span>
          </div>

          <h1 ref={headlineRef} style={{
            fontFamily: 'Fraunces, Georgia, serif',
            fontSize: 'clamp(2.8rem, 5.2vw, 4.4rem)',
            lineHeight: 1.08, color: '#1B1208', margin: 0, marginBottom: '26px', fontWeight: 400,
          }}>
            <span className="headline-word" style={{ display: 'block' }}>Tahu untung rugi,</span>
            <span className="headline-word" style={{ display: 'block', fontStyle: 'italic', color: '#B5532A' }}>setiap hari.</span>
          </h1>

          <p ref={subtextRef} style={{
            fontFamily: 'Inter, system-ui, sans-serif', fontSize: '1rem',
            lineHeight: 1.72, color: 'rgba(27,18,8,0.62)',
            maxWidth: '460px', marginBottom: '42px',
          }}>
            Catat bahan baku, hitung HPP otomatis, pantau profit dengan presisi.
            Tanpa spreadsheet, tanpa tebak-tebakan.
          </p>

          <div ref={ctasRef} style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <a href="#cta" style={{
              fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.92rem', fontWeight: 600,
              background: '#1B1208', color: '#F4EDE0',
              padding: '14px 30px', borderRadius: '100px', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              boxShadow: '0 4px 20px rgba(27,18,8,0.22)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(27,18,8,0.28)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(27,18,8,0.22)' }}
            >
              Mulai Sekarang →
            </a>
            <a href="#how-it-works" style={{
              fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.92rem',
              color: 'rgba(27,18,8,0.62)', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: '4px',
              borderBottom: '1px solid transparent', paddingBottom: '2px',
              transition: 'color 0.2s ease, border-color 0.2s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.color = '#1B1208'; e.currentTarget.style.borderColor = 'rgba(27,18,8,0.35)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(27,18,8,0.62)'; e.currentTarget.style.borderColor = 'transparent' }}
            >
              Lihat cara kerja →
            </a>
          </div>

          {/* Trust badges */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '20px',
            marginTop: '48px', paddingTop: '32px',
            borderTop: '1px dashed rgba(27,18,8,0.12)',
          }}>
            {['HPP otomatis', 'Profit harian', 'Tanpa spreadsheet'].map(label => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <span style={{ color: '#B5532A', fontSize: '0.58rem' }}>✦</span>
                <span style={{
                  fontFamily: '"DM Mono", monospace', fontSize: '0.66rem',
                  color: 'rgba(27,18,8,0.52)', letterSpacing: '0.02em',
                }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — illustrations + receipt */}
        <div ref={illusRef} style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          position: 'relative', minHeight: '560px',
        }}>
          {/* Receipt */}
          <div className="illus-item" style={{ position: 'relative', zIndex: 3 }}>
            <ReceiptCard />
          </div>

          {/* Garlic top-left */}
          <div className="illus-item" style={{
            position: 'absolute', top: '15px', left: '-15px',
            color: '#B5532A', zIndex: 2, opacity: 0.88, ...floatStyle('0s', '4.5s'),
          }}>
            <GarlicIllustration style={{ width: 78, height: 90 }} />
          </div>

          {/* Onion bottom-left */}
          <div className="illus-item" style={{
            position: 'absolute', bottom: '30px', left: '5px',
            color: '#C49A3F', zIndex: 2, opacity: 0.80,
            transform: 'rotate(-12deg)', ...floatStyle('1.2s', '5s'),
          }}>
            <OnionIllustration style={{ width: 68, height: 76 }} />
          </div>

          {/* Chili right side */}
          <div className="illus-item" style={{
            position: 'absolute', top: '44%', right: '-20px',
            color: '#B5532A', zIndex: 2, opacity: 0.82,
            transform: 'rotate(18deg) translateY(-50%)', ...floatStyle('0.6s', '3.8s'),
          }}>
            <ChiliIllustration style={{ width: 42, height: 82 }} />
          </div>

          {/* Star anise top-right */}
          <div className="illus-item" style={{
            position: 'absolute', top: '25px', right: '18px',
            color: '#5A6B3B', zIndex: 2, opacity: 0.75,
            transform: 'rotate(22deg)', ...floatStyle('2s', '4.2s'),
          }}>
            <StarAniseIllustration style={{ width: 54, height: 54 }} />
          </div>

          {/* Bay leaf bottom-right */}
          <div className="illus-item" style={{
            position: 'absolute', bottom: '55px', right: '-5px',
            color: '#5A6B3B', zIndex: 2, opacity: 0.68,
            transform: 'rotate(10deg)', ...floatStyle('1.5s', '5.5s'),
          }}>
            <BayLeafIllustration style={{ width: 30, height: 62 }} />
          </div>

          {/* Cinnamon upper-right */}
          <div className="illus-item" style={{
            position: 'absolute', top: '130px', right: '-28px',
            color: '#C49A3F', zIndex: 2, opacity: 0.70,
            transform: 'rotate(-8deg)', ...floatStyle('0.8s', '4.8s'),
          }}>
            <CinnamonIllustration style={{ width: 65, height: 42 }} />
          </div>

          {/* Peppercorns subtle bottom */}
          <div className="illus-item" style={{
            position: 'absolute', bottom: '10px', left: '50%',
            color: '#1B1208', zIndex: 1, opacity: 0.18,
            transform: 'translateX(-50%) rotate(5deg)',
          }}>
            <PeppercornScatterIllustration style={{ width: 54, height: 38 }} />
          </div>

          {/* Sparkles */}
          <SparkleIllustration size={10} style={{ position: 'absolute', top: '80px', left: '28px', color: '#C49A3F', opacity: 0.6 }} />
          <SparkleIllustration size={8} style={{ position: 'absolute', bottom: '120px', right: '48px', color: '#B5532A', opacity: 0.5 }} />
          <SparkleIllustration size={6} style={{ position: 'absolute', top: '210px', left: '18px', color: '#5A6B3B', opacity: 0.45 }} />
        </div>
      </div>
    </section>
  )
}
