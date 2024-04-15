import { compileMDX } from "next-mdx-remote/rsc"
import fs from "node:fs"
import path from "node:path"
import { components } from "./mdx/components"
import { mdxOptions } from "./mdx/options"
import { slugify } from "./utils"

/**
 * Extract headings from a raw MDX source.
 */
function extractHeadings(source: string) {
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

/**
 * Return paths to all MDX files in a directory and its subdirectories.
 */
function findMDXFiles(dir: string): string[] {
  return fs
    .readdirSync(path.join(process.cwd(), dir), {
      recursive: true,
      encoding: "utf-8",
    })
    .filter(
      (file) =>
        path.extname(file) === ".mdx" &&
        // prefix with `_` to exclude from build, essentially making it a draft
        !file.split("/").pop()!.startsWith("_"),
    )
    .map((file) => path.join(dir, file))
}

/**
 * Parse an MDX file and return its frontmatter, content, and headings.
 */
async function parseMDXFile(file: string) {
  const source = fs.readFileSync(path.join(process.cwd(), file), "utf-8")

  const headings = extractHeadings(source)
  const { frontmatter, content } = await compileMDX<Frontmatter>({
    source,
    components,
    options: {
      mdxOptions,
      parseFrontmatter: true,
    },
  })

  return { frontmatter, content, headings }
}

export async function getAllPosts() {
  const files = findMDXFiles("content")

  return Promise.all(
    files.map(async (file) => {
      const { frontmatter, content, headings } = await parseMDXFile(file)
      const slug = slugify(
        file
          .split("/")
          .pop()!
          .replace(/\.mdx$/, ""),
      )

      await validate(frontmatter, file)

      return {
        ...frontmatter,
        content,
        headings,
        slug,
        url: "/blog/" + slug,
      }
    }),
  ).then((posts) =>
    posts.sort((a, b) =>
      Intl.Collator().compare(b.publishedAt, a.publishedAt),
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
  publishedAt: `${number}-${number}-${number}`
  lang: "en" | "id"
}

/**
 * Validate frontmatter properties of a blog post. Throws an error if a required
 * property is missing or invalid.
 * @param frontmatter - frontmatter object compiled from MDX file.
 * @param file - path to the MDX file. Used for error message.
 */
async function validate(frontmatter: Frontmatter, file: string) {
  const requiredProperties: (keyof Frontmatter)[] = [
    "title",
    "description",
    "publishedAt",
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
      throw new Error(`${err.message} (${file})`)
    }
    throw err
  }
}
