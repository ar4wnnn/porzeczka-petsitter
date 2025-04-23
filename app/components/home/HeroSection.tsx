'use client';

import Link from 'next/link';
import Image from 'next/image';
import { CSSProperties } from 'react';
import { motion } from 'framer-motion';

// Define styles with proper typing
const styles: Record<string, CSSProperties> = {
  heroSection: {
    position: 'relative' as const,
    minHeight: '100vh',
    width: '100%',
    overflow: 'hidden',
    backgroundColor: '#FFF9F6',
    paddingTop: '6rem',
    paddingBottom: '3rem',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    position: 'relative' as const,
    zIndex: 10,
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    minHeight: 'calc(100vh - 9rem)',
  },
  rowClass: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '2rem',
  },
  leftCol: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    gap: '1.5rem',
  },
  rightCol: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative' as const,
  },
  heading: {
    fontSize: '2.5rem',
    fontWeight: 800,
    color: '#4E342E',
    marginBottom: '1rem',
    lineHeight: 1.2,
  },
  subheading: {
    fontSize: '1.25rem',
    fontWeight: 400,
    color: '#795548',
    marginBottom: '1.5rem',
    lineHeight: 1.6,
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem',
  },
  primaryButton: {
    backgroundColor: '#E57373',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '9999px',
    fontWeight: 600,
    textDecoration: 'none',
    display: 'inline-block',
    transition: 'all 0.3s ease',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    color: '#E57373',
    padding: '0.75rem 1.5rem',
    borderRadius: '9999px',
    fontWeight: 600,
    textDecoration: 'none',
    display: 'inline-block',
    border: '2px solid #E57373',
    transition: 'all 0.3s ease',
  },
  imageContainer: {
    width: '100%',
    maxWidth: '500px',
    height: 'auto',
    position: 'relative' as const,
  },
  shape1: {
    position: 'absolute' as const,
    top: '10%',
    left: '5%',
    width: '150px',
    height: '150px',
    borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
    backgroundColor: 'rgba(229, 115, 115, 0.2)',
    zIndex: 1,
  },
  shape2: {
    position: 'absolute' as const,
    bottom: '15%',
    right: '10%',
    width: '180px',
    height: '180px',
    borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
    backgroundColor: 'rgba(121, 85, 72, 0.15)',
    zIndex: 1,
  },
  shape3: {
    position: 'absolute' as const,
    top: '60%',
    left: '15%',
    width: '120px',
    height: '120px',
    borderRadius: '40% 60% 60% 40% / 40% 40% 60% 60%',
    backgroundColor: 'rgba(156, 204, 101, 0.2)',
    zIndex: 1,
  }
};

export default function HeroSection() {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const floatAnimation = {
    up: { y: -10, transition: { yoyo: Infinity, duration: 3 } },
    down: { y: 10, transition: { yoyo: Infinity, duration: 2.5 } },
    left: { x: -10, transition: { yoyo: Infinity, duration: 3.5 } },
  };

  return (
    <section className="hero-section" style={styles.heroSection}>
      {/* Background shapes */}
      <motion.div 
        style={styles.shape1} 
        initial={{ scale: 0.8 }}
        animate={{ ...floatAnimation.up, scale: 1 }}
      />
      <motion.div 
        style={styles.shape2} 
        initial={{ scale: 0.8 }}
        animate={{ ...floatAnimation.down, scale: 1 }}
      />
      <motion.div 
        style={styles.shape3} 
        initial={{ scale: 0.8 }}
        animate={{ ...floatAnimation.left, scale: 1 }}
      />

      <div className="container" style={styles.container}>
        <div style={styles.contentWrapper}>
          <div style={styles.rowClass} className="md:flex-row md:items-start">
            <motion.div 
              style={styles.leftCol} 
              className="md:w-1/2"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <h1 style={styles.heading}>
                Profesjonalna opieka dla Twojego pupila
              </h1>
              <p style={styles.subheading}>
                Zapewniamy kompleksową opiekę nad zwierzętami domowymi w Poznaniu i okolicach. 
                Nasi doświadczeni opiekunowie zapewnią Twojemu pupilowi bezpieczeństwo i komfort.
              </p>
              <div style={styles.buttonGroup}>
                <Link href="/services" className="btn btn-primary" style={styles.primaryButton}>
                  Nasze usługi
                </Link>
                <Link href="/contact" className="btn btn-secondary" style={styles.secondaryButton}>
                  Kontakt
                </Link>
              </div>
            </motion.div>

            <motion.div 
              style={styles.rightCol} 
              className="md:w-1/2"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <div style={styles.imageContainer}>
                <Image
                  src="/images/pets/happy-dog.svg"
                  alt="Happy Dog"
                  width={500}
                  height={375}
                  className="rounded-lg"
                  style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 