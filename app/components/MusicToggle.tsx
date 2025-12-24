'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface MusicToggleProps {
  autoPlay?: boolean;
}

export default function MusicToggle({ autoPlay = false }: MusicToggleProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current && autoPlay) {
      // Try to play when user has interacted
      audioRef.current
        .play()
        .then(() => {
          // Only set playing state if play succeeds
          setIsPlaying(true);
        })
        .catch(() => {
          // Browser may block autoplay, set to paused
          setIsPlaying(false);
        });
    }
  }, [autoPlay]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          // Browser may block autoplay, set to paused
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      {/* Audio element */}
      <audio
        ref={audioRef}
        src="/audio/Happy Christmas Background Music For Videos.mp3"
        loop
        preload="none"
      />

      {/* Toggle button - Gift box style */}
      <motion.button
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-50 cursor-pointer focus-visible:outline-2 focus-visible:outline-yellow-200 focus-visible:outline-offset-2"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        title={isPlaying ? 'Mute music' : 'Play music'}
      >
        <div
          className={`
            relative
            w-16 h-20 md:w-20 md:h-24
            bg-gradient-to-b from-red-600 via-red-700 to-red-800
            rounded-xl
            shadow-2xl
            border-4 border-red-500/70
            transition-all duration-300
            ${isPlaying ? 'ring-4 ring-yellow-400/50' : ''}
          `}
          style={{
            boxShadow: isPlaying
              ? '0 0 40px rgba(255, 215, 0, 0.7), 0 0 60px rgba(255, 215, 0, 0.4), inset 0 0 15px rgba(255, 215, 0, 0.2)'
              : '0 0 20px rgba(255, 215, 0, 0.4), 0 0 40px rgba(255, 215, 0, 0.2)',
          }}
        >
          {/* Ribbon - horizontal */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-6 md:h-8 bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 shadow-lg border-y-2 border-yellow-400/60" />

          {/* Ribbon - vertical */}
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-6 md:w-8 bg-gradient-to-b from-yellow-300 via-yellow-200 to-yellow-300 shadow-lg border-x-2 border-yellow-400/60" />

          {/* Bow on top */}
          <div className="absolute -top-4 md:-top-5 left-1/2 -translate-x-1/2 flex gap-1.5 md:gap-2">
            <div className="w-6 h-6 md:w-8 md:h-8 bg-yellow-300 rounded-full shadow-lg transform -rotate-45 origin-center border-2 border-yellow-400/60" />
            <div className="w-5 h-6 md:w-6 md:h-8 bg-yellow-400 rounded-full shadow-md border-2 border-yellow-500/60" />
            <div className="w-6 h-6 md:w-8 md:h-8 bg-yellow-300 rounded-full shadow-lg transform rotate-45 origin-center border-2 border-yellow-400/60" />
          </div>

          {/* Music icon overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            {isPlaying ? (
              <svg
                className="w-6 h-6 md:w-8 md:h-8 text-yellow-200 drop-shadow-lg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 2a1 1 0 000 2v8a1 1 0 100-2V4a1 1 0 000-2zM15 2a1 1 0 010 2v2.18a3.999 3.999 0 01-5.753 3.569A4 4 0 0013 7V4a1 1 0 011-2zM4 5a2 2 0 012-2h4a1 1 0 000-2H6a4 4 0 00-4 4v10a4 4 0 004 4h4a1 1 0 000-2H6a2 2 0 01-2-2V5z" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 md:w-8 md:h-8 text-yellow-200 drop-shadow-lg opacity-70"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3.354 1.646a.5.5 0 00-.708.708l14 14a.5.5 0 00.708-.708l-14-14zM9 2a1 1 0 000 2v8a1 1 0 100-2V4a1 1 0 000-2z"
                />
              </svg>
            )}
          </div>

          {/* Glow effect when playing */}
          {isPlaying && (
            <div
              className="absolute -inset-4 rounded-xl opacity-30 pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, transparent 70%)',
                animation: 'breathe 2s ease-in-out infinite',
              }}
            />
          )}
        </div>
      </motion.button>
    </>
  );
}