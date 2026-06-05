# Legal Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tambah 3 halaman legal (Kebijakan Privasi, Syarat & Ketentuan, Kebijakan Pengembalian Dana) ke landing page Tata Data Dapur dengan React Router.

**Architecture:** Tambah `react-router-dom`, wrap landing page ke dalam Route `/`, buat 3 halaman baru di `src/pages/`, shared `LegalLayout` komponen sebagai wrapper. Footer diupdate dengan link ke tiap halaman.

**Tech Stack:** React 18, Vite, react-router-dom v6, inline styles (ikuti konvensi project)

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `package.json` | Modify | Tambah react-router-dom |
| `src/App.jsx` | Modify | Tambah BrowserRouter + Routes |
| `src/components/legal/LegalLayout.jsx` | Create | Shared wrapper (header, back link, footer) |
| `src/pages/PrivacyPage.jsx` | Create | Kebijakan Privasi |
| `src/pages/TermsPage.jsx` | Create | Syarat & Ketentuan |
| `src/pages/RefundPage.jsx` | Create | Kebijakan Pengembalian Dana |
| `src/components/Footer.jsx` | Modify | Tambah link ke 3 halaman legal |

---

## Task 1: Install react-router-dom

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install dependency**

```bash
npm install react-router-dom
```

Expected output: `added X packages` — tidak ada error.

- [ ] **Step 2: Verifikasi instalasi**

```bash
cat package.json | grep react-router-dom
```

Expected: `"react-router-dom": "^6.x.x"` muncul di dependencies.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add react-router-dom"
```

---

## Task 2: Update App.jsx — tambah routing

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Rewrite App.jsx**

Ganti seluruh isi `src/App.jsx` dengan:

```jsx
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import PainSection from './components/PainSection'
import MarqueeStrip from './components/MarqueeStrip'
import SolutionSection from './components/SolutionSection'
import HowItWorks from './components/HowItWorks'
import ValueStack from './components/ValueStack'
import Testimonials from './components/Testimonials'
import Pricing from './components/Pricing'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import StickyCTA from './components/StickyCTA'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import RefundPage from './pages/RefundPage'

function LandingPage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <PainSection />
      <MarqueeStrip />
      <SolutionSection />
      <HowItWorks />
      <ValueStack />
      <Testimonials />
      <Pricing />
      <FinalCTA />
      <Footer />
      <StickyCTA />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/refund" element={<RefundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
```

- [ ] **Step 2: Verifikasi dev server tidak error**

```bash
npm run dev
```

Buka `http://localhost:5173` — landing page harus tampil normal seperti sebelumnya. Tidak ada console error.

- [ ] **Step 3: Commit**

```bash
git add src/App.jsx
git commit -m "feat: add react-router-dom routing to App"
```

---

## Task 3: Buat LegalLayout komponen

**Files:**
- Create: `src/components/legal/LegalLayout.jsx`

- [ ] **Step 1: Buat direktori dan file**

Buat `src/components/legal/LegalLayout.jsx` dengan isi:

```jsx
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
        <div style={{
          maxWidth: '680px', margin: '0 auto',
          padding: '32px 24px 80px',
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          fontSize: '15px', lineHeight: 1.75,
          color: '#1B1208',
        }}>
          {children}
        </div>
      </div>
      <Footer />
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/legal/LegalLayout.jsx
git commit -m "feat: add LegalLayout shared wrapper"
```

---

## Task 4: Buat PrivacyPage

**Files:**
- Create: `src/pages/PrivacyPage.jsx`

- [ ] **Step 1: Buat file**

Buat `src/pages/PrivacyPage.jsx`:

