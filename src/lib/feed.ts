import fs from "node:fs/promises"
import { allPosts } from "contentlayer/generated"
import { Feed, type FeedOptions, type Item } from "feed"

import { siteConfig } from "@/config"
import { absoluteUrl } from "@/lib/utils"

const url = process.env.NEXT_PUBLIC_APP_URL as string

const options: FeedOptions = {
  title: siteConfig.name,
  description: "Recent content on Tifan's blog",
  id: url,
  link: url,
  language: "en",
  generator: "Feed for Node.js",
  favicon: absoluteUrl("/favicon.ico"),
  copyright: `All rights reserved ${new Date().getFullYear()}, Tifan Dwi Avianto`,
  feedLinks: {
    json: absoluteUrl("/feed.json"),
    atom: absoluteUrl("/feed.atom"),
    rss: absoluteUrl("/feed.xml"),
  },
  author: {
    name: siteConfig.author,
    link: url,
  },
}

const posts: Item[] = allPosts
  .filter((post) => !post.draft)
  .sort((a, b) => new Intl.Collator().compare(b.date, a.date))
  .map((post) => {
    return {
      title: post.title,
      description: post.description,
      id: post.url,
      link: absoluteUrl(post.url),
      author: [
        {
          name: siteConfig.author,
          link: url,
        },
      ],
      date: new Date(post.date),
    }
  })

export async function generateRSS() {
  const feed = new Feed(options)

  posts.forEach((post) => feed.addItem(post))

  const publicDir = await fs.stat("./public")

  if (!publicDir.isDirectory()) {
    await fs.mkdir("./public")
  }

  await fs.writeFile("./public/feed.xml", feed.rss2())
  await fs.writeFile("./public/feed.json", feed.json1())
  await fs.writeFile("./public/feed.atom", feed.atom1())

  console.log("RSS feed generated!")
}
