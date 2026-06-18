import React, { useState } from 'react'
import { useSeo } from '../hooks/useSeo'

const SUPABASE_URL = 'https://tqhfnaerzttcfceoygxw.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxaGZuYWVyenR0Y2ZjZW95Z3h3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxNzAzMzEsImV4cCI6MjA5MTc0NjMzMX0.ODfdCsO8w1H6CF1b-SERbfp0dstnQV-HSIlEjG5pC4w'
const AMOUNT = 1000
const PAKASIR_SLUG = 'tata-data-dapur'
const REDIRECT_URL = 'https://app.tatadatadapur.my.id/welcome'

function generateOrderId() {
  const r4 = Math.floor(Math.random() * 9000 + 1000)
  return `TDD-${Date.now()}-${r4}`
}

function validWA(v) {
  return /^(08|\+62)\d{8,12}$/.test(v.replace(/[\s-]/g, ''))
}
function validEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

const S = {
  wrap: {
    minHeight: '100dvh',
    background: '#F4EDE0',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Plus Jakarta Sans, sans-serif',
  },
  nav: {
    padding: '0 24px',
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid rgba(181,83,42,0.15)',
    background: 'rgba(255,252,248,0.9)',
    backdropFilter: 'blur(12px)',
  },
  logo: {
    display: 'flex', alignItems: 'center', gap: '8px',
    textDecoration: 'none',
  },
  logoText: {
    fontFamily: 'Fraunces, serif',
    fontSize: '18px',
    fontWeight: 700,
    color: '#B5532A',
    whiteSpace: 'nowrap',
  },
  main: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    padding: '48px 20px 80px',
  },
  card: {
    width: '100%',
    maxWidth: '480px',
  },
  title: {
    fontFamily: 'Fraunces, serif',
    fontSize: '28px',
    fontWeight: 700,
    color: '#1B1208',
    marginBottom: '8px',
    letterSpacing: '-0.5px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#7A5C3A',
    marginBottom: '32px',
    lineHeight: 1.5,
  },
  productBox: {
    background: '#fff',
    border: '1.5px solid rgba(181,83,42,0.25)',
    borderRadius: '16px',
    padding: '20px',
    marginBottom: '32px',
  },
  productName: {
    fontWeight: 700,
    color: '#1B1208',
    fontSize: '15px',
  },
  productDesc: {
    fontSize: '12px',
    color: '#7A5C3A',
    marginTop: '4px',
    lineHeight: 1.6,
  },
  productPrice: {
    fontFamily: 'Fraunces, serif',
    fontSize: '26px',
    fontWeight: 700,
    color: '#B5532A',
    whiteSpace: 'nowrap',
  },
  label: {
    display: 'block',
    fontSize: '13px',
    fontWeight: 700,
    color: '#3D2510',
    marginBottom: '6px',
  },
  input: {
    width: '100%',
    padding: '12px 14px',
    borderRadius: '10px',
    border: '1.5px solid rgba(181,83,42,0.25)',
    background: '#fff',
    fontSize: '14px',
    color: '#1B1208',
    fontFamily: 'Plus Jakarta Sans, sans-serif',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.15s',
  },
  inputError: {
    borderColor: '#D9534F',
  },
  errMsg: {
    fontSize: '12px',
    color: '#D9534F',
    marginTop: '4px',
  },
  fieldWrap: {
    marginBottom: '20px',
  },
  toggleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px',
    cursor: 'pointer',
    userSelect: 'none',
  },
  toggle: (on) => ({
    width: '40px',
    height: '22px',
    borderRadius: '99px',
    background: on ? '#B5532A' : 'rgba(181,83,42,0.2)',
    position: 'relative',
    transition: 'background 0.2s',
    flexShrink: 0,
  }),
  toggleDot: (on) => ({
    position: 'absolute',
    top: '3px',
    left: on ? '21px' : '3px',
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    background: '#fff',
    transition: 'left 0.2s',
    boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
  }),
  toggleLabel: {
    fontSize: '13px',
    color: '#5A3D25',
    fontWeight: 600,
  },
  btn: (loading) => ({
    width: '100%',
    padding: '15px',
    background: loading ? '#C47855' : '#B5532A',
    color: '#fff',
    border: 'none',
    borderRadius: '99px',
    fontSize: '15px',
    fontWeight: 800,
    fontFamily: 'Plus Jakarta Sans, sans-serif',
    cursor: loading ? 'not-allowed' : 'pointer',
    marginTop: '8px',
    transition: 'background 0.15s',
  }),
  errBanner: {
    background: '#FEF2F2',
    border: '1px solid #FCA5A5',
    borderRadius: '10px',
    padding: '12px 16px',
    fontSize: '13px',
    color: '#B91C1C',
    marginTop: '16px',
  },
  security: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    justifyContent: 'center',
    fontSize: '12px',
    color: '#8B7060',
    marginTop: '16px',
  },
}

