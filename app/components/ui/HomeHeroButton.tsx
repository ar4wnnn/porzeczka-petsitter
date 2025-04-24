'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

type HomeHeroButtonVariant = 'primary' | 'secondary';

type HomeHeroButtonProps = {
  children: ReactNode;
  href: string;
  variant?: HomeHeroButtonVariant;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  external?: boolean;
};

const HomeHeroButton = ({
  children,
  href,
  variant = 'primary',
  className = '',
  onClick,
  disabled = false,
  external = false,
}: HomeHeroButtonProps) => {
  const buttonHoverAnimation = {
    primary: {
      scale: 1.1,
      boxShadow: '0 8px 25px rgba(184, 110, 255, 0.6)',
      transition: {
        duration: 0.3
      }
    },
    secondary: {
      scale: 1.1, 
      boxShadow: '0 8px 25px rgba(184, 110, 255, 0.4)',
      transition: {
        duration: 0.3
      }
    }
  };

  const baseStyles = {
    padding: '1rem 2rem',
    borderRadius: '9999px',
    fontWeight: 700,
    fontSize: '1.2rem',
    textDecoration: 'none',
    display: 'inline-block',
    transition: 'all 0.3s ease',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.7 : 1,
  };

  const variantStyles = {
    primary: {
      background: 'linear-gradient(to right, #FF6B9E, #B86EFF)',
      color: 'white',
      boxShadow: '0 4px 15px rgba(184, 110, 255, 0.4)',
      border: 'none',
    },
    secondary: {
      background: 'rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)',
      color: '#B86EFF',
      border: '2px solid #B86EFF',
      boxShadow: '0 4px 15px rgba(184, 110, 255, 0.2)',
    },
  };

  const buttonStyle = {
    ...baseStyles,
    ...variantStyles[variant],
  };

  const linkProps = external 
    ? { href, target: '_blank', rel: 'noopener noreferrer' } 
    : { href };

  const content = (
    <motion.div
      style={buttonStyle}
      whileHover={!disabled ? buttonHoverAnimation[variant] : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={!disabled ? onClick : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );

  return disabled ? (
    content
  ) : (
    <Link {...linkProps}>
      {content}
    </Link>
  );
};

export default HomeHeroButton; 