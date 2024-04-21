import typography from "@tailwindcss/typography"
import colors from "tailwindcss/colors"
import defaultTheme from "tailwindcss/defaultTheme"

/** @type {import("tailwindcss").Config} */
const config = {
  content: ["./app/**/*.{ts,tsx}", "./content/**/*.mdx"],
  theme: {
    screens: {
      xs: "475px",
      ...defaultTheme.screens,
      "2xl": "1440px",
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
      typography: {
        // default prose styles: ./node_modules/@tailwindcss/typography/src/styles.js
        DEFAULT: {
          css: {
            "h2::before": {
              display: "block",
              marginBottom: "1rem",
              height: "3px",
              width: "1.5rem",
              background: "hsl(var(--foreground))",
              content: "''",
            },
            h2: {
              marginTop: "3rem",
              marginBottom: "1.5rem",
              fontFamily: [
                "var(--font-heading)",
                ...defaultTheme.fontFamily.serif,
              ].join(", "),
              letterSpacing: defaultTheme.letterSpacing.wide,
              fontWeight: defaultTheme.fontWeight.normal,
              fontSize: defaultTheme.fontSize["4xl"][0],
              ...defaultTheme.fontSize["4xl"][1],
            },
            h3: {
              marginTop: "1.3rem",
              fontWeight: defaultTheme.fontWeight.semibold,
              fontSize: defaultTheme.fontSize["xl"][0],
              ...defaultTheme.fontSize["xl"][1],
            },
            "blockquote p:last-of-type": {
              marginBottom: "0",
            },
            "blockquote p:first-of-type::before": null,
            "blockquote p:last-of-type::after": null,
            "blockquote p:first-of-type": {
              marginTop: "0",
            },
            "p + p, blockquote + p, ol, ul": {
              marginTop: "0",
            },
            blockquote: {
              marginTop: "0",
              fontWeight: defaultTheme.fontWeight.normal,
            },
            pre: null,
            "code::before": null,
            "code::after": null,
            code: {
              fontWeight: defaultTheme.fontWeight.extrabold,
              color: "hsl(var(--bold)) !important",
            },
            a: {
              fontWeight: defaultTheme.fontWeight.normal,
              textUnderlineOffset: "1px",
            },
            figure: {
              marginTop: "1.25rem",
              marginBottom: "1.25rem",
            },
            "--tw-prose-body": "hsl(var(--foreground))",
            "--tw-prose-headings": "hsl(var(--heading))",
            "--tw-prose-lead": colors.zinc[600],
            "--tw-prose-links": "hsl(var(--foreground))",
            "--tw-prose-bold": "hsl(var(--bold))",
            "--tw-prose-counters": colors.zinc[500],
            "--tw-prose-bullets": colors.zinc[300],
            "--tw-prose-hr": "hsl(var(--border))",
            "--tw-prose-quotes": "hsl(var(--foreground))",
            "--tw-prose-quote-borders": colors.zinc[300],
            "--tw-prose-captions": colors.zinc[500],
            "--tw-prose-code": "hsl(var(--foreground))",
            "--tw-prose-pre-code": colors.zinc[200],
            "--tw-prose-pre-bg": "var(--codeblock)",
            "--tw-prose-th-borders": colors.zinc[300],
            "--tw-prose-td-borders": colors.zinc[200],
            "--tw-prose-invert-body": "hsl(var(--foreground))",
            "--tw-prose-invert-headings": "hsl(var(--heading))",
            "--tw-prose-invert-lead": colors.zinc[400],
            "--tw-prose-invert-links": "hsl(var(--foreground))",
            "--tw-prose-invert-bold": "hsl(var(--bold))",
            "--tw-prose-invert-counters": colors.zinc[400],
            "--tw-prose-invert-bullets": colors.zinc[600],
            "--tw-prose-invert-hr": "hsl(var(--border))",
            "--tw-prose-invert-quotes": "hsl(var(--foreground))",
            "--tw-prose-invert-quote-borders": colors.zinc[700],
            "--tw-prose-invert-captions": colors.zinc[400],
            "--tw-prose-invert-code": "hsl(var(--foreground))",
            "--tw-prose-invert-pre-code": colors.zinc[300],
            "--tw-prose-invert-pre-bg": "var(--codeblock)",
            "--tw-prose-invert-th-borders": colors.zinc[600],
            "--tw-prose-invert-td-borders": colors.zinc[700],
          },
        },
      },
    },
  },
  corePlugins: {
    container: false,
  },
  future: {
    // NOTE revert this once tailwindcss is updated to v4
    // https://stackoverflow.com/questions/56755439/modifying-hover-in-tailwindcss/72323247#72323247
    hoverOnlyWhenSupported: true,
  },
  plugins: [typography],
}

export default config