```jsx
import React from 'react'
import LegalLayout from '../components/legal/LegalLayout'

const S = {
  h2: {
    fontFamily: 'Fraunces, serif',
    fontSize: '22px', fontWeight: 700,
    color: '#1B1208', marginTop: '40px', marginBottom: '12px',
    letterSpacing: '-0.3px',
  },
  p: {
    marginBottom: '16px', color: '#3D2510',
  },
  ul: {
    paddingLeft: '20px', marginBottom: '16px', color: '#3D2510',
  },
  li: {
    marginBottom: '8px',
  },
  strong: {
    color: '#1B1208', fontWeight: 700,
  },
}

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Kebijakan Privasi"
      subtitle="Kami menghargai privasi kamu dan berkomitmen melindungi data yang kamu percayakan kepada kami."
      lastUpdated="Juni 2025"
    >
      <p style={S.p}>
        Kebijakan Privasi ini menjelaskan bagaimana <strong style={S.strong}>Tata Data</strong> yang dikelola oleh{' '}
        <strong style={S.strong}>Muhammad Hasbi Ash Shiddieqy</strong> mengumpulkan, menggunakan, dan melindungi
        data kamu saat menggunakan aplikasi Tata Data Dapur.
      </p>

      <h2 style={S.h2}>1. Data yang Kami Kumpulkan</h2>
      <p style={S.p}>Saat kamu mendaftar dan menggunakan Tata Data Dapur, kami mengumpulkan:</p>
      <ul style={S.ul}>
        <li style={S.li}><strong style={S.strong}>Data akun:</strong> Alamat email dan password (password dikelola dan dienkripsi oleh Supabase — kami tidak pernah menyimpan password dalam bentuk plaintext)</li>
        <li style={S.li}><strong style={S.strong}>Data bisnis:</strong> Daftar bahan baku dan harga, resep produk, catatan pembelian, catatan penjualan, catatan pengeluaran operasional, catatan produksi</li>
        <li style={S.li}><strong style={S.strong}>Data teknis:</strong> Informasi dasar penggunaan aplikasi untuk keperluan debugging (tidak dijual atau dibagikan)</li>
      </ul>

      <h2 style={S.h2}>2. Bagaimana Kami Menggunakan Data Kamu</h2>
      <p style={S.p}>Data yang kami kumpulkan digunakan semata-mata untuk:</p>
      <ul style={S.ul}>
        <li style={S.li}>Menjalankan dan menyediakan layanan Tata Data Dapur</li>
        <li style={S.li}>Menampilkan data bisnis kamu di dalam aplikasi</li>
        <li style={S.li}>Mengirim notifikasi terkait layanan jika diperlukan</li>
        <li style={S.li}>Merespons permintaan dukungan dari kamu</li>
      </ul>
      <p style={S.p}>
        Kami <strong style={S.strong}>tidak menjual, menyewakan, atau membagikan</strong> data pribadi kamu
        kepada pihak ketiga untuk tujuan pemasaran atau komersial.
      </p>

      <h2 style={S.h2}>3. Pihak Ketiga yang Terlibat</h2>
      <p style={S.p}>Dalam menjalankan layanan, kami menggunakan layanan pihak ketiga berikut:</p>
      <ul style={S.ul}>
        <li style={S.li}>
          <strong style={S.strong}>Supabase</strong> — digunakan untuk penyimpanan database dan autentikasi akun.
          Data kamu disimpan di server Supabase yang terenkripsi. Kebijakan privasi Supabase berlaku untuk
          pemrosesan data di sisi mereka.
        </li>
        <li style={S.li}>
          <strong style={S.strong}>onetap.id</strong> — digunakan untuk memproses pembayaran satu kali.
          Data pembayaran (kartu/transfer) dikelola sepenuhnya oleh onetap.id dan{' '}
          <strong style={S.strong}>tidak disimpan di sistem kami</strong>.
        </li>
      </ul>

      <h2 style={S.h2}>4. Keamanan Data</h2>
      <ul style={S.ul}>
        <li style={S.li}>Semua komunikasi antara aplikasi dan server menggunakan enkripsi HTTPS</li>
        <li style={S.li}>Data disimpan dengan enkripsi at-rest oleh Supabase</li>
        <li style={S.li}>Setiap akun hanya bisa mengakses data miliknya sendiri — data terisolasi per pengguna</li>
        <li style={S.li}>Kami tidak memiliki akses ke password kamu</li>
      </ul>

      <h2 style={S.h2}>5. Hak Kamu atas Data</h2>
      <p style={S.p}>Kamu berhak untuk:</p>
      <ul style={S.ul}>
        <li style={S.li}><strong style={S.strong}>Mengakses data kamu</strong> — semua data tersedia langsung di dalam aplikasi</li>
        <li style={S.li}><strong style={S.strong}>Menghapus akun dan data kamu</strong> — hubungi kami via WhatsApp atau email dan kami akan menghapus seluruh data kamu dari sistem dalam 7 hari kerja</li>
        <li style={S.li}><strong style={S.strong}>Meminta salinan data kamu</strong> — hubungi kami dan kami akan menyiapkan export data</li>
      </ul>

      <h2 style={S.h2}>6. Penyimpanan Data</h2>
      <p style={S.p}>
        Data kamu disimpan selama akun kamu aktif. Jika kamu meminta penghapusan akun, seluruh data
        akan dihapus secara permanen dari sistem kami.
      </p>

      <h2 style={S.h2}>7. Perubahan Kebijakan Ini</h2>
      <p style={S.p}>
        Jika ada perubahan signifikan pada Kebijakan Privasi ini, kami akan memberitahu kamu melalui
        email atau notifikasi di dalam aplikasi. Penggunaan berkelanjutan setelah perubahan berlaku
        dianggap sebagai persetujuan terhadap kebijakan yang diperbarui.
      </p>

      <h2 style={S.h2}>8. Hubungi Kami</h2>
      <p style={S.p}>
        Ada pertanyaan tentang privasi data kamu? Hubungi kami:
      </p>
      <ul style={S.ul}>
        <li style={S.li}>Email: <a href="mailto:hasbi12.muhammad@gmail.com" style={{ color: '#B5532A' }}>hasbi12.muhammad@gmail.com</a></li>
        <li style={S.li}>WhatsApp: tersedia via tombol di halaman utama</li>
      </ul>
    </LegalLayout>
  )
}
```

