/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        main_blue: {
          "0C53FC": "#0C53FC",
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
