/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mauve: {
          light: '#E5C6C1',
          DEFAULT: '#C99E9A',
          dark: '#B88680',
          deep: '#9E6C66',
        },
        blush: {
          light: '#FAF3F0',
          DEFAULT: '#E8D5CE',
          soft: '#EADCD7',
        },
        plum: {
          DEFAULT: '#23161C',
          dark: '#1E1217',
          deep: '#160B10',
          muted: '#6E565F',
        },
        lavender: {
          mist: '#F3EFFB',
          soft: '#E8E1F5',
          muted: '#A69FB8',
        },
        porcelain: '#FAF9FC',
        rosegold: {
          DEFAULT: '#D4A39A',
          light: '#EAC2BA',
          dark: '#B87B71',
        },
        pearl: {
          50: '#FAF9FC',
          100: '#F3EFFB',
          200: '#E8D5CE',
          300: '#D9C8B2',
          400: '#C7B195',
        },
        gold: {
          light: '#EAD5C3',
          DEFAULT: '#C8A27E',
          deep: '#A67D55',
          glow: 'rgba(200, 162, 126, 0.35)',
        },
        obsidian: {
          light: '#2A2422',
          DEFAULT: '#1E1217',
          deep: '#12100F',
          card: '#181514',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'pearl-glass': '0 20px 50px rgba(184, 134, 128, 0.14)',
        'rose-glow': '0 0 35px rgba(201, 158, 154, 0.35)',
        'plum-depth': '0 25px 60px -15px rgba(35, 22, 28, 0.5)',
        'hud-glass': '0 8px 32px 0 rgba(110, 86, 95, 0.15)',
        'gold-card': '0 12px 40px -10px rgba(200, 162, 126, 0.2)',
      },
      animation: {
        'scanline': 'scanline 3s ease-in-out infinite',
        'spin-slow': 'spin 18s linear infinite',
        'pulse-subtle': 'pulseSubtle 3s infinite ease-in-out',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        scanline: {
          '0%, 100%': { transform: 'translateY(-10%)', opacity: '0.25' },
          '50%': { transform: 'translateY(110%)', opacity: '0.85' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
