'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ColorfulSection from '../components/ui/ColorfulSection';
import AnimatedBackground from '../components/ui/AnimatedBackground';

interface ServicePricing {
  name: string;
  description: string;
  emoji: string;
  options: {
    duration: string;
    price: number;
    popular?: boolean;
  }[];
  extras?: {
    name: string;
    price: number;
    unit: string;
  }[];
}

interface PetType {
  id: string;
  name: string;
  emoji: string;
  image: string;
  description: string;
}

const exoticPets: PetType[] = [
  {
    id: 'guinea-pigs',
    name: 'Świnki Morskie',
    emoji: '🐹',
    image: '/images/pets/guinea-pig.svg',
    description: 'Małe, puchate kuleczki szczęścia, które uwielbiają chrupać warzywa i piszczeć z radości!'
  },
  {
    id: 'rats',
    name: 'Szczurki',
    emoji: '🐀',
    image: '/images/pets/mouse.svg',
    description: 'Inteligentne, towarzyskie i bardzo czyste zwierzątka, które potrafią nauczyć się własnego imienia!'
  },
  {
    id: 'parrots',
    name: 'Papugi',
    emoji: '🦜',
    image: '/images/pets/parrot.svg',
    description: 'Kolorowe, gadatliwe i mądre ptaki, które potrafią naśladować Twoją mowę i śmiech!'
  },
  {
    id: 'rabbits',
    name: 'Króliczki',
    emoji: '🐰',
    image: '/images/pets/funny-rabbit.svg',
    description: 'Puszyste, kicające kuleczki radości, które uwielbiają warzywa i podskakiwanie!'
  },
  {
    id: 'mice',
    name: 'Myszki',
    emoji: '🐭',
    image: '/images/pets/mouse.svg',
    description: 'Malutkie, szybkie i ciekawskie stworzonka, które uwielbiają eksplorować!'
  },
  {
    id: 'hamsters',
    name: 'Chomiki',
    emoji: '🐹',
    image: '/images/pets/funny-hamster.svg',
    description: 'Pulchne policzki pełne smakołyków i nocne bieganie w kółku to ich specjalność!'
  },
  {
    id: 'chinchillas',
    name: 'Szynszyle',
    emoji: '🐭',
    image: '/images/pets/chinchilla.svg',
    description: 'Mają najmiękkszą sierść na świecie i uwielbiają kąpiele w piasku!'
  }
];

