import { Navbar } from '@/components/layout/navbar'
import { Hero } from '@/components/landing/hero'
import { Features } from '@/components/landing/features'
import { Why } from '@/components/landing/why'
import { Pricing } from '@/components/landing/pricing'
import { Footer } from '@/components/layout/footer'

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <Why />
      <Pricing />
      <Footer />
    </main>
  )
}
