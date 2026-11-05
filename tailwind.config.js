/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: {
          light: '#F4F7FE',
          dark: '#0B0F19',
        },
        surface: {
          light: '#FFFFFF',
          dark: '#111827',
          darkSubtle: '#1E293B',
        },
        sidebar: {
          navy: '#0F172A',
          navyDark: '#090D16',
        },
        brand: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft-card': '0 4px 20px -2px rgba(15, 23, 42, 0.05)',
        'elevated': '0 10px 25px -3px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
};

