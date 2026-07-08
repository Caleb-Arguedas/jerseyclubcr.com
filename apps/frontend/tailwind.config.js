module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: '#0F172A',
        light: '#FFFFFF',
        gray: '#F5F5F5',
        gold: '#FBBF24',
        red: '#EF4444',
        whatsapp: '#22C55E',
      },
      fontFamily: {
        heading: ['var(--font-poppins)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 10px 30px -10px rgba(0, 0, 0, 0.1)',
        'glow': '0 0 20px rgba(251, 191, 36, 0.3)',
      }
    },
  },
  plugins: [],
}
