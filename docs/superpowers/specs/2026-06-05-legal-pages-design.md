# Legal Pages — Tata Data Dapur Landing Page

**Date:** 2026-06-05  
**Status:** Approved  
**Owner:** Muhammad Hasbi Ash Shiddieqy / Tata Data

---

## Context

Tata Data Dapur adalah aplikasi manajemen HPP dan laporan keuangan untuk UMKM kuliner Indonesia. Pembayaran one-time Rp 175.000 via onetap.id (eksternal). Login dengan email/password, data bisnis disimpan di Supabase. Support via WhatsApp.

Landing page saat ini: Vite + React, single-page, belum ada routing.

---

## Pages

### 1. Kebijakan Privasi — `/privacy`

**Data yang dikumpulkan:**
- Email dan password (dikelola Supabase — password tidak pernah disimpan plaintext)
- Data bisnis pengguna: nama bahan baku, resep, pembelian, penjualan, pengeluaran, produksi

**Tujuan penggunaan:**
- Menjalankan layanan saja
- Tidak dijual atau dibagikan ke pihak ketiga kecuali yang disebutkan di bawah

**Pihak ketiga:**
- Supabase (database & autentikasi)
- onetap.id (proses pembayaran — data pembayaran tidak disimpan di sistem kami)

**Keamanan:**
- Data dienkripsi in-transit (HTTPS) dan at-rest (Supabase)
- Akses data hanya milik pengguna sendiri, terisolasi per akun

**Hak pengguna:**
- Bisa meminta hapus akun dan seluruh data via WhatsApp atau email
- Bisa meminta salinan data mereka

**Kontak:** hasbi12.muhammad@gmail.com

---

### 2. Syarat & Ketentuan — `/terms`

**Pengguna yang dimaksud:** Pemilik usaha kuliner dan produksi ringan di Indonesia.

**Akun & Lisensi:**
- Satu pembelian = satu akun, tidak bisa dibagikan
- Akun tidak bisa dipindahtangankan

**Pembayaran:**
- Sekali bayar Rp 175.000, tidak ada biaya langganan atau biaya tambahan
- Harga lama tetap berlaku bagi pengguna yang sudah membeli meskipun ada perubahan harga di masa mendatang

**Larangan:**
- Reverse engineering aplikasi
- Menjual atau menyewakan akses ke pihak lain
- Menggunakan untuk tujuan ilegal

**Batasan tanggung jawab:**
- Muhammad Hasbi Ash Shiddieqy / Tata Data tidak bertanggung jawab atas kerugian bisnis yang timbul dari penggunaan atau ketidaktersediaan layanan
- Pengguna bertanggung jawab penuh atas kebenaran data yang diinput

**Perubahan layanan:**
- Fitur dapat diupdate atau ditambah tanpa pemberitahuan khusus
- Layanan dapat dihentikan dengan pemberitahuan minimal 30 hari

**Hukum yang berlaku:** Hukum Republik Indonesia

**Kontak:** hasbi12.muhammad@gmail.com

---

### 3. Kebijakan Pengembalian Dana — `/refund`

**Posisi:** Tidak ada pengembalian dana (no refund).

**Alasan:** Akses ke aplikasi diberikan langsung setelah pembayaran terkonfirmasi. Produk digital tidak bisa "dikembalikan".

**Masalah teknis:** Jika ada kendala teknis yang tidak bisa diselesaikan dalam 7 hari kerja setelah dilaporkan, akan dievaluasi case-by-case via WhatsApp.

**Saran sebelum membeli:** Calon pengguna dianjurkan menghubungi WhatsApp terlebih dahulu jika ada pertanyaan sebelum melakukan pembayaran.

**Kontak:** WhatsApp / hasbi12.muhammad@gmail.com

---

## Technical Design

### Routing

Tambah `react-router-dom` ke project. Update `App.jsx` dengan `BrowserRouter`:

```
/           → LandingPage (semua komponen saat ini)
/privacy    → PrivacyPage
/terms      → TermsPage
/refund     → RefundPage
```

### File Structure

```
src/
  pages/
    PrivacyPage.jsx
    TermsPage.jsx
    RefundPage.jsx
  components/
    legal/
      LegalLayout.jsx   ← shared wrapper (navbar, back link, footer)
```

### Visual Design

Konsisten dengan branding landing page:
- Background: `#FBF6EC` (cream)
- Teks utama: `#1B1208`
- Aksen: `#B5532A` (terracotta)
- Font heading: Fraunces serif
- Font body: Plus Jakarta Sans, 15px, line-height 1.7
- Max-width: 680px, centered
- Padding: 64px 24px

**Header section tiap halaman:**
- Terracotta strip tipis di atas
- Judul halaman (Fraunces, besar)
- Tanggal berlaku ("Berlaku sejak: Juni 2025")

**Navigation:**
- Navbar tetap muncul (link balik ke home)
- Back button: "← Kembali ke Beranda" di bawah navbar
- Footer tetap muncul

### Footer Update

Tambah link di Footer.jsx:

```
Kebijakan Privasi · Syarat & Ketentuan · Kebijakan Pengembalian
```

---

## Out of Scope

- Halaman Cookie Policy (tidak ada analytics tracking saat ini)
- Form kontak online (cukup link email/WhatsApp)
- Multi-bahasa (hanya Bahasa Indonesia)
