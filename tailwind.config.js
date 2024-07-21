/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/**/**/*.{js,jsx,ts,tsx}",
    "./components/**/**/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#C6E1FD",
        secondary: "#0A184F",
      },
    },
  },
  plugins: [],
};
