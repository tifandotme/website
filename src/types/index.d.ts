export type GitHubResponse = {
  readonly stargazers_count: number
}

export type NavLinks = {
  readonly label: string
  readonly url: string
}[]

export type HeadingsField = {
  readonly text: string
  readonly slug: string
}[]
