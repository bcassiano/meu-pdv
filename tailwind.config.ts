import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#0d59f2",
                "background-light": "#f5f6f8",
                "background-dark": "#101622",
            },
            fontFamily: {
                display: ["Inter", "sans-serif"],
            },
        },
    },
    plugins: [],
};
export default config;
