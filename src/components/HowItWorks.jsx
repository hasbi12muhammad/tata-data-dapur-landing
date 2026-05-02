import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

const steps = [
  {
    langkah: 'satu',
    num: '01',
    title: 'Catat & Input',
    desc: 'Masukkan bahan baku, resep, dan harga jual sekali saja.',
  },
  {
    langkah: 'dua',
    num: '02',
    title: 'Proses Otomatis',
    desc: 'Sistem menghitung HPP, profit, dan laporan keuangan untuk kamu.',
  },
  {
    langkah: 'tiga',
    num: '03',
    title: 'Ambil Keputusan',
    desc: 'Lihat data real-time dan putuskan langkah bisnis selanjutnya.',
  },
]

export default function HowItWorks() {
  const sectionRef = useRef(null)
  const stepsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current.querySelector('h2'), {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })

      if (stepsRef.current) {
        gsap.from(stepsRef.current.querySelectorAll('.step-item'), {
          y: 50,
          opacity: 0,
          duration: 0.7,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: stepsRef.current,
            start: 'top 80%',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="cara-kerja"
      ref={sectionRef}
      style={{
        background: '#1B1208',
        paddingTop: '96px',
        paddingBottom: '96px',
        paddingLeft: '48px',
        paddingRight: '48px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Noise overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        opacity: 0.04,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '200px 200px',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Title */}
        <h2 style={{
          fontFamily: 'Fraunces, Georgia, serif',
          fontSize: 'clamp(2rem, 4vw, 3.2rem)',
          color: '#FBF6EC',
          fontWeight: 400,
          marginBottom: '72px',
          maxWidth: '500px',
        }}>
          Tiga langkah <em>sederhana.</em>
        </h2>

        {/* Steps */}
        <div
          ref={stepsRef}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '20px',
          }}
        >
          {steps.map((step, i) => (
            <React.Fragment key={step.num}>
              <div
                className="step-item"
                style={{
                  flex: 1,
                  position: 'relative',
                }}
              >
                {/* Step label */}
                <div style={{
                  fontFamily: '"DM Mono", monospace',
                  fontStyle: 'italic',
                  fontSize: '0.75rem',
                  color: 'rgba(196,154,63,0.75)',
                  letterSpacing: '0.04em',
                  marginBottom: '16px',
                }}>
                  — Langkah {step.langkah}
                </div>

                {/* Large number background decoration */}
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '0',
                  fontFamily: 'Fraunces, Georgia, serif',
                  fontStyle: 'italic',
                  fontSize: '6rem',
                  color: 'rgba(251,246,236,0.08)',
                  lineHeight: 1,
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}>
                  {step.num}
                </div>

                {/* Step heading */}
                <h3 style={{
                  fontFamily: 'Fraunces, Georgia, serif',
                  fontSize: '1.6rem',
                  color: '#FBF6EC',
                  fontWeight: 400,
                  marginBottom: '14px',
                }}>
                  {step.title}
                </h3>

                {/* Step body */}
                <p style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '0.88rem',
                  color: 'rgba(251,246,236,0.55)',
                  lineHeight: 1.7,
                  margin: 0,
                  maxWidth: '280px',
                }}>
                  {step.desc}
                </p>
              </div>

              {/* Arrow connector (not after last step) */}
              {i < steps.length - 1 && (
                <div style={{
                  fontFamily: 'Fraunces, Georgia, serif',
                  fontStyle: 'italic',
                  fontSize: '2rem',
                  color: 'rgba(196,154,63,0.5)',
                  marginTop: '60px',
                  flexShrink: 0,
                  userSelect: 'none',
                }}>
                  →
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ marginTop: '72px', display: 'flex', justifyContent: 'center' }}>
          <a
            href="#cta"
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '0.9rem',
              fontWeight: 500,
              background: '#F4EDE0',
              color: '#1B1208',
              padding: '14px 32px',
              borderRadius: '100px',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              boxShadow: '0 4px 20px rgba(244,237,224,0.1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 8px 28px rgba(244,237,224,0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(244,237,224,0.1)'
            }}
          >
            Mulai Gratis 14 Hari →
          </a>
        </div>
      </div>
    </section>
  )
}
