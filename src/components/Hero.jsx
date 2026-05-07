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
  const proofRef = useRef(null)
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
        .to(sectionRef.current.querySelectorAll('.illus-item'), {
          opacity: 1, duration: 0.9, stagger: 0.08, ease: 'power2.out',
        }, '-=0.5')
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="hero-section"
      style={{
        paddingTop: '140px',
        paddingBottom: '80px',
        paddingLeft: '48px',
        paddingRight: '48px',
        position: 'relative',
        overflow: 'hidden',
        background: '#FFFCF8',
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '-100px', right: '-200px',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, #FDEEE5 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* LEFT-SIDE illustrations */}
      <div className="illus-item hero-left-illus" style={{ position: 'absolute', top: '90px', left: '10px', zIndex: 0 }}>
        <div style={floatStyle(-10, '4.5s', '0s')}>
          <SpiceImg src={`${A}1.png`} bg="cream" width={165} height={165} />
        </div>
      </div>
      <div className="illus-item hero-left-illus" style={{ position: 'absolute', bottom: '60px', left: '20px', zIndex: 0 }}>
        <div style={floatStyle(-8, '5s', '1.2s')}>
          <SpiceImg src={`${A}2.png`} bg="cream" width={145} height={130} />
        </div>
      </div>
      <div className="illus-item hero-left-illus" style={{ position: 'absolute', top: '42%', left: '5px', zIndex: 0, transform: 'translateY(-50%)' }}>
        <div style={floatStyle(6, '4.8s', '0.8s')}>
          <SpiceImg src={`${A}8.png`} bg="cream" width={125} height={82} />
        </div>
      </div>

      {/* GRID */}
      <div
        className="hero-grid"
        style={{
          maxWidth: '1200px', margin: '0 auto', width: '100%',
          display: 'grid', gridTemplateColumns: '55% 45%',
          gap: '60px', alignItems: 'center', position: 'relative', zIndex: 1,
        }}
      >
        {/* Left — text */}
        <div>
          {/* Eyebrow pill */}
          <div
            ref={eyebrowRef}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: '#FEF3ED', border: '1px solid #F5D0BC',
              borderRadius: '99px', padding: '6px 14px',
              fontSize: '12px', fontWeight: 700, color: '#C8431A',
              marginBottom: '28px',
            }}
          >
            <span style={{
              width: '7px', height: '7px', borderRadius: '50%',
              background: '#C8431A', display: 'inline-block', flexShrink: 0,
              animation: 'pulse-dot 2s infinite',
            }} />
            Khusus F&B & Bakery UMKM
          </div>

          <h1
            ref={headlineRef}
            style={{
              fontFamily: 'Fraunces, serif',
              fontSize: 'clamp(36px, 5.2vw, 58px)',
              lineHeight: 1.12,
              letterSpacing: '-1.5px',
              color: '#1A1208',
              margin: 0, marginBottom: '24px',
              fontWeight: 700,
            }}
          >
            <span className="headline-word" style={{ display: 'block' }}>Jualan tiap hari,</span>
            <span className="headline-word" style={{ display: 'block' }}>tapi masih bingung</span>
            <span className="headline-word" style={{ display: 'block', fontStyle: 'italic', color: '#C8431A' }}>uang dan stok ke mana?</span>
          </h1>

          <p
            ref={subtextRef}
            style={{
              fontSize: '17px', color: '#6B4A35',
              lineHeight: 1.7, marginBottom: '40px', maxWidth: '520px',
            }}
          >
            Tata Data Dapur bantu kamu lihat kondisi bisnis dengan jelas —
            stok, transaksi, HPP, dan laporan keuangan.{' '}
            <strong style={{ color: '#2C1A0E', fontWeight: 700 }}>
              Tanpa ribet. Tanpa biaya bulanan.
            </strong>
          </p>

          <div
            ref={ctasRef}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', marginBottom: '32px' }}
          >
            <a
              href="#pricing"
              style={{
                background: '#C8431A', color: '#fff', border: 'none',
                padding: '16px 32px', borderRadius: '99px',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize: '15px', fontWeight: 800,
                textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px',
                boxShadow: '0 4px 24px rgba(200,67,26,0.28)',
                animation: 'pulse-btn 3s infinite',
                transition: 'background 0.2s, transform 0.1s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#9E3212'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#C8431A'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              Mulai Rapikan Bisnis Saya →
            </a>
            <a
              href="#how"
              style={{
                background: 'transparent', color: '#6B4A35',
                border: '1.5px solid #EDD9C8', padding: '15px 28px',
                borderRadius: '99px',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize: '15px', fontWeight: 600,
                textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#C8431A'; e.currentTarget.style.color = '#C8431A' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#EDD9C8'; e.currentTarget.style.color = '#6B4A35' }}
            >
              ▶&nbsp; Lihat Cara Kerjanya
            </a>
          </div>

          {/* Proof row */}
          <div
            ref={proofRef}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: '#A0836E', flexWrap: 'wrap' }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>✓ Bayar sekali</span>
            <span style={{ width: '4px', height: '4px', background: '#EDD9C8', borderRadius: '50%' }} />
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>✓ Setup 15 menit</span>
            <span style={{ width: '4px', height: '4px', background: '#EDD9C8', borderRadius: '50%' }} />
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>✓ Khusus F&B & Bakery</span>
          </div>
        </div>

        {/* Right — receipt + illustrations */}
        <div className="hero-right-col" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', minHeight: '580px' }}>
          {/* Receipt card */}
          <div style={{ position: 'relative', zIndex: 3 }}>
            <ReceiptCard />
          </div>

          {/* Gap filler illustrations */}
          <div className="illus-item hero-gap-filler" style={{ position: 'absolute', top: '18%', left: '-105px', zIndex: 2 }}>
            <div style={floatStyle(-8, '4.3s', '0.4s')}>
              <SpiceImg src={`${A}15.png`} bg="cream" width={88} height={84} />
            </div>
          </div>
          <div className="illus-item hero-gap-filler" style={{ position: 'absolute', top: '50%', left: '-115px', zIndex: 2, transform: 'translateY(-50%)' }}>
            <div style={floatStyle(6, '5.2s', '1.8s')}>
              <SpiceImg src={`${A}4.png`} bg="cream" width={78} height={78} />
            </div>
          </div>
          <div className="illus-item hero-gap-filler" style={{ position: 'absolute', bottom: '22%', left: '-100px', zIndex: 2 }}>
            <div style={floatStyle(-12, '4.6s', '0.9s')}>
              <SpiceImg src={`${A}9.png`} bg="cream" width={92} height={65} />
            </div>
          </div>

          {/* Right edge illustrations */}
          <div className="illus-item hero-right-illus" style={{ position: 'absolute', top: '35%', right: '-50px', zIndex: 2, transform: 'translateY(-50%)' }}>
            <div style={floatStyle(15, '3.8s', '0.6s')}>
              <SpiceImg src={`${A}3.png`} bg="cream" width={145} height={115} />
            </div>
          </div>
          <div className="illus-item hero-right-illus" style={{ position: 'absolute', top: '10px', right: '-30px', zIndex: 2 }}>
            <div style={floatStyle(18, '4.2s', '2s')}>
              <SpiceImg src={`${A}7.png`} bg="cream" width={108} height={108} />
            </div>
          </div>
          <div className="illus-item hero-right-illus" style={{ position: 'absolute', bottom: '30px', right: '-45px', zIndex: 2 }}>
            <div style={floatStyle(-12, '5.5s', '1.5s')}>
              <SpiceImg src={`${A}6.png`} bg="cream" width={120} height={105} />
            </div>
          </div>
          <div className="illus-item hero-right-illus" style={{ position: 'absolute', bottom: '0px', left: '50%', zIndex: 1, transform: 'translateX(-50%)' }}>
            <SpiceImg src={`${A}10.png`} bg="cream" width={100} height={66} opacity={0.28} />
          </div>

          {/* Sparkles */}
          <SparkleIllustration size={10} style={{ position: 'absolute', top: '80px', left: '10px', color: '#C49A3F', opacity: 0.5 }} />
          <SparkleIllustration size={7} style={{ position: 'absolute', bottom: '120px', right: '40px', color: '#C8431A', opacity: 0.4 }} />
        </div>
      </div>

      {/* App Dashboard Preview */}
      <div style={{ maxWidth: '680px', margin: '56px auto 0', position: 'relative', zIndex: 1 }}>
        <div style={{
          background: '#1A1208',
          borderRadius: '22px',
          overflow: 'hidden',
          border: '1px solid #3A2A1A',
          boxShadow: '0 24px 80px rgba(26,18,8,0.24)',
        }}>
          {/* Title bar */}
          <div style={{ background: '#2E1F10', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '7px' }}>
              <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#FF6057', display: 'inline-block' }} />
              <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#FEBC2E', display: 'inline-block' }} />
              <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#28C840', display: 'inline-block' }} />
            </div>
          </div>
          {/* Content */}
          <div style={{ padding: '24px 20px 28px' }}>
            <div style={{ fontSize: '11px', color: '#6B5A42', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
              Selamat pagi, Bu Sari 👋
            </div>
            <div style={{ fontFamily: 'Fraunces, serif', color: '#F5E6D0', fontSize: '18px', fontWeight: 300, marginBottom: '24px' }}>
              Ringkasan bisnis kamu <strong style={{ fontWeight: 700, color: '#fff' }}>hari ini</strong>
            </div>
            {/* Stat grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              {[
                { lbl: 'Omzet Hari Ini', val: 'Rp 847K', color: '#5DCA87', badge: '↑ 12% vs kemarin', badgeClass: 'up' },
                { lbl: 'Laba Bersih', val: 'Rp 312K', color: '#5DCA87', badge: 'Margin 36.8%', badgeClass: 'up' },
                { lbl: 'HPP Croissant', val: 'Rp 4.200', color: '#F5A25A', badge: 'Harga bahan naik', badgeClass: 'warn' },
                { lbl: 'Stok Tepung', val: '2.3 kg sisa', color: '#F5E6D0', fontSize: '18px', badge: '⚠ Segera restock', badgeClass: 'warn' },
              ].map((s, i) => (
                <div key={i} style={{ background: '#2A1A0C', border: '1px solid #3D2A18', borderRadius: '12px', padding: '14px 16px' }}>
                  <div style={{ fontSize: '10px', color: '#8A7060', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '5px' }}>{s.lbl}</div>
                  <div style={{ fontSize: s.fontSize || '22px', fontWeight: 800, color: s.color, letterSpacing: '-0.5px' }}>{s.val}</div>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '4px',
                    fontSize: '10px', fontWeight: 700, marginTop: '4px', padding: '2px 8px', borderRadius: '99px',
                    background: s.badgeClass === 'up' ? 'rgba(93,202,135,0.15)' : 'rgba(245,162,90,0.15)',
                    color: s.badgeClass === 'up' ? '#5DCA87' : '#F5A25A',
                  }}>{s.badge}</div>
                </div>
              ))}
            </div>
            {/* Footer bar */}
            <div style={{ background: '#2A1A0C', border: '1px solid #3D2A18', borderRadius: '12px', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '11px', color: '#8A7060' }}>Transaksi hari ini</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#F5E6D0' }}>34 transaksi</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', background: '#5DCA87', borderRadius: '50%' }} />
                <span style={{ fontSize: '11px', color: '#5DCA87' }}>Semua stok aman</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
