"use client";

import { useEffect, useMemo, useState } from "react";

const BINARY_COLORS = [
  // Explicit cyberpunk palette (red/green/yellow/blue)
  "text-rose-400",
  "text-emerald-400",
  "text-amber-300",
  "text-blue-400",
  // Theme accents
  "text-cyber-cyan",
  "text-cyber-emerald",
  "text-cyber-amber",
  "text-cyber-rose",
];

const CyberBinaryBackground = ({ isDarkMode }) => {
  const [mounted, setMounted] = useState(false);
  const [binaryCount, setBinaryCount] = useState(56);
  const [reduceMotion, setReduceMotion] = useState(false);

  const binaries = useMemo(() => {
    return Array.from({ length: binaryCount }, (_, i) => ({
      id: i,
      char: Math.random() > 0.5 ? "0" : "1",
      left: Math.random() * 100,
      delay: Math.random() * 12,
      duration: 6 + Math.random() * 5,
      size: 11 + Math.random() * 7,
      opacity: 0.12 + Math.random() * 0.16,
      colorClass:
        BINARY_COLORS[Math.floor(Math.random() * BINARY_COLORS.length)],
    }));
  }, [binaryCount]);

  useEffect(() => {
    setMounted(true);

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateSettings = () => {
      const isMobile = window.innerWidth < 768;
      const shouldReduceMotion = mediaQuery.matches;

      setReduceMotion(shouldReduceMotion);

      if (shouldReduceMotion) {
        setBinaryCount(0);
        return;
      }

      if (isMobile) {
        setBinaryCount(isDarkMode ? 22 : 16);
        return;
      }

      setBinaryCount(isDarkMode ? 72 : 40);
    };

    updateSettings();
    window.addEventListener("resize", updateSettings, { passive: true });
    mediaQuery.addEventListener("change", updateSettings);

    return () => {
      window.removeEventListener("resize", updateSettings);
      mediaQuery.removeEventListener("change", updateSettings);
    };
  }, [isDarkMode]);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      style={{ contain: "layout paint" }}
      aria-hidden="true"
    >
      {/* Binary rain – 0 & 1 falling from top to bottom */}
      <div className="absolute inset-0">
        {binaries.map((b) => (
          <span
            key={b.id}
            className={`absolute font-mono font-bold ${b.colorClass} cyber-binary-char ${
              isDarkMode ? "mix-blend-screen" : "mix-blend-normal"
            }`}
            style={{
              left: `${b.left}%`,
              top: "-2%",
              fontSize: `${b.size}px`,
              opacity: b.opacity,
              textShadow: `0 0 ${b.size * 0.5}px currentColor`,
              animation: reduceMotion
                ? "none"
                : `cyber-binary-fall ${b.duration}s linear infinite`,
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
            ? "bg-gradient-to-b from-cyber-dark/50 via-cyber-dark/20 to-cyber-dark/40"
            : "bg-gradient-to-b from-slate-50/85 via-slate-50/35 to-slate-50/80"
        }`}
      />
    </div>
  );
};

export default CyberBinaryBackground;
