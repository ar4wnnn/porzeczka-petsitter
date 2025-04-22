'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
  cardColor?: 'white' | 'primary' | 'secondary' | 'tertiary';
}

export default function Card({
  children,
  className = '',
  onClick,
  hoverEffect = true,
  cardColor = 'white'
}: CardProps) {
  const baseClasses = 'rounded-2xl shadow-md p-6 transition-all duration-300';
  
  const colorClasses = {
    white: 'bg-white',
    primary: 'bg-[var(--primary)] text-white',
    secondary: 'bg-[var(--secondary)] text-white',
    tertiary: 'bg-[var(--tertiary)] text-[var(--text)]'
  };
  
  const classes = `${baseClasses} ${colorClasses[cardColor]} ${className}`;
  
  return (
    <motion.div
      className={classes}
      onClick={onClick}
      whileHover={hoverEffect ? {
        y: -5,
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        transition: { duration: 0.3 }
      } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
} 