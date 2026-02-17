import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#6366f1",
                    light: "#818cf8",
                    dark: "#4f46e5",
                },
                secondary: {
                    DEFAULT: "#8b5cf6",
                    light: "#a78bfa",
                    dark: "#7c3aed",
                },
                background: {
                    DEFAULT: "#0f172a",
                    light: "#1e293b",
                    lighter: "#334155",
                },
                card: {
                    DEFAULT: "rgba(30, 41, 59, 0.6)",
                    hover: "rgba(30, 41, 59, 0.8)",
                },
                text: {
                    primary: "#f1f5f9",
                    secondary: "#cbd5e1",
                    muted: "#94a3b8",
                },
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
                "glass": "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
            },
            backdropBlur: {
                xs: "2px",
            },
            animation: {
                "fade-in": "fadeIn 0.3s ease-in-out",
                "slide-up": "slideUp 0.4s ease-out",
                "scale-in": "scaleIn 0.2s ease-out",
                "shimmer": "shimmer 2s linear infinite",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideUp: {
                    "0%": { transform: "translateY(20px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                scaleIn: {
                    "0%": { transform: "scale(0.95)", opacity: "0" },
                    "100%": { transform: "scale(1)", opacity: "1" },
                },
                shimmer: {
                    "0%": { backgroundPosition: "-1000px 0" },
                    "100%": { backgroundPosition: "1000px 0" },
                },
            },
        },
    },
    plugins: [],
};

export default config;
