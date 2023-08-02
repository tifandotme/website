import { type Metadata } from "next"

import { PostList } from "@/components/post-list"

export const metadata: Metadata = {
  title: "Blog",
}

export default function BlogPage() {
  // TODO: add search bar, tags?
  return (
    <>
      <header className="container-md mb-14 lg:-mt-10">
        <h1 className="mb-5 font-heading text-4xl">Writings</h1>
        <p className="text-lg leading-8">
          These writings reflect my genuine interest in sharing ideas with
          others, as well as my dedication to learning and growing as a
          developer. I hope you find them useful!
        </p>
      </header>

      <main className="container-md">
        <PostList />
      </main>
    </>
  )
}
