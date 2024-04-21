import { Icon } from "../_components/icon"
import { getAllPosts } from "../_lib/blog"
import { Posts } from "./posts"

export default async function HomePage() {
  const externalLinks = [
    { href: "https://tifan.me/li", label: "LinkedIn" },
    { href: "https://tifan.me/gh", label: "GitHub" },
    { href: "https://tifan.me/x", label: "Twitter" },
  ] as const

  const posts = await getAllPosts()

  return (
    <>
      <article className="container-md mb-20 space-y-5 text-[105%]">
        <h1 className="font-heading text-4xl font-medium tracking-wider">
          Tifan Dwi Avianto
        </h1>
        <p>
          I love building <em>polished</em> user interfaces and <em>elegant</em>{" "}
          software systems. In pursuit of my goal to empower people with
          meaningful digital experiences, I document my insights and learnings
          along the way.
        </p>
        <ul className="flex flex-wrap gap-3" aria-label="External links">
          {externalLinks.map((link) => (
            <li key={link.href}>
              <a
                className="-my-1.5 inline-flex min-w-9 items-center gap-px py-1.5 text-muted hover:underline hover:underline-offset-1"
                href={link.href}
                rel="noopener noreferrer"
                target="_blank"
                data-umami-event={`${link.label} link`}
              >
                {link.label}
                <Icon id="external" className="size-4 text-muted-darker/80" />
              </a>
            </li>
          ))}
        </ul>
      </article>

      <Posts posts={posts} />
    </>
  )
}
