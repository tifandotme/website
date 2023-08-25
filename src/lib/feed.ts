import fs from "node:fs"
import { allPosts } from "contentlayer/generated"
import { Feed, type FeedOptions, type Item } from "feed"

import { site } from "@/config"

const options: FeedOptions = {
  title: site.name,
  description: "Recent content on Tifan's blog",
  id: site.baseUrl,
  link: site.baseUrl,
  language: "en",
  generator: "Feed for Node.js",
  favicon: `${site.baseUrl}/favicon.ico`,
  copyright: `All rights reserved ${new Date().getFullYear()}, Tifan Dwi Avianto`,
  feedLinks: {
    json: `${site.baseUrl}/feed.json`,
    atom: `${site.baseUrl}/feed.atom`,
    rss: `${site.baseUrl}/feed.xml`,
  },
  author: {
    name: site.author,
    link: site.baseUrl,
  },
}

const posts = allPosts
  .filter((post) => !post.draft)
  .sort((a, b) => new Intl.Collator().compare(b.date, a.date))
  .map((post) => {
    return {
      title: post.title,
      description: post.description,
      id: post.url,
      link: `${site.baseUrl}${post.url}`,
      author: [
        {
          name: site.author,
          link: site.baseUrl,
        },
      ],
      date: new Date(post.date),
    } satisfies Item
  })

export function generateRSS() {
  console.log("Generating RSS feed...")

  const feed = new Feed(options)

  posts.forEach((post) => feed.addItem(post))

  fs.existsSync("./public") || fs.mkdirSync("./public")

  fs.writeFileSync("./public/feed.xml", feed.rss2())
  fs.writeFileSync("./public/feed.json", feed.json1())
  fs.writeFileSync("./public/feed.atom", feed.atom1())
}
