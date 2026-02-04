import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        foreground: "#ededed",
        neon: {
          red: "#ff0033",
          pink: "#ff3366",
          dark: "#990022",
        },
        terminal: {
          green: "#00ff41",
          amber: "#ffb000",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      animation: {
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        flicker: "flicker 0.15s infinite",
        typing: "typing 3.5s steps(40, end)",
        blink: "blink 1s step-end infinite",
      },
      keyframes: {
        glow: {
          "0%": {
            boxShadow: "0 0 5px #ff0033, 0 0 10px #ff0033, 0 0 15px #ff0033",
          },
          "100%": {
            boxShadow: "0 0 10px #ff0033, 0 0 20px #ff0033, 0 0 30px #ff0033, 0 0 40px #ff0033",
          },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        typing: {
          "from": { width: "0" },
          "to": { width: "100%" },
        },
        blink: {
          "from, to": { borderColor: "transparent" },
          "50%": { borderColor: "#ff0033" },
        },
      },
      boxShadow: {
        neon: "0 0 5px theme('colors.neon.red'), 0 0 20px theme('colors.neon.red')",
        "neon-lg": "0 0 10px theme('colors.neon.red'), 0 0 30px theme('colors.neon.red'), 0 0 50px theme('colors.neon.red')",
      },
    },
  },
  plugins: [],
};

export default config;
