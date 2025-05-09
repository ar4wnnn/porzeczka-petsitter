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
  },
  {
    id: 'holly',
    src: "/images/klienci/Holly.jpeg",
    alt: "Holly - Playful pup",
    title: "Holly",
    category: ["psy", "featured"],
    description: "A playful pup who loves to run and fetch.",
    featured: true,
    width: 4,
    height: 3
  },
  {
    id: 'kofi',
    src: "/images/klienci/Kofi.jpeg",
    alt: "Kofi - Curious cat",
    title: "Kofi",
    category: ["koty", "featured"],
    description: "A curious cat always exploring new places.",
    featured: true,
    width: 4,
    height: 5
  },
  {
    id: 'kreska-2',
    src: "/images/klienci/Kreska 2.jpeg",
    alt: "Kreska - Whippet charm",
    title: "Kreska",
    category: ["psy", "charty"],
    description: "The charming whippet, always ready for a cuddle.",
    width: 3,
    height: 4
  },
  {
    id: 'kreska-3',
    src: "/images/klienci/Kreska 3.jpeg",
    alt: "Kreska - Whippet grace",
    title: "Kreska",
    category: ["psy", "charty"],
    description: "Graceful and gentle, Kreska loves to lounge.",
    width: 3,
    height: 4
  }
];

// Filter options for gallery
const filterOptions = [
  { value: "wszystkie", label: "Wszystkie Zwierzaki ", emoji: "🐾" },
  { value: "psy", label: "Pieski ", emoji: "🐶" },
  { value: "koty", label: "Kotki ", emoji: "😺" },
  { value: "gryzonie", label: "Gryzonie ", emoji: "🐹" },
  { value: "ptaki", label: "Ptaki ", emoji: "🦜" },
  { value: "ilustracje", label: "Ilustracje ", emoji: "🎨" },
  { value: "featured", label: "Wyróżnione ", emoji: "⭐" }
];

// Add a style for emoticons
const emojiStyle = {
  display: 'inline-block',
  color: 'inherit',
  WebkitTextFillColor: 'initial',
  backgroundImage: 'none',
};

// Add button style
const buttonStyle = {
  background: 'linear-gradient(45deg, var(--sky-medium), var(--sky-dark))',
  color: 'var(--frost)',
  padding: '0.75rem 1.5rem',
  borderRadius: '9999px',
  fontWeight: 700,
  fontSize: '1rem',
  textDecoration: 'none',
  display: 'inline-block',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  boxShadow: '0 4px 12px rgba(56, 189, 248, 0.3)', // sky-medium with alpha
  border: 'none',
  backgroundSize: '200% auto',
  animation: 'shimmerButton 3s linear infinite',
};

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
  
  // Filter out images from non-klienci folders
  const klienciImages = galleryImages.filter(img => img.src.includes('/klienci/'));
  
  useEffect(() => {
    if (selectedFilter === "wszystkie") {
      setFilteredImages(klienciImages);
    } else {
      setFilteredImages(
        klienciImages.filter(image => image.category.includes(selectedFilter))
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
    <main className="min-h-screen bg-[var(--background)]">
      <Navbar />
      
      {/* Hero Header */}
      <motion.div 
        ref={headerRef}
        className="relative h-[50vh] flex items-center justify-center bg-gradient-to-r from-sky-light to-sky-medium"
        style={{
          opacity: headerOpacity,
          scale: headerScale,
          y: headerY
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-full bg-gradient-to-b from-transparent to-[var(--background)] bottom-0"></div>
          
          {/* Floating decorations */}
          <motion.div 
            className="absolute text-8xl top-[20%] left-[10%] opacity-10"
            animate={{ 
              y: [0, 20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            😺
          </motion.div>
          
          <motion.div 
            className="absolute text-8xl bottom-[30%] right-[15%] opacity-10"
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            🐶
          </motion.div>
        </div>
        
        <div className="text-center z-10 px-4">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-textcolor mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Galeria Naszych Pupili
          </motion.h1>
          <motion.p 
            className="text-xl text-textcolor/90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Zobacz nasze zwierzęce gwiazdy, które mieliśmy przyjemność gościć 
            <span style={emojiStyle}> 💖🐾</span>
          </motion.p>
        </div>
      </motion.div>
      
      {/* Gallery Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filterOptions.map(option => (
              <motion.button
                key={option.value}
              style={selectedFilter === option.value ? buttonStyle : undefined}
              className={`px-4 py-2 rounded-full transition-all ${
                  selectedFilter === option.value
                  ? 'text-frost'
                  : 'text-stone-dark bg-stone-light hover:bg-sky-light hover:text-stone-dark'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedFilter(option.value)}
              >
              {option.label}<span style={emojiStyle}>{option.emoji}</span>
              </motion.button>
            ))}
        </div>
      
        {/* Gallery Grid */}
        {filteredImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {getColumns().map((column, colIndex) => (
              <div key={colIndex} className="flex flex-col gap-6">
                {column.map(image => (
                    <motion.div
                      key={image.id}
                    layoutId={image.id}
                    className="relative bg-white rounded-xl overflow-hidden shadow-md cursor-pointer group"
                    style={{ aspectRatio: `${image.width}/${image.height}` }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      onClick={() => openLightbox(image)}
                    whileHover={{ y: -5 }}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      priority={colIndex === 0}
                      />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-dark/70 via-stone-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <h3 className="text-frost text-xl font-bold">{image.title}</h3>
                      <p className="text-frost/90 text-sm line-clamp-2">{image.description}</p>
                        </div>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-stone-dark mb-2">Nie znaleziono zdjęć w tej kategorii</p>
            <p className="text-stone-medium">Spróbuj wybrać inną kategorię lub zobacz wszystkie zwierzaki</p>
            <button
              style={buttonStyle}
              className="mt-6 px-6 py-2 hover:shadow-lg"
              onClick={() => setSelectedFilter('wszystkie')}
            >
              Zobacz wszystkie <span style={emojiStyle}>🐾</span>
            </button>
        </div>
        )}
      </section>
      
      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="fixed inset-0 z-50 bg-stone-dark/90 p-4 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-frost text-xl font-bold">{selectedImage.title}</h2>
              <button
                style={buttonStyle} 
                className="hover:shadow-lg"
            onClick={closeLightbox}
          >
                Zamknij <span style={emojiStyle}>✖️</span>
              </button>
            </div>
            
            <div className="flex-1 relative">
            <motion.div 
                layoutId={selectedImage.id}
                className="absolute inset-0 flex items-center justify-center"
            >
                <div className="relative w-full h-full max-w-6xl max-h-[70vh] mx-auto">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                    sizes="100vw"
                  className="object-contain"
                    priority
                  />
                </div>
              </motion.div>
                
                <button
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-sky-light/30 hover:bg-sky-light/40 text-frost rounded-full p-3 backdrop-blur-sm"
                onClick={() => navigateLightbox('prev')}
                aria-label="Previous image"
                >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                </button>
              
              <button 
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-sky-light/30 hover:bg-sky-light/40 text-frost rounded-full p-3 backdrop-blur-sm"
                onClick={() => navigateLightbox('next')}
                aria-label="Next image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
            
            <div className="mt-4 bg-sky-dark/20 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-frost">{selectedImage.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Footer />
      <style jsx global>{`
        @keyframes shimmerButton {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </main>
  );
} 