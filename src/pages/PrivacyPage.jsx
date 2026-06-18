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
}

export default function PrivacyPage() {
  useSeo({
    title: 'Kebijakan Privasi | Tata Data Dapur',
    description: 'Kebijakan privasi Tata Data Dapur: bagaimana kami mengumpulkan, menggunakan, dan melindungi data Anda.',
    path: '/privacy',
  })
  return (
    <LegalLayout
      title="Kebijakan Privasi"
      subtitle="Kami menghargai privasi kamu dan berkomitmen melindungi data yang kamu percayakan kepada kami."
      lastUpdated="April 2026"
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
        <li style={S.li}>Email: <a href="mailto:info@tatadatadapur.my.id" style={{ color: '#B5532A' }}>info@tatadatadapur.my.id</a></li>
        <li style={S.li}>WhatsApp: tersedia via tombol di halaman utama</li>
      </ul>
    </LegalLayout>
  )
}
