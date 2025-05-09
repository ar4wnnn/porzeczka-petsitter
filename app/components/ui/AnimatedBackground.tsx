'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  className?: string;
}

export default function AnimatedBackground({ className = '' }: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Call initially and on resize
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Define colors from our design
    const colors = [
      'rgba(186, 230, 253, 0.3)', // Sky Light at 30%
      'rgba(56, 189, 248, 0.2)',  // Sky Medium at 20%
      'rgba(209, 213, 219, 0.3)', // Stone Light at 30%
      'rgba(156, 163, 175, 0.2)'  // Stone Medium at 20%
    ];
    
    // Create bubbles
    const bubbles: {
      x: number;
      y: number;
      radius: number;
      color: string;
      vx: number;
      vy: number;
    }[] = [];
    
    const createBubbles = () => {
      const numBubbles = Math.floor(window.innerWidth / 100);
      
      for (let i = 0; i < numBubbles; i++) {
        bubbles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 100 + 50,
          color: colors[Math.floor(Math.random() * colors.length)],
          vx: Math.random() * 0.2 - 0.1,
          vy: Math.random() * 0.2 - 0.1
        });
      }
    };
    
    createBubbles();
    
    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update bubbles
      bubbles.forEach(bubble => {
        // Draw bubble
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fillStyle = bubble.color;
        ctx.fill();
        
        // Update position
        bubble.x += bubble.vx;
        bubble.y += bubble.vy;
        
        // Bounce off walls
        if (bubble.x < -bubble.radius) bubble.x = canvas.width + bubble.radius;
        if (bubble.x > canvas.width + bubble.radius) bubble.x = -bubble.radius;
        if (bubble.y < -bubble.radius) bubble.y = canvas.height + bubble.radius;
        if (bubble.y > canvas.height + bubble.radius) bubble.y = -bubble.radius;
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, []);
  
  return (
    <motion.div
      className={`fixed inset-0 -z-10 overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full bg-[var(--background)]"
      />
    </motion.div>
  );
} 