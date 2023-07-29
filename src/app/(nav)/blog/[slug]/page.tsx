import { type Metadata } from "next"
import { notFound } from "next/navigation"
import cn from "clsx"
import { allPosts } from "contentlayer/generated"
import { useMDXComponent } from "next-contentlayer/hooks"

import { type HeadingsField } from "@/types"
import { getPost } from "@/lib/utils"
import { BackToTopButton } from "@/components/back-to-top"
import { components } from "@/components/mdx-components"

export async function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = getPost(params.slug)

  return {
    title: post?.title,
    description: post?.description,
    robots: post?.draft ? "noindex" : undefined,
  }
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)

  if (!post) notFound()

  const date = new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
    new Date(post.date),
  )

  const MDXContent = useMDXComponent(post.body.code)

  // warning: when main have a tailwindcss-animate class, it will concflict with aside
  return (
    <main className="container px-3 sm:px-5">
      <aside
        className={cn(
          "fixed bottom-14 hidden select-none flex-col gap-2.5 pl-11 xl:flex",

          "duration-500 animate-in slide-in-from-left-1/2",
        )}
      >
        <p className="font-mono text-sm font-bold uppercase text-muted-darker">
          On this page
        </p>
        {(post.headings as HeadingsField).map((heading) => (
          <a
            key={heading.slug}
            href={`#${heading.slug}`}
            className="block text-sm font-medium text-muted transition hover:text-foreground active:translate-y-0.5"
          >
            {heading.text}
          </a>
        ))}
        <hr className="my-3" />
        <BackToTopButton path={post.url} />
      </aside>

      {/* adjust 63 ch if font is changed from inter to something else */}
      <article
        className={cn(
          "prose mx-auto !max-w-screen-md dark:prose-invert lg:-mt-24",

          // H2
          "prose-h2:before:mb-4 prose-h2:before:block prose-h2:before:h-[3px] prose-h2:before:w-[1.5rem] prose-h2:before:bg-foreground prose-h2:before:content-['']",
          "prose-h2:mt-[1.7em] prose-h2:font-heading prose-h2:text-3xl",

          // H3
          "prose-h3:mt-[1.3em] prose-h3:text-2xl prose-h3:font-medium",

          "grid grid-cols-[min(63ch,100%),1fr] [&>*]:col-span-full md:[&>*]:col-[1/auto]",
        )}
      >
        <header
          className={cn(
            "not-prose !col-span-full",

            "grid grid-cols-[min(63ch,100%),1fr] [&>*]:col-span-full md:[&>*]:col-[1/auto]",
          )}
        >
          <div className="inline-flex gap-3 font-mono font-medium leading-loose">
            <time dateTime={post.date} className="text-muted">
              {date}
            </time>
            {post.draft && (
              <div
                className="select-none bg-yellow-200 px-2 align-middle dark:bg-yellow-800"
                title="This post is excluded from search engine and list of posts"
                aria-hidden
              >
                Draft
              </div>
            )}
          </div>
          <h1 className="!col-span-full mb-3 mt-5 max-w-screen-md font-heading text-[clamp(2.7rem,1rem+3.125vw,3.2rem)] leading-none tracking-[-0.04em] text-[var(--heading)]">
            {post.title}
          </h1>
          {post.description && <p className="text-muted">{post.description}</p>}
        </header>

        <hr className="my-7 border-border" />

        <MDXContent components={components} />
      </article>
      <div className="mx-auto mt-14 flex !max-w-screen-md items-center font-mono font-semibold uppercase text-muted-darker">
        <span className="relative top-[2px] mr-2 select-none text-[26px] leading-none">
          {" © "}
        </span>
        CC BY-NC-SA 4.0 2023-PRESENT
      </div>
    </main>
  )
}