- [ ] **Step 2: Buka `http://localhost:5173/privacy` di browser**

Pastikan:
- Halaman tampil dengan header terracotta
- Judul "Kebijakan Privasi" muncul
- Back link "← Kembali ke Beranda" berfungsi dan kembali ke `/`
- Navbar dan Footer muncul

- [ ] **Step 3: Commit**

```bash
git add src/pages/PrivacyPage.jsx
git commit -m "feat: add Kebijakan Privasi page (/privacy)"
```

---

## Task 5: Buat TermsPage

**Files:**
- Create: `src/pages/TermsPage.jsx`

- [ ] **Step 1: Buat file**

Buat `src/pages/TermsPage.jsx`:

```jsx
import React from 'react'
import LegalLayout from '../components/legal/LegalLayout'

const S = {
  h2: {
    fontFamily: 'Fraunces, serif',
    fontSize: '22px', fontWeight: 700,
    color: '#1B1208', marginTop: '40px', marginBottom: '12px',
    letterSpacing: '-0.3px',
  },
  p: {
    marginBottom: '16px', color: '#3D2510',
  },
  ul: {
    paddingLeft: '20px', marginBottom: '16px', color: '#3D2510',
  },
  li: {
    marginBottom: '8px',
  },
  strong: {
    color: '#1B1208', fontWeight: 700,
  },
}

export default function TermsPage() {
  return (
    <LegalLayout
      title="Syarat & Ketentuan"
      subtitle="Dengan menggunakan Tata Data Dapur, kamu menyetujui syarat dan ketentuan berikut ini."
      lastUpdated="Juni 2025"
    >
      <p style={S.p}>
        Syarat & Ketentuan ini mengatur penggunaan aplikasi <strong style={S.strong}>Tata Data Dapur</strong> yang
        dikelola oleh <strong style={S.strong}>Muhammad Hasbi Ash Shiddieqy</strong> atas nama{' '}
        <strong style={S.strong}>Tata Data</strong>. Harap baca dengan saksama sebelum menggunakan layanan ini.
      </p>

      <h2 style={S.h2}>1. Pengguna yang Dimaksud</h2>
      <p style={S.p}>
        Tata Data Dapur ditujukan untuk pemilik usaha kuliner dan produksi ringan di Indonesia yang ingin
        mengelola HPP (Harga Pokok Penjualan), resep, dan laporan keuangan bisnis mereka.
      </p>

      <h2 style={S.h2}>2. Akun & Lisensi</h2>
      <ul style={S.ul}>
        <li style={S.li}>Satu pembelian memberikan akses untuk <strong style={S.strong}>satu akun</strong></li>
        <li style={S.li}>Akun tidak boleh dibagikan, dijual, atau dipindahtangankan kepada pihak lain</li>
        <li style={S.li}>Kamu bertanggung jawab penuh atas keamanan kredensial akun (email & password) milikmu</li>
        <li style={S.li}>Segera hubungi kami jika kamu mencurigai ada akses tidak sah ke akunmu</li>
      </ul>

      <h2 style={S.h2}>3. Pembayaran</h2>
      <ul style={S.ul}>
        <li style={S.li}>Tata Data Dapur menggunakan model <strong style={S.strong}>sekali bayar (one-time payment)</strong> sebesar Rp 175.000</li>
        <li style={S.li}><strong style={S.strong}>Tidak ada biaya langganan, biaya bulanan, atau biaya tersembunyi</strong></li>
        <li style={S.li}>Pengguna yang sudah membeli di harga saat ini tidak akan dikenakan biaya tambahan meskipun harga berubah di masa mendatang</li>
        <li style={S.li}>Pembayaran diproses melalui onetap.id — platform pembayaran pihak ketiga</li>
      </ul>

      <h2 style={S.h2}>4. Larangan Penggunaan</h2>
      <p style={S.p}>Pengguna dilarang:</p>
      <ul style={S.ul}>
        <li style={S.li}>Melakukan reverse engineering, dekompilasi, atau disassembly terhadap aplikasi</li>
        <li style={S.li}>Menjual, menyewakan, atau memberikan akses akun kepada pihak lain</li>
        <li style={S.li}>Menggunakan aplikasi untuk tujuan yang melanggar hukum Indonesia</li>
        <li style={S.li}>Mencoba mengakses data pengguna lain</li>
        <li style={S.li}>Menggunakan bot atau skrip otomatis untuk mengakses layanan</li>
      </ul>

      <h2 style={S.h2}>5. Batasan Tanggung Jawab</h2>
      <p style={S.p}>
        Tata Data Dapur disediakan "sebagaimana adanya" (<em>as-is</em>). Kami berupaya menjaga
        ketersediaan dan keandalan layanan, namun:
      </p>
      <ul style={S.ul}>
        <li style={S.li}>
          <strong style={S.strong}>Muhammad Hasbi Ash Shiddieqy / Tata Data tidak bertanggung jawab</strong> atas
          kerugian bisnis, kehilangan pendapatan, atau kerugian tidak langsung lainnya yang timbul dari
          penggunaan atau ketidaktersediaan layanan
        </li>
        <li style={S.li}>Pengguna bertanggung jawab penuh atas kebenaran dan kelengkapan data yang diinput ke dalam aplikasi</li>
        <li style={S.li}>Kami tidak menjamin bahwa aplikasi akan berjalan tanpa gangguan atau bebas dari bug setiap saat</li>
      </ul>

      <h2 style={S.h2}>6. Perubahan Layanan</h2>
      <ul style={S.ul}>
        <li style={S.li}>Fitur dapat ditambah, diperbarui, atau dimodifikasi tanpa pemberitahuan khusus</li>
        <li style={S.li}>Update fitur diberikan gratis selamanya bagi pengguna yang sudah membeli</li>
        <li style={S.li}>Jika layanan dihentikan, pengguna akan diberi pemberitahuan minimal <strong style={S.strong}>30 hari sebelumnya</strong> melalui email yang terdaftar</li>
      </ul>

      <h2 style={S.h2}>7. Hukum yang Berlaku</h2>
      <p style={S.p}>
        Syarat & Ketentuan ini diatur oleh dan ditafsirkan sesuai dengan{' '}
        <strong style={S.strong}>hukum Republik Indonesia</strong>. Setiap perselisihan yang timbul
        akan diselesaikan secara musyawarah terlebih dahulu.
      </p>

      <h2 style={S.h2}>8. Perubahan Syarat & Ketentuan</h2>
      <p style={S.p}>
        Kami berhak memperbarui Syarat & Ketentuan ini sewaktu-waktu. Perubahan signifikan akan
        diberitahukan melalui email. Penggunaan berkelanjutan setelah perubahan dianggap sebagai
        penerimaan syarat yang diperbarui.
      </p>

      <h2 style={S.h2}>9. Hubungi Kami</h2>
      <p style={S.p}>
        Pertanyaan terkait Syarat & Ketentuan:
      </p>
      <ul style={S.ul}>
        <li style={S.li}>Email: <a href="mailto:hasbi12.muhammad@gmail.com" style={{ color: '#B5532A' }}>hasbi12.muhammad@gmail.com</a></li>
        <li style={S.li}>WhatsApp: tersedia via tombol di halaman utama</li>
      </ul>
    </LegalLayout>
  )
}
```

