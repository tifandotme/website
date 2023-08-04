import { defineDocumentType, makeSource } from "contentlayer/source-files"
import rehypeAutolinkHeadings, {
  type Options as AutolinkHeadingsOptions,
} from "rehype-autolink-headings"
import rehypeExternalLinks, {
  type Options as ExternalLinksOptions,
} from "rehype-external-links"
import rehypePrettyCode, {
  type Options as PrettyCodeOptions,
} from "rehype-pretty-code"
import rehypeShiftHeading, {
  type Options as ShiftHeadingOptions,
} from "rehype-shift-heading"
import rehypeSlug, { type Options as SlugOptions } from "rehype-slug"
import remarkGfm, { type Options as GfmOptions } from "remark-gfm"

import { type Headings } from "@/types"

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
    draft: {
      type: "boolean",
      description:
        "If true, post will not show up in list of posts and sitemap",
    },
  },
  computedFields: {
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
        const regex = /\n(?<flag>#{1})\s+(?<content>.+)/g
        const headings = Array.from(doc.body.raw.matchAll(regex)).map(
          (group) => {
            const text = group[2] as string
            return {
              text,
              slug: slugify(text),
            } satisfies Headings[number]
          },
        )

        return headings
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
    isWIP: {
      type: "boolean",
    },
  },
  computedFields: {
    repo: {
      type: "string",
      resolve: (doc) => {
        return "https://" + doc.repo
      },
    },
    demo: {
      type: "string",
      resolve: (doc) => {
        if (!doc.demo) return

        return "https://" + doc.demo
      },
    },
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
            className: ["anchor"],
          },
        } satisfies AutolinkHeadingsOptions,
      ],
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
              className: "inline-block ml-0.5 text-muted",
            },
            children: [
              {
                type: "element",
                tagName: "path",
                properties: {
                  d: "M7 17 17 7M7 7h10v10",
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
