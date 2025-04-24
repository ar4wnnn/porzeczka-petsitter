'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ocean' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  icon?: ReactNode;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  fullWidth = false,
  icon
}: ButtonProps) {
  const baseClasses = 'rounded-full font-medium transition-all flex items-center justify-center';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] text-white hover:shadow-lg',
    secondary: 'bg-gradient-to-r from-[#81C784] to-[#4CAF50] text-white hover:shadow-lg',
    outline: 'bg-transparent border-2 border-[var(--secondary-color)] text-[var(--primary-color)] hover:bg-[var(--secondary-color)] hover:bg-opacity-10',
    ocean: 'bg-gradient-to-r from-[var(--blue-medium)] via-[var(--primary-color)] to-[var(--blue-light)] text-white hover:shadow-lg',
    dark: 'bg-gradient-to-r from-[var(--blue-dark)] to-[var(--blue-medium)] text-white hover:shadow-lg'
  };
  
  const sizeClasses = {
    sm: 'text-xs py-2 px-4',
    md: 'text-sm py-3 px-6',
    lg: 'text-base py-4 px-8'
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;
  
  const shadowColors = {
    primary: 'rgba(152, 189, 255, 0.6)',
    secondary: 'rgba(129, 199, 132, 0.6)',
    outline: 'rgba(152, 189, 255, 0.4)',
    ocean: 'rgba(59, 106, 160, 0.6)',
    dark: 'rgba(30, 58, 95, 0.6)'
  };
  
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      whileHover={{ scale: disabled ? 1 : 1.05, boxShadow: `0 8px 25px ${shadowColors[variant]}` }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      style={{
        boxShadow: `0 4px 15px ${shadowColors[variant].replace('0.6', '0.4')}`,
        backgroundSize: '200% auto'
      }}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </motion.button>
  );
} 