import { allPosts } from "contentlayer/generated";

import { PostCard } from "@/components/post-card";

export default function HomePage() {
  const posts = allPosts.sort((a, b) =>
    new Intl.Collator().compare(b.date, a.date)
  );

  return (
    <main className="mx-auto mt-20 max-w-3xl p-5 text-lg">
      <header className="flex flex-col items-start">
        <p className="mb-4">
          Welcome to my <em>online hideout</em> where I share my insights on all
          things web development.
        </p>
        <p className="text-lg">
          Find me on: <a href="https://twitter.com/tifandotme">Twitter</a> or{" "}
          <a href="https://github.com/tifandotme/">GitHub</a>
        </p>
      </header>
      <div className="mt-16">
        {posts.map((post, idx) => (
          <PostCard key={idx} {...post} />
        ))}
      </div>
    </main>
  );
}
