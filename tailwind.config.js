/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#081A51",
        "light-white": "rgba(255,255,255,0.17)",
      },
    },
    keyframes: {
        'progress-bar': {
          '0%': { width: '100%' },
          '100%': { width: '0%' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        spinReverse: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
      },
      animation: {
        'progress-bar': 'progress-bar 5s linear',
        spin: 'spin 1.5s linear infinite',
        spinReverse: 'spinReverse 1.5s linear infinite',
      },
  },
  plugins: [],
};
