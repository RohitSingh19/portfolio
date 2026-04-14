module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c3d66',
        },
      },
      fontFamily: {
        sans: ['Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
      },
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
        'pulse-glow': {
          '0%, 100%': {
            opacity: '1',
            filter: 'drop-shadow(0 0 0 rgba(59, 130, 246, 0))',
          },
          '50%': {
            opacity: '0.95',
            filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.5))',
          },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'fill-bar': {
          'from': { width: '0%' },
          'to': { width: '100%' },
        },
        'count-up': {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        blob: 'blob 7s infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'fill-bar': 'fill-bar 1s ease-out forwards',
        'count-up': 'count-up 1s ease-out forwards',
        bounce: 'bounce 2s infinite',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
