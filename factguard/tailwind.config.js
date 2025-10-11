// tailwind.config.js
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], 
  theme: {
    extend: {
      transitionProperty: {
        width: "width",
      },
      spacing: {
        'header-height': '3.5rem', 
      },
      zIndex: {
        9999: "9999",
      },
      boxShadow: {
        neon: "0 0 40px rgba(0, 240, 181, 0.2)",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        space: ["Space Grotesk", "sans-serif"],
      },
      colors: {
        background: "#0D0D0D",
        surface: "#1C1C1E",
        primary: "#10F2CD",
        secondary: "#725CFF",
        border: "#2F2F32",
        text: "#F5F5F7",
        muted: "#9B9B9D",
        success: "#3DFE92",
        danger: "#FF4C4C",
        jet: "#000000",
        electricTeal: "#00F0B5",
        royalPurple: "#9B59B6",
      },
    },
  },
  plugins: [],
};
