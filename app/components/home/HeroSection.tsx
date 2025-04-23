'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState, CSSProperties } from 'react';

// Define the styles with proper typing
const styles: Record<string, CSSProperties> = {
  heroContainer: {
    minHeight: '100vh',
    padding: '2rem 1rem',
    backgroundColor: '#FFF9F9',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
  },
  contentWrapper: {
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    zIndex: 2,
    position: 'relative',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: '0 -15px',
  },
  col: {
    flex: '1 0 50%',
    padding: '0 15px',
    maxWidth: '50%',
  },
  colMobile: {
    flex: '1 0 100%',
    padding: '0 15px',
    maxWidth: '100%',
  },
  heading: {
    fontSize: '3.5rem',
    fontWeight: 800,
    marginBottom: '1.5rem',
    color: '#4E342E',
  },
  subheading: {
    fontSize: '1.5rem',
    fontWeight: 400,
    marginBottom: '2rem',
    color: '#795548',
  },
  buttonContainer: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
  },
  primaryButton: {
    backgroundColor: '#E57373',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '9999px',
    fontSize: '1rem',
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
  },
  secondaryButton: {
    backgroundColor: '#81C784',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '9999px',
    fontSize: '1rem',
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '500px',
    borderRadius: '1rem',
    overflow: 'hidden',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
  },
  backgroundShape: {
    position: 'absolute',
    borderRadius: '50%',
    opacity: 0.1,
    zIndex: 1,
  },
};

export default function HeroSection() {
  // Animation variants for text
  const letterVariants = {
    hover: {
      y: [-1, -2, -2.5, -2, -1, 0, 1, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        repeatType: "loop" as const,
      }
    }
  };

  // Color fading animation for highlighted text
  const colorFadeAnimation = {
    animate: {
      color: [
        '#F9A8D4', // pink-300
        '#F472B6', // pink-400
        '#EC4899', // pink-500
        '#DB2777', // pink-600
        '#BE185D', // pink-700
        '#9D174D', // pink-800
        '#BE185D', // pink-700
        '#DB2777', // pink-600
        '#EC4899', // pink-500
        '#F472B6', // pink-400
        '#F9A8D4', // pink-300
      ],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  // Words to animate
  const animatedWords = ['Najlepsza', 'opieka', 'dla', 'Twoich', 'pupili'];
  
  // Floating shapes for background
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section style={styles.heroContainer}>
      {/* Background shapes */}
      <div 
        style={{
          ...styles.backgroundShape,
          width: '300px',
          height: '300px',
          backgroundColor: '#E57373',
          top: '10%',
          left: '5%',
        }}
      />
      <div 
        style={{
          ...styles.backgroundShape,
          width: '200px',
          height: '200px',
          backgroundColor: '#81C784',
          bottom: '10%',
          right: '5%',
        }}
      />
      <div 
        style={{
          ...styles.backgroundShape,
          width: '150px',
          height: '150px',
          backgroundColor: '#FFD180',
          top: '40%',
          right: '20%',
        }}
      />
      
      <div style={styles.contentWrapper}>
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-5 mb-md-0">
              <h1 style={styles.heading}>
                Kochająca <span style={{color: '#E57373'}}>opieka</span> dla Twoich pupili
              </h1>
              <p style={styles.subheading}>
                Profesjonalne usługi opieki nad zwierzętami z miłością i troską dla Twoich futrzastych przyjaciół.
              </p>
              <div style={styles.buttonContainer}>
                <Link href="/services" style={styles.primaryButton}>
                  Nasze Usługi
                </Link>
                <Link href="/contact" style={styles.secondaryButton}>
                  Kontakt
                </Link>
              </div>
            </div>
            <div className="col-md-6">
              <div style={styles.imageContainer}>
                <Image
                  src="/images/pets/happy-dog.svg"
                  alt="Happy dog being pet sit"
                  fill
                  style={{objectFit: 'contain'}}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 