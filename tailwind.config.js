/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Menggunakan class untuk dark mode
  theme: {
    extend: {
      colors: {
        // Colors for light mode
        primary: {
          light: '#ffffff',
          DEFAULT: '#f9fafb',
          dark: '#f3f4f6',
        },
        secondary: {
          light: '#e5e7eb',
          DEFAULT: '#d1d5db',
          dark: '#9ca3af',
        },
        accent: {
          light: '#3b82f6',
          DEFAULT: '#2563eb',
          dark: '#1d4ed8',
        },
        // Colors for dark mode
        dark: {
          primary: '#0a0a0a',
          secondary: '#121212',
          card: '#1a1a1a',
          accent: '#2a2a2a',
          text: {
            primary: '#f5f5f5',
            secondary: '#a0a0a0',
            accent: '#b0b0b0',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}