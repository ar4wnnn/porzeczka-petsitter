'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

const navLinks = [
  {
    name: 'Strona główna',
    href: '/',
  },
  {
    name: 'O nas',
    href: '/about',
  },
  {
    name: 'Usługi 🐾',
    href: '/services',
  },
  {
    name: 'Galeria',
    href: '/gallery',
  },
  {
    name: 'Kontakt',
    href: '/contact',
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <div className="h-40 w-40 relative">
              <Image 
                src="/images/logo.png"
                alt="Porzeczka Pet Sitter Logo"
                fill
                sizes="160px, 160px"
                style={{ objectFit: 'contain' }}
              />
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href}
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium 
                  ${pathname === link.href 
                    ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]' 
                    : 'text-gray-500 hover:text-[var(--color-primary)] hover:border-b-2 hover:border-[var(--color-primary-light)]'
                  }`}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="/contact"
              className="inline-flex items-center px-4 py-2 border border-transparent 
                text-sm font-medium rounded-md shadow-sm text-white 
                bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-primary)] 
                hover:from-[var(--color-primary)] hover:to-[var(--color-primary-dark)]"
            >
              Umów wizytę 😸
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              aria-expanded="false"
            >
              <span className="sr-only">{isOpen ? 'Zamknij menu' : 'Otwórz menu'}</span>
              {isOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 bg-white">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium 
                    ${pathname === link.href 
                      ? 'text-[var(--color-primary)] bg-[var(--color-primary-lightest)]' 
                      : 'text-gray-700 hover:text-[var(--color-primary)] hover:bg-gray-50'
                    }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/contact"
                className="block w-full text-center px-4 py-2 border border-transparent 
                  text-base font-medium rounded-md shadow-sm text-white 
                  bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-primary)] 
                  hover:from-[var(--color-primary)] hover:to-[var(--color-primary-dark)]"
                onClick={() => setIsOpen(false)}
              >
                Umów wizytę 😸
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}