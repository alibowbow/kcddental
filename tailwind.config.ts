import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: 'var(--brand)',
          accent: 'var(--brand-accent)',
          green: '#1E8449',
          red: '#922B21',
          amber: '#D4AC0D',
          surface: '#F7F9FC',
          text: '#1C2833',
        },
      },
      fontFamily: {
        sans: ['"Noto Sans KR"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        panel: '0 18px 44px -20px rgba(15, 40, 65, 0.35)',
        glow: '0 0 0 1px rgba(46, 134, 193, 0.25), 0 12px 40px -12px rgba(46, 134, 193, 0.45)',
      },
      backgroundImage: {
        grid: 'linear-gradient(to right, rgba(46, 134, 193, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(46, 134, 193, 0.08) 1px, transparent 1px)',
        'brand-sheen': 'linear-gradient(135deg, #1a5276 0%, #2e86c1 55%, #4aa3df 100%)',
      },
    },
  },
  plugins: [],
}

export default config
