"use server"

import { compileMDX } from "next-mdx-remote/rsc"
import fs from "node:fs"
import path from "node:path"
import { components } from "./mdx/components"
import { mdxOptions } from "./mdx/options"
import { slugify } from "./utils"

/**
 * Find all MDX files in a directory recursively.
 *
 * @param dir The directory to search. Example: "./content"
 */
function findMDXFiles(dir: string): string[] {
  const result: string[] = []
  const files = fs.readdirSync(dir)

  for (const file of files) {
    const name = path.join(dir, file)
    if (fs.statSync(name).isDirectory()) {
      result.push(...findMDXFiles(name))
    } else if (path.extname(name) === ".mdx") {
      result.push(name)
    }
  }

  return result
}

/**
 * Extract headings from a MDX source.
 */
async function extractHeadings(source: string) {
  const lines = source.split("\n")

  let isInsideCodeBlock = false
  const matches = lines.filter((line) => {
    if (line.startsWith("```")) isInsideCodeBlock = !isInsideCodeBlock
    if (isInsideCodeBlock) return false
    return /^\s*#\s.*/.test(line)
  })

  return matches.map((line) => {
    const text = line.replace(/^(\s*#\s*)/, "")
    return {
      text,
      slug: slugify(text),
    }
  })
}

export async function getAllPosts() {
  const paths = findMDXFiles("./content")

  return Promise.all(
    paths.map(async (path) => {
      const source = fs.readFileSync(path, "utf-8")
      const { content, frontmatter } = await compileMDX<Frontmatter>({
        source,
        components,
        options: {
          mdxOptions,
          parseFrontmatter: true,
        },
      })

      await validate(frontmatter, path)

      const slug = slugify(
        path
          .split("/")
          .pop()!
          .replace(/\.mdx$/, ""),
      )

      return {
        ...frontmatter,
        content,
        headings: await extractHeadings(source),
        slug,
        url: "/" + slug,
      }
    }),
  ).then((posts) =>
    posts.sort((a, b) =>
      Intl.Collator().compare(b.publishedDate, a.publishedDate),
    ),
  )
}

export async function getPostBySlug(slug: string) {
  return getAllPosts().then((posts) => posts.find((post) => post.slug === slug))
}

/* ========================== SCHEMA AND VALIDAION ========================== */

type Frontmatter = {
  title: string
  description: string
  /**
   * Format: `YYYY-MM-DD`
   */
  publishedDate: `${number}-${number}-${number}`
  lang: "en" | "id"
}

/**
 * Validate frontmatter properties of a blog post. Throws an error if a required
 * property is missing or invalid.
 */
async function validate(frontmatter: Frontmatter, path: string) {
  const requiredProperties: (keyof Frontmatter)[] = [
    "title",
    "description",
    "publishedDate",
    "lang",
  ]

  try {
    for (const prop of requiredProperties) {
      if (!frontmatter[prop]) {
        throw new Error(
          `Missing or invalid frontmatter: ${prop}. Value: ${frontmatter[prop]}`,
        )
      }
    }
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`${err.message} (${path})`)
    }
    throw err
  }
}
