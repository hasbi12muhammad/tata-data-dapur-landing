import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SpiceImg from './SpiceImg'
import { SparkleIllustration } from './illustrations/index'

const A = '/assets/components/'

export default function Magazine() {
  const sectionRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const statsRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        x: -60, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
      gsap.from(rightRef.current, {
        x: 40, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.2,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
      if (statsRef.current) {
        gsap.from(statsRef.current.querySelectorAll('.stat-number'), {
          opacity: 0, y: 20, duration: 0.6, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: statsRef.current, start: 'top 85%' },
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const noiseUrl = "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")"

  return (
    <section
      ref={sectionRef}
      className="magazine-section"
      style={{ paddingTop: '96px', paddingBottom: '96px', paddingLeft: '48px', paddingRight: '48px' }}
    >
      <div className="magazine-grid" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '5fr 7fr', gap: '60px', alignItems: 'center' }}>

        {/* Left: Terracotta card */}
        <div ref={leftRef}>
          <div style={{
            background: '#B5532A', aspectRatio: '4/5', borderRadius: '20px',
            position: 'relative', overflow: 'hidden',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '28px',
          }}>
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, opacity: 0.05, backgroundImage: noiseUrl, backgroundRepeat: 'repeat', backgroundSize: '200px 200px' }} />

            {/* Illustrations inside terracotta card */}
            <div style={{ position: 'absolute', bottom: '60px', right: '-10px', zIndex: 1, transform: 'rotate(-15deg)' }}>
              <SpiceImg src={`${A}14.webp`} bg="terracotta" width={108} height={150} />
            </div>
            <div style={{ position: 'absolute', top: '80px', right: '8px', zIndex: 1, transform: 'rotate(8deg)' }}>
              <SpiceImg src={`${A}9.webp`} bg="terracotta" width={98} height={69} />
            </div>
            <div style={{ position: 'absolute', bottom: '10px', left: '8px', zIndex: 1, transform: 'rotate(-4deg)' }}>
              <SpiceImg src={`${A}11.webp`} bg="terracotta" width={135} height={87} />
            </div>

            <div style={{ position: 'absolute', top: '80px', left: '28px', fontFamily: 'Fraunces, Georgia, serif', fontSize: '8rem', color: 'rgba(251,246,236,0.08)', lineHeight: 1, userSelect: 'none', zIndex: 1 }}>"</div>

            <div style={{ position: 'relative', zIndex: 2 }}>
              <span style={{ display: 'inline-block', background: 'rgba(251,246,236,0.15)', color: '#FBF6EC', fontFamily: '"DM Mono", monospace', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '6px 12px', borderRadius: '100px', border: '1px solid rgba(251,246,236,0.25)' }}>
                Studi Kasus
              </span>
            </div>

            <div style={{ position: 'relative', zIndex: 2 }}>
              <blockquote style={{ fontFamily: 'Fraunces, Georgia, serif', fontStyle: 'italic', fontSize: '1.12rem', color: '#FBF6EC', lineHeight: 1.55, margin: 0, marginBottom: '16px' }}>
                "Akhirnya saya tahu menu mana yang sebenarnya bikin untung, dan mana yang ternyata cuma capek di dapur."
              </blockquote>
              <cite style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.62rem', color: 'rgba(251,246,236,0.62)', letterSpacing: '0.06em', fontStyle: 'normal' }}>
                — Bu Sari, Warung Sari Rasa
              </cite>
            </div>
          </div>
        </div>

        {/* Right: Editorial */}
        <div ref={rightRef}>
          <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.65rem', color: '#B5532A', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '20px' }}>
            Kenapa penting
          </div>
          <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(2.2rem, 3.5vw, 3.2rem)', color: '#1B1208', fontWeight: 400, marginBottom: '28px', lineHeight: 1.1 }}>
            Dari intuisi, ke <em>data.</em>
          </h2>
          <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.95rem', color: 'rgba(27,18,8,0.68)', lineHeight: 1.78, overflow: 'hidden' }}>
            <span style={{ fontFamily: 'Fraunces, Georgia, serif', fontStyle: 'italic', fontSize: '4.5rem', color: '#B5532A', float: 'left', lineHeight: 0.85, marginRight: '0.08em', marginBottom: '-0.1em', paddingTop: '0.05em' }}>K</span>
            ami bangun Tata Data Dapur karena banyak pemilik warung yang hebat dalam memasak, tapi kesulitan melihat angka bisnis mereka dengan jelas. Dengan data yang tepat, setiap keputusan jadi lebih percaya diri.
          </p>

          {/* Divider with tomato accent */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '24px', marginBottom: '8px' }}>
            <SpiceImg src={`${A}15.webp`} bg="cream" width={57} height={54} />
            <div style={{ flex: 1, height: '1px', background: 'rgba(27,18,8,0.12)' }} />
            <SparkleIllustration size={8} style={{ color: '#C49A3F', opacity: 0.5 }} />
          </div>

          {/* Stats */}
          <div style={{ paddingTop: '28px' }}>
            <div ref={statsRef} style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
              {[
                { number: '100', suffix: '%', label: 'Akurasi HPP' },
                { number: '3', suffix: '×', label: 'Lebih cepat' },
                { number: '0', suffix: '', label: 'Spreadsheet' },
              ].map(stat => (
                <div key={stat.label} style={{ flex: 1 }}>
                  <div className="stat-number" style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '2.8rem', color: '#1B1208', fontWeight: 400, lineHeight: 1, marginBottom: '6px' }}>
                    {stat.number}<em style={{ color: '#B5532A' }}>{stat.suffix}</em>
                  </div>
                  <div style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.82rem', color: 'rgba(27,18,8,0.52)' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
