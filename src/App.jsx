import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MarqueeStrip from './components/MarqueeStrip'
import Features from './components/Features'
import Magazine from './components/Magazine'
import HowItWorks from './components/HowItWorks'
import FAQ from './components/FAQ'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <MarqueeStrip />
      <Features />
      <Magazine />
      <HowItWorks />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  )
}
