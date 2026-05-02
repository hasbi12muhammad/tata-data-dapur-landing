import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

const features = [
  {
    num: '01',
    title: 'HPP Otomatis',
    desc: 'Hitung harga pokok produksi setiap resep secara otomatis. Tidak perlu kalkulator.',
    dark: false,
  },
  {
    num: '02',
    title: 'Laporan Profit Harian',
    desc: 'Lihat performa bisnis kamu setiap hari, real-time.',
    dark: true,
    chart: true,
    span: 8,
  },
  {
    num: '03',
    title: 'Kelola Bahan Baku',
    desc: 'Pantau stok bahan baku, harga beli, dan konsumsi harian.',
    dark: false,
  },
  {
    num: '04',
    title: 'Manajemen Resep',
    desc: 'Simpan resep lengkap dengan komposisi bahan dan kalkulasi HPP.',
    dark: false,
  },
  {
    num: '05',
    title: 'Akses Dimanapun',
    desc: 'Tersedia di browser dan mobile. Kerja dari mana saja.',
    dark: false,
  },
  {
    num: '06',
    title: 'Data Aman',
    desc: 'Backup otomatis. Data kamu tidak akan hilang.',
    dark: false,
  },
]

const chartBars = [40, 60, 45, 80, 55, 90, 70]

function BarChart() {
  const barsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(barsRef.current, {
        scaleY: 0,
        transformOrigin: 'bottom',
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: barsRef.current[0],
          start: 'top 80%',
        },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-end',
      gap: '8px',
      height: '80px',
      marginTop: '24px',
    }}>
      {chartBars.map((h, i) => (
        <div
          key={i}
          ref={(el) => (barsRef.current[i] = el)}
          style={{
            flex: 1,
            height: `${h}%`,
            background: '#C49A3F',
            borderRadius: '4px 4px 0 0',
            opacity: 0.7 + (i * 0.04),
          }}
        />
      ))}
    </div>
  )
}

