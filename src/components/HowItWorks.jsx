import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SpiceImg from './SpiceImg'
import { SparkleIllustration } from './illustrations/index'

const A = '/assets/components/'

const steps = [
  { langkah: 'satu', num: '01', title: 'Catat & Input', desc: 'Masukkan bahan baku, resep, dan harga jual dengan mudah.' },
  { langkah: 'dua', num: '02', title: 'Proses Otomatis', desc: 'Sistem menghitung HPP dan profit otomatis real-time.' },
  { langkah: 'tiga', num: '03', title: 'Ambil Keputusan', desc: 'Data yang tepat untuk keputusan yang lebih menguntungkan.' },
]

const StepArrow = () => (
  <svg width="48" height="20" viewBox="0 0 48 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* Slightly curved organic shaft */}
    <path
      d="M2 10 C14 8.5 28 11.5 38 10"
      stroke="#C49A3F"
      strokeWidth="1.1"
      strokeLinecap="round"
      opacity="0.6"
    />
    {/* Open arrowhead */}
    <path
      d="M33 5.5 L40 10 L33 14.5"
      stroke="#C49A3F"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      opacity="0.6"
    />
    {/* Small tail flourish */}
    <circle cx="3" cy="10" r="1.5" fill="#C49A3F" opacity="0.35" />
  </svg>
)

const StepIcons = [
  // Notebook / input
  <svg key="1" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C49A3F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
  </svg>,
  // Bar chart
  <svg key="2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C49A3F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/>
    <line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/>
    <line x1="2" y1="20" x2="22" y2="20"/>
  </svg>,
  // Target / bullseye
  <svg key="3" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C49A3F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>,
]

export default function HowItWorks() {
  const sectionRef = useRef(null)
  const stepsRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current.querySelector('h2'), {
        y: 30, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
      if (stepsRef.current) {
        gsap.from(stepsRef.current.querySelectorAll('.step-item'), {
          y: 50, opacity: 0, duration: 0.7, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: stepsRef.current, start: 'top 80%' },
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const noiseUrl = "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")"

  return (
    <section
      id="cara-kerja"
      ref={sectionRef}
      className="hiw-section"
      style={{ background: '#1B1208', paddingTop: '64px', paddingBottom: '64px', paddingLeft: '48px', paddingRight: '48px', position: 'relative', overflow: 'hidden' }}
    >
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, opacity: 0.04, backgroundImage: noiseUrl, backgroundRepeat: 'repeat', backgroundSize: '200px 200px' }} />

      {/* Corner PNG illustrations — 1.5× original, spread to 4 corners */}
      <div className="hiw-corner-illus" style={{ position: 'absolute', bottom: '10px', left: '10px', zIndex: 1 }}>
        <div style={{ transform: 'rotate(-5deg)' }}>
          <SpiceImg src={`${A}7.png`} bg="dark" width={132} height={132} />
        </div>
      </div>
      <div className="hiw-corner-illus" style={{ position: 'absolute', top: '16px', right: '20px', zIndex: 1 }}>
        <div style={{ transform: 'rotate(12deg)' }}>
          <SpiceImg src={`${A}8.png`} bg="dark" width={143} height={93} />
        </div>
      </div>
      <div className="hiw-corner-illus" style={{ position: 'absolute', bottom: '10px', right: '20px', zIndex: 1 }}>
        <div style={{ transform: 'rotate(-8deg)' }}>
          <SpiceImg src={`${A}1.png`} bg="dark" width={117} height={117} />
        </div>
      </div>
      <div className="hiw-corner-illus" style={{ position: 'absolute', top: '16px', left: '10px', zIndex: 1 }}>
        <div style={{ transform: 'rotate(5deg)' }}>
          <SpiceImg src={`${A}12.png`} bg="dark" width={123} height={75} />
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Title — centered */}
        <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(2.7rem, 5.25vw, 4.2rem)', color: '#FBF6EC', fontWeight: 400, textAlign: 'center', marginBottom: '48px' }}>
          Tiga langkah <em>sederhana.</em>
        </h2>

        {/* Steps — borderless, directly on dark bg */}
        <div ref={stepsRef} className="hiw-steps" style={{ display: 'flex', alignItems: 'flex-start', gap: '0', maxWidth: '900px', margin: '0 auto' }}>
          {steps.map((step, i) => (
            <React.Fragment key={step.num}>
              <div className="step-item" style={{ flex: 1, padding: '0 28px' }}>
                {/* Icon circle */}
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', border: '1px solid rgba(196,154,63,0.4)', background: 'rgba(196,154,63,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  {StepIcons[i]}
                </div>
                <div style={{ fontFamily: '"DM Mono", monospace', fontStyle: 'italic', fontSize: '0.93rem', color: 'rgba(196,154,63,0.6)', letterSpacing: '0.03em', marginBottom: '8px' }}>
                  — Langkah {step.langkah}
                </div>
                <h3 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.875rem', color: '#FBF6EC', fontWeight: 400, marginBottom: '10px', lineHeight: 1.2 }}>{step.title}</h3>
                <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '1.23rem', color: 'rgba(251,246,236,0.45)', lineHeight: 1.65, margin: 0 }}>{step.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hiw-arrow" style={{ flexShrink: 0, paddingTop: '12px', userSelect: 'none' }}>
                  <StepArrow />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div style={{ marginTop: '52px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
          <SparkleIllustration size={8} style={{ color: 'rgba(196,154,63,0.5)' }} />
          <a href="#cta" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.9rem', fontWeight: 500, background: '#F4EDE0', color: '#1B1208', padding: '14px 32px', borderRadius: '100px', textDecoration: 'none', boxShadow: '0 4px 20px rgba(244,237,224,0.1)', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(244,237,224,0.2)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(244,237,224,0.1)' }}
          >
            Mulai Gratis 14 Hari →
          </a>
          <SparkleIllustration size={8} style={{ color: 'rgba(196,154,63,0.5)' }} />
        </div>
      </div>
    </section>
  )
}
