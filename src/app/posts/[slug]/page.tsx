// import { allPosts } from "contentlayer/generated";
// import { type Metadata } from "next";

// async function getPageFromSlug(slug: string) {
//   return allPosts.find((post) => post.slugAsParams === slug);
// }

// export async function generateStaticParams() {
//   return allPosts.map((post) => ({ slug: post._raw.flattenedPath }));
// }

// export async function generateMetadata({
//   params,
// }: {
//   params: { slug: string };
// }): Promise<Metadata> {
//   const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
//   return { title: post.title };
// }

// export default function Post() {
//   return <h1>About page</h1>;
// }
