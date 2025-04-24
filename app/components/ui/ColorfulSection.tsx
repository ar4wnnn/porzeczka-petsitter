'use client';

import { ReactNode, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import WaveDivider from './WaveDivider';

interface ColorfulSectionProps {
  children: ReactNode;
  backgroundColor: string;
  nextSectionColor: string;
  waveDivider?: boolean;
  wavePattern?: 'wave1' | 'wave2' | 'wave3' | 'zigzag' | 'curved' | 'layered' | 'wavy';
  waveHeight?: number;
  animateWave?: boolean;
  reverseWave?: boolean;
  withFloatingShapes?: boolean;
  className?: string;
}

// Predefined positions and animations for the circles
const circlePositions = [
  { left: '15%', top: '20%', xMove: 15, yMove: 20, rotate: 45 },
  { left: '65%', top: '10%', xMove: -20, yMove: 15, rotate: 90 },
  { left: '40%', top: '70%', xMove: 25, yMove: -15, rotate: 60 },
];

export default function ColorfulSection({
  children,
  backgroundColor,
  nextSectionColor,
  waveDivider = true,
  wavePattern = 'wave1',
  waveHeight = 100,
  animateWave = true,
  reverseWave = false,
  withFloatingShapes = false,
  className = ''
}: ColorfulSectionProps) {
  // Use client-side state to prevent hydration errors
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section
      className={`relative pt-32 pb-24 z-10 ${className}`}
      style={{ 
        background: `linear-gradient(to bottom, ${backgroundColor} 0%, ${backgroundColor} 40%, ${nextSectionColor} 100%)`,
      }}
    >
      {/* Optional floating shapes */}
      {withFloatingShapes && isMounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Circles */}
          {[...Array(3)].map((_, index) => (
            <motion.div
              key={`circle-${index}`}
              className="absolute rounded-full"
              style={{
                width: (index + 2) * 60,
                height: (index + 2) * 60,
                border: `2px solid rgba(255, 255, 255, 0.15)`,
                left: circlePositions[index].left,
                top: circlePositions[index].top,
              }}
              animate={{
                x: [0, circlePositions[index].xMove, 0],
                y: [0, circlePositions[index].yMove, 0],
                rotate: [0, circlePositions[index].rotate, 0],
              }}
              transition={{
                duration: 15 + index * 5,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.5, 1],
              }}
            />
          ))}

          {/* Blobs */}
          <motion.div
            className="absolute bg-white/5 rounded-[40%_60%_70%_30%/40%_50%_60%_50%]"
            style={{
              width: 300,
              height: 300,
              right: '10%',
              bottom: '20%',
              filter: 'blur(40px)',
            }}
            animate={{
              borderRadius: [
                '40% 60% 70% 30% / 40% 50% 60% 50%',
                '70% 30% 50% 50% / 30% 60% 40% 70%',
                '40% 60% 70% 30% / 40% 50% 60% 50%'
              ]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.5, 1]
            }}
          />
        </div>
      )}

      {/* Main content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Wave divider at the bottom */}
      {waveDivider && (
        <WaveDivider
          topColor={backgroundColor}
          bottomColor={nextSectionColor}
          direction={reverseWave ? 'reverse' : 'normal'}
          height={waveHeight}
          pattern={wavePattern}
          animate={animateWave}
        />
      )}
    </section>
  );
} 