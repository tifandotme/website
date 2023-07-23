import { type Metadata } from "next"

import { PostList } from "@/components/post-list"

export const metadata: Metadata = {
  title: "Blog",
}

export default function BlogPage() {
  // TODO: add search bar, tags?
  return (
    <main className="container-main">
      <PostList />
    </main>
  )
}
