'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Bubble {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  color: string;
  opacity: number;
}

export default function BubbleBackground() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Colors for bubbles
  const colors = [
    'var(--color-primary)',
    'var(--color-secondary)',
    'var(--color-tertiary)',
    'var(--color-accent)',
    'var(--color-accent-2)',
    'var(--color-accent-3)',
  ];

  useEffect(() => {
    // Set initial window size
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Handle window resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    // Generate bubbles
    const newBubbles: Bubble[] = [];
    const numBubbles = Math.min(25, Math.floor(window.innerWidth / 50)); // Responsive number of bubbles

    for (let i = 0; i < numBubbles; i++) {
      newBubbles.push({
        id: i,
        size: Math.random() * 60 + 20, // Random size between 20px and 80px
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        duration: Math.random() * 10 + 10, // Random duration between 10s and 20s
        delay: Math.random() * 5, // Random delay between 0s and 5s
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.3 + 0.1, // Random opacity between 0.1 and 0.4
      });
    }

    setBubbles(newBubbles);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full"
          style={{
            width: bubble.size,
            height: bubble.size,
            backgroundColor: bubble.color,
            opacity: bubble.opacity,
            x: bubble.x,
            y: bubble.y,
            filter: 'blur(8px)',
          }}
          animate={{
            y: [bubble.y, bubble.y - 200, bubble.y],
            x: [bubble.x, bubble.x + (Math.random() * 100 - 50), bubble.x],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
} 