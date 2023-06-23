"use client";

import { allPosts, type Post } from "contentlayer/generated";
import { compareDesc, format, parseISO } from "date-fns";
import Link from "next/link";

function PostCard(post: Post) {
  return (
    <Link href={post.slug}>
      <div className="mb-5 rounded-2xl border bg-gray-100 p-5 hover:bg-gray-200">
        <h3 className="text-xl font-semibold">{post.title}</h3>
        <time dateTime={post.date}>
          {format(parseISO(post.date), "LLLL d, yyyy")}
        </time>
        <p>{post.description}</p>
      </div>
    </Link>
  );
}

export default function Home() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  console.log(posts);

  return (
    <>
      <div className="mt-16">
        {posts.map((post, idx) => (
          <PostCard key={idx} {...post} />
        ))}
      </div>
    </>
  );
}
