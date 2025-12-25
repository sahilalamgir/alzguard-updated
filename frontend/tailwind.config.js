/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#EFECE3",
        "text-primary": "#000000",
        "text-secondary": "#4A70A9",
        accent: {
          DEFAULT: "#8FABD4",
          hover: "#7A98C0",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
