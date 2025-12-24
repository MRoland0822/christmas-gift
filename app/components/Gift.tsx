'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface GiftProps {
  onOpen: () => void;
  isOpened: boolean;
}

export default function Gift({ onOpen, isOpened }: GiftProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (!isClicked && !isOpened) {
      setIsClicked(true);
      setTimeout(() => onOpen(), 600);
    }
  };

  return (
    <motion.div
      className="relative cursor-pointer z-10"
      animate={
        isClicked
          ? { scale: 1.15, rotateZ: 10 }
          : { scale: 1, rotateZ: 0 }
      }
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {/* Main gift box */}
      <div
        onClick={handleClick}
        className={`
          relative
          w-64 h-80 md:w-80 md:h-96
          bg-gradient-to-b from-red-600 via-red-700 to-red-800
          rounded-2xl
          shadow-2xl
          border-4 border-red-500/60
          transition-all duration-300
          ${!isOpened ? 'hover:scale-105 hover:shadow-yellow-500/50 cursor-pointer' : ''}
          ${isClicked ? 'animate-pulse' : ''}
        `}
        style={{
          animation: isClicked ? 'pulse-scale 0.6s ease-in-out' : 'breathe 3s ease-in-out infinite',
          boxShadow: isClicked
            ? '0 0 100px rgba(255, 215, 0, 0.9), 0 0 150px rgba(255, 215, 0, 0.5), inset 0 0 30px rgba(255, 215, 0, 0.2)'
            : '0 0 60px rgba(255, 215, 0, 0.6), 0 0 100px rgba(255, 215, 0, 0.4), inset 0 0 20px rgba(255, 215, 0, 0.1)',
        }}
      >
        {/* Ribbon - horizontal */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-14 md:h-16 bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 shadow-2xl border-y-4 border-yellow-400/60" />

        {/* Ribbon - vertical */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-14 md:w-16 bg-gradient-to-b from-yellow-300 via-yellow-200 to-yellow-300 shadow-2xl border-x-4 border-yellow-400/60" />

        {/* Bow on top */}
        <motion.div 
          className="absolute -top-8 md:-top-10 left-1/2 -translate-x-1/2 flex gap-3 md:gap-4"
          animate={!isOpened ? { y: [0, -8, 0] } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-14 h-14 md:w-16 md:h-16 bg-yellow-300 rounded-full shadow-2xl transform -rotate-45 origin-center border-4 border-yellow-400/60" />
          <div className="w-12 h-16 md:w-14 md:h-18 bg-yellow-400 rounded-full shadow-xl border-4 border-yellow-500/60" />
          <div className="w-14 h-14 md:w-16 md:h-16 bg-yellow-300 rounded-full shadow-2xl transform rotate-45 origin-center border-4 border-yellow-400/60" />
        </motion.div>

        {/* Sparkle effect on click */}
        {isClicked && (
          <>
            {[...Array(16)].map((_, i) => {
              const angle = (i / 16) * Math.PI * 2;
              return (
                <motion.div
                  key={i}
                  className="absolute w-4 h-4 md:w-5 md:h-5 bg-yellow-300 rounded-full"
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 1,
                    scale: 1,
                  }}
                  animate={{
                    x: Math.cos(angle) * 180,
                    y: Math.sin(angle) * 180 - 80,
                    opacity: 0,
                    scale: 0,
                  }}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: i * 0.04 }}
                  style={{
                    left: '50%',
                    top: '50%',
                    marginLeft: '-8px',
                    marginTop: '-8px',
                    boxShadow: '0 0 15px rgba(255, 215, 0, 0.9), 0 0 25px rgba(255, 215, 0, 0.6)',
                  }}
                />
              );
            })}
          </>
        )}
      </div>

      {/* Glow background circle */}
      <div
        className="absolute -inset-12 md:-inset-16 rounded-full opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, transparent 70%)',
          animation: 'breathe 3s ease-in-out infinite',
        }}
      />

      {/* Decorative shine effect */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50" />
      </div>

      {/* Text below gift */}
      {!isOpened && (
        <motion.div
          className="text-center mt-8 md:mt-12"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.p
            className="text-xl md:text-2xl text-yellow-200 text-elegant font-bold mb-3 glow-gold"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Click to open
          </motion.p>
          <motion.div
            className="text-4xl md:text-5xl"
            animate={{ scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            👆
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}