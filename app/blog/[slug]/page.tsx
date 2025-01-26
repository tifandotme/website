import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Icon } from "../../_components/icon"
import { Views } from "../../_components/views"
import { getAllPosts, getPostBySlug } from "../../_lib/blog"
import { cn, formatDate } from "../../_lib/utils"
import { Giscus } from "./giscus"
import "./post.css"
import { TableOfContents } from "./toc"

export const dynamic = "force-static"

export async function generateStaticParams() {
  return getAllPosts().then((posts) =>
    posts.map((post) => ({ slug: post.slug })),
  )
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const params = await props.params
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

export default async function PostPage(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
  const post = await getPostBySlug(params.slug)
  if (!post) notFound()

  return (
    <>
      <aside
        className={cn(
          "fixed bottom-4 z-10 mx-auto flex size-14 max-w-screen-md select-none items-center justify-center gap-4 rounded-full border bg-background shadow-xl brightness-110 xl:hidden dark:shadow-black/40",

          post.headings.length !== 0 ? "inset-x-0 w-fit px-3" : "right-4",
        )}
      >
        <Back className="p-3" />

        {post.headings.length !== 0 && (
          <>
            <hr className="no-js h-6 border-r" />

            <TableOfContents headings={post.headings} />
          </>
        )}
      </aside>

      <main
        className="relative mx-auto max-w-screen-2xl px-[--post-padding] pb-24 pt-16 [--post-padding:1rem] sm:[--post-padding:1.5rem]"
        vaul-drawer-wrapper=""
      >
        <Back className="fixed translate-x-1 p-3 max-xl:hidden" />

        {post.headings.length !== 0 && (
          <ul
            className="fixed bottom-14 ml-5 w-[180px] max-xl:hidden min-[1320px]:w-[210px]"
            aria-label="Table of Contents"
          >
            {post.headings.map((heading) => (
              <li key={heading.slug}>
                <a
                  className="-mx-3 flex h-9 cursor-default items-center px-3 text-sm font-medium text-muted hover:bg-muted-darker/10 hover:text-black dark:hover:text-foreground"
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
          <header className="not-prose !col-span-full mb-12 space-y-2 [&+*]:mt-0">
            <section
              className="inline-flex flex-wrap gap-3 font-mono font-medium leading-none text-muted"
              aria-hidden="true"
            >
              <time dateTime={post.publishedAt} title="Published date">
                {formatDate(post.publishedAt, { fullMonth: true })}
              </time>
              <span className="no-js inline-block size-[3px] self-center rounded-full bg-muted-darker/60" />
              <Views
                className="no-js"
                slug={post.slug}
                increment={process.env.NODE_ENV === "production"}
              />
            </section>
            <h1 className="font-heading text-[clamp(3rem,1rem+3.125vw,3.4rem)] leading-tight text-[hsl(var(--heading))]">
              {post.title}
            </h1>
          </header>

          {post.content}

          <div
            className="not-prose mx-auto inline-flex w-full flex-wrap items-center gap-3 font-mono text-sm font-semibold uppercase leading-none text-muted-darker"
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
            <span className="text-[170%]">©</span>
            <span>Tifan Dwi Avianto</span>
          </div>

          <Giscus />
        </article>
      </main>
    </>
  )
}

function Back({
  className,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <Link
      className={cn("text-muted hover:text-foreground print:hidden", className)}
      href="/"
      title="Homepage"
      draggable="false"
      {...props}
    >
      <Icon id="home" className="size-5 stroke-[1.5px]" />
    </Link>
  )
}
