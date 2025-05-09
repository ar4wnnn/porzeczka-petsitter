'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isMobile?: boolean;
  index?: number;
  totalLinks?: number;
}

const NavLink = ({ 
  href, 
  children,
  isMobile = false,
  index = 0,
  totalLinks = 5,
}: NavLinkProps) => {
  const baseClasses = "transition-all duration-300 font-black relative overflow-hidden";
  const desktopClasses = "px-3 py-2 rounded-md hover:bg-sky-dark/10";
  const mobileClasses = "block w-full py-3 px-4 text-center hover:bg-stone-light";
  
  const gradientStyle = {
    background: `linear-gradient(90deg, 
      var(--sky-dark) ${index * (100/totalLinks)}%, 
      var(--sky-medium) ${(index * (100/totalLinks) + 25)}%,
      var(--sky-light) ${(index + 0.75) * (100/totalLinks)}%,
      var(--sky-medium) ${(index + 1) * (100/totalLinks)}%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    color: 'var(--stone-dark)',
    backgroundSize: '200% auto',
    animation: 'shimmer 3s linear infinite',
    fontWeight: 900,
  };
  
  return (
    <Link 
      href={href}
      className={`${baseClasses} ${isMobile ? mobileClasses : desktopClasses}`}
      style={gradientStyle}
    >
      {children}
      <style jsx global>{`
        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </Link>
  );
};

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navLinks = ['Home', 'Usługi', 'O nas', 'Galeria', 'Kontakt'];
  const navHrefs = ['/', '/services', '/about', '/gallery', '/contact'];

  const buttonStyle = {
    background: 'linear-gradient(45deg, var(--sky-medium), var(--sky-dark))',
    color: 'var(--frost)',
    padding: '0.75rem 1.5rem',
    borderRadius: '9999px',
    fontWeight: 700,
    fontSize: '1rem',
    textDecoration: 'none',
    display: 'inline-block',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(56, 189, 248, 0.3)',
    border: 'none',
    backgroundSize: '200% auto',
    animation: 'shimmerButton 3s linear infinite',
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
      scrolled ? 'bg-frost shadow-md py-2' : 'bg-frost/90 backdrop-blur-sm py-3'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <div className="relative w-45 h-45">
            <Image
              src="/images/logo.png"
              alt="Porzeczka Petsitter Logo"
              width={180}
              height={180}
              className="object-contain"
              priority
            />
          </div>
        </Link>

        <button 
          className="block md:hidden p-2 focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            className="w-6 h-6 text-stone-dark"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
            />
          </svg>
        </button>

        <div className="hidden md:flex items-center space-x-2">
          {navLinks.map((link, index) => (
            <NavLink 
              key={link} 
              href={navHrefs[index]}
              index={index}
              totalLinks={navLinks.length}
            >
              {link}
            </NavLink>
          ))}
          <Link 
            href="/book" 
            style={buttonStyle}
            className="ml-4 hover:shadow-lg transition-all transform hover:scale-105 focus:outline-none"
          >
            Zarezerwuj 📅
          </Link>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 bg-frost shadow-lg md:hidden overflow-hidden"
          >
            <div className="py-2">
              {navLinks.map((link, index) => (
                <NavLink 
                  key={link} 
                  href={navHrefs[index]} 
                  isMobile
                  index={index}
                  totalLinks={navLinks.length}
                >
                  {link}
                </NavLink>
              ))}
              <div className="px-4 py-3">
                <Link 
                  href="/book" 
                  style={{...buttonStyle, width: '100%', textAlign: 'center'}}
                  className="block py-3 hover:shadow-lg transition-all"
                >
                  Zarezerwuj 📅
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      <style jsx global>{`
        @keyframes shimmerButton {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </nav>
  );
}