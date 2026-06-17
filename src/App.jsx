import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import PainSection from './components/PainSection'
import MarqueeStrip from './components/MarqueeStrip'
import SolutionSection from './components/SolutionSection'
import HowItWorks from './components/HowItWorks'
import ValueStack from './components/ValueStack'
import FAQ from './components/FAQ'
import Pricing from './components/Pricing'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import StickyCTA from './components/StickyCTA'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import RefundPage from './pages/RefundPage'
import BlogIndexPage from './pages/BlogIndexPage'
import BlogPostPage from './pages/BlogPostPage'
import HelpCenterPage from './pages/HelpCenterPage'
import BeliPage from './pages/BeliPage'
import { useSeo } from './hooks/useSeo'

function LandingPage() {
  useSeo({
    title: 'Tata Data Dapur — Biar Dapur Tetap Ngebul, Keuangan Tetap Jelas',
    description: 'Tata Data Dapur — Aplikasi manajemen bisnis F&B dan bakery. Hitung HPP otomatis, pantau stok FIFO, laporan keuangan lengkap. Bayar sekali, pakai selamanya.',
    path: '/',
  })
  return (
    <div>
      <Navbar />
      <Hero />
      <PainSection />
      <MarqueeStrip />
      <SolutionSection />
      <HowItWorks />
      <ValueStack />
      <FAQ />
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
        <Route path="/blog" element={<BlogIndexPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/help" element={<HelpCenterPage />} />
        <Route path="/beli" element={<BeliPage />} />
      </Routes>
    </BrowserRouter>
  )
}
