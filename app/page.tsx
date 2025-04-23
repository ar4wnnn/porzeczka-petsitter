import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSection from './components/home/HeroSection';
import TestimonialsSection from './components/home/TestimonialsSection';
import CtaSection from './components/home/CtaSection';
import GallerySection from './components/home/GallerySection';
import TestimonialSlider from './components/home/TestimonialSlider';
import InstagramFeed from './components/home/InstagramFeed';
import EnhancedServicesSection from './components/home/EnhancedServicesSection';
import TestComponent from './components/ui/TestComponent';

// Add direct style object
const styles = {
  main: {
    minHeight: '100vh',
    backgroundColor: 'white',
    fontFamily: 'Nunito Sans, sans-serif',
  },
  fixedTest: {
    position: 'fixed',
    top: '1rem',
    right: '1rem',
    zIndex: 50,
    padding: '1rem',
    backgroundColor: 'blue',
    color: 'white',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  testTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  testText: {
    fontSize: '1rem',
  }
};

export default function Home() {
  return (
    <main style={styles.main}>
      {/* Test Component with Direct Styling */}
      <div style={styles.fixedTest}>
        <div style={styles.testTitle}>Test Component</div>
        <div style={styles.testText}>This is a test component with inline styles.</div>
      </div>
      
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
