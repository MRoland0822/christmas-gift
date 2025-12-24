'use client';

import React, { useState } from 'react';

interface SnowflakeProps {
  intensity?: 'light' | 'medium' | 'heavy';
}

interface Snowflake {
  id: number;
  left: number;
  delay_offset: number;
  size: number;
  opacity: number;
  drift: number;
  duration: number;
}

export default function Snowfall({ intensity = 'light' }: SnowflakeProps) {
  // Determine animation duration and count based on intensity
  const getSnowConfig = () => {
    switch (intensity) {
      case 'heavy':
        return { count: 150, duration: 10, delay: 0.3 };
      case 'medium':
        return { count: 100, duration: 12, delay: 0.5 };
      case 'light':
      default:
        return { count: 60, duration: 14, delay: 1 };
    }
  };

  const config = getSnowConfig();

  // Generate snowflakes with unique IDs for continuous animation using useState lazy initializer
  const [snowflakes] = useState<Snowflake[]>(() => {
    return Array.from({ length: config.count }, (_, i) => {
      const duration = config.duration + Math.random() * 4; // 14-18s variation
      return {
        id: i,
        left: Math.random() * 100,
        delay_offset: Math.random() * config.delay,
        size: Math.random() * 6 + 3, // 3-9px
        opacity: Math.random() * 0.5 + 0.5, // 0.5-1
        drift: (Math.random() - 0.5) * 150, // -75 to 75px horizontal drift
        duration: duration,
      };
    });
  });

  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ 
        zIndex: 20,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    >
      {snowflakes.map((snowflake) => (
        <div
          key={snowflake.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${snowflake.left}%`,
            top: '-10px',
            width: `${snowflake.size}px`,
            height: `${snowflake.size}px`,
            opacity: snowflake.opacity,
            animation: `snowfall-continuous ${snowflake.duration}s linear ${snowflake.delay_offset}s infinite`,
            transform: `translateX(${snowflake.drift}px)`,
            boxShadow: `0 0 ${snowflake.size * 1.5}px rgba(255, 255, 255, 0.9), 0 0 ${snowflake.size * 2}px rgba(255, 255, 255, 0.6)`,
            filter: 'blur(0.3px)',
            willChange: 'transform, opacity',
          }}
        />
      ))}
    </div>
  );
}