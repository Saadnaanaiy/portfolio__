'use client';

import React, { useState, useEffect, useMemo } from 'react';

const BINARY_COUNT = 120;

const BINARY_COLORS = [
  'text-cyber-cyan',
  'text-cyber-emerald',
  'text-cyber-amber',
  'text-cyber-rose',
  'text-cyan-400',
  'text-emerald-400',
];

const CyberBinaryBackground = ({ isDarkMode }) => {
  const [mounted, setMounted] = useState(false);

  const binaries = useMemo(() => {
    return Array.from({ length: BINARY_COUNT }, (_, i) => ({
      id: i,
      char: Math.random() > 0.5 ? '0' : '1',
      left: Math.random() * 100,
      delay: Math.random() * 12,
      duration: 6 + Math.random() * 8,
      size: 12 + Math.random() * 10,
      opacity: 0.22 + Math.random() * 0.25,
      colorClass: BINARY_COLORS[Math.floor(Math.random() * BINARY_COLORS.length)],
    }));
  }, []);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    >
      {/* Binary rain – 0 & 1 falling from top to bottom */}
      <div className="absolute inset-0">
        {binaries.map((b) => (
          <span
            key={b.id}
            className={`absolute font-mono font-bold ${b.colorClass}`}
            style={{
              left: `${b.left}%`,
              top: '-2%',
              fontSize: `${b.size}px`,
              opacity: b.opacity,
              textShadow: `0 0 ${b.size * 0.5}px currentColor`,
              animation: `cyber-binary-fall ${b.duration}s linear infinite`,
              animationDelay: `${b.delay}s`,
            }}
          >
            {b.char}
          </span>
        ))}
      </div>

      {/* Gradient overlay so content stays readable */}
      <div
        className={`absolute inset-0 pointer-events-none ${
          isDarkMode
            ? 'bg-gradient-to-b from-cyber-dark/50 via-cyber-dark/20 to-cyber-dark/40'
            : 'bg-gradient-to-b from-slate-50/80 via-transparent to-slate-50/70'
        }`}
      />
    </div>
  );
};

export default CyberBinaryBackground;
