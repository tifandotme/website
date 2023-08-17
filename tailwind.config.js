import colors from "tailwindcss/colors"
import defaultTheme from "tailwindcss/defaultTheme"

/** @type {import("tailwindcss").Config} */
const config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./content/**/*.mdx",
    "contentlayer.config.ts",
  ],
  future: {
    // NOTE: revert this once tailwindcss is updated to v4
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
      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-mono)", ...defaultTheme.fontFamily.mono],
        italic: ["var(--font-italic)", ...defaultTheme.fontFamily.serif],
        heading: ["var(--font-heading)", ...defaultTheme.fontFamily.serif],
      },
      fontWeight: {
        inherit: "inherit",
      },
      colors: {
        foreground: "hsl(var(--foreground))",
        background: "hsl(var(--background))",
        primary: "hsl(var(--primary))",
        border: "hsl(var(--border))",
        muted: {
          DEFAULT: "hsl(var(--muted-small-text))",
          darker: "hsl(var(--muted-large-text))",
        },
      },
      keyframes: {
        slideDown: {
          // radix collapsible
          "0%": {
            height: "0",
          },
          "100%": {
            height: "var(--radix-collapsible-content-height)",
          },
        },
        slideUp: {
          "0%": {
            height: "var(--radix-collapsible-content-height)",
          },
          "100%": {
            height: "0",
          },
        },
        loading: {
          // loading dots
          "0%": {
            opacity: ".2",
          },
          "20%": {
            opacity: "1",
            transform: "translateX(1px)",
          },
          to: {
            opacity: ".2",
          },
        },
        mutation: {
          // views counter
          "0%": {
            background: "hsl(var(--muted-small-text) / 3%)",
          },
          "10%": {
            background: "hsl(var(--muted-small-text) / 16%)",
            color: "hsl(var(--heading) / 65%)",
          },
          "100%": {
            background: "hsl(var(--muted-small-text) / 0%)",
          },
        },
      },
      typography: {
        // default prose styles: ./node_modules/@tailwindcss/typography/src/styles.js
        DEFAULT: {
          css: {
            "h2::before": {
              display: "block",
              marginBottom: "1rem",
              height: "2px",
              width: "1.5rem",
              background: "hsl(var(--foreground))",
              content: "''",
            },
            h2: {
              marginTop: "1.7rem",
              fontFamily: [
                "var(--font-heading)",
                ...defaultTheme.fontFamily.serif,
              ].join(", "),
              fontWeight: defaultTheme.fontWeight.medium,
              fontSize: defaultTheme.fontSize["3xl"][0],
              ...defaultTheme.fontSize["3xl"][1],
            },
            h3: {
              marginTop: "1.3rem",
              fontWeight: defaultTheme.fontWeight.semibold,
              fontSize: defaultTheme.fontSize["2xl"][0],
              ...defaultTheme.fontSize["2xl"][1],
            },

            pre: null,
            code: {
              color: "hsl(var(--bold))",
              background: "hsl(var(--muted-small-text)/17%)",
              padding: "0.125rem 0.25rem",
              fontWeight: defaultTheme.fontWeight.normal,
            },
            "code::before": null,
            "code::after": null,

            a: {
              textUnderlineOffset: "2px",
            },
            "ol, ul": {
              marginTop: "0",
            },

            // custom prose colors
            "--tw-prose-body": "hsl(var(--foreground))",
            "--tw-prose-headings": "hsl(var(--heading))",
            "--tw-prose-lead": colors.zinc[600],
            "--tw-prose-links": "hsl(var(--bold))",
            "--tw-prose-bold": "hsl(var(--bold))",
            "--tw-prose-counters": colors.zinc[500],
            "--tw-prose-bullets": colors.zinc[300],
            "--tw-prose-hr": "hsl(var(--border))",
            "--tw-prose-quotes": colors.zinc[900],
            "--tw-prose-quote-borders": colors.zinc[200],
            "--tw-prose-captions": colors.zinc[500],
            "--tw-prose-code": colors.zinc[900],
            "--tw-prose-pre-code": colors.red[200],
            "--tw-prose-pre-bg": "var(--codeblock)",
            "--tw-prose-th-borders": colors.zinc[300],
            "--tw-prose-td-borders": colors.zinc[200],

            "--tw-prose-invert-body": "hsl(var(--foreground))",
            "--tw-prose-invert-headings": "hsl(var(--heading))",
            "--tw-prose-invert-lead": colors.zinc[400],
            "--tw-prose-invert-links": "hsl(var(--bold))",
            "--tw-prose-invert-bold": "hsl(var(--bold))",
            "--tw-prose-invert-counters": colors.zinc[400],
            "--tw-prose-invert-bullets": colors.zinc[600],
            "--tw-prose-invert-hr": "hsl(var(--border))",
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
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}

export default config
