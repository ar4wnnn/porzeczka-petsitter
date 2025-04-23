'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  permalink: string;
  timestamp: string;
  username: string;
}

export default function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'grid' | 'slideshow'>('grid');
  const [activeSlide, setActiveSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Fetch Instagram posts from our API
  useEffect(() => {
    async function fetchInstagramPosts() {
      try {
        setLoading(true);
        const response = await fetch('/api/instagram');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch Instagram posts: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (data.success && data.posts) {
          setPosts(data.posts);
        } else {
          throw new Error(data.message || 'Failed to fetch Instagram posts');
        }
      } catch (err) {
        console.error('Error fetching Instagram posts:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchInstagramPosts();
  }, []);

  // Handle slideshow autoplay
  useEffect(() => {
    if (!autoplay || currentView !== 'slideshow' || posts.length === 0) return;
    
    const interval = setInterval(() => {
      setActiveSlide((current) => (current + 1) % posts.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [autoplay, currentView, posts.length]);

  const toggleView = () => {
    setCurrentView(prev => prev === 'grid' ? 'slideshow' : 'grid');
  };

  const handleNext = () => {
    if (posts.length === 0) return;
    setAutoplay(false);
    setActiveSlide((current) => (current + 1) % posts.length);
  };

  const handlePrev = () => {
    if (posts.length === 0) return;
    setAutoplay(false);
    setActiveSlide((current) => 
      current === 0 ? posts.length - 1 : current - 1
    );
  };

  const handleDotClick = (index: number) => {
    setAutoplay(false);
    setActiveSlide(index);
  };

  // Format date to relative time (like "2 days ago")
  const formatRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
      }
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 30) {
      const diffWeeks = Math.floor(diffDays / 7);
      return `${diffWeeks} week${diffWeeks !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 365) {
      const diffMonths = Math.floor(diffDays / 30);
      return `${diffMonths} month${diffMonths !== 1 ? 's' : ''} ago`;
    } else {
      const diffYears = Math.floor(diffDays / 365);
      return `${diffYears} year${diffYears !== 1 ? 's' : ''} ago`;
    }
  };

  if (loading) {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded-md w-64 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-200 rounded-md w-48 mx-auto mb-12"></div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="aspect-square bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || posts.length === 0) {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-textcolor)] mb-4">
            Śledź Nas na <span className="text-[var(--color-primary)]">Instagramie</span> 📸
          </h2>
          <p className="text-lg text-gray-600 mb-6">@porzeczka_petsitter</p>
          <div className="bg-red-50 text-red-600 p-4 rounded-md max-w-xl mx-auto">
            {error || "Nie mogliśmy załadować postów z Instagrama. Odwiedź nasz profil bezpośrednio! 🐾"}
          </div>
          <div className="mt-6">
            <Link 
              href="https://www.instagram.com/porzeczka_petsitter/" 
              target="_blank"
              className="px-5 py-2 bg-[var(--color-primary)] text-white rounded-full hover:shadow-md transition-all"
            >
              Zobacz Nasz Instagram 🤳
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-[var(--color-textcolor)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Śledź Nas na <span className="text-[var(--color-primary)]">Instagramie</span> 📸
            </motion.h2>
            <motion.p 
              className="mt-2 text-lg text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              @porzeczka_petsitter 🐶 🐱 ❤️
            </motion.p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Link 
              href="https://www.instagram.com/porzeczka_petsitter/" 
              target="_blank"
              className="px-5 py-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white rounded-full hover:shadow-lg transition-all transform hover:scale-105"
            >
              Odwiedź Instagram 🤳
            </Link>
          </div>
        </div>

        {/* Grid View */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {posts.map((post, index) => (
            <motion.div 
              key={post.id}
              className="relative aspect-square overflow-hidden rounded-xl group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => window.open(post.permalink, '_blank')}
            >
              <Image 
                src={post.imageUrl}
                alt={`Post na Instagramie od ${post.username}: ${post.caption}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <p className="text-white text-sm line-clamp-2">{post.caption}</p>
                <div className="flex items-center mt-2">
                  <span className="text-white text-xs ml-auto">{formatRelativeTime(post.timestamp)}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 