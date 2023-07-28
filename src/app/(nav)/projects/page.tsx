import { type Metadata } from "next"
import cn from "clsx"
import { allProjects } from "contentlayer/generated"
import { LuArrowUpRight, LuExternalLink } from "react-icons/lu"
import { PiStarBold } from "react-icons/pi"

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

  const projectsTOC = allProjects
    .sort((a, b) => new Intl.Collator().compare(a.name, b.name))
    .map((project) => ({
      name: project.name,
    }))

  return (
    <>
      <header className="container-main">
        <h1 className="mb-5 font-serif text-4xl font-medium">
          Open-source Projects
        </h1>
        <p className="text-lg leading-8">
          Here is a list of my open-source projects. I hope you find them
          useful! If you have any questions or feedback, feel free to reach out
          to me on Twitter.
        </p>
      </header>

      <div className="mt-14 bg-slate-700 pb-11 pt-10 text-white dark:bg-slate-400 dark:text-black">
        <nav className="container-main">
          <h2 className="mb-3.5 text-xl font-semibold">Table of Contents</h2>
          <ul>
            {projectsTOC.map((project) => (
              <li key={project.name} className="py-0.5 first:pt-0 last:pb-0">
                <a
                  href={"#" + project.name}
                  className="font-medium underline underline-offset-[3px]"
                >
                  {project.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="mb-24 flex justify-center gap-3 border-b-[1px] border-[hsl(0,0%,90%)] bg-[hsl(0,0%,97%)] py-1 dark:border-[hsl(0,0%,12%)] dark:bg-[hsl(0,0%,9%)]">
        <SortByButtons sortParam={searchParams.sort} />
      </div>

      {projects.map((project) => {
        const date = new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "long",
        }).format(new Date(project.date))

        return (
          <div
            className="mx-auto mb-20 flex max-w-screen-lg flex-col gap-10 px-3 sm:px-5 lg:flex-row"
            key={project.name}
          >
            <article className={cn(project.image && "basis-8/12")}>
              <div className="mb-2 flex items-center gap-3">
                <h3 className="text-2xl font-bold" id={project.name}>
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

              <div className="flex items-center gap-1 text-sm text-muted">
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href={project.repo + "/stargazers"}
                >
                  <span className="inline-flex select-none items-center gap-1 rounded-full bg-[hsl(0,0%,90%)] px-2.5 py-0.5 hover:bg-[hsl(0,0%,85%)] dark:bg-[hsl(0,0%,12%)] dark:hover:bg-[hsl(0,0%,16%)]">
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
                  >
                    Demo&nbsp;&nbsp;&nbsp;&nbsp;
                    <LuArrowUpRight
                      className="-ml-4 mt-[1px] stroke-[2.5px]"
                      size={15}
                    />
                  </a>
                )}
              </div>
            </article>

            {project.image && (
              <a
                href={project.demo}
                className="group relative basis-4/12 select-none self-center"
                target="_blank"
              >
                <CldImage
                  className="rounded-2xl border group-hover:brightness-50"
                  src={project.image}
                  width={500}
                  alt={project.name}
                />
                <span className="absolute inset-0 hidden items-center justify-center text-2xl font-semibold text-white group-hover:inline-flex">
                  View Demo
                  <LuExternalLink className="ml-2 stroke-[3px]" size={22} />
                </span>
              </a>
            )}
          </div>
        )
      })}
    </>
  )
}
