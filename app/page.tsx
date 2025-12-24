'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GiftBox from './components/GiftBox';
import CardGrid from './components/CardGrid';
import FinalMessage from './components/FinalMessage';
import Snowfall from './components/Snowfall';
import MusicToggle from './components/MusicToggle';
import TwinklingStars from './components/TwinklingStars';

type GameState = 'landing' | 'cards' | 'complete';

const MESSAGES = [
  '🎄 Merry Christmas! May your day be filled with joy and magic.',
  '✨ Thank you for being such a wonderful part of my life.',
  '❄️ Wishing you warmth and happiness this festive season.',
  '💫 You deserve all the happiness in the world.',
  '🎁 Here\'s to creating beautiful memories together.',
  '🌟 May every moment be as special as you are.',
  '💝 Sending you love and cheer this Christmas.',
  '🎊 Let\'s celebrate this magical season together!',
];

export default function Home() {
  const [gameState, setGameState] = useState<GameState>('landing');
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [hasInteracted, setHasInteracted] = useState(false);

  // Handle any user interaction to trigger music autoplay
  useEffect(() => {
    const handleInteraction = () => {
      setHasInteracted(true);
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  const handleGiftOpen = () => {
    setGameState('cards');
  };

  const handleFlipCard = (id: number) => {
    const newFlipped = new Set(flippedCards);
    if (newFlipped.has(id)) {
      newFlipped.delete(id);
    } else {
      newFlipped.add(id);
    }
    setFlippedCards(newFlipped);

    // Check if all cards are flipped
    if (newFlipped.size === MESSAGES.length) {
      setTimeout(() => {
        setGameState('complete');
      }, 500);
    }
  };

  const handleReset = () => {
    setGameState('landing');
    setFlippedCards(new Set());
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Twinkling stars background - z-10 */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <TwinklingStars />
      </div>

      {/* Snowfall background - z-20 */}
      <div className="fixed inset-0 pointer-events-none z-20">
        <Snowfall intensity={gameState === 'complete' ? 'medium' : 'light'} />
      </div>

      {/* Music toggle - z-50 */}
      <MusicToggle autoPlay={hasInteracted} />

      {/* Landing state */}
      {gameState === 'landing' && (
        <motion.div
          className="flex flex-col items-center justify-center min-h-screen w-full px-4 relative z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="text-6xl mb-4"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              🎁
            </motion.div>
            <h1 className="text-5xl md:text-7xl text-elegant text-yellow-200 mb-4 glow-gold">
              Christmas Gift
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 text-handwritten mb-2">
              Something special is waiting for you...
            </p>
            <motion.div
              className="flex justify-center gap-2 text-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {['✨', '🎄', '❄️', '⭐'].map((emoji, i) => (
                <motion.span
                  key={i}
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 360]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    delay: i * 0.2,
                    ease: 'easeInOut'
                  }}
                >
                  {emoji}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Gift Box */}
          <GiftBox onOpen={handleGiftOpen} isOpened={gameState !== 'landing'} />

          {/* Instruction text with pulsing animation */}
          <motion.div
            className="text-center mt-12"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
          </motion.div>

          {/* Decorative corner elements */}
          <motion.div
            className="absolute top-12 left-12 text-5xl md:text-6xl"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          >
            ⭐
          </motion.div>
          <motion.div
            className="absolute bottom-12 right-12 text-4xl md:text-5xl"
            animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            ✨
          </motion.div>

          {/* Side decoration */}
          <motion.div
            className="absolute top-1/3 right-6 md:right-12 text-3xl md:text-4xl"
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            🎄
          </motion.div>
          <motion.div
            className="absolute bottom-1/4 left-6 md:left-12 text-3xl md:text-4xl"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            ❄️
          </motion.div>
        </motion.div>
      )}

      {/* Cards state */}
      {gameState === 'cards' && (
        <motion.div
          className="w-full pt-20 pb-12 relative z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <CardGrid
            messages={MESSAGES}
            flippedCards={flippedCards}
            onFlipCard={handleFlipCard}
          />
        </motion.div>
      )}

      {/* Complete state */}
      {gameState === 'complete' && (
        <FinalMessage onReset={handleReset} />
      )}
    </main>
  );
}