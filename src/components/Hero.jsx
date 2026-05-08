import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import AppSlider from './AppSlider'
import SpiceImg from './SpiceImg'
import { SparkleIllustration } from './illustrations/index'

const A = '/assets/components/'

const floatStyle = (r = 0, d = '4s', delay = '0s') => ({
  transform: `rotate(${r}deg)`,
  animation: `float ${d} ease-in-out infinite ${delay}`,
  '--rotate': `${r}deg`,
})

export default function Hero() {
  const eyebrowRef = useRef(null)
  const headlineRef = useRef(null)
  const subtextRef = useRef(null)
  const ctasRef = useRef(null)
  const proofRef = useRef(null)
  const sliderRef = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(sectionRef.current.querySelectorAll('.illus-item'), { opacity: 0 })

      const tl = gsap.timeline({ delay: 0.2 })
      tl.from(eyebrowRef.current, { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' })
        .from(headlineRef.current.querySelectorAll('.headline-word'), {
          y: 40, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out',
        }, '-=0.3')
        .from(subtextRef.current, { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
        .from(ctasRef.current, { y: 20, opacity: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3')
        .from(proofRef.current, { y: 15, opacity: 0, duration: 0.4, ease: 'power3.out' }, '-=0.3')
        .from(sliderRef.current, { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.2')
        .to(sectionRef.current.querySelectorAll('.illus-item'), {
          opacity: 1, duration: 0.9, stagger: 0.08, ease: 'power2.out',
        }, '-=0.6')
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{
        paddingTop: '140px',
        paddingBottom: '80px',
        paddingLeft: '48px',
        paddingRight: '48px',
        position: 'relative',
        overflow: 'hidden',
        background: '#F4EDE0',
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '-100px', right: '-200px',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(196,154,63,0.08) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{
        position: 'absolute', bottom: '-80px', left: '-80px',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(181,83,42,0.05) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* LEFT-SIDE floating illustrations */}
      <div className="illus-item" style={{ position: 'absolute', top: '90px', left: '10px', zIndex: 0 }}>
        <div style={floatStyle(-10, '4.5s', '0s')}>
          <SpiceImg src={`${A}1.png`} bg="cream" width={165} height={165} />
        </div>
      </div>
      <div className="illus-item" style={{ position: 'absolute', bottom: '60px', left: '20px', zIndex: 0 }}>
        <div style={floatStyle(-8, '5s', '1.2s')}>
          <SpiceImg src={`${A}2.png`} bg="cream" width={145} height={130} />
        </div>
      </div>
      <div className="illus-item" style={{ position: 'absolute', top: '42%', left: '5px', zIndex: 0, transform: 'translateY(-50%)' }}>
        <div style={floatStyle(6, '4.8s', '0.8s')}>
          <SpiceImg src={`${A}8.png`} bg="cream" width={125} height={82} />
        </div>
      </div>

      {/* RIGHT-SIDE floating illustrations */}
      <div className="illus-item" style={{ position: 'absolute', top: '100px', right: '12px', zIndex: 0 }}>
        <div style={floatStyle(15, '4.2s', '0.5s')}>
          <SpiceImg src={`${A}3.png`} bg="cream" width={130} height={105} />
        </div>
      </div>
      <div className="illus-item" style={{ position: 'absolute', top: '38%', right: '8px', zIndex: 0 }}>
        <div style={floatStyle(18, '5.2s', '1.8s')}>
          <SpiceImg src={`${A}7.png`} bg="cream" width={100} height={100} />
        </div>
      </div>
      <div className="illus-item" style={{ position: 'absolute', bottom: '80px', right: '15px', zIndex: 0 }}>
        <div style={floatStyle(-12, '5.5s', '1.5s')}>
          <SpiceImg src={`${A}6.png`} bg="cream" width={115} height={100} />
        </div>
      </div>

      {/* HERO TEXT — centered column */}
      <div style={{
        maxWidth: '680px', margin: '0 auto', width: '100%',
        textAlign: 'center', position: 'relative', zIndex: 1,
      }}>
        {/* Eyebrow */}
        <div
          ref={eyebrowRef}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: '#B5532A',
            borderRadius: '99px', padding: '6px 14px',
            fontSize: '12px', fontWeight: 700, color: '#fff',
            marginBottom: '28px',
          }}
        >
          <span style={{
            width: '7px', height: '7px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.7)', display: 'inline-block', flexShrink: 0,
            animation: 'pulse-dot 2s infinite',
          }} />
          Cocok untuk kuliner & produksi ringan
        </div>

        <h1
          ref={headlineRef}
          style={{
            fontFamily: 'Fraunces, serif',
            fontSize: 'clamp(36px, 5.2vw, 58px)',
            lineHeight: 1.12,
            letterSpacing: '-1.5px',
            color: '#1B1208',
            margin: 0, marginBottom: '24px',
            fontWeight: 700,
          }}
        >
          <span className="headline-word" style={{ display: 'block' }}>Jualan tiap hari,</span>
          <span className="headline-word" style={{ display: 'block' }}>tapi masih bingung</span>
          <span className="headline-word" style={{ display: 'block', fontStyle: 'italic', color: '#B5532A' }}>uang dan stok ke mana?</span>
        </h1>

        <p
          ref={subtextRef}
          style={{
            fontSize: '17px', color: '#5A3D25',
            lineHeight: 1.7, marginBottom: '40px', maxWidth: '520px', margin: '0 auto 40px',
          }}
        >
          Tata Data Dapur bantu kamu lihat kondisi bisnis dengan jelas —
          stok, transaksi, HPP, dan laporan keuangan.{' '}
          <strong style={{ color: '#1B1208', fontWeight: 700 }}>
            Tanpa ribet. Tanpa biaya bulanan.
          </strong>
        </p>

        <div
          ref={ctasRef}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'center', marginBottom: '32px' }}
        >
          <a
            href="https://onetap.id/tata-data/tatadata-dapurmu"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#B5532A', color: '#fff', border: 'none',
              padding: '16px 32px', borderRadius: '99px',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontSize: '15px', fontWeight: 800,
              textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px',
              boxShadow: '0 4px 24px rgba(181,83,42,0.32)',
              animation: 'pulse-btn 3s infinite',
              transition: 'background 0.2s, transform 0.1s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#8B3D1A'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#B5532A'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Mulai Rapikan Bisnis Saya
          </a>
          <a
            href="#how"
            style={{
              background: 'transparent', color: '#5A3D25',
              border: '1.5px solid rgba(181,83,42,0.3)', padding: '15px 28px',
              borderRadius: '99px',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontSize: '15px', fontWeight: 600,
              textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#B5532A'; e.currentTarget.style.color = '#B5532A' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(181,83,42,0.3)'; e.currentTarget.style.color = '#5A3D25' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Lihat Cara Kerjanya
          </a>
        </div>

        {/* Proof row */}
        <div
          ref={proofRef}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: '#8B7060', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#B5532A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            Bayar sekali
          </span>
          <span style={{ width: '4px', height: '4px', background: 'rgba(181,83,42,0.3)', borderRadius: '50%' }} />
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#B5532A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            Setup 15 menit
          </span>
          <span style={{ width: '4px', height: '4px', background: 'rgba(181,83,42,0.3)', borderRadius: '50%' }} />
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#B5532A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            Cocok untuk kuliner & produksi ringan
          </span>
        </div>
      </div>

      {/* App Screenshot Slider */}
      <div ref={sliderRef} className="app-slider-wrap" style={{ maxWidth: '1400px', width: '100%', margin: '64px auto 0', position: 'relative', zIndex: 1 }}>
        {/* Small sparkles around slider */}
        <SparkleIllustration size={9} style={{ position: 'absolute', top: '-20px', left: '5%', color: '#C49A3F', opacity: 0.5, zIndex: 2 }} />
        <SparkleIllustration size={7} style={{ position: 'absolute', bottom: '-16px', right: '8%', color: '#B5532A', opacity: 0.4, zIndex: 2 }} />
        <AppSlider />
      </div>
    </section>
  )
}
