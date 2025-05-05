/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#374151', // text-gray-700
            h1: {
              color: '#1e3a8a', // text-blue-900
            },
            h2: {
              color: '#1e40af', // text-blue-800
            },
            h3: {
              color: '#1d4ed8', // text-blue-700
            },
            a: {
              color: '#1d4ed8', // text-blue-700
              '&:hover': {
                color: '#3b82f6', // text-blue-500
              },
            },
            code: {
              color: '#1e40af', // text-blue-800
              backgroundColor: '#eff6ff', // bg-blue-50
              padding: '0.2em 0.4em',
              borderRadius: '0.25em',
            },
            pre: {
              backgroundColor: '#f3f4f6', // bg-gray-100
              code: {
                backgroundColor: 'transparent',
                color: '#374151', // text-gray-700
              }
            }
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}