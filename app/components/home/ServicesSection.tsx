'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

// Service card types
interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  link: string;
  color: string;
}

// Service card component
const ServiceCard = ({ title, description, icon, link, color }: ServiceCardProps) => (
  <motion.div 
    className={`bg-white p-6 rounded-xl shadow-md border-l-4 ${color} hover:shadow-lg transition-all`}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
  >
    <div className="flex items-start">
      <div className={`p-3 rounded-lg mr-4 bg-opacity-20 ${color.replace('border', 'bg')}`}>
        <span className="text-2xl">{icon}</span>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <Link href={link} className="text-red-500 font-medium text-sm flex items-center">
          Dowiedz się więcej
          <svg className="ml-1 w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </div>
  </motion.div>
);

export default function ServicesSection() {
  const services = [
    {
      title: 'Spacery z psiakami 🐕',
      description: 'Regularne spacery, zabawy i mnóstwo aktywności, które sprawią, że Twój pupil będzie szczęśliwy i zdrowy.',
      icon: '🦮',
      link: '/services/dog-walking',
      color: 'border-blue-500',
    },
    {
      title: 'Wizyty domowe 🏠',
      description: 'Odwiedzamy Twojego zwierzaka w jego własnym domu, zapewniając mu karmienie, świeżą wodę i towarzystwo.',
      icon: '🐈',
      link: '/services/home-visits',
      color: 'border-green-500',
    },
    {
      title: 'Noclegi dla pupili 🛏️',
      description: 'Twój zwierzak może zostać u nas na noc lub dłużej, w komfortowym i bezpiecznym środowisku.',
      icon: '🛌',
      link: '/services/overnight',
      color: 'border-purple-500',
    },
    {
      title: 'Egzotyczne zwierzęta 🦜',
      description: 'Specjalistyczna opieka dla zwierząt egzotycznych - od świnek morskich po papugi i węże.',
      icon: '🦎',
      link: '/services/exotic',
      color: 'border-yellow-500',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Nasze <span className="text-red-500">Usługi</span> 🐾
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Oferujemy różnorodne usługi opieki nad zwierzętami, aby zaspokoić Twoje potrzeby i sprawić, 
            by Twoi futrzani przyjaciele byli szczęśliwi podczas Twojej nieobecności. Miau i hau! 😸🐶
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1 
              }}
            >
              <ServiceCard
                title={service.title}
                description={service.description}
                icon={service.icon}
                link={service.link}
                color={service.color}
              />
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link href="/services">
            <motion.button 
              className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Zobacz wszystkie usługi 🔍
            </motion.button>
          </Link>
          <p className="mt-4 text-sm text-gray-500">Szukasz czegoś specjalnego? Skontaktuj się z nami! 📞</p>
        </motion.div>
      </div>
    </section>
  );
} 