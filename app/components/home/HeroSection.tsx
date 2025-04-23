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
    background: 'linear-gradient(135deg, #FFE0F0 0%, #F0E6FF 50%, #FFE0ED 100%)',
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
    fontSize: '3rem',
    fontWeight: 800,
    backgroundImage: 'linear-gradient(45deg, #993366, #9966CC, #CC6699)',
    backgroundSize: '200% auto',
    animation: 'gradientText 3s linear infinite',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    color: 'rgba(0,0,0,0.5)', // Fallback color
    marginBottom: '1rem',
    lineHeight: 1.2,
    textShadow: '0 2px 10px rgba(153, 102, 153, 0.3)',
  },
  subheading: {
    fontSize: '1.5rem',
    fontWeight: 400,
    color: '#6A3066',
    marginBottom: '1.5rem',
    lineHeight: 1.6,
    textShadow: '0 1px 3px rgba(153, 102, 153, 0.2)',
  },
  buttonGroup: {
    display: 'flex',
    gap: '1.5rem',
    marginTop: '1.5rem',
  },
  primaryButton: {
    background: 'linear-gradient(45deg, #FF6B9E, #B86EFF)',
    color: 'white',
    padding: '1rem 2rem',
    borderRadius: '9999px',
    fontWeight: 700,
    fontSize: '1.2rem',
    textDecoration: 'none',
    display: 'inline-block',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(184, 110, 255, 0.4)',
    border: 'none',
    backgroundSize: '200% auto',
    animation: 'shimmerButton 3s linear infinite',
  },
  secondaryButton: {
    background: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    color: '#B86EFF',
    padding: '1rem 2rem',
    borderRadius: '9999px',
    fontWeight: 700,
    fontSize: '1.2rem',
    textDecoration: 'none',
    display: 'inline-block',
    border: '2px solid #B86EFF',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(184, 110, 255, 0.2)',
  },
  imageContainer: {
    width: '100%',
    maxWidth: '500px',
    height: 'auto',
    position: 'relative' as const,
  },
  catEmoji1: {
    position: 'absolute' as const,
    top: '10%',
    left: '5%',
    fontSize: '80px',
    zIndex: 1,
    filter: 'drop-shadow(0 0 10px rgba(255, 182, 223, 0.7))',
  },
  catEmoji2: {
    position: 'absolute' as const,
    bottom: '15%',
    right: '10%',
    fontSize: '100px',
    zIndex: 1,
    filter: 'drop-shadow(0 0 10px rgba(184, 110, 255, 0.7))',
  },
  catEmoji3: {
    position: 'absolute' as const,
    top: '60%',
    left: '15%',
    fontSize: '70px',
    zIndex: 1,
    filter: 'drop-shadow(0 0 10px rgba(255, 107, 158, 0.7))',
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
      boxShadow: '0 8px 25px rgba(184, 110, 255, 0.6)',
      transition: {
        duration: 0.3
      }
    },
    secondary: {
      scale: 1.1, 
      boxShadow: '0 8px 25px rgba(184, 110, 255, 0.4)',
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <section style={styles.heroSection}>
      {/* Background cat emoticons */}
      <motion.div 
        style={styles.catEmoji1} 
        initial={{ scale: 0.8, opacity: 0.8 }}
        animate={{ ...floatAnimation.up, scale: 1, opacity: 1 }}
      >
        😺
      </motion.div>
      <motion.div 
        style={styles.catEmoji2} 
        initial={{ scale: 0.8, opacity: 0.8 }}
        animate={{ ...floatAnimation.down, scale: 1, opacity: 1 }}
      >
        😻
      </motion.div>
      <motion.div 
        style={styles.catEmoji3} 
        initial={{ scale: 0.8, opacity: 0.8 }}
        animate={{ ...floatAnimation.left, scale: 1, opacity: 1 }}
      >
        🐱
      </motion.div>

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
                    Nasze usługi ✨
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={buttonHoverAnimation.secondary}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/contact" style={styles.secondaryButton}>
                    Kontakt 📱
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
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/images/pets/happy-dog.svg"
                  alt="Happy Dog"
                  width={500}
                  height={375}
                  className="rounded-lg"
                  style={{ 
                    objectFit: 'cover', 
                    width: '100%', 
                    height: 'auto',
                    filter: 'drop-shadow(0 10px 15px rgba(153, 102, 153, 0.3))'
                  }}
                  priority
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes gradientText {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @keyframes shimmerButton {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </section>
  );
} 