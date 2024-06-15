/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,svelte}",
  ],
  theme: {
    fontFamily: {
      mono: ["Roboto Mono", "ui-monospace", "monospace"],
    },
    extend: {},
  },
  plugins: [],
}

