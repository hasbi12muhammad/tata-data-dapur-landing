import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'

export default function ReceiptCard() {
  const cardRef = useRef(null)

  useEffect(() => {
    if (!cardRef.current) return

    gsap.from(cardRef.current, {
      y: 40,
      rotation: 0,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      delay: 0.5,
    })

    const hero = document.querySelector('#hero-section')
    if (!hero) return

    const handleMouseMove = (e) => {
      const rect = hero.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = (e.clientX - centerX) / rect.width
      const deltaY = (e.clientY - centerY) / rect.height

      gsap.to(cardRef.current, {
        rotateY: deltaX * 5,
        rotateX: -deltaY * 3,
        x: deltaX * 8,
        y: deltaY * 6,
        duration: 0.8,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(cardRef.current, {
        rotateY: 0, rotateX: 0, x: 0, y: 0,
        duration: 1, ease: 'elastic.out(1, 0.5)',
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
    <div className="receipt-wrapper" style={{ position: 'relative', width: '380px', maxWidth: '100%', userSelect: 'none' }}>

      {/* Soft shadow layer behind the card */}
      <div style={{
        position: 'absolute',
        inset: 0,
        transform: 'rotate(5deg) translate(10px, 14px)',
        background: 'rgba(27,18,8,0.18)',
        borderRadius: '6px',
        filter: 'blur(18px)',
        zIndex: 0,
        pointerEvents: 'none',
      }} />

      {/* Receipt card — tilted right */}
      <div
        ref={cardRef}
        style={{
          transform: 'rotate(4deg)',
          perspective: '1000px',
          transformStyle: 'preserve-3d',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <img
          src="/assets/receipt.png"
          alt="Laporan harian Warung Bu Sari"
          style={{ width: '100%', display: 'block', objectFit: 'contain' }}
          draggable={false}
        />

        {/* Stain / noda effect — very subtle brown blobs */}
        <div style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          borderRadius: '4px',
          background: `
            radial-gradient(ellipse 90px 55px at 28% 52%, rgba(120,72,30,0.07) 0%, transparent 70%),
            radial-gradient(ellipse 65px 45px at 72% 28%, rgba(100,58,20,0.055) 0%, transparent 70%),
            radial-gradient(ellipse 50px 35px at 55% 78%, rgba(110,65,25,0.045) 0%, transparent 70%)
          `,
        }} />
      </div>
    </div>
  )
}
