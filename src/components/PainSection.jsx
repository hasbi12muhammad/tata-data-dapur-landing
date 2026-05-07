import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SpiceImg from './SpiceImg'

gsap.registerPlugin(ScrollTrigger)

const A = '/assets/components/'

const floatStyle = (r = 0, d = '4s', delay = '0s') => ({
  transform: `rotate(${r}deg)`,
  animation: `float ${d} ease-in-out infinite ${delay}`,
  '--rotate': `${r}deg`,
})

const pains = [
  {
    icon: '📦',
    title: 'Stok tiba-tiba habis',
    desc: 'padahal merasa belum lama restock. Dan kamu baru sadar pas pembeli sudah pesan.',
  },
  {
    icon: '💸',
    title: 'Uang masuk tiap hari, tapi bingung untungnya berapa.',
    desc: 'Kalau ditanya "bulan ini profit berapa?" — kamu jawab apa?',
  },
  {
    icon: '📒',
    title: 'Masih catat manual di buku atau Excel.',
    desc: 'Kalau buku ketumpahan kopi atau file corrupt, data hilang semua.',
  },
  {
    icon: '🧮',
    title: 'Harga tepung naik, tapi nggak tahu harus naikkan harga jual berapa.',
    desc: 'Akhirnya tebak-tebakan — dan sering rugi tanpa sadar.',
  },
  {
    icon: '😤',
    title: 'Sudah coba aplikasi lain, tapi bayar terus tiap bulan',
    desc: 'padahal fiturnya nggak kepake semua — dan harganya terus naik.',
  },
]

export default function PainSection() {
  const sectionRef = useRef(null)
  const itemRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.from(el, {
          y: 30, opacity: 0, duration: 0.6,
          ease: 'power3.out',
          delay: i * 0.08,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="pain"
      ref={sectionRef}
      style={{ background: '#1A1208', padding: '88px 24px', position: 'relative', overflow: 'hidden' }}
    >
      {/* Botanical decorations */}
      <div style={{ position: 'absolute', top: '60px', right: '20px', opacity: 0.18, pointerEvents: 'none' }}>
        <div style={floatStyle(12, '5s', '0.5s')}>
          <SpiceImg src={`${A}5.png`} bg="dark" width={110} height={110} />
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: '80px', left: '16px', opacity: 0.14, pointerEvents: 'none' }}>
        <div style={floatStyle(-8, '4.5s', '1.2s')}>
          <SpiceImg src={`${A}11.png`} bg="dark" width={90} height={90} />
        </div>
      </div>

      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        {/* Section tag */}
        <span style={{
          display: 'inline-block',
          background: 'rgba(200,67,26,0.15)',
          border: '1px solid rgba(200,67,26,0.3)',
          color: '#F5A25A',
          fontSize: '11px', fontWeight: 800,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          padding: '5px 12px', borderRadius: '99px', marginBottom: '20px',
        }}>
          Kamu pernah ngalamin ini?
        </span>

        <h2 style={{
          fontFamily: 'Fraunces, serif',
          fontSize: 'clamp(28px, 4vw, 42px)',
          fontWeight: 700, color: '#fff',
          letterSpacing: '-0.8px', lineHeight: 1.2,
          marginBottom: '40px',
        }}>
          Bisnis jalan terus,<br />
          tapi rasanya kok <em style={{ color: '#C8431A', fontStyle: 'italic' }}>nggak pernah jelas?</em>
        </h2>

        {/* Pain items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '40px' }}>
          {pains.map((pain, i) => (
            <div
              key={i}
              ref={el => itemRefs.current[i] = el}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: '14px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '12px', padding: '16px 18px',
                transition: 'background 0.2s, border-color 0.2s',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(200,67,26,0.08)'
                e.currentTarget.style.borderColor = 'rgba(200,67,26,0.2)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
              }}
            >
              <div style={{
                fontSize: '20px', width: '36px', height: '36px', minWidth: '36px',
                background: 'rgba(255,255,255,0.06)', borderRadius: '10px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                {pain.icon}
              </div>
              <p style={{ fontSize: '15px', color: '#D4C0AA', lineHeight: 1.5, paddingTop: '7px', margin: 0 }}>
                <strong style={{ color: '#F5E6D0' }}>{pain.title}</strong>{' '}
                {pain.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Closing card */}
        <div
          ref={el => itemRefs.current[pains.length] = el}
          style={{
            background: 'rgba(200,67,26,0.12)',
            border: '1px solid rgba(200,67,26,0.25)',
            borderRadius: '14px', padding: '20px 22px',
            fontSize: '15px', color: '#F5D0BC', lineHeight: 1.6,
          }}
        >
          Kalau iya, kamu nggak sendiri.{' '}
          <strong style={{ color: '#fff', fontWeight: 700 }}>
            Banyak bisnis kuliner jalan tiap hari — tapi tidak benar-benar terkontrol.
          </strong>{' '}
          Bukan karena kamu kurang kerja keras. Tapi karena belum punya sistem yang tepat.
        </div>
      </div>
    </section>
  )
}
