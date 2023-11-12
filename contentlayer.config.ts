import { defineDocumentType, makeSource } from "contentlayer/source-files"
import rehypeAutolinkHeadings, {
  type Options as AutolinkHeadingsOptions,
} from "rehype-autolink-headings"
import rehypeExternalLinks, {
  type Options as ExternalLinksOptions,
} from "rehype-external-links"
import rehypeMermaid, {
  type RehypeMermaidOptions as MermaidOptions,
} from "rehype-mermaid"
import rehypePrettyCode, {
  type Options as PrettyCodeOptions,
} from "rehype-pretty-code"
import rehypeShiftHeading, {
  type Options as ShiftHeadingOptions,
} from "rehype-shift-heading"
import rehypeSlug, { type Options as SlugOptions } from "rehype-slug"
import remarkGfm, { type Options as GfmOptions } from "remark-gfm"
import defaultTheme from "tailwindcss/defaultTheme.js"

import { type HeadingsField } from "@/types"

const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "Post's title",
      required: true,
    },
    description: {
      type: "string",
      description: "Post's description",
    },
    date: {
      type: "date",
      description: "Post's published date",
      required: true,
    },
  },
  computedFields: {
    draft: {
      description: "Draft post will not show up in list of posts and sitemap",
      type: "boolean",
      resolve: (doc) => {
        return doc._raw.sourceFileDir.startsWith("blog/draft")
      },
    },
    url: {
      description: "URL path of the post (e.g. /blog/my-post)",
      type: "string",
      resolve: (doc) => {
        const segments = doc._raw.flattenedPath.split("/")

        // remove in-between segments (e.g. 2023)
        segments.splice(1, segments.length - 2)

        const final = "/" + segments.join("/")

        return slugify(final)
      },
    },
    slug: {
      description: "Slug of the post (e.g. my-post)",
      type: "string",
      resolve: (doc) => {
        const segments = doc._raw.flattenedPath.split("/")

        const final = segments[segments.length - 1]!

        return slugify(final)
      },
    },
    headings: {
      type: "json",
      resolve: async (doc) => {
        let isInsideCodeBlock = false
        const headingLines = doc.body.raw.split("\n").filter((line) => {
          if (line.startsWith("```")) {
            isInsideCodeBlock = !isInsideCodeBlock
            return false
          }

          if (isInsideCodeBlock) return false

          return /^\s*#\s.*/.exec(line)
        })

        return headingLines.map((line) => {
          const text = line.replace(/^(\s*#\s*)/, "")

          return {
            text,
            slug: slugify(text),
          }
        }) as HeadingsField
      },
    },
  },
}))

const Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: `projects/*.{yaml,yml,json}`,
  contentType: "data",
  fields: {
    name: {
      type: "string",
      description: "Project's name",
      required: true,
    },
    description: {
      type: "string",
      description: "Project's description",
      required: true,
    },
    date: {
      type: "date",
      description: "Project's finished date",
      required: true,
    },
    tags: {
      type: "list",
      of: {
        type: "string",
      },
      description: "Project's tech stack",
      required: true,
    },
    image: {
      type: "string",
      description:
        "Project's image URL as Cloudinary publicId (e.g. projects/puri.png)",
    },
    repo: {
      type: "string",
      description: "Project's GitHub repository URL",
      required: true,
    },
    demo: {
      type: "string",
      description: "Project's demo URL",
    },
  },
  computedFields: {
    slug: {
      description: "Slug of the project (e.g. personal-website)",
      type: "string",
      resolve: (doc) => {
        const segments = doc._raw.flattenedPath.split("/")

        const final = segments[segments.length - 1]!

        return slugify(final)
      },
    },
  },
}))

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post, Project],
  mdx: {
    remarkPlugins: [[remarkGfm, {} satisfies GfmOptions]],
    rehypePlugins: [
      [rehypeSlug, {} satisfies SlugOptions], // must be before autolink headings
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: [
              // discard prose-a styles
              "font-inherit text-inherit no-underline",

              "-ml-[1em] pl-[1em] before:absolute before:-ml-[1em] before:font-mono before:font-medium before:text-white/0 before:content-['#'] hover:before:text-muted-darker",
            ],
          },
        } satisfies AutolinkHeadingsOptions,
      ],
      [
        rehypeMermaid as any, // REF: https://github.com/remcohaszing/rehype-mermaid/issues/4
        {
          strategy: "inline-svg",
          css: "https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200..1000&display=swap",
          mermaidConfig: {
            securityLevel: "loose",
            fontFamily: ["Nunito Sans", ...defaultTheme.fontFamily.sans].join(
              ", ",
            ),
            fontSize: 10,
            gitGraph: {
              useMaxWidth: true,
            },
            pie: {
              useWidth: 900,
            },
            theme: "default",
            themeCSS: [
              "margin: 1rem auto; line-height: 1.4;",

              // flowchart
              ".label, p, span, text { color: hsl(var(--foreground)); }",
              // node
              ".node * { fill: hsl(var(--codeblock-background)) !important; stroke: hsl(var(--foreground)/20%) !important; stroke-width: 1px; }",
              // arrow head
              ".marker { fill: hsl(var(--foreground)); stroke: hsl(var(--foreground)); }",
              // link
              ".flowchart-link { stroke: hsl(var(--foreground)); }",
              // clusters
              ".cluster rect { fill: hsl(var(--yellow)/20%); stroke: hsl(var(--yellow)); }",
              ".cluster span { color: hsl(var(--foreground)); }",
            ].join(" "),
          },
        } satisfies MermaidOptions,
      ], // must be before rehypePrettyCode
      [
        rehypePrettyCode,
        {
          // https://unpkg.com/browse/shiki@0.14.2/themes/
          theme: {
            dark: "github-dark",
            light: "github-light",
          },
          keepBackground: false,
        } satisfies PrettyCodeOptions,
      ],
      [
        rehypeExternalLinks,
        {
          content: {
            type: "element",
            tagName: "svg",
            properties: {
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 24 24",
              width: 15,
              height: 15,
              stroke: "currentColor",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: "2.5px",
              fill: "none",
              className: "inline mb-0.5 ml-0.5 text-muted",
            },
            children: [
              {
                type: "element",
                tagName: "path",
                properties: {
                  d: "M 7 17 L 17 7 M 7 7 L 17 7 L 17 17",
                },
                children: [],
              },
            ],
          },
          contentProperties: {
            "aria-hidden": true,
          },
          target: "_blank",
          rel: ["nofollow", "noopener"],
        } satisfies ExternalLinksOptions,
      ],
      [
        rehypeShiftHeading,
        {
          shift: 1,
        } satisfies ShiftHeadingOptions,
      ],
    ],
  },
})

function slugify(text: string): string {
  return text
    .trim()
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .replace(/[^\w/-]+/g, "")
    .toLowerCase()
}
