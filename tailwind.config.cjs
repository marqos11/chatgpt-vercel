/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      // This overrides the default @tailwindcss/typography styles
      typography: {
        DEFAULT: {
          css: {
            // Fix h1: Make it thin (500) and small
            h1: {
              fontWeight: '500', 
              fontSize: '1.125em',
              marginTop: '1em',
              marginBottom: '0.5em',
            },
            // Fix h2: Make it thin (500) and small
            h2: {
              fontWeight: '500', 
              fontSize: '1.05em',
              marginTop: '1em',
              marginBottom: '0.5em',
            },
            // Fix h3: Keep it bold (600) but text size
            h3: {
              fontWeight: '600', 
              fontSize: '1em',
              marginTop: '1em',
              marginBottom: '0.5em',
            },
            // Fix h4: Keep it bold (600) but text size
            h4: {
              fontWeight: '600', 
              fontSize: '1em',
              marginTop: '1em',
              marginBottom: '0.5em',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
