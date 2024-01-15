/** @type {import('tailwindcss').Config} */

const {nextui} = require("@nextui-org/react");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {

    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      colors: {
        background: "#FFFFFF", // or DEFAULT
        foreground: "#11181C", // or 50 to 900 DEFAULT
        primary: {
          // ... 50 to 900
          foreground: "#FFFFFF",
          DEFAULT: "006FEE",
        },
      },
    }),
  ],
}

