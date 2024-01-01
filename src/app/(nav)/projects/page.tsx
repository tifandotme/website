import type { Metadata } from "next"
import { allProjects } from "contentlayer/generated"

import { getStars } from "@/lib/github"
import { cn } from "@/lib/utils"
import { SortByButtons } from "@/components/client/sortby-buttons"
import { CldImage } from "@/components/cloudinary-image"
import { Icon } from "@/components/icon"

export const metadata: Metadata = {
  title: "Projects",
}

interface ProjectsPageProps {
  searchParams: { sort: string }
}

export default async function ProjectsPage({
  searchParams,
}: ProjectsPageProps) {
  const projectsTOC = [...allProjects].sort((a, b) =>
    Intl.Collator().compare(a.name, b.name),
  )

  const projects = await Promise.all(
    projectsTOC.map(async (project) => ({
      ...project,
      stars: (await getStars(project)) ?? 0,
    })),
  )

  if (searchParams.sort === "stars") {
    projects.sort((a, b) => b.stars - a.stars)
  } else {
    projects.sort((a, b) => Intl.Collator().compare(b.date, a.date))
  }

  return (
    <>
      <header className="container-md mb-14 lg:-mt-10">
        <h1 className="mb-5 font-heading text-[2rem] leading-7">Open-source</h1>
        <p className="text-lg leading-8">
          Whether it&apos;s a personal passion project or a practical solution
          to everyday problems, I see these open-source projects as creative
          vessels for exploring and learning new topics.
        </p>
      </header>

      <div className="bg-slate-700 pb-11 pt-10 text-white dark:bg-slate-400 dark:text-black">
        <nav className="container-md">
          <h2 className="mb-3.5 text-xl font-semibold">Table of Contents</h2>
          {projectsTOC.map((project) => (
            <a
              key={project.name}
              href={"#" + project.slug}
              className="block w-fit py-1 font-medium underline underline-offset-[3px]"
            >
              {project.name}
            </a>
          ))}
        </nav>
      </div>
      <div className="mb-20 flex justify-center gap-3 border-b-[1px] border-[hsl(0,0%,90%)] bg-[hsl(0,0%,97%)] dark:border-[hsl(0,0%,12%)] dark:bg-[hsl(0,0%,9%)]">
        <SortByButtons sortParam={searchParams.sort} />
      </div>

      <main className="container-lg">
        {projects.map((project) => {
          const date = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
          }).format(new Date(project.date))

          return (
            <section
              className="mb-20 flex flex-col gap-10 last:mb-0 lg:flex-row"
              key={project.name}
            >
              <div className={cn(project.image && "basis-8/12")}>
                <div className="mb-2 flex items-center gap-3">
                  <h3 className="text-xl font-semibold" id={project.slug}>
                    {project.name}
                  </h3>
                  <time dateTime={project.date} className="mt-0.5 text-muted">
                    {date}
                  </time>
                </div>

                <div className="flex flex-wrap items-center gap-1 text-sm text-muted">
                  <a
                    rel="noopener noreferrer"
                    target="_blank"
                    href={project.repo + "/stargazers"}
                    aria-label={`${project.stars} stars on GitHub`}
                  >
                    <span
                      className="inline-flex select-none items-center gap-1 rounded-full bg-[hsl(0,0%,90%)] px-2.5 py-0.5 hover:bg-[hsl(0,0%,85%)] dark:bg-[hsl(0,0%,12%)] dark:hover:bg-[hsl(0,0%,16%)]"
                      aria-hidden
                    >
                      <Icon id="star" className="h-3.5 w-3.5" />
                      {project.stars}
                    </span>
                  </a>
                  {project.tags.map((tag) => (
                    <span
                      className="inline-flex items-center gap-1 rounded-full bg-[hsl(0,0%,90%)] px-2.5 py-0.5 dark:bg-[hsl(0,0%,12%)]"
                      key={tag}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="my-6">{project.description}</p>

                <div className="flex gap-4">
                  <a
                    className="inline-flex items-center gap-1 font-medium underline underline-offset-[3px]"
                    href={project.repo}
                    rel="noopener noreferrer"
                    target="_blank"
                    aria-label="GitHub repository"
                  >
                    GitHub&nbsp;&nbsp;&nbsp;&nbsp;
                    <Icon
                      id="arrow-up-right"
                      className="-ml-4 mt-[1px] h-3.5 w-3.5 stroke-[2.5px]"
                    />
                  </a>
                  {project.demo && (
                    <a
                      className="inline-flex items-center gap-1 font-medium underline underline-offset-[3px]"
                      href={project.demo}
                      rel="noopener noreferrer"
                      target="_blank"
                      aria-label="Demo"
                    >
                      Demo&nbsp;&nbsp;&nbsp;&nbsp;
                      <Icon
                        id="arrow-up-right"
                        className="-ml-4 mt-[1px] h-3.5 w-3.5 stroke-[2.5px]"
                      />
                    </a>
                  )}
                </div>
              </div>

              {project.image && (
                <CldImage
                  className="w-[500px] basis-4/12 self-center rounded-2xl border lg:w-full"
                  src={project.image} // NOTE make sure the image is 16:10
                  alt={project.name}
                  width={1000}
                  aspectRatio="16:10"
                  sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 32vw, 25vw"
                />
              )}
            </section>
          )
        })}
      </main>
    </>
  )
}
