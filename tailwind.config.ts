/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{vue,ts}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        'bg-secondary': 'var(--color-bg-secondary)',
        text: 'var(--color-text)',
        primary: 'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',
      },
      boxShadow: {
        'drop-area':
          '0 1px 2px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.07), 0 4px 8px rgba(0,0,0,0.07), 0 8px 16px rgba(0,0,0,0.07)',
      },
    },
  },
  plugins: [],
}
