import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSection from './components/home/HeroSection';
import CtaSection from './components/home/CtaSection';
import GallerySection from './components/home/GallerySection';
import TestimonialSlider from './components/home/TestimonialSlider';
import InstagramFeed from './components/home/InstagramFeed';
import EnhancedServicesSection from './components/home/EnhancedServicesSection';
import { CSSProperties } from 'react';

// Add direct style object with proper typing
const styles: Record<string, CSSProperties> = {
  main: {
    minHeight: '100vh',
    backgroundColor: 'white',
    fontFamily: 'Nunito Sans, sans-serif',
  }
};

export default function Home() {
  return (
    <main style={styles.main}>
      <Navbar />
      <HeroSection />
      <EnhancedServicesSection />
      <GallerySection />
      <TestimonialSlider />
      <InstagramFeed />
      <CtaSection />
      <Footer />
      </main>
  );
}
