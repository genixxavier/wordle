/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "switch-off": "url('../src/images/switch-off.png')",
        "switch-on": "url('../src/images/switch-on.png')",
      },
    },
  },
  plugins: [],
};
