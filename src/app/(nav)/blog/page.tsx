import { type Metadata } from "next";

import { MainContainer } from "@/components/main-container";
import { PostList } from "@/components/post-list";

export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogPage() {
  return (
    <MainContainer>
      <PostList />
    </MainContainer>
  );
}