export default function BeliPage() {
  useSeo({
    title: 'Beli Tata Data Dapur — Bayar Sekali, Pakai Selamanya',
    description: 'Beli akses Tata Data Dapur. Hitung HPP, pantau stok, laporan keuangan. Bayar sekali Rp 1.000.',
    path: '/beli',
  })

  const [form, setForm] = useState({
    fullName: '',
    whatsapp: '',
    emailNotif: '',
    useDiffEmailLogin: false,
    emailLogin: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [submitErr, setSubmitErr] = useState('')

  function set(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: '' }))
  }

  function validate() {
    const e = {}
    if (!form.fullName.trim()) e.fullName = 'Nama lengkap wajib diisi'
    if (!form.whatsapp.trim()) e.whatsapp = 'Nomor WhatsApp wajib diisi'
    else if (!validWA(form.whatsapp)) e.whatsapp = 'Format tidak valid (contoh: 081234567890 atau +6281234567890)'
    if (!form.emailNotif.trim()) e.emailNotif = 'Email wajib diisi'
    else if (!validEmail(form.emailNotif)) e.emailNotif = 'Format email tidak valid'
    if (form.useDiffEmailLogin) {
      if (!form.emailLogin.trim()) e.emailLogin = 'Email login wajib diisi'
      else if (!validEmail(form.emailLogin)) e.emailLogin = 'Format email tidak valid'
    }
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setLoading(true)
    setSubmitErr('')
    try {
      const orderId = generateOrderId()
      const emailLogin = form.useDiffEmailLogin ? form.emailLogin.trim() : form.emailNotif.trim()
      const res = await fetch(`${SUPABASE_URL}/rest/v1/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({
          order_id: orderId,
          full_name: form.fullName.trim(),
          whatsapp: form.whatsapp.trim(),
          email_notif: form.emailNotif.trim(),
          email_login: emailLogin,
          amount: AMOUNT,
          status: 'pending',
        }),
      })
      if (!res.ok) {
        const body = await res.text()
        throw new Error(body || 'Gagal menyimpan pesanan')
      }
      window.location.href =
        `https://app.pakasir.com/pay/${PAKASIR_SLUG}/${AMOUNT}` +
        `?order_id=${orderId}&redirect=${encodeURIComponent(REDIRECT_URL)}`
    } catch (err) {
      setSubmitErr(err.message || 'Terjadi kesalahan. Coba lagi.')
      setLoading(false)
    }
  }

  return (
    <div style={S.wrap}>
      {/* Mini navbar */}
      <nav style={S.nav}>
        <a href="/" style={S.logo}>
          <img
            src="/assets/td-logo.png"
            alt="Tata Data"
            style={{
              height: '28px', width: '28px', objectFit: 'contain',
              filter: 'brightness(0) saturate(100%) invert(34%) sepia(60%) saturate(600%) hue-rotate(348deg) brightness(85%)',
            }}
          />
          <span style={S.logoText}>
            Tata Data<span style={{ color: '#1B1208' }}> Dapur</span>
          </span>
        </a>
      </nav>

      {/* Form */}
      <main style={S.main}>
        <div style={S.card}>
          <h1 style={S.title}>Lengkapi Data Pembelian</h1>
          <p style={S.subtitle}>
            Isi data di bawah, lalu kamu akan diarahkan ke halaman pembayaran Pakasir.
            Kredensial login akan dikirim ke email setelah pembayaran berhasil.
          </p>

          {/* Product summary */}
          <div style={S.productBox}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div style={S.productName}>Tata Data Dapur</div>
              <span style={{
                fontSize: '11px', fontWeight: 700, color: '#B5532A',
                background: 'rgba(181,83,42,0.08)', padding: '3px 8px',
                borderRadius: '99px', whiteSpace: 'nowrap', marginLeft: '8px',
              }}>Lifetime</span>
            </div>
            <div style={S.productDesc}>Akses penuh · Bayar sekali · Pakai selamanya</div>
            <div style={{ marginTop: '14px', display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <div style={S.productPrice}>Rp 1.000</div>
              <span style={{ fontSize: '12px', color: '#8B7060' }}>sekali bayar</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* Nama */}
            <div style={S.fieldWrap}>
              <label style={S.label}>Nama Lengkap</label>
              <input
                style={{ ...S.input, ...(errors.fullName ? S.inputError : {}) }}
                type="text"
                placeholder="Contoh: Budi Santoso"
                value={form.fullName}
                onChange={e => set('fullName', e.target.value)}
                disabled={loading}
              />
              {errors.fullName && <div style={S.errMsg}>{errors.fullName}</div>}
            </div>

            {/* WhatsApp */}
            <div style={S.fieldWrap}>
              <label style={S.label}>Nomor WhatsApp</label>
              <input
                style={{ ...S.input, ...(errors.whatsapp ? S.inputError : {}) }}
                type="tel"
                placeholder="081234567890"
                value={form.whatsapp}
                onChange={e => set('whatsapp', e.target.value)}
                disabled={loading}
              />
              {errors.whatsapp && <div style={S.errMsg}>{errors.whatsapp}</div>}
            </div>

            {/* Email notif */}
            <div style={S.fieldWrap}>
              <label style={S.label}>Email untuk Terima Kredensial</label>
              <input
                style={{ ...S.input, ...(errors.emailNotif ? S.inputError : {}) }}
                type="email"
                placeholder="kamu@email.com"
                value={form.emailNotif}
                onChange={e => set('emailNotif', e.target.value)}
                disabled={loading}
              />
              {errors.emailNotif && <div style={S.errMsg}>{errors.emailNotif}</div>}
            </div>

            {/* Toggle email berbeda */}
            <div
              style={S.toggleRow}
              onClick={() => !loading && set('useDiffEmailLogin', !form.useDiffEmailLogin)}
            >
              <div style={S.toggle(form.useDiffEmailLogin)}>
                <div style={S.toggleDot(form.useDiffEmailLogin)} />
              </div>
              <span style={S.toggleLabel}>Gunakan email berbeda untuk login app</span>
            </div>

            {/* Email login (conditional) */}
            {form.useDiffEmailLogin && (
              <div style={S.fieldWrap}>
                <label style={S.label}>Email untuk Login App</label>
                <input
                  style={{ ...S.input, ...(errors.emailLogin ? S.inputError : {}) }}
                  type="email"
                  placeholder="login@email.com"
                  value={form.emailLogin}
                  onChange={e => set('emailLogin', e.target.value)}
                  disabled={loading}
                />
                {errors.emailLogin && <div style={S.errMsg}>{errors.emailLogin}</div>}
              </div>
            )}

            <button
              type="submit"
              style={S.btn(loading)}
              disabled={loading}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#8B3D1A' }}
              onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#B5532A' }}
            >
              {loading ? 'Memproses...' : 'Lanjut ke Pembayaran →'}
            </button>

            {submitErr && <div style={S.errBanner}>{submitErr}</div>}
          </form>

          <div style={S.security}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8B7060" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            Pembayaran aman melalui Pakasir
          </div>
        </div>
      </main>
    </div>
  )
}
