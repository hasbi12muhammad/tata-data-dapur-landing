import React from 'react'
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

export default function App() {
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
