import { type Metadata } from "next"
import { allProjects } from "contentlayer/generated"
import { LuArrowUpRight, LuExternalLink } from "react-icons/lu"
import { PiStarBold } from "react-icons/pi"

import { cn } from "@/lib/utils"
import { CldImage } from "@/components/cloudinary-image"
import { SortByButtons } from "@/components/sortby-buttons"

export const metadata: Metadata = {
  title: "Projects",
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: { sort: string }
}) {
  const projects = await Promise.all(
    allProjects.map(async (project) => {
      const res = await fetch(
        "https://api.github.com/repos/" +
          project.repo.split("/").slice(-2).join("/"),
      )

      const { stargazers_count } = (await res.json()) as {
        stargazers_count: number
      }

      const stars = res.ok ? stargazers_count : 0

      return {
        ...project,
        stars,
      }
    }),
  ).then((projects) =>
    projects.sort((a, b) => {
      if (searchParams.sort === "stars") {
        return b.stars - a.stars
      } else {
        return new Intl.Collator().compare(b.date, a.date)
      }
    }),
  )

  const projectsTOC = allProjects.sort((a, b) =>
    new Intl.Collator().compare(a.name, b.name),
  )

  return (
    <>
      <header className="container-md mb-14 lg:-mt-10">
        <h1 className="mb-5 font-heading text-4xl">Open-source</h1>
        <p className="text-lg leading-8">
          Whether it&apos;s a personal passion project or a practical solution
          to everyday problems, I see these open-source projects as creative
          vessels for exploring and learning new topics.
        </p>
      </header>

      <div className="bg-slate-700 pb-11 pt-10 text-white dark:bg-slate-400 dark:text-black">
        <nav className="container-md">
          <h2 className="mb-3.5 text-xl font-semibold">Table of Contents</h2>
          <ul className="flex flex-col space-y-0.5">
            {projectsTOC.map((project) => (
              <li key={project.name}>
                <a
                  href={"#" + project.slug}
                  className="font-medium underline underline-offset-[3px]"
                >
                  {project.name}
                </a>
              </li>
            ))}
          </ul>
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
                  {project.isWIP ? (
                    <span className="mt-0.5 animate-pulse text-muted">
                      Ongoing
                    </span>
                  ) : (
                    <time dateTime={project.date} className="mt-0.5 text-muted">
                      {date}
                    </time>
                  )}
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
                      <PiStarBold size={13} />
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
                    <LuArrowUpRight
                      className="-ml-4 mt-[1px] stroke-[2.5px]"
                      size={15}
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
                      <LuArrowUpRight
                        className="-ml-4 mt-[1px] stroke-[2.5px]"
                        size={15}
                      />
                    </a>
                  )}
                </div>
              </div>

              {project.image && (
                <a
                  href={project.demo}
                  className="group relative basis-4/12 select-none self-center"
                  target="_blank"
                >
                  <CldImage
                    // NOTE: make sure the image is 16:10
                    className={cn(
                      "w-[500px] rounded-2xl border lg:w-full",

                      project.demo && "group-hover:brightness-75",
                    )}
                    src={project.image}
                    alt={project.name}
                    width={1000}
                    sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 32vw, 25vw"
                  />
                  <span
                    className={cn(
                      "absolute inset-0 hidden items-center justify-center text-2xl font-semibold text-white",

                      project.demo && "group-hover:inline-flex",
                    )}
                  >
                    View Demo
                    <LuExternalLink className="ml-2 stroke-[3px]" size={22} />
                  </span>
                </a>
              )}
            </section>
          )
        })}
      </main>
    </>
  )
}
