import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

export default function Magazine() {
  const sectionRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const statsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left block slides in
      gsap.from(leftRef.current, {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })

      // Right column fades in
      gsap.from(rightRef.current, {
        x: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })

      // Stats count up
      if (statsRef.current) {
        gsap.from(statsRef.current.querySelectorAll('.stat-number'), {
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        paddingTop: '96px',
        paddingBottom: '96px',
        paddingLeft: '48px',
        paddingRight: '48px',
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '5fr 7fr',
        gap: '60px',
        alignItems: 'center',
      }}>
        {/* Left: Terracotta Block */}
        <div ref={leftRef}>
          <div style={{
            background: '#B5532A',
            aspectRatio: '4/5',
            borderRadius: '20px',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '28px',
          }}>
            {/* Noise overlay on terracotta */}
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

            {/* Top tag */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              <span style={{
                display: 'inline-block',
                background: 'rgba(251,246,236,0.15)',
                color: '#FBF6EC',
                fontFamily: '"DM Mono", monospace',
                fontSize: '0.62rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '6px 12px',
                borderRadius: '100px',
                border: '1px solid rgba(251,246,236,0.25)',
              }}>
                STUDI KASUS
              </span>
            </div>

            {/* Decorative large quote mark */}
            <div style={{
              position: 'absolute',
              top: '80px',
              left: '28px',
              fontFamily: 'Fraunces, Georgia, serif',
              fontSize: '8rem',
              color: 'rgba(251,246,236,0.1)',
              lineHeight: 1,
              userSelect: 'none',
              zIndex: 1,
            }}>
              "
            </div>

            {/* Pull quote */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              <blockquote style={{
                fontFamily: 'Fraunces, Georgia, serif',
                fontStyle: 'italic',
                fontSize: '1.15rem',
                color: '#FBF6EC',
                lineHeight: 1.55,
                margin: 0,
                marginBottom: '16px',
              }}>
                "Akhirnya saya tahu menu mana yang sebenarnya bikin untung, dan mana yang ternyata cuma capek di dapur."
              </blockquote>
              <cite style={{
                fontFamily: '"DM Mono", monospace',
                fontSize: '0.62rem',
                color: 'rgba(251,246,236,0.65)',
                letterSpacing: '0.06em',
                fontStyle: 'normal',
              }}>
                — BU SARI, WARUNG SARI RASA
              </cite>
            </div>
          </div>
        </div>

        {/* Right: Editorial content */}
        <div ref={rightRef}>
          {/* Eyebrow */}
          <div style={{
            fontFamily: '"DM Mono", monospace',
            fontSize: '0.65rem',
            color: '#B5532A',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '20px',
          }}>
            KENAPA PENTING
          </div>

          {/* Headline */}
          <h2 style={{
            fontFamily: 'Fraunces, Georgia, serif',
            fontSize: 'clamp(2.2rem, 3.5vw, 3.2rem)',
            color: '#1B1208',
            fontWeight: 400,
            marginBottom: '28px',
            lineHeight: 1.1,
          }}>
            Dari intuisi, ke <em>data.</em>
          </h2>

          {/* Drop cap paragraph */}
          <p style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '0.95rem',
            color: 'rgba(27,18,8,0.7)',
            lineHeight: 1.75,
            marginBottom: '0',
            overflow: 'hidden',
          }}>
            <span style={{
              fontFamily: 'Fraunces, Georgia, serif',
              fontStyle: 'italic',
              fontSize: '4.5rem',
              color: '#B5532A',
              float: 'left',
              lineHeight: 0.85,
              marginRight: '0.08em',
              marginBottom: '-0.1em',
              paddingTop: '0.05em',
            }}>
              K
            </span>
            ami bangun Tata Data Dapur karena banyak pemilik warung yang hebat dalam memasak, tapi kesulitan melihat angka bisnis mereka dengan jelas. Dengan data yang tepat, setiap keputusan jadi lebih percaya diri.
          </p>

          {/* Separator */}
          <div style={{
            borderTop: '1px solid rgba(27,18,8,0.15)',
            marginTop: '40px',
            paddingTop: '32px',
          }}>
            {/* Stats */}
            <div
              ref={statsRef}
              style={{
                display: 'flex',
                gap: '40px',
                alignItems: 'flex-start',
              }}
            >
              {[
                { number: '100', suffix: '%', label: 'Akurasi HPP' },
                { number: '3', suffix: '×', label: 'Lebih cepat' },
                { number: '0', suffix: '×', label: 'Spreadsheet' },
              ].map((stat) => (
                <div key={stat.label} style={{ flex: 1 }}>
                  <div
                    className="stat-number"
                    style={{
                      fontFamily: 'Fraunces, Georgia, serif',
                      fontSize: '2.8rem',
                      color: '#1B1208',
                      fontWeight: 400,
                      lineHeight: 1,
                      marginBottom: '6px',
                    }}
                  >
                    {stat.number}
                    <em style={{ color: '#B5532A' }}>{stat.suffix}</em>
                  </div>
                  <div style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '0.82rem',
                    color: 'rgba(27,18,8,0.55)',
                  }}>
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
