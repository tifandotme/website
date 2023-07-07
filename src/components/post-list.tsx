import Link from "next/link";
import { allPosts } from "contentlayer/generated";

export function PostList() {
  const posts = allPosts.sort((a, b) =>
    new Intl.Collator().compare(b.date, a.date)
  );

  return (
    <article className="mx-auto flex max-w-screen-sm flex-col">
      {posts.map((post) => {
        const postYear = new Date(post.date).getFullYear();
        const currentYear = new Date().getFullYear();

        let options: Intl.DateTimeFormatOptions;

        if (postYear < currentYear || postYear > currentYear) {
          options = { dateStyle: "medium" };
        } else {
          options = { month: "short", day: "numeric" };
        }

        const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
          new Date(post.date)
        );

        return (
          <Link
            key={post.url}
            href={post.url}
            className="mb-6 inline-flex flex-col items-start gap-0.5 rounded-lg border border-gray-300 p-5 transition hover:bg-gray-50 active:scale-[.98]"
          >
            <h3 className="line-clamp-3 text-xl font-medium leading-8 text-gray-700">
              {post.title}
            </h3>
            <time
              dateTime={post.date}
              className="whitespace-nowrap font-medium text-gray-400"
            >
              {formattedDate}
            </time>
          </Link>
        );
      })}
    </article>
  );
}
