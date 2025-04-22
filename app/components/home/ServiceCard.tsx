'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  link: string;
  color?: 'primary' | 'secondary' | 'tertiary' | 'accent';
}

export default function ServiceCard({
  title,
  description,
  icon,
  link,
  color = 'primary'
}: ServiceCardProps) {
  const colorClasses = {
    primary: 'from-[var(--primary)] to-[var(--primary)]/80',
    secondary: 'from-[var(--secondary)] to-[var(--secondary)]/80',
    tertiary: 'from-[var(--tertiary)] to-[var(--tertiary)]/80',
    accent: 'from-[var(--accent)] to-[var(--accent)]/80'
  };

  return (
    <Link href={link}>
      <motion.div
        className="h-full bg-white rounded-2xl shadow-md overflow-hidden transition-all"
        whileHover={{ y: -8, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Icon Container */}
        <div className={`p-6 bg-gradient-to-br ${colorClasses[color]} text-white flex items-center justify-center`}>
          <div className="h-16 w-16">
            {icon}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 text-[var(--text)]">{title}</h3>
          <p className="text-gray-600">{description}</p>
          
          <motion.div 
            className="mt-4 inline-flex items-center font-medium text-[var(--primary)]"
            whileHover={{ x: 4 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            Learn more
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
} 