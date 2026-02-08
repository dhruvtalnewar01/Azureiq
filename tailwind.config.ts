import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'azure-black': '#050505',
        'azure-gold': '#D4AF37',
        'azure-cream': '#F5F5F0',
        'azure-charcoal': '#1A1A1A',
        'azure-platinum': '#E5E4E2',
        'azure-silver': '#C0C0C0',
        'azure-burgundy': '#2C041C',
        'azure-rose': '#EBC9D3',
      },
      fontFamily: {
        'serif': ['Cinzel', 'serif'],
        'sans': ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(212, 175, 55, 0.3)',
        'platinum-glow': '0 0 25px rgba(229, 228, 226, 0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'count-up': 'countUp 1.5s ease-out forwards',
      }
    },
  },
  plugins: [],
}
export default config
