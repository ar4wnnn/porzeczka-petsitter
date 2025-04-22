import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSection from './components/home/HeroSection';
import TestimonialsSection from './components/home/TestimonialsSection';
import CtaSection from './components/home/CtaSection';
import GallerySection from './components/home/GallerySection';
import TestimonialSlider from './components/home/TestimonialSlider';
import InstagramFeed from './components/home/InstagramFeed';
import EnhancedServicesSection from './components/home/EnhancedServicesSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <EnhancedServicesSection />
      <GallerySection />
      <TestimonialSlider />
      <InstagramFeed />
      <TestimonialsSection />
      <CtaSection />
      <Footer />
      </main>
  );
}
