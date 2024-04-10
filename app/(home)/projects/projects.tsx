"use client"

import type { Metadata } from "next"
import Image from "next/image"
import React from "react"
import { Icon } from "../../_components/icon"
import { cn, formatDate, slugify } from "../../_lib/utils"
import projects from "./data"
import { fetchStargazersCount } from "./github"

export const metadata: Metadata = {
  title: "Projects",
  description: "A collection of projects I've worked on.",
}

export function Projects() {
  const [data, setData] = React.useState(projects)
  const [isPending, setIsPending] = React.useState(true)
  const [sortBy, setSortBy] = React.useState<"date" | "stars">("date")

  React.useEffect(() => {
    if (isPending) return
    setData((data) =>
      data.toSorted((a, b) => {
        if (sortBy === "stars") return b.stars - a.stars
        return Intl.Collator().compare(b.lastUpdated, a.lastUpdated)
      }),
    )
  }, [isPending, sortBy])

  React.useEffect(() => {
    const fetch = async () => {
      setData(
        await Promise.all(
          projects.map(async (project) => {
            const stars = await fetchStargazersCount(project.repoUrl)
            return { ...project, stars }
          }),
        ),
      )
      setIsPending(false)
    }
    fetch()
  }, [])

  return (
    <>
      <section
        className="mb-10 flex justify-center gap-3 border-b border-[hsl(0,0%,90%)] bg-[hsl(0,0%,97%)] lg:mb-20 dark:border-[hsl(0,0%,12%)] dark:bg-[hsl(240,5%,11%)]"
        role="menu"
      >
        <button
          className="my-1 inline-flex cursor-default items-center gap-2 p-3 text-muted-darker hover:text-foreground data-[active=true]:text-foreground"
          type="button"
          onClick={() => {
            sortBy === "stars" && setSortBy("date")
          }}
          title="Sort by date"
          disabled={isPending}
          data-active={sortBy === "date"}
          role="menuitem"
        >
          <Icon id="calendar" className="size-4" />
          by Date
        </button>
        <button
          className="my-1 inline-flex cursor-default items-center gap-2 p-3 text-muted-darker hover:text-foreground data-[active=true]:text-foreground"
          type="button"
          onClick={() => {
            sortBy === "date" && setSortBy("stars")
          }}
          title="Sort by stars"
          disabled={isPending}
          data-active={sortBy === "stars"}
          role="menuitem"
        >
          <Icon id="star" className="size-4" />
          by Stars
        </button>
      </section>

      <section className="container-lg space-y-20">
        {data.map((project) => (
          <article
            className="flex gap-x-10 gap-y-5 max-lg:flex-col max-lg:items-center"
            key={project.name}
          >
            <div className={cn(project.image && "basis-8/12")}>
              <div className="mb-2 inline-flex gap-3">
                <h2 className="font-extrabold" id={slugify(project.name)}>
                  {project.name}
                </h2>
                <time
                  className="text-muted"
                  dateTime={project.lastUpdated}
                  title="Last updated"
                >
                  {formatDate(project.lastUpdated, { includeDay: false })}
                </time>
              </div>

              <ul className="flex flex-wrap items-center gap-1 text-sm text-muted">
                <li className="select-none rounded-full bg-[hsl(0,0%,90%)] px-2.5 py-0.5 hover:bg-[hsl(0,0%,85%)] dark:bg-[hsl(0,0%,12%)] dark:hover:bg-[hsl(0,0%,16%)]">
                  <a
                    className="flex items-center gap-1"
                    rel="noopener noreferrer"
                    target="_blank"
                    href={`${project.repoUrl}/stargazers`}
                    aria-label="View stargazers"
                  >
                    <Icon id="star" className="size-3.5" aria-hidden="true" />
                    {project.stars}
                  </a>
                </li>
                {project.tags.map((tag) => (
                  <li
                    className="rounded-full bg-[hsl(0,0%,90%)] px-2.5 py-0.5 dark:bg-[hsl(0,0%,12%)]"
                    key={tag}
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              <p className="my-5">{project.description}</p>

              <div className="flex gap-4 text-muted">
                <a
                  className="-my-1.5 inline-flex min-w-9 items-center gap-px py-1.5 text-muted hover:underline hover:underline-offset-1"
                  href={project.repoUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                  aria-label="View source code"
                >
                  Source
                  <Icon id="external" className="size-4 text-muted-darker/80" />
                </a>
                {project.demoUrl && (
                  <a
                    className="-my-1.5 inline-flex min-w-9 items-center gap-px py-1.5 text-muted hover:underline hover:underline-offset-1"
                    href={project.demoUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                    aria-label="View demo"
                  >
                    Demo
                    <Icon
                      id="external"
                      className="size-4 text-muted-darker/80"
                    />
                  </a>
                )}
              </div>
            </div>

            {project.image && (
              <Image
                className="h-fit w-full max-w-[400px] basis-4/12 border"
                width={1600}
                height={1000}
                src={project.image} // NOTE make sure the image is 16:10
                alt={project.name}
                sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 32vw, 25vw"
              />
            )}
          </article>
        ))}
      </section>
    </>
  )
}
