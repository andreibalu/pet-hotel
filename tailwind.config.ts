import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3498db',
          50: '#ebf8ff',
          100: '#bee3f8',
          200: '#90cdf4',
          300: '#63b3ed',
          400: '#4299e1',
          500: '#3498db',
          600: '#2b77cb',
          700: '#2c5aa0',
          800: '#2a4365',
          900: '#1a365d',
        },
        secondary: '#2ecc71',
        accent: '#f39c12',
      },
    },
  },
  plugins: [],
}

export default config 