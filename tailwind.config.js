/** @type {import('tailwindcss').Config} */ export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Legacy (kept for compatibility)
        lightHover: '#f0fdfa',
        darkHover: '#0f172a',
        darkThem: '#0a0e17',
        // Cybersecurity / modern IT palette
        cyber: {
          dark: '#0a0e17',
          darker: '#06090f',
          surface: '#0f172a',
          border: '#1e293b',
          muted: '#64748b',
          cyan: '#06b6d4',
          cyanDim: '#0891b2',
          emerald: '#10b981',
          emeraldDim: '#059669',
          amber: '#f59e0b',
          amberDim: '#d97706',
          rose: '#f43f5e',
          slate: '#94a3b8',
        },
      },
      fontFamily: {
        cyber: ['var(--font-cyber)', 'JetBrains Mono', 'ui-monospace', 'monospace'],
        pixel: ['var(--font-cyber)', 'JetBrains Mono', 'monospace'],
        Outfit: ['Outfit', 'sans-serif'],
        Ovo: ['Ovo', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        black: '4px 4px 0 #000',
        white: '4px 4px 0 #fff',
        'cyber-glow': '0 0 20px rgba(6, 182, 212, 0.3)',
        'cyber-glow-emerald': '0 0 20px rgba(16, 185, 129, 0.3)',
        'cyber-card': '0 4px 24px rgba(0, 0, 0, 0.4), 0 0 1px rgba(6, 182, 212, 0.2)',
      },
      gridTemplateColumns: { auto: 'repeat(auto-fit, minmax(200px, 1fr))' },
      animation: {
        'fade-in': 'fadeIn 1s ease-out',
        'scanline': 'scanline 8s linear infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.6 },
        },
      },
      backgroundImage: {
        'cyber-grid': 'linear-gradient(rgba(6, 182, 212, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.03) 1px, transparent 1px)',
        'cyber-gradient': 'linear-gradient(135deg, #0a0e17 0%, #0f172a 50%, #0a0e17 100%)',
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
    },
  },
  darkMode: 'selector',
  plugins: [],
};
