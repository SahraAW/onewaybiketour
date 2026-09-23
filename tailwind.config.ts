import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        "paper-strong": "var(--paper-strong)",
        ink: "var(--ink)",
        orange: "var(--orange)",
        yellow: "var(--yellow)",
        white: "var(--white)"
      }
    }
  },
  plugins: []
};

export default config;
