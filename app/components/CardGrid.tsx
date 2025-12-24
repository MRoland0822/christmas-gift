'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card from './Card';

interface CardGridProps {
  messages: string[];
  flippedCards: Set<number>;
  onFlipCard: (id: number) => void;
}

export default function CardGrid({
  messages,
  flippedCards,
  onFlipCard,
}: CardGridProps) {
  return (
    <motion.div
      className="w-full relative px-4 py-8 md:py-12 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {/* Header */}
      <motion.div
        className="text-center mb-10 md:mb-16 relative z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl md:text-4xl text-elegant text-yellow-200 mb-3 md:mb-4 glow-gold">
          Discover Your Messages
        </h2>
        <p className="text-sm md:text-lg text-blue-200 text-handwritten">
          Click each card to reveal a special message 🎴
        </p>
      </motion.div>

      {/* Cards Grid - Responsive and No Overlaps */}
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 justify-items-center">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ 
                opacity: 0, 
                scale: 0.8,
                y: 20,
              }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: 0,
              }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.08,
                ease: 'easeOut',
              }}
              className="w-full flex justify-center"
            >
              <Card
                id={index}
                message={message}
                isFlipped={flippedCards.has(index)}
                onFlip={onFlipCard}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Progress indicator - Fixed at bottom */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 flex flex-col justify-center items-center gap-2 md:gap-3 py-4 md:py-6 px-4 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent relative z-40"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-2 md:gap-3">
          <span className="text-xs md:text-lg text-blue-200 font-semibold">
            {flippedCards.size} of {messages.length} revealed
          </span>
          {flippedCards.size === messages.length && (
            <motion.span
              className="text-xl md:text-2xl"
              animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✨
            </motion.span>
          )}
        </div>
        
        {/* Progress bar */}
        <div className="w-48 sm:w-56 md:w-80 h-2 bg-blue-900/50 rounded-full overflow-hidden border border-blue-700/50">
          <motion.div
            className="h-full bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full shadow-lg shadow-yellow-400/50"
            initial={{ width: 0 }}
            animate={{ width: `${(flippedCards.size / messages.length) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </motion.div>

      {/* Padding to prevent content from hiding behind fixed progress bar */}
      <div className="h-24 md:h-32" />
    </motion.div>
  );
}