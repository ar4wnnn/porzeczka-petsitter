'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: string[];
  description: string;
  featured?: boolean;
  width: number;
  height: number;
}

// All gallery images from various folders
const galleryImages: GalleryImage[] = [
  // Klienci photos
  {
    id: 'mania-pedro',
    src: "/images/klienci/Mania i Pedro.jpg",
    alt: "Mania i Pedro - Chihuahua duo",
    title: "Mania i Pedro",
    category: ["psy", "chihuahua", "featured"],
    description: "Nierozłączny duet chihuahua, które uwielbiają wspólne zabawy i psocić razem.",
    featured: true,
    width: 4,
    height: 3
  },
  {
    id: 'buzka',
    src: "/images/klienci/Buzka.jpg",
    alt: "Buzka - Kot o ognistych oczach",
    title: "Buzka",
    category: ["koty", "featured"],
    description: "Szalony kot o hipnotyzujących, bursztynowych oczach. Nieprzewidywalna i pełna energii.",
    featured: true,
    width: 4,
    height: 5
  },
  {
    id: 'halina-mimi',
    src: "/images/klienci/Halina i Mimi.jpg",
    alt: "Halina i Mimi - Mopsy",
    title: "Halina i Mimi",
    category: ["psy", "mopsy", "featured"],
    description: "Dwie pulchniutkie mopsie damy, które uwielbiają leniwe popołudnia i przysmaki.",
    featured: true,
    width: 5,
    height: 4
  },
  {
    id: 'kreska',
    src: "/images/klienci/kreska.jpg",
    alt: "Kreska - Chart whippet",
    title: "Kreska",
    category: ["psy", "charty"],
    description: "Najsłodszy chart whippet, łagodny i czuły. Zawsze gotowy do przytulania.",
    width: 3,
    height: 4
  },
  {
    id: 'orion',
    src: "/images/klienci/Orion.jpg",
    alt: "Orion - Energiczny pies",
    title: "Orion",
    category: ["psy", "mieszańce"],
    description: "Pies pełen energii i szalonych pomysłów! Prawdziwa dusza towarzystwa!",
    width: 4,
    height: 3
  },
  {
    id: 'kokos',
    src: "/images/klienci/kokos.jpg",
    alt: "Kokos - Pies paranoik",
    title: "Kokos",
    category: ["psy", "teriery"],
    description: "Prawdziwy psi paranoik, jak Courage z kreskówki! Widzi niebezpieczeństwo wszędzie.",
    width: 4,
    height: 4
  },
  {
    id: 'mania',
    src: "/images/klienci/Mania.jpg",
    alt: "Mania - Chihuahua",
    title: "Mania",
    category: ["psy", "chihuahua"],
    description: "Mała, ale charakterna chihuahua o wielkim sercu i jeszcze większej osobowości.",
    width: 4,
    height: 5
  },
  {
    id: 'molly-badi',
    src: "/images/klienci/Molly i Badi.jpg",
    alt: "Molly i Badi - Psi przyjaciele",
    title: "Molly i Badi",
    category: ["psy", "retrievery", "labradory"],
    description: "Golden Retriever i Labrador - najlepsi przyjaciele na wspólnych spacerach.",
    width: 5,
    height: 3
  },
  // Additional pet illustrations
  {
    id: 'happy-dog',
    src: "/images/pets/happy-dog.svg",
    alt: "Radosny piesek",
    title: "Radosny Piesek",
    category: ["ilustracje", "psy"],
    description: "Ilustracja szczęśliwego pieska, który cieszy się każdym dniem.",
    width: 1,
    height: 1
  },
  {
    id: 'parrot',
    src: "/images/pets/parrot.svg",
    alt: "Kolorowa papuga",
    title: "Papużka",
    category: ["ilustracje", "ptaki"],
    description: "Kolorowa papuga, która uwielbia naśladować dźwięki i śpiewać.",
    width: 1,
    height: 1
  },
  {
    id: 'funny-rabbit',
    src: "/images/pets/funny-rabbit.svg",
    alt: "Zabawny królik",
    title: "Królik Uszatek",
    category: ["ilustracje", "gryzonie"],
    description: "Zabawny królik z długimi uszami, który uwielbia chrupać marchewkę.",
    width: 1,
    height: 1
  },
  {
    id: 'funny-hamster',
    src: "/images/pets/funny-hamster.svg",
    alt: "Śmieszny chomik",
    title: "Chomik Puszek",
    category: ["ilustracje", "gryzonie"],
    description: "Śmieszny chomik z wypełnionymi policzkami, kolekcjoner przysmaków.",
    width: 1,
    height: 1
  }
];

// Filter options for gallery
const filterOptions = [
  { value: "wszystkie", label: "Wszystkie Zwierzaki 🐾" },
  { value: "psy", label: "Pieski 🐶" },
  { value: "koty", label: "Kotki 😺" },
  { value: "gryzonie", label: "Gryzonie 🐹" },
  { value: "ptaki", label: "Ptaki 🦜" },
  { value: "ilustracje", label: "Ilustracje 🎨" },
  { value: "featured", label: "Wyróżnione ⭐" }
];

