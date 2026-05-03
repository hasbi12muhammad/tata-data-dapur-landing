import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'

export default function ReceiptCard() {
  const cardRef = useRef(null)

  useEffect(() => {
    if (!cardRef.current) return

    // Entry animation
    gsap.from(cardRef.current, {
      y: 30,
      rotation: -5,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      delay: 0.5,
    })

    // Mouse parallax effect
    const hero = document.querySelector('#hero-section')
    if (!hero) return

    const handleMouseMove = (e) => {
      const rect = hero.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = (e.clientX - centerX) / rect.width
      const deltaY = (e.clientY - centerY) / rect.height

      gsap.to(cardRef.current, {
        rotateY: deltaX * 6,
        rotateX: -deltaY * 4,
        x: deltaX * 10,
        y: deltaY * 8,
        duration: 0.8,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(cardRef.current, {
        rotateY: 0,
        rotateX: 0,
        x: 0,
        y: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.5)',
      })
    }

    hero.addEventListener('mousemove', handleMouseMove)
    hero.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      hero.removeEventListener('mousemove', handleMouseMove)
      hero.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={cardRef}
      style={{
        transform: 'rotate(-1.5deg)',
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        width: '380px',
        maxWidth: '100%',
        position: 'relative',
      }}
    >
      {/* Washi Tape PNG — zIndex 1 so header text (zIndex 2) sits above it */}
      <div style={{
        position: 'absolute', top: '-20px', left: '50%',
        transform: 'translateX(-50%) rotate(-2deg)',
        zIndex: 1, width: '110px',
        pointerEvents: 'none',
      }}>
        <img
          src="/assets/components/22.png" alt=""
          style={{ width: '110px', objectFit: 'contain', opacity: 0.88, display: 'block' }}
        />
      </div>

      {/* Tear edge top */}
      <div className="tear-edge-top" />

      {/* Main receipt body */}
      <div className="receipt-card px-6 pb-2 pt-4">

        {/* Store header — position relative + zIndex 2 so it sits above washi tape */}
        <div className="text-center mb-3" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            fontFamily: 'Fraunces, Georgia, serif',
            fontStyle: 'italic',
            fontSize: '1.2rem',
            color: '#1B1208',
            fontWeight: 400,
          }}>
            Warung Bu Sari
          </div>
          <div style={{
            fontFamily: '"DM Mono", monospace',
            fontSize: '0.65rem',
            color: '#5A6B3B',
            letterSpacing: '0.05em',
            marginTop: '2px',
          }}>
            17 APR 2026 · LAPORAN HARIAN
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1.5px dashed rgba(27,18,8,0.2)', margin: '10px 0' }} />

        {/* Sales section */}
        <div style={{
          fontFamily: '"DM Mono", monospace',
          fontSize: '0.6rem',
          color: 'rgba(27,18,8,0.45)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: '8px',
        }}>
          PENJUALAN
        </div>

        {/* Line items */}
        {[
          { name: 'Nasi Goreng Spesial ×11', price: 'Rp 132.000' },
          { name: 'Ayam Bakar ×7', price: 'Rp 196.000' },
          { name: 'Es Kopi Susu ×14', price: 'Rp 252.000' },
        ].map((item, i) => (
          <div key={i} className="receipt-item" style={{ marginBottom: '6px' }}>
            <span className="receipt-item-name" style={{
              fontFamily: '"DM Mono", monospace',
              fontSize: '0.7rem',
              color: '#1B1208',
            }}>
              {item.name}
            </span>
            <span className="receipt-item-dots" />
            <span className="receipt-item-price" style={{
              fontFamily: '"DM Mono", monospace',
              fontSize: '0.7rem',
              color: '#1B1208',
            }}>
              {item.price}
            </span>
          </div>
        ))}

        {/* Divider */}
        <div style={{ borderTop: '1.5px dashed rgba(27,18,8,0.2)', margin: '10px 0' }} />

        {/* Summary */}
        {[
          { label: 'Total Revenue', value: 'Rp 580.000', muted: false },
          { label: 'HPP', value: '− Rp 213.000', muted: true },
        ].map((row, i) => (
          <div key={i} className="receipt-item" style={{ marginBottom: '6px' }}>
            <span className="receipt-item-name" style={{
              fontFamily: '"DM Mono", monospace',
              fontSize: '0.72rem',
              color: row.muted ? 'rgba(27,18,8,0.55)' : '#1B1208',
            }}>
              {row.label}
            </span>
            <span className="receipt-item-dots" />
            <span className="receipt-item-price" style={{
              fontFamily: '"DM Mono", monospace',
              fontSize: '0.72rem',
              color: row.muted ? 'rgba(27,18,8,0.55)' : '#1B1208',
            }}>
              {row.value}
            </span>
          </div>
        ))}

        {/* Net Profit Box */}
        <div style={{
          background: '#1B1208',
          borderRadius: '10px',
          padding: '14px 16px',
          textAlign: 'center',
          marginTop: '14px',
          marginBottom: '4px',
        }}>
          <div style={{
            fontFamily: '"DM Mono", monospace',
            fontSize: '0.6rem',
            color: '#C49A3F',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '6px',
          }}>
            NET PROFIT
          </div>
          <div style={{
            fontFamily: 'Fraunces, Georgia, serif',
            fontSize: '2rem',
            fontWeight: 700,
            color: '#FBF6EC',
            lineHeight: 1,
          }}>
            Rp 367.000
          </div>
        </div>

        {/* Footer */}
        <div style={{
          fontFamily: '"DM Mono", monospace',
          fontSize: '0.6rem',
          color: 'rgba(27,18,8,0.4)',
          textAlign: 'center',
          marginTop: '12px',
          marginBottom: '6px',
          letterSpacing: '0.02em',
        }}>
          Dicatat dengan ✦ Tata Data Dapur
        </div>
      </div>

      {/* Tear edge bottom */}
      <div className="tear-edge-bottom" />
    </div>
  )
}
