import HeroSection from '@/components/hero/HeroSection'
import ParallaxImageSection from '@/components/parallax/ParallaxImageSection'
import ProductSection from '@/components/product/ProductSection'

export default function Home() {
  return (
    <div className=''>
      <HeroSection />
      <ProductSection />
      <ParallaxImageSection />
    </div>
  )
}
