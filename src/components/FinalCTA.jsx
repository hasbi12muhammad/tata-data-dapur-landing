import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SpiceImg from './SpiceImg'
import { SparkleIllustration } from './illustrations/index'

const A = '/assets/components/'

export default function FinalCTA() {
  const sectionRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current.querySelector('.cta-content'), {
        y: 20, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
      // Opacity-only for illustrations — CSS rotation on inner divs must not be overwritten
      gsap.set(sectionRef.current.querySelectorAll('.cta-illus'), { opacity: 0 })
      gsap.to(sectionRef.current.querySelectorAll('.cta-illus'), {
        opacity: 1, duration: 1, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const noiseUrl = "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")"

  return (
    <section
      id="cta"
      ref={sectionRef}
      style={{ background: '#B5532A', paddingTop: '112px', paddingBottom: '112px', paddingLeft: '48px', paddingRight: '48px', position: 'relative', overflow: 'hidden', textAlign: 'center' }}
    >
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, opacity: 0.05, backgroundImage: noiseUrl, backgroundRepeat: 'repeat', backgroundSize: '200px 200px' }} />

      {/* Sparkle corners */}
      <div style={{ position: 'absolute', top: '36px', left: '56px', color: 'rgba(251,246,236,0.18)', zIndex: 1 }}><SparkleIllustration size={28} /></div>
      <div style={{ position: 'absolute', top: '36px', right: '56px', color: 'rgba(251,246,236,0.18)', zIndex: 1 }}><SparkleIllustration size={22} /></div>
      <div style={{ position: 'absolute', bottom: '36px', left: '80px', color: 'rgba(251,246,236,0.12)', zIndex: 1 }}><SparkleIllustration size={16} /></div>
      <div style={{ position: 'absolute', bottom: '36px', right: '80px', color: 'rgba(251,246,236,0.12)', zIndex: 1 }}><SparkleIllustration size={20} /></div>

      {/* PNG illustrations — 1.5× original, spread 6 corners/edges without overlap */}
      <div className="cta-illus" style={{ position: 'absolute', top: '16px', left: '60px', zIndex: 1 }}>
        <div style={{ transform: 'rotate(-12deg)' }}>
          <SpiceImg src={`${A}1.png`} bg="terracotta" width={135} height={135} />
        </div>
      </div>
      <div className="cta-illus" style={{ position: 'absolute', bottom: '-10px', left: '10px', zIndex: 1 }}>
        <div style={{ transform: 'rotate(8deg)' }}>
          <SpiceImg src={`${A}20.png`} bg="terracotta" width={150} height={132} />
        </div>
      </div>
      <div className="cta-illus" style={{ position: 'absolute', top: '16px', right: '60px', zIndex: 1 }}>
        <div style={{ transform: 'rotate(18deg)' }}>
          <SpiceImg src={`${A}3.png`} bg="terracotta" width={143} height={113} />
        </div>
      </div>
      <div className="cta-illus" style={{ position: 'absolute', bottom: '-10px', right: '10px', zIndex: 1 }}>
        <div style={{ transform: 'rotate(-6deg)' }}>
          <SpiceImg src={`${A}7.png`} bg="terracotta" width={113} height={113} />
        </div>
      </div>
      <div className="cta-illus" style={{ position: 'absolute', top: '50%', left: '10px', zIndex: 1, transform: 'translateY(-50%)' }}>
        <div style={{ transform: 'rotate(4deg)' }}>
          <SpiceImg src={`${A}8.png`} bg="terracotta" width={120} height={78} />
        </div>
      </div>
      <div className="cta-illus" style={{ position: 'absolute', top: '50%', right: '10px', zIndex: 1, transform: 'translateY(-50%)' }}>
        <div style={{ transform: 'rotate(-14deg)' }}>
          <SpiceImg src={`${A}13.png`} bg="terracotta" width={108} height={96} />
        </div>
      </div>
      {/* Content — animated as one block so nothing is staggered-invisible */}
      <div className="cta-content" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'inline-block', background: 'rgba(251,246,236,0.12)', border: '1px solid rgba(251,246,236,0.25)', padding: '6px 16px', borderRadius: '100px', marginBottom: '28px', fontFamily: '"DM Mono", monospace', fontSize: '0.62rem', color: 'rgba(251,246,236,0.8)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Mulai Gratis · 14 Hari
        </div>
        <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: '#FBF6EC', fontWeight: 400, margin: 0, marginBottom: '20px', lineHeight: 1.1 }}>
          Siap tahu untung kamu <em>hari ini?</em>
        </h2>
        <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '1.05rem', color: 'rgba(251,246,236,0.72)', maxWidth: '480px', margin: '0 auto 40px', lineHeight: 1.65 }}>
          Bergabung dengan pemilik usaha kuliner yang sudah berhenti tebak-tebakan.
        </p>
        <a
          href="https://wa.me/6287850755050?text=Halo%2C%20saya%20tertarik%20dengan%20Tata%20Data%20Dapur"
          target="_blank" rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#FBF6EC', color: '#B5532A', fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.98rem', fontWeight: 600, padding: '16px 36px', borderRadius: '100px', textDecoration: 'none', boxShadow: '0 8px 32px rgba(27,18,8,0.2)', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(27,18,8,0.3)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(27,18,8,0.2)' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Hubungi via WhatsApp
        </a>
        <p style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.68rem', color: 'rgba(251,246,236,0.4)', marginTop: '20px', letterSpacing: '0.05em' }}>
          Gratis 14 hari · Tidak perlu kartu kredit
        </p>
      </div>
    </section>
  )
}
