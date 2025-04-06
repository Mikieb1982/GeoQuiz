/**
 * Tailwind CSS configuration for Bad Belzig Abenteuer Geo Quiz
 * Customizing colors to match Bad Belzig's green and white theme
 */

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Bad Belzig primary colors
        'belzig-green': {
          50: '#f0f9f0',
          100: '#dcf1dc',
          200: '#bae3bc',
          300: '#8ecd91',
          400: '#5eb162',
          500: '#3c9240', // Primary green
          600: '#2e7a33',
          700: '#27612b',
          800: '#224d26',
          900: '#1e4022',
          950: '#0f2412',
        },
        'belzig-white': '#ffffff',
        // Supporting colors
        'belzig-gray': {
          50: '#f7f7f7',
          100: '#e3e3e3',
          200: '#c8c8c8',
          300: '#a4a4a4',
          400: '#818181',
          500: '#666666',
          600: '#515151',
          700: '#434343',
          800: '#383838',
          900: '#313131',
          950: '#1a1a1a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'button': '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
};

export default config;
