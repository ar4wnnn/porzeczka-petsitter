'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Button from '../ui/Button';
import Link from 'next/link';
import Image from 'next/image';

export default function CtaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-light/30 to-frost"></div>
      
      {/* Animated circles */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute w-64 h-64 rounded-full bg-sky-light/50 opacity-30 blur-xl"
          initial={{ x: -100, y: -100 }}
          animate={{ 
            x: ["-10%", "10%", "-10%"],
            y: ["-20%", "10%", "-20%"]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 10,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute right-0 bottom-0 w-96 h-96 rounded-full bg-sky-medium/30 opacity-30 blur-xl"
          initial={{ x: 100, y: 100 }}
          animate={{ 
            x: ["10%", "-10%", "10%"],
            y: ["10%", "-10%", "10%"]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 13,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute left-1/3 bottom-1/3 w-72 h-72 rounded-full bg-stone-light/70 opacity-30 blur-xl"
          initial={{ x: 0, y: 0 }}
          animate={{ 
            x: ["5%", "-5%", "5%"],
            y: ["5%", "-5%", "5%"]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 15,
            ease: "easeInOut"
          }}
        />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 md:p-12 overflow-hidden relative">
          {/* Decorative paw prints */}
          <div className="absolute top-5 right-5 opacity-10">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-20 h-20 fill-current text-sky-dark">
              <path d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5.3-86.2 32.6-96.8S212.2 50 226.5 92.9zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5v1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3v-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z"/>
            </svg>
          </div>
          <div className="absolute bottom-5 left-5 opacity-10">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-16 h-16 fill-current text-stone-medium">
              <path d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5.3-86.2 32.6-96.8S212.2 50 226.5 92.9zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5v1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3v-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z"/>
            </svg>
          </div>
          
          <div className="text-center">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6 text-stone-dark"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Bezstresowa Opieka Nad Twoimi Futrzastymi Przyjaciółmi 😸
            </motion.h2>
            <motion.p 
              className="text-lg text-stone-medium max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Twój pupil zasługuje na najlepszą opiekę podczas Twojej nieobecności. 
              Zapewniamy miłość, uwagę i profesjonalną opiekę dostosowaną do 
              indywidualnych potrzeb Twojego zwierzaka. Miau-tycznie zadowolony pupil gwarantowany! 😻
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-frost bg-gradient-to-r from-sky-dark to-sky-medium hover:opacity-90 transition-colors shadow-lg hover:shadow-xl"
              >
                Zaplanuj Wizytę 🐾
              </Link>
              <Link 
                href="/services" 
                className="inline-flex items-center justify-center px-8 py-3 border border-stone-medium text-base font-medium rounded-md text-stone-medium bg-transparent hover:bg-stone-light hover:text-stone-dark transition-colors shadow-lg hover:shadow-xl"
              >
                Zobacz Nasze Usługi 🐱
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 