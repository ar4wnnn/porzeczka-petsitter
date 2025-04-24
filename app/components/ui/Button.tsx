'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
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
    primary: 'bg-gradient-to-r from-[#FF6B9E] to-[#B86EFF] text-white hover:shadow-lg',
    secondary: 'bg-gradient-to-r from-[#81C784] to-[#4CAF50] text-white hover:shadow-lg',
    outline: 'bg-transparent border-2 border-[#B86EFF] text-[#B86EFF] hover:bg-[#B86EFF] hover:bg-opacity-10'
  };
  
  const sizeClasses = {
    sm: 'text-xs py-2 px-4',
    md: 'text-sm py-3 px-6',
    lg: 'text-base py-4 px-8'
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;
  
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      whileHover={{ scale: disabled ? 1 : 1.05, boxShadow: '0 8px 25px rgba(184, 110, 255, 0.6)' }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      style={{
        boxShadow: '0 4px 15px rgba(184, 110, 255, 0.4)'
      }}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </motion.button>
  );
} 