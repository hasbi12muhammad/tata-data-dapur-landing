import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'

export default function ReceiptCard() {
  const cardRef = useRef(null)

  useEffect(() => {
    if (!cardRef.current) return

    gsap.from(cardRef.current, {
      y: 30,
      rotation: -5,
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
    <div
      ref={cardRef}
      style={{
        transform: 'rotate(-1.5deg)',
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        width: '320px',
        maxWidth: '100%',
        position: 'relative',
        userSelect: 'none',
      }}
    >
      <img
        src="/assets/receipt.png"
        alt="Laporan harian Warung Bu Sari"
        style={{ width: '100%', display: 'block', objectFit: 'contain' }}
        draggable={false}
      />
    </div>
  )
}
