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
          primary: '#1A5276',
          accent: '#2E86C1',
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
        panel: '0 18px 40px rgba(26, 82, 118, 0.08)',
      },
      backgroundImage: {
        grid: 'linear-gradient(to right, rgba(46, 134, 193, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(46, 134, 193, 0.08) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}

export default config
