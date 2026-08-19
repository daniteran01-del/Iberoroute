import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#132A13",
        paper: "#F4F1E8",
        panel: "#FFFFFF",
        line: "#DAD5C4",
        accent: "#4C7A34",
        accent2: "#E0A227",
        full: "#B5473A",
      },
      fontFamily: {
        display: ["'Fraunces'", "Georgia", "serif"],
        body: ["'Inter'", "system-ui", "sans-serif"],
      },
      borderRadius: { sm: "4px", md: "8px" },
    },
  },
  plugins: [],
};
export default config;
