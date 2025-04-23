'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CSSProperties } from 'react';

// Define styles with proper typing
const styles: Record<string, CSSProperties> = {
  navbar: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: 'white',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    padding: '0.75rem 0',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  logoImage: {
    borderRadius: '50%',
    overflow: 'hidden',
  },
  logoText: {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: '#E57373',
  },
  navLinks: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
  },
  navLink: {
    fontSize: '1rem',
    fontWeight: 600,
    color: '#4E342E',
    textDecoration: 'none',
    padding: '0.5rem',
    borderRadius: '0.25rem',
    transition: 'all 0.3s ease',
  },
  activeNavLink: {
    color: '#E57373',
  },
  mobileMenuButton: {
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    display: 'none',
  },
  mobileMenu: {
    position: 'fixed' as const,
    top: '4rem',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
    zIndex: 999,
  },
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  // Create custom hover behavior with useState
  const [isHovered, setIsHovered] = useState(false);
  
  const linkStyle: CSSProperties = {
    ...styles.navLink,
    color: isHovered ? '#E57373' : '#4E342E',
    backgroundColor: isHovered ? 'rgba(229, 115, 115, 0.1)' : 'transparent',
  };
  
  return (
    <Link 
      href={href}
      style={linkStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </Link>
  );
};

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav style={styles.navbar} className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <Link href="/" className="navbar-brand d-flex align-items-center">
          <div style={{ width: '40px', height: '40px', position: 'relative' }}>
            <Image
              src="/images/logo.png"
              alt="Porzeczka Petsitter Logo"
              fill
              style={{objectFit: 'contain'}}
            />
          </div>
          <span className="ms-2 fw-bold" style={{color: '#E57373'}}>Porzeczka</span>
        </Link>

        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={toggleMobileMenu}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${mobileMenuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink href="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink href="/services">Usługi</NavLink>
            </li>
            <li className="nav-item">
              <NavLink href="/about">O nas</NavLink>
            </li>
            <li className="nav-item">
              <NavLink href="/gallery">Galeria</NavLink>
            </li>
            <li className="nav-item">
              <NavLink href="/contact">Kontakt</NavLink>
            </li>
            <li className="nav-item">
              <Link 
                href="/book" 
                className="btn" 
                style={{
                  backgroundColor: '#E57373',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '9999px',
                  fontWeight: 600,
                }}
              >
                Zarezerwuj
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}