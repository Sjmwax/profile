module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#f0f9ff',
          100: '#e0f2fe',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
        },
        accent: {
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
        },
        dark: {
          50:  '#f9fafb',
          100: '#f3f4f6',
          700: '#1f2937',
          800: '#111827',
          900: '#0d1117',
          950: '#070b14',
        }
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fadeIn':    'fadeIn 0.5s ease-in',
        'slideUp':   'slideUp 0.6s ease-out',
        'float':     'float 6s ease-in-out infinite',
        'pulse-glow':'pulse-glow 2.5s ease-in-out infinite',
        'shimmer':   'shimmer 2.5s linear infinite',
        'orb-1':     'orb-move-1 18s ease-in-out infinite',
        'orb-2':     'orb-move-2 22s ease-in-out infinite',
        'orb-3':     'orb-move-1 26s ease-in-out infinite reverse',
        'spin-slow':  'spin 8s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { transform: 'translateY(24px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',    opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)   rotate(0deg)' },
          '33%':      { transform: 'translateY(-14px)  rotate(1.5deg)' },
          '66%':      { transform: 'translateY(-7px)   rotate(-1deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6' },
          '50%':      { opacity: '1'   },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition:  '200% center' },
        },
        'orb-move-1': {
          '0%, 100%': { transform: 'translate(0%,  0%)' },
          '25%':      { transform: 'translate(4%,  3%)' },
          '50%':      { transform: 'translate(-3%, 6%)' },
          '75%':      { transform: 'translate(2%, -4%)' },
        },
        'orb-move-2': {
          '0%, 100%': { transform: 'translate(0%,   0%)' },
          '25%':      { transform: 'translate(-5%, -2%)' },
          '50%':      { transform: 'translate(3%,  -5%)' },
          '75%':      { transform: 'translate(-2%,  3%)' },
        },
      },
    }
  },
  plugins: [],
}
