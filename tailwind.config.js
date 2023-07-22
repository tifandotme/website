import colors from "tailwindcss/colors"
import defaultTheme from "tailwindcss/defaultTheme"

/** @type {import("tailwindcss").Config} */
const config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./content/**/*.mdx",
  ],
  future: {
    // TODO: revert this once tailwindcss is updated to v4
    // https://stackoverflow.com/questions/56755439/modifying-hover-in-tailwindcss/72323247#72323247
    hoverOnlyWhenSupported: true,
  },
  theme: {
    container: {
      center: true,
      screens: {
        "2xl": "1400px",
      },
    },
    screens: {
      xs: "475px",
      ...defaultTheme.screens,
    },
    extend: {
      fontWeight: {
        inherit: "inherit",
      },
      colors: {
        foreground: "var(--foreground)",
        background: "var(--background)",
        primary: "var(--primary)",
        border: "var(--border)",
        muted: {
          DEFAULT: "var(--muted-small-text)",
          darker: "var(--muted-large-text)",
        },
      },
      typography: {
        // default prose styles: ./node_modules/@tailwindcss/typography/src/styles.js
        DEFAULT: {
          css: {
            // discard prose-pre styles
            pre: null,

            // custom prose colors
            "--tw-prose-body": "var(--foreground)",
            "--tw-prose-headings": "var(--heading)",
            "--tw-prose-lead": colors.zinc[600],
            "--tw-prose-links": colors.zinc[900],
            "--tw-prose-bold": "var(--bold)",
            "--tw-prose-counters": colors.zinc[500],
            "--tw-prose-bullets": colors.zinc[300],
            "--tw-prose-hr": colors.zinc[200],
            "--tw-prose-quotes": colors.zinc[900],
            "--tw-prose-quote-borders": colors.zinc[200],
            "--tw-prose-captions": colors.zinc[500],
            "--tw-prose-code": colors.zinc[900],
            "--tw-prose-pre-code": colors.red[200],
            "--tw-prose-pre-bg": "var(--codeblock)",
            "--tw-prose-th-borders": colors.zinc[300],
            "--tw-prose-td-borders": colors.zinc[200],

            "--tw-prose-invert-body": "var(--foreground)",
            "--tw-prose-invert-headings": "var(--heading)",
            "--tw-prose-invert-lead": colors.zinc[400],
            "--tw-prose-invert-links": "var(--bold)",
            "--tw-prose-invert-bold": "var(--bold)",
            "--tw-prose-invert-counters": colors.zinc[400],
            "--tw-prose-invert-bullets": colors.zinc[600],
            "--tw-prose-invert-hr": colors.zinc[700],
            "--tw-prose-invert-quotes": colors.zinc[100],
            "--tw-prose-invert-quote-borders": colors.zinc[700],
            "--tw-prose-invert-captions": colors.zinc[400],
            "--tw-prose-invert-code": colors.white,
            "--tw-prose-invert-pre-code": colors.red[300],
            "--tw-prose-invert-pre-bg": "var(--codeblock)",
            "--tw-prose-invert-th-borders": colors.zinc[600],
            "--tw-prose-invert-td-borders": colors.zinc[700],
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-mono)", ...defaultTheme.fontFamily.mono],
        serif: ["var(--font-serif)", ...defaultTheme.fontFamily.serif], // used in <em>
        italic: ["var(--font-serif-slanted)", ...defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}

export default config
