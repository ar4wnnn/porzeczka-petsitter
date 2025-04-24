'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ReactNode } from 'react';

interface TestimonialCardProps {
  name: string;
  location: string;
  testimonial: string;
  rating: number;
  image?: string;
  timeAgo: string;
}

export default function TestimonialCard({
  name,
  location,
  testimonial,
  rating,
  image,
  timeAgo
}: TestimonialCardProps) {
  // Generate stars based on rating
  const renderStars = () => {
    // Explicitly type the array as JSX.Element[] to prevent the 'never' type error
    const stars = [] as JSX.Element[];
    
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`h-5 w-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>
      );
    }
    
    return stars;
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-md p-6 h-full"
      whileHover={{
        y: -5,
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-4">
        <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
          {image ? (
            <Image
              src={image}
              alt={`${name} from ${location}`}
              width={48}
              height={48}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-[var(--primary)] text-white text-lg font-bold">
              {name.charAt(0)}
            </div>
          )}
        </div>
        <div className="ml-3">
          <h3 className="font-semibold text-[var(--text)]">{name}</h3>
          <p className="text-gray-500 text-sm">{location}</p>
        </div>
      </div>

      <div className="flex mb-3">
        {renderStars()}
      </div>

      <p className="text-gray-600 mb-3">"{testimonial}"</p>

      <div className="text-sm text-gray-500">
        <span>{timeAgo} ago</span>
      </div>
    </motion.div>
  );
} 