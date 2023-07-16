import {
  defineDocumentType,
  makeSource,
  type ComputedFields,
} from "contentlayer/source-files"
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

import { type HeadingsField } from "@/types"

const computedFields: ComputedFields = {
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
      const headings = Array.from<[string, string, string]>(
        doc.body.raw.matchAll(regex),
      ).map((group) => {
        return {
          text: group[2],
          slug: slugify(group[2]),
        } satisfies HeadingsField[number]
      })

      return headings
    },
  },
}

const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "Title of the post",
      required: true,
    },
    description: {
      type: "string",
      description: "Description of the post (Max ? characters)",
    },
    date: {
      type: "date",
      description: "Date of publication",
      required: true,
    },
    // TODO: Implement Draft Mode: https://nextjs.org/docs/app/building-your-application/configuring/draft-mode
    draft: {
      type: "boolean",
    },
  },
  computedFields,
}))

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post],
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
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .replace(/[^\w/-]+/g, "")
    .toLowerCase()
}

/*
  REFERENCES:
  https://github.github.com/gfm/
  https://unpkg.com/browse/shiki@0.14.2/themes/
  https://rehype-pretty-code.netlify.app/
  */
