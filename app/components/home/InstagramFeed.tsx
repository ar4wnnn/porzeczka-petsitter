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
            Follow Us on <span className="text-[var(--color-primary)]">Instagram</span>
          </h2>
          <p className="text-lg text-gray-600 mb-6">@porzeczka_petsitter</p>
          <div className="bg-red-50 text-red-600 p-4 rounded-md max-w-xl mx-auto">
            {error || "Couldn't load Instagram posts. Please visit our Instagram page directly."}
          </div>
          <div className="mt-6">
            <Link 
              href="https://www.instagram.com/porzeczka_petsitter/" 
              target="_blank"
              className="px-5 py-2 bg-[var(--color-primary)] text-white rounded-full hover:shadow-md transition-all"
            >
              Visit Our Instagram
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
              Follow Us on <span className="text-[var(--color-primary)]">Instagram</span>
            </motion.h2>
            <motion.p 
              className="mt-2 text-lg text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              @porzeczka_petsitter
            </motion.p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <button 
              onClick={toggleView}
              className="px-5 py-2 bg-[var(--color-secondary)] text-white rounded-full hover:shadow-md transition-all"
            >
              {currentView === 'grid' ? 'View Slideshow' : 'View Grid'}
            </button>
            <Link 
              href="https://www.instagram.com/porzeczka_petsitter/" 
              target="_blank"
              className="ml-4 px-5 py-2 border border-[var(--color-primary)] text-[var(--color-primary)] rounded-full hover:bg-[var(--color-primary)] hover:text-white transition-all"
            >
              Visit Instagram
            </Link>
          </div>
        </div>

        {/* Grid View */}
        {currentView === 'grid' && (
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
                  alt={`Instagram post by ${post.username}: ${post.caption}`}
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
        )}

        {/* Slideshow View */}
        {currentView === 'slideshow' && (
          <div className="relative" ref={sliderRef}>
            <div className="relative aspect-[16/9] md:aspect-[3/2] overflow-hidden rounded-xl shadow-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={posts[activeSlide].imageUrl}
                    alt={`Instagram post by ${posts[activeSlide].username}: ${posts[activeSlide].caption}`}
                    fill
                    className="object-cover"
                    priority
                  />
                  <Link
                    href={posts[activeSlide].permalink}
                    target="_blank"
                    className="absolute inset-0 z-10"
                    aria-label="View on Instagram"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <p className="text-white text-xl md:text-2xl font-medium">{posts[activeSlide].caption}</p>
                    <div className="flex items-center mt-2">
                      <span className="text-white ml-auto">{formatRelativeTime(posts[activeSlide].timestamp)}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation arrows */}
              <button 
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[var(--color-textcolor)] rounded-full p-3 shadow-md z-20 transition-all"
                aria-label="Previous image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button 
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[var(--color-textcolor)] rounded-full p-3 shadow-md z-20 transition-all"
                aria-label="Next image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>

            {/* Thumbnails/indicators */}
            <div className="flex justify-center mt-6 gap-2">
              {posts.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleDotClick(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx === activeSlide 
                      ? 'bg-[var(--color-primary)] scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`View Instagram post ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
} 