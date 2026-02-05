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
        background: "#0b0f14",
        foreground: "#f5f2ea",
        surface: "#111926",
        "surface-2": "#161f2f",
        border: "#263245",
        muted: "#9aa3b2",
        accent: "#ff6b4a",
        "accent-2": "#f4b23f",
        "accent-3": "#2dd4bf",
        neon: {
          red: "#ff6b4a",
          pink: "#f4b23f",
          dark: "#b14a32",
        },
        terminal: {
          green: "#2dd4bf",
          amber: "#f4b23f",
        },
      },
      fontFamily: {
        sans: ["Space Grotesk", "ui-sans-serif", "system-ui"],
        mono: ["IBM Plex Mono", "ui-monospace", "SFMono-Regular", "monospace"],
        display: ["Space Grotesk", "ui-sans-serif", "system-ui"],
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
            boxShadow: "0 0 8px rgba(255, 107, 74, 0.35), 0 0 14px rgba(255, 107, 74, 0.3)",
          },
          "100%": {
            boxShadow: "0 0 16px rgba(255, 107, 74, 0.45), 0 0 28px rgba(255, 107, 74, 0.4)",
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
          "50%": { borderColor: "#ff6b4a" },
        },
      },
      boxShadow: {
        neon: "0 12px 40px rgba(7, 10, 16, 0.35), 0 0 0 1px rgba(255, 107, 74, 0.25)",
        "neon-lg": "0 20px 60px rgba(7, 10, 16, 0.45), 0 0 0 1px rgba(255, 107, 74, 0.35)",
        soft: "0 18px 45px rgba(7, 10, 16, 0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
