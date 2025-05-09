'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// All images from klienci folder - reduced to 3 for front page
const galleryImages = [
  {
    src: "/images/klienci/Mania i Pedro.jpg",
    alt: "Mania i Pedro - Chihuahua duo",
    title: "Mania i Pedro",
    breed: "Chihuahua"
  },
  {
    src: "/images/klienci/Buzka.jpg",
    alt: "Buzka - Cat with ember eyes",
    title: "Buzka",
    breed: "Kot domowy"
  },
  {
    src: "/images/klienci/Halina i Mimi.jpg",
    alt: "Halina i Mimi - Pug ladies",
    title: "Halina i Mimi",
    breed: "Mopsy"
  }
];

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const openLightbox = (src: string) => {
    setSelectedImage(src);
    document.body.style.overflow = 'hidden';
  };
  
  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const buttonStyle = {
    background: 'linear-gradient(45deg, var(--sky-medium), var(--sky-dark))',
    color: 'var(--frost)',
    padding: '1rem 2rem',
    borderRadius: '9999px',
    fontWeight: 700,
    fontSize: '1.1rem',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(56, 189, 248, 0.3)',
    border: 'none',
    backgroundSize: '200% auto',
    animation: 'shimmerButton 3s linear infinite',
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-frost to-stone-light/30 relative overflow-hidden">
      {/* Floating decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute text-7xl top-10 left-10 opacity-10"
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          😸
        </motion.div>
        
        <motion.div 
          className="absolute text-7xl bottom-10 right-10 opacity-10"
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          🐾
        </motion.div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.span 
            className="inline-block px-3 py-1 text-sm font-semibold bg-sky-light/50 text-sky-dark rounded-full mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Galeria Pupili 📸
          </motion.span>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-stone-dark mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Nasze Mruczące i Szczekające Gwiazdy 🌟
          </motion.h2>
          
          <motion.p 
            className="max-w-2xl mx-auto text-lg text-stone-medium mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Poznaj kilku z naszych uroczych pupilów, którymi mieliśmy przyjemność opiekować się. 
            Każdy z nich ma swój unikalny charakter i specjalne miejsce w naszych sercach 💖
          </motion.p>
        </div>

        {/* Tile Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.src}
              className="relative group aspect-square overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-10%" }}
              onClick={() => openLightbox(image.src)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                quality={90}
                priority={true}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-dark/70 via-stone-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h3 className="text-frost text-xl font-bold">{image.title}</h3>
                <p className="text-frost/90 text-sm">{image.breed}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* "View All Photos" Button */}
        <div className="text-center mt-12">
          <Link href="/gallery">
            <motion.button 
              style={buttonStyle}
              className="px-8 py-4 shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Zobacz wszystkie nasze zwierzaki</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="fixed inset-0 z-50 bg-stone-dark/90 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div 
              className="relative max-w-7xl max-h-[90vh] w-full h-full"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <Image
                src={selectedImage}
                alt="Pet photo enlarged"
                fill
                className="object-contain"
                quality={100}
              />
              <button 
                className="absolute top-2 right-2 text-frost bg-sky-dark/50 rounded-full p-2 hover:bg-sky-dark/80 transition-colors"
                onClick={closeLightbox}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
} 