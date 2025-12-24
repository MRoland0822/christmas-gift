'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface GiftBoxProps {
  onOpen: () => void;
  isOpened: boolean;
}

export default function GiftBox({ onOpen, isOpened }: GiftBoxProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (!isClicked && !isOpened) {
      setIsClicked(true);
      setTimeout(() => onOpen(), 600);
    }
  };

  return (
    <motion.div
      className="relative cursor-pointer"
      animate={
        isClicked
          ? { scale: 1.15, rotateZ: 12 }
          : { scale: 1, rotateZ: 0 }
      }
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {/* SVG Gift Box */}
      <motion.svg
        onClick={handleClick}
        className={`w-64 h-64 md:w-80 md:h-80 drop-shadow-2xl transition-all duration-300 ${
          !isOpened ? 'hover:drop-shadow-[0_0_30px_rgba(255,215,0,0.6)]' : ''
        }`}
        viewBox="0 0 200 200"
        style={{
          filter: isClicked
            ? 'drop-shadow(0 0 40px rgba(255, 215, 0, 0.8))'
            : 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.4))',
        }}
      >
        {/* Main box */}
        <rect x="40" y="80" width="120" height="90" rx="8" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />

        {/* Box lid/top */}
        <rect x="35" y="50" width="130" height="40" rx="8" fill="#EF4444" stroke="#991B1B" strokeWidth="2" />

        {/* Left side shadow */}
        <rect x="40" y="80" width="120" height="8" fill="#9A2C2C" opacity="0.6" />

        {/* Horizontal ribbon */}
        <rect x="40" y="115" width="120" height="12" fill="#FBBF24" stroke="#F59E0B" strokeWidth="1" />

        {/* Vertical ribbon */}
        <rect x="103" y="50" width="12" height="120" fill="#FBBF24" stroke="#F59E0B" strokeWidth="1" />

        {/* Ribbon shine effect */}
        <rect x="41" y="115" width="118" height="4" fill="#FCD34D" opacity="0.7" />
        <rect x="104" y="50" width="4" height="120" fill="#FCD34D" opacity="0.7" />

        {/* Bow - left loop */}
        <ellipse cx="75" cy="50" rx="18" ry="20" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1.5" />
        <ellipse cx="75" cy="55" rx="12" ry="14" fill="#FBBF24" />

        {/* Bow - right loop */}
        <ellipse cx="125" cy="50" rx="18" ry="20" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1.5" />
        <ellipse cx="125" cy="55" rx="12" ry="14" fill="#FBBF24" />

        {/* Bow - center */}
        <circle cx="100" cy="50" r="8" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1.5" />
        <circle cx="100" cy="52" r="5" fill="#FBBF24" />

        {/* Box shine effect */}
        <rect x="42" y="82" width="50" height="20" fill="#FF6B6B" opacity="0.4" rx="4" />
      </motion.svg>

      {/* Sparkle effect on click */}
      {isClicked && (
        <>
          {[...Array(12)].map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            return (
              <motion.div
                key={i}
                className="absolute w-3 h-3 bg-yellow-300 rounded-full"
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 1,
                  scale: 1,
                }}
                animate={{
                  x: Math.cos(angle) * 120,
                  y: Math.sin(angle) * 120 - 50,
                  opacity: 0,
                  scale: 0,
                }}
                transition={{ duration: 1, ease: 'easeOut', delay: i * 0.05 }}
                style={{
                  left: '50%',
                  top: '50%',
                  marginLeft: '-6px',
                  marginTop: '-6px',
                  boxShadow: '0 0 10px rgba(255, 215, 0, 0.8)',
                }}
              />
            );
          })}
        </>
      )}

      {/* Glow background circle */}
      <div
        className="absolute -inset-12 rounded-full opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%)',
          animation: 'breathe 3s ease-in-out infinite',
        }}
      />

      {/* Text below gift */}
      {!isOpened && (
        <motion.div
          className="text-center mt-8"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.p
            className="text-lg md:text-xl text-yellow-200 text-elegant font-semibold mb-3 glow-gold"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >☝️
            Click the gift to open☝️
          </motion.p>
          <motion.div
            className="text-3xl"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}