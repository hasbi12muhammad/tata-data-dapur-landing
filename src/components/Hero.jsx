import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import ReceiptCard from './ReceiptCard'
import SpiceImg from './SpiceImg'
import { SparkleIllustration } from './illustrations/index'

const A = '/assets/components/'

// r = rotation degrees, d = duration, delay = animation delay
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
  const illusRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set illustrations invisible first — opacity only, no transform manipulation
      gsap.set(illusRef.current.querySelectorAll('.illus-item'), { opacity: 0 })

      const tl = gsap.timeline({ delay: 0.2 })
      tl.from(eyebrowRef.current, { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' })
        .from(headlineRef.current.querySelectorAll('.headline-word'), {
          y: 40, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out',
        }, '-=0.3')
        .from(subtextRef.current, { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
        .from(ctasRef.current.children, {
          y: 20, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out',
        }, '-=0.3')
        // Opacity-only — never touches CSS transform, so rotation + float CSS stay intact
        .to(illusRef.current.querySelectorAll('.illus-item'), {
          opacity: 1, duration: 0.9, stagger: 0.08, ease: 'power2.out',
        }, '-=0.5')
    }, sectionRef)
    return () => ctx.revert()
  }, [])

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
      <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '700px', height: '700px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(196,154,63,0.07) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '-100px', left: '-100px', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(181,83,42,0.05) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{
        maxWidth: '1200px', margin: '0 auto', width: '100%',
        display: 'grid', gridTemplateColumns: '55% 45%',
        gap: '60px', alignItems: 'center', position: 'relative', zIndex: 1,
      }}>
        {/* Left */}
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

        {/* Right — receipt + PNG illustrations
            .illus-item = GSAP opacity target (no transform written here)
            inner div  = CSS rotation + float animation (--rotate var fed to keyframe) */}
        <div ref={illusRef} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', minHeight: '580px' }}>

          {/* Receipt card */}
          <div className="illus-item" style={{ position: 'relative', zIndex: 3 }}>
            <ReceiptCard />
          </div>

          {/* Garlic — large, top left */}
          <div className="illus-item" style={{ position: 'absolute', top: '0px', left: '-30px', zIndex: 2 }}>
            <div style={floatStyle(-8, '4.5s', '0s')}>
              <SpiceImg src={`${A}1.png`} bg="cream" width={110} height={110} />
            </div>
          </div>

          {/* Onions — medium, bottom left */}
          <div className="illus-item" style={{ position: 'absolute', bottom: '30px', left: '-10px', zIndex: 2 }}>
            <div style={floatStyle(-12, '5s', '1.2s')}>
              <SpiceImg src={`${A}2.png`} bg="cream" width={95} height={85} />
            </div>
          </div>

          {/* Chili — tall, right side center */}
          <div className="illus-item" style={{ position: 'absolute', top: '38%', right: '-35px', zIndex: 2, transform: 'translateY(-50%)' }}>
            <div style={floatStyle(15, '3.8s', '0.6s')}>
              <SpiceImg src={`${A}3.png`} bg="cream" width={95} height={75} />
            </div>
          </div>

          {/* Star anise — top right */}
          <div className="illus-item" style={{ position: 'absolute', top: '15px', right: '5px', zIndex: 2 }}>
            <div style={floatStyle(18, '4.2s', '2s')}>
              <SpiceImg src={`${A}7.png`} bg="cream" width={72} height={72} />
            </div>
          </div>

          {/* Bay leaf branch — bottom right */}
          <div className="illus-item" style={{ position: 'absolute', bottom: '40px', right: '-15px', zIndex: 2 }}>
            <div style={floatStyle(-12, '5.5s', '1.5s')}>
              <SpiceImg src={`${A}6.png`} bg="cream" width={80} height={70} />
            </div>
          </div>

          {/* Cinnamon sticks — upper right area */}
          <div className="illus-item" style={{ position: 'absolute', top: '130px', right: '-28px', zIndex: 2 }}>
            <div style={floatStyle(-5, '4.8s', '0.8s')}>
              <SpiceImg src={`${A}8.png`} bg="cream" width={82} height={54} />
            </div>
          </div>

          {/* Peppercorns — subtle bottom scatter */}
          <div className="illus-item" style={{ position: 'absolute', bottom: '10px', left: '50%', zIndex: 1, transform: 'translateX(-50%)' }}>
            <div>
              <SpiceImg src={`${A}10.png`} bg="cream" width={65} height={44} opacity={0.3} />
            </div>
          </div>

          {/* Sparkle accents */}
          <SparkleIllustration size={10} style={{ position: 'absolute', top: '85px', left: '26px', color: '#C49A3F', opacity: 0.55 }} />
          <SparkleIllustration size={7} style={{ position: 'absolute', bottom: '125px', right: '46px', color: '#B5532A', opacity: 0.45 }} />
          <SparkleIllustration size={6} style={{ position: 'absolute', top: '215px', left: '14px', color: '#5A6B3B', opacity: 0.4 }} />
        </div>
      </div>
    </section>
  )
}
