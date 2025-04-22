'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  imageUrl: string;
  color: string;
}

export default function InteractiveServiceCard({
  title,
  description,
  icon,
  imageUrl,
  color
}: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top; // y position within the element
    
    // Calculate rotation based on mouse position
    // The further from center, the more rotation
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Limit rotation to a reasonable amount
    const rotateY = ((x - centerX) / centerX) * 10; // max ±10 degrees
    const rotateX = ((centerY - y) / centerY) * 10; // max ±10 degrees
    
    setRotateX(rotateX);
    setRotateY(rotateY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative rounded-xl overflow-hidden w-full h-80 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        className="absolute inset-0 w-full h-full rounded-xl bg-white shadow-lg overflow-hidden"
        style={{
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateX: rotateX,
          rotateY: rotateY,
          scale: isHovered ? 1.03 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 15,
        }}
      >
        {/* Background image with gradient overlay */}
        <div className="absolute inset-0 opacity-90">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
          />
          <div 
            className="absolute inset-0" 
            style={{ 
              background: `linear-gradient(135deg, ${color}99 0%, ${color}33 100%)`,
              backdropFilter: 'blur(2px)',
            }}
          />
        </div>

        {/* Icon with glowing effect */}
        <div className="absolute top-6 right-6 w-16 h-16 flex items-center justify-center rounded-full bg-white/90 shadow-lg glowing">
          <div className="text-3xl">
            {icon}
          </div>
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white" 
          style={{ 
            transform: "translateZ(20px)",
            textShadow: "0 2px 5px rgba(0, 0, 0, 0.2)"
          }}
        >
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          
          <motion.div
            initial={{ height: "0" }}
            animate={{ height: isHovered ? "auto" : "0" }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-sm text-white/90 mb-4">{description}</p>
            
            <motion.button
              className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
        
        {/* Floating particles (decorative) */}
        {isHovered && (
          <>
            <motion.div
              className="absolute w-6 h-6 rounded-full bg-white/30"
              initial={{ x: "10%", y: "40%", opacity: 0 }}
              animate={{ y: "10%", opacity: 0.6 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              style={{ filter: "blur(1px)" }}
            />
            <motion.div
              className="absolute w-4 h-4 rounded-full bg-white/30"
              initial={{ x: "80%", y: "80%", opacity: 0 }}
              animate={{ y: "60%", opacity: 0.4 }}
              transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse" }}
              style={{ filter: "blur(1px)" }}
            />
          </>
        )}
      </motion.div>
    </motion.div>
  );
} 