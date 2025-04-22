'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface WaveDividerProps {
  topColor: string;
  bottomColor: string;
  direction?: 'normal' | 'reverse';
  height?: number;
  pattern?: 'wave1' | 'wave2' | 'wave3' | 'zigzag' | 'curved' | 'layered' | 'wavy';
  animate?: boolean;
}

export default function WaveDivider({
  topColor,
  bottomColor,
  direction = 'normal',
  height = 100,
  pattern = 'wave1',
  animate = true
}: WaveDividerProps) {
  // Use client-side state to prevent hydration errors
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Invert colors if direction is reverse
  const actualTopColor = direction === 'normal' ? topColor : bottomColor;
  const actualBottomColor = direction === 'normal' ? bottomColor : topColor;

  // SVG path patterns
  const patterns = {
    wave1: 'M0,0 C250,80 350,0 500,80 C650,160 750,80 1000,0 V100 H0 Z',
    wave2: 'M0,0 C80,40 280,100 500,50 C700,0 920,80 1000,30 V100 H0 Z',
    wave3: 'M0,20 C200,60 300,0 500,60 C700,120 800,10 1000,80 V100 H0 Z',
    zigzag: 'M0,40 L100,60 L200,30 L300,70 L400,40 L500,80 L600,20 L700,50 L800,10 L900,60 L1000,0 V100 H0 Z',
    curved: 'M0,0 C500,100 500,0 1000,100 V100 H0 Z',
    layered: 'M0,0 L0,20 C250,40 350,0 500,20 C650,40 750,20 1000,30 L1000,0 Z M0,20 L0,60 C250,80 350,50 500,70 C650,90 750,60 1000,70 L1000,30 Z M0,60 L0,100 L1000,100 L1000,70 C750,50 650,80 500,60 C350,40 250,70 0,60 Z',
    wavy: 'M0,30 C150,10 250,50 350,30 C450,10 550,50 650,30 C750,10 850,50 1000,30 V100 H0 Z',
  };

  const selectedPattern = patterns[pattern];

  // Animation variants
  const waveVariants = {
    animate: {
      x: [0, -1000],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 25,
          ease: "linear",
        }
      }
    },
    static: { x: 0 }
  };

  // For layered pattern, return a different structure
  if (pattern === 'layered') {
    return (
      <div 
        className="relative w-full overflow-hidden"
        style={{ 
          height: `${height}px`,
          marginTop: `-${height}px`,
          zIndex: 2,
        }}
      >
        <div className="absolute inset-0">
          <svg
            viewBox="0 0 1000 100"
            preserveAspectRatio="none"
            className="absolute w-full h-full"
            style={{ transform: direction === 'reverse' ? 'rotate(180deg)' : 'none' }}
          >
            <g fill={actualTopColor}>
              <motion.path
                key="layer1"
                d="M0,0 L0,20 C250,40 350,0 500,20 C650,40 750,20 1000,30 L1000,0 Z"
                animate={isMounted && animate ? { 
                  x: [0, -1000, 0],
                  transition: { 
                    repeat: Infinity, 
                    duration: 20, 
                    ease: "linear" 
                  }
                } : undefined}
              />
            </g>
            <g fill={actualTopColor}>
              <motion.path
                key="layer2"
                d="M0,20 L0,60 C250,80 350,50 500,70 C650,90 750,60 1000,70 L1000,30 Z"
                animate={isMounted && animate ? { 
                  x: [0, -800, 0],
                  transition: { 
                    repeat: Infinity, 
                    duration: 25, 
                    ease: "linear" 
                  }
                } : undefined}
              />
            </g>
            <g fill={actualBottomColor}>
              <motion.path
                key="layer3"
                d="M0,60 L0,100 L1000,100 L1000,70 C750,50 650,80 500,60 C350,40 250,70 0,60 Z"
                animate={isMounted && animate ? { 
                  x: [0, -1200, 0],
                  transition: { 
                    repeat: Infinity, 
                    duration: 30, 
                    ease: "linear" 
                  }
                } : undefined}
              />
            </g>
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="relative w-full overflow-hidden"
      style={{ 
        height: `${height}px`,
        marginTop: `-${height}px`,
        zIndex: 2,
      }}
    >
      <div className="absolute inset-0">
        <svg
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
          className="absolute w-full h-full"
          style={{ transform: direction === 'reverse' ? 'rotate(180deg)' : 'none' }}
        >
          <motion.path
            key="standard-wave"
            d={selectedPattern}
            fill={actualTopColor}
            animate={isMounted && animate ? { 
              x: [0, -1000, 0],
              transition: { 
                repeat: Infinity, 
                duration: pattern === 'wavy' ? 15 : 20, 
                ease: "linear" 
              }
            } : undefined}
          />
        </svg>
        <div
          className="absolute bottom-0 w-full"
          style={{ 
            height: '50%', 
            backgroundColor: actualBottomColor
          }}
        />
      </div>
    </div>
  );
} 