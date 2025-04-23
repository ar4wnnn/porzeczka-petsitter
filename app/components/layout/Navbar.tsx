'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const NavLink = ({ 
  href, 
  children,
  isMobile = false
}: { 
  href: string; 
  children: React.ReactNode;
  isMobile?: boolean;
}) => {
  const baseClasses = "transition-all duration-300 font-medium";
  const desktopClasses = "px-3 py-2 rounded-md hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-light)]/10";
  const mobileClasses = "block w-full py-3 px-4 text-center hover:bg-gray-50 hover:text-[var(--color-primary)]";
  
  return (
    <Link 
      href={href}
      className={`${baseClasses} ${isMobile ? mobileClasses : desktopClasses}`}
    >
      {children}
    </Link>
  );
};

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
      scrolled ? 'bg-white shadow-md py-2' : 'bg-white/90 backdrop-blur-sm py-3'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-10 h-10">
            <Image
              src="/images/logo.png"
              alt="Porzeczka Petsitter Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-xl font-bold text-[var(--color-primary)]">Porzeczka</span>
        </Link>

        <button 
          className="block sm:hidden p-2 focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            className="w-6 h-6 text-gray-700"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
            />
          </svg>
        </button>

        <ul className="hidden sm:flex items-center space-x-1">
          <li>
            <NavLink href="/">Home</NavLink>
          </li>
          <li>
            <NavLink href="/services">Usługi</NavLink>
          </li>
          <li>
            <NavLink href="/about">O nas</NavLink>
          </li>
          <li>
            <NavLink href="/gallery">Galeria</NavLink>
          </li>
          <li>
            <NavLink href="/contact">Kontakt</NavLink>
          </li>
          <li className="ml-2">
            <Link 
              href="/book" 
              className="px-5 py-2 bg-[var(--color-primary)] text-white rounded-full font-medium hover:bg-[var(--color-primary-dark)] transition-all transform hover:scale-105 focus:outline-none shadow-sm"
            >
              Zarezerwuj
            </Link>
          </li>
        </ul>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 bg-white shadow-lg sm:hidden overflow-hidden"
          >
            <div className="py-2">
              <NavLink href="/" isMobile>Home</NavLink>
              <NavLink href="/services" isMobile>Usługi</NavLink>
              <NavLink href="/about" isMobile>O nas</NavLink>
              <NavLink href="/gallery" isMobile>Galeria</NavLink>
              <NavLink href="/contact" isMobile>Kontakt</NavLink>
              <div className="px-4 py-3">
                <Link 
                  href="/book" 
                  className="block w-full py-3 bg-[var(--color-primary)] text-white rounded-md font-medium text-center hover:bg-[var(--color-primary-dark)] transition-all"
                >
                  Zarezerwuj
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}