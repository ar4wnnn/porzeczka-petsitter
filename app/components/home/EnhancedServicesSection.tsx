'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const services = [
  {
    id: 1,
    title: "Spacery z Pieskami 🐕",
    description: "Twój pupil będzie miał najlepszą przygodę życia podczas naszych super-ekscytujących spacerów! Obwąchamy wszystkie kątki osiedla! 🦮",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Odwiedziny Kotków 😺",
    description: "Twój mruczący władca domu dostanie królewską obsługę! Karmimy, czyścimy kuwetę i oczywiście wykonujemy na żądanie masaże podbródka 😻",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Opieka nad Gryzoniami 🐹",
    description: "Twoje małe puchate kuleczki dostają naszą gigantyczną uwagę! Mimo że są malutkie, traktujemy je jak największe skarby! 🧀",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Zwierzaki Egzotyczne 🦜",
    description: "Od gadających papug po majestatyczne jaszczurki - damy radę! Twój egzotyczny przyjaciel będzie miał równie egzotyczną obsługę! 🦎",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
];

export default function EnhancedServicesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    hover: {
      y: -5,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.2 }
    }
  };
  
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Animowane emoji w tle */}
      <motion.div 
        className="absolute text-9xl top-20 left-10 opacity-5 text-pink-300"
        animate={{ 
          y: [0, 30, 0],
          rotate: [0, 10, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        😻
      </motion.div>
      
      <motion.div 
        className="absolute text-9xl bottom-20 right-10 opacity-5 text-pink-300"
        animate={{ 
          y: [0, -30, 0],
          rotate: [0, -10, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        🐾
      </motion.div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span
            className="inline-block px-3 py-1 text-sm font-semibold bg-pink-100 text-pink-800 rounded-full mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Nasze Usługi 🐱‍👤
          </motion.span>
          
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4" 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Profesjonalna</span> opieka, 
            <span className="relative">
              <span className="relative z-10"> mruuucznie</span>
              <motion.span 
                className="absolute bottom-0 left-0 w-full h-3 bg-yellow-200 -z-0"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              />
            </span>{" "}
            spersonalizowana
          </motion.h2>
          
          <motion.p
            className="max-w-2xl mx-auto text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Oferujemy szeroki wachlarz usług petsittingowych, dostosowanych do potrzeb 
            Twojego futrzastego, łuskowatego lub pierzastego przyjaciela. 
            Każdy pupil to dla nas VIP (Very Important Pet 🏆)!
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
              variants={itemVariants}
              whileHover="hover"
            >
              <div className="w-12 h-12 bg-pink-100 rounded-lg text-pink-600 flex items-center justify-center mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              
              <Link href="/services" legacyBehavior>
                <motion.a 
                  className="text-pink-600 font-medium inline-flex items-center"
                  whileHover={{ x: 5 }}
                >
                  Dowiedz się więcej
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.a>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Link href="/services" legacyBehavior>
            <motion.a 
              className="inline-flex items-center px-8 py-3 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-full shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Wszystkie nasze usługi
              <span className="ml-2">🐾</span>
            </motion.a>
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 