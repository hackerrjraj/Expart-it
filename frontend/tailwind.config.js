/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        agency: {
          bg: "#0a0a0c",
          surface: "#121216",
          accent: "#c7ff3d",
          accent2: "#7c5cff",
          muted: "#8a8a94",
          orange: "#f7941d",
          orangeDark: "#e07d00",
        },
      },
      fontFamily: {
        display: ["Inter", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      transitionTimingFunction: {
        "agency-ease": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      animation: {
        marquee: "marquee 60s linear infinite",
        "marquee-reverse": "marquee-reverse 60s linear infinite",
      },
    },
  },
  plugins: [],
};
