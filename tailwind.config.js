/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"IBM Plex Sans Arabic"', '"Tajawal"', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#155C70',
          dark: '#0D3F4D',
          light: '#E8F0F2',
        },
        secondary: '#9A948C',
        ink: '#111111',
        bg: '#F7F8F9',
        success: '#16805B',
        warning: '#C88920',
        error: '#C94A4A',
      },
      boxShadow: {
        card: '0 1px 2px rgba(17,17,17,0.04), 0 1px 6px rgba(17,17,17,0.05)',
        popover: '0 8px 24px rgba(13,63,77,0.14)',
      },
      borderRadius: {
        md: '10px',
        lg: '14px',
      },
    },
  },
  plugins: [],
}
