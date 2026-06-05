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
