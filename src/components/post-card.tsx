import Link from "next/link";
import { type Post } from "contentlayer/generated";
import { format, parseISO } from "date-fns";

export function PostCard(post: Post) {
  return (
    <Link href={post.url}>
      <div className="mb-5 rounded-2xl border bg-gray-100 p-5 hover:bg-gray-200">
        <h3 className="text-xl font-semibold">{post.title}</h3>
        <time dateTime={post.date}>
          {format(parseISO(post.date), "LLLL d, yyyy")}
        </time>
        <p>{post.description}</p>
        {post.url} <br /> {post.slug}
      </div>
    </Link>
  );
}
