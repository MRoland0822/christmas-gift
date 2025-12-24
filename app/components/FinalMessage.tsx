'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface FinalMessageProps {
  onReset: () => void;
}

export default function FinalMessage({ onReset }: FinalMessageProps) {
  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Dark overlay with backdrop blur */}
      <motion.div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm pointer-events-auto"
        onClick={onReset}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center pointer-events-auto px-6 max-w-2xl"
        initial={{ scale: 0.7, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, type: 'spring', stiffness: 100 }}
      >
        {/* Top decorative element */}
        <motion.div
          className="mb-8"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="text-7xl">❄️</div>
        </motion.div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl text-elegant text-yellow-200 mb-6 glow-gold">
          Merry Christmas!
        </h1>

        {/* Message */}
        <p className="text-lg md:text-xl text-blue-100 mb-8 text-handwritten leading-relaxed">
          You`&apos;`ve revealed all the magic. ✨<br />
          Thank you for the wonderful moments. 🎄💝
        </p>

        {/* Animated decorative stars */}
        <div className="flex justify-center gap-6 mb-10">
          {[...Array(3)].map((_, i) => (
            <motion.span
              key={i}
              className="text-4xl md:text-5xl"
              animate={{ 
                scale: [1, 1.3, 1], 
                opacity: [0.5, 1, 0.5],
                rotate: [0, 360]
              }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {['✨', '🎁', '⭐'][i]}
            </motion.span>
          ))}
        </div>

        {/* Buttons container */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Reset button */}
          <motion.button
            onClick={onReset}
            className="
              px-8 py-4
              bg-gradient-to-r from-yellow-400 to-yellow-300
              text-gray-900
              rounded-full
              font-bold
              text-lg
              shadow-2xl
              shadow-yellow-400/50
              hover:shadow-yellow-300/70
              transition-all duration-300
              focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-yellow-200
            "
            whileHover={{ scale: 1.08, translateY: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Open Again
          </motion.button>

          {/* Close button (just close the overlay) */}
          <motion.button
            onClick={onReset}
            className="
              px-8 py-4
              bg-blue-600/40
              border-2 border-blue-300/60
              text-blue-100
              rounded-full
              font-semibold
              text-lg
              hover:bg-blue-600/60
              hover:border-blue-300/80
              transition-all duration-300
              focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-blue-300
              backdrop-blur-sm
            "
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Done
          </motion.button>
        </div>

        {/* Bottom decorative element */}
        <motion.div
          className="mt-10 text-3xl"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        >
          🎄
        </motion.div>
      </motion.div>
    </motion.div>
  );
}