import { Icon } from "../_components/icon"
import { getAllPosts } from "../_lib/blog"
import { Posts } from "./posts"

export default async function HomePage() {
  const externalLinks = [
    { href: "https://www.linkedin.com/in/tifandotme", label: "LinkedIn" },
    { href: "https://github.com/tifandotme", label: "GitHub" },
    { href: "https://twitter.com/tifandotme", label: "Twitter" },
  ] as const

  const posts = await getAllPosts()

  return (
    <>
      <article className="container-md mb-20 space-y-5 text-[105%]">
        <h1 className="font-heading text-4xl font-medium tracking-wider">
          Tifan Dwi Avianto
        </h1>
        <p>
          My ambition is to create <em>efficient</em> and <em>elegant</em>{" "}
          software solutions that can make a meaningful and positive impact on
          people&apos;s lives.
        </p>
        <p>
          Outside of programming, I&apos;m also passionate about{" "}
          <em>science fiction</em> and <em>philosophy</em>.
        </p>
        <ul className="flex flex-wrap gap-3" aria-label="External links">
          {externalLinks.map((link) => (
            <li key={link.href}>
              <a
                className="-my-1.5 inline-flex min-w-9 items-center gap-px py-1.5 text-muted hover:underline hover:underline-offset-1"
                href={link.href}
                rel="noopener noreferrer"
                target="_blank"
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
