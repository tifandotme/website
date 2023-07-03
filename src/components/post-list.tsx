import Link from "next/link";
import { allPosts } from "contentlayer/generated";
import dayjs from "dayjs";

export function PostList() {
  const posts = allPosts.sort((a, b) =>
    new Intl.Collator().compare(b.date, a.date)
  );

  return (
    <article className="flex flex-col">
      {posts.map((post) => {
        const isBeforeCurrentYear = dayjs(post.date).isBefore(
          dayjs().startOf("year"),
          "year"
        );

        const formattedDate = dayjs(post.date).format(
          `MMM D${isBeforeCurrentYear ? ", YYYY" : ""}`
        );

        return (
          <Link
            key={post.url}
            href={post.url}
            className="mb-6 inline-flex items-center justify-between gap-10 rounded-md border px-5 py-4 text-lg hover:bg-gray-100"
          >
            <h3 className="line-clamp-3 font-medium leading-8 text-gray-700">
              {post.title}
            </h3>
            <time
              dateTime={post.date}
              className="whitespace-nowrap text-base text-gray-400"
            >
              {formattedDate}
            </time>
          </Link>
        );
      })}
    </article>
  );
}
