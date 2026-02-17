export const theme = {
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
    gradients: {
        primary: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
        card: "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
    },
    shadows: {
        glow: "0 0 20px rgba(99, 102, 241, 0.3)",
        card: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
    },
} as const;

export type Theme = typeof theme;
