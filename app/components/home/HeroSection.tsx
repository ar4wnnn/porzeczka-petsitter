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
    backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(\'/images/hero.png\')',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    paddingTop: '6rem',
    paddingBottom: '3rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    position: 'relative' as const,
    zIndex: 10,
    textAlign: 'center',
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 9rem)',
    width: '100%',
  },
  leftCol: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1.5rem',
    width: '100%',
    maxWidth: '800px',
  },
  heading: {
    fontSize: '3.5rem',
    fontWeight: 800,
    color: 'var(--frost)',
    marginBottom: '1rem',
    lineHeight: 1.2,
    textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)',
  },
  subheading: {
    fontSize: '1.75rem',
    fontWeight: 400,
    color: 'var(--frost)',
    marginBottom: '1.5rem',
    lineHeight: 1.6,
    textShadow: '0 1px 6px rgba(0, 0, 0, 0.7)',
  },
  buttonGroup: {
    display: 'flex',
    gap: '1.5rem',
    marginTop: '1.5rem',
  },
  primaryButton: {
    background: 'linear-gradient(to right, var(--sky-dark), var(--sky-medium))',
    color: 'var(--frost)',
    padding: '1rem 2rem',
    borderRadius: '9999px',
    fontWeight: 700,
    fontSize: '1.2rem',
    textDecoration: 'none',
    display: 'inline-block',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(56, 189, 248, 0.3)',
    border: 'none',
  },
  secondaryButton: {
    background: 'transparent',
    color: 'var(--sky-dark)',
    padding: '1rem 2rem',
    borderRadius: '9999px',
    fontWeight: 700,
    fontSize: '1.2rem',
    textDecoration: 'none',
    display: 'inline-block',
    border: '2px solid var(--sky-dark)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(186, 230, 253, 0.2)',
  },
  imageContainer: {
    width: '100%',
    maxWidth: '500px',
    height: 'auto',
    position: 'relative' as const,
  },
  rainbowText: {
    backgroundImage: 'linear-gradient(45deg, var(--sky-medium), var(--sky-light), var(--frost), var(--sky-light))',
    backgroundSize: '300% auto',
    animation: 'rainbowText 3s linear infinite',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontWeight: 900,
  },
  boldText: {
    fontWeight: 900,
  },
  normalText: {
    fontWeight: 400,
  },
  lightText: {
    fontWeight: 300,
  },
  emojiSpan: {
    display: 'inline-block',
    color: 'inherit',
    WebkitTextFillColor: 'initial',
    backgroundImage: 'none',
  },
  darkBlueText: {
    color: 'var(--stone-dark)',
    fontWeight: 700,
  },
  mediumBlueText: {
    color: 'var(--stone-medium)',
    fontWeight: 600,
  },
  accentBlueText: {
    color: 'var(--sky-medium)',
    fontWeight: 600,
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
    up: { y: [-15, 15, -15], rotate: [-5, 5, -5], transition: { repeat: Infinity, duration: 3, ease: "easeInOut" } },
    down: { y: [15, -15, 15], rotate: [5, -5, 5], transition: { repeat: Infinity, duration: 2.5, ease: "easeInOut" } },
    left: { x: [-15, 15, -15], rotate: [-5, 5, -5], transition: { repeat: Infinity, duration: 3.5, ease: "easeInOut" } },
  };

  const buttonHoverAnimation = {
    primary: {
      scale: 1.1,
      boxShadow: '0 8px 25px rgba(56, 189, 248, 0.5)',
      transition: {
        duration: 0.3
      }
    },
    secondary: {
      scale: 1.1, 
      backgroundColor: 'var(--sky-light)',
      color: 'var(--sky-dark)',
      boxShadow: '0 8px 25px rgba(186, 230, 253, 0.3)',
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <section style={styles.heroSection}>
      <div style={styles.container}>
        <div style={styles.contentWrapper}>
          <motion.div
            className="w-full"
            style={styles.leftCol}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <motion.h1
              style={styles.heading}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span style={styles.boldText}>Twój pupil </span>
              <span style={styles.rainbowText}>zasługuje na wakacje</span>
              <span style={styles.normalText}> kiedy Ciebie nie ma! </span>
            </motion.h1>
            <motion.p
              style={styles.subheading}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span style={styles.boldText}>Wyobraź sobie, </span>
              <span style={styles.normalText}>że Twój piesek </span>
              <span style={styles.rainbowText}>bawi się jak szalony </span>
              <span style={styles.normalText}>zamiast tęsknić! </span>
              <br />
              <span style={styles.lightText}>Nasi </span>
              <span style={styles.rainbowText}>super-bohaterowie petsitterzy </span>
              <span style={styles.normalText}>w Poznaniu dostarczą </span>
              <span style={styles.boldText}>tonę zabawy </span>
              <span style={styles.normalText}>i przytulasów </span>
              <span style={styles.lightText}>dla Twojego futrzaka! </span>
            </motion.p>
            <motion.div
              style={styles.buttonGroup}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.div
                whileHover={buttonHoverAnimation.primary}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/services" style={styles.primaryButton}>
                  Nasze usługi
                </Link>
              </motion.div>
              <motion.div
                whileHover={buttonHoverAnimation.secondary}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/contact" style={styles.secondaryButton}>
                  Kontakt
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes gradientText {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </section>
  );
} 