- [ ] **Step 2: Buka `http://localhost:5173/terms` di browser**

Pastikan halaman tampil dengan semua 9 seksi, styling konsisten dengan PrivacyPage.

- [ ] **Step 3: Commit**

```bash
git add src/pages/TermsPage.jsx
git commit -m "feat: add Syarat & Ketentuan page (/terms)"
```

---

## Task 6: Buat RefundPage

**Files:**
- Create: `src/pages/RefundPage.jsx`

- [ ] **Step 1: Buat file**

Buat `src/pages/RefundPage.jsx`:

```jsx
import React from 'react'
import LegalLayout from '../components/legal/LegalLayout'

const S = {
  h2: {
    fontFamily: 'Fraunces, serif',
    fontSize: '22px', fontWeight: 700,
    color: '#1B1208', marginTop: '40px', marginBottom: '12px',
    letterSpacing: '-0.3px',
  },
  p: {
    marginBottom: '16px', color: '#3D2510',
  },
  ul: {
    paddingLeft: '20px', marginBottom: '16px', color: '#3D2510',
  },
  li: {
    marginBottom: '8px',
  },
  strong: {
    color: '#1B1208', fontWeight: 700,
  },
  infoBox: {
    background: 'rgba(181,83,42,0.06)',
    border: '1px solid rgba(181,83,42,0.2)',
    borderRadius: '14px',
    padding: '20px 24px',
    marginBottom: '24px',
  },
}

export default function RefundPage() {
  return (
    <LegalLayout
      title="Kebijakan Pengembalian Dana"
      subtitle="Harap baca kebijakan ini sebelum melakukan pembelian."
      lastUpdated="Juni 2025"
    >
      {/* Summary box */}
      <div style={S.infoBox}>
        <p style={{ ...S.p, marginBottom: 0, fontWeight: 700, color: '#8B3D1A' }}>
          Ringkasan: Tata Data Dapur adalah produk digital dengan model sekali bayar.{' '}
          <strong style={{ color: '#B5532A' }}>Tidak ada pengembalian dana</strong> setelah pembayaran berhasil diproses.
        </p>
      </div>

      <h2 style={S.h2}>1. Kebijakan Umum</h2>
      <p style={S.p}>
        Tata Data Dapur adalah <strong style={S.strong}>produk perangkat lunak digital</strong>. Segera setelah
        pembayaran terkonfirmasi, akses ke aplikasi diberikan secara langsung kepada pembeli. Karena
        sifat produk digital yang tidak dapat "dikembalikan" seperti barang fisik,{' '}
        <strong style={S.strong}>kami tidak menerima permintaan pengembalian dana</strong> dalam kondisi apapun.
      </p>

      <h2 style={S.h2}>2. Mengapa Tidak Ada Refund?</h2>
      <ul style={S.ul}>
        <li style={S.li}>Akses ke aplikasi diberikan <strong style={S.strong}>seketika</strong> setelah pembayaran berhasil</li>
        <li style={S.li}>Produk digital tidak bisa "dikembalikan" karena sudah bisa digunakan sejak pertama kali akses</li>
        <li style={S.li}>Harga Rp 175.000 sudah mencerminkan nilai produk yang kamu dapatkan seumur hidup</li>
      </ul>

      <h2 style={S.h2}>3. Masalah Teknis</h2>
      <p style={S.p}>
        Jika kamu mengalami kendala teknis serius yang membuat aplikasi tidak bisa digunakan sama sekali:
      </p>
      <ul style={S.ul}>
        <li style={S.li}>Hubungi kami segera melalui WhatsApp atau email</li>
        <li style={S.li}>Kami akan berupaya menyelesaikan masalah dalam <strong style={S.strong}>7 hari kerja</strong></li>
        <li style={S.li}>Jika masalah tidak bisa diselesaikan dalam waktu tersebut, situasi akan dievaluasi secara case-by-case</li>
      </ul>

      <h2 style={S.h2}>4. Saran Sebelum Membeli</h2>
      <p style={S.p}>
        Kami sangat menganjurkan calon pengguna untuk:
      </p>
      <ul style={S.ul}>
        <li style={S.li}>Membaca deskripsi fitur secara lengkap di halaman utama</li>
        <li style={S.li}>Menghubungi kami via WhatsApp terlebih dahulu jika ada pertanyaan tentang kesesuaian aplikasi untuk kebutuhanmu</li>
        <li style={S.li}>Memastikan kamu memiliki koneksi internet yang stabil untuk menggunakan aplikasi berbasis web ini</li>
      </ul>

      <h2 style={S.h2}>5. Hubungi Kami</h2>
      <p style={S.p}>
        Ada pertanyaan sebelum membeli atau masalah setelah pembelian?
      </p>
      <ul style={S.ul}>
        <li style={S.li}>Email: <a href="mailto:hasbi12.muhammad@gmail.com" style={{ color: '#B5532A' }}>hasbi12.muhammad@gmail.com</a></li>
        <li style={S.li}>WhatsApp: tersedia via tombol di halaman utama</li>
      </ul>
    </LegalLayout>
  )
}
```

