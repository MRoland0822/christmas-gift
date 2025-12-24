'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card from './Card';

interface CardGridProps {
  messages: string[];
  flippedCards: Set<number>;
  onFlipCard: (id: number) => void;
}

interface CardPosition {
  x: number;
  y: number;
  rotation: number;
}

export default function CardGrid({
  messages,
  flippedCards,
  onFlipCard,
}: CardGridProps) {
  // Generate random positions for cards using useState to avoid recalculation on every render
  const [cardPositions] = useState<CardPosition[]>(() => {
    return Array.from({ length: messages.length }, (_, i) => {
      // Create a grid-based scatter with some randomness to avoid overlaps
      const cols = 4; // 4 columns base
      const rows = Math.ceil(messages.length / cols);
      
      // Grid position
      const gridRow = Math.floor(i / cols);
      const gridCol = i % cols;
      
      // Base position with some randomness
      const baseX = (gridCol / cols) * 100 + 12.5; // Center in each column
      const baseY = (gridRow / rows) * 100 + 10;
      
      // Add random offset (±15% to avoid overlaps while keeping scattered feel)
      const randomOffsetX = (Math.random() - 0.5) * 20;
      const randomOffsetY = (Math.random() - 0.5) * 15;
      
      // Random rotation for playful feel (±5 degrees)
      const rotation = (Math.random() - 0.5) * 10;
      
      return {
        x: baseX + randomOffsetX,
        y: baseY + randomOffsetY,
        rotation,
      };
    });
  });

  return (
    <motion.div
      className="w-full min-h-screen relative px-4 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {/* Header */}
      <motion.div
        className="text-center mb-16 relative z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl text-elegant text-yellow-200 mb-4 glow-gold">
          Discover Your Messages
        </h2>
        <p className="text-lg text-blue-200 text-handwritten">
          Click each card to reveal a special message 🎴
        </p>
      </motion.div>

      {/* Cards Container - Absolute positioned scattered layout */}
      <div className="relative w-full h-screen md:h-[800px] lg:h-[1000px] max-w-7xl mx-auto mb-20">
        {messages.map((message, index) => {
          const pos = cardPositions[index];
          
          return (
            <motion.div
              key={index}
              className="absolute"
              initial={{ 
                opacity: 0, 
                scale: 0.5,
                rotate: pos.rotation,
              }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                rotate: pos.rotation,
              }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.08,
                ease: 'easeOut',
              }}
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: `translate(-50%, -50%) rotate(${pos.rotation}deg)`,
              }}
            >
              <Card
                id={index}
                message={message}
                isFlipped={flippedCards.has(index)}
                onFlip={onFlipCard}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Progress indicator - Fixed at bottom */}
      <motion.div 
        className="sticky bottom-0 left-0 right-0 flex flex-col justify-center items-center gap-3 py-6 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent relative z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-3">
          <span className="text-base md:text-lg text-blue-200 font-semibold">
            {flippedCards.size} of {messages.length} revealed
          </span>
          {flippedCards.size === messages.length && (
            <motion.span
              className="text-2xl"
              animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✨
            </motion.span>
          )}
        </div>
        
        {/* Progress bar */}
        <div className="w-64 md:w-80 h-2 bg-blue-900/50 rounded-full overflow-hidden border border-blue-700/50">
          <motion.div
            className="h-full bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full shadow-lg shadow-yellow-400/50"
            initial={{ width: 0 }}
            animate={{ width: `${(flippedCards.size / messages.length) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}