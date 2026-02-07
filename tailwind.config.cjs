/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss/plugin')(function({addBase}){addBase({'.prose':{marginBottom:'0',paddingBottom:'0'},'.prose > :last-child':{marginBottom:'0'}})}),require('@tailwindcss/typography')],
};