export default function GalleryPage() {
  const [selectedFilter, setSelectedFilter] = useState("wszystkie");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>(galleryImages);
  const headerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"]
  });
  
  const headerOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const headerScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const headerY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
  // Filter images based on selected category
  useEffect(() => {
    if (selectedFilter === "wszystkie") {
      setFilteredImages(galleryImages);
    } else {
      setFilteredImages(
        galleryImages.filter(image => image.category.includes(selectedFilter))
      );
    }
  }, [selectedFilter]);
  
  // Lightbox handlers
  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };
  
  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };
  
  const navigateLightbox = (direction: 'next' | 'prev') => {
    if (!selectedImage) return;
    
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    if (currentIndex === -1) return;
    
    let newIndex = currentIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % filteredImages.length;
    } else {
      newIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    }
    
    setSelectedImage(filteredImages[newIndex]);
  };
  
  // Get columns for masonry layout
  const getColumns = () => {
    const columns: GalleryImage[][] = [[], [], []];
    
    filteredImages.forEach((image, i) => {
      const columnIndex = i % 3;
      columns[columnIndex].push(image);
    });
    
    return columns;
  };
  
  const columns = getColumns();

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          navigateLightbox('next');
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          navigateLightbox('prev');
        } else if (e.key === 'Escape') {
          closeLightbox();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage, filteredImages]);

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Header */}
      <motion.div 
        ref={headerRef}
        className="relative h-[60vh] bg-gradient-to-b from-pink-100 to-rose-50 flex items-center justify-center overflow-hidden"
        style={{
          opacity: headerOpacity,
          scale: headerScale,
          y: headerY
        }}
      >
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute top-10 -left-10 w-40 h-40 rounded-full bg-pink-200 opacity-50 blur-xl"
            animate={{ 
              x: [0, 30, 0],
              y: [0, 20, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-10 -right-10 w-60 h-60 rounded-full bg-rose-200 opacity-40 blur-xl"
            animate={{ 
              x: [0, -30, 0],
              y: [0, -20, 0],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute top-1/3 left-1/3 w-32 h-32 rounded-full bg-purple-200 opacity-30 blur-xl"
            animate={{ 
              x: [0, 20, 0],
              y: [0, -30, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        
        {/* Header Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Galeria Naszych
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-rose-600 ml-3">
              Pupili 🐾
            </span>
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Poznaj naszych wspaniałych podopiecznych, którymi mamy przyjemność się opiekować.
            Każdy z nich ma niepowtarzalną osobowość i specjalne miejsce w naszych sercach 💖
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <svg className="w-8 h-8 mx-auto text-pink-400 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Filter Section */}
      <section className="bg-white py-8 sticky top-20 z-20 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {filterOptions.map((option) => (
              <motion.button
                key={option.value}
                className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all ${
                  selectedFilter === option.value
                    ? 'bg-pink-500 text-white shadow-md scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedFilter(option.value)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {option.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Gallery Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          {filteredImages.length === 0 ? (
            <div className="text-center py-20">
              <motion.div 
                className="text-5xl mb-4"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                🔍
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">Brak zwierzaków w tej kategorii</h3>
              <p className="text-gray-500">Spróbuj wybrać inną kategorię lub zobacz wszystkie zwierzaki</p>
            </div>
          ) : (
            <div className="flex gap-4">
              {columns.map((column, columnIndex) => (
                <div key={columnIndex} className="flex-1 flex flex-col gap-4">
                  {column.map((image) => (
                    <motion.div
                      key={image.id}
                      className="relative group overflow-hidden rounded-xl shadow-md bg-white"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      style={{ 
                        aspectRatio: `${image.width}/${image.height}`,
                        marginBottom: '1rem'
                      }}
                      onClick={() => openLightbox(image)}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                        className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                        quality={90}
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                        <h3 className="text-white text-xl font-bold">{image.title}</h3>
                        <p className="text-white/90 text-sm mt-1">{image.description}</p>
                        <div className="flex gap-2 mt-3">
                          {image.category.filter(cat => cat !== 'featured').map((cat) => (
                            <span key={cat} className="inline-block px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs">
                              {cat}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {image.featured && (
                        <div className="absolute top-3 right-3 bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
                          ⭐ Wyróżnione
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink-50 to-rose-50">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Chcesz, aby Twój pupil dołączył do naszej galerii? 📸
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Skorzystaj z naszych usług petsittingu i prześlij nam zdjęcie swojego zwierzaka.
            Z przyjemnością dodamy go do naszej rosnącej rodziny zadowolonych klientów! 😺
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a 
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-pink-500 text-white rounded-lg shadow-lg hover:bg-pink-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Skontaktuj się z nami
            </motion.a>
            <motion.a 
              href="/services"
              className="inline-flex items-center justify-center px-6 py-3 border border-pink-500 text-pink-500 rounded-lg hover:bg-pink-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Zobacz nasze usługi
            </motion.a>
          </motion.div>
        </div>
      </section>
      
      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div 
              className="relative max-w-7xl max-h-[90vh] w-full h-full flex flex-col md:flex-row gap-4 items-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex-1 h-full max-h-[70vh] md:max-h-full w-full">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                  quality={100}
                />
                
                {/* Navigation controls */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 pointer-events-none">
                  <motion.button
                    className="h-12 w-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white pointer-events-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateLightbox('prev');
                    }}
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.5)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </motion.button>
                  
                  <motion.button
                    className="h-12 w-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white pointer-events-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateLightbox('next');
                    }}
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.5)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                </div>
                
                {/* Indicator showing position */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full">
                  {filteredImages.findIndex(img => img.id === selectedImage.id) + 1} / {filteredImages.length}
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg md:w-80 w-full">
                <h2 className="text-2xl font-bold text-white mb-2">{selectedImage.title}</h2>
                <p className="text-white/80 mb-4">{selectedImage.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedImage.category.filter(cat => cat !== 'featured').map((cat) => (
                    <span key={cat} className="inline-block px-2 py-1 bg-white/20 rounded-full text-white text-xs">
                      {cat}
                    </span>
                  ))}
                </div>
                
                <button
                  className="w-full px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                  onClick={closeLightbox}
                >
                  Zamknij
                </button>
              </div>
              
              <button 
                className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/80 transition-colors"
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
      
      <Footer />
    </main>
  );
} 