- [ ] **Step 2: Buka `http://localhost:5173/refund` di browser**

Pastikan info box terracotta muncul di atas, semua seksi tampil, styling konsisten.

- [ ] **Step 3: Commit**

```bash
git add src/pages/RefundPage.jsx
git commit -m "feat: add Kebijakan Pengembalian Dana page (/refund)"
```

---

## Task 7: Update Footer — tambah legal links

**Files:**
- Modify: `src/components/Footer.jsx`

- [ ] **Step 1: Update Footer.jsx**

Ganti seluruh isi `src/components/Footer.jsx` dengan:

```jsx
import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{
      background: '#120D07',
      padding: '32px 24px',
      textAlign: 'center',
    }}>
      <div style={{
        fontFamily: 'Fraunces, serif',
        fontSize: '18px',
        color: '#3D2A18',
        marginBottom: '8px',
      }}>
        Tata Data Dapur
      </div>
      <p style={{
        fontSize: '12px',
        color: '#3D2A18',
        margin: '0 0 16px',
      }}>
        © 2025 Tata Data Dapur · Untuk UMKM Kuliner & Produksi Ringan Indonesia
      </p>
      <div style={{
        display: 'flex',
        gap: '8px',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}>
        {[
          { to: '/privacy', label: 'Kebijakan Privasi' },
          { to: '/terms', label: 'Syarat & Ketentuan' },
          { to: '/refund', label: 'Kebijakan Pengembalian' },
        ].map((link, i, arr) => (
          <React.Fragment key={link.to}>
            <Link
              to={link.to}
              style={{
                fontSize: '12px',
                color: '#5A4030',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#B5532A' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#5A4030' }}
            >
              {link.label}
            </Link>
            {i < arr.length - 1 && (
              <span style={{ fontSize: '12px', color: '#2A1A0E' }}>·</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Verifikasi**

Buka `http://localhost:5173`:
- Footer sekarang menampilkan 3 link di bawah copyright
- Klik "Kebijakan Privasi" → navigasi ke `/privacy`
- Klik "Syarat & Ketentuan" → navigasi ke `/terms`
- Klik "Kebijakan Pengembalian" → navigasi ke `/refund`
- Di halaman legal, footer juga muncul dan link-linknya berfungsi

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.jsx
git commit -m "feat: add legal page links to Footer"
```

---

## Task 8: Verifikasi akhir & production build

**Files:**
- No file changes — verifikasi only

- [ ] **Step 1: Jalankan production build**

```bash
npm run build
```

Expected: build berhasil tanpa error, output di `dist/`.

- [ ] **Step 2: Preview production build**

```bash
npm run preview
```

Buka `http://localhost:4173`. Test semua 4 routes:
- `http://localhost:4173/` — landing page normal
- `http://localhost:4173/privacy` — Kebijakan Privasi
- `http://localhost:4173/terms` — Syarat & Ketentuan
- `http://localhost:4173/refund` — Kebijakan Pengembalian

**Catatan:** Jika deploy ke static host (Netlify, Vercel, dll.), tambahkan SPA fallback:
- **Netlify:** buat file `public/_redirects` dengan isi `/* /index.html 200`
- **Vercel:** sudah otomatis handle SPA routing

- [ ] **Step 3: Commit akhir (jika ada perubahan)**

```bash
git add -A
git commit -m "feat: legal pages complete — Privacy, Terms, Refund"
```

---

## Catatan Deployment

Jika di-host di static server biasa (nginx/apache), perlu konfigurasi tambahan agar route `/privacy`, `/terms`, `/refund` tidak 404 saat di-refresh. Solusi paling umum:

**Netlify** — buat `public/_redirects`:
```
/* /index.html 200
```

**Nginx** — tambahkan ke konfigurasi:
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```
