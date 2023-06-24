import { allPosts } from "contentlayer/generated";
import { type Metadata } from "next";
import { getMDXComponent } from "next-contentlayer/hooks";

export async function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);

  if (!post) throw new Error(`Failed to find post with slug: ${params.slug}`);

  return { title: post.title };
}

export default function Post({ params }: { params: { slug: string } }) {
  const post = allPosts.find((post) => post.slug === params.slug);

  if (!post) {
    return;
  }

  const Content = getMDXComponent(post.body.code);

  return (
    <article>
      <h1>{post.title}</h1>
      <Content />
    </article>
  );
}
