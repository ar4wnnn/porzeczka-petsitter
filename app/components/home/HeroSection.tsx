'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

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
    <section className="relative overflow-hidden pt-28 pb-16 bg-gradient-to-br from-red-50 to-rose-100">
      {/* Animated background shapes */}
      {isMounted && (
        <>
          <motion.div 
            className="absolute top-36 left-10 w-48 h-48 rounded-full bg-pink-100/40 blur-2xl"
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-20 right-10 w-64 h-64 rounded-full bg-red-100/30 blur-3xl"
            animate={{
              x: [0, -40, 0],
              y: [0, 30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-rose-200/20 blur-xl"
            animate={{
              x: [0, 20, 0],
              y: [0, 20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </>
      )}

      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Text Content */}
          <div className="lg:w-1/2">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6 text-gray-800"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Animated title with color fading */}
              <motion.span 
                className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-pink-600" 
                variants={colorFadeAnimation}
                animate="animate"
              >
                Najlepsza opieka 😻
              </motion.span>{' '}
              dla Twoich{' '}
              {animatedWords.includes('pupili') ? (
                <motion.span className="text-rose-400" whileHover="hover">
                  {'pupili'.split('').map((letter, i) => (
                    <motion.span key={i} variants={letterVariants}>
                      {letter}
                    </motion.span>
                  ))}
                </motion.span>
              ) : 'pupili'}{' '}
              gdy Cię nie ma w pobliżu! 🐾
            </motion.h1>
            
            <motion.p 
              className="text-lg mb-8 text-gray-600"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.span 
                className="font-medium"
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 } 
                }}
                variants={colorFadeAnimation}
                animate="animate"
              >
                Profesjonalne usługi petsitterskie 😺
              </motion.span>{' '}
              dostosowane do potrzeb Twojego futrzastego przyjaciela. 
              Traktujemy Twoje zwierzaki jak rodzinę 😽, zapewniając im miłość i uwagę, 
              na którą zasługują, gdy Ciebie nie ma w domu.
            </motion.p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link href="/services">
                  <motion.button 
                    className="relative overflow-hidden bg-rose-400 text-white px-6 py-3 rounded-lg font-medium hover:bg-rose-500 transition duration-300 group"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0px 4px 10px rgba(249, 168, 212, 0.4)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.span 
                      className="absolute inset-0 bg-gradient-to-r from-rose-400 via-pink-500 to-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <span className="relative z-10">Nasze Usługi - Psyknij Tu! 🐶</span>
                  </motion.button>
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Link href="/contact">
                  <motion.button 
                    className="border-2 border-rose-400 text-rose-400 px-6 py-3 rounded-lg font-medium hover:bg-rose-50 transition duration-300 relative overflow-hidden group"
                    whileHover={{ 
                      scale: 1.05,
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.span 
                      className="absolute inset-0 border-2 border-transparent bg-clip-border bg-gradient-to-r from-rose-400 via-pink-500 to-rose-400 opacity-0 group-hover:opacity-100"
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <motion.span 
                      className="relative z-10"
                      variants={colorFadeAnimation}
                      animate="animate"
                    >
                      Miauknij do Nas 📞
                    </motion.span>
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
          
          {/* Image */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          >
            <motion.div 
              className="bg-white/40 backdrop-blur-sm p-6 rounded-2xl shadow-lg"
              whileHover={{
                boxShadow: [
                  "0 10px 15px -3px rgba(249, 168, 212, 0.2)",
                  "0 10px 15px -3px rgba(236, 72, 153, 0.3)",
                  "0 10px 15px -3px rgba(219, 39, 119, 0.4)",
                  "0 10px 15px -3px rgba(190, 24, 93, 0.3)",
                  "0 10px 15px -3px rgba(249, 168, 212, 0.2)",
                ],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
            >
              <Image
                className="rounded-xl shadow-sm object-contain mx-auto"
                src="/images/pets/happy-dog.svg"
                alt="Szczęśliwy piesek"
                width={500}
                height={400}
              />
            </motion.div>
          </motion.div>
          
        </div>
      </div>
      
      {/* Subtle divider at the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-b from-transparent to-white"></div>
    </section>
  );
} 