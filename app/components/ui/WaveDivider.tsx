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

  // SVG path patterns - extended to 2000 width for seamless looping
  // The second half of each path is a repetition of the first half, shifted by 1000 units.
  const patterns = {
    wave1: 'M0,0 C250,80 350,0 500,80 C650,160 750,80 1000,0 C1250,80 1350,0 1500,80 C1650,160 1750,80 2000,0 V100 H0 Z',
    wave2: 'M0,0 C80,40 280,100 500,50 C700,0 920,80 1000,30 C1080,40 1280,100 1500,50 C1700,0 1920,80 2000,30 V100 H0 Z',
    wave3: 'M0,20 C200,60 300,0 500,60 C700,120 800,10 1000,80 C1200,60 1300,0 1500,60 C1700,120 1800,10 2000,80 V100 H0 Z',
    zigzag: 'M0,40 L100,60 L200,30 L300,70 L400,40 L500,80 L600,20 L700,50 L800,10 L900,60 L1000,0 L1100,60 L1200,30 L1300,70 L1400,40 L1500,80 L1600,20 L1700,50 L1800,10 L1900,60 L2000,0 V100 H0 Z',
    curved: 'M0,0 C500,100 500,0 1000,100 C1500,100 1500,0 2000,100 V100 H0 Z',
    layered: 'M0,0 L0,20 C250,40 350,0 500,20 C650,40 750,20 1000,30 L1000,0 Z M0,20 L0,60 C250,80 350,50 500,70 C650,90 750,60 1000,70 L1000,30 Z M0,60 L0,100 L1000,100 L1000,70 C750,50 650,80 500,60 C350,40 250,70 0,60 Z',
    wavy: 'M0,30 C150,10 250,50 350,30 C450,10 550,50 650,30 C750,10 850,50 1000,30 C1150,10 1250,50 1350,30 C1450,10 1550,50 1650,30 C1750,10 1850,50 2000,30 V100 H0 Z',
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

  // For layered pattern, return a different structure with its own animation logic
  if (pattern === 'layered') {
    // Layered paths also need to be extended for seamless looping if they animate horizontally
    const layeredPaths = {
        layer1: 'M0,0 L0,20 C250,40 350,0 500,20 C650,40 750,20 1000,30 C1250,40 1350,0 1500,20 C1650,40 1750,20 2000,30 L2000,0 L0,0 Z',
        layer2: 'M0,20 L0,60 C250,80 350,50 500,70 C650,90 750,60 1000,70 C1250,80 1350,50 1500,70 C1650,90 1750,60 2000,70 L2000,30 L1000,30 C750,20 650,40 500,20 C350,0 250,40 0,20 Z',
        layer3: 'M0,60 L0,100 L2000,100 L2000,70 C1750,50 1650,80 1500,60 C1350,40 1250,70 1000,60 C750,50 650,80 500,60 C350,40 250,70 0,60 Z'
    };

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
            viewBox="0 0 1000 100" // ViewBox remains 1000 wide to show one segment
            preserveAspectRatio="none"
            className="absolute w-[200%] h-full" // SVG element is 200% width to hold the doubled path
            style={{ transform: direction === 'reverse' ? 'rotate(180deg)' : 'none' }}
          >
            <defs>
              <linearGradient id="gradientFillLayered" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={actualTopColor} />
                <stop offset="100%" stopColor={actualBottomColor} />
              </linearGradient>
            </defs>
            <g fill="url(#gradientFillLayered)">
              <motion.path
                key="layer1"
                d={layeredPaths.layer1}
                animate={isMounted && animate ? { 
                  x: [0, -1000],
                  transition: { 
                    repeat: Infinity, 
                    duration: 20, 
                    ease: "linear" 
                  }
                } : undefined}
              />
              <motion.path // Adding the middle layer for layered effect - assuming this was intended.
                key="layer2"
                d={layeredPaths.layer2}
                style={{opacity: 0.7}} // Slight opacity for layered effect
                animate={isMounted && animate ? { 
                  x: [0, -1000],
                  transition: { 
                    repeat: Infinity, 
                    duration: 25, // Different duration for parallax
                    ease: "linear" 
                  }
                } : undefined}
              />
              <motion.path
                key="layer3"
                d={layeredPaths.layer3}
                animate={isMounted && animate ? { 
                  x: [0, -1000],
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
          viewBox="0 0 1000 100" // ViewBox remains 1000 wide
          preserveAspectRatio="none"
          className="absolute w-[200%] h-full" // SVG element is 200% width to hold the doubled path
          style={{ transform: direction === 'reverse' ? 'rotate(180deg)' : 'none' }}
        >
          <defs>
            <linearGradient id="gradientFillStandard" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={actualTopColor} />
              <stop offset="100%" stopColor={actualBottomColor} />
            </linearGradient>
          </defs>
          <motion.path
            key="standard-wave"
            d={selectedPattern}
            fill="url(#gradientFillStandard)"
            animate={isMounted && animate ? { 
              x: [0, -1000], // Animate by 1000 units (the width of one segment)
              transition: { 
                repeat: Infinity, 
                repeatType: "loop", // Ensure it loops
                duration: pattern === 'wavy' ? 15 : (pattern === 'zigzag' ? 25 : 20), 
                ease: "linear" 
              }
            } : undefined}
          />
        </svg>
      </div>
    </div>
  );
} 