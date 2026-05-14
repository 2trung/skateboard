import HeroSection from '@/components/hero/HeroSection'
import ParallaxImageSection from '@/components/parallax/ParallaxImageSection'
import ProductSection from '@/components/product/ProductSection'
import VideoSection from '@/components/video/VideoSection'

export default function Home() {
  return (
    <div className=''>
      <HeroSection />
      <ProductSection />
      <ParallaxImageSection />
      <VideoSection />
    </div>
  )
}
