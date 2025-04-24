import Link from 'next/link';
import { ReactNode } from 'react';

interface HomeHeroButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export default function HomeHeroButton({ href, children, className = '' }: HomeHeroButtonProps) {
  return (
    <Link 
      href={href}
      className={`relative inline-block px-8 py-3 rounded-full 
        font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-700 
        hover:from-purple-700 hover:to-indigo-800 transition-all duration-300 
        shadow-lg hover:shadow-xl transform hover:scale-105 ${className}`}
    >
      <span>{children}</span>
    </Link>
  );
} 