'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  id: number;
  message: string;
  isFlipped: boolean;
  onFlip: (id: number) => void;
}

export default function Card({ id, message, isFlipped, onFlip }: CardProps) {
  return (
    <motion.div
      className="relative w-24 h-32 sm:w-28 sm:h-36 md:w-32 md:h-40 lg:w-36 lg:h-44 cursor-pointer perspective-1000"
      onClick={() => onFlip(id)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front of card (closed side) */}
        <div
          className="absolute inset-0 backface-hidden rounded-lg sm:rounded-xl shadow-lg sm:shadow-2xl border-2 sm:border-3 border-yellow-400/60 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 flex items-center justify-center overflow-hidden"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(0deg)' }}
        >
          {/* Decorative pattern - smaller on mobile */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1 left-1 text-yellow-300 text-[10px] sm:text-xs">❄️</div>
            <div className="absolute bottom-1 right-1 text-yellow-300 text-[10px] sm:text-xs">⭐</div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-yellow-300 text-[10px] sm:text-xs">✨</div>
          </div>
          
          <div className="text-center relative z-10 px-2">
            <motion.div
              className="text-3xl sm:text-4xl md:text-5xl mb-1 sm:mb-3"
              animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              🎄
            </motion.div>
            <p className="text-[10px] sm:text-xs md:text-sm text-yellow-200 font-bold glow-gold whitespace-nowrap">
              Click to reveal
            </p>
          </div>
        </div>

        {/* Back of card (message side) */}
        <div
          className="absolute inset-0 backface-hidden rounded-lg sm:rounded-xl shadow-lg sm:shadow-2xl border-2 sm:border-3 border-yellow-300/80 bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 p-2 sm:p-4 flex items-center justify-center overflow-hidden"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {/* Decorative corner elements - smaller on mobile */}
          <div className="absolute top-1 left-1 text-yellow-400 text-sm sm:text-lg opacity-30">❄️</div>
          <div className="absolute top-1 right-1 text-yellow-400 text-sm sm:text-lg opacity-30">✨</div>
          <div className="absolute bottom-1 left-1 text-yellow-400 text-sm sm:text-lg opacity-30">⭐</div>
          <div className="absolute bottom-1 right-1 text-yellow-400 text-sm sm:text-lg opacity-30">🎄</div>
          
          {/* Message text */}
          <p className="text-[11px] sm:text-xs md:text-sm text-center text-gray-800 text-handwritten font-bold leading-tight sm:leading-relaxed relative z-10 px-1">
            {message}
          </p>
        </div>
      </motion.div>

      {/* Glow effect when flipped */}
      {isFlipped && (
        <motion.div
          className="absolute -inset-1 sm:-inset-2 rounded-lg sm:rounded-xl bg-yellow-400/20 blur-md pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
}