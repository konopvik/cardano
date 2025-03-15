/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    extend: {
      padding: {
        sm: "6px",
        md: "12px",
        lg: "24px",
        xl: "48px",
      },
      spacing: {
        desktop: "1250px",
      },
      colors: {
        background: "var(--background)",
        secondary: "var(--secondary)",
        primary: "var(--primary)",
        card: "var(--card-bg)",
        border: "var(--border)",
        hover: "var(--hover)",
        muted: "var(--text-muted)",
        accent: "var(--accent)",
        skeleton: "var(--skeleton)",
      },
      boxShadow: {
        header: "0 4px 6px rgba(0, 0, 0, 0.1)",
        neumorphic:
          "10px 10px 30px rgba(0, 0, 0, 0.2), -10px -10px 30px rgba(255, 255, 255, 0.8)",
        soft: "0 10px 30px rgba(0, 0, 0, 0.1)",
        deep: "0 15px 40px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};
