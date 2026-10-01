/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0a0a0a',
          soft: '#111111',
          card: '#151515',
          border: '#1f1f1f',
        },
        ink: {
          DEFAULT: '#f5f5f5',
          muted: '#a3a3a3',
          soft: '#737373',
        },
        accent: {
          DEFAULT: '#d4ff00',
          soft: '#c1eb00',
          glow: 'rgba(212, 255, 0, 0.15)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Cabinet Grotesk', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'hero': 'clamp(3rem, 10vw, 9rem)',
        'display': 'clamp(2.5rem, 6vw, 5rem)',
        'title': 'clamp(1.75rem, 3vw, 3rem)',
      },
      letterSpacing: {
        tightest: '-0.06em',
        tighter: '-0.04em',
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { opacity: 0.6 },
          '50%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
