/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pearl: {
          50: '#FAF7F2',
          100: '#F3ECE3',
          200: '#E8DDCE',
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
          DEFAULT: '#1A1615',
          deep: '#12100F',
          card: '#181514',
        },
        champagne: {
          50: '#FDFBF7',
          100: '#F7F2EB',
          200: '#EFE5D7',
          500: '#C8A27E',
          600: '#B08862',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'pearl-glass': '0 20px 50px rgba(180, 148, 115, 0.12)',
        'pearl-glow': '0 0 30px rgba(200, 162, 126, 0.25)',
        'gold-glow': '0 0 25px rgba(200, 162, 126, 0.45)',
        'gold-card': '0 12px 40px -10px rgba(200, 162, 126, 0.2)',
        'onyx-depth': '0 25px 60px -15px rgba(0, 0, 0, 0.6)',
      },
      animation: {
        'shimmer': 'shimmer 2.5s infinite linear',
        'pulse-subtle': 'pulseSubtle 3s infinite ease-in-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
