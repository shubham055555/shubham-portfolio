/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#050708',
        surface: {
          DEFAULT: '#0a0e11',
          50: '#12181e',
          100: '#182028',
          200: '#1f2a34',
        },
        mint: {
          50: '#f0fdf9',
          100: '#ccfbef',
          200: '#99f6e0',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          DEFAULT: '#00f5d4',
          neon: '#00f5d4',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        accent: {
          purple: '#a855f7',
          cyan: '#06b6d4',
          lime: '#84cc16',
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Outfit', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Syne', 'Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'mint-glow': '0 0 35px -5px rgba(0, 245, 212, 0.25)',
        'mint-sm': '0 0 15px 0px rgba(0, 245, 212, 0.2)',
        'mint-lg': '0 0 50px 5px rgba(0, 245, 212, 0.15)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        }
      }
    },
  },
  plugins: [],
}
