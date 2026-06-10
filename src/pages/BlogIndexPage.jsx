import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import StickyCTA from '../components/StickyCTA'
import { articles } from '../blog/articles.jsx'
import { useSeo } from '../hooks/useSeo'

const featured = articles[0]
const rest = articles.slice(1)

const categoryColors = {
  'HPP & Biaya': '#c9a96e',
  'Tips Bisnis': '#7cb89a',
  'Bakery': '#b07a9e',
}

const tag = (category) => ({
  display: 'inline-block',
  background: '#fdf6ec',
  color: categoryColors[category] || '#c9a96e',
  border: `1px solid ${categoryColors[category] || '#c9a96e'}`,
  borderRadius: '20px',
  padding: '3px 12px',
  fontSize: '12px',
  fontWeight: 700,
  letterSpacing: '0.3px',
  marginBottom: '10px',
})

export default function BlogIndexPage() {
  useSeo({
    title: 'Blog — Tips Keuangan & HPP Bisnis Kuliner | Tata Data Dapur',
    description: 'Artikel praktis seputar hitung HPP, kelola stok, dan keuangan bisnis kuliner & bakery. Belajar kelola dapur biar tetap untung.',
    path: '/blog',
  })
  return (
    <div style={{ background: '#FFFCF8', minHeight: '100vh' }}>
      <Navbar />

      <section style={{ padding: '120px 24px 48px', textAlign: 'center' }}>
        <p style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '1.5px', color: '#c9a96e', textTransform: 'uppercase', marginBottom: '12px' }}>
          Blog
        </p>
        <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 700, color: '#1B1208', letterSpacing: '-1px', lineHeight: 1.2, marginBottom: '16px' }}>
          Tips & Panduan Bisnis Kuliner
        </h1>
        <p style={{ fontSize: '17px', color: '#5C3D1E', maxWidth: '520px', margin: '0 auto', lineHeight: 1.6 }}>
          Artikel praktis soal HPP, manajemen stok, dan keuangan untuk pemilik bisnis kuliner Indonesia.
        </p>
      </section>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px 80px' }}>

        <Link to={`/blog/${featured.slug}`} style={{ textDecoration: 'none', display: 'block', marginBottom: '48px' }}>
          <div
            style={{
              background: 'white',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 2px 20px rgba(26,18,8,0.08)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(26,18,8,0.12)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 20px rgba(26,18,8,0.08)' }}
          >
            <img
              src={featured.image}
              alt={featured.imageAlt}
              style={{ width: '100%', height: '320px', objectFit: 'cover', display: 'block' }}
            />
            <div style={{ padding: '28px 32px' }}>
              <span style={tag(featured.category)}>{featured.category}</span>
              <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 700, color: '#1B1208', letterSpacing: '-0.5px', lineHeight: 1.3, marginBottom: '12px' }}>
                {featured.title}
              </h2>
              <p style={{ color: '#5C3D1E', fontSize: '16px', lineHeight: 1.7, marginBottom: '16px' }}>
                {featured.excerpt}
              </p>
              <p style={{ fontSize: '13px', color: '#9B7B5A' }}>
                {featured.publishedAt} · {featured.readTime} baca
              </p>
            </div>
          </div>
        </Link>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {rest.map(article => (
            <Link key={article.slug} to={`/blog/${article.slug}`} style={{ textDecoration: 'none' }}>
              <div
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 16px rgba(26,18,8,0.07)',
                  height: '100%',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(26,18,8,0.12)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 16px rgba(26,18,8,0.07)' }}
              >
                <img
                  src={article.image}
                  alt={article.imageAlt}
                  style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }}
                />
                <div style={{ padding: '20px 24px' }}>
                  <span style={tag(article.category)}>{article.category}</span>
                  <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '18px', fontWeight: 700, color: '#1B1208', letterSpacing: '-0.3px', lineHeight: 1.3, marginBottom: '10px' }}>
                    {article.title}
                  </h3>
                  <p style={{ color: '#5C3D1E', fontSize: '14px', lineHeight: 1.6, marginBottom: '14px' }}>
                    {article.excerpt}
                  </p>
                  <p style={{ fontSize: '12px', color: '#9B7B5A' }}>
                    {article.publishedAt} · {article.readTime} baca
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
      <StickyCTA />
    </div>
  )
}
