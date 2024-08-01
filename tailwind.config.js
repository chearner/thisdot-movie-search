/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}', './app/**/*.{js,jsx}', './src/**/*.{js,jsx}'],
  prefix: '',
  plugins: [require('tailwindcss-animate'), require('daisyui')],
  varients: {
    animation: ['hover', 'group-hover'],
  },
  daisyui: {
    themes: ['acid', 'light', 'dark'],
  },
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'rainbow-shadow': {
          '0%, 100%': { boxShadow: '0 0 0 3px rgba(255, 0, 0, 0.7)' },
          '14%': { boxShadow: '0 0 0 3px rgba(255, 127, 0, 0.7)' },
          '28%': { boxShadow: '0 0 0 3px rgba(255, 255, 0, 0.7)' },
          '42%': { boxShadow: '0 0 0 3px rgba(0, 255, 0, 0.7)' },
          '57%': { boxShadow: '0 0 0 3px rgba(0, 0, 255, 0.7)' },
          '71%': { boxShadow: '0 0 0 3px rgba(75, 0, 130, 0.7)' },
          '85%': { boxShadow: '0 0 0 3px rgba(143, 0, 255, 0.7)' },
        },
      },
      animation: {
        'rainbow-shadow': 'rainbow-shadow 5s linear infinite',
      },
    },
  },
};
