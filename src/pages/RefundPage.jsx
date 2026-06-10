import React from 'react'
import LegalLayout from '../components/legal/LegalLayout'
import { useSeo } from '../hooks/useSeo'

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
  useSeo({
    title: 'Kebijakan Pengembalian Dana | Tata Data Dapur',
    description: 'Kebijakan pengembalian dana (refund) untuk layanan Tata Data Dapur.',
    path: '/refund',
  })
  return (
    <LegalLayout
      title="Kebijakan Pengembalian Dana"
      subtitle="Harap baca kebijakan ini sebelum melakukan pembelian."
      lastUpdated="April 2026"
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
