'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: 'Anna Kowalska',
    role: 'Mama 3 kotów 😻',
    image: '/images/logo.png',
    content: 'Od kiedy korzystam z usług Porzeczki, moje koty są szczęśliwsze niż kiedykolwiek! Nawet zaczęły na mnie mniej fukać kiedy wracam do domu. To chyba najwyższa forma kociej pochwały! 🐱',
  },
  {
    id: 2,
    name: 'Jan Nowak',
    role: 'Właściciel labradora 🐶',
    image: '/images/logo.png',
    content: 'Mój Burek uwielbia spacery z opiekunką! Kiedy tylko widzi ją przez okno, wykonuje taniec szczęścia, który wygląda trochę jak połączenie breakdance i baletu. Polecam z całego psiego serca! 🦴',
  },
  {
    id: 3,
    name: 'Martyna Wiśniewska',
    role: 'Opiekunka świnki morskiej 🐹',
    image: '/images/logo.png',
    content: 'Moja świnka morska Chrupka dosłownie piszczy z radości, gdy przychodzi jej opiekunka. Zawsze dostaje świeżą marchewkę i dokładnie czyszczoną klatkę. Porzeczka dba nawet o jej fryzurę! Rewelacja! 🥕',
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const setTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-20 bg-white overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 opacity-10 rotate-12">
        <span className="text-7xl">🐾</span>
      </div>
      <div className="absolute bottom-10 left-10 opacity-10 -rotate-12">
        <span className="text-7xl">🦴</span>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="px-4 py-2 rounded-full bg-blue-100 text-blue-600 font-medium text-sm inline-block mb-4"
          >
            Co mruczą, szczekają i piszczą nasi klienci 🐾
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
          >
            Opinie od <span className="text-gradient-blue">futrzastych rodzin</span> 😺
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-[var(--blue-medium)]"
          >
            Sprawdź, co nasze futrzaste (i niefutrzaste) rodziny mówią o naszych usługach. 
            Każda merdająca łapa i mruczący pyszczek to dla nas najlepsza rekomendacja!
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <Image
                    src={testimonial.image}
                    alt={`Zdjęcie ${testimonial.name}`}
                    width={60}
                    height={60}
                    className="rounded-full border-2 border-[var(--blue-pale)]"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-[var(--blue-dark)]">{testimonial.name}</h4>
                  <p className="text-[var(--primary-color)] text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-[var(--text-color)] italic">"{testimonial.content}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 