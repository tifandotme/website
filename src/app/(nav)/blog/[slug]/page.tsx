import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { notFound } from "next/navigation"
import { allPosts } from "contentlayer/generated"

import type { HeadingsField } from "@/types"
import { siteConfig } from "@/config"
import { getLastModified } from "@/lib/github"
import { absoluteUrl, cn, isProd } from "@/lib/utils"
import { BackToTopButton } from "@/components/client/back-to-top"
import { HeadingLink } from "@/components/client/heading-link"
import { LoadingDots } from "@/components/loading-dots"
import { MDXContent } from "@/components/mdx"
import { Giscus } from "@/app/(nav)/blog/[slug]/giscus"

import "@/styles/mdx.css"

const Views = dynamic(() => import("@/components/client/views"), {
  ssr: false,
  loading: () => <LoadingDots />,
})

export const dynamicParams = false

export async function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = allPosts.find((post) => post.slug === params.slug)

  if (!post) notFound()

  const { title, description, url } = post

  return {
    title,
    description,
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL as string),
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: "en_US",
      // alternateLocale: ["id_ID"],
      type: "article",
      publishedTime: post.date,
      modifiedTime:
        isProd() && !post.draft
          ? (await getLastModified(post)) ?? undefined
          : undefined,
      authors: [siteConfig.author],
    },
    robots: post.draft ? "noindex" : undefined,
    other: {
      "giscus:backlink": absoluteUrl(post.url),
    },
  }
}

interface PostPageProps {
  params: { slug: string }
}

export default function PostPage({ params }: PostPageProps) {
  const post = allPosts.find((post) => post.slug === params.slug)

  if (!post) notFound()

  const date = new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
    new Date(post.date),
  )

  // WARN if <main> tag contain tailwind-animate class, it will conflict with the one inside <aside> tag
  return (
    <main className="container px-3 sm:px-5">
      <aside className="fixed bottom-14 ml-4 hidden w-[160px] select-none flex-col gap-2.5 text-sm min-[1217px]:flex min-[1300px]:ml-10 min-[1340px]:w-[210px]">
        {post.headings.length !== 0 && (
          <>
            <p className="font-mono text-sm font-bold uppercase text-muted-darker">
              On this page
            </p>
            <ul className="flex flex-col gap-2.5">
              {(post.headings as HeadingsField).map((heading) => (
                <HeadingLink
                  key={heading.slug}
                  heading={heading}
                  className="inline-block cursor-pointer py-[0.12rem] text-left font-medium leading-4 text-muted transition first:pt-0 last:pb-0 hover:text-foreground active:translate-y-0.5"
                />
              ))}
            </ul>
            <hr className="my-3 w-[130px]" />
          </>
        )}
        <BackToTopButton />
      </aside>

      {/* adjust "65ch" occurences if font is changed from inter to something else */}
      <article
        className={cn(
          "prose mx-auto !max-w-screen-md leading-7 dark:prose-invert md:text-[1.05rem] lg:-mt-24",

          // NOTE because prose elements are now grid items, vertical margins will not collapse
          "grid grid-cols-[min(65ch,100%),1fr] [&>*]:col-span-full md:[&>*]:col-[1/auto]",
        )}
      >
        <header
          className={cn(
            "not-prose !col-span-full mb-14 [&+*]:mt-0",

            "grid grid-cols-[min(65ch,100%),1fr] [&>*]:col-span-full md:[&>*]:col-[1/auto]",
          )}
        >
          <div className="inline-flex flex-wrap gap-3 font-mono font-medium leading-loose text-muted">
            <time dateTime={post.date}>{date}</time>
            <span
              className="no-js select-none text-[0.7rem] leading-8 text-muted-darker"
              aria-hidden
            >
              &bull;
            </span>
            {!post.draft ? (
              <span className="no-js">
                <Views slug={post.slug} /> views
              </span>
            ) : (
              <div
                className="select-none bg-yellow-200 px-2 align-middle dark:bg-yellow-800/20"
                aria-hidden
              >
                Draft
              </div>
            )}
          </div>
          <h1 className="!col-span-full mb-3 mt-4 max-w-screen-md font-heading text-[clamp(3rem,1rem+3.125vw,3.4rem)] leading-tight text-[hsl(var(--heading))]">
            {post.title}
          </h1>
          {post.description && (
            <p className="text-lg text-muted">{post.description}</p>
          )}
        </header>

        <MDXContent code={post.body.code} />

        <div className="not-prose mx-auto mt-14 inline-flex w-full !max-w-screen-md items-center font-mono text-sm font-semibold uppercase text-muted-darker">
          <a
            href="https://creativecommons.org/licenses/by-nc/4.0/"
            rel="noopener noreferrer"
            target="_blank"
            className="hover:underline"
          >
            CC BY-NC-SA 4.0
          </a>
          <span>&nbsp;2023</span>
          <span className="relative top-[2px] mx-2 text-[170%] leading-none">
            ©
          </span>
          <span>Tifan Dwi Avianto</span>
        </div>

        {!post.draft && <Giscus />}
      </article>
    </main>
  )
}
