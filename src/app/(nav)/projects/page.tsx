import { type Metadata } from "next";

import { MainContainer } from "@/components/main-container";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <MainContainer>
      <p>Projects page</p>
    </MainContainer>
  );
}
