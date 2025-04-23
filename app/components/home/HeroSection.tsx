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
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(229, 115, 115, 0.3)',
    border: 'none',
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
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(229, 115, 115, 0.1)',
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
    up: { y: [-10, 10, -10], transition: { repeat: Infinity, duration: 3, ease: "easeInOut" } },
    down: { y: [10, -10, 10], transition: { repeat: Infinity, duration: 2.5, ease: "easeInOut" } },
    left: { x: [-10, 10, -10], transition: { repeat: Infinity, duration: 3.5, ease: "easeInOut" } },
  };

  const buttonHoverAnimation = {
    primary: {
      scale: 1.05,
      boxShadow: '0 4px 12px rgba(229, 115, 115, 0.5)',
      transition: {
        duration: 0.2
      }
    },
    secondary: {
      scale: 1.05, 
      boxShadow: '0 4px 12px rgba(229, 115, 115, 0.2)',
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <section style={styles.heroSection}>
      {/* Background shapes */}
      <motion.div 
        style={styles.shape1} 
        initial={{ scale: 0.8, opacity: 0.8 }}
        animate={{ ...floatAnimation.up, scale: 1, opacity: 1 }}
      />
      <motion.div 
        style={styles.shape2} 
        initial={{ scale: 0.8, opacity: 0.8 }}
        animate={{ ...floatAnimation.down, scale: 1, opacity: 1 }}
      />
      <motion.div 
        style={styles.shape3} 
        initial={{ scale: 0.8, opacity: 0.8 }}
        animate={{ ...floatAnimation.left, scale: 1, opacity: 1 }}
      />

      <div style={styles.container}>
        <div style={styles.contentWrapper}>
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
            <motion.div 
              className="w-full md:w-1/2"
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
                Profesjonalna opieka dla Twojego pupila
              </motion.h1>
              <motion.p 
                style={styles.subheading}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Zapewniamy kompleksową opiekę nad zwierzętami domowymi w Poznaniu i okolicach. 
                Nasi doświadczeni opiekunowie zapewnią Twojemu pupilowi bezpieczeństwo i komfort.
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

            <motion.div 
              className="w-full md:w-1/2"
              style={styles.rightCol} 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div 
                style={styles.imageContainer}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/images/pets/happy-dog.svg"
                  alt="Happy Dog"
                  width={500}
                  height={375}
                  className="rounded-lg"
                  style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
                  priority
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 