const services: ServicePricing[] = [
  {
    name: 'Spacery z Pieskami',
    description: 'Profesjonalne spacery dla Twojego ukochanego czworonożnego przyjaciela',
    emoji: '🐕',
    options: [
      { duration: '30 minut', price: 20 },
      { duration: '45 minut', price: 25, popular: true },
      { duration: '60 minut', price: 30 },
    ],
    extras: [
      { name: 'Dodatkowy pies', price: 10, unit: 'za spacer' },
      { name: 'Usługa weekendowa', price: 5, unit: 'za spacer' },
      { name: 'Wczesny poranek/późny wieczór', price: 5, unit: 'za spacer' },
    ]
  },
  {
    name: 'Wizyty Domowe',
    description: 'Opieka nad zwierzętami w Twoim domu, gdy Cię nie ma',
    emoji: '🏠',
    options: [
      { duration: 'Wizyta podstawowa (30 min)', price: 25 },
      { duration: 'Wizyta standardowa (45 min)', price: 35, popular: true },
      { duration: 'Wizyta rozszerzona (60 min)', price: 45 },
    ],
    extras: [
      { name: 'Dodatkowe zwierzę', price: 5, unit: 'za wizytę' },
      { name: 'Podlewanie roślin', price: 5, unit: 'za wizytę' },
      { name: 'Odbieranie poczty', price: 3, unit: 'za wizytę' },
    ]
  },
  {
    name: 'Opieka Nocna',
    description: 'Nocne pobyty w Twoim domu, aby zaopiekować się Twoimi zwierzętami',
    emoji: '🌙',
    options: [
      { duration: 'Dzień powszedni (12 godzin)', price: 70 },
      { duration: 'Weekend (12 godzin)', price: 80, popular: true },
      { duration: 'Rozszerzona (24 godziny)', price: 120 },
    ],
    extras: [
      { name: 'Dodatkowe zwierzę', price: 15, unit: 'za noc' },
      { name: 'Dopłata świąteczna', price: 25, unit: 'za noc' },
    ]
  },
  {
    name: 'Taxi dla Zwierząt',
    description: 'Bezpieczne usługi transportowe dla Twojego pupila',
    emoji: '🚗',
    options: [
      { duration: 'Lokalne (< 5km)', price: 20 },
      { duration: 'Średni dystans (5-15km)', price: 35, popular: true },
      { duration: 'Długi dystans (15-30km)', price: 55 },
    ],
    extras: [
      { name: 'Czas oczekiwania', price: 15, unit: 'za 30 min' },
      { name: 'Dodatkowe zwierzę', price: 10, unit: 'za przejazd' },
    ]
  },
  {
    name: 'Pielęgnacja',
    description: 'Podstawowe usługi pielęgnacyjne dla Twojego pupila',
    emoji: '🛁',
    options: [
      { duration: 'Kąpiel i szczotkowanie (małe zwierzę)', price: 40 },
      { duration: 'Kąpiel i szczotkowanie (średnie zwierzę)', price: 55, popular: true },
      { duration: 'Kąpiel i szczotkowanie (duże zwierzę)', price: 70 },
    ],
    extras: [
      { name: 'Obcinanie pazurków', price: 15, unit: 'za zwierzę' },
      { name: 'Czyszczenie uszu', price: 10, unit: 'za zwierzę' },
      { name: 'Mycie zębów', price: 15, unit: 'za zwierzę' },
    ]
  },
  {
    name: 'Podawanie Leków',
    description: 'Profesjonalne podawanie leków',
    emoji: '💊',
    options: [
      { duration: 'Proste leki', price: 15 },
      { duration: 'Złożone leki', price: 25, popular: true },
      { duration: 'Zastrzyki', price: 35 },
    ],
    extras: [
      { name: 'Dodatkowy lek', price: 5, unit: 'za rodzaj' },
      { name: 'Specjalne przygotowanie diety', price: 10, unit: 'za posiłek' },
    ]
  },
  {
    name: 'Opieka nad Zwierzętami Egzotycznymi',
    description: 'Specjalistyczna opieka dla nietypowych pupili',
    emoji: '🦜',
    options: [
      { duration: 'Podstawowa wizyta (30 min)', price: 30 },
      { duration: 'Rozszerzona wizyta (45 min)', price: 40, popular: true },
      { duration: 'Specjalistyczna wizyta (60 min)', price: 55 },
    ],
    extras: [
      { name: 'Specjalistyczne karmienie', price: 15, unit: 'za wizytę' },
      { name: 'Czyszczenie terrarium/klatki', price: 20, unit: 'za wizytę' },
      { name: 'Kontrola parametrów środowiska', price: 10, unit: 'za wizytę' },
    ]
  },
];

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<{[key: number]: number}>({});
  const [selectedExtras, setSelectedExtras] = useState<{[key: number]: number[]}>({});
  const [selectedPetType, setSelectedPetType] = useState<string | null>(null);
  const [petTypeView, setPetTypeView] = useState(false);
  
  const toggleExtra = (serviceIndex: number, extraIndex: number) => {
    setSelectedExtras(prev => {
      const currentExtras = prev[serviceIndex] || [];
      
      if (currentExtras.includes(extraIndex)) {
        return {
          ...prev,
          [serviceIndex]: currentExtras.filter(idx => idx !== extraIndex)
        };
      } else {
        return {
          ...prev,
          [serviceIndex]: [...currentExtras, extraIndex]
        };
      }
    });
  };
  
  const calculateTotal = (serviceIndex: number) => {
    const service = services[serviceIndex];
    const optionPrice = service.options[selectedOption[serviceIndex] || 0].price;
    
    const extrasTotal = (selectedExtras[serviceIndex] || []).reduce((total, extraIndex) => {
      return total + (service.extras?.[extraIndex]?.price || 0);
    }, 0);
    
    return optionPrice + extrasTotal;
  };
  
  const expandService = (index: number) => {
    setSelectedService(selectedService === index ? null : index);
    
    // Initialize selected option if not already selected
    if (selectedOption[index] === undefined) {
      setSelectedOption(prev => ({
        ...prev,
        [index]: services[index].options.findIndex((opt: {popular?: boolean}) => opt.popular) || 0
      }));
    }
  };

  const selectPetType = (id: string) => {
    setSelectedPetType(id);
    setPetTypeView(false);
  };

  return (
    <main className="min-h-screen">
      <AnimatedBackground />
      <Navbar />
      
      <ColorfulSection 
        backgroundColor="#F0F7FF" 
        nextSectionColor="#FFF4EC"
        wavePattern="wave1"
        waveHeight={120}
        withFloatingShapes
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
          <div className="text-center mb-16">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Nasze <span className="text-[var(--color-primary)]">Usługi</span> i Cennik 😺
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Przejrzyste ceny za wyjątkowe usługi opieki nad zwierzętami 🐾
              Wszystkie usługi możemy dostosować do specyficznych potrzeb Twojego pupila.
            </motion.p>
          </div>

          {/* Pet Type Selection */}
          <div className="mb-12">
            <div className="text-center mb-4">
              <h3 className="text-xl font-semibold text-gray-700">Wybierz Swojego Futrzastego (lub Łuskowatego) Przyjaciela 🐰🦜🐹</h3>
              <p className="text-gray-500 mt-1">Każde stworzenie zasługuje na miłość, nawet te, które potrafią uciec z terrarium!</p>
            </div>
            <div className="flex flex-col items-center justify-center mb-8">
              <button 
                onClick={() => setPetTypeView(!petTypeView)}
                className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-full text-lg font-medium shadow-lg hover:bg-[var(--color-primary-dark)] transition-all transform hover:scale-105 focus:outline-none flex items-center gap-2"
              >
                {selectedPetType ? exoticPets.find(pet => pet.id === selectedPetType)?.emoji : '🐾'} 
                {selectedPetType ? `Wybrano: ${exoticPets.find(pet => pet.id === selectedPetType)?.name}` : 'Wybierz Rodzaj Zwierzątka'} 
                <svg className={`w-5 h-5 transition-transform ${petTypeView ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            <AnimatePresence>
              {petTypeView && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
                    {exoticPets.map((pet) => (
                      <motion.div
                        key={pet.id}
                        className={`bg-white p-4 rounded-xl shadow-md overflow-hidden cursor-pointer ${
                          selectedPetType === pet.id ? 'ring-2 ring-[var(--color-primary)]' : ''
                        }`}
                        whileHover={{ y: -8, transition: { duration: 0.2 } }}
                        onClick={() => selectPetType(pet.id)}
                      >
                        <div className="relative h-48 w-full mb-4 overflow-hidden rounded-lg">
                          <div className="bg-gray-200 animate-pulse absolute inset-0"></div>
                          <motion.div
                            className="absolute inset-0"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Image 
                              src={pet.image} 
                              alt={pet.name} 
                              fill 
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </motion.div>
                        </div>
                        <h3 className="text-xl font-bold flex items-center gap-2">
                          <span>{pet.emoji}</span> {pet.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-2">{pet.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="space-y-4">
            {services.map((service, serviceIndex) => {
              const isSelected = selectedService === serviceIndex;
              const serviceOptionIndex = selectedOption[serviceIndex] || 0;
              
              return (
                <motion.div 
                  key={service.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: serviceIndex * 0.1 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  {/* Service Header - Always visible */}
                  <div 
                    className={`p-6 flex items-center justify-between cursor-pointer transition-colors ${isSelected ? 'bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-secondary-light)] text-[var(--color-textcolor)]' : 'hover:bg-gray-50'}`}
                    onClick={() => expandService(serviceIndex)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{service.emoji}</span>
                      <div>
                        <h3 className="text-xl font-bold">{service.name}</h3>
                        <p className="text-gray-600 text-sm mt-1">{service.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="text-lg font-bold">Od {service.options[0].price}zł</span>
                      </div>
                      <div className={`transform transition-transform ${isSelected ? 'rotate-180' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Expanded Service Details */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 border-t border-gray-100">
                          {/* Service Options */}
                          <div className="mb-6">
                            <h4 className="text-lg font-semibold mb-3">Wybierz Opcję:</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {service.options.map((option, optIndex) => (
                                <div 
                                  key={option.duration}
                                  className={`border rounded-lg p-4 cursor-pointer transition-all ${serviceOptionIndex === optIndex ? 'border-[var(--color-primary)] bg-[var(--color-primary-light)]/10 shadow-md' : 'border-gray-200 hover:border-gray-300'} ${option.popular ? 'ring-2 ring-[var(--color-primary)]/40' : ''}`}
                                  onClick={() => setSelectedOption(prev => ({...prev, [serviceIndex]: optIndex}))}
                                >
                                  {option.popular && (
                                    <div className="flex justify-end mb-2">
                                      <span className="text-xs font-semibold uppercase text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2 py-1 rounded-full">
                                        Popularne
                                      </span>
                                    </div>
                                  )}
                                  <h5 className="font-medium">{option.duration}</h5>
                                  <p className="text-lg font-bold mt-2">{option.price} zł</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Service Extras */}
                          {service.extras && service.extras.length > 0 && (
                            <div className="mb-6">
                              <h4 className="text-lg font-semibold mb-3">Dodatki:</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {service.extras.map((extra, extraIndex) => {
                                  const isSelected = (selectedExtras[serviceIndex] || []).includes(extraIndex);
                                  
                                  return (
                                    <div 
                                      key={extra.name}
                                      className={`border rounded-lg p-3 cursor-pointer flex items-center ${
                                        isSelected 
                                          ? 'border-[var(--color-primary)] bg-[var(--color-primary-light)]/10' 
                                          : 'border-gray-200 hover:border-gray-300'
                                      }`}
                                      onClick={() => toggleExtra(serviceIndex, extraIndex)}
                                    >
                                      <div className={`w-5 h-5 rounded border mr-3 flex items-center justify-center ${
                                        isSelected 
                                          ? 'bg-[var(--color-primary)] border-[var(--color-primary)]' 
                                          : 'border-gray-300'
                                      }`}>
                                        {isSelected && (
                                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                          </svg>
                                        )}
                                      </div>
                                      <div className="flex-1">
                                        <h5 className="font-medium text-sm">{extra.name}</h5>
                                        <p className="text-sm text-gray-500">{extra.price} zł {extra.unit}</p>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                          
                          {/* Total Price */}
                          <div className="flex justify-between items-center border-t border-gray-200 pt-4 mt-4">
                            <span className="text-lg font-semibold">Łączna cena:</span>
                            <span className="text-2xl font-bold text-[var(--color-primary)]">{calculateTotal(serviceIndex)} zł</span>
                          </div>
                          
                          {/* Book Button */}
                          <div className="mt-6">
                            <button 
                              className="w-full py-3 bg-[var(--color-primary)] text-white rounded-lg font-medium shadow-md hover:bg-[var(--color-primary-dark)] transition-colors"
                            >
                              Łap Termin - Będzie Łapastycznie! 🐾
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 max-w-3xl mx-auto mb-6">
              Masz pytania dotyczące naszych cenników lub usług? Potrzebujesz czegoś spersonalizowanego? 
              Skontaktuj się z nami, a z przyjemnością pomożemy! Nawet jeśli Twój chomik ma wymagania jak gwiazda Hollywood! 🐹✨
            </p>
            <motion.button
              className="px-8 py-3 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700 transition-colors inline-flex items-center gap-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Mrrruknij Do Nas 📞
            </motion.button>
          </div>
        </div>
      </ColorfulSection>
      
      <Footer />
    </main>
  );
} 