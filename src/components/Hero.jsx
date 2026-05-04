import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import ReceiptCard from './ReceiptCard'
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
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Target all .illus-item in the whole section (left + right side)
      gsap.set(sectionRef.current.querySelectorAll('.illus-item'), { opacity: 0 })

      const tl = gsap.timeline({ delay: 0.2 })
      tl.from(eyebrowRef.current, { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' })
        .from(headlineRef.current.querySelectorAll('.headline-word'), {
          y: 40, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out',
        }, '-=0.3')
        .from(subtextRef.current, { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
        .from(ctasRef.current, { y: 20, opacity: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3')
        .to(sectionRef.current.querySelectorAll('.illus-item'), {
          opacity: 1, duration: 0.9, stagger: 0.08, ease: 'power2.out',
        }, '-=0.5')
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero-section"
      ref={sectionRef}
      className="hero-section"
      style={{
        minHeight: '100vh', paddingTop: '130px', paddingBottom: '80px',
        paddingLeft: '48px', paddingRight: '48px',
        display: 'flex', alignItems: 'center',
        position: 'relative', overflow: 'hidden', background: '#F4EDE0',
      }}
    >
      {/* Ambient glows */}
      <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '700px', height: '700px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(196,154,63,0.07) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '-100px', left: '-100px', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(181,83,42,0.05) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />

      {/* ── LEFT-SIDE illustrations — section-level absolute, behind grid (zIndex 0) ── */}

      {/* Garlic — top far left */}
      <div className="illus-item hero-left-illus" style={{ position: 'absolute', top: '90px', left: '10px', zIndex: 0 }}>
        <div style={floatStyle(-10, '4.5s', '0s')}>
          <SpiceImg src={`${A}1.png`} bg="cream" width={165} height={165} />
        </div>
      </div>

      {/* Onions — bottom left */}
      <div className="illus-item hero-left-illus" style={{ position: 'absolute', bottom: '60px', left: '20px', zIndex: 0 }}>
        <div style={floatStyle(-8, '5s', '1.2s')}>
          <SpiceImg src={`${A}2.png`} bg="cream" width={145} height={130} />
        </div>
      </div>

      {/* Cinnamon — mid-left, vertically centered */}
      <div className="illus-item hero-left-illus" style={{ position: 'absolute', top: '42%', left: '5px', zIndex: 0, transform: 'translateY(-50%)' }}>
        <div style={floatStyle(6, '4.8s', '0.8s')}>
          <SpiceImg src={`${A}8.png`} bg="cream" width={125} height={82} />
        </div>
      </div>

      {/* ── GRID content ── */}
      <div style={{
        maxWidth: '1200px', margin: '0 auto', width: '100%',
        display: 'grid', gridTemplateColumns: '55% 45%',
        gap: '60px', alignItems: 'center', position: 'relative', zIndex: 1,
      }}
      className="hero-grid">
        {/* Left — text */}
        <div>
          <div ref={eyebrowRef} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '28px' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#B5532A', display: 'inline-block', flexShrink: 0 }} />
            <span style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.68rem', color: '#B5532A', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500 }}>
              Untuk pemilik usaha kuliner
            </span>
          </div>

          <h1 ref={headlineRef} style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(2.8rem, 5.2vw, 4.4rem)', lineHeight: 1.08, color: '#1B1208', margin: 0, marginBottom: '26px', fontWeight: 400 }}>
            <span className="headline-word" style={{ display: 'block' }}>Tahu untung rugi,</span>
            <span className="headline-word" style={{ display: 'block', fontStyle: 'italic', color: '#B5532A' }}>setiap hari.</span>
          </h1>

          <p ref={subtextRef} style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '1rem', lineHeight: 1.72, color: 'rgba(27,18,8,0.62)', maxWidth: '460px', marginBottom: '42px' }}>
            Catat bahan baku, hitung HPP otomatis, pantau profit dengan presisi. Tanpa spreadsheet, tanpa tebak-tebakan.
          </p>

          <div ref={ctasRef} style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <a href="#cta"
              style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.92rem', fontWeight: 600, background: '#1B1208', color: '#F4EDE0', padding: '14px 30px', borderRadius: '100px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 20px rgba(27,18,8,0.22)', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(27,18,8,0.28)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(27,18,8,0.22)' }}
            >Mulai Sekarang →</a>
            <a href="#cara-kerja"
              style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.92rem', color: 'rgba(27,18,8,0.62)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', borderBottom: '1px solid transparent', paddingBottom: '2px', transition: 'color 0.2s ease, border-color 0.2s ease' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#1B1208'; e.currentTarget.style.borderColor = 'rgba(27,18,8,0.35)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(27,18,8,0.62)'; e.currentTarget.style.borderColor = 'transparent' }}
            >Lihat cara kerja →</a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '48px', paddingTop: '32px', borderTop: '1px dashed rgba(27,18,8,0.12)' }}>
            {['HPP otomatis', 'Profit harian', 'Tanpa spreadsheet'].map(label => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <span style={{ color: '#B5532A', fontSize: '0.58rem' }}>✦</span>
                <span style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.66rem', color: 'rgba(27,18,8,0.52)', letterSpacing: '0.02em' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — receipt + right-side illustrations */}
        <div className="hero-right-col" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', minHeight: '580px' }}>

          {/* Receipt card */}
          <div style={{ position: 'relative', zIndex: 3 }}>
            <ReceiptCard />
          </div>

          {/* ── GAP FILLERS — positioned left of right column, filling the gap ── */}

          {/* Tomato — upper gap */}
          <div className="illus-item hero-gap-filler" style={{ position: 'absolute', top: '18%', left: '-105px', zIndex: 2 }}>
            <div style={floatStyle(-8, '4.3s', '0.4s')}>
              <SpiceImg src={`${A}15.png`} bg="cream" width={88} height={84} />
            </div>
          </div>

          {/* Parsley — mid gap */}
          <div className="illus-item hero-gap-filler" style={{ position: 'absolute', top: '50%', left: '-115px', zIndex: 2, transform: 'translateY(-50%)' }}>
            <div style={floatStyle(6, '5.2s', '1.8s')}>
              <SpiceImg src={`${A}4.png`} bg="cream" width={78} height={78} />
            </div>
          </div>

          {/* Cloves — lower gap */}
          <div className="illus-item hero-gap-filler" style={{ position: 'absolute', bottom: '22%', left: '-100px', zIndex: 2 }}>
            <div style={floatStyle(-12, '4.6s', '0.9s')}>
              <SpiceImg src={`${A}9.png`} bg="cream" width={92} height={65} />
            </div>
          </div>

          {/* Chili — right edge center */}
          <div className="illus-item hero-right-illus" style={{ position: 'absolute', top: '35%', right: '-50px', zIndex: 2, transform: 'translateY(-50%)' }}>
            <div style={floatStyle(15, '3.8s', '0.6s')}>
              <SpiceImg src={`${A}3.png`} bg="cream" width={145} height={115} />
            </div>
          </div>

          {/* Star anise — top right */}
          <div className="illus-item hero-right-illus" style={{ position: 'absolute', top: '10px', right: '-30px', zIndex: 2 }}>
            <div style={floatStyle(18, '4.2s', '2s')}>
              <SpiceImg src={`${A}7.png`} bg="cream" width={108} height={108} />
            </div>
          </div>

          {/* Bay leaf — bottom right */}
          <div className="illus-item hero-right-illus" style={{ position: 'absolute', bottom: '30px', right: '-45px', zIndex: 2 }}>
            <div style={floatStyle(-12, '5.5s', '1.5s')}>
              <SpiceImg src={`${A}6.png`} bg="cream" width={120} height={105} />
            </div>
          </div>

          {/* Peppercorns — bottom center, very subtle */}
          <div className="illus-item hero-right-illus" style={{ position: 'absolute', bottom: '0px', left: '50%', zIndex: 1, transform: 'translateX(-50%)' }}>
            <div>
              <SpiceImg src={`${A}10.png`} bg="cream" width={100} height={66} opacity={0.28} />
            </div>
          </div>

          {/* Sparkles */}
          <SparkleIllustration size={10} style={{ position: 'absolute', top: '80px', left: '10px', color: '#C49A3F', opacity: 0.5 }} />
          <SparkleIllustration size={7} style={{ position: 'absolute', bottom: '120px', right: '40px', color: '#B5532A', opacity: 0.4 }} />
        </div>
      </div>
    </section>
  )
}
