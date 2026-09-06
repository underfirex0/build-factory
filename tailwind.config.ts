import type { Config } from 'tailwindcss';

// Design direction: "Factory Console" — this is an internal ops tool for running
// a build pipeline, not a marketing site. Dark, dense, technical — closer to a
// manufacturing control room / assembly-line status board than a generic SaaS.
// Signal-amber is the single accent (like an assembly-line indicator light),
// steel-blue is reserved strictly for links/informational states so it never
// competes with amber for attention.
const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          950: '#0E1013',
          900: '#14171C',
          800: '#1B1F26',
          700: '#252A33',
          600: '#333A46',
          500: '#4A5261',
          400: '#6B7280',
          300: '#9AA1AC',
          200: '#C4C9D0',
          100: '#E8EAED',
        },
        signal: {
          DEFAULT: '#F5A623',
          dim: '#B87A1A',
          bright: '#FFC15C',
        },
        steel: {
          DEFAULT: '#5B8DEF',
          dim: '#3E6BC4',
        },
        ok: '#4ADE80',
        warn: '#F5A623',
        danger: '#EF5350',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        none: '0px',
        sm: '3px',
        DEFAULT: '4px',
        md: '6px',
      },
    },
  },
  plugins: [],
};

export default config;
