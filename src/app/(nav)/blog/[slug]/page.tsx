import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";
import { getMDXComponent } from "next-contentlayer/hooks";

import { getPost } from "@/lib/utils";

//#region Static Generation
export async function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getPost(params.slug);

  return {
    title: post?.title,
    description: post?.description,
  };
}
//#endregion

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);

  if (!post) notFound();

  const Content = getMDXComponent(post.body.code);

  return (
    <article>
      <h1>{post.title}</h1>
      <Content />
    </article>
  );
}
