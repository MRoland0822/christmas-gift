'use client';

import React, { useState } from 'react';

interface Star {
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
}

export default function TwinklingStars() {
  const [stars] = useState<Star[]>(() => {
    return Array.from({ length: 30 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 2, // 2-5px
      delay: Math.random() * 3,
      duration: Math.random() * 2 + 2, // 2-4s
    }));
  });

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.8)`,
          }}
        />
      ))}
    </div>
  );
}

