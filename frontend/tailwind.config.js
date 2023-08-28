/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Add your color theme here
        primaryBackground: "#001E2B",
        dlp: "#012416",
        darkGreen: "#023420",
        midGreen: "#00684A",
        lightGreen: "#00ED64",
        midAccentGreen: "#00533b",
      },
    },
  },
  plugins: [],
};
