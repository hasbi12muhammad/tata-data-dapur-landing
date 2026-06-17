import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar'
import Footer from '../Footer'

export default function LegalLayout({ title, subtitle, lastUpdated, children }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div style={{ background: '#FBF6EC', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ paddingTop: '64px' }}>

        {/* Terracotta header */}
        <div style={{
          background: '#B5532A',
          padding: '48px 24px 40px',
          textAlign: 'center',
        }}>
          <p style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: '11px', fontWeight: 800,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.65)', marginBottom: '12px', margin: '0 0 12px',
          }}>
            Tata Data Dapur
          </p>
          <h1 style={{
            fontFamily: 'Fraunces, serif',
            fontSize: 'clamp(28px, 5vw, 44px)',
            fontWeight: 700, color: '#fff',
            letterSpacing: '-0.5px', marginBottom: '10px', lineHeight: 1.2,
          }}>
            {title}
          </h1>
          {subtitle && (
            <p style={{
              fontSize: '14px', color: 'rgba(255,255,255,0.75)',
              maxWidth: '480px', margin: '10px auto 0',
              fontFamily: 'Plus Jakarta Sans, sans-serif', lineHeight: 1.6,
            }}>
              {subtitle}
            </p>
          )}
          <p style={{
            fontSize: '12px', color: 'rgba(255,255,255,0.45)',
            marginTop: '16px', fontFamily: 'Plus Jakarta Sans, sans-serif',
          }}>
            Berlaku sejak: {lastUpdated}
          </p>
        </div>

        {/* Back link */}
        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '24px 24px 0' }}>
          <Link
            to="/"
            style={{
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontSize: '13px', fontWeight: 600,
              color: '#B5532A', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: '6px',
            }}
          >
            ← Kembali ke Beranda
          </Link>
        </div>

        {/* Content */}
        <div
          className="legal-content"
          style={{
            maxWidth: '680px', margin: '0 auto',
            padding: '32px 24px 80px',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: '15px', lineHeight: 1.75,
            color: '#1B1208',
          }}
        >
          {children}
        </div>
      </div>
      <Footer />
    </div>
  )
}