export default function Features() {
  const sectionRef = useRef(null)
  const row1Ref = useRef(null)
  const row2Ref = useRef(null)
  const row3Ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const animRow = (ref) => {
        if (!ref.current) return
        gsap.from(ref.current.children, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 80%',
          },
        })
      }
      animRow(row1Ref)
      animRow(row2Ref)
      animRow(row3Ref)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const cardBase = {
    background: '#FBF6EC',
    border: '1px solid rgba(181,83,42,0.1)',
    borderRadius: '16px',
    padding: '32px',
    boxShadow: '0 4px 24px rgba(27,18,8,0.08)',
    position: 'relative',
    overflow: 'hidden',
  }

  const cardDark = {
    ...cardBase,
    background: '#1B1208',
    border: '1px solid rgba(196,154,63,0.15)',
  }

  return (
    <section
      id="fitur"
      ref={sectionRef}
      style={{
        paddingTop: '96px',
        paddingBottom: '96px',
        paddingLeft: '48px',
        paddingRight: '48px',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section title */}
        <h2 style={{
          fontFamily: 'Fraunces, Georgia, serif',
          fontSize: 'clamp(2rem, 4vw, 3.2rem)',
          color: '#1B1208',
          marginBottom: '56px',
          fontWeight: 400,
          maxWidth: '600px',
        }}>
          Semua yang dapur butuhkan,{' '}
          <em>sudah ada.</em>
        </h2>

        {/* Row 1: Card 01 + Card 02 */}
        <div
          ref={row1Ref}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '20px',
            marginBottom: '20px',
          }}
        >
          {/* Card 01 */}
          <div style={{ ...cardBase, gridColumn: 'span 4' }}>
            <div style={{
              fontFamily: 'Fraunces, Georgia, serif',
              fontStyle: 'italic',
              fontSize: '5rem',
              color: '#B5532A',
              opacity: 0.18,
              lineHeight: 1,
              position: 'absolute',
              top: '16px',
              right: '20px',
              userSelect: 'none',
            }}>
              01
            </div>
            <div style={{
              fontFamily: '"DM Mono", monospace',
              fontSize: '0.65rem',
              color: '#B5532A',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}>
              HPP Otomatis
            </div>
            <h3 style={{
              fontFamily: 'Fraunces, Georgia, serif',
              fontSize: '1.5rem',
              color: '#1B1208',
              marginBottom: '12px',
              fontWeight: 400,
            }}>
              Kalkulasi instan untuk setiap resep
            </h3>
            <p style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '0.88rem',
              color: 'rgba(27,18,8,0.62)',
              lineHeight: 1.65,
              margin: 0,
            }}>
              Hitung harga pokok produksi setiap resep secara otomatis. Tidak perlu kalkulator.
            </p>
          </div>

          {/* Card 02 - Dark Featured */}
          <div style={{ ...cardDark, gridColumn: 'span 8' }}>
            <div style={{
              fontFamily: 'Fraunces, Georgia, serif',
              fontStyle: 'italic',
              fontSize: '5rem',
              color: '#C49A3F',
              opacity: 0.28,
              lineHeight: 1,
              position: 'absolute',
              top: '16px',
              right: '24px',
              userSelect: 'none',
            }}>
              02
            </div>
            <div style={{
              fontFamily: '"DM Mono", monospace',
              fontSize: '0.65rem',
              color: '#C49A3F',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}>
              Laporan Profit Harian
            </div>
            <h3 style={{
              fontFamily: 'Fraunces, Georgia, serif',
              fontSize: '1.8rem',
              color: '#FBF6EC',
              marginBottom: '10px',
              fontWeight: 400,
              maxWidth: '420px',
            }}>
              Performa bisnis kamu, setiap hari
            </h3>
            <p style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '0.88rem',
              color: 'rgba(251,246,236,0.6)',
              lineHeight: 1.65,
              margin: 0,
              maxWidth: '360px',
            }}>
              Lihat performa bisnis kamu setiap hari, real-time.
            </p>
            <BarChart />
            {/* Day labels */}
            <div style={{
              display: 'flex',
              gap: '8px',
              marginTop: '8px',
            }}>
              {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map((d) => (
                <div key={d} style={{
                  flex: 1,
                  fontFamily: '"DM Mono", monospace',
                  fontSize: '0.55rem',
                  color: 'rgba(251,246,236,0.3)',
                  textAlign: 'center',
                }}>
                  {d}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2: Card 03 + 04 + 05 */}
        <div
          ref={row2Ref}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '20px',
            marginBottom: '20px',
          }}
        >
          {[
            {
              num: '03',
              title: 'Kelola Bahan Baku',
              desc: 'Pantau stok bahan baku, harga beli, dan konsumsi harian.',
            },
            {
              num: '04',
              title: 'Manajemen Resep',
              desc: 'Simpan resep lengkap dengan komposisi bahan dan kalkulasi HPP.',
            },
            {
              num: '05',
              title: 'Akses Dimanapun',
              desc: 'Tersedia di browser dan mobile. Kerja dari mana saja.',
            },
          ].map((card) => (
            <div key={card.num} style={{ ...cardBase, gridColumn: 'span 4' }}>
              <div style={{
                fontFamily: 'Fraunces, Georgia, serif',
                fontStyle: 'italic',
                fontSize: '5rem',
                color: '#B5532A',
                opacity: 0.18,
                lineHeight: 1,
                position: 'absolute',
                top: '16px',
                right: '20px',
                userSelect: 'none',
              }}>
                {card.num}
              </div>
              <div style={{
                fontFamily: '"DM Mono", monospace',
                fontSize: '0.65rem',
                color: '#B5532A',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}>
                {card.title}
              </div>
              <p style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '0.88rem',
                color: 'rgba(27,18,8,0.62)',
                lineHeight: 1.65,
                margin: 0,
                marginTop: '40px',
              }}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Row 3: Card 06 */}
        <div ref={row3Ref}>
          <div style={{
            ...cardBase,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '40px',
            alignItems: 'center',
          }}>
            <div>
              <div style={{
                fontFamily: '"DM Mono", monospace',
                fontSize: '0.65rem',
                color: '#B5532A',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}>
                Data Aman
              </div>
              <h3 style={{
                fontFamily: 'Fraunces, Georgia, serif',
                fontSize: '1.8rem',
                color: '#1B1208',
                marginBottom: '12px',
                fontWeight: 400,
              }}>
                Backup otomatis, selalu aman
              </h3>
              <p style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '0.9rem',
                color: 'rgba(27,18,8,0.62)',
                lineHeight: 1.65,
                margin: 0,
              }}>
                Backup otomatis setiap hari. Data kamu tidak akan hilang, tersimpan di infrastruktur cloud enterprise yang aman.
              </p>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '20px',
            }}>
              {['256-bit', 'SSL', 'Daily Backup', 'Cloud'].map((badge) => (
                <div key={badge} style={{
                  padding: '10px 16px',
                  border: '1px solid rgba(90,107,59,0.3)',
                  borderRadius: '8px',
                  fontFamily: '"DM Mono", monospace',
                  fontSize: '0.7rem',
                  color: '#5A6B3B',
                  background: 'rgba(90,107,59,0.06)',
                }}>
                  {badge}
                </div>
              ))}
            </div>
            <div style={{
              fontFamily: 'Fraunces, Georgia, serif',
              fontStyle: 'italic',
              fontSize: '5rem',
              color: '#B5532A',
              opacity: 0.18,
              lineHeight: 1,
              position: 'absolute',
              top: '16px',
              right: '20px',
              userSelect: 'none',
            }}>
              06
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
