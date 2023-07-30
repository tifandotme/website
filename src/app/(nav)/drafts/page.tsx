import { type Metadata } from "next"

import { PostList } from "@/components/post-list"

export const metadata: Metadata = {
  title: "Drafts",
  robots: "noindex",
}

export default function DraftsPage() {
  return (
    <main className="container-md">
      <PostList showDrafts />
    </main>
  )
}
