import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{
      background: '#120D07',
      padding: '32px 24px 120px',
      textAlign: 'center',
    }}>
      <div style={{
        fontFamily: 'Fraunces, serif',
        fontSize: '18px',
        color: '#C8A882',
        marginBottom: '8px',
      }}>
        Tata Data Dapur
      </div>
      <p style={{
        fontSize: '12px',
        color: '#8A6E58',
        margin: '0 0 16px',
      }}>
        © 2026 Tata Data Dapur · Untuk UMKM Kuliner & Produksi Ringan Indonesia
      </p>
      <div style={{
        display: 'flex',
        gap: '8px',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}>
        {[
          { to: '/blog', label: 'Blog' },
          { to: '/help', label: 'Pusat Bantuan' },
          { to: '/privacy', label: 'Kebijakan Privasi' },
          { to: '/terms', label: 'Syarat & Ketentuan' },
          { to: '/refund', label: 'Kebijakan Pengembalian Dana' },
        ].map((link, i, arr) => (
          <React.Fragment key={link.to}>
            <Link
              to={link.to}
              style={{
                fontSize: '12px',
                color: '#9E7A60',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#B5532A' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#9E7A60' }}
            >
              {link.label}
            </Link>
            {i < arr.length - 1 && (
              <span style={{ fontSize: '12px', color: '#5A4030' }}>·</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </footer>
  )
}
