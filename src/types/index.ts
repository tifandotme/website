export type HeadingsField = {
  text: string
  slug: string
}[]

export type NavLinks = {
  readonly label: string
  readonly url: string
}[]

export type PushStateInput = [
  data: any,
  unused: string,
  url?: string | URL | null | undefined,
]
