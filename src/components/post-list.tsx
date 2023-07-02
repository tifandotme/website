import Link from "next/link";
import { allPosts } from "contentlayer/generated";

export function PostList() {
  const posts = allPosts.sort((a, b) =>
    new Intl.Collator().compare(b.date, a.date)
  );

  return (
    <article className="flex flex-col">
      {posts.map((post) => (
        <Link key={post.url} href={post.url}>
          <div className="mb-5 rounded-md border p-5">
            <time dateTime={post.date}>s</time>
            <h3 className="text-xl font-semibold">{post.title}</h3>
          </div>
        </Link>
      ))}
    </article>
  );
}
