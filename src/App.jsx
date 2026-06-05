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
