import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Icon } from "../../_components/icon"
import { Views } from "../../_components/views"
import { getAllPosts, getPostBySlug } from "../../_lib/blog"
import { cn, formatDate } from "../../_lib/utils"
import { Giscus } from "./giscus"
import "./post.css"

export const dynamic = "force-static"

export async function generateStaticParams() {
  return getAllPosts().then((posts) =>
    posts.map((post) => ({ slug: post.slug })),
  )
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) notFound()

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: post.url,
      siteName: "Tifan Dwi Avianto",
      locale: post.lang === "en" ? "en_US" : "id_ID",
      type: "article",
      publishedTime: post.publishedAt,
      images: `/og?title=${encodeURIComponent(post.title)}`,
      authors: ["Tifan Dwi Avianto"],
    },
    twitter: {
      images: `/og?title=${encodeURIComponent(post.title)}`,
    },
    other: {
      "giscus:backlink": `https://tifan.me${post.url}`,
    },
  }
}

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getPostBySlug(params.slug)
  if (!post) notFound()

  return (
    <main className="relative mx-auto max-w-screen-2xl px-4 pb-14 pt-16 sm:px-6">
      <Back className="fixed -mt-2 ml-2 max-lg:hidden" />
      {post.headings.length !== 0 && (
        <ul
          className="fixed bottom-14 ml-5 w-[180px] max-xl:hidden min-[1320px]:w-[210px]"
          aria-label="Table of Contents"
        >
          {post.headings.map((heading) => (
            <li key={heading.slug}>
              <a
                className="block cursor-default py-1 text-sm font-medium leading-5 text-muted hover:text-black dark:hover:text-foreground"
                href={`#${heading.slug}`}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      )}

      <article
        className={cn(
          "prose mx-auto max-w-screen-md dark:prose-invert",

          // NOTE because prose elements are now grid items, vertical margins will not collapse
          "grid grid-cols-[min(65ch,100%),1fr] [&>*]:col-span-full md:[&>*]:col-[1/auto]",
        )}
      >
        <Back className="not-prose mb-10 lg:hidden" />

        <header className="not-prose !col-span-full mb-12 space-y-2 [&+*]:mt-0">
          <section
            className="inline-flex flex-wrap gap-3 font-mono font-medium leading-none text-muted"
            aria-hidden="true"
          >
            <time dateTime={post.publishedAt} title="Published date">
              {formatDate(post.publishedAt, { fullMonth: true })}
            </time>
            <span className="no-js inline-block size-[3px] self-center rounded-full bg-muted-darker/60" />
            <Views className="no-js" slug={post.slug} increment />
          </section>
          <h1 className="font-heading text-[clamp(3rem,1rem+3.125vw,3.4rem)] leading-tight text-[hsl(var(--heading))]">
            {post.title}
          </h1>
        </header>

        {post.content}

        <div
          className="not-prose mx-auto inline-flex w-full flex-wrap items-center gap-2 font-mono text-sm font-semibold uppercase leading-none text-muted-darker"
          aria-hidden="true"
        >
          <a
            href="https://creativecommons.org/licenses/by-nc/4.0/"
            rel="noopener noreferrer"
            target="_blank"
            className="hover:underline"
            tabIndex={-1}
          >
            CC BY-NC-SA 4.0
          </a>
          <span>2023-present</span>
          <span className="inline-flex items-center gap-2">
            <span className="text-[170%] leading-none">©</span>
            <span>Tifan Dwi Avianto</span>
          </span>
        </div>

        <Giscus />
      </article>
    </main>
  )
}

function Back({
  className,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <Link
      className={cn(
        "-m-3 w-fit rounded-full p-3 text-muted-darker hover:bg-muted-darker/10 hover:text-foreground print:hidden",
        // NOTE margin class names from props will need to take into account the existing negative margins
        className,
      )}
      href="/"
      title="Back"
      {...props}
    >
      <Icon id="arrow-left" className="size-5" />
    </Link>
  )
}
