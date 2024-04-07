import type { MDXRemoteProps } from "next-mdx-remote/rsc"
import fs from "node:fs"
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
import rehypeSlug from "rehype-slug"
import { visit } from "unist-util-visit"

type MDXOptions = NonNullable<MDXRemoteProps["options"]>["mdxOptions"]

export const mdxOptions: MDXOptions = {
  rehypePlugins: [
    () => (tree) => {
      visit(tree, (node) => {
        if (node?.type === "element" && node?.tagName === "pre") {
          const [codeEl] = node.children
          if (codeEl.tagName !== "code") return

          node.__meta__ = codeEl.children?.[0].value
        }
      })
    },
    [
      rehypePrettyCode as any,
      {
        theme: {
          dark: JSON.parse(
            fs.readFileSync("./app/_lib/mdx/grubber.json", "utf8"),
          ),
          light: "github-light-default",
        },
        keepBackground: false,
      } satisfies PrettyCodeOptions,
    ],
    [rehypeSlug], // must be before autolink headings
    [
      rehypeAutolinkHeadings,
      {
        behavior: "wrap",
        properties: {
          className: [
            // discard prose-a styles
            "font-inherit text-inherit no-underline",

            "-ml-[1em] pl-[1em] before:absolute before:-ml-[1em] before:font-mono before:font-extralight before:text-transparent before:content-['#'] before:hover:text-muted-darker",
          ],
        },
      } satisfies AutolinkHeadingsOptions,
    ],
    [
      rehypeShiftHeading,
      {
        shift: 1,
      } satisfies ShiftHeadingOptions,
    ],
    [
      rehypeExternalLinks,
      {
        content: {
          type: "element",
          tagName: "svg",
          properties: {
            className: "inline ml-px size-4 text-muted-darker/80",
          },
          children: [
            {
              type: "element",
              tagName: "use",
              properties: {
                href: "/sprite.svg#external",
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
    () => (tree) => {
      visit(tree, (node) => {
        if (node?.type === "element" && node?.tagName === "figure") {
          if (!("data-rehype-pretty-code-figure" in node.properties)) {
            return
          }

          const [preEl] = node.children
          if (preEl.tagName !== "pre") {
            return
          }

          preEl.properties["raw"] = node.__meta__
          node.properties["className"] = "relative"
        }
      })
    },
  ],
}
