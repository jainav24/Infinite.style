/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        velvet: '#2A0E2E',
        orchid: '#E83E8C',
        periwinkle: '#6C63FF',
        champagne: '#E8D9B5',
        porcelain: '#FAF7F2',
        ink: '#16101A',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
        fjalla: ['"Fjalla One"', 'sans-serif'],
        montenegrin: ['"Montenegrin Gothic One"', 'sans-serif'],
        noto: ['"Noto Sans"', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
