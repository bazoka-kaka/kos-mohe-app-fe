/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4E60FF",
          light: "#6373ff",
        },
      },
    },
  },
  plugins: [],
};
