import { type Metadata } from "next"
import Image, { ImageProps } from "next/image"
import { notFound } from "next/navigation"
import { allPosts } from "contentlayer/generated"
import { MDXComponents } from "mdx/types"
import { useMDXComponent } from "next-contentlayer/hooks"

import { getPost } from "@/lib/utils"

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
  }
}

const components: MDXComponents = {
  Image: ({ alt, props }: { alt: string; props: ImageProps }) => (
    <Image {...props} alt={alt} />
  ),
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)

  if (!post) notFound()

  const date = new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
    new Date(post.date),
  )

  const Content = useMDXComponent(post.body.code, {
    components,
  })

  return (
    <article className="prose mx-auto max-w-screen-md border xl:-mt-24">
      <header className="not-prose">
        <p>{date}</p>
        <h1 className="text-3xl font-bold">{post.title}</h1>
      </header>
      <Content components={components} />
    </article>
  )
}
