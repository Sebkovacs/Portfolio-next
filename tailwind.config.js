/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", "[data-theme='dark']"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg1: "var(--bg1)",
        bg2: "var(--bg2)",
        t1: "var(--t1)",
        t2: "var(--t2)",
        s1: "var(--s1)",
        s2: "var(--s2)",
        s3: "var(--s3)",
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

