'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  image?: string;
  petType: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Emilia Kowalska',
    location: 'Warszawa',
    rating: 5,
    text: 'Usługa opieki nad zwierzętami była wspaniała! 😻 Moje koty były tak dobrze zaopiekowane podczas mojej nieobecności. Otrzymywałam codzienne aktualizacje i zdjęcia, które dawały mi ogromny spokój ducha.',
    image: 'https://placedog.net/400/400?id=10',
    petType: 'Dwa kotki'
  },
  {
    id: 2,
    name: 'Michał Nowak',
    location: 'Kraków',
    rating: 5,
    text: 'Wahałem się zostawić mojego starszego psa z opiekunem, ale zapewnili wyjątkową opiekę. 🐶 Podawali jego leki perfekcyjnie i dali mu tyle miłości i uwagi, że merdał ogonem jak szczeniaczek!',
    image: 'https://placedog.net/400/400?id=11',
    petType: 'Starszy piesek'
  },
  {
    id: 3,
    name: 'Zofia Wiśniewska',
    location: 'Gdańsk',
    rating: 4,
    text: 'Moje papużki były w świetnych rękach! 🦜 Opiekunka idealnie przestrzegała harmonogramu karmienia i spędzała dodatkowy czas na rozmowach z nimi, aby się nie czuły samotne. Ćwierkały z radości gdy wróciłam!',
    petType: 'Papużki'
  },
  {
    id: 4,
    name: 'Jakub Wójcik',
    location: 'Wrocław',
    rating: 5,
    text: 'Mamy bardzo aktywnego szczeniaka, który wymaga dużo ruchu i uwagi. Opiekunka była niesamowita 😺, zabierając go na wiele spacerów i sesji zabaw każdego dnia. Na pewno zarezerwuję ponownie!',
    image: 'https://placedog.net/400/400?id=12',
    petType: 'Energiczny szczeniak'
  },
  {
    id: 5,
    name: 'Oliwia Kamińska',
    location: 'Poznań',
    rating: 5,
    text: 'Mój królik ma bardzo specyficzną dietę i rutynę opieki. 🐰 Opiekunka idealnie przestrzegała moich instrukcji i przesyłała mi aktualizacje przez cały dzień. Mój pupil był szczęśliwy i zdrowy, gdy wróciłam. Miau-tastycznie! 😸',
    petType: 'Królik'
  }
];

export default function TestimonialSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoplay]);

  const handlePrev = () => {
    setAutoplay(false);
    setActiveIndex((current) => (current === 0 ? testimonials.length - 1 : current - 1));
  };

  const handleNext = () => {
    setAutoplay(false);
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  const handleDotClick = (index: number) => {
    setAutoplay(false);
    setActiveIndex(index);
  };

  // Render stars based on rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className={`h-5 w-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
        />
      </svg>
    ));
  };

  return (
    <section className="py-24 bg-[var(--color-background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-[var(--color-textcolor)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Co Mówią Nasi <span className="text-[var(--color-primary)]">Klienci</span> 😺
          </motion.h2>
          <motion.p 
            className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Jesteśmy dumni, że sprawiamy radość zwierzakom i ich właścicielom 😻
          </motion.p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="h-[400px] relative overflow-hidden rounded-xl bg-white shadow-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 p-8 md:p-12 flex flex-col md:flex-row items-center"
              >
                <div className="md:w-1/3 flex-shrink-0 mb-6 md:mb-0">
                  <div className="relative w-32 h-32 md:w-48 md:h-48 mx-auto">
                    {testimonials[activeIndex].image ? (
                      <Image 
                        src={testimonials[activeIndex].image!}
                        alt={testimonials[activeIndex].name}
                        fill
                        className="object-cover rounded-full border-4 border-[var(--color-secondary)]"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full flex items-center justify-center bg-[var(--color-tertiary)] text-4xl font-bold text-white">
                        {testimonials[activeIndex].name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="text-center mt-4">
                    <div className="flex justify-center">
                      {renderStars(testimonials[activeIndex].rating)}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {testimonials[activeIndex].petType}
                    </p>
                  </div>
                </div>

                <div className="md:w-2/3 md:pl-8">
                  <svg className="h-10 w-10 text-[var(--color-primary)] opacity-50 mb-4" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="text-lg md:text-xl text-[var(--color-textcolor)] italic mb-6">
                    "{testimonials[activeIndex].text}"
                  </p>
                  <div>
                    <p className="font-semibold text-lg">{testimonials[activeIndex].name}</p>
                    <p className="text-gray-500">{testimonials[activeIndex].location}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation controls */}
          <div className="flex justify-between mt-8">
            <button 
              onClick={handlePrev}
              className="bg-white hover:bg-gray-50 text-[var(--color-textcolor)] p-3 rounded-full shadow-md transition-all"
              aria-label="Poprzednia opinia"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            <div className="flex space-x-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleDotClick(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx === activeIndex 
                      ? 'bg-[var(--color-primary)] scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Przejdź do opinii ${idx + 1}`}
                />
              ))}
            </div>

            <button 
              onClick={handleNext}
              className="bg-white hover:bg-gray-50 text-[var(--color-textcolor)] p-3 rounded-full shadow-md transition-all"
              aria-label="Następna opinia